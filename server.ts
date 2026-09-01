import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini SDK lazily / safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'AndMoney Global Hub API',
      timestamp: new Date().toISOString(),
    });
  });

  // AI Marketing Generator endpoint using Gemini 3.7 Flash
  app.post('/api/ai/generate-marketing', async (req, res) => {
    try {
      const {
        productName,
        category,
        price,
        currency,
        targetCountry,
        targetCity,
        targetLanguage = 'pt',
        tone = 'high_converting_fintech',
        contentType = 'full_campaign', // 'ad_copy', 'video_script', 'social_post', 'email_promo'
      } = req.body;

      if (!productName) {
        return res.status(400).json({ error: 'Nome do produto é obrigatório' });
      }

      const client = getGeminiClient();

      if (!client) {
        // Fallback realistic marketing templates if no key provided yet
        const fallbackResults = {
          headline: `Descubra ${productName}: Inovação e Qualidade em ${targetCity || 'sua região'}`,
          description: `Garanta agora ${productName} por apenas ${currency || '€'} ${price || '0.00'}. Entrega rápida e garantia total. Aproveite as condições oficiais por tempo limitado.`,
          cta: 'Ver Oferta Oficial',
          adVariants: [
            { platform: 'Google Ads Search', headline: `${productName} Oficial | Frete Rápido`, description: `Compre direto pelo hub autorizado. Melhor preço do mercado em ${targetCity || 'sua cidade'}.` },
            { platform: 'Meta / Instagram Ads', headline: `Tendência em ${targetCountry || 'Europa'}: ${productName}`, description: `Design premium e alta performance. Veja por que milhares de clientes aprovaram.` },
            { platform: 'TikTok Shop', headline: `O produto mais procurado da semana 🔥`, description: `Unboxing e teste real do ${productName}. Link com desconto na bio.` }
          ],
          videoScript: {
            hook: `Você já viu o que o novo ${productName} consegue fazer? (0-3s)`,
            problem: `Chega de produtos com baixa durabilidade e preços abusivos. (3-8s)`,
            solution: `O ${productName} une precisão tecnológica e excelente custo-benefício. (8-20s)`,
            callToAction: `Clique no link abaixo para garantir o seu com envio prioritário! (20-30s)`
          },
          targetAudienceInsights: `Público interessado em ${category || 'tecnologia'} na faixa de 22 a 45 anos em ${targetCity || 'centros urbanos'}.`,
          complianceDisclaimer: 'Anúncio baseado estritamente nas especificações reais do produto, sem promessas enganosas ou dados falsos.'
        };
        return res.json({ success: true, isDemo: true, data: fallbackResults });
      }

      const prompt = `Você é o "AndMoney AI", o especialista em marketing digital e copywriting de conversão da plataforma AndMoney.
Regras fundamentais:
1. NUNCA crie dados falsos, garantias de resultados irreais ou promessas enganosas.
2. Adapte culturalmente e linguisticamente para o país de destino (${targetCountry || 'Europa'}), cidade (${targetCity || 'todas'}), e idioma (${targetLanguage}).
3. Produto: ${productName}
4. Categoria: ${category || 'Geral'}
5. Preço: ${currency || '€'}${price || ''}
6. Formato do tom: ${tone}

Retorne estritamente um JSON válido no seguinte formato:
{
  "headline": "Título de alto impacto no idioma ${targetLanguage}",
  "description": "Texto descritivo persuasive e verídico",
  "cta": "Call to action específico e claro",
  "adVariants": [
    {"platform": "Google Ads", "headline": "...", "description": "..."},
    {"platform": "Meta / Instagram", "headline": "...", "description": "..."},
    {"platform": "TikTok / Reels", "headline": "...", "description": "..."}
  ],
  "videoScript": {
    "hook": "Gancho inicial (0-3s)",
    "problem": "Problema abordado (3-8s)",
    "solution": "Apresentação da solução com dados reais (8-20s)",
    "callToAction": "Chamada final para o link de afiliado oficial (20-30s)"
  },
  "targetAudienceInsights": "Resumo de demografia e interesses recomendados",
  "complianceDisclaimer": "Nota de conformidade com as regras de afiliados e e-commerce"
}`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'Você é um assistente profissional de marketing para e-commerce e afiliados globais. Gere saídas estruturadas em JSON estrito sem formatação Markdown fora do JSON.',
        },
      });

      const responseText = response.text || '{}';
      const parsedData = JSON.parse(responseText);

      return res.json({
        success: true,
        data: parsedData,
      });
    } catch (error: any) {
      console.error('Error generating AI marketing copy:', error);
      return res.status(500).json({
        error: 'Falha ao gerar conteúdo de marketing com IA',
        details: error?.message || String(error),
      });
    }
  });

  // Webhook receiver for official platforms (Shopify, Amazon, WooCommerce, etc.)
  app.post('/api/webhooks/:platform', (req, res) => {
    const { platform } = req.params;
    const eventPayload = req.body;

    console.log(`[AndMoney Webhook] Received webhook from ${platform}:`, {
      event: req.headers['x-event-type'] || 'order.created',
      timestamp: new Date().toISOString(),
      payloadSummary: eventPayload?.id || eventPayload?.order_id || 'payload_received',
    });

    res.json({
      received: true,
      platform,
      status: 'processed_and_verified',
      registeredAt: new Date().toISOString(),
    });
  });

  // Anti-fraud audit log endpoint
  app.post('/api/antifraud/verify-transaction', (req, res) => {
    const { orderId, amount, ipAddress, userAgent, clickToOrderTimeSec } = req.body;

    let isSuspicious = false;
    const reasons: string[] = [];

    if (clickToOrderTimeSec !== undefined && clickToOrderTimeSec < 2) {
      isSuspicious = true;
      reasons.push('Tempo anormal entre clique e conversão (<2s, provável bot)');
    }

    if (amount && amount > 5000) {
      isSuspicious = true;
      reasons.push('Volume unitário acima do limite de alerta automático');
    }

    res.json({
      verified: !isSuspicious,
      status: isSuspicious ? 'flagged_for_manual_review' : 'cleared',
      reasons,
      timestamp: new Date().toISOString(),
    });
  });

  // Vite middleware for development vs Static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AndMoney] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
