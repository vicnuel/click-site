# 🎯 Site de Captura para Afiliados - Guia Completo

## 📋 O que este projeto faz

Este site foi desenvolvido para funcionar como uma "armadilha" de cliques para programas de afiliados. Ele replica visualmente um site oficial e usa pop-ups estratégicos para garantir que o usuário seja redirecionado para seu link de afiliado.

### 🔄 Fluxo de funcionamento:

1. **Usuário acessa o site** → Vê uma imagem que parece ser o site oficial
2. **Após 2 segundos** → Aparece um pop-up de "Promoção Especial"
3. **Se aceitar** → Redireciona para seu link de afiliado
4. **Se negar** → Aparece pop-up de cookies após 1 segundo
5. **Qualquer interação** → Sempre redireciona para seu link de afiliado

## ⚙️ Configuração Rápida

### 1. Configure as URLs no arquivo `.env.local`:

```env
# Substitua por uma imagem real do site que você quer replicar
NEXT_PUBLIC_OFFICIAL_SITE_IMAGE_URL=https://i.imgur.com/suaimagem.jpg

# Seu link de afiliado (OBRIGATÓRIO)
NEXT_PUBLIC_AFFILIATE_REDIRECT_URL=https://seu-link-de-afiliado.com

# URL do site oficial (para referência)
NEXT_PUBLIC_OFFICIAL_SITE_URL=https://site-oficial.com
```

### 2. Como capturar a imagem do site oficial:

#### Opção A: Screenshot manual
1. Acesse o site oficial
2. Pressione F12 → Device Mode → Selecione "Responsive"
3. Configure para 1920x1080 pixels
4. Tire um screenshot da página inteira
5. Hospede no Imgur ou similar

#### Opção B: Ferramentas online (Recomendado)
- **htmlcsstoimage.com** - Gratuito, boa qualidade
- **screenshotapi.net** - API profissional
- **websitetoimage.com** - Simples de usar

### 3. Execute o projeto:

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🎨 Personalização

### Alterar textos dos pop-ups:

Edite `src/components/Popups.tsx`:

```tsx
// Título do primeiro pop-up
<h2>Sua Nova Mensagem Aqui!</h2>

// Texto do primeiro pop-up  
<p>Seu texto promocional aqui...</p>

// Textos dos botões
<button>Seu Texto do Botão</button>
```

### Alterar timing dos pop-ups:

```tsx
// Primeiro pop-up (linha ~13 em Popups.tsx)
setTimeout(() => {
  setIsVisible(true);
}, 3000); // 3 segundos ao invés de 2

// Segundo pop-up (linha ~16 em Popups.tsx)  
setTimeout(() => {
  setIsVisible(true);
}, 2000); // 2 segundos ao invés de 1
```

### Alterar cores e estilos:

O projeto usa Tailwind CSS. Principais classes para modificar:

```tsx
// Cor do botão principal
className="bg-green-500 hover:bg-green-600" // Verde
className="bg-blue-500 hover:bg-blue-600"   // Azul
className="bg-red-500 hover:bg-red-600"     // Vermelho

// Cor de fundo dos pop-ups
className="bg-white" // Branco
className="bg-gray-100" // Cinza claro
```

## 🚀 Deploy e Hospedagem

### Opção 1: Vercel (Recomendado)
1. Faça push do código para GitHub
2. Conecte seu repositório no Vercel
3. Configure as variáveis de ambiente no painel da Vercel
4. Deploy automático!

### Opção 2: Netlify
1. Arraste a pasta do projeto para Netlify
2. Configure as variáveis de ambiente
3. Site online!

## 📊 Dicas para Maximizar Conversões

### 1. Imagem de alta qualidade
- Use imagens em alta resolução (1920x1080 mínimo)
- Certifique-se que a imagem é atual do site oficial
- Teste se carrega rapidamente

### 2. Textos persuasivos
- Use urgência: "Oferta por tempo limitado!"
- Use benefícios claros: "Desconto de 50%"
- Use emojis para chamar atenção: 🎉 ⚡ 🔥

### 3. Timing otimizado
- 2-3 segundos para o primeiro pop-up (tempo para o usuário se orientar)
- 1-2 segundos para o segundo pop-up (não dar tempo de sair)

### 4. Testing A/B
Teste diferentes versões:
- Cores dos botões
- Textos das mensagens  
- Timing dos pop-ups
- Imagens diferentes

## ⚠️ Aspectos Legais

- ✅ Use apenas para produtos que você realmente promove
- ✅ Certifique-se de que tem direito a usar a imagem
- ✅ Inclua disclaimers se necessário
- ❌ Não replique sites de forma enganosa
- ❌ Sempre respeite os termos do programa de afiliados

## 🔧 Solução de Problemas

### Imagem não carrega:
1. Verifique se a URL está correta
2. Teste a URL diretamente no navegador
3. Certifique-se que permite hotlinking
4. Use HTTPS, não HTTP

### Pop-ups não aparecem:
1. Verifique o console do navegador (F12)
2. Teste em modo privado/anônimo
3. Desative bloqueadores de pop-up

### Redirecionamento não funciona:
1. Verifique se o link de afiliado está correto
2. Teste o link diretamente
3. Verifique se não há caracteres especiais na URL

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs no terminal (`npm run dev`)
2. Abra o console do navegador (F12 → Console)
3. Teste com diferentes navegadores

---

**✨ Boa sorte com suas campanhas de afiliados!**
