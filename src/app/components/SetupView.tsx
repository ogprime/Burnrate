import React, { useMemo } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Users, Flame, History } from "lucide-react";
import { motion } from "motion/react";

interface SetupViewProps {
  attendees: number;
  setAttendees: (n: number) => void;
  hourlyRate: number;
  setHourlyRate: (n: number) => void;
  onStart: () => void;
  onOpenHistory: () => void;
}

const VIBE_LEVELS = [
  { label: "Interns", rate: 40 },
  { label: "Team", rate: 60 },
  { label: "Leadership", rate: 100 },
  { label: "Execs", rate: 200 },
  { label: "Legal", rate: 500 },
];

export function SetupView({
  attendees,
  setAttendees,
  hourlyRate,
  setHourlyRate,
  onStart,
  onOpenHistory,
}: SetupViewProps) {
  // Calculate slider value from rate (inverse mapping)
  const sliderValue = useMemo(() => {
    // If exact match found (or very close), return integer index
    const exactMatch = VIBE_LEVELS.findIndex((v) => v.rate === hourlyRate);
    if (exactMatch !== -1) return exactMatch;

    for (let i = 0; i < VIBE_LEVELS.length - 1; i++) {
        const start = VIBE_LEVELS[i].rate;
        const end = VIBE_LEVELS[i+1].rate;
        if (hourlyRate >= start && hourlyRate <= end) {
            const fraction = (hourlyRate - start) / (end - start);
            return i + fraction;
        }
    }
    // Clamping
    if (hourlyRate < VIBE_LEVELS[0].rate) return 0;
    return VIBE_LEVELS.length - 1;
  }, [hourlyRate]);

  const handleSliderChange = (val: number[]) => {
    const value = val[0];
    const index = Math.floor(value);
    const fraction = value - index;
    
    // Handle the end case
    if (index >= VIBE_LEVELS.length - 1) {
        setHourlyRate(VIBE_LEVELS[VIBE_LEVELS.length - 1].rate);
        return;
    }

    const startRate = VIBE_LEVELS[index].rate;
    const endRate = VIBE_LEVELS[index + 1].rate;
    // Linear interpolation
    const newRate = Math.round(startRate + (endRate - startRate) * fraction);
    
    setHourlyRate(newRate);
  };

  const getDisplayLabel = () => {
     const index = Math.round(sliderValue);
     // If we are close to a specific level (within 0.1), show that level's name
     if (Math.abs(sliderValue - index) < 0.1) {
         return VIBE_LEVELS[index].label;
     }
     
     // Otherwise show "Level +"
     const lower = Math.floor(sliderValue);
     return `${VIBE_LEVELS[lower].label} +`;
  };

  return (
    <div className="flex flex-col h-full justify-between p-6 max-w-md mx-auto w-full">
      <div className="flex justify-between items-start mt-8">
        <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter text-primary flex items-center gap-2">
            <Flame className="w-8 h-8 fill-primary" />
            BURN RATE
            </h1>
            <p className="text-muted-foreground text-sm">
            Stop burning cash. Start the timer.
            </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onOpenHistory}>
            <History className="w-6 h-6 text-muted-foreground" />
        </Button>
      </div>

      <div className="space-y-12">
        {/* Attendees */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Attendees
          </label>
          <div className="flex items-center justify-between bg-secondary/50 p-4 rounded-xl border border-border">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full text-2xl"
              onClick={() => setAttendees(Math.max(1, attendees - 1))}
            >
              -
            </Button>
            <input
              type="number"
              min="1"
              value={attendees}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val >= 1) {
                  setAttendees(val);
                } else if (e.target.value === '') {
                  // Allow empty string temporarily while typing
                  setAttendees(1);
                }
              }}
              onBlur={(e) => {
                // Ensure valid value on blur
                const val = parseInt(e.target.value);
                if (isNaN(val) || val < 1) {
                  setAttendees(1);
                }
              }}
              className="text-6xl font-bold tabular-nums bg-transparent text-center w-32 outline-none focus:text-primary transition-colors"
              style={{ appearance: 'textfield' }}
            />
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full text-2xl"
              onClick={() => setAttendees(attendees + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* Vibe / Rate */}
        <div className="space-y-6">
          <div className="flex justify-between items-end">
             <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              The Vibe
            </label>
            <div className="text-right">
                <div className="text-xs text-muted-foreground font-medium mb-1">
                    {getDisplayLabel()}
                </div>
                <span className="text-primary font-bold text-2xl">
                ${hourlyRate}/hr
                </span>
            </div>
          </div>
         
          <Slider
            min={0}
            max={VIBE_LEVELS.length - 1}
            step={0.1}
            value={[sliderValue]}
            onValueChange={handleSliderChange}
            className="py-4 cursor-grab active:cursor-grabbing"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-medium px-1 uppercase tracking-tighter">
            {VIBE_LEVELS.map((v, i) => (
                <span 
                    key={i} 
                    className={`transition-colors duration-200 ${Math.abs(sliderValue - i) < 0.4 ? "text-primary font-bold scale-110" : ""}`}
                >
                    {/* Abbreviate Leadership to Leads to save space if needed, but lets try full first, or maybe Leads */}
                    {v.label === "Leadership" ? "Leads" : v.label}
                </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            className="w-full h-20 text-3xl font-black tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(34,197,94,0.3)] border-b-4 border-green-700 active:border-b-0 active:translate-y-1"
            onClick={onStart}
          >
            IGNITE
          </Button>
        </motion.div>
      </div>
    </div>
  );
}