"use client";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  // Simplified version - just render children without tilt effect
  // This prevents any potential rendering issues from complex 3D transforms
  return (
    <div className={`relative h-full ${className}`}>
      {children}
    </div>
  );
}
