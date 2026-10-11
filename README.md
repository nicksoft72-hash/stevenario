# 🚀 Stevenario - L'Oracolo Ufficiale e Dizionario di Steve

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google%20Gemini-2.5--flash-8e24aa?logo=google)](https://aistudio.google.com/)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

Un'applicazione web ironica, moderna e satirica creata appositamente per essere condivisa con gli amici e pubblicata con un click su **Vercel**. Un'intelligenza artificiale addestrata a rispondere come il classico amico del gruppo: ritardi cronici, scuse cosmiche, pareri da filosofo del bar dello sport e massime memorabili.

---

## 🎯 Obiettivo del Progetto

Condividere con gli amici (tramite link pubblico Vercel o chat WhatsApp) una pagina interattiva dove chiunque può interrogare l'AI "Steve".
- Risposte sempre a tema, ironiche e cordiali, che prendono bonariamente in giro i tic verbali, le scuse e le abitudini dell'amico.
- Massima facilità di aggiornamento: puoi aggiungere nuove battute o aneddoti all'AI in qualsiasi momento **senza dover toccare il codice**.

---

## 🎭 Funzionalità Principali

### 1. 💬 L'Oracolo di Steve (Chat AI)
- Conversazione in tempo reale con Steve, con indicatori di digitazione ed espressioni tipiche.
- Chip con suggerimenti rapidi di domande frequenti (*"Steve, dove sei?"*, *"Chi paga la cena stasera?"*, *"Steve, andiamo a correre domani alle 7:00?"*).
- **Condivisione immediata su WhatsApp**: ogni risposta ha il pulsante per inviare la perla direttamente nei gruppi WhatsApp o copiarla negli appunti.
- **Effetti speciali**: coriandoli animati (`canvas-confetti`) e suoni pop/bloop sintetizzati tramite Web Audio API a ogni risposta.

### 2. 🛡️ Scheda Personaggio RPG di Steve
- Statistiche goliardiche dinamiche:
  - **Puntualità**: `3%` *(Calcolata con fuso orario proprio)*
  - **Presenza agli aperitivi**: `100%` *(Imbattibile dalle 19:00)*
  - **Abilità nel cambiare discorso**: `98%` *(Cintura nera di deviazione)*
  - **Modi di dire al minuto**: `4.2` *(Nuovo record provinciale)*

### 3. 🎲 Generatore Automatico di Alibi & Scuse
- Sorteggio casuale istantaneo di scuse epiche per giustificare ritardi o bidoni (traffico, batteria, oroscopo, gatti addormentati sulle scarpe).
- Pulsante per copiare l'alibi formattato per la chat di gruppo.

### 4. 📖 Lo Stevenario Ufficiale (Dizionario dei Modi di Dire)
- Finestra modale con glossario ragionato delle espressioni tipiche.
- Classificazione per rarità: **Comune**, **Rara**, **Leggendaria**.
- Barra di ricerca istantanea e filtri per visualizzare contesto e reale traduzione dal "gergo di Steve".

---

## 🤖 Come funziona con l'AI: Google Gem vs Google Gemini API

> 💡 **Perché non un Google Gem diretto di gemini.google.com?**
> I *Gems* configurati su `gemini.google.com` sono pensati esclusivamente per l'interfaccia consumer di Google e non dispongono di endpoint API pubblici invocabili dal web.
>
> **La Soluzione di Stevenario:**
> Utilizza le **Google Gemini API** ufficiali (`@google/genai` con modello ultraveloce `gemini-2.5-flash`) combinato con un `systemInstruction` personalizzato. In questo modo ottieni la stessa logica di un Gem (e anche superiore!), con controllo completo e tempi di risposta istantanei.

### 💡 Modalità Fail-Safe / Offline inclusa
Non hai ancora inserito la chiave API di Google? Nessun problema! Stevenario include un motore di fallback intelligente con battute e alibi preimpostati. L'app **non andrà mai in errore 500** su Vercel, funzionando perfettamente fin dal primo secondo.

---

## ⚡ Come aggiornare le risposte di Steve senza toccare il codice

Vuoi insegnare a Steve una nuova battuta successa ieri sera o un nuovo tormentone? Hai due modalità semplicissime:

### Metodo 1: Dalla Dashboard di Vercel (Consigliato, Zero Code!)
1. Accedi al tuo progetto su [Vercel](https://vercel.com).
2. Vai su **Settings** ➔ **Environment Variables**.
3. Aggiungi la variabile:
   - **Key**: `STEVENARIO_CUSTOM_PROMPT`
   - **Value**: Inserisci le nuove istruzioni o aneddoti (es: *"Ricordati che dice sempre 'ci penso io' e che sabato scorso si è scordato il portafoglio a Rimini; non ammettere mai di aver torto sul barbecue."*)
4. Salva: le chiamate successive all'AI utilizzeranno istantaneamente la nuova personalità senza dover modificare il repository!

### Metodo 2: Modificando il file di configurazione
Nel file [`src/config/stevenario.ts`](src/config/stevenario.ts) puoi personalizzare direttamente:
- Nome e soprannome dell'amico
- Statistiche della scheda RPG
- L'elenco del glossario (modi di dire, contesto, traduzione e rarità)
- L'elenco delle scuse generabili a rotazione
- Il prompt di sistema di base

---

## 📁 Struttura del Progetto

```
stevenario/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/route.ts      # Endpoint API con Google GenAI & smart fallback
│   │   ├── globals.css            # Stili globali Tailwind CSS v4 & animazioni
│   │   ├── layout.tsx             # Root layout con metadati SEO e OpenGraph
│   │   └── page.tsx               # Pagina principale dell'applicazione
│   ├── components/
│   │   ├── ChatInterface.tsx      # Chat con Steve, chip, condivisione WhatsApp
│   │   ├── ExcuseGenerator.tsx    # Generatore casuale di scuse con coriandoli
│   │   ├── GlossaryModal.tsx      # Dizionario ricercabile con rarità
│   │   ├── InfoGuideModal.tsx     # Guida interattiva per l'utente
│   │   ├── Navbar.tsx             # Header glassmorphism con toggle audio e share
│   │   └── SteveStats.tsx         # Scheda personaggio con statistiche RPG
│   ├── config/
│   │   └── stevenario.ts          # Configurazione centrale personalità, frasi e prompt
│   └── lib/
│       └── sound.ts               # Sintetizzatore audio nativo Web Audio API
├── .env.example                   # Template variabili d'ambiente
├── package.json
└── README.md
```

---

## 🛠️ Configurazione Variabili d'Ambiente

Crea un file `.env.local` nella root del progetto (o configuralo su Vercel):

```env
# Chiave API per Google Gemini (ottenibile gratuitamente su https://aistudio.google.com/apikey)
GEMINI_API_KEY=AIzaSy...

# (Opzionale) Modifiche o aggiunte personalizzate al prompt senza toccare il codice
STEVENARIO_CUSTOM_PROMPT="Steve dice spesso 'eh la peppa' e odia svegliarsi prima delle 11."
```

---

## 🌐 Deploy su Vercel

1. Fai il push del repository su GitHub.
2. Vai su [vercel.com/new](https://vercel.com/new) e importa il repository `stevenario`.
3. In **Environment Variables**, inserisci:
   - `GEMINI_API_KEY` (la tua chiave di Google AI Studio)
   - *(Opzionale)* `STEVENARIO_CUSTOM_PROMPT`
4. Clicca su **Deploy**.
5. Invia il link generato da Vercel agli amici! 🎉

---

## 💻 Esecuzione Locale

Per sviluppare o testare in locale:

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser per interagire con Stevenario!

---

## 📄 Note e Licenza
Creato a scopo goliardico per farsi due risate tra amici. Nessun amico è stato maltrattato durante l'addestramento dell'AI.
