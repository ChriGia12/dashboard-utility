#!/bin/bash

# Script Semplificato per Creare Dashboard Utility.app
# Questo script crea un'app Electron funzionante senza backend Python

set -e  # Esci se c'è un errore

echo "🚀 Creazione Dashboard Utility.app per Mac (Versione Semplificata)..."
echo ""

# Colori
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verifica prerequisiti
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js non trovato!${NC}"
    echo "Installa Node.js v20 da: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"
echo ""

# Pulisci build precedenti
echo "🧹 Pulizia build precedenti..."
rm -rf electron-app dist
echo ""

# Installa dipendenze Frontend
echo "📦 Installazione dipendenze Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install --legacy-peer-deps
else
    echo -e "${YELLOW}Dipendenze già installate${NC}"
fi
cd ..
echo ""

# Build Frontend
echo "🔨 Build Frontend React..."
cd frontend
NODE_ENV=production npm run build
cd ..
echo ""

# Crea struttura Electron
echo "⚙️  Creazione struttura Electron..."
mkdir -p electron-app
cp -r frontend/build electron-app/build

# Package.json per Electron
cat > electron-app/package.json << 'PKGJSON'
{
  "name": "dashboard-utility",
  "version": "1.0.0",
  "description": "Dashboard Utility per Mac - Widget personalizzabili",
  "main": "main.js",
  "author": "Dashboard Utility",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder --mac"
  },
  "build": {
    "appId": "com.dashboard.utility",
    "productName": "Dashboard Utility",
    "mac": {
      "category": "public.app-category.productivity",
      "target": "dir"
    },
    "files": [
      "**/*"
    ],
    "directories": {
      "output": "../dist"
    }
  },
  "dependencies": {},
  "devDependencies": {
    "electron": "^28.0.0",
    "electron-builder": "^24.9.1"
  }
}
PKGJSON

# Main.js per Electron (solo frontend) - FIX PATH
cat > electron-app/main.js << 'MAINJS'
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true
    },
    title: 'Dashboard Utility',
    titleBarStyle: 'default',
    backgroundColor: '#f8fafc'
  });

  // Fix: usa il path corretto in produzione
  const startUrl = url.format({
    pathname: path.join(__dirname, 'build', 'index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl);

  // Apri DevTools automaticamente per debug
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
MAINJS

echo ""
echo "📦 Installazione dipendenze Electron..."
cd electron-app
npm install --save-dev electron electron-builder
echo ""

echo "🔨 Build app Mac..."
echo "⏳ Questo richiederà alcuni minuti..."
echo ""
npm run build
cd ..

if [ -d "dist/mac/Dashboard Utility.app" ]; then
    echo ""
    echo -e "${GREEN}✅ ========================================${NC}"
    echo -e "${GREEN}✅ APP CREATA CON SUCCESSO!${NC}"
    echo -e "${GREEN}✅ ========================================${NC}"
    echo ""
    echo "📁 Posizione: $(pwd)/dist/mac/Dashboard Utility.app"
    echo ""
    echo "🎉 INSTALLAZIONE:"
    echo "   1. Apri Finder"
    echo "   2. Vai in: $(pwd)/dist/mac/"
    echo "   3. Trascina 'Dashboard Utility.app' nella cartella Applicazioni"
    echo "   4. Doppio click per aprire!"
    echo ""
    echo "💡 NOTA: Se macOS blocca l'app:"
    echo "   - Vai in Impostazioni > Privacy e Sicurezza"
    echo "   - Clicca 'Apri comunque' accanto a Dashboard Utility"
    echo ""
    echo -e "${GREEN}✔️  L'app è pronta all'uso!${NC}"
    echo ""
else
    echo -e "${RED}❌ Errore durante la creazione dell'app${NC}"
    echo "Controlla i messaggi di errore sopra"
    exit 1
fi