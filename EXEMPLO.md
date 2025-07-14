# Exemplo de como usar

## 1. Substitua a URL da imagem

No arquivo `.env.local`, substitua:

```
NEXT_PUBLIC_OFFICIAL_SITE_IMAGE_URL=https://via.placeholder.com/1920x1080/f0f0f0/666666?text=Site+Oficial
```

Por uma URL real da imagem do site que você quer replicar. Por exemplo:

```
NEXT_PUBLIC_OFFICIAL_SITE_IMAGE_URL=https://i.imgur.com/suaimagem.jpg
```

## 2. Configure seu link de afiliado

```
NEXT_PUBLIC_AFFILIATE_REDIRECT_URL=https://seu-link-de-afiliado-real.com
```

## 3. (Opcional) Configure a URL do site oficial

```
NEXT_PUBLIC_OFFICIAL_SITE_URL=https://site-oficial-real.com
```

## Como capturar a imagem de um site

### Método 1: Screenshot manual
1. Acesse o site oficial
2. Tire um print da tela inteira (F12 > Device Mode para simular tela cheia)
3. Hospede a imagem no Imgur, Cloudinary ou seu próprio servidor

### Método 2: Usar ferramentas online
- https://htmlcsstoimage.com/
- https://www.screenshotapi.net/
- https://picperf.io/

### Método 3: Usar API de screenshot
```javascript
// Exemplo usando uma API
const response = await fetch(`https://api.screenshotapi.net/screenshot?url=${siteUrl}&token=YOUR_TOKEN`);
```

## Funcionamento do site

1. **Carregamento**: Exibe a imagem do site oficial
2. **2 segundos**: Pop-up de promoção aparece
3. **Se aceitar**: Redireciona para link de afiliado
4. **Se negar**: Pop-up de cookies aparece em 1 segundo
5. **Qualquer botão**: Redireciona para link de afiliado

## Personalização adicional

### Alterar textos
Edite `src/components/Popups.tsx`

### Alterar timing
- Pop-up de promoção: linha `setTimeout(() => { setIsVisible(true); }, 2000);`
- Pop-up de cookies: linha `setTimeout(() => { setIsVisible(true); }, 1000);`

### Alterar cores e estilos
Use as classes Tailwind CSS nos componentes
