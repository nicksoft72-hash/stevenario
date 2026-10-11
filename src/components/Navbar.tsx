"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, BookOpen, Info, Share2, Check } from "lucide-react";
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200/90 transition-all shadow-xs">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white font-black text-lg sm:text-xl shadow-md shadow-rose-500/20">
            S
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                Stevenario
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-200">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              L&apos;Oracolo AI addestrato sulle perle e i ritardi di Steve
            </p>
          </div>
        </div>

        {/* Actions - Touch friendly */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenGlossary}
            className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition active:scale-95 cursor-pointer min-h-[36px]"
            title="Dizionario dei modi di dire"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="text-xs">Dizionario</span>
          </button>

          <button
            onClick={toggleAudio}
            className={`p-2 rounded-lg border transition text-xs min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer ${
              audioEnabled
                ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                : "bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600"
            }`}
            title={audioEnabled ? "Audio attivo" : "Audio disattivato"}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20 transition active:scale-95 cursor-pointer min-h-[36px]"
            title="Condividi con il gruppo"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden xs:inline">{copiedLink ? "Copiato!" : "Condividi"}</span>
          </button>

          <button
            onClick={onOpenInfo}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            title="Info sul progetto"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
