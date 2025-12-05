import { useState } from 'react';
import type { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  const [zoom, setZoom] = useState<1 | 1.5>(1);

  const toggleZoom = () => {
    setZoom(prev => prev === 1 ? 1.5 : 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 flex flex-col items-center justify-center p-4 gap-4">
      {/* Zoom toggle */}
      <button
        onClick={toggleZoom}
        className="bg-white rounded-lg shadow-lg px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
        Масштаб: {zoom}x
      </button>

      {/* Phone container */}
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Phone frame - Android style */}
        <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
          {/* Inner bezel */}
          <div className="bg-gray-800 rounded-[2.5rem] p-1">
            {/* Screen area */}
            <div className="relative bg-black rounded-[2.25rem] overflow-hidden">
              {/* Status bar */}
              <div className="bg-gray-900 px-6 py-2 flex items-center justify-between text-white text-xs">
                <span className="font-medium">12:00</span>
                <div className="flex items-center gap-1.5">
                  {/* Signal strength */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 22h2V10H2v12zm4 0h2V7H6v15zm4 0h2V4h-2v18zm4 0h2V2h-2v20zm4 0h2v-8h-2v8z"/>
                  </svg>
                  {/* WiFi */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                  </svg>
                  {/* Battery */}
                  <div className="flex items-center gap-0.5">
                    <div className="w-5 h-2.5 border border-white rounded-sm flex items-center p-0.5">
                      <div className="w-3/4 h-full bg-green-500 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* App content */}
              <div
                className="w-[375px] h-[667px] overflow-y-auto overflow-x-hidden bg-gray-50"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#94a3b8 transparent'
                }}
              >
                {children}
              </div>

              {/* Navigation bar (Android style) */}
              <div className="bg-gray-900 px-4 py-2 flex items-center justify-center gap-12">
                {/* Back */}
                <div className="w-4 h-4 border-l-2 border-b-2 border-white/60 rotate-45 -translate-x-0.5"></div>
                {/* Home */}
                <div className="w-4 h-4 border-2 border-white/60 rounded-full"></div>
                {/* Recent */}
                <div className="w-4 h-4 border-2 border-white/60 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Power button */}
        <div className="absolute right-[-4px] top-28 w-1 h-16 bg-gray-700 rounded-r-sm"></div>

        {/* Volume buttons */}
        <div className="absolute left-[-4px] top-24 w-1 h-10 bg-gray-700 rounded-l-sm"></div>
        <div className="absolute left-[-4px] top-36 w-1 h-10 bg-gray-700 rounded-l-sm"></div>
      </div>
    </div>
  );
}
