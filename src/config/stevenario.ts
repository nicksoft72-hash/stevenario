export interface StevePhrase {
  id: string;
  phrase: string;
  context: string;
  meaning: string;
  rarity: 'Comune' | 'Rara' | 'Leggendaria';
}

export interface Stevenata {
  category: string;
  text: string;
}

export const DEFAULT_STEVE_CONFIG = {
  friendName: "Steve",
  nickname: "Il Maestro del 'Arrivo tra 5 minuti'",
  subtitle: "L'Intelligenza Artificiale non allineata, addestrata sulle migliori perle e modi di dire di Steve.",
  statusText: "🟢 Online (in realtà sta ancora dormendo)",
  
  // Info progetto
  info: {
    creator: "Nick",
    creationDate: "11 Ottobre 2026",
    lastUpdated: "11 Ottobre 2026",
    version: "2.5 Mobile Edition",
    notes: "Progetto goliardico creato per gli amici. Ogni riferimento a ritardi reali è puramente voluto."
  },

  stats: [
    { label: "Puntualità", value: "3%", description: "Calcolata con fuso orario proprio" },
    { label: "Presenza aperitivi", value: "100%", description: "Imbattibile dalle 19:00" },
    { label: "Abilità nel divagare", value: "98%", description: "Cintura nera di deviazione" },
    { label: "Perle al minuto", value: "4.2", description: "Nuovo record provinciale" },
  ],

  // I modi di dire tipici memorizzati
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

  // Stevenate generabili con un click
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

  suggestedQuestions: [
    "Steve, a che punto sei? Ci sei quasi?",
    "Steve, stasera pizza o sushi? Chi paga?",
    "Steve, mi si è rotto il rubinetto, che faccio?",
    "Steve, andiamo a correre domani mattina alle 7:00?",
    "Steve, qual è il tuo segreto per non avere mai torto?"
  ]
};

export function getSteveSystemPrompt(): string {
  const customOverride = process.env.STEVENARIO_CUSTOM_PROMPT;
  if (customOverride && customOverride.trim().length > 0) {
    return `${DEFAULT_STEVE_CONFIG.baseSystemPrompt}\n\nAGGIORNAMENTI SPECIFICI PERSONALITÀ:\n${customOverride.trim()}`;
  }
  return DEFAULT_STEVE_CONFIG.baseSystemPrompt;
}
