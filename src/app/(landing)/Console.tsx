"use client";

import Image from "next/image";
import consoleOff from "./assets/consoleoff.svg";
import consoleOn from "./assets/consoleon.svg";

export default function Console({ poweredOn }: { poweredOn: boolean }) {
  return (
    <div className="w-screen h-screen relative overflow-hidden flex items-center justify-center">
      <Image
        src={poweredOn ? consoleOn : consoleOff}
        alt={poweredOn ? "Console On" : "Console Off"}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}
