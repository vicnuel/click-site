# Site de Afiliado - Click Site

Este projeto foi criado para replicar visualmente um site oficial e redirecionar usuários através de pop-ups para um link de afiliado.

## Como funciona

1. **Carregamento**: O site carrega uma imagem do site oficial que você quer replicar
2. **Pop-up de Promoção**: Após 2 segundos, aparece um pop-up oferecendo uma promoção
3. **Pop-up de Cookies**: Se o usuário negar a promoção, aparece um pop-up de cookies
4. **Redirecionamento**: Qualquer interação com os pop-ups redireciona para seu link de afiliado

## Configuração

### 1. Configurar variáveis de ambiente

Edite o arquivo `.env.local` na raiz do projeto:

```env
# URL da imagem do site oficial que você quer replicar
NEXT_PUBLIC_OFFICIAL_SITE_IMAGE_URL=https://exemplo.com/screenshot-do-site.jpg

# URL do seu link de afiliado para onde o usuário será redirecionado
NEXT_PUBLIC_AFFILIATE_REDIRECT_URL=https://seu-link-de-afiliado.com

# URL do site oficial (para referência)
NEXT_PUBLIC_OFFICIAL_SITE_URL=https://site-oficial.com
```

### 2. Como obter a imagem do site

Para capturar uma imagem do site oficial, você pode:

1. **Screenshot manual**: Tire um print da tela inteira do site
2. **Serviços online**: Use ferramentas como:
   - Website Screenshot API
   - ScreenshotAPI
   - Htmlcsstoimage.com
3. **Hospede a imagem**: Coloque a imagem no seu servidor ou use serviços como:
   - Imgur
   - Cloudinary
   - AWS S3

### 3. Executar o projeto

```bash
npm run dev
```

## Personalização

### Modificar textos dos pop-ups

Edite o arquivo `src/components/Popups.tsx` para alterar:
- Títulos dos pop-ups
- Mensagens
- Textos dos botões
- Estilos visuais

### Modificar timing

No arquivo `src/components/Popups.tsx`:
- Altere o tempo do primeiro pop-up (linha com `setTimeout(() => { setIsVisible(true); }, 2000);`)
- Altere o tempo do segundo pop-up (linha com `setTimeout(() => { setIsVisible(true); }, 1000);`)

### Estilos

O projeto usa Tailwind CSS. Você pode modificar as classes CSS nos componentes para alterar a aparência.

## Estrutura do projeto

```
src/
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout geral
│   └── globals.css       # Estilos globais
└── components/
    ├── Popups.tsx        # Componentes dos pop-ups
    └── SiteReplica.tsx   # Componente que exibe a imagem do site
```

## Dicas importantes

1. **Teste sempre**: Verifique se a imagem carrega corretamente
2. **URL válidas**: Certifique-se de que seu link de afiliado está correto
3. **Responsivo**: O site é responsivo e funciona em dispositivos móveis
4. **Performance**: Use imagens otimizadas para melhor carregamento

## Deploy

Para fazer deploy, você pode usar:
- Vercel (recomendado para Next.js)
- Netlify
- AWS
- Ou qualquer outro provedor de hospedagem

Certifique-se de configurar as variáveis de ambiente no seu provedor de hospedagem.
