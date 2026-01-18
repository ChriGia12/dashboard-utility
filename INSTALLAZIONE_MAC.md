# 📦 Installazione Dashboard Utility per Mac

## 🎯 Cosa Ottieni

Una dashboard utility completamente funzionante sul tuo Mac con:
- ✅ 9 widget interattivi (Orologio, Meteo, Todo, Sistema, Calendario, Pomodoro, Note, Notizie, Collegamenti)
- ✅ Funziona offline senza internet
- ✅ Dati salvati localmente sul tuo Mac
- ✅ Avvio con un doppio click
- ✅ Gratuito per sempre

---

## 📋 Prerequisiti

Devi avere installato sul tuo Mac:

1. **Node.js** (versione 16 o superiore)
   - Scarica da: https://nodejs.org/
   - Scegli la versione LTS (Long Term Support)

2. **Python 3** (versione 3.8 o superiore)
   - macOS lo ha già installato di default
   - Verifica con: `python3 --version`

3. **Yarn** (gestore pacchetti)
   - Installa con: `npm install -g yarn`

---

## 🚀 Installazione Rapida

### Passo 1: Scarica i File

1. Scarica l'intera cartella `/app` dal progetto Emergent
2. Copia la cartella `app` sul tuo Mac (es. in `~/Documents/Dashboard`)

### Passo 2: Installa le Dipendenze

Apri il Terminale e vai nella cartella dell'app:

```bash
cd ~/Documents/Dashboard/app

# Installa dipendenze backend
cd backend
pip3 install -r requirements.txt
cd ..

# Installa dipendenze frontend
cd frontend
yarn install
cd ..
```

### Passo 3: Rendi Eseguibile lo Script di Avvio

```bash
chmod +x avvia-dashboard.command
```

### Passo 4: Avvia la Dashboard

Doppio click su `avvia-dashboard.command` oppure:

```bash
./avvia-dashboard.command
```

La dashboard si aprirà automaticamente nel browser su `http://localhost:3000`

---

## ⚙️ Configurazione Avvio Automatico (Opzionale)

Se vuoi che la dashboard si avvii automaticamente all'accensione del Mac:

### Metodo 1: Impostazioni Sistema (più semplice)

1. Vai in **Impostazioni di Sistema** → **Generali** → **Elementi login**
2. Clicca sul pulsante **+**
3. Seleziona `avvia-dashboard.command`
4. La dashboard si avvierà automaticamente al login

### Metodo 2: LaunchAgent (più avanzato)

```bash
# Copia il file di configurazione
cp com.dashboard.utility.plist ~/Library/LaunchAgents/

# Carica il servizio
launchctl load ~/Library/LaunchAgents/com.dashboard.utility.plist
```

Per disabilitare:
```bash
launchctl unload ~/Library/LaunchAgents/com.dashboard.utility.plist
```

---

## 🛑 Arrestare la Dashboard

Per fermare la dashboard:

```bash
./arresta-dashboard.command
```

Oppure chiudi semplicemente le finestre del Terminale.

---

## 🔧 Risoluzione Problemi

### La dashboard non si avvia

1. **Verifica che le porte 3000 e 8001 siano libere:**
   ```bash
   lsof -i :3000
   lsof -i :8001
   ```
   Se occupate, chiudi i processi o cambia le porte nel file `.env`

2. **Verifica installazione Node.js:**
   ```bash
   node --version  # Deve mostrare v16 o superiore
   ```

3. **Verifica installazione Python:**
   ```bash
   python3 --version  # Deve mostrare 3.8 o superiore
   ```

### Il browser non si apre automaticamente

Apri manualmente il browser e vai su: `http://localhost:3000`

### Errori "modulo non trovato"

Ripeti l'installazione delle dipendenze:
```bash
cd frontend && yarn install && cd ..
cd backend && pip3 install -r requirements.txt && cd ..
```

---

## 📁 Struttura File

```
app/
├── avvia-dashboard.command       # Script di avvio principale
├── arresta-dashboard.command     # Script per fermare i servizi
├── com.dashboard.utility.plist   # File per avvio automatico
├── frontend/                      # Applicazione React
│   ├── src/
│   ├── package.json
│   └── .env
├── backend/                       # API FastAPI
│   ├── main.py
│   ├── requirements.txt
│   └── .env
└── INSTALLAZIONE_MAC.md          # Questo file
```

---

## 💾 Dati e Privacy

- **Tutti i dati sono salvati localmente** sul tuo Mac
- **Nessun dato viene inviato online**
- **Posizione dati:**
  - Layout e tema: localStorage del browser
  - Todo e note: localStorage del browser
  - Database: `/app/backend/data/` (se presente)

---

## 🔄 Aggiornamenti

Per aggiornare l'app:
1. Scarica la nuova versione
2. Sostituisci i file
3. Riesegui l'installazione delle dipendenze
4. I tuoi dati (todo, note, layout) saranno preservati nel browser

---

## 📞 Supporto

Se hai problemi:
1. Controlla la sezione "Risoluzione Problemi" sopra
2. Verifica i log nel Terminale
3. Assicurati che tutti i prerequisiti siano installati

---

## ✨ Caratteristiche

### Widget Disponibili:
1. **Orologio** - Ora e data in tempo reale
2. **Meteo** - Condizioni meteo simulate
3. **Lista Attività** - Gestione todo con persistenza
4. **Monitor Sistema** - CPU, RAM, Disco in tempo reale
5. **Calendario** - Visualizzazione mensile con eventi
6. **Timer Pomodoro** - Tecnica Pomodoro 25/5 minuti
7. **Note Veloci** - Note colorate salvate localmente
8. **Notizie** - Feed notizie categorizzate
9. **Collegamenti Rapidi** - Scorciatoie a siti preferiti

### Funzionalità:
- 🎨 **Dark Mode** - Toggle chiaro/scuro con persistenza
- 📐 **Layout Personalizzabile** - Trascina e ridimensiona widget
- 💾 **Salvataggio Automatico** - Layout e preferenze salvati
- 🔄 **Reset Layout** - Ripristina configurazione predefinita
- 🇮🇹 **Interfaccia Italiana** - Completamente localizzata

---

🎉 **Buon utilizzo della tua Dashboard Utility!**