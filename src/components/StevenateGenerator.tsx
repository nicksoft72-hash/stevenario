"use client";

import React, { useState } from "react";
import { DEFAULT_STEVE_CONFIG, Stevenata } from "@/config/stevenario";
import { Sparkles, Dices, Copy, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/sound";

export function StevenateGenerator() {
  const [currentStevenata, setCurrentStevenata] = useState<Stevenata>(
    DEFAULT_STEVE_CONFIG.stevenate[0]
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [copied, setCopied] = useState(false);

  const rollNewStevenata = () => {
    sound.playClick();
    setIsSpinning(true);

    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * DEFAULT_STEVE_CONFIG.stevenate.length);
      setCurrentStevenata(DEFAULT_STEVE_CONFIG.stevenate[randomIdx]);
      counter++;
      if (counter > 6) {
        clearInterval(interval);
        setIsSpinning(false);
        sound.playTada();
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#f59e0b", "#ec4899", "#6366f1"]
        });
      }
    }, 70);
  };

  const copyStevenata = async () => {
    sound.playClick();
    try {
      await navigator.clipboard.writeText(
        `«${currentStevenata.text}» — Stevenata Ufficiale (${currentStevenata.category})`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-white to-orange-50/30 border border-amber-200/80 p-4 sm:p-5 shadow-sm relative overflow-hidden">
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            Generatore Automatico di Stevenate
          </h3>
        </div>

        <button
          onClick={rollNewStevenata}
          disabled={isSpinning}
          className="w-full xs:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white shadow-sm shadow-amber-500/20 transition active:scale-95 disabled:opacity-50 cursor-pointer min-h-[40px]"
        >
          <Dices className={`w-4 h-4 ${isSpinning ? "animate-spin" : ""}`} />
          <span>Genera Stevenata</span>
        </button>
      </div>

      <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              Tema: {currentStevenata.category}
            </span>
          </div>
          <p className="text-sm sm:text-base font-medium text-slate-800 italic leading-relaxed">
            &ldquo;{currentStevenata.text}&rdquo;
          </p>
        </div>

        <div className="flex items-center justify-end pt-1 border-t border-slate-100">
          <button
            onClick={copyStevenata}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition py-1 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copiata per WhatsApp!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copia per il gruppo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Per compatibilità retroattiva
export const ExcuseGenerator = StevenateGenerator;
