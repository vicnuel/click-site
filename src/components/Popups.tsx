'use client';

import { useState, useEffect } from 'react';

interface PopupProps {
  onRedirect: () => void;
}

export function CookiePopup({ onRedirect }: PopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostra o popup de cookies após 2 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    onRedirect();
  };

  const handleSettings = () => {
    setIsVisible(false);
    onRedirect();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 sm:p-6 lg:p-8 z-50 shadow-2xl animate-fadeIn border-t-4 border-blue-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 flex-1 w-full">
            <div className="text-3xl sm:text-4xl lg:text-6xl flex-shrink-0">🍪</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                We use cookies to enhance your experience
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                By continuing to browse, you agree to our use of cookies and privacy policy. 
                <span className="hidden sm:inline"> This helps us provide you with a better browsing experience and personalized content.</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full lg:w-auto lg:min-w-fit">
            <button
              onClick={handleSettings}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 lg:px-8 py-3 lg:py-4 rounded-lg text-sm sm:text-base font-medium transition-colors border border-gray-600 w-full sm:w-auto lg:min-w-[140px]"
            >
              Settings
            </button>
            <button
              onClick={handleAccept}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 lg:px-10 py-3 lg:py-4 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-lg w-full sm:w-auto lg:min-w-[160px]"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
