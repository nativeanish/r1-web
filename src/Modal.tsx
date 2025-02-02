import React from "react";
import { Loader2 } from "lucide-react";

interface BrutalistLoadingModalProps {
  isOpen: boolean;
  content: string;
}

export const Modal: React.FC<BrutalistLoadingModalProps> = ({
  isOpen,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <Loader2 className="h-16 w-16 animate-spin text-black" />
          <h2 className="mt-4 text-2xl font-bold uppercase tracking-wider">
            Loading Model
          </h2>
          <p className="mt-2 text-center font-mono">{content}</p>
        </div>
      </div>
    </div>
  );
};
