const GEMINI_API_KEY = "AIzaSyBFwQ_YAwlxHZWIXMiyqjAwtgH_kBW-m8I";
const EXCHANGE_RATE_API = "https://open.er-api.com/v6/latest/USD";

let newsData = [];
const termData = [
    { id: 1, term: '금리', definition: '돈의 가격', easyExplainer: '이자율이 낮아지면 대출받기 쉬워져요.' },
    { id: 2, term: '인플레이션', definition: '물가 상승', easyExplainer: '돈의 가치가 떨어지는 현상이에요.' }
];

const newsTitles = [
    { title: "엔비디아 주가 역대 최고치 경신, AI 칩 독점의 힘", cat: 'tech', catName: '테크/산업' },
    { title: "미국 연준 금리 동결, 시장은 하반기 인하 기대", cat: 'macro', catName: '거시경제' },
    { title: "서울 주요 아파트 단지 신고가 속출, 바닥 확인했나", cat: 'realestate', catName: '부동산' },
    { title: "K-배터리 북미 시장 점유율 확대, 리튬 가격 하락이 변수", cat: 'stocks', catName: '증시/투자' },
    { title: "반도체 수출 5개월 연속 증가, 수출 회복세 뚜렷", cat: 'tech', catName: '테크/산업' },
    { title: "청년층 생애 첫 주택 구매 비중 역대 최고 기록", cat: 'realestate', catName: '부동산' }
];

async function summarizeWithAI(item, index) {
    const prompt = `News: "${item.title}". 초등학생 수준 요약. JSON format ONLY: {"summary": [{"text": "요약1"}, {"text": "요약2"}, {"text": "요약3"}], "insight": "기사 내용을 아주 쉽게 풀어서 투자자나 일반인에게 주는 실질적인 조언이나 관점(인사이트)을 작성해줘"}`;
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await res.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const text = data.candidates[0].content.parts[0].text;
            const match = text.match(/\{[\s\S]*\}/);
            if (match) {
                const result = JSON.parse(match[0]);
                return {
                    id: index, category: item.cat, categoryName: item.catName,
                    title: item.title, summary: result.summary, insight: result.insight, isHero: index === 0
                };
            }
        }
        return null;
    } catch (e) {
        console.error("AI Error:", e);
        return null;
    }
}

async function init() {
    updateDate();
    fetchMarketData();
    const container = document.getElementById('news-grid');
    if (container) container.innerHTML = "<div style='grid-column:1/-1;text-align:center;padding:40px;'><h3>실시간 AI 인사이트를 도출하고 있습니다...</h3><p>병렬 분석 기술로 속도를 높이는 중입니다. (약 3~5초)</p></div>";

    const promises = newsTitles.map((item, idx) => summarizeWithAI(item, idx));
    const results = await Promise.all(promises);
    
    newsData = results.filter(r => r !== null);
    
    if (newsData.length === 0) {
        newsData = newsTitles.map((item, idx) => ({
            id: idx, category: item.cat, categoryName: item.catName, title: item.title,
            summary: [{text: '현재 실시간 분석이 일시적으로 지연되고 있습니다.'}], 
            insight: '새로고침을 하거나 잠시 후 다시 접속해주세요.', isHero: idx === 0
        }));
    }
    renderNews();
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
        hero.innerHTML = `
            <div class="hero-card">
                <div class="hero-content">
                    <span class="hero-category">${heroNews.categoryName}</span>
                    <h2 style="margin:10px 0; font-size: 24px;">${heroNews.title}</h2>
                    <ul style="margin-bottom:15px; padding-left:20px;">${heroNews.summary.map(s => `<li>${s.text}</li>`).join('')}</ul>
                    <div class="insight-box" style="background: #eef2f7; border-left: 5px solid #3498db;">
                        <b>📢 AI 인사이트:</b> ${heroNews.insight}
                    </div>
                </div>
            </div>`;
    } else { hero.style.display = 'none'; }
    
    const gridNews = filter === 'all' ? filtered.filter(n => !n.isHero) : filtered;
    container.innerHTML = gridNews.map(n => `
        <article class="news-card">
            <span class="category-tag">${n.categoryName}</span>
            <h3 style="margin:10px 0; font-size: 18px;">${n.title}</h3>
            <ul style="margin-bottom:15px; padding-left:20px; color: #555; font-size:14px;">${n.summary.map(s => `<li>${s.text}</li>`).join('')}</ul>
            <div class="insight-box" style="font-size:14px;">
                <b>📢 AI 인사이트:</b><br>${n.insight}
            </div>
        </article>`).join('');
}

function fetchMarketData() {
    fetch(EXCHANGE_RATE_API).then(res => res.json()).then(data => {
        const bar = document.getElementById('market-bar');
        if (bar) bar.innerHTML = `<div style="text-align:center;font-size:12px;padding:5px;color:white;">실시간 환율: 1달러 = <b>${data.rates.KRW.toFixed(2)}원</b> (제공: Open API)</div>`;
    }).catch(e => console.error(e));
}

function updateDate() {
    const el = document.getElementById('current-date');
    if (el) el.textContent = new Date().toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric' });
}

window.showPolicy = function(type) {
    const modal = document.getElementById('detail-modal');
    const body = document.getElementById('modal-body');
    const content = {
        about: "<h2>서비스 소개</h2><p>TJ Economy Insight는 AI로 경제 뉴스를 요약 전달합니다.</p>",
        privacy: "<h2>개인정보처리방침</h2><p>개인정보를 수집하지 않습니다.</p>",
        terms: "<h2>이용약관</h2><p>모든 정보는 투자 참고용입니다.</p>",
        contact: "<h2>문의하기</h2><p>Email: contact@tjinsight.com</p>"
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
