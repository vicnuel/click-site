"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SiteReplicaProps {
  imageUrl: string;
  mobileImageUrl?: string;
  officialSiteUrl: string;
  onInteraction: () => void;
}

export function SiteReplica({
  imageUrl,
  mobileImageUrl,
  officialSiteUrl,
  onInteraction,
}: SiteReplicaProps) {
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onInteraction();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onInteraction();
    }
  };

  // Escolhe a imagem baseada no tamanho da tela
  // const currentImageUrl = isMobile && mobileImageUrl ? mobileImageUrl : imageUrl;

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Overlay invisível para capturar cliques */}
      <div
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Acessar site oficial"
      />

      {/* Imagem do site oficial */}
      {!imageError ? (
        <Image
          src={isMobile && mobileImageUrl ? mobileImageUrl : imageUrl}
          alt="Site oficial"
          fill
          className="object-cover object-top"
          onError={() => setImageError(true)}
          priority
        />
      ) : (
        /* Fallback caso a imagem não carregue */
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto p-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                🌐 Site Oficial
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Clique em qualquer lugar para acessar o site oficial e
                aproveitar nossas ofertas exclusivas!
              </p>
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <span className="text-gray-500">
                    Carregando preview do site...
                  </span>
                </div>
              </div>
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-sm text-yellow-700">
                  💡 <strong>Dica:</strong> Configure a variável
                  NEXT_PUBLIC_OFFICIAL_SITE_IMAGE_URL no arquivo .env.local para
                  exibir a imagem real do site.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">🔗 {officialSiteUrl}</p>
          </div>
        </div>
      )}

      {/* Indicador visual discreto */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-20 text-white px-3 py-1 rounded-full text-xs z-20">
        Site Oficial
      </div>
    </div>
  );
}
