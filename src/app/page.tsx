"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChatInterface } from "@/components/ChatInterface";
import { SteveStats } from "@/components/SteveStats";
import { StevenateGenerator } from "@/components/StevenateGenerator";
import { StevePhotoFrame } from "@/components/StevePhotoFrame";
import { GlossaryModal } from "@/components/GlossaryModal";
import { InfoModal } from "@/components/InfoModal";
import { SITE_CONFIG } from "@/config/stevenario";
import { BookOpen, Flame } from "lucide-react";
import { sound } from "@/lib/sound";

export default function Home() {
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Controlliamo se almeno un blocco laterale è attivo da configurazione
  const hasSideBlocks =
    SITE_CONFIG.showStevenateGenerator ||
    SITE_CONFIG.showSteveStats ||
    SITE_CONFIG.showGlossaryBlock;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white relative">
      {/* Navbar con controlli rapidi */}
      <Navbar
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenInfo={() => setIsInfoOpen(true)}
      />

      {/* Main Content - Mobile-first container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3.5 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/90 text-xs font-medium text-slate-700 shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{SITE_CONFIG.headerBadgeText || "Edizione Speciale Amici"}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            Benvenuti nello{" "}
            <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 bg-clip-text text-transparent">
              {SITE_CONFIG.friendName}nario
            </span>
          </h1>

          {/* Riquadro con foto a rotazione ogni 60s (16:9) posizionato tra il titolo e la descrizione */}
          <StevePhotoFrame />

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            {SITE_CONFIG.subtitle} Fagli una domanda: ti risponderà con la sua proverbiale filosofia, un ritardo ingiustificato e una scusa inoppugnabile.
          </p>
        </div>

        {/* Layout responsive con adattamento automatico se i blocchi opzionali sono disattivati */}
        {hasSideBlocks ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
            {/* Colonna Chat (Mobile: in primo piano, Desktop: 7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <ChatInterface />
            </div>

            {/* Colonna Strumenti & Blocchi opzionali (Mobile: a seguire, Desktop: 5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Blocco 1: Generatore Automatico di Stevenate (configurabile) */}
              {SITE_CONFIG.showStevenateGenerator && <StevenateGenerator />}

              {/* Blocco 2: Scheda Steve LIVE con le 4 statistiche (configurabile) */}
              {SITE_CONFIG.showSteveStats && <SteveStats />}

              {/* Blocco 3: Il Grande Libro di Steve (configurabile) */}
              {SITE_CONFIG.showGlossaryBlock && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        Il Grande Libro di Steve
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Tutti i modi di dire tradotti dal gergo originale
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsGlossaryOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white transition whitespace-nowrap cursor-pointer active:scale-95 min-h-[38px]"
                  >
                    Esplora
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Se tutti i blocchi secondari sono disattivati, la chat si posiziona perfettamente al centro */
          <div className="max-w-2xl mx-auto w-full">
            <ChatInterface />
          </div>
        )}
      </main>

      {/* Footer pulito */}
      <footer className="border-t border-slate-200/80 bg-white py-5 px-4 mt-6 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-3 text-slate-600 font-medium">
          <button
            onClick={() => {
              sound.playClick();
              setIsGlossaryOpen(true);
            }}
            className="hover:text-indigo-600 transition cursor-pointer py-1"
          >
            Dizionario
          </button>
          <span>•</span>
          <button
            onClick={() => {
              sound.playClick();
              setIsInfoOpen(true);
            }}
            className="hover:text-indigo-600 transition cursor-pointer py-1"
          >
            Informazioni
          </button>
        </div>
        <p className="text-[11px] text-slate-400">
          {SITE_CONFIG.friendName}nario © 2026 — {SITE_CONFIG.footerText}
        </p>
      </footer>

      {/* Modali */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>
  );
}
