import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { SetupView } from '@/app/components/SetupView';
import { TimerView } from '@/app/components/TimerView';
import { ReceiptView } from '@/app/components/ReceiptView';

export function PWAAssetsGenerator() {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState('');

  const generateIconPNG = async (svgPath: string, outputName: string, size: number) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, size, size);
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = outputName;
              a.click();
              URL.revokeObjectURL(url);
            }
            resolve();
          }, 'image/png');
        } else {
          resolve();
        }
      };
      img.src = svgPath;
    });
  };

  const generateScreenshot = async (elementId: string, fileName: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const canvas = await html2canvas(element, {
      width: 390,
      height: 844,
      scale: 2,
      backgroundColor: '#ffffff',
    });

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  const generateAllAssets = async () => {
    setGenerating(true);
    
    try {
      setProgress('Generating 192x192 icon...');
      await generateIconPNG('/icon-192-temp.svg', 'icon-192.png', 192);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress('Generating 512x512 icon...');
      await generateIconPNG('/icon-512-temp.svg', 'icon-512.png', 512);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress('Generating setup screenshot...');
      await generateScreenshot('screenshot-setup', 'screenshot-setup.png');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress('Generating timer screenshot...');
      await generateScreenshot('screenshot-timer', 'screenshot-timer.png');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress('Generating receipt screenshot...');
      await generateScreenshot('screenshot-receipt', 'screenshot-receipt.png');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress('✅ All assets generated! Check your downloads.');
    } catch (error) {
      setProgress('❌ Error generating assets: ' + error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">PWA Assets Generator</h1>
          <p className="text-gray-600 mb-6">
            Generate all required PWA assets: app icons (192x192, 512x512) and screenshots for the manifest.
          </p>
          
          <button
            onClick={generateAllAssets}
            disabled={generating}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {generating ? 'Generating...' : 'Generate All PWA Assets'}
          </button>
          
          {progress && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm font-mono">{progress}</p>
            </div>
          )}

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h2 className="font-bold mb-2 text-gray-900">After downloading:</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Move all downloaded PNG files to the <code className="bg-gray-100 px-1 py-0.5 rounded">/public</code> folder</li>
              <li>Replace any existing placeholder files</li>
              <li>Delete the temporary SVG files (icon-192-temp.svg, icon-512-temp.svg)</li>
              <li>The manifest.json already references these files correctly</li>
              <li>Build and deploy your app - it's PWA ready!</li>
            </ol>
          </div>
        </div>

        {/* Preview Screens for Screenshots */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Preview Screens (for screenshots)</h2>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-100 border-b">
              <h3 className="font-bold text-gray-900">Setup View</h3>
            </div>
            <div id="screenshot-setup" style={{ width: 390, height: 844 }} className="overflow-hidden">
              <div className="h-full w-full bg-background text-foreground font-mono">
                <SetupView
                  attendees={4}
                  setAttendees={() => {}}
                  hourlyRate={60}
                  setHourlyRate={() => {}}
                  onStart={() => {}}
                  onOpenHistory={() => {}}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-100 border-b">
              <h3 className="font-bold text-gray-900">Timer View</h3>
            </div>
            <div id="screenshot-timer" style={{ width: 390, height: 844 }} className="overflow-hidden">
              <div className="h-full w-full bg-background text-foreground font-mono">
                <TimerView
                  cost={347.52}
                  duration={1205}
                  onStop={() => {}}
                  hourlyRate={60}
                  attendees={4}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-100 border-b">
              <h3 className="font-bold text-gray-900">Receipt View</h3>
            </div>
            <div id="screenshot-receipt" style={{ width: 390, height: 844 }} className="overflow-hidden">
              <div className="h-full w-full bg-background text-foreground font-mono">
                <ReceiptView
                  cost={347.52}
                  duration={1205}
                  attendees={4}
                  onRestart={() => {}}
                  onOpenHistory={() => {}}
                  fromHistory={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
