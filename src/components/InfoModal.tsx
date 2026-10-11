"use client";

import React from "react";
import { X, HeartHandshake, User, Calendar, Clock, Sparkles } from "lucide-react";
import { DEFAULT_STEVE_CONFIG } from "@/config/stevenario";
import { sound } from "@/lib/sound";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md flex flex-col rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Informazioni su Stevenario
              </h2>
              <p className="text-xs text-slate-500">
                L&apos;Oracolo Ufficiale dell&apos;amico Steve
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs sm:text-sm text-slate-700">
          {/* Card info metadati */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
              <span className="flex items-center gap-2 text-slate-500 font-medium text-xs">
                <User className="w-4 h-4 text-indigo-500" />
                Creatore
              </span>
              <span className="font-bold text-slate-900 text-sm">
                {DEFAULT_STEVE_CONFIG.info.creator}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
              <span className="flex items-center gap-2 text-slate-500 font-medium text-xs">
                <Calendar className="w-4 h-4 text-amber-500" />
                Data Creazione
              </span>
              <span className="font-semibold text-slate-800">
                {DEFAULT_STEVE_CONFIG.info.creationDate}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-2 text-slate-500 font-medium text-xs">
                <Clock className="w-4 h-4 text-emerald-500" />
                Ultimo Aggiornamento Frasi
              </span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-xs">
                {DEFAULT_STEVE_CONFIG.info.lastUpdated}
              </span>
            </div>
          </div>

          {/* Breve descrizione simpatica */}
          <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-950 leading-relaxed space-y-1.5">
            <p className="font-bold text-indigo-900">
              Dedica speciale agli amici:
            </p>
            <p className="text-slate-600">
              {DEFAULT_STEVE_CONFIG.info.notes}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-rose-500" /> Risate tra amici
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition cursor-pointer"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
