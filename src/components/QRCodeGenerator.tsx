"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
}

export function QRCodeGenerator({ value, size = 200 }: QRCodeGeneratorProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="p-4 bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
        <QRCodeSVG
          value={value}
          size={size}
          level="H"
          bgColor="#ffffff"
          fgColor="#131318"
          style={{ borderRadius: "8px" }}
        />
      </div>
      <p className="text-xs text-[#958da1] text-center">
        Scan to open payment link
      </p>
    </div>
  );
}
