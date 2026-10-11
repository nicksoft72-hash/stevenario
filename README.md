# 🚀 Stevenario - L'Oracolo AI di Steve

Un'applicazione Next.js goliardica e satirica creata appositamente per essere condivisa con gli amici e pubblicata con un click su **Vercel**.

---

## 🎭 Cos'è Stevenario?
Un bot / web app parodistica addestrata a rispondere come il classico amico del gruppo:
- Ritardi cronici giustificati da teorie cosmiche
- Risposte da filosofo del bar dello sport
- Un **Glossario interattivo** con i modi di dire leggendari e la loro reale traduzione
- Un **Generatore automatico di scuse** per sparire dagli impegni
- **Condivisione istantanea** su WhatsApp delle risposte più memorabili

---

## 🤖 Come funziona con l'AI di Google (Gemini)

> **Nota sui "Google Gems"**: I *Gems* creati su `gemini.google.com` sono un'interfaccia proprietaria per consumatori e non offrono endpoint API pubblici diretti. 
> Per ottenere lo stesso identico risultato (e persino migliore!), **Stevenario** utilizza le **Google Gemini API** ufficiali con `systemInstruction` personalizzabili.

### 1. Ottenere la chiave Gemini gratuita
1. Vai su [Google AI Studio](https://aistudio.google.com/apikey).
2. Clicca su **"Create API Key"**.
3. Copia la chiave.

### 2. Configurazione locale
Crea un file `.env.local` nella cartella del progetto:
```bash
GEMINI_API_KEY=la_tua_chiave_api_qui
```

> **Funziona anche senza chiave!** Se non inserisci la chiave API, Stevenario passa automaticamente alla **Modalità Simulata Offline**, rispondendo comunque con un set di battute e alibi preconfigurati senza generare errori 500.

---

## ⚡ Come aggiornare le risposte di Steve senza toccare il codice

Vuoi aggiungere una nuova battuta o un aneddoto del weekend senza modificare il codice o rifare il deploy?
Puoi farlo in 2 modi semplicissimi:

### Metodo 1: Dalla dashboard di Vercel (Consigliato!)
Nelle impostazioni del tuo progetto su Vercel:
`Settings` ➔ `Environment Variables` ➔ aggiungi:
- **Nome**: `STEVENARIO_CUSTOM_PROMPT`
- **Valore**: Il testo con i nuovi modi di dire o aneddoti (es. *"Ieri sera ha perso le chiavi della macchina dentro la borsa della palestra; dice sempre 'ci penso io'."*)

Ogni richiesta all'AI integrerà immediatamente le nuove istruzioni!

### Metodo 2: Modificando `src/config/stevenario.ts`
All'interno di [`src/config/stevenario.ts`](src/config/stevenario.ts) trovi:
- Il nome e il soprannome
- Le statistiche della scheda personaggio
- Il glossario dei modi di dire con rarità (*Comune*, *Rara*, *Leggendaria*)
- L'elenco delle scuse generabili a rotazione

---

## 🌐 Deploy su Vercel in 2 Minuti

1. **Inizializza la repo Git e fai il push su GitHub**:
   ```bash
   git add .
   git commit -m "feat: Stevenario v1.0"
   git branch -M main
   # collega alla tua repo GitHub:
   git remote add origin https://github.com/tuo-username/stevenario.git
   git push -u origin main
   ```

2. **Importa su Vercel**:
   - Vai su [vercel.com/new](https://vercel.com/new)
   - Seleziona la repository **stevenario**
   - Inserisci la variabile d'ambiente `GEMINI_API_KEY` (opzionale ma consigliata)
   - Clicca **Deploy**!

Il link pubblico sarà pronto da inviare nel gruppo WhatsApp degli amici! 🎉

---

## 💻 Esecuzione in Locale

```bash
npm install
npm run dev
```

Apri `http://localhost:3000` nel browser.
