"use client";

import React, { useRef, useState } from "react";
import { Upload, X, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

interface FileUploadProps {
  onFileChange?: (file: File | null) => void;
  accept?: string;
  label?: string;
  value?: File | null;
  preview?: string | null;
  maxSize?: number; // in MB
}

export function FileUpload({
  onFileChange,
  accept = "image/*",
  label = "Upload file",
  value,
  preview,
  maxSize = 5,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null);

  const handleFile = (file: File) => {
    setError(null);

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    onFileChange?.(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const clearFile = () => {
    setPreviewUrl(null);
    setError(null);
    onFileChange?.(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {previewUrl && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-100 border border-input">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            onClick={clearFile}
            className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {!previewUrl && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragOver
              ? "border-blue-500 bg-blue-50"
              : "border-input bg-slate-50 hover:bg-slate-100"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
          />
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <p className="text-xs text-muted-foreground mb-4">
            or drag and drop your file here
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            Choose File
          </Button>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {value && !error && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
          <CheckCircle className="w-4 h-4" />
          {value.name}
        </div>
      )}
    </div>
  );
}
