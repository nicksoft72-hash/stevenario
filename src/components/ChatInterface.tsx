"use client";

import React, { useState, useRef, useEffect } from "react";
import { DEFAULT_STEVE_CONFIG } from "@/config/stevenario";
import { Send, Bot, User, Sparkles, RotateCcw, Copy, Check, Share2, AlertCircle } from "lucide-react";
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
      text: "Oh, ciao ragà! Ditemi pure, ma fate in fretta che tra 5 minuti devo uscire (spoiler: non è vero, sono ancora sul divano in pigiama). Cosa volete sapere?",
      timestamp: "Adesso",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [systemNotice, setSystemNotice] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      const replyText = data.reply || "Boh, ho il cervello in standby. Riprova!";

      if (data.notice && !systemNotice) {
        setSystemNotice(data.notice);
      }

      const steveMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "steve",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, steveMsg]);
      sound.playSteveReply();

      // Confetti burst per risposte epiche
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.85 },
        colors: ["#6366f1", "#a855f7", "#ec4899"],
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
        `Steve dice:\n"${msg.text}"\n\n— generato con Stevenario`
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
    <div className="flex flex-col h-[580px] sm:h-[640px] rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Header bar */}
      <div className="px-4 py-3 border-b border-neutral-800/80 bg-neutral-950/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-500/30">
              S
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-950"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-neutral-200 text-sm">
                Oracolo di Steve
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 font-mono">
                {DEFAULT_STEVE_CONFIG.statusText}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2 py-1 rounded-lg hover:bg-neutral-800 transition"
          title="Ricomincia chat"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Pulisci</span>
        </button>
      </div>

      {/* Notice bar se in modalità simulata */}
      {systemNotice && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center gap-2 text-xs text-amber-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">{systemNotice}</span>
        </div>
      )}

      {/* Messages scroll area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => {
          const isSteve = m.sender === "steve";
          return (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[88%] sm:max-w-[80%] ${
                isSteve ? "self-start" : "self-end ml-auto flex-row-reverse"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-md ${
                  isSteve
                    ? "bg-gradient-to-tr from-indigo-600 to-purple-600 text-white"
                    : "bg-neutral-800 text-neutral-300"
                }`}
              >
                {isSteve ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div className="space-y-1 group">
                <div
                  className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm transition ${
                    isSteve
                      ? "bg-neutral-950/90 text-neutral-100 border border-neutral-800/80 rounded-tl-sm whitespace-pre-wrap"
                      : "bg-indigo-600 text-white rounded-tr-sm"
                  }`}
                >
                  {m.text}
                </div>

                {/* Sub row with timestamp & actions for Steve */}
                <div
                  className={`flex items-center gap-2 text-[10px] text-neutral-500 px-1 ${
                    isSteve ? "justify-start" : "justify-end"
                  }`}
                >
                  <span>{m.timestamp}</span>

                  {isSteve && (
                    <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleCopyMessage(m)}
                        className="hover:text-neutral-300 transition"
                        title="Copia risposta"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>

                      <button
                        onClick={() => handleShareWhatsApp(m)}
                        className="hover:text-emerald-400 transition"
                        title="Condividi su WhatsApp"
                      >
                        <Share2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading typing bubble */}
        {isLoading && (
          <div className="flex gap-3 max-w-[80%] self-start">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-neutral-950/90 border border-neutral-800/80 flex items-center gap-2 text-xs text-neutral-400">
              <span className="text-amber-400 font-medium">Steve sta elaborando una scusa epica</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested chips */}
      <div className="px-4 py-2 border-t border-neutral-800/60 bg-neutral-950/40 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="text-neutral-500 shrink-0 mr-1 font-medium">Idee rapide:</span>
        {DEFAULT_STEVE_CONFIG.suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 whitespace-nowrap transition cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-neutral-950 border-t border-neutral-800/80 flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scrivi a Steve (es. 'A che ora ci vediamo stasera?')..."
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <span className="hidden sm:inline">Chiedi</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
