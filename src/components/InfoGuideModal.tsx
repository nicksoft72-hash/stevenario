"use client";

import React from "react";
import { X, Sparkles, Key, Cloud, ShieldCheck, HeartHandshake } from "lucide-react";
import { sound } from "@/lib/sound";

interface InfoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoGuideModal({ isOpen, onClose }: InfoGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-100">
                Guida & Deploy su Vercel
              </h2>
              <p className="text-xs text-neutral-400">
                Come collegare Gemini AI e aggiornare le battute di Steve senza toccare il codice
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-neutral-300">
          {/* Card 1: Vercel Deploy */}
          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <Cloud className="w-4 h-4 text-indigo-400" />
              <span>1. Come pubblicare il sito su Vercel</span>
            </div>
            <p className="text-neutral-400">
              Il progetto è un&apos;applicazione Next.js nativa al 100% pronta per Vercel:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-neutral-300 ml-1">
              <li>Crea un repository su GitHub (es. <code className="bg-neutral-800 px-1 py-0.5 rounded text-amber-300">stevenario</code>).</li>
              <li>Fai il push del codice nel repository.</li>
              <li>Accedi a <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-indigo-400 underline">Vercel</a>, clicca &quot;Add New Project&quot; e importa la repo.</li>
              <li>Vercel rileverà Next.js automaticamente: clicca &quot;Deploy&quot;!</li>
            </ol>
          </div>

          {/* Card 2: Gemini API Key */}
          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <Key className="w-4 h-4 text-amber-400" />
              <span>2. Come collegare l&apos;AI di Google (Gemini)</span>
            </div>
            <p className="text-neutral-400">
              I &quot;Gems&quot; di gemini.google.com sono solo per l&apos;interfaccia web e non hanno API pubbliche. Con <strong>Google AI Studio</strong> (gratuito) puoi ottenere la chiave in 10 secondi:
            </p>
            <ul className="list-disc list-inside space-y-1 text-neutral-300 ml-1">
              <li>Vai su <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="text-amber-400 underline">Google AI Studio</a> e clicca &quot;Create API Key&quot;.</li>
              <li>Nelle impostazioni del progetto su Vercel (o in <code className="bg-neutral-800 px-1 py-0.5 rounded text-amber-300">.env.local</code>), aggiungi:</li>
            </ul>
            <pre className="p-2.5 rounded-lg bg-black border border-neutral-800 text-[11px] font-mono text-emerald-400 overflow-x-auto">
GEMINI_API_KEY=AIzaSy...la-tua-chiave
            </pre>
            <p className="text-neutral-400 text-xs">
              Se non metti la chiave, Stevenario funziona comunque in modalità simulata con le sue perle preimpostate!
            </p>
          </div>

          {/* Card 3: Customizing Steve without touching code */}
          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>3. Aggiornare le battute di Steve senza toccare il codice</span>
            </div>
            <p className="text-neutral-400">
              Puoi aggiungere nuovi aneddoti, intercalari e modi di dire in qualsiasi momento impostando la variabile d&apos;ambiente su Vercel:
            </p>
            <pre className="p-2.5 rounded-lg bg-black border border-neutral-800 text-[11px] font-mono text-indigo-300 overflow-x-auto whitespace-pre-wrap">
STEVENARIO_CUSTOM_PROMPT=Ricordati che dice sempre &quot;eh la peppa&quot; e che lunedì scorso si è scordato il portafoglio a Rimini.
            </pre>
            <p className="text-neutral-400 text-xs">
              Ogni volta che modifichi questa variabile su Vercel, l&apos;AI apprenderà istantaneamente le nuove battute!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-xs text-neutral-500 flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-rose-500" /> Fatto per divertirsi tra amici
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs transition"
          >
            Ho capito
          </button>
        </div>
      </div>
    </div>
  );
}
