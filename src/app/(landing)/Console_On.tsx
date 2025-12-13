"use client";

import Image from "next/image";
import consoleOnImg from "./assets/consoleon.svg";

export default function Console_On() {
  return (
    <div className="w-full h-full relative ">
      <Image
        src={consoleOnImg}
        alt="Console"
        className="w-full h-full object-contain"
      />
    </div>
  );
}