import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getSteveSystemPrompt, SITE_CONFIG } from "@/config/stevenario";

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

    // Chiamata alle Google Gemini API tramite l'SDK ufficiale
    const ai = new GoogleGenAI({ apiKey });
    const systemPrompt = getSteveSystemPrompt();

    // Costruiamo la cronologia se presente
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

    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Richiesta a Gemini (gemini-2.5-flash)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.85,
        maxOutputTokens: 600,
      }
    });

    const replyText = response.text || "Boh, ho il cervello in standby. Riprova tra 5 minuti!";

    return NextResponse.json({
      reply: replyText,
      isSimulated: false
    });
  } catch (error: unknown) {
    console.error("Errore API:", error);
    const simulatedFallback = getSimulatedSteveAnswer("generica");
    return NextResponse.json({
      reply: simulatedFallback,
      isSimulated: true
    });
  }
}
