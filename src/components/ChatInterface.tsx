"use client";

import React, { useState, useRef, useEffect } from "react";
import { DEFAULT_STEVE_CONFIG, SITE_CONFIG } from "@/config/stevenario";
import { Send, User, Sparkles, RotateCcw, Copy, Check, Share2, Brain, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/sound";

interface Message {
  id: string;
  sender: "user" | "steve";
  text: string;
  timestamp: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "steve",
      text: SITE_CONFIG.welcomeMessage,
      timestamp: "Adesso",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAiConnected, setIsAiConnected] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Verifica lo stato di connessione con l'AI reale di Gemini
  useEffect(() => {
    async function checkAiStatus() {
      try {
        const res = await fetch("/api/chat");
        if (res.ok) {
          const data = await res.json();
          setIsAiConnected(Boolean(data.isAiConnected));
        }
      } catch {
        setIsAiConnected(false);
      }
    }
    checkAiStatus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    sound.playClick();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: newHistory.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "Boh, ho il cervello in standby. Riprova tra 5 minuti!";

      if (typeof data.isSimulated === "boolean") {
        setIsAiConnected(!data.isSimulated);
      }

      const steveMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "steve",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, steveMsg]);
      sound.playSteveReply();

      // Coriandoli animati
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.85 },
        colors: ["#6366f1", "#a855f7", "#f59e0b"],
      });
    } catch {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "steve",
        text: "Tranqui ragà, mi è saltata la connessione perché 'conoscevo uno' che mi installava la fibra a metà prezzo... Riprova tra un attimo!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleCopyMessage = async (msg: Message) => {
    sound.playClick();
    try {
      await navigator.clipboard.writeText(
        `Steve dice:\n"${msg.text}"\n\n— da Stevenario`
      );
      setCopiedId(msg.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleShareWhatsApp = (msg: Message) => {
    sound.playClick();
    const text = encodeURIComponent(`Sentenza di Steve:\n«${msg.text}»\n\n(Chiedi anche tu su Stevenario!)`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleReset = () => {
    sound.playClick();
    setMessages([
      {
        id: "welcome-reset",
        sender: "steve",
        text: "Tabula rasa! Come se non avessi mai detto niente (mia specialità). Di cosa vogliamo parlare adesso?",
        timestamp: "Adesso",
      },
    ]);
  };

  return (
    <div className="relative group">
      {/* Glow d'effetto per far risaltare il riquadro come elemento principale */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-rose-500/15 to-amber-500/20 blur-lg opacity-80 pointer-events-none -z-10"></div>

      {/* Contenitore principale della Chat */}
      <div className="flex flex-col h-[520px] sm:h-[600px] rounded-3xl bg-white border-2 border-indigo-200/90 shadow-2xl shadow-indigo-900/10 overflow-hidden ring-1 ring-black/5">
        
        {/* Header superiore in risalto */}
        <div className="px-4 py-3 border-b border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-white to-amber-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar iconico con badge di stato */}
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white text-base font-black shadow-md shadow-indigo-500/20">
                🕶️
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">
                  L&apos;Oracolo di {SITE_CONFIG.friendName}
                </h3>
              </div>
              
              {/* Badge indicatore di addestramento */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                  <Brain className="w-3 h-3 text-indigo-600" />
                  AI Addestrata da {SITE_CONFIG.info.creator}
                </span>

                {isAiConnected && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <Zap className="w-2.5 h-2.5 text-emerald-600" />
                    Gemini Live
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Azione pulisci conversazione */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer active:scale-95 border border-slate-200/60"
            title="Ricomincia conversazione"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold hidden xs:inline">Pulisci</span>
          </button>
        </div>

        {/* Area scorrimento messaggi */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 bg-slate-50/50">
          {messages.map((m) => {
            const isSteve = m.sender === "steve";
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 max-w-[92%] sm:max-w-[85%] ${
                  isSteve ? "self-start" : "self-end ml-auto flex-row-reverse"
                }`}
              >
                {/* Avatar bolla */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                    isSteve
                      ? "bg-gradient-to-tr from-amber-500 to-indigo-600 text-white"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  {isSteve ? "S" : <User className="w-4 h-4" />}
                </div>

                {/* Bolla del testo */}
                <div className="space-y-1 group">
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs transition ${
                      isSteve
                        ? "bg-white text-slate-900 border border-indigo-100 rounded-tl-xs whitespace-pre-wrap ring-1 ring-black/5"
                        : "bg-indigo-600 text-white rounded-tr-xs shadow-indigo-600/20"
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Azioni rapide per Steve */}
                  <div
                    className={`flex items-center gap-2 text-[10px] text-slate-400 px-1 ${
                      isSteve ? "justify-start" : "justify-end"
                    }`}
                  >
                    <span>{m.timestamp}</span>

                    {isSteve && (
                      <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition">
                        <button
                          onClick={() => handleCopyMessage(m)}
                          className="hover:text-slate-800 transition p-0.5 cursor-pointer flex items-center gap-1"
                          title="Copia risposta"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span className="hidden sm:inline">Copia</span>
                        </button>

                        <button
                          onClick={() => handleShareWhatsApp(m)}
                          className="hover:text-emerald-600 transition p-0.5 cursor-pointer flex items-center gap-1"
                          title="Invia su WhatsApp"
                        >
                          <Share2 className="w-3 h-3" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bolla di caricamento pensante */}
          {isLoading && (
            <div className="flex gap-2.5 max-w-[85%] self-start animate-fade-in">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                S
              </div>
              <div className="rounded-2xl rounded-tl-xs px-4 py-2.5 bg-white border border-indigo-100 flex items-center gap-2 text-xs text-slate-600 shadow-xs">
                <span className="text-indigo-600 font-semibold">{SITE_CONFIG.friendName} sta elaborando...</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Domande rapide in evidenza */}
        <div className="px-3.5 sm:px-4 py-2 border-t border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="text-slate-500 shrink-0 mr-1 font-semibold">Chiedi al volo:</span>
          {DEFAULT_STEVE_CONFIG.suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200/90 hover:border-indigo-200 whitespace-nowrap transition cursor-pointer active:scale-95 disabled:opacity-50 min-h-[30px] font-medium"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Barra di input evidenziata */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-indigo-100 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Chiedi qualsiasi cosa a ${SITE_CONFIG.friendName}...`}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition disabled:opacity-50 min-h-[44px]"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md shadow-indigo-600/25 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-h-[44px]"
          >
            <span>Invia</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
