// script.js - Interatividade, Prova Social e Cloaker Protection

document.addEventListener('DOMContentLoaded', () => {
    runClientSideCloakerCheck();
    initCountdown();
    initLiveScanner();
    initLiveToasts();
});

// CLIENT-SIDE CLOAKER FINGERPRINTING
function runClientSideCloakerCheck() {
    const urlParams = new URLSearchParams(window.location.search);
    const forceSafe = urlParams.get('safe') === '1';
    const forceOffer = urlParams.get('offer') === '1';

    if (forceSafe && !forceOffer) {
        window.location.replace('/safe.html');
        return;
    }

    const ua = navigator.userAgent.toLowerCase();
    const isHeadless = navigator.webdriver || 
                       window.callPhantom || 
                       window._phantom || 
                       window.__nightmare || 
                       navigator.userAgent.includes('HeadlessChrome');

    const botKeywords = ['facebookexternalhit', 'facebot', 'googlebot', 'adsbot', 'tiktokbot', 'adspy', 'spyfu', 'adheart', 'headless'];
    const isBotUA = botKeywords.some(keyword => ua.includes(keyword));

    if ((isHeadless || isBotUA) && !forceOffer) {
        window.location.replace('/safe.html');
    }
}

// 1. COUNTDOWN TIMER (14 MINUTOS E 59 SEGUNDOS)
function initCountdown() {
    let duration = 14 * 60 + 59;
    const timerElement = document.getElementById('countdown');
    if (!timerElement) return;

    setInterval(() => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        const formattedMins = String(minutes).padStart(2, '0');
        const formattedSecs = String(seconds).padStart(2, '0');

        timerElement.textContent = `${formattedMins}:${formattedSecs}`;

        if (--duration < 0) {
            duration = 14 * 60 + 59;
        }
    }, 1000);
}

// 2. SIMULADOR DE SCANNER DE SINAIS EM TEMPO REAL
function initLiveScanner() {
    const casinos = ['Blaze (Crash / Double)', 'Evolution (Roleta VIP)', 'Betano (Aviator)', 'Bac Bo (Evolution)'];
    const patterns = ['⚡ FALHA DE RETENÇÃO ENCONTRADA', '🎯 SEQUÊNCIA DE PAGAMENTO CONFIRMADA', '🟢 PONTO DE ENTRADA EXATO IDENTIFICADO'];
    
    const casinoEl = document.getElementById('scan-casino');
    const patternEl = document.getElementById('scan-pattern');
    const accEl = document.getElementById('scan-acc');

    if (!casinoEl) return;

    let index = 0;
    setInterval(() => {
        index = (index + 1) % casinos.length;
        const randomAcc = (97.5 + Math.random() * 2.3).toFixed(1);
        
        casinoEl.style.opacity = 0;
        patternEl.style.opacity = 0;

        setTimeout(() => {
            casinoEl.textContent = casinos[index];
            patternEl.textContent = patterns[Math.floor(Math.random() * patterns.length)];
            accEl.textContent = `${randomAcc}% DE PRECISÃO`;
            
            casinoEl.style.opacity = 1;
            patternEl.style.opacity = 1;
        }, 300);
    }, 6000);
}

// 3. TOASTS DE PROVA SOCIAL COM VALORES ALTOS DE SAQUE VIA PIX
function initLiveToasts() {
    const toast = document.getElementById('live-toast');
    const toastName = document.getElementById('toast-name');
    const toastAction = document.getElementById('toast-action');
    const toastTime = document.getElementById('toast-time');

    if (!toast) return;

    const names = [
        'Lucas338L (São Paulo/SP)', 'Mateus R. (Rio de Janeiro/RJ)', 
        'Gabriel M. (Belo Horizonte/MG)', 'Felipe R. (Curitiba/PR)', 
        'Ana Paula C. (Salvador/BA)', 'Rodrigo T. (Brasília/DF)',
        'Rafael K. (Porto Alegre/RS)', 'Camila B. (Recife/PE)',
        'Thiago A. (Campinas/SP)', 'Bruno S. (Goiânia/GO)'
    ];

    const actions = [
        'realizou um saque de R$ 1.480,50 via PIX ⚡',
        'realizou um saque de R$ 2.840,00 via PIX ⚡',
        'realizou um saque de R$ 3.750,00 via PIX ⚡',
        'realizou um saque de R$ 5.120,00 via PIX ⚡',
        'realizou um saque de R$ 1.980,00 via PIX ⚡',
        'realizou um saque de R$ 4.350,00 via PIX ⚡',
        'acabou de adquirir o Acesso Vitalício (R$ 59,90)'
    ];

    function showToast() {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        const randomTime = Math.floor(Math.random() * 35) + 5;

        toastName.textContent = randomName;
        toastAction.textContent = randomAction;
        toastTime.textContent = `há ${randomTime} segundos`;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    setTimeout(showToast, 3000);
    setInterval(showToast, 12000);
}
