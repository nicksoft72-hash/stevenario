"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { RefreshCw, Camera, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

interface StevePhotoFrameProps {
  initialPhotos?: string[];
}

export function StevePhotoFrame({ initialPhotos = ["/steve-photos/steve-1.jpg", "/steve-photos/steve-2.jpg"] }: StevePhotoFrameProps) {
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [isFading, setIsFading] = useState<boolean>(false);

  // Carica l'elenco foto dinamico da /api/photos
  useEffect(() => {
    async function loadPhotos() {
      try {
        const res = await fetch("/api/photos");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.photos) && data.photos.length > 0) {
            setPhotos(data.photos);
          }
        }
      } catch (err) {
        console.error("Impossibile caricare l'elenco foto:", err);
      }
    }
    loadPhotos();
  }, []);

  const changeToRandomPhoto = useCallback(() => {
    if (photos.length <= 1) return;
    setIsFading(true);
    setTimeout(() => {
      let nextIdx = Math.floor(Math.random() * photos.length);
      if (nextIdx === currentIdx && photos.length > 1) {
        nextIdx = (currentIdx + 1) % photos.length;
      }
      setCurrentIdx(nextIdx);
      setIsFading(false);
      setSecondsLeft(60);
    }, 300);
  }, [photos, currentIdx]);

  // Timer di 60 secondi
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          changeToRandomPhoto();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [changeToRandomPhoto]);

  const handleManualShuffle = () => {
    sound.playClick();
    changeToRandomPhoto();
  };

  const currentPhoto = photos[currentIdx] || "/steve-photos/steve-1.jpg";

  return (
    <div className="w-full max-w-xl mx-auto my-3 sm:my-4">
      {/* Container con ratio 16:9, perfetto per ritaglio e responsive mobile */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-md shadow-slate-200/50 aspect-video group">
        <Image
          src={currentPhoto}
          alt="Steve in azione"
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 576px"
          priority
          className={`object-cover transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Overlay leggero sfumato per leggibilità */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10 pointer-events-none"></div>

        {/* Badge in alto a sinistra */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-slate-800 shadow-sm border border-white/60">
          <Camera className="w-3.5 h-3.5 text-indigo-600" />
          <span>Steve in Azione</span>
        </div>

        {/* Pulsante cambio manuale + indicatore 60s in basso */}
        <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white text-[11px]">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Nuova foto tra: <strong>{secondsLeft}s</strong></span>
          </div>

          <button
            onClick={handleManualShuffle}
            className="flex items-center gap-1 bg-white/95 hover:bg-white text-slate-900 font-medium px-2.5 py-1 rounded-full shadow-md active:scale-95 transition cursor-pointer"
            title="Cambia subito foto"
          >
            <RefreshCw className="w-3 h-3 text-indigo-600" />
            <span>Cambia</span>
          </button>
        </div>

        {/* Barra di progresso discreta per i 60 secondi */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-indigo-500 transition-all duration-1000 ease-linear"
            style={{ width: `${((60 - secondsLeft) / 60) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <p className="text-[11px] text-slate-400 text-center mt-1.5 italic">
        Foto casuale aggiornata ogni minuto da archivio {photos.length > 1 ? `(${photos.length} foto)` : ""}
      </p>
    </div>
  );
}
