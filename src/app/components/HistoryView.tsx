import React from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { ArrowLeft, Clock, DollarSign, Users } from "lucide-react";
import { motion } from "motion/react";

export interface ReceiptData {
  id: string;
  date: number;
  cost: number;
  duration: number;
  attendees: number;
  hourlyRate: number;
}

interface HistoryViewProps {
  history: ReceiptData[];
  onBack: () => void;
  onSelectReceipt: (receipt: ReceiptData) => void;
}

export function HistoryView({ history, onBack, onSelectReceipt }: HistoryViewProps) {
  return (
    <div className="flex flex-col h-full bg-background p-6 max-w-md mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Burn History</h1>
      </div>

      <ScrollArea className="flex-1 -mx-6 px-6">
        <div className="space-y-4 pb-8">
          {history.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <p>No meetings recorded yet.</p>
              <p className="text-xs mt-2">Start a fire to see it here.</p>
            </div>
          ) : (
            history.map((receipt, index) => (
              <motion.div
                key={receipt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className="bg-card border border-border rounded-xl p-4 active:scale-98 transition-transform cursor-pointer shadow-sm hover:shadow-md"
                  onClick={() => onSelectReceipt(receipt)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                            {new Date(receipt.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {new Date(receipt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-black text-primary">
                            ${receipt.cost.toFixed(2)}
                        </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-mono">
                            {new Date(receipt.duration * 1000).toISOString().substr(11, 8)}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{receipt.attendees}</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{receipt.hourlyRate}/hr</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
