"use client";

import React from "react";
import { DEFAULT_STEVE_CONFIG } from "@/config/stevenario";
import { Clock, Beer, Shuffle, Quote, ShieldAlert } from "lucide-react";

export function SteveStats() {
  const icons = [Clock, Beer, Shuffle, Quote];

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xl shadow-xs text-white">
            🕶️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900 text-base">
                {DEFAULT_STEVE_CONFIG.friendName}
              </h2>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Live
              </span>
            </div>
            <p className="text-xs text-amber-700 font-medium italic">
              {DEFAULT_STEVE_CONFIG.nickname}
            </p>
          </div>
        </div>

        <div className="text-[11px] text-slate-600 bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>100% sarcasmo amichevole</span>
        </div>
      </div>

      {/* Grid of stats - Mobile optimized */}
      <div className="grid grid-cols-2 gap-2.5 mt-3.5">
        {DEFAULT_STEVE_CONFIG.stats.map((st, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div
              key={st.label}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition"
            >
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-semibold truncate">{st.label}</span>
                <Icon className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              </div>
              <div className="text-lg sm:text-xl font-black text-slate-900">
                {st.value}
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                {st.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
