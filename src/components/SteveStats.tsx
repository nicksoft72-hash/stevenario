"use client";

import React from "react";
import { DEFAULT_STEVE_CONFIG } from "@/config/stevenario";
import { Clock, Beer, Shuffle, Quote, ShieldAlert } from "lucide-react";

export function SteveStats() {
  const icons = [Clock, Beer, Shuffle, Quote];

  return (
    <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-4 sm:p-5 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center font-bold text-2xl shadow-inner border border-white/10 text-white">
            🕶️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-neutral-100 text-base sm:text-lg">
                {DEFAULT_STEVE_CONFIG.friendName}
              </h2>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live
              </span>
            </div>
            <p className="text-xs text-amber-400/90 font-medium italic">
              {DEFAULT_STEVE_CONFIG.nickname}
            </p>
          </div>
        </div>

        <div className="text-xs text-neutral-400 bg-neutral-950/80 px-3 py-1.5 rounded-lg border border-neutral-800 flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Attenzione: 100% sarcasmo amichevole non filtrato</span>
        </div>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-4">
        {DEFAULT_STEVE_CONFIG.stats.map((st, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div
              key={st.label}
              className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/80 hover:border-neutral-700 transition"
            >
              <div className="flex items-center justify-between text-neutral-400 mb-1">
                <span className="text-[11px] font-medium truncate">{st.label}</span>
                <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-neutral-100">
                {st.value}
              </div>
              <p className="text-[10px] text-neutral-500 mt-0.5 truncate">
                {st.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
