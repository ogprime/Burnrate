import React, { useState, useEffect, useRef } from "react";
import { SetupView } from "./components/SetupView";
import { TimerView } from "./components/TimerView";
import { ReceiptView } from "./components/ReceiptView";
import { HistoryView, ReceiptData } from "./components/HistoryView";

type Screen = "setup" | "timer" | "receipt" | "history";

export default function App() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [attendees, setAttendees] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(60); // Default to "The Team"
  
  const [startTime, setStartTime] = useState<number | null>(null);
  const [cost, setCost] = useState(0);
  const [duration, setDuration] = useState(0);

  const [history, setHistory] = useState<ReceiptData[]>([]);
  const [viewingHistoryItem, setViewingHistoryItem] = useState(false);

  const requestRef = useRef<number>();
  
  // Load History
  useEffect(() => {
    const saved = localStorage.getItem('burn_rate_history');
    if (saved) {
        try {
            setHistory(JSON.parse(saved));
        } catch (e) {
            console.error("Failed to parse history", e);
        }
    }
  }, []);

  // Save History
  useEffect(() => {
    localStorage.setItem('burn_rate_history', JSON.stringify(history));
  }, [history]);

  const handleStart = () => {
    setStartTime(Date.now());
    setCost(0);
    setDuration(0);
    setScreen("timer");
  };

  const handleStop = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    
    // Add to history
    const newReceipt: ReceiptData = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
        date: Date.now(),
        cost: cost,
        duration: duration,
        attendees: attendees,
        hourlyRate: hourlyRate
    };
    
    setHistory(prev => [newReceipt, ...prev]);
    setViewingHistoryItem(false);
    setScreen("receipt");
  };

  const handleRestart = () => {
    setScreen("setup");
    setCost(0);
    setDuration(0);
    setStartTime(null);
    setViewingHistoryItem(false);
  };

  const handleOpenHistory = () => {
      setScreen("history");
  };

  const handleHistoryBack = () => {
      setScreen("setup");
  };

  const handleSelectHistoryItem = (item: ReceiptData) => {
      setCost(item.cost);
      setDuration(item.duration);
      setAttendees(item.attendees);
      setHourlyRate(item.hourlyRate);
      setViewingHistoryItem(true);
      setScreen("receipt");
  };

  // Timer Logic
  useEffect(() => {
    if (screen !== "timer" || !startTime) return;

    const animate = () => {
      const now = Date.now();
      const elapsedSeconds = (now - startTime) / 1000;
      const burnPerSecond = (attendees * hourlyRate) / 3600;
      const currentCost = elapsedSeconds * burnPerSecond;

      setCost(currentCost);
      setDuration(elapsedSeconds);

      // Haptic Check (Web Vibrate API)
      // Check if we crossed a $100 threshold
      // We can't easily check "just crossed" without storing previous frame cost.
      // But since we run this every frame, we can just check Math.floor
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [screen, startTime, attendees, hourlyRate]);

  // Haptics Effect
  const lastHapticRef = useRef(0);
  useEffect(() => {
    if (screen !== "timer") {
        lastHapticRef.current = 0;
        return;
    }
    
    // Check for $100 increments
    // If cost crosses 100, 200, 300...
    if (cost > 0 && Math.floor(cost / 100) > lastHapticRef.current) {
        lastHapticRef.current = Math.floor(cost / 100);
        if (navigator.vibrate) {
            navigator.vibrate(200); // Heavy vibration bump
        }
    }
  }, [cost, screen]);

  return (
    <div className="h-screen w-full bg-background text-foreground overflow-hidden font-mono flex flex-col">
      {screen === "setup" && (
        <SetupView
          attendees={attendees}
          setAttendees={setAttendees}
          hourlyRate={hourlyRate}
          setHourlyRate={setHourlyRate}
          onStart={handleStart}
          onOpenHistory={handleOpenHistory}
        />
      )}

      {screen === "timer" && (
        <TimerView
          cost={cost}
          duration={duration}
          onStop={handleStop}
          hourlyRate={hourlyRate}
          attendees={attendees}
        />
      )}

      {screen === "receipt" && (
        <ReceiptView
          cost={cost}
          duration={duration}
          attendees={attendees}
          onRestart={handleRestart}
          onOpenHistory={handleOpenHistory}
          fromHistory={viewingHistoryItem}
        />
      )}

      {screen === "history" && (
        <HistoryView
            history={history}
            onBack={handleHistoryBack}
            onSelectReceipt={handleSelectHistoryItem}
        />
      )}
    </div>
  );
}
