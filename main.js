// AI News Summarizer Main JS
const GEMINI_API_KEY = "AIzaSyBFwQ_YAwlxHZWIXMiyqjAwtgH_kBW-m8I";
const EXCHANGE_RATE_API = "https://open.er-api.com/v6/latest/USD";

let marketData = [
    { name: 'KOSPI', value: '2,647.50', change: '+0.45%', up: true },
    { name: 'KOSDAQ', value: '862.10', change: '-0.12%', up: false },
    { name: 'NASDAQ', value: '16,274.90', change: '+1.10%', up: true },
    { name: '환율(USD/KRW)', value: '로딩 중...', change: '-', up: true }
];

let newsData = [];

const termData = [
    {
        id: 1,
        term: '금리 (Interest Rate)',
        definition: '남에게 돈을 빌린 대가로 치르는 이자의 비율이에요.',
        easyExplainer: '쉽게 생각하면 "돈의 가격"이에요. 금리가 높으면 돈을 빌리는 값이 비싸지는 거고, 금리가 낮으면 돈을 빌리는 값이 싸지는 거예요.',
        example: '은행 예금 이자나 대출 이자가 대표적이에요.'
    },
    {
        id: 2,
        term: '인플레이션 (Inflation)',
        definition: '물가가 계속해서 오르고, 내가 가진 돈의 가치는 떨어지는 현상이에요.',
        easyExplainer: '작년에는 1,000원으로 과자 한 봉지를 살 수 있었는데, 올해는 과자 값이 올라서 2,000원을 줘야 한다면? 이게 바로 인플레이션이에요.',
        example: '짜장면 가격이 옛날에는 500원이었는데 지금은 7,000원인 것도 인플레이션의 한 예예요.'
    }
];

async function summarizeNewsWithAI(newsTitle) {
    const prompt = `Next economy news title summary for kids: "${newsTitle}". Reply ONLY in JSON format: {"summary": [{"text": "line1"}, {"text": "line2"}, {"text": "line3"}], "insight": "easy insight"}`;
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        const match = text.match(/\{[\s\S]*\}/);
        return match ? JSON.parse(match[0]) : null;
    } catch (e) { return null; }
}

async function updateRealTimeNews() {
    const container = document.getElementById('news-grid');
    if (container) container.innerHTML = "<p style='padding:40px; text-align:center; width:100%; grid-column:1/-1;'>AI 요약 중...</p>";
    const titles = ["엔비디아 사상 최고가", "한국 물가 안정세", "서울 아파트 거래 회복"];
    const results = [];
    for (let i = 0; i < titles.length; i++) {
        const res = await summarizeNewsWithAI(titles[i]);
        if (res) {
            results.push({
                id: i,
                category: i===0?'tech':i===1?'macro':'realestate',
                categoryName: i===0?'테크/산업':i===1?'거시경제':'부동산',
                title: titles[i],
                summary: res.summary,
                insight: res.insight,
                isHero: i === 0
            });
        }
    }
    newsData = results;
    renderNews();
}

function renderMarketBar() {
    const bar = document.getElementById('market-bar');
    if (!bar) return;
    const items = marketData.map(d => `<div class="market-item"><span>${d.name}</span> <span>${d.value}</span></div>`).join('');
    bar.innerHTML = `<div style="display:flex; gap:20px; padding:10px; color:white; background:#2c3e50;">${items}</div>`;
}

function renderNews(filter = 'all') {
    const container = document.getElementById('news-grid');
    const hero = document.getElementById('hero-section');
    if (!container || !hero) return;
    if (filter === 'terms') {
        hero.style.display = 'none';
        container.innerHTML = termData.map(t => `<article class="news-card"><h3>${t.term}</h3><p>${t.easyExplainer}</p></article>`).join('');
        return;
    }
    const filtered = filter === 'all' ? newsData : newsData.filter(n => n.category === filter);
    hero.innerHTML = filtered.length > 0 && filter === 'all' ? `<h2>${filtered[0].title}</h2><p>${filtered[0].insight}</p>` : '';
    container.innerHTML = filtered.map(n => `<article class="news-card"><h3>${n.title}</h3><p>${n.insight}</p></article>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderMarketBar();
    updateRealTimeNews();
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            renderNews(e.target.dataset.category);
        });
    });
});
