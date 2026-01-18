# 🚀 Guida Rapida: Attiva Meteo e Notizie Sport in Tempo Reale

## ⚡ In 5 Minuti Hai Tutto Funzionante!

---

## 🌤️ METEO BOLOGNA IN TEMPO REALE

### Step 1: Ottieni API Key (2 minuti)

1. Vai su: **https://openweathermap.org/api**
2. Clicca **"Sign Up"** (registrazione gratuita)
3. Compila il form con la tua email
4. Conferma l'email che ricevi
5. Vai su: **https://home.openweathermap.org/api_keys**
6. **Copia** la tua API Key (stringa lunga tipo: `a1b2c3d4e5f6...`)

### Step 2: Inserisci nel Codice (1 minuto)

**Su Mac, apri TextEdit:**
```bash
open -a TextEdit ~/Documents/dashboard-utility/frontend/src/components/widgets/WeatherWidget.jsx
```

**Trova la riga 5:**
```javascript
const WEATHER_API_KEY = 'TUA_API_KEY_QUI';
```

**Sostituisci con la tua chiave:**
```javascript
const WEATHER_API_KEY = 'a1b2c3d4e5f6...'; // La tua chiave qui
```

**Salva** (Cmd+S) e **Chiudi** TextEdit

### Step 3: Riavvia (30 secondi)

Nel Terminale dove gira l'app:
- Premi **Ctrl+C** per fermare
- Riavvia con: `npm start`

✅ **FATTO! Meteo di Bologna ora è LIVE!**

---

## 📰 NOTIZIE SPORT IN TEMPO REALE

### Step 1: Ottieni API Key (2 minuti)

1. Vai su: **https://newsapi.org/**
2. Clicca **"Get API Key"**
3. Registrati (scegli piano **Developer** - gratuito)
4. Conferma email
5. Vai su: **https://newsapi.org/account**
6. **Copia** la tua API Key

### Step 2: Inserisci nel Codice (1 minuto)

**Apri TextEdit:**
```bash
open -a TextEdit ~/Documents/dashboard-utility/frontend/src/components/widgets/NewsWidget.jsx
```

**Trova la riga 6:**
```javascript
const NEWS_API_KEY = 'TUA_API_KEY_QUI';
```

**Sostituisci con la tua chiave:**
```javascript
const NEWS_API_KEY = 'la-tua-chiave-qui';
```

**Salva** (Cmd+S) e **Chiudi** TextEdit

### Step 3: Riavvia (30 secondi)

Nel Terminale:
- Premi **Ctrl+C**
- Riavvia con: `npm start`

✅ **FATTO! Notizie sportive italiane LIVE!**

---

## 🎯 Verifica che Funzioni

Apri http://localhost:3000

**Controlla:**
- ✅ Widget Meteo **NON** mostra più "(simulato)"
- ✅ Widget Notizie Sport **NON** mostra più "(simulato)"
- ✅ Temperatura Bologna corrente
- ✅ Notizie sportive italiane recenti

---

## ⏱️ Aggiornamenti Automatici

- **Meteo**: Ogni 30 minuti
- **Notizie Sport**: Ogni 15 minuti

---

## 🆓 È Gratis?

- **OpenWeatherMap**: ✅ Gratuito per sempre (60 richieste/minuto)
- **NewsAPI**: ✅ Gratuito (100 richieste/giorno = più che sufficiente!)

---

## ❓ Problemi?

### "API key non valida"
- Aspetta 5-10 minuti dopo la registrazione
- Le chiavi richiedono tempo per attivarsi

### Widget ancora "simulato"
- ✅ Hai salvato il file?
- ✅ Hai riavviato l'app?
- ✅ La chiave è tra virgolette?
- ✅ Non hai spazi extra?

### Controlla Console
Premi **F12** nel browser → tab **Console** per vedere errori

---

## 📝 Ricapitolando

**PER METEO BOLOGNA LIVE:**
1. Registrati su openweathermap.org
2. Copia API key
3. Modifica WeatherWidget.jsx riga 5
4. Riavvia app

**PER NOTIZIE SPORT LIVE:**
1. Registrati su newsapi.org
2. Copia API key  
3. Modifica NewsWidget.jsx riga 6
4. Riavvia app

**Tempo totale: 5 minuti! 🚀**

---

🎉 **Dopo questi passaggi avrai meteo e notizie completamente REALI e aggiornate automaticamente!**
