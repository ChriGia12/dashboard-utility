#!/bin/bash

# Script semplificato per test rapido senza Electron

echo "🚀 Avvio Dashboard Utility (modalità sviluppo)..."
echo ""

# Avvia backend
echo "📡 Avvio Backend..."
cd backend
python3 -m uvicorn server:app --host 0.0.0.0 --port 8001 &
BACKEND_PID=$!
cd ..

sleep 3

# Avvia frontend
echo "🎨 Avvio Frontend..."
cd frontend
PORT=3000 npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Dashboard avviata!"
echo "🌐 Apri: http://localhost:3000"
echo ""
echo "🛑 Per fermare: Premi Ctrl+C"

# Cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT

wait