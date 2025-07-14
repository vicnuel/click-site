"use client";

import { SiteReplica } from "@/components/SiteReplica";
import { CookiePopup } from "@/components/Popups";

export default function Home() {
  // URLs das variáveis de ambiente
  const officialSiteImageUrl =
    process.env.NEXT_PUBLIC_OFFICIAL_SITE_IMAGE_URL ||
    "https://via.placeholder.com/1920x1080/f8f9fa/6c757d?text=CONFIGURE+SUA+IMAGEM+AQUI";
  const mobileImageUrl = process.env.NEXT_PUBLIC_MOBILE_SITE_IMAGE_URL || "";
  const affiliateRedirectUrl =
    process.env.NEXT_PUBLIC_AFFILIATE_REDIRECT_URL ||
    "https://exemplo.com/afiliado";
  const officialSiteUrl =
    process.env.NEXT_PUBLIC_OFFICIAL_SITE_URL || "https://site-oficial.com";

  const handleSiteInteraction = () => {
    // Redireciona diretamente quando clica na imagem
    window.location.href = affiliateRedirectUrl;
  };

  const handleRedirect = () => {
    // Redireciona para o link de afiliado na mesma aba
    window.location.href = affiliateRedirectUrl;
  };

  return (
    <div className="relative">
      <SiteReplica
        imageUrl={officialSiteImageUrl}
        mobileImageUrl={mobileImageUrl}
        officialSiteUrl={officialSiteUrl}
        onInteraction={handleSiteInteraction}
      />

      <CookiePopup onRedirect={handleRedirect} />
    </div>
  );
}
