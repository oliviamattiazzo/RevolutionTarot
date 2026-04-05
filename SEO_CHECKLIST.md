# 🔍 SEO Checklist - Revolution Tarot

## ✅ Implementado

### Meta Tags & Headers
- [x] Title tag otimizado com keywords
- [x] Meta description completa
- [x] Keywords listadas
- [x] Canonical URL (https://www.revolutiontarot.com)
- [x] OpenGraph tags (FB, LinkedIn)
- [x] Twitter/X Card tags
- [x] Meta author e publisher
- [x] Theme color para mobile
- [x] Robots.txt
- [x] Sitemap.xml (automático via /sitemap.ts)
- [x] JSON-LD Schema (LocalBusiness + ProfessionalService)
- [x] Analytics da Vercel

### Acessibilidade & Performance
- [x] Charset UTF-8
- [x] Viewport meta tag responsivo
- [x] Apple touch icon meta
- [x] Alt text na imagem da foto (Hero)
- [x] Linguagem definida (pt-BR)
- [x] Múltiplas linguagens disponíveis (pt-BR, pt-PT, en)

## ⚠️ Recomendações de Alto Impacto

### 1. **Imagem OG (Open Graph)**
**Status:** ⚠️ Precisa ser criada
- Criar imagem 1200x630px com logo/branding
- Salvar em: `/public/images/og-image.jpg`
- A referência já está em `layout.tsx`

### 2. **Mobile Optimization**
**Status:** ✅ Feito (Tailwind responsivo + clamp)
- Viewport responsivo
- Touch targets min 40px
- Text sizing fluido

### 3. **Core Web Vitals**
**Recomendações:**
- Usar `next/image` em vez de `<img>` para LCP melhor
- Implementar lazy loading em images abaixo da dobra
- Comprimir imagens PNG/JPG

### 4. **Structured Data Breadcrumb**
**Status:** ⚠️ Não implementado (opcional)
- Se adicionar múltiplas páginas, implementar breadcrumb schema

### 5. **Sitemap HTML**
**Status:** ⚠️ Completo
- XML Sitemap: https://www.revolutiontarot.com/sitemap.xml
- Adicionar página/sitemap.html para usuários (opcional)

## 📊 Dados de Contato Implementados

```
Nome: Revolution Tarot
Email: revolutiontarot.byolivia@gmail.com
Telefone: +351939189631
WhatsApp: +351939189631
Instagram: https://instagram.com/revolution.tarot
TikTok: https://tiktok.com/@revolution.tarot
Áreas de Atendimento: Portugal, Brasil, Worldwide
```

## 🔄 Próximos Passos

### Imediato
1. [X] Criar imagem OG (1200x630px)
   - Incluir logo + título
   - Usar cores brand (cyan #00f5d4, magenta #ff2d78)
   - Salvar em `/public/images/og-image.jpg`

2. [X] Testar sitemap em: `https://www.revolutiontarot.com/sitemap.xml`

3. [X] Testar robots.txt em: `https://www.revolutiontarot.com/robots.txt`

### Curto Prazo
4. [X] Submeter sitemap ao Google Search Console
5. [X] Submeter sitemap ao Bing Webmaster Tools
6. [ ] Verificar Core Web Vitals no PageSpeed Insights
7. [ ] Testar SEO com ferramentas:
   - Google Search Console
   - Bing Webmaster Tools
   - SEMrush ou Ahrefs

### Médio Prazo
8. [ ] Criar blog/conteúdo com keywords:
   - "Como funciona leitura de tarot"
   - "Tarot online vs presencial"
   - "Perguntas para fazer ao tarot"

9. [ ] Implementar schema para FAQ (se houver)

10. [ ] Adicionar internal linking strategy

## 📱 Links Testados
- WhatsApp: `wa.me/351939189631`
- Instagram: `instagram.com/revolution.tarot`
- TikTok: `tiktok.com/@revolution.tarot`

## 🚀 Deploy Vercel
Após deploy, o Analytics, Sitemap e Robots funcionam automaticamente.

---

**Última atualização:** 2026-04-05
**Responsável:** GitHub Copilot
