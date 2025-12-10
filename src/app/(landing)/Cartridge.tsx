"use client";

import Image from "next/image";
import clsx from "clsx";
import cartridgeImg from "./assets/cartridge.png";

export default function Cartridge({
  inserted,
  onClick,
}: {
  inserted: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={clsx(
        "absolute left-[50%] -translate-x-1/2 w-[20%] transition-all duration-700 cursor-pointer z-40",
        inserted ? "top-[-2%]" : "top-[-50%]"
      )}
      onClick={!inserted ? onClick : undefined}
      title={!inserted ? "Click to insert cartridge" : ""}
    >
      <Image src={cartridgeImg} alt="Cartridge" className="w-full h-auto" />
    </div>
  );
}
