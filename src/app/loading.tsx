import React from "react";
import { Card } from "../components/ui/card";

interface LoadingProps {
  className?: string;
}

export default function Loading({ className }: LoadingProps) {
  return (
    <div
      className={`flex justify-center items-center w-full h-[80vh] ${className}`}
    >
      <Card className="relative">
        <svg
          width="130"
          height="60"
          viewBox="0 0 200 80"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-pulse"
        >
          <defs>
            <linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="50%" stopColor="#4ecdc4" />
              <stop offset="100%" stopColor="#45b7d1" />
            </linearGradient>
          </defs>
          <path
            d="m10 60 20-40 20 40m20-40 20 40 20-40m20 0v40m20-40 20 20 20-20v40"
            fill="none"
            stroke="url(#a)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Card>
    </div>
  );
}
