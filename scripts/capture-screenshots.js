import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

async function captureScreenshots() {
  // Lê a URL do site oficial do arquivo .env.local
  const envPath = path.join(process.cwd(), ".env.local");
  let targetUrl = "https://exemplo.com";

  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    const urlMatch = envContent.match(/NEXT_PUBLIC_OFFICIAL_SITE_URL=(.+)/);
    if (urlMatch && urlMatch[1] && !urlMatch[1].includes("site-oficial.com")) {
      targetUrl = urlMatch[1].trim();
    }
  }

  console.log(`📸 Capturando screenshots de: ${targetUrl}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // Configurações para aguardar carregamento completo
    await page.setDefaultTimeout(30000);
    await page.setDefaultNavigationTimeout(30000);

    // Screenshot Desktop (1920x1080)
    console.log("🖥️ Capturando screenshot desktop...");
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(targetUrl, {
      waitUntil: ["networkidle0", "domcontentloaded"],
      timeout: 30000,
    });

    // Aguarda um pouco mais para garantir que tudo carregou
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Remove overlays, pop-ups e cookies banners comuns
    await page.evaluate(() => {
      // Remove elementos que podem atrapalhar
      const selectors = [
        '[class*="cookie"]',
        '[class*="gdpr"]',
        '[class*="popup"]',
        '[class*="modal"]',
        '[class*="overlay"]',
        '[id*="cookie"]',
        '[id*="gdpr"]',
        '[id*="popup"]',
        '[id*="modal"]',
        '[role="dialog"]',
        ".cookie-banner",
        ".cookie-notice",
        ".gdpr-banner",
      ];

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          if (el.offsetHeight > 0 && el.offsetWidth > 0) {
            el.style.display = "none";
          }
        });
      });
    });

    const screenshotsDir = path.join(process.cwd(), "public", "screenshots");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    await page.screenshot({
      path: path.join(screenshotsDir, "desktop.jpg"),
      type: "jpeg",
      quality: 90,
      fullPage: true,
    });

    // Screenshot Mobile (375x667 - iPhone SE)
    console.log("📱 Capturando screenshot mobile...");
    await page.setViewport({ width: 375, height: 667 });
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Remove overlays novamente após reload
    await page.evaluate(() => {
      const selectors = [
        '[class*="cookie"]',
        '[class*="gdpr"]',
        '[class*="popup"]',
        '[class*="modal"]',
        '[class*="overlay"]',
        '[id*="cookie"]',
        '[id*="gdpr"]',
        '[id*="popup"]',
        '[id*="modal"]',
        '[role="dialog"]',
        ".cookie-banner",
        ".cookie-notice",
        ".gdpr-banner",
      ];

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          if (el.offsetHeight > 0 && el.offsetWidth > 0) {
            el.style.display = "none";
          }
        });
      });
    });

    await page.screenshot({
      path: path.join(screenshotsDir, "mobile.jpg"),
      type: "jpeg",
      quality: 90,
      fullPage: true,
    });

    console.log("✅ Screenshots capturados com sucesso!");
    console.log(`   🖥️ Desktop: ${path.join(screenshotsDir, "desktop.jpg")}`);
    console.log(`   📱 Mobile: ${path.join(screenshotsDir, "mobile.jpg")}`);

    // Atualiza o .env.local com os caminhos das imagens
    if (fs.existsSync(envPath)) {
      let envContent = fs.readFileSync(envPath, "utf8");

      // Substitui ou adiciona a URL da imagem desktop
      if (envContent.includes("NEXT_PUBLIC_OFFICIAL_SITE_IMAGE_URL=")) {
        envContent = envContent.replace(
          /NEXT_PUBLIC_OFFICIAL_SITE_IMAGE_URL=.*/,
          "NEXT_PUBLIC_OFFICIAL_SITE_IMAGE_URL=/screenshots/desktop.jpg"
        );
      } else {
        envContent +=
          "\nNEXT_PUBLIC_OFFICIAL_SITE_IMAGE_URL=/screenshots/desktop.jpg";
      }

      // Adiciona URL da imagem mobile se não existir
      if (!envContent.includes("NEXT_PUBLIC_MOBILE_SITE_IMAGE_URL=")) {
        envContent +=
          "\nNEXT_PUBLIC_MOBILE_SITE_IMAGE_URL=/screenshots/mobile.jpg";
      }

      fs.writeFileSync(envPath, envContent);
      console.log(
        "📝 Arquivo .env.local atualizado com os caminhos das imagens"
      );
    }
  } catch (error) {
    console.error("❌ Erro ao capturar screenshots:", error.message);
    console.log(
      "💡 Dica: Verifique se a URL do site oficial está correta no .env.local"
    );
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export { captureScreenshots };

// Executa se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  captureScreenshots();
}
