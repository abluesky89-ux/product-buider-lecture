// TJ Economy Insight - Full Logic
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
        easyExplainer: '물건값은 오르고, 내 지갑 속 돈의 힘은 약해진 상황인 거죠.',
        example: '짜장면 가격이 옛날보다 많이 오른 것이 예예요.'
    }
];

const apartmentData = [
    { name: '자양호반써밋 (광진구 자양동)', area: '17평', price: '12억 9,000', prevPrice: '11억 5,000', change: '+1억 4,000', date: '2026.04.20' },
    { name: '헬리오시티 (송파구 가락동)', area: '18평', price: '11억 2,000', prevPrice: '10억 1,000', change: '+1억 1,000', date: '2026.04.22' }
];

async function summarizeWithAI(title) {
    const prompt = "경제 뉴스 제목 " + title + "을 초등학생 수준으로 요약해줘. 반드시 다음 JSON 형식으로만 답해: {\"summary\": [{\"text\": \"요약1\"}, {\"text\": \"요약2\"}, {\"text\": \"요약3\"}], \"insight\": \"쉬운 설명\"}";
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY, {
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

async function init() {
    updateDate();
    renderMarketBar();
    fetchMarketData();
    renderApartments();

    const container = document.getElementById('news-grid');
    if (container) container.innerHTML = "<div style='grid-column:1/-1; padding:50px; text-align:center;'><h3>AI가 뉴스를 분석 중입니다...</h3><p>잠시만 기다려 주세요</p></div>";

    const titles = ["엔비디아 주가 사상 최고치", "한국 물가 안정세 진입", "서울 아파트 거래량 회복"];
    for (let i = 0; i < titles.length; i++) {
        const res = await summarizeWithAI(titles[i]);
        if (res) {
            newsData.push({
                id: i,
                category: i===0?'tech':i===1?'macro':'realestate',
                categoryName: i===0?'테크/산업':i===1?'거시경제':'부동산',
                title: titles[i],
                summary: res.summary,
                insight: res.insight,
                isHero: i === 0
            });
            renderNews();
        }
    }
}

function renderMarketBar() {
    const bar = document.getElementById('market-bar');
    if (!bar) return;
    const items = marketData.map(d => "<div class='market-item'><span>" + d.name + "</span> <span>" + d.value + "</span></div>").join('');
    bar.innerHTML = "<div class='market-container' style='display:flex; gap:20px; padding:10px;'>" + items + "</div>";
}

async function fetchMarketData() {
    try {
        const res = await fetch(EXCHANGE_RATE_API);
        const data = await res.json();
        marketData[3].value = data.rates.KRW.toFixed(2);
        renderMarketBar();
    } catch (e) {}
}

function renderNews(filter = 'all') {
    const container = document.getElementById('news-grid');
    const hero = document.getElementById('hero-section');
    if (!container || !hero) return;

    if (filter === 'terms') {
        hero.style.display = 'none';
        container.innerHTML = termData.map(t => "<article class='news-card'><h3>" + t.term + "</h3><p>" + t.easyExplainer + "</p></article>").join('');
        return;
    }

    const filtered = filter === 'all' ? newsData : newsData.filter(n => n.category === filter);
    const heroNews = newsData.find(n => n.isHero);

    if (filter === 'all' && heroNews) {
        hero.style.display = 'block';
        hero.innerHTML = "<div class='hero-card'><h2>" + heroNews.title + "</h2><div class='insight-box'>" + heroNews.insight + "</div></div>";
    } else { hero.style.display = 'none'; }

    const gridNews = filter === 'all' ? filtered.filter(n => !n.isHero) : filtered;
    container.innerHTML = gridNews.map(n => "<article class='news-card'><h3>" + n.title + "</h3><p>" + n.insight + "</p></article>").join('');
}

function renderApartments() {
    const list = document.getElementById('apartment-list');
    if (list) list.innerHTML = apartmentData.map(a => "<div class='apartment-item'>" + a.name + ": " + a.price + "</div>").join('');
}

function updateDate() {
    const el = document.getElementById('current-date');
    if (el) el.textContent = new Date().toLocaleDateString('ko-KR');
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderNews(e.target.dataset.category);
        });
    });
});
