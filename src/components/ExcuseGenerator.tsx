"use client";

import React, { useState } from "react";
import { DEFAULT_STEVE_CONFIG, SteveExcuse } from "@/config/stevenario";
import { Sparkles, Dices, Copy, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/sound";

export function ExcuseGenerator() {
  const [currentExcuse, setCurrentExcuse] = useState<SteveExcuse>(
    DEFAULT_STEVE_CONFIG.excuses[0]
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [copied, setCopied] = useState(false);

  const rollNewExcuse = () => {
    sound.playClick();
    setIsSpinning(true);

    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * DEFAULT_STEVE_CONFIG.excuses.length);
      setCurrentExcuse(DEFAULT_STEVE_CONFIG.excuses[randomIdx]);
      counter++;
      if (counter > 6) {
        clearInterval(interval);
        setIsSpinning(false);
        sound.playTada();
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#f59e0b", "#ec4899", "#8b5cf6"]
        });
      }
    }, 70);
  };

  const copyExcuse = async () => {
    sound.playClick();
    try {
      await navigator.clipboard.writeText(
        `«${currentExcuse.excuse}» — Scusa ufficiale di Steve (${currentExcuse.category})`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 via-neutral-900 to-indigo-950/40 border border-amber-500/20 p-4 sm:p-5 relative overflow-hidden shadow-lg">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-neutral-100 text-sm sm:text-base">
            Generatore Automatico di Alibi & Scuse
          </h3>
        </div>

        <button
          onClick={rollNewExcuse}
          disabled={isSpinning}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-neutral-950 shadow-md shadow-amber-500/20 transition active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <Dices className={`w-4 h-4 ${isSpinning ? "animate-spin" : ""}`} />
          <span>Genera Scusa</span>
        </button>
      </div>

      <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Categoria: {currentExcuse.category}
            </span>
          </div>
          <p className="text-sm sm:text-base font-medium text-neutral-200 italic leading-relaxed">
            &ldquo;{currentExcuse.excuse}&rdquo;
          </p>
        </div>

        <div className="flex items-center justify-end">
          <button
            onClick={copyExcuse}
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-400 hover:text-neutral-200 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiata negli appunti!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copia per il gruppo WhatsApp</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
