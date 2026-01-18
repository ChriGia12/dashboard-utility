# Dashboard Utility - App per Mac

## 🎯 Panoramica

Dashboard Utility è un'applicazione desktop per Mac che fornisce 9 widget utili per il tuo monitor secondario:

- ⏰ **Orologio** - Ora e data in tempo reale
- 🌤️ **Meteo** - Condizioni meteo
- ✅ **Lista Attività** - Gestione todo
- 💻 **Monitor Sistema** - CPU, RAM, Disco
- 📅 **Calendario** - Calendario con eventi
- ⏱️ **Timer Pomodoro** - Tecnica Pomodoro 25/5
- 📝 **Note Veloci** - Note colorate
- 📰 **Notizie** - Feed notizie
- 🔗 **Collegamenti Rapidi** - Scorciatoie siti

## 🚀 Installazione Rapida su Mac

### Prerequisiti
- Node.js v20+ (https://nodejs.org/)
- macOS 10.13 o superiore

### Passo 1: Clona il Repository

```bash
git clone https://github.com/ChriGia12/dashboard-utility.git
cd dashboard-utility
```

### Passo 2: Installa Dipendenze

```bash
# Frontend
cd frontend
npm install
cd ..

# Backend
cd backend
pip3 install -r requirements.txt
cd ..
```

### Passo 3: Crea l'App Mac

```bash
# Rendi eseguibile lo script
chmod +x crea-app-mac.sh

# Esegui lo script di build
./crea-app-mac.sh
```

L'app `Dashboard Utility.app` verrà creata nella cartella corrente.

### Passo 4: Installa l'App

Trascina `Dashboard Utility.app` nella cartella Applicazioni!

## 🎨 Caratteristiche

- ✅ Widget trascinabili e ridimensionabili
- 🌓 Dark mode / Light mode
- 💾 Salvataggio automatico layout
- 🇮🇹 Interfaccia completamente in italiano
- 🔒 Dati salvati localmente
- 🆓 Completamente gratuito e offline

## 📖 Documentazione Completa

Vedi `INSTALLAZIONE_MAC.md` per istruzioni dettagliate.

## 🛠️ Tecnologie

- React 19
- Electron
- FastAPI
- Tailwind CSS
- Shadcn/UI

## 📝 Licenza

MIT License - Usa liberamente!

---

🎉 Buon utilizzo!