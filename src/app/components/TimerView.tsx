import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Pause, Square } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TimerViewProps {
  cost: number;
  duration: number; // in seconds
  onStop: () => void;
  hourlyRate: number;
  attendees: number;
}

export function TimerView({ cost, duration, onStop, hourlyRate, attendees }: TimerViewProps) {
  // Determine background color based on cost
  // $0 - $100: Green (Safe)
  // $100 - $500: Yellow
  // $500 - $1,000: Orange
  // $1,000+: Red
  
  let bgClass = "bg-green-900/20"; // Default
  let textColor = "text-green-500";
  let statusText = "SAFE";
  
  // We'll use inline styles or motion values for smooth transitions, but classes are easier for MVP logic
  // Prompt asks for Background Fades.
  
  const getBackgroundColor = (c: number) => {
    if (c < 100) return "#14532d"; // Green 900
    if (c < 500) return "#854d0e"; // Yellow 800
    if (c < 1000) return "#9a3412"; // Orange 800
    return "#7f1d1d"; // Red 900
  };

  const getTextColor = (c: number) => {
    if (c < 100) return "#4ade80"; // Green 400
    if (c < 500) return "#facc15"; // Yellow 400
    if (c < 1000) return "#fb923c"; // Orange 400
    return "#f87171"; // Red 400
  };

  const bgColor = getBackgroundColor(cost);
  const fgColor = getTextColor(cost);
  
  const isCritical = cost >= 1000;

  // Haptics simulation (visual shake)
  const shakeVariants = {
    safe: { x: 0 },
    critical: { 
      x: [0, -5, 5, -5, 5, 0],
      transition: { repeat: Infinity, duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="flex flex-col h-full items-center justify-center relative overflow-hidden"
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 1 }}
    >
      {/* Background Pulse for critical state */}
      {isCritical && (
        <motion.div
          className="absolute inset-0 bg-red-600/20"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      )}

      <div className="z-10 text-center space-y-8 p-4 w-full">
        <div className="space-y-2">
            <motion.p 
                className="text-xs font-bold tracking-[0.2em] opacity-70 uppercase"
                style={{ color: fgColor }}
            >
                Current Burn
            </motion.p>
            
            <motion.h1 
                className="text-7xl sm:text-8xl font-black tabular-nums tracking-tighter"
                style={{ color: fgColor }}
                variants={isCritical ? shakeVariants : {}}
                animate={isCritical ? "critical" : "safe"}
            >
                ${cost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </motion.h1>
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-xs mx-auto text-muted-foreground">
             <div>
                <p className="text-xs uppercase tracking-wider mb-1">Time</p>
                <p className="text-2xl font-mono text-white">
                    {new Date(duration * 1000).toISOString().substr(11, 8)}
                </p>
             </div>
             <div>
                <p className="text-xs uppercase tracking-wider mb-1">Rate</p>
                <p className="text-2xl font-mono text-white">
                    ${((attendees * hourlyRate) / 60).toFixed(0)}/m
                </p>
             </div>
        </div>
      </div>

      <div className="absolute bottom-10 w-full px-6">
        <Button 
            variant="destructive" 
            size="lg" 
            className="w-full h-16 text-xl font-bold tracking-widest border-4 border-red-950"
            onClick={onStop}
        >
            <Square className="mr-2 fill-current" /> STOP THE BLEEDING
        </Button>
      </div>
    </motion.div>
  );
}
