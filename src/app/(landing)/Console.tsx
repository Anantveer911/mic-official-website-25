"use client";

import Image from "next/image";
import consoleImg from "./assets/consoleoff.svg";

export default function Console() {
  return (
    <div className="w-full h-full relative ">
      <Image
        src={consoleImg}
        alt="Console"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
