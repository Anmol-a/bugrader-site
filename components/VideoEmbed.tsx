"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { VIDEO_ID } from "@/lib/launch";

// The promo video. Shows a still first; YouTube (privacy-enhanced, no cookies until play) loads only when pressed.
export default function VideoEmbed({ title = "BugRadar: how it works" }: { title?: string }) {
  const [playing, setPlaying] = useState(false);
  const [still, setStill] = useState(true); // the YouTube still; hidden if it can't load
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-panel-line bg-panel shadow-[0_30px_60px_-30px_rgba(13,19,29,0.55)]">
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {still && <img
            src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
            onError={() => setStill(false)}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />}
          <span className="absolute inset-0 bg-gradient-to-t from-panel/70 via-transparent to-transparent" aria-hidden="true" />
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold text-[#241703] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Play size={28} fill="currentColor" className="ml-1" />
            </span>
          </span>
          <span className="absolute left-4 bottom-3.5 text-[13.5px] font-medium text-white drop-shadow">{title}</span>
        </button>
      )}
    </div>
  );
}
