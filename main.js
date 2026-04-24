const GEMINI_API_KEY = "AIzaSyBFwQ_YAwlxHZWIXMiyqjAwtgH_kBW-m8I";
const EXCHANGE_RATE_API = "https://open.er-api.com/v6/latest/USD";

let newsData = [];
const termData = [
    { id: 1, term: '금리', definition: '돈을 빌린 대가로 내는 이자의 비율', easyExplainer: '돈의 가격이라고 생각하면 쉬워요.' },
    { id: 2, term: '인플레이션', definition: '물가가 오르고 돈의 가치가 떨어지는 현상', easyExplainer: '과자값이 오르는 게 인플레이션이에요.' }
];

// 백업 뉴스 (AI 실패 시 표시됨)
const backupNews = [
    {
        id: 'b1', category: 'tech', categoryName: '테크/산업', title: '엔비디아 주가 사상 최고치 경신',
        summary: [{text: 'AI 칩 수요 폭발적 증가'}, {text: '시가총액 세계 1위 넘봐'}, {text: '반도체 시장 독주 지속'}],
        insight: '인공지능 열풍이 우리 삶과 주식 시장을 완전히 바꾸고 있어요.', isHero: true
    },
    {
        id: 'b2', category: 'macro', categoryName: '거시경제', title: '금리 인하 시점 논의 시작',
        summary: [{text: '물가 상승세 둔화 확인'}, {text: '연준, 하반기 인하 시사'}, {text: '시장 유동성 확대 기대'}],
        insight: '은행 이자가 내려가면 돈이 더 활발하게 돌게 됩니다.', isHero: false
    }
];

async function summarizeWithAI(title) {
    const prompt = `News: "${title}". 초등학생 수준 요약. JSON format ONLY: {"summary": [{"text": "요약1"}, {"text": "요약2"}, {"text": "요약3"}], "insight": "핵심설명"}`;
    try {
        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await res.json();
        if (!data.candidates || !data.candidates[0].content.parts[0].text) return null;
        const text = data.candidates[0].content.parts[0].text;
        const match = text.match(/\{[\s\S]*\}/);
        return match ? JSON.parse(match[0]) : null;
    } catch (e) {
        console.error("AI Fetch Error:", e);
        return null;
    }
}

async function init() {
    updateDate();
    fetchMarketData();
    const container = document.getElementById('news-grid');
    if (container) container.innerHTML = "<div style='grid-column:1/-1;text-align:center;padding:40px;'><h3>실시간 뉴스를 분석하고 있습니다...</h3><p>잠시만 기다려 주세요 (약 3~7초)</p></div>";

    const titles = ["엔비디아 주가 역대 최고치 경신", "한국 소비자물가 상승폭 둔화", "서울 주요 지역 아파트 거래량 회복"];
    
    let successCount = 0;
    for (let i = 0; i < titles.length; i++) {
        const res = await summarizeWithAI(titles[i]);
        if (res) {
            newsData.push({
                id: i, category: i===0?'tech':i===1?'macro':'realestate',
                categoryName: i===0?'테크/산업':i===1?'거시경제':'부동산',
                title: titles[i], summary: res.summary, insight: res.insight, isHero: i === 0
            });
            successCount++;
            renderNews(); 
        }
    }

    // 모든 AI 요약이 실패한 경우 백업 뉴스 표시
    if (successCount === 0) {
        console.log("Using backup news...");
        newsData = backupNews;
        renderNews();
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
        hero.innerHTML = `
            <div class="hero-card">
                <div class="hero-content">
                    <span class="hero-category">${heroNews.categoryName}</span>
                    <h2 style="margin:10px 0;">${heroNews.title}</h2>
                    <ul style="margin-bottom:15px; padding-left:20px;">${heroNews.summary.map(s => `<li>${s.text}</li>`).join('')}</ul>
                    <div class="insight-box">💡 <b>핵심 포인트:</b> ${heroNews.insight}</div>
                </div>
            </div>`;
    } else { hero.style.display = 'none'; }
    
    const gridNews = filter === 'all' ? filtered.filter(n => !n.isHero) : filtered;
    container.innerHTML = gridNews.map(n => `
        <article class="news-card">
            <span class="category-tag">${n.categoryName}</span>
            <h3 style="margin:10px 0;">${n.title}</h3>
            <ul style="margin-bottom:15px; padding-left:20px;">${n.summary.map(s => `<li>${s.text}</li>`).join('')}</ul>
            <div class="insight-box"><p>${n.insight}</p></div>
        </article>`).join('');
}

function fetchMarketData() {
    fetch(EXCHANGE_RATE_API).then(res => res.json()).then(data => {
        const bar = document.getElementById('market-bar');
        if (bar) bar.innerHTML = `<div style="text-align:center;font-size:12px;padding:5px;">실시간 환율: 1달러 = <b>${data.rates.KRW.toFixed(2)}원</b> (제공: Open API)</div>`;
    }).catch(e => console.error("Market API Error:", e));
}

function updateDate() {
    const el = document.getElementById('current-date');
    if (el) el.textContent = new Date().toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric' });
}

window.showPolicy = function(type) {
    const modal = document.getElementById('detail-modal');
    const body = document.getElementById('modal-body');
    const content = {
        about: "<h2>서비스 소개</h2><p>TJ Economy Insight는 AI 기술을 활용하여 복잡한 경제 뉴스를 누구나 이해하기 쉽게 요약하여 전달하는 뉴스 플랫폼입니다.</p>",
        privacy: "<h2>개인정보처리방침</h2><p>본 서비스는 뉴스레터 구독 시 외에는 어떠한 개인정보도 수집하지 않습니다.</p>",
        terms: "<h2>이용약관</h2><p>제공되는 정보는 투자 참고용이며 최종 책임은 본인에게 있습니다.</p>",
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
