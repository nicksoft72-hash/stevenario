"use client";

import React, { useState } from "react";
import { DEFAULT_STEVE_CONFIG, StevePhrase } from "@/config/stevenario";
import { X, Search, BookOpen } from "lucide-react";
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
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Rara":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Lo Stevenario Ufficiale
              </h2>
              <p className="text-xs text-slate-500">
                Glossario ragionato dei modi di dire e delle espressioni tipiche
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & filters - Mobile ergonomic */}
        <div className="p-3 sm:p-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cerca un modo di dire..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {["Tutte", "Comune", "Rara", "Leggendaria"].map((rarity) => (
              <button
                key={rarity}
                onClick={() => setSelectedRarity(rarity)}
                className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition whitespace-nowrap cursor-pointer min-h-[34px] ${
                  selectedRarity === rarity
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {rarity}
              </button>
            ))}
          </div>
        </div>

        {/* List of expressions */}
        <div className="p-3.5 sm:p-4 overflow-y-auto space-y-3 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              Nessun modo di dire trovato per questa ricerca.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm sm:text-base font-bold text-amber-900">
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

                <div className="space-y-1.5 text-xs">
                  <p className="text-slate-600">
                    <span className="font-semibold text-slate-800">Contesto: </span>
                    {item.context}
                  </p>
                  <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-200/60">
                    <span className="font-bold text-indigo-700">Traduzione reale: </span>
                    {item.meaning}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
          Dizionario curato ad uso esclusivo degli amici
        </div>
      </div>
    </div>
  );
}
