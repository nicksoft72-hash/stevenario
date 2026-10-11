import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { getSteveSystemPrompt, SITE_CONFIG } from "@/config/stevenario";

// Legge direttamente il file dossier.md senza bisogno di formattazioni particolari
function getDynamicDossierPrompt(): string {
  try {
    const dossierPath = path.join(process.cwd(), "src", "config", "dossier.md");
    if (fs.existsSync(dossierPath)) {
      const rawDossier = fs.readFileSync(dossierPath, "utf-8");
      return `
Sei "Stevenario", l'incarnazione AI comica, satirica e parodistica di Steven, creata e addestrata da Nick per farsi due risate con gli amici del gruppo.
Rispondi agli amici immedesimandoti AL 100% in prima persona ("Io") nel personaggio Steven descritto nel seguente DOSSIER UFFICIALE:

================================================================================
📜 DOSSIER UFFICIALE DI STEVEN:
================================================================================
${rawDossier}
================================================================================

ISTRUZIONI DI INTERPRETAZIONE PER LE RISPOSTE:
1. TONO: Parli in prima persona ("Io"), difendendo sempre le tue scelte con totale disinvoltura, orgoglio e convinzione incrollabile.
2. BOLOGNA & MULINO: Per te Bologna è l'apice della civiltà e del riscatto sociale. Se ti nominano Mulino, devia con fastidio o cambia discorso. Ricorda la tua foto immancabile in Piazza Santo Stefano, il pedicure con Val, il panino con la mortadella e la fuga strategica prima che inizi l'aperitivo serale con gli amici.
3. IL MISTERO DEL 2015 & BUCUREST: Se ti chiedono del 2015, svicola con fare misterioso ("sono faccende complesse di alta finanza", "dinamiche geopolitiche"). Difendi i tuoi viaggi low-cost in Romania definendoli "esperienze autentiche per veri viaggiatori, non per turisti da villaggio vacanze".
4. LA VIRGIN A 45 KM: Sei un atleta a tutti gli effetti. I 45 km di macchina per raggiungere la Virgin sono la prova inconfutabile della tua dedizione sportiva, anche se nessuno ti ha mai visto toccare un bilanciere.
5. IL CORRETTORE AUTOMATICO: Se commetti o ti fanno notare strafalcioni grammaticali, la colpa è al 100% del correttore dello smartphone o dell'algoritmo. Se ti contestano qualcosa a voce, rispondi con un silenzio solenne e imbarazzato.
6. SALTO SUL CARRO: Tu hai SEMPRE saputo chi avrebbe vinto (nello sport, in F1, nella vita) prima di tutti gli altri. Tu sul carro ci sei salito prima che lo costruissero.
7. LE MOROSINE: Parli delle ragazze che frequenti ("morosine" di cui conosci soprattutto i profili Instagram) con l'aria di un nobile seduttore dell'alta aristocrazia.
8. FORMATO: Risposte scattanti, brillanti, comiche e spigliate (1-3 brevi paragrafi). Sei irresistibile e fiero di essere Steven!
`.trim();
    }
  } catch (err) {
    console.error("Errore lettura dossier.md:", err);
  }

  return getSteveSystemPrompt();
}

// Risposte botta e risposta lette direttamente dal file unico di configurazione (stevenario.ts)
function getSimulatedSteveAnswer(userQuestion: string): string {
  const q = userQuestion.toLowerCase();
  
  // 1. Controlla se la domanda corrisponde a una regola con parole chiave
  if (Array.isArray(SITE_CONFIG.bottaERisposta)) {
    for (const rule of SITE_CONFIG.bottaERisposta) {
      if (rule.keywords && rule.keywords.some((k) => q.includes(k.toLowerCase()))) {
        return rule.reply;
      }
    }
  }

  // 2. Se non corrisponde, seleziona una risposta a caso dall'elenco generico
  const randomList = SITE_CONFIG.risposteCasualiGeneriche;
  if (Array.isArray(randomList) && randomList.length > 0) {
    return randomList[Math.floor(Math.random() * randomList.length)];
  }

  return "Dipende da come la vedi! Comunque ci penso io, conosco uno.\n\n*«Steve ha parlato. Ora offrimi da bere.»*";
}

// Endpoint GET per verificare lo stato di connessione con la vera AI
export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  const isAiConnected = Boolean(
    apiKey && apiKey !== "TUACHIAVE_QUI" && apiKey.trim().length > 0
  );

  return NextResponse.json({
    isAiConnected,
    model: "Google Gemini 3.5 Flash",
    trainer: SITE_CONFIG.info.creator,
  });
}

// Endpoint POST per chattare con Steve
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Messaggio non valido." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Se non c'è la chiave API, usiamo la modalità simulata intelligente con le risposte di stevenario.ts
    if (!apiKey || apiKey === "TUACHIAVE_QUI" || apiKey.trim() === "") {
      const simulatedReply = getSimulatedSteveAnswer(message);
      return NextResponse.json({
        reply: simulatedReply,
        isSimulated: true,
      });
    }

    // Chiamata alla VERA AI di Google Gemini tramite l'SDK ufficiale
    const ai = new GoogleGenAI({ apiKey });
    const systemPrompt = getDynamicDossierPrompt();

    // Costruiamo la cronologia dei messaggi
    const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6);
      for (const item of recentHistory) {
        if (item.sender === "user") {
          formattedContents.push({ role: "user", parts: [{ text: item.text }] });
        } else if (item.sender === "steve") {
          formattedContents.push({ role: "model", parts: [{ text: item.text }] });
        }
      }
    }

    // Aggiungiamo la domanda corrente
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Generazione della risposta con il modello Google Gemini 3.5 Flash addestrato
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.85,
        maxOutputTokens: 800,
      }
    });

    const replyText = response.text || "Boh, ho il cervello in standby. Riprova tra 5 minuti!";

    return NextResponse.json({
      reply: replyText,
      isSimulated: false,
    });
  } catch (error: unknown) {
    console.error("Errore API Gemini:", error);
    const simulatedFallback = getSimulatedSteveAnswer("generica");
    return NextResponse.json({
      reply: simulatedFallback,
      isSimulated: true
    });
  }
}
