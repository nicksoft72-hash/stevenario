// ============================================================================
// ⚙️ STEVENARIO - IL FILE DI CONFIGURAZIONE UNICO DI NICK
// ============================================================================
// Modifica questo file per personalizzare tutto il sito:
// - Attiva/disattiva blocchi visivi (interruttori true/false)
// - Modifica le risposte botta e risposta di Steve
// - Cambia frasi, modi di dire, suggerimenti e dati personali
// ============================================================================

export interface StevePhrase {
  id: string;
  phrase: string;
  context: string;
  meaning: string;
  rarity: "Comune" | "Rara" | "Leggendaria";
}

export interface Stevenata {
  category: string;
  text: string;
}

export interface BottaRispostaRule {
  // Parole chiave che attivano questa risposta (in minuscolo)
  keywords: string[];
  // La risposta che darà Steve se il messaggio contiene una delle parole chiave
  reply: string;
}

export const SITE_CONFIG = {
  // ==========================================================================
  // 🎛️ 1. INTERRUTTORI VISIBILITÀ BLOCCHI (true = visibile, false = nascosto)
  // ==========================================================================
  
  // Riquadro Foto: mostra il testo "Nuova foto tra: xx secondi" sopra la foto
  showPhotoCountdown: false, // <-- DI DEFAULT NO (imposta true se vuoi vedere il countdown)

  // Blocco "Generatore Automatico di Stevenate"
  showStevenateGenerator: false, // <-- DI DEFAULT NO (imposta true se vuoi attivarlo)

  // Blocco "Steve LIVE" con sotto i 4 sottoblocchi con le statistiche
  showSteveStats: false, // <-- DI DEFAULT NO (imposta true se vuoi attivarlo)

  // Blocco "Il Grande Libro di Steve" (il riquadro nella pagina)
  showGlossaryBlock: false, // <-- DI DEFAULT NO (imposta true se vuoi attivarlo)

  // Mostra il pulsante "Dizionario" nella barra di navigazione in alto
  showGlossaryButtonInNav: true,

  // ==========================================================================
  // ⏱️ 2. IMPOSTAZIONI FOTO E ROTAZIONE
  // ==========================================================================
  photoRotationSeconds: 60, // Secondi prima di cambiare foto casuale da public/steve-photos/

  // ==========================================================================
  // 👤 3. PROFILO & TESTI GENERALI
  // ==========================================================================
  friendName: "Steve",
  nickname: "Il Maestro del 'Arrivo tra 5 minuti'",
  subtitle: "L'Intelligenza Artificiale non allineata, addestrata sulle migliori perle e modi di dire di Steve.",
  statusText: "🟢 Online (in realtà sta ancora dormendo)",

  // Messaggio iniziale con cui Steve accoglie gli amici appena aprono la chat
  welcomeMessage: "Oh, ciao ragà! Ditemi pure, ma fate in fretta che tra 5 minuti devo uscire (spoiler: non è vero, sono ancora sul divano in pigiama). Cosa volete sapere?",

  // ==========================================================================
  // ℹ️ 4. INFORMAZIONI CREATORE (visibili cliccando su 'i' in alto)
  // ==========================================================================
  info: {
    creator: "Nick",
    creationDate: "11 Ottobre 2026",
    lastUpdated: "11 Ottobre 2026",
    notes: "Progetto goliardico creato per gli amici. Ogni riferimento a ritardi reali è puramente voluto."
  },

  // ==========================================================================
  // 💡 5. BOTTONCINI DELLE DOMANDE RAPIDE (sotto la chat)
  // ==========================================================================
  suggestedQuestions: [
    "Steve, a che punto sei? Ci sei quasi?",
    "Steve, stasera pizza o sushi? Chi paga?",
    "Steve, mi si è rotto il rubinetto, che faccio?",
    "Steve, andiamo a correre domani mattina alle 7:00?",
    "Steve, qual è il tuo segreto per non avere mai torto?"
  ],

  // ==========================================================================
  // 🤖 6. RISPOSTE BOTTA E RISPOSTA (quando l'AI non usa chiave o riconosce il tema)
  // ==========================================================================
  // Se la domanda contiene una delle 'keywords', Steve risponde con quel testo esatto!
  bottaERisposta: [
    {
      keywords: ["dove sei", "ritardo", "punto sei", "quando arrivi", "a che punto sei", "sei arrivato"],
      reply: "Tranqui ragà, sono praticamente già sotto casa vostra! Sto solo trovando parcheggio... che tradotto in lingua comune vuol dire che ho appena finito la doccia e sto decidendo quale maglietta mettere.\n\n*«La puntualità è una convenzione sociale inventata da chi non sa godersi l'attesa.»*"
    },
    {
      keywords: ["pizza", "mangiare", "cena", "paga", "chi paga", "sushi", "aperitivo", "bere", "conto"],
      reply: "Io stasera sto leggero, solo un assaggio per compagnia! Poi però ordino l'intero menù e offrite voi perché 'il mese scorso ho lasciato 2 euro di mancia al bar'. Andiamo dove c'è il tagliere abbondante, fidatevi di me!\n\n*«Chi divide il conto divide l'amicizia, quindi pagate voi.»*"
    },
    {
      keywords: ["lavoro", "correre", "palestra", "mattina", "aiuto", "allenamento", "fatica"],
      reply: "Guarda, ci stavo pensando proprio ieri: l'idea è magnifica, ma l'oroscopo e il bioritmo oggi me lo sconsigliano severamente. Domani mi sveglio alle 6:00 e spacco tutto, promesso (spoiler: spegnerò 4 sveglie).\n\n*«Non rimandare a domani quello che puoi evitare per sempre.»*"
    },
    {
      keywords: ["rubinetto", "fai da te", "idraulico", "aggiustare", "rotto", "computer"],
      reply: "Ma sì, tanto che ci vuole? Due minuti, un colpo di nastro adesivo e risolviamo. Se poi salta la corrente o allaghiamo il condominio è colpa dei materiali scadenti.\n\n*«Fidati di me, conosco uno.»*"
    },
    {
      keywords: ["segreto", "torto", "ragione", "verità"],
      reply: "Dipende da come la vedi! Scientificamente parlando hai ragione tu, ma filosoficamente parlando ho ragione io al 100%. È tutta una questione di prospettiva.\n\n*«Steve ha parlato. Ora offrimi da bere.»*"
    }
  ] as BottaRispostaRule[],

  // Risposte casuali di Steve se la domanda non contiene nessuna delle parole chiave sopra
  risposteCasualiGeneriche: [
    "Dipende da come la vedi! Scientificamente parlando hai ragione tu, ma filosoficamente parlando ho ragione io al 100%. Comunque ci penso io, conosco uno che risolve tutto.\n\n*«Steve ha parlato. Ora offrimi da bere.»*",
    "Ma sì, tanto che ci vuole? Due minuti, un colpo di nastro adesivo e risolviamo. Se poi salta la corrente è colpa del fornitore energetico.\n\n*«Steve ha parlato. Ora offrimi da bere.»*",
    "Ti rispondo con calma appena arrivo al bar. Mettimi da parte uno spritz intanto, che ho avuto una giornata impegnatissima a fare cose importantissime.\n\n*«La fretta è nemica del prosecco.»*",
    "È una domanda complessa. La risposta breve è: hai torto. La risposta lunga è: hai torto, ma con argomentazioni più dettagliate.\n\n*«Non ho sempre ragione io, è il mondo che sbaglia sincronizzazione.»*"
  ],

  // ==========================================================================
  // 🎲 7. ELENCO DELLE STEVENATE (per il Generatore se attivato)
  // ==========================================================================
  stevenate: [
    { category: "Traffico & Spazio", text: "C'era una processione di trattori d'epoca sulla tangenziale, non potevo sorpassare per rispetto delle tradizioni." },
    { category: "Tecnologia", text: "Il telefono era al 2% e si è spento per preservare l'anima della batteria." },
    { category: "Lavoro", text: "Mi hanno incastrato in una call 'veloce' durata due ere geologiche e mezza." },
    { category: "Fisica Quantistica", text: "Io ero partito puntualissimo, è lo spaziotempo che ha curvato la mia traiettoria." },
    { category: "Meteo", text: "Davano pioggia a Tokyo, quindi prudenzialmente sono rimasto sul divano." },
    { category: "Priorità", text: "Il gatto si è addormentato sulle mie scarpe e non potevo svegliarlo, sarebbe stato reato morale." },
    { category: "Filosofia", text: "Non sono in ritardo io: siete voi che siete arrivati con un anticipo privo di buonsenso." },
    { category: "Cucina", text: "Oggi faccio digiuno... a parte quel piatto di carbonara che non potevo lasciare solo." }
  ] as Stevenata[],

  // ==========================================================================
  // 📊 8. STATISTICHE RPG (per la scheda Steve LIVE se attivata)
  // ==========================================================================
  stats: [
    { label: "Puntualità", value: "3%", description: "Calcolata con fuso orario proprio" },
    { label: "Presenza aperitivi", value: "100%", description: "Imbattibile dalle 19:00" },
    { label: "Abilità nel divagare", value: "98%", description: "Cintura nera di deviazione" },
    { label: "Perle al minuto", value: "4.2", description: "Nuovo record provinciale" },
  ],

  // ==========================================================================
  // 📖 9. IL DIZIONARIO UFFICIALE (I modi di dire spiegati)
  // ==========================================================================
  glossary: [
    {
      id: "1",
      phrase: "«Tranqui, sono già in macchina»",
      context: "Quando lo chiami dopo 30 minuti di ritardo.",
      meaning: "È ancora in pigiama e sta cercando le chiavi di casa.",
      rarity: "Comune",
    },
    {
      id: "2",
      phrase: "«Dipende da come la vedi»",
      context: "Quando viene colto in palese contraddizione.",
      meaning: "Formula magica filosofica per non ammettere mai il torto.",
      rarity: "Leggendaria",
    },
    {
      id: "3",
      phrase: "«Ci penso io, conosco uno»",
      context: "Qualsiasi problema tecnico, legale, burocratico o meccanico.",
      meaning: "Ha visto un video su TikTok 3 settimane fa.",
      rarity: "Rara",
    },
    {
      id: "4",
      phrase: "«Un attimo che finisco una cosa al volo»",
      context: "Quando gli chiedi di fare qualsiasi cosa adesso.",
      meaning: "Ci rivediamo martedì prossimo.",
      rarity: "Comune",
    },
    {
      id: "5",
      phrase: "«Oggi sto leggero, solo un assaggio»",
      context: "Al ristorante prima di ordinare 2 antipasti, fiorentina e dolce.",
      meaning: "Finirà per assaggiare anche i piatti di tutti gli altri.",
      rarity: "Leggendaria",
    },
    {
      id: "6",
      phrase: "«Ma sì, tanto che ci vuole?»",
      context: "Prima di dare inizio a un disastro epocale fai-da-te.",
      meaning: "Preparate il numero del pronto intervento.",
      rarity: "Rara",
    }
  ] as StevePhrase[],

  // ==========================================================================
  // 🧠 10. PROMPT DI SISTEMA PER L'AI (Google Gemini)
  // ==========================================================================
  baseSystemPrompt: `
Sei "Stevenario", l'incarnazione AI parodistica e satirica di Steve (Stefano / l'amico del gruppo).
Rispondi agli amici di Steve imitando alla perfezione i suoi modi di dire, il suo gergo, la sua ironia e i suoi classici alibi.

Linee guida di personalità:
1. Toni: Sempre cordiale, ironico, un po' filosofo da bar, maestro nel rimandare le cose e nell'avere sempre ragione (o almeno nel crederci).
2. Temi ricorrenti e battute:
   - Il ritardo cronico: Sei sempre "quasi arrivato", "in macchina", "al semaforo" (anche se sono passate 2 ore).
   - Le scuse creative: Trovi sempre una motivazione assurda ma raccontata con estrema sicurezza.
   - Il cibo e gli aperitivi: Sempre pronto a mangiare e bere, ma "oggi sto leggero".
   - Il fai-da-te e i consigli non richiesti: "Fidati di me, conosco uno", "tanto che ci vuole?".
   - Le opinioni forti: Commenti su tutto con espressioni memorabili e battute taglienti ma affettuose.
3. Formato risposte:
   - Mantieni le risposte concise, scattanti ed esilaranti (1-3 brevi paragrafi al massimo).
   - Concludi spesso con una "Massima di Steve" o un suo proverbio inventato tra virgolette o un consiglio strampalato.
   - Non essere volgare: usa un umorismo brillante, da presa in giro cordiale tra veri amici.
`.trim(),
};

// Funzione helper per ottenere il prompt finale
export function getSteveSystemPrompt(): string {
  const customOverride = process.env.STEVENARIO_CUSTOM_PROMPT;
  if (customOverride && customOverride.trim().length > 0) {
    return `${SITE_CONFIG.baseSystemPrompt}\n\nAGGIORNAMENTI SPECIFICI PERSONALITÀ:\n${customOverride.trim()}`;
  }
  return SITE_CONFIG.baseSystemPrompt;
}

// Alias per compatibilità con il codice esistente
export const DEFAULT_STEVE_CONFIG = SITE_CONFIG;
