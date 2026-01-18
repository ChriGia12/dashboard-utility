#!/bin/bash

echo "🚀 Creazione Dashboard Utility.app per Mac..."
echo ""

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verifica Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js non trovato!${NC}"
    echo "Installa Node.js da: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"

# Verifica Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 non trovato!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Python: $(python3 --version)${NC}"
echo ""

# Installa dipendenze Frontend
echo "📦 Installazione dipendenze Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo -e "${YELLOW}⚠️  Dipendenze già installate, skip...${NC}"
fi
cd ..
echo ""

# Installa dipendenze Backend
echo "📦 Installazione dipendenze Backend..."
cd backend
pip3 install -r requirements.txt --quiet
cd ..
echo ""

# Build Frontend
echo "🔨 Build Frontend React..."
cd frontend
CREATE_REACT_APP=true npm run build
cd ..
echo ""

# Installa electron-builder se non presente
echo "📦 Installazione Electron Builder..."
if ! npm list -g electron-builder &> /dev/null; then
    npm install -g electron-builder
fi
echo ""

# Crea struttura Electron
echo "⚙️  Creazione struttura Electron..."
mkdir -p electron-app

# Copia file necessari
cp -r frontend/build electron-app/frontend-build
cp -r backend electron-app/backend

# Crea package.json per Electron
cat > electron-app/package.json << 'EOF'
{
  "name": "dashboard-utility",
  "version": "1.0.0",
  "description": "Dashboard Utility per Mac",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder --mac --arm64 --x64"
  },
  "build": {
    "appId": "com.dashboard.utility",
    "productName": "Dashboard Utility",
    "mac": {
      "category": "public.app-category.productivity",
      "icon": "icon.icns",
      "target": [
        {
          "target": "default",
          "arch": ["arm64", "x64"]
        }
      ]
    },
    "files": [
      "**/*",
      "!node_modules"
    ],
    "directories": {
      "output": "../dist"
    }
  },
  "dependencies": {
    "electron-serve": "^1.1.0"
  },
  "devDependencies": {
    "electron": "^28.0.0",
    "electron-builder": "^24.9.1"
  }
}
EOF

# Crea main.js per Electron
cat > electron-app/main.js << 'EOF'
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    title: 'Dashboard Utility',
    titleBarStyle: 'default'
  });

  // Carica il frontend
  mainWindow.loadFile(path.join(__dirname, 'frontend-build', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startBackend() {
  const pythonPath = 'python3';
  const backendPath = path.join(__dirname, 'backend', 'server.py');
  
  backendProcess = spawn(pythonPath, ['-m', 'uvicorn', 'server:app', '--host', '0.0.0.0', '--port', '8001'], {
    cwd: path.join(__dirname, 'backend'),
    env: { ...process.env }
  });

  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend Error: ${data}`);
  });
}

app.on('ready', () => {
  startBackend();
  setTimeout(createWindow, 3000); // Aspetta che il backend sia pronto
});

app.on('window-all-closed', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('before-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});
EOF

echo ""
echo "📦 Installazione dipendenze Electron..."
cd electron-app
npm install
echo ""

echo "🔨 Build app Mac..."
echo "⏳ Questo potrebbe richiedere alcuni minuti..."
npm run build
cd ..

if [ -d "dist/mac" ]; then
    echo ""
    echo -e "${GREEN}✅ App creata con successo!${NC}"
    echo ""
    echo "📁 Posizione: $(pwd)/dist/mac/Dashboard Utility.app"
    echo ""
    echo "🎉 Per installare:"
    echo "   1. Vai nella cartella dist/mac/"
    echo "   2. Trascina 'Dashboard Utility.app' nella cartella Applicazioni"
    echo "   3. Doppio click per aprire!"
    echo ""
else
    echo -e "${RED}❌ Errore durante la creazione dell'app${NC}"
    exit 1
fi