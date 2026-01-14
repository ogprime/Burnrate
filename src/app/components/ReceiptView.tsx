import React, { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Share2, RotateCcw, Lock, History, ArrowLeft, Copy, X } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

interface ReceiptViewProps {
  cost: number;
  duration: number;
  attendees: number;
  onRestart: () => void;
  onOpenHistory: () => void;
  fromHistory?: boolean;
}

const SNARKY_COPY = [
  "That was expensive silence.",
  "Hope it was worth it.",
  "Could have been an email.",
  "There goes the budget.",
  "Productivity died here.",
  "ROI not found.",
  "That's a lot of lattes.",
  "Silence is golden. Talk is expensive."
];

export function ReceiptView({ cost, duration, attendees, onRestart, onOpenHistory, fromHistory }: ReceiptViewProps) {
  const [copy, setCopy] = useState("");
  const receiptRef = useRef<HTMLDivElement>(null);
  const [showFallbackDialog, setShowFallbackDialog] = useState(false);
  const [shareText, setShareText] = useState("");

  useEffect(() => {
    // Select random copy on mount
    const selectedCopy = SNARKY_COPY[Math.floor(Math.random() * SNARKY_COPY.length)];
    setCopy(selectedCopy);
    setShareText(`We just burned $${cost.toFixed(2)} in a meeting. ${selectedCopy} #BurnRateApp`);
  }, [cost]);

  // Fallback if permission is denied
  const openFallbackDialog = (text: string) => {
    setShareText(text);
    setShowFallbackDialog(true);
  };

  const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success("Receipt copied to clipboard!");
    } catch (err) {
        // Suppress noisy permission errors in restricted environments (like iframes)
        const isPermissionError = err instanceof Error && (err.name === 'NotAllowedError' || err.name === 'SecurityError');
        if (!isPermissionError) {
             console.error("Clipboard failed", err);
        } else {
             console.log("Clipboard access restricted, showing manual dialog.");
        }
        // Deep fallback
        openFallbackDialog(text);
    }
  };

  const handleShare = async () => {
    const text = shareText;
    
    // Attempt to generate an image
    let file: File | null = null;
    if (receiptRef.current) {
        try {
            const canvas = await html2canvas(receiptRef.current, {
                backgroundColor: null, 
                scale: 2,
                useCORS: true, 
            });
            const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
            if (blob) {
                file = new File([blob], 'receipt.png', { type: 'image/png' });
            }
        } catch (e) {
            console.error("Image generation failed", e);
            // Proceed without image
        }
    }

    // Try Native Share
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        const shareData: ShareData = {
            title: 'Meeting Cost Receipt',
            text: text,
            url: window.location.href
        };

        if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
            shareData.files = [file];
        }

        await navigator.share(shareData);
      } catch (err) {
        // Suppress noisy permission errors in restricted environments
        const isPermissionError = err instanceof Error && (err.name === 'NotAllowedError' || err.name === 'SecurityError');
        
        if (!isPermissionError) {
             // Only log real failures, not just "user cancelled" or "permission denied"
             if (err instanceof Error && err.name !== "AbortError") {
                 console.error("Share failed", err);
             }
        } else {
             console.log("Native share restricted, attempting fallback.");
        }

        // Check for AbortError (User cancelled)
        if (err instanceof Error && err.name === "AbortError") {
            return;
        }

        // Fallback to clipboard first, then dialog
        await copyToClipboard(text);
      }
    } else {
      // Fallback to clipboard
      await copyToClipboard(text);
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center p-6 space-y-8 max-w-md mx-auto w-full relative">
       <div className="absolute top-6 left-6 right-6 flex justify-between z-10 pointer-events-none">
         {fromHistory ? (
             <Button variant="ghost" size="icon" onClick={onOpenHistory} className="pointer-events-auto">
                 <ArrowLeft className="w-6 h-6" />
             </Button>
         ) : <div />}
         
         {!fromHistory && (
             <Button variant="ghost" size="icon" onClick={onOpenHistory} className="pointer-events-auto">
                 <History className="w-6 h-6 text-muted-foreground" />
             </Button>
         )}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="w-full"
      >
        <div ref={receiptRef}>
            <Card 
              className="font-mono shadow-2xl relative overflow-hidden border-0"
              style={{ backgroundColor: '#ffffff', color: '#000000' }} // Force HEX for html2canvas
            >
                {/* Paper tear effect */}
                <div 
                  className="h-4 border-b border-dashed"
                  style={{ backgroundColor: '#e5e7eb', borderColor: '#9ca3af' }} 
                ></div>
                
                <CardHeader className="text-center pb-2">
                    <div 
                      className="mx-auto px-2 py-1 text-xs font-bold uppercase tracking-widest mb-4"
                      style={{ backgroundColor: '#000000', color: '#ffffff' }}
                    >
                        Official Receipt
                    </div>
                    <CardTitle className="text-4xl font-black" style={{ color: '#000000' }}>
                        ${cost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </CardTitle>
                    <p 
                      className="text-sm uppercase tracking-wide mt-1"
                      style={{ color: '#6b7280' }} 
                    >
                        Total Burn
                    </p>
                </CardHeader>
                
                <CardContent 
                  className="space-y-4 border-t border-dashed pt-4"
                  style={{ borderColor: '#d1d5db' }}
                >
                    <div className="flex justify-between text-sm">
                        <span style={{ color: '#6b7280' }}>Duration</span>
                        <span className="font-bold">{new Date(duration * 1000).toISOString().substr(11, 8)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span style={{ color: '#6b7280' }}>Attendees</span>
                        <span className="font-bold">{attendees}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span style={{ color: '#6b7280' }}>Date</span>
                        <span className="font-bold">{new Date().toLocaleDateString()}</span>
                    </div>
                    
                    <div className="py-4 text-center">
                        <p className="text-lg font-bold italic">"{copy}"</p>
                    </div>
                </CardContent>
                
                <CardFooter 
                  className="flex-col p-4 border-t"
                  style={{ backgroundColor: '#f9fafb', borderColor: '#f3f4f6' }}
                >
                    <div 
                      className="text-[10px] uppercase tracking-widest mb-0"
                      style={{ color: '#9ca3af' }} 
                    >
                        Calculated by Burn Rate App
                    </div>
                    <div className="w-full mt-4 barcode h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEwMCUiIHg9IjAiIGZpbGw9ImJsYWNrIi8+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMTAwJSIgeD0iMyIgZmlsbD0iYmxhY2siLz48cmVjdCB3aWR0aD0iMyIgaGVpZ2h0PSIxMDAlIiB4PSI1IiBmaWxsPSJibGFjayIvPjwvc3ZnPg==')] opacity-50"></div>
                </CardFooter>
            </Card>
        </div>
      </motion.div>

      <div className="w-full space-y-3">
        <Button size="lg" className="w-full gap-2 font-bold" onClick={handleShare}>
            <Share2 className="w-4 h-4" /> Share Receipt
        </Button>
        <Button variant="outline" size="lg" className="w-full gap-2" onClick={onRestart}>
            <RotateCcw className="w-4 h-4" />Start New Meeting
        </Button>
      </div>

      <Dialog open={showFallbackDialog} onOpenChange={setShowFallbackDialog}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Share Receipt</DialogTitle>
                <DialogDescription>
                    Copy the text below to share your receipt manually.
                </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                    <textarea 
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        readOnly
                        value={shareText}
                        onClick={(e) => e.currentTarget.select()}
                    />
                </div>
            </div>
            <DialogFooter className="sm:justify-start">
                 <Button type="button" variant="secondary" onClick={() => setShowFallbackDialog(false)}>
                    Close
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
