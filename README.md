# 🚀 Stevenario - L'Oracolo Ufficiale di Steve

Un'applicazione web ironica, moderna e ottimizzata principalmente per il **mobile**, creata da **Nick** per farsi due risate tra amici.

---

## 🎛️ GUIDA ALLA CONFIGURAZIONE: UN UNICO FILE PER TUTTO!

Tutto il comportamento del sito, i blocchi visibili e **tutte le frasi botta e risposta** sono concentrati in **UN SOLO FILE**:

📁 **[`src/config/stevenario.ts`](src/config/stevenario.ts)**

Non serve toccare nient'altro nel codice: aprendo questo file troverai sezioni chiaramente commentate in italiano.

---

### 1. Interruttori di Visibilità dei Blocchi (Accendi / Spegni)

Nella sezione `// 🎛️ 1. INTERRUTTORI VISIBILITÀ BLOCCHI`, puoi decidere cosa mostrare e cosa nascondere:

```typescript
// Mostra il testo "Nuova foto tra: xx secondi" sul riquadro foto (di default NO)
showPhotoCountdown: false, // metti true se lo vuoi visualizzare

// Blocco "Generatore Automatico di Stevenate" (di default NO)
showStevenateGenerator: false, // metti true se lo vuoi visualizzare

// Blocco "Steve LIVE" con i 4 sottoblocchi delle statistiche (di default NO)
showSteveStats: false, // metti true se lo vuoi visualizzare

// Blocco "Il Grande Libro di Steve" sulla pagina (di default NO)
showGlossaryBlock: false, // metti true se lo vuoi visualizzare

// Mostra il pulsante "Dizionario" nella barra di navigazione in alto
showGlossaryButtonInNav: true,
```

> 💡 **Nota sul Layout**: Se lasci tutti i blocchi secondari su `false` (impostazione di default), la pagina su mobile e desktop adotta automaticamente un layout pulito, elegante e centrato sulla sola Chat e Foto!

---

### 2. Dove sono le frasi "Botta e Risposta" per Steve?

Le trovi sempre in [`src/config/stevenario.ts`](src/config/stevenario.ts) nella sezione **`bottaERisposta`**:

```typescript
bottaERisposta: [
  {
    keywords: ["dove sei", "ritardo", "quando arrivi"],
    reply: "Tranqui ragà, sono praticamente già sotto casa vostra! Sto solo trovando parcheggio..."
  },
  {
    keywords: ["pizza", "cena", "chi paga"],
    reply: "Io stasera sto leggero, solo un assaggio per compagnia! Poi però pagate voi..."
  },
  // ➕ Per aggiungere una nuova risposta, copia e incolla questo blocco:
  {
    keywords: ["calcetto", "partita"],
    reply: "Ho un risentimento al menisco sinistro dovuto al cambio di stagione, vi guardo dalla tribuna con una birra!"
  }
]
```

- **Come funziona**: Se la domanda scritta dall'amico contiene una delle parole in `keywords`, Steve risponderà immediatamente con quel testo!
- **Risposte Generiche**: Subito sotto c'è l'elenco `risposteCasualiGeneriche`: se l'amico fa una domanda che non contiene nessuna parola chiave, Steve pescherà a sorte una di quelle risposte.

---

### 3. Dove aggiornare tutte le altre frasi del sito

Sempre dentro [`src/config/stevenario.ts`](src/config/stevenario.ts) trovi ogni singola frase:

| Cosa vuoi modificare | Nome del campo in `stevenario.ts` |
| :--- | :--- |
| **Nome dell'amico** | `friendName: "Steve"` |
| **Soprannome** | `nickname: "Il Maestro del 'Arrivo tra 5 minuti'"` |
| **Sottotitolo della pagina** | `subtitle: "L'Intelligenza Artificiale non allineata..."` |
| **Messaggio di benvenuto della chat** | `welcomeMessage: "Oh, ciao ragà! Ditemi pure..."` |
| **Stato di Steve nella chat** | `statusText: "🟢 Online (in realtà sta ancora dormendo)"` |
| **Domande rapide (bottoncini sotto la chat)** | `suggestedQuestions: ["Steve, dove sei?", ...]` |
| **Elenco delle Stevenate (per il generatore)** | `stevenate: [{ category: "...", text: "..." }]` |
| **Le 4 statistiche RPG di Steve** | `stats: [{ label: "Puntualità", value: "3%" }, ...]` |
| **I modi di dire del Dizionario** | `glossary: [{ phrase: "...", meaning: "..." }]` |
| **Creatore e date nel menù Info** | `info: { creator: "Nick", creationDate: "...", lastUpdated: "..." }` |

---

### 4. Come Aggiungere Foto di Steve (anche direttamente su GitHub)

Le foto per il riquadro 16:9 si trovano nella cartella:

📁 **`public/steve-photos/`**

- Puoi inserire **fino a oltre 100 foto** (`.jpg`, `.png`, `.webp`, `.gif`).
- Puoi caricarle anche direttamente dal browser su GitHub: entra nella cartella `public/steve-photos/` e fai clic su **Add file ➔ Upload files**.
- Il sito scansiona la cartella in tempo reale e pescherà casualmente tra tutte le foto presenti!
- Il tempo di rotazione (default 60 secondi) è configurabile nel campo `photoRotationSeconds` in `stevenario.ts`.

---

## 💻 Esecuzione in Locale

```bash
# Installa le dipendenze
npm install

# Avvia il server
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) su browser o smartphone per testare l'app.

---

## 📄 Licenza e Crediti
Stevenario © 2026 — Creato da Nick per farsi due risate tra amici.
