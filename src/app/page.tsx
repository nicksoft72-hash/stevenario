"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChatInterface } from "@/components/ChatInterface";
import { SteveStats } from "@/components/SteveStats";
import { ExcuseGenerator } from "@/components/ExcuseGenerator";
import { GlossaryModal } from "@/components/GlossaryModal";
import { InfoGuideModal } from "@/components/InfoGuideModal";
import { DEFAULT_STEVE_CONFIG } from "@/config/stevenario";
import { BookOpen, Sparkles, MessageCircleQuestion, Coffee, Flame } from "lucide-react";
import { sound } from "@/lib/sound";

export default function Home() {
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Decorative gradient glow in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-indigo-600/15 via-rose-500/10 to-transparent blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-amber-500/10 blur-[120px] pointer-events-none -z-10"></div>

      {/* Header */}
      <Navbar
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenInfo={() => setIsInfoOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 shadow-inner">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Edizione Speciale Amici & Gruppo WhatsApp</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Benvenuti nello{" "}
            <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
              Stevenario
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            {DEFAULT_STEVE_CONFIG.subtitle} Fagli una domanda: ti risponderà con la sua proverbiale filosofia, un ritardo ingiustificato e una scusa inoppugnabile.
          </p>
        </div>

        {/* Core Layout: 2 Columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Chat Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <ChatInterface />
          </div>

          {/* Side Column with Steve's Tools & Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Stats Card */}
            <SteveStats />

            {/* Excuse Generator */}
            <ExcuseGenerator />

            {/* Callout Card to Open Glossary */}
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between gap-3 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-200">
                    Il Grande Libro di Steve
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Tutti i modi di dire tradotti dal gergo originale
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsGlossaryOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white transition whitespace-nowrap cursor-pointer active:scale-95"
              >
                Esplora
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950/80 py-6 px-4 mt-8 text-center text-xs text-neutral-500 space-y-2">
        <div className="flex items-center justify-center gap-4 text-neutral-400">
          <button
            onClick={() => {
              sound.playClick();
              setIsGlossaryOpen(true);
            }}
            className="hover:text-white transition"
          >
            Dizionario
          </button>
          <span>•</span>
          <button
            onClick={() => {
              sound.playClick();
              setIsInfoOpen(true);
            }}
            className="hover:text-white transition"
          >
            Guida Deploy & Gemini API
          </button>
        </div>
        <p>
          Stevenario © 2026 — Creato a scopo goliardico per farsi due risate tra amici. Nessun amico è stato maltrattato durante l&apos;addestramento dell&apos;AI.
        </p>
      </footer>

      {/* Modals */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <InfoGuideModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>
  );
}
