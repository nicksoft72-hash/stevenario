"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Sparkles, MessageSquareHeart, Info, Share2, Check } from "lucide-react";
import { sound } from "@/lib/sound";

interface NavbarProps {
  onOpenGlossary: () => void;
  onOpenInfo: () => void;
}

export function Navbar({ onOpenGlossary, onOpenInfo }: NavbarProps) {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  const handleShare = async () => {
    sound.playClick();
    if (typeof window !== "undefined") {
      try {
        if (navigator.share) {
          await navigator.share({
            title: "Stevenario - L'AI Ufficiale di Steve",
            text: "Fai una domanda all'Oracolo di Steve prima che cambi idea!",
            url: window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(window.location.href);
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 2500);
        }
      } catch {
        // Ignora se l'utente annulla la condivisione
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800/80 transition-all">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white font-black text-xl shadow-lg shadow-rose-500/20 ring-1 ring-white/20">
            S
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl text-neutral-100 tracking-tight">
                Stevenario <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">v2.5 AI</span>
              </h1>
            </div>
            <p className="text-xs text-neutral-400 hidden sm:block">
              L&apos;Oracolo AI addestrato sulle perle e i ritardi di Steve
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGlossary}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition"
            title="Dizionario dei modi di dire"
          >
            <MessageSquareHeart className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">Dizionario</span>
          </button>

          <button
            onClick={toggleAudio}
            className={`p-2 rounded-lg border transition text-xs ${
              audioEnabled
                ? "bg-neutral-900 border-neutral-800 text-amber-400 hover:bg-neutral-800"
                : "bg-neutral-900/50 border-neutral-800 text-neutral-500 hover:text-neutral-300"
            }`}
            title={audioEnabled ? "Audio attivo" : "Audio disattivato"}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-md shadow-indigo-600/20 transition active:scale-95"
            title="Condividi con il gruppo"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? "Copiato!" : "Condividi"}</span>
          </button>

          <button
            onClick={onOpenInfo}
            className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition"
            title="Come personalizzare Steve e configurare Vercel"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
