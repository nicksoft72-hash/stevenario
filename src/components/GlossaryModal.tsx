"use client";

import React, { useState } from "react";
import { DEFAULT_STEVE_CONFIG, StevePhrase } from "@/config/stevenario";
import { X, Search, Sparkles, BookOpen } from "lucide-react";
import { sound } from "@/lib/sound";

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlossaryModal({ isOpen, onClose }: GlossaryModalProps) {
  const [search, setSearch] = useState("");
  const [selectedRarity, setSelectedRarity] = useState<string>("Tutte");

  if (!isOpen) return null;

  const filtered = DEFAULT_STEVE_CONFIG.glossary.filter((item) => {
    const matchesSearch =
      item.phrase.toLowerCase().includes(search.toLowerCase()) ||
      item.meaning.toLowerCase().includes(search.toLowerCase()) ||
      item.context.toLowerCase().includes(search.toLowerCase());
    const matchesRarity =
      selectedRarity === "Tutte" || item.rarity === selectedRarity;
    return matchesSearch && matchesRarity;
  });

  const getRarityBadge = (rarity: StevePhrase["rarity"]) => {
    switch (rarity) {
      case "Leggendaria":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "Rara":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      default:
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-100">
                Lo Stevenario Ufficiale
              </h2>
              <p className="text-xs text-neutral-400">
                Glossario ragionato dei modi di dire e delle espressioni tipiche
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

        {/* Search & filters */}
        <div className="p-4 border-b border-neutral-800/80 bg-neutral-900/50 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Cerca un modo di dire..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["Tutte", "Comune", "Rara", "Leggendaria"].map((rarity) => (
              <button
                key={rarity}
                onClick={() => setSelectedRarity(rarity)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition whitespace-nowrap ${
                  selectedRarity === rarity
                    ? "bg-indigo-600 text-white"
                    : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {rarity}
              </button>
            ))}
          </div>
        </div>

        {/* List of expressions */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 text-sm">
              Nessun modo di dire trovato. Steve non l&apos;ha ancora pronunciato!
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm sm:text-base font-bold text-amber-300">
                    {item.phrase}
                  </h3>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${getRarityBadge(
                      item.rarity
                    )}`}
                  >
                    {item.rarity}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="text-neutral-400">
                    <span className="font-semibold text-neutral-300">Contesto: </span>
                    {item.context}
                  </p>
                  <p className="text-neutral-300">
                    <span className="font-semibold text-indigo-400">Traduzione reale: </span>
                    {item.meaning}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer tip */}
        <div className="p-3 bg-neutral-950 border-t border-neutral-800 text-center text-xs text-neutral-500">
          💡 Puoi aggiungere nuovi modi di dire modificando <code className="text-neutral-300 font-mono">src/config/stevenario.ts</code> o le env variables su Vercel.
        </div>
      </div>
    </div>
  );
}
