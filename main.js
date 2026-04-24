const GEMINI_API_KEY = "AIzaSyBFwQ_YAwlxHZWIXMiyqjAwtgH_kBW-m8I";
const EXCHANGE_RATE_API = "https://open.er-api.com/v6/latest/USD";

let newsData = [];
const termData = [
    { id: 1, term: '금리', definition: '돈을 빌린 대가로 내는 이자의 비율', easyExplainer: '돈의 가격이라고 생각하면 쉬워요.' },
    { id: 2, term: '인플레이션', definition: '물가가 오르고 돈의 가치가 떨어지는 현상', easyExplainer: '과자값이 오르는 게 인플레이션이에요.' }
];

async function summarizeWithAI(title) {
    const prompt = `News: "${title}". 초등학생 수준 요약. JSON format ONLY: {"summary": [{"text": "요약1"}, {"text": "요약2"}, {"text": "요약3"}], "insight": "핵심설명"}`;
    try {
        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await res.json();
        const text = data.candidates[0].content.parts[0].text;
        const match = text.match(/\{[\s\S]*\}/);
        return match ? JSON.parse(match[0]) : null;
    } catch (e) { return null; }
}

async function init() {
    updateDate();
    fetchMarketData();
    const titles = ["엔비디아 역대 최고가 경신", "한국 물가 상승폭 둔화", "서울 아파트 거래량 증가"];
    const container = document.getElementById('news-grid');
    if (container) container.innerHTML = "<p style='grid-column:1/-1;text-align:center;'>고품질 뉴스를 분석 중입니다...</p>";
    
    for (let i = 0; i < titles.length; i++) {
        const res = await summarizeWithAI(titles[i]);
        if (res) {
            newsData.push({
                id: i, category: i===0?'tech':i===1?'macro':'realestate',
                categoryName: i===0?'테크/산업':i===1?'거시경제':'부동산',
                title: titles[i], summary: res.summary, insight: res.insight, isHero: i === 0
            });
            renderNews();
        }
    }
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
    const heroNews = newsData.find(n => n.isHero);
    if (filter === 'all' && heroNews) {
        hero.style.display = 'block';
        hero.innerHTML = `<div class="hero-card"><h2>${heroNews.title}</h2><div class="insight-box">${heroNews.insight}</div></div>`;
    } else { hero.style.display = 'none'; }
    
    container.innerHTML = filtered.filter(n => filter !== 'all' || !n.isHero).map(n => `
        <article class="news-card">
            <span class="category-tag">${n.categoryName}</span>
            <h3>${n.title}</h3>
            <ul style="margin:10px 0; padding-left:20px;">${n.summary.map(s => `<li>${s.text}</li>`).join('')}</ul>
            <div class="insight-box"><p>${n.insight}</p></div>
        </article>`).join('');
}

function fetchMarketData() {
    fetch(EXCHANGE_RATE_API).then(res => res.json()).then(data => {
        const bar = document.getElementById('market-bar');
        if (bar) bar.innerHTML = `<div style="text-align:center;font-size:12px;">실시간 환율: 1달러 = ${data.rates.KRW.toFixed(2)}원 (제공: Open API)</div>`;
    });
}

function updateDate() {
    const el = document.getElementById('current-date');
    if (el) el.textContent = new Date().toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric' });
}

// 정책 팝업 함수
window.showPolicy = function(type) {
    const modal = document.getElementById('detail-modal');
    const body = document.getElementById('modal-body');
    const content = {
        about: "<h2>서비스 소개</h2><p>TJ Economy Insight는 AI 기술을 활용하여 복잡한 경제 뉴스를 누구나 이해하기 쉽게 요약하여 전달하는 혁신적인 뉴스 플랫폼입니다. 매일 수천 건의 기사 중 가장 중요한 이슈를 엄선합니다.</p>",
        privacy: "<h2>개인정보처리방침</h2><p>본 서비스는 사용자의 개인정보를 수집하지 않습니다. 뉴스레터 구독 시 입력하는 이메일은 오직 뉴스레터 전송 목적으로만 사용되며 안전하게 보호됩니다.</p>",
        terms: "<h2>이용약관</h2><p>TJ Economy Insight에서 제공하는 모든 정보는 참고용입니다. 투자 및 경제 활동에 대한 최종 결정은 본인에게 있으며, 당사는 정보의 정확성을 위해 최선을 다하나 결과에 책임을 지지 않습니다.</p>",
        contact: "<h2>문의하기</h2><p>서비스 이용 관련 문의는 다음 이메일로 연락주시기 바랍니다.<br>Email: contact@tjinsight.com</p>"
    };
    body.innerHTML = content[type] || "내용을 찾을 수 없습니다.";
    modal.style.display = 'block';
};

document.querySelector('.close-modal').onclick = () => { document.getElementById('detail-modal').style.display = 'none'; };

document.addEventListener('DOMContentLoaded', init);
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderNews(e.target.dataset.category);
    });
});
