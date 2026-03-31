"use client";
import React, { useState, useEffect } from 'react';

const CHARS = "AБBГDEЁЖZIЙKLMNOПPSTUФHЦЧШЩЪЫЬЭЮЯ0123456789";

export function DataGlitch() {
  const [data, setData] = useState("");

  useEffect(() => {
    const generateStream = () => {
      let stream = "";
      for (let i = 0; i < 40; i++) {
        stream += CHARS[Math.floor(Math.random() * CHARS.length)];
        if (i % 8 === 0) stream += " ";
      }
      setData(stream);
    };

    generateStream();
    const interval = setInterval(generateStream, 2000); // Glitch rate
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-6 overflow-hidden border-b-2 border-dashed border-black/10 flex items-center">
      <p className="font-mono text-[8px] text-zinc-500 uppercase tracking-[0.2em] italic truncate">
        {`> DECODING_STREAM: ${data}...`}
      </p>
    </div>
  );
}