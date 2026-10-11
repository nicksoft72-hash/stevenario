import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getSteveSystemPrompt, DEFAULT_STEVE_CONFIG } from "@/config/stevenario";

// Risposte fallback intelligenti e divertenti quando la chiave Gemini non è ancora configurata
function getSimulatedSteveAnswer(userQuestion: string): string {
  const q = userQuestion.toLowerCase();
  
  if (q.includes("dove sei") || q.includes("ritardo") || q.includes("punto sei") || q.includes("quando arrivi")) {
    return "Tranqui ragà, sono praticamente già sotto casa vostra! Sto solo trovando parcheggio... che tradotto in lingua comune vuol dire che ho appena finito la doccia e sto decidendo quale maglietta mettere.\n\n*«La puntualità è una convenzione sociale inventata da chi non sa godersi l'attesa.»*";
  }
  
  if (q.includes("pizza") || q.includes("mangiare") || q.includes("cena") || q.includes("paga") || q.includes("sushi") || q.includes("aperitivo")) {
    return "Io stasera sto leggero, solo un assaggio per compagnia! Poi però ordino l'intero menù e offrite voi perché 'il mese scorso ho lasciato 2 euro di mancia al bar'. Andiamo dove c'è il tagliere abbondante, fidatevi di me!\n\n*«Chi divide il conto divide l'amicizia, quindi pagate voi.»*";
  }
  
  if (q.includes("lavoro") || q.includes("correre") || q.includes("palestra") || q.includes("mattina") || q.includes("aiuto")) {
    return "Guarda, ci stavo pensando proprio ieri: l'idea è magnifica, ma l'oroscopo e il bioritmo oggi me lo sconsigliano severamente. Domani mi sveglio alle 6:00 e spacco tutto, promesso (spoiler: spegnerò 4 sveglie).\n\n*«Non rimandare a domani quello che puoi evitare per sempre.»*";
  }

  // Risposta generica in pieno stile Steve
  const randomPhrases = [
    "Dipende da come la vedi! Scientificamente parlando hai ragione tu, ma filosoficamente parlando ho ragione io al 100%. Comunque ci penso io, conosco uno che risolve tutto.",
    "Ma sì, tanto che ci vuole? Due minuti, un colpo di nastro adesivo e risolviamo. Se poi salta la corrente è colpa del fornitore energetico.",
    "Ti rispondo con calma appena arrivo al bar. Mettimi da parte uno spritz intanto, che ho avuto una giornata impegnatissima a fare cose importantissime.",
    "È una domanda complessa. La risposta breve è: hai torto. La risposta lunga è: hai torto, ma con argomentazioni più dettagliate."
  ];

  const pick = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
  return `${pick}\n\n*«Steve ha parlato. Ora offrimi da bere.»*`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Messaggio mancante o non valido." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Se non c'è la chiave API, usiamo la modalità simulata intelligente
    if (!apiKey || apiKey === "TUACHIAVE_QUI" || apiKey.trim() === "") {
      const simulatedReply = getSimulatedSteveAnswer(message);
      return NextResponse.json({
        reply: simulatedReply,
        isSimulated: true,
        notice: "💡 Modalità offline: Aggiungi GEMINI_API_KEY nelle Environment Variables di Vercel per attivare Gemini AI dal vivo!"
      });
    }

    // Chiamata alle Google Gemini API tramite l'SDK ufficiale
    const ai = new GoogleGenAI({ apiKey });
    const systemPrompt = getSteveSystemPrompt();

    // Costruiamo la cronologia se presente
    const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      // Limitiamo agli ultimi 6 scambi per rapidità ed efficienza di token
      const recentHistory = history.slice(-6);
      for (const item of recentHistory) {
        if (item.sender === "user") {
          formattedContents.push({ role: "user", parts: [{ text: item.text }] });
        } else if (item.sender === "steve") {
          formattedContents.push({ role: "model", parts: [{ text: item.text }] });
        }
      }
    }

    // Aggiungiamo il messaggio corrente
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Richiesta a Gemini (usando gemini-2.5-flash)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.85,
        maxOutputTokens: 600,
      }
    });

    const replyText = response.text || "Boh, ho il cervello in buffering come al solito. Riprova tra 5 minuti!";

    return NextResponse.json({
      reply: replyText,
      isSimulated: false
    });
  } catch (error: unknown) {
    console.error("Errore nella chiamata a Stevenario:", error);
    
    // In caso di errore API (es. quota esaurita o chiave non valida), facciamo un graceful fallback
    const simulatedFallback = getSimulatedSteveAnswer("generica");
    return NextResponse.json({
      reply: `${simulatedFallback}\n\n*(Nota tecnica: c'è stato un piccolo intoppo di rete con le API, ma Steve ha comunque trovato una scusa).*`,
      isSimulated: true,
      errorNotice: error instanceof Error ? error.message : "Errore sconosciuto"
    });
  }
}
