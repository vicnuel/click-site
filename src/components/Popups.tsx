"use client";

import { useState, useEffect } from "react";

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
    <>
      {/* Overlay escuro de fundo */}
      <div className="fixed inset-0 bg-gray-900 opacity-60 z-40 animate-fadeIn" />

      {/* Popup centralizado */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 text-white rounded-xl shadow-2xl border border-gray-700 max-w-2xl w-full mx-auto animate-slideUp">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
              <div className="text-4xl sm:text-5xl flex-shrink-0">🍪</div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  We use cookies to enhance your experience
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  By continuing to browse, you agree to our use of cookies and
                  privacy policy. This helps us provide you with a better
                  browsing experience and personalized content.
                </p>
              </div>
            </div>
            <div className="flex justify-end flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleSettings}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-base font-medium transition-colors border border-gray-600 w-full sm:w-auto"
              >
                Settings
              </button>
              <button
                onClick={handleAccept}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-medium transition-colors shadow-lg w-full sm:w-auto"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
