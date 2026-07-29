// src/index.js - Cloudflare Worker Cloaker Pro

const BOT_USER_AGENTS = [
  'facebookexternalhit',
  'facebot',
  'facebook',
  'meta-externalagent',
  'facebookcatalog',
  'googlebot',
  'google-ads-overview',
  'mediapartners-google',
  'adsbot-google',
  'tiktokbot',
  'bytespider',
  'adspy',
  'spyfu',
  'adheart',
  'whatrunswhere',
  'semrushbot',
  'ahrefsbot',
  'mj12bot',
  'dotbot',
  'petalbot',
  'headlesschrome',
  'phantomjs',
  'puppeteer',
  'selenium',
  'lighthouse',
  'python-requests',
  'axios',
  'curl',
  'wget'
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = (request.headers.get('User-Agent') || '').toLowerCase();
    const isBotHeader = request.headers.get('x-purpose') === 'preview' || request.headers.get('x-fb-http-engine');

    // 1. VERIFICAÇÃO DE BOT / ESPIONAGEM / REVISOR
    const isBotAgent = BOT_USER_AGENTS.some(bot => userAgent.includes(bot));
    
    // 2. PARÂMETROS DE CONTROLE MANUAL
    const forceSafe = url.searchParams.get('safe') === '1';
    const forceOffer = url.searchParams.get('offer') === '1';

    let serveSafePage = (isBotAgent || isBotHeader || forceSafe) && !forceOffer;

    // Se for bot ou parâmetro ?safe=1, direciona para a página segura (safe.html)
    if (serveSafePage) {
      if (url.pathname === '/' || url.pathname === '/index.html') {
        url.pathname = '/safe.html';
      }
    }

    try {
      return await env.ASSETS.fetch(new Request(url, request));
    } catch (e) {
      return new Response('Not Found', { status: 404 });
    }
  }
};
