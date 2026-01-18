# 🔑 Guida Configurazione API per Dati Reali

Questa guida ti aiuta a configurare le API per avere **meteo reale** e **notizie sportive reali** nella tua Dashboard Utility.

---

## 🌤️ Meteo Reale con OpenWeatherMap

### Passo 1: Ottieni l'API Key Gratuita

1. Vai su **https://openweathermap.org/api**
2. Clicca su **"Get API Key"** o **"Sign Up"**
3. Crea un account gratuito
4. Verifica la tua email
5. Vai su **https://home.openweathermap.org/api_keys**
6. Copia la tua **API Key** (es: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### Passo 2: Inserisci l'API Key nel Codice

1. Apri il file: `~/Documents/dashboard-utility/frontend/src/components/widgets/WeatherWidget.jsx`

2. Trova questa riga (circa linea 5-6):
```javascript
const WEATHER_API_KEY = 'TUA_API_KEY_QUI';
```

3. Sostituisci con la tua chiave:
```javascript
const WEATHER_API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
```

4. Salva il file

### Passo 3: Personalizza la Città (Opzionale)

Se vuoi cambiare città da Milano:

```javascript
const CITY = 'Roma'; // o qualsiasi altra città italiana
```

### Passo 4: Riavvia l'App

```bash
# Se stai usando il browser
cd ~/Documents/dashboard-utility/frontend
# Ferma con Ctrl+C e riavvia
npm start
```

✅ **Fatto!** Il meteo ora sarà reale e si aggiornerà ogni 30 minuti.

---

## 📰 Notizie Sportive Reali con NewsAPI

### Passo 1: Ottieni l'API Key Gratuita

1. Vai su **https://newsapi.org/**
2. Clicca su **"Get API Key"**
3. Compila il form di registrazione
4. Scegli il piano **"Developer"** (gratuito, 100 richieste/giorno)
5. Verifica la tua email
6. Vai su **https://newsapi.org/account**
7. Copia la tua **API Key**

### Passo 2: Inserisci l'API Key nel Codice

1. Apri il file: `~/Documents/dashboard-utility/frontend/src/components/widgets/NewsWidget.jsx`

2. Trova questa riga (circa linea 6):
```javascript
const NEWS_API_KEY = 'TUA_API_KEY_QUI';
```

3. Sostituisci con la tua chiave:
```javascript
const NEWS_API_KEY = 'la-tua-chiave-qui';
```

4. Salva il file

### Passo 3: Riavvia l'App

```bash
cd ~/Documents/dashboard-utility/frontend
# Ferma con Ctrl+C e riavvia
npm start
```

✅ **Fatto!** Le notizie sportive ora saranno reali e si aggiorneranno ogni 15 minuti.

---

## 📅 Calendario iPhone - Opzioni

### ⚠️ Sincronizzazione Diretta iPhone → Dashboard

**NON è possibile** sincronizzare direttamente il calendario iPhone con un'app web per motivi di sicurezza e privacy di Apple.

### ✅ Alternative Disponibili

#### Opzione 1: Google Calendar (Consigliata)

1. **Sul tuo iPhone:**
   - Vai in Impostazioni → Calendari
   - Aggiungi account Google
   - Sincronizza il calendario iPhone con Google Calendar

2. **Nella Dashboard:**
   - Posso implementare l'integrazione con Google Calendar API
   - Richiede configurazione OAuth (più complessa)
   - I tuoi eventi appariranno nella dashboard

**Vuoi che implementi Google Calendar?** È più complesso ma funziona.

#### Opzione 2: Inserimento Manuale Eventi

- Puoi modificare gli eventi direttamente nel codice del widget Calendario
- File: `~/Documents/dashboard-utility/frontend/src/components/widgets/CalendarWidget.jsx`
- Aggiungi i tuoi eventi nell'array `events`

#### Opzione 3: iCloud Calendar (Avanzato)

- Richiede URL webcal da iCloud
- Setup più complesso
- Possibile ma non consigliato per uso personale

---

## 🧪 Come Testare

Dopo aver configurato le API keys:

1. Ferma l'app (Ctrl+C nel terminale)
2. Riavvia: `npm start`
3. Apri http://localhost:3000
4. Controlla che:
   - Widget Meteo non mostri più "(simulato)"
   - Widget Notizie Sport non mostri più "(simulato)"
   - I dati siano aggiornati

---

## ❓ Risoluzione Problemi

### Il meteo non funziona

- ✅ Hai inserito la chiave corretta?
- ✅ Hai salvato il file?
- ✅ Hai riavviato l'app?
- ✅ Apri la Console del browser (F12) e controlla gli errori

### Le notizie non funzionano

- ✅ Piano Developer di NewsAPI attivato?
- ✅ Non hai superato le 100 richieste giornaliere?
- ✅ La chiave è corretta e salvata?

### API Key non valida

- Aspetta 5-10 minuti dopo la registrazione
- Le chiavi potrebbero richiedere tempo per attivarsi
- Verifica di averle copiate completamente

---

## 💰 Costi

- **OpenWeatherMap Free**: ✅ Gratuito per sempre (60 chiamate/minuto)
- **NewsAPI Developer**: ✅ Gratuito (100 richieste/giorno)

Entrambe le API sono sufficienti per uso personale!

---

## 🆘 Serve Aiuto?

Se hai problemi con la configurazione, contattami su GitHub con:
- Quale API stai configurando
- Eventuali messaggi di errore dalla Console

---

**Buon utilizzo della tua Dashboard Utility! 🎉**
