# 🚀 Stevenario - L'Oracolo Ufficiale e Dizionario di Steve

Un'applicazione web ironica, moderna e ottimizzata principalmente per il **mobile**, creata per farsi due risate tra amici. 

---

## 📱 Caratteristiche Principali

- **Mobile First**: Interfaccia curata e pensata con precedenza assoluta per smartphone (pulsanti touch ergonomici, proporzioni fluide, caricamento istantaneo).
- **Tema Chiaro**: Look pulito, moderno, con contrasti nitidi e palette armoniosa.
- **Riquadro Foto Dinamico (16:9)**:
  - Posizionato tra il titolo e la descrizione.
  - Carica a rotazione ogni **60 secondi** una foto a caso dalla cartella `public/steve-photos/`.
  - Include un timer visivo discreto e un pulsante per cambiare foto manualmente.
  - **Come aggiungere foto**: Basta inserire qualsiasi immagine (`.jpg`, `.png`, `.webp`, ecc.) all'interno della cartella `public/steve-photos/` (anche direttamente caricandola su GitHub!). L'app ne gestisce automaticamente da 1 a oltre 100 pescandole a caso.
- **L'Oracolo di Steve (Chat AI)**:
  - Chat interattiva con chip di domande rapide (*"Steve, dove sei?"*, *"Chi paga la cena stasera?"*).
  - Tasto rapido per **condividere la risposta direttamente su WhatsApp**.
- **Generatore Automatico di Stevenate**:
  - Sorteggio casuale di perle e alibi di Steve con pulsante *"Genera Stevenata"*, coriandoli ed effetti sonori sintetizzati.
- **Scheda Personaggio RPG**:
  - Statistiche di Steve (*Puntualità: 3%*, *Presenza aperitivi: 100%*, ecc.).
- **Lo Stevenario Ufficiale**:
  - Glossario completo con ricerca, contesto, reale traduzione e classificazione per rarità (*Comune*, *Rara*, *Leggendaria*).
- **Menù Info**:
  - Creatore: **Nick**
  - Data Creazione: **11 Ottobre 2026**
  - Ultimo Aggiornamento Frasi: **11 Ottobre 2026**

---

## 📁 Struttura Cartelle per le Foto

```
stevenario/
└── public/
    └── steve-photos/     <--- Inserisci qui le foto di Steve (anche direttamente da GitHub)
        ├── steve-1.jpg
        ├── steve-2.jpg
        └── ...
```

---

## 💻 Esecuzione in Locale

```bash
npm install
npm run dev
```

Apri `http://localhost:3000` dal browser dello smartphone o del computer.

---

## 📄 Note
Stevenario © 2026 — Creato da Nick per farsi due risate tra amici.
