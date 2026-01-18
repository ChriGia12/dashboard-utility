# Dashboard Utility - App Mac

Dashboard utility professionale con 9 widget per il tuo monitor secondario.

## ✨ Widget Disponibili

1. **⏰ Orologio** - Ora e data in tempo reale
2. **🌤️ Meteo** - Condizioni meteo (con supporto API reale)
3. **✅ Lista Attività** - Todo list con salvataggio locale
4. **💻 Monitor Sistema** - Utilizzo CPU, RAM, Disco
5. **📅 Calendario** - Calendario mensile con eventi
6. **⏱️ Timer Pomodoro** - Tecnica Pomodoro 25/5 minuti
7. **📝 Note Veloci** - Note colorate salvate localmente
8. **📰 Notizie** - Feed notizie (con supporto API reale)
9. **🔗 Collegamenti Rapidi** - Accessi rapidi ai tuoi siti preferiti

## 🚀 Installazione Rapida

### Prerequisiti
- **Node.js v20+** - Scarica da https://nodejs.org/
- **macOS 10.13+**

### Passaggi

```bash
# 1. Clona il repository
git clone https://github.com/ChriGia12/dashboard-utility.git
cd dashboard-utility

# 2. Rendi eseguibile lo script
chmod +x crea-app-mac-fixed.sh

# 3. Crea l'app!
./crea-app-mac-fixed.sh
```

### Dopo la creazione

1. Apri **Finder**
2. Vai in `dashboard-utility/dist/mac/`
3. Trascina `Dashboard Utility.app` nella cartella **Applicazioni**
4. Doppio click per aprire!

## 🆔 Se macOS Blocca l'App

MacOS potrebbe mostrare un avviso di sicurezza:

1. Vai in **Impostazioni di Sistema** → **Privacy e Sicurezza**
2. Scorri in basso fino a trovare il messaggio su "Dashboard Utility"
3. Clicca **"Apri comunque"**
4. Conferma

## 🔑 API Keys (Opzionale per Dati Reali)

Per abilitare meteo e notizie **reali**:

### Meteo Reale (OpenWeatherMap)
1. Registrati su https://openweathermap.org/api
2. Ottieni la tua API key gratuita
3. Modifica `/frontend/src/components/widgets/WeatherWidget.jsx`
4. Sostituisci `const WEATHER_API_KEY = 'demo';` con la tua chiave
5. Ricrea l'app con `./crea-app-mac-fixed.sh`

### Notizie Reali (NewsAPI)
1. Registrati su https://newsapi.org/
2. Ottieni la tua API key gratuita
3. Modifica `/frontend/src/components/widgets/NewsWidget.jsx`
4. Sostituisci `const NEWS_API_KEY = 'demo';` con la tua chiave
5. Ricrea l'app con `./crea-app-mac-fixed.sh`

**Nota:** Senza API keys, i widget mostrano dati simulati ma tutto il resto funziona perfettamente!

## 🎨 Caratteristiche

- ✅ **Widget Drag & Drop** - Riorganizza i widget trascinandoli
- ✅ **Ridimensionabili** - Adatta le dimensioni ai tuoi gusti
- ✅ **Dark Mode** - Interruttore chiaro/scuro
- ✅ **Salvataggio Automatico** - Layout e dati salvati localmente
- ✅ **Offline** - Funziona senza internet
- ✅ **Interfaccia Italiana** - Completamente localizzata
- ✅ **Gratuito** - Nessun costo, nessun abbonamento

## 🛠️ Tecnologie

- React 19
- Electron 28
- Tailwind CSS
- Shadcn/UI
- React Grid Layout

## 🐛 Risoluzione Problemi

### L'app non si apre
- Verifica di averla trascinata in "Applicazioni"
- Prova: click destro → Apri
- Controlla Privacy e Sicurezza

### Errore "damaged and can't be opened"
```bash
xattr -cr "/Applications/Dashboard Utility.app"
```

### Dipendenze non si installano
```bash
cd frontend
npm install --legacy-peer-deps
```

## 📝 Licenza

MIT License - Usa liberamente!

## 💬 Supporto

Se hai problemi, apri una issue su GitHub!

---

🎉 **Buon utilizzo della tua Dashboard Utility!**