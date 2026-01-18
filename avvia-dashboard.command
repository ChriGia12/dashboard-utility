#!/bin/bash

# Dashboard Utility - Script di Avvio per Mac
# Questo script avvia il backend e frontend della dashboard

echo "🚀 Avvio Dashboard Utility..."
echo ""

# Ottieni il percorso dello script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Funzione per verificare se una porta è occupata
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Funzione per terminare processi alla chiusura
cleanup() {
    echo ""
    echo "🛑 Arresto servizi..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    echo "✅ Servizi arrestati"
    exit 0
}

# Cattura segnali di terminazione
trap cleanup INT TERM

# Verifica prerequisiti
echo "📋 Verifica prerequisiti..."

# Verifica Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js non trovato!"
    echo "   Installa Node.js da: https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js: $(node --version)"

# Verifica Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 non trovato!"
    echo "   Installa Python 3 da: https://www.python.org/"
    exit 1
fi
echo "✅ Python: $(python3 --version)"

# Verifica Yarn
if ! command -v yarn &> /dev/null; then
    echo "⚠️  Yarn non trovato, installazione..."
    npm install -g yarn
fi
echo "✅ Yarn: $(yarn --version)"

echo ""

# Verifica se le porte sono disponibili
echo "🔍 Verifica porte disponibili..."
if check_port 3000; then
    echo "❌ Porta 3000 già in uso!"
    echo "   Chiudi l'applicazione che usa questa porta o modifica .env"
    exit 1
fi
if check_port 8001; then
    echo "❌ Porta 8001 già in uso!"
    echo "   Chiudi l'applicazione che usa questa porta o modifica .env"
    exit 1
fi
echo "✅ Porte 3000 e 8001 disponibili"
echo ""

# Avvio Backend
echo "🔧 Avvio Backend (FastAPI)..."
cd backend
python3 -m uvicorn main:app --host 0.0.0.0 --port 8001 > /tmp/dashboard-backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Attendi che il backend sia pronto
sleep 3

if ! ps -p $BACKEND_PID > /dev/null; then
    echo "❌ Errore avvio backend!"
    echo "   Controlla il log: /tmp/dashboard-backend.log"
    exit 1
fi
echo "✅ Backend avviato (PID: $BACKEND_PID)"
echo ""

# Avvio Frontend
echo "🎨 Avvio Frontend (React)..."
cd frontend
PORT=3000 yarn start > /tmp/dashboard-frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo "✅ Frontend avviato (PID: $FRONTEND_PID)"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Dashboard Utility è pronta!"
echo ""
echo "🌐 Apri il browser su: http://localhost:3000"
echo ""
echo "📊 Stato servizi:"
echo "   Backend:  http://localhost:8001 (PID: $BACKEND_PID)"
echo "   Frontend: http://localhost:3000 (PID: $FRONTEND_PID)"
echo ""
echo "📝 Log:"
echo "   Backend:  /tmp/dashboard-backend.log"
echo "   Frontend: /tmp/dashboard-frontend.log"
echo ""
echo "🛑 Per arrestare: Premi Ctrl+C o chiudi questa finestra"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Attendi 5 secondi e apri il browser
sleep 5
open http://localhost:3000 2>/dev/null || echo "⚠️  Apri manualmente: http://localhost:3000"

echo "⏳ Dashboard in esecuzione... (premi Ctrl+C per arrestare)"
echo ""

# Mantieni lo script attivo
while true; do
    # Verifica che i processi siano ancora attivi
    if ! ps -p $BACKEND_PID > /dev/null; then
        echo "❌ Backend terminato inaspettatamente!"
        echo "   Controlla: /tmp/dashboard-backend.log"
        cleanup
    fi
    if ! ps -p $FRONTEND_PID > /dev/null; then
        echo "❌ Frontend terminato inaspettatamente!"
        echo "   Controlla: /tmp/dashboard-frontend.log"
        cleanup
    fi
    sleep 5
done