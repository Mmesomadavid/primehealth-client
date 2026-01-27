"use client";

import React, { useRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RotateCcw, Download } from "lucide-react";

interface SignaturePadProps {
  onSignatureChange?: (signature: string | null) => void;
  value?: string | null;
}

export function SignaturePad({
  onSignatureChange,
  value,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Set background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Load existing signature if provided
    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        setIsEmpty(false);
      };
      img.src = value;
    }
  }, [value]);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isTouch = "touches" in e;
    const x = isTouch ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = isTouch ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isTouch = "touches" in e;
    const x = isTouch ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = isTouch ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    setIsEmpty(false);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const signature = canvas.toDataURL("image/png");
    onSignatureChange?.(signature);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);
    setIsEmpty(true);
    onSignatureChange?.(null);
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "signature.png";
    link.click();
  };

  return (
    <div className="space-y-3">
      <div className="border-2 border-dashed border-input rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-40 cursor-crosshair hover:bg-slate-50 transition-colors"
          style={{ cursor: isDrawing ? "crosshair" : "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M17.6 6.4a2 2 0 0 1 2.8 2.8L7.95 20.35a2 2 0 0 1-1.18.58L2.2 21.77a1 1 0 0 1-1.24-1.24l.84-4.57a2 2 0 0 1 .58-1.18L17.6 6.4z\"/></svg>') 12 12, auto" }}
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={clearSignature}
          disabled={isEmpty}
          className="flex items-center gap-2 bg-transparent"
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={downloadSignature}
          disabled={isEmpty}
          className="flex items-center gap-2 bg-transparent"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
