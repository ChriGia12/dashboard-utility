#!/bin/bash

# Dashboard Utility - Script di Arresto per Mac

echo "🛑 Arresto Dashboard Utility..."
echo ""

# Trova e termina i processi sulla porta 3000 (Frontend)
echo "🔍 Ricerca processi Frontend (porta 3000)..."
FRONTEND_PIDS=$(lsof -ti :3000)
if [ ! -z "$FRONTEND_PIDS" ]; then
    echo "   Terminazione processi: $FRONTEND_PIDS"
    kill -9 $FRONTEND_PIDS 2>/dev/null
    echo "✅ Frontend arrestato"
else
    echo "⚠️  Nessun processo trovato sulla porta 3000"
fi

echo ""

# Trova e termina i processi sulla porta 8001 (Backend)
echo "🔍 Ricerca processi Backend (porta 8001)..."
BACKEND_PIDS=$(lsof -ti :8001)
if [ ! -z "$BACKEND_PIDS" ]; then
    echo "   Terminazione processi: $BACKEND_PIDS"
    kill -9 $BACKEND_PIDS 2>/dev/null
    echo "✅ Backend arrestato"
else
    echo "⚠️  Nessun processo trovato sulla porta 8001"
fi

echo ""
echo "✅ Dashboard Utility arrestata!"
echo ""

# Rimuovi file di log temporanei (opzionale)
read -p "Vuoi eliminare i file di log? (s/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    rm -f /tmp/dashboard-backend.log
    rm -f /tmp/dashboard-frontend.log
    echo "✅ File di log eliminati"
fi

echo ""
echo "👋 Arrivederci!"