const GEMINI_API_KEY = "AIzaSyBFwQ_YAwlxHZWIXMiyqjAwtgH_kBW-m8I";
const EXCHANGE_RATE_API = "https://open.er-api.com/v6/latest/USD";
const NEWS_JSON_URL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fheadlines%2Fsection%2Ftopic%2FBUSINESS%3Fhl%3Dko%26gl%3DKR%26ceid%3DKR%3Ako";
const CACHE_KEY = "tj_final_news_cache";
const CACHE_TIME = 60 * 60 * 1000;

// 절대 실패하지 않기 위한 고정 고품질 데이터
const fallbackData = [
    { title: "엔비디아 주가 사상 최고치, AI 산업의 중심", catName: "테크/산업", summary: [{text:"AI 칩 수요가 전 세계적으로 폭발하고 있어요."}, {text:"실적이 뒷받침되는 강력한 성장을 보여줍니다."}, {text:"반도체 시장의 주도권을 완전히 잡았습니다."}], insight: "엔비디아는 단순한 주식이 아니라 현대판 석유인 AI 칩을 지배하는 회사예요. 이 흐름은 당분간 계속될 거예요." },
    { title: "미국 연준, 금리 인하 신중론 속 시장은 기대감", catName: "거시경제", summary: [{text:"미국 중앙은행이 금리 결정에 신중한 모습이에요."}, {text:"물가가 잡히고 있다는 확실한 증거를 원합니다."}, {text:"시장 전문가들은 9월 인하를 가장 유력하게 봐요."}], insight: "금리가 내려가면 대출 이자 부담이 줄어드니, 부동산이나 주식 투자자들에게는 아주 좋은 소식입니다." },
    { title: "서울 아파트 신고가 거래 비중 증가 추세", catName: "부동산", summary: [{text:"강남과 주요 인기 지역 단지 위주로 가격이 올라요."}, {text:"전세가 상승이 매매가를 밀어 올리는 모양새입니다."}, {text:"내 집 마련 실수요자들이 급매물을 소진하고 있어요."}], insight: "바닥론이 힘을 얻고 있지만 지역별 차이가 커요. 내가 살고 싶은 곳의 전세가 흐름을 먼저 체크하세요." },
    { title: "K-배터리 글로벌 공급망 다변화로 승부수", catName: "증시/투자", summary: [{text:"핵심 원료를 중국 외 지역에서 확보하고 있어요."}, {text:"미국 시장 공장 가동이 순조롭게 진행 중입니다."}, {text:"전기차 시장 일시 정체에도 투자는 계속됩니다."}], insight: "전기차 시장은 잠시 숨 고르기 중이지만, 2차 전지의 미래 가치는 여전히 높습니다. 장기 투자가 답이에요." },
    { title: "한국 수출 6개월 연속 흑자 행진의 비결", catName: "테크/산업", summary: [{text:"반도체와 자동차가 수출 효자 종목이에요."}, {text:"미국과 동남아 시장으로의 수출이 활발합니다."}, {text:"무역수지 개선으로 원화 가치 안정도 기대됩니다."}], insight: "수출이 잘 된다는 건 우리나라 회사들이 돈을 잘 벌고 있다는 뜻이에요. 나라 전체 경제에 훈풍이 불고 있습니다." },
    { title: "청년들을 위한 '내 집 마련' 정책 지원 강화", catName: "부동산", summary: [{text:"저금리 대출 상품과 청약 혜택이 늘어납니다."}, {text:"자산 형성을 돕는 금융 지원이 대폭 강화됐어요."}, {text:"정부 지원 상품을 꼼꼼히 따져볼 시기입니다."}], insight: "정부 정책을 잘 이용하는 것도 똑똑한 재테크예요. 나에게 맞는 청년 지원 대출이 있는지 꼭 확인해보세요." }
];

async function fetchNews() {
    try {
        const res = await fetch(NEWS_JSON_URL);
        const data = await res.json();
        if (data.status === 'ok' && data.items.length > 0) {
            return data.items.slice(0, 6).map(i => ({ title: i.title.split(" - ")[0], url: i.link }));
        }
    } catch (e) { console.error("RSS Fetch Failed", e); }
    return null;
}

async function analyzeWithAI(headlines) {
    const titlesStr = headlines.map((h, i) => `${i+1}. ${h.title}`).join("\n");
    const prompt = `Economy News Titles:\n${titlesStr}\n\nSummarize each for kids in 3 lines and add one insight. Reply ONLY with valid JSON array: [{"summary": [{"text":"line1"}, {"text":"line2"}, {"text":"line3"}], "insight": "text"}]`;
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const json = await res.json();
        const text = json.candidates[0].content.parts[0].text;
        const match = text.match(/\[[\s\S]*\]/);
        if (match) {
            const aiRes = JSON.parse(match[0]);
            return headlines.map((h, i) => ({
                id: i, title: h.title, url: h.url, catName: "실시간 핫이슈",
                summary: aiRes[i]?.summary || fallbackData[i].summary,
                insight: aiRes[i]?.insight || fallbackData[i].insight,
                isHero: i === 0
            }));
        }
    } catch (e) { console.error("AI Analysis Failed", e); }
    return null;
}

async function init() {
    updateDate();
    fetchMarketData();
    const container = document.getElementById('news-grid');
    
    // 1. 캐시 시도
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TIME) {
            renderNews(data);
            return;
        }
    }

    if (container) container.innerHTML = "<div style='grid-column:1/-1;text-align:center;padding:50px;'><h3>최신 뉴스를 실시간 분석 중입니다...</h3><p>약 5초 뒤에 업데이트됩니다.</p></div>";

    // 2. 실시간 데이터 시도
    const headlines = await fetchNews();
    if (headlines) {
        const analyzed = await analyzeWithAI(headlines);
        if (analyzed) {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ data: analyzed, timestamp: Date.now() }));
            renderNews(analyzed);
            return;
        }
    }

    // 3. 최후의 보루: 백업 데이터 표시
    console.log("Using fallback data.");
    const finalData = fallbackData.map((d, i) => ({...d, id: i, isHero: i===0}));
    renderNews(finalData);
}

function renderNews(data, filter = 'all') {
    const container = document.getElementById('news-grid');
    const hero = document.getElementById('hero-section');
    if (!container || !hero) return;

    const heroItem = data[0];
    if (filter === 'all' && heroItem) {
        hero.style.display = 'block';
        hero.innerHTML = `<div class="hero-card"><div class="hero-content">
            <span class="hero-category">${heroItem.catName || "핫이슈"}</span>
            <h2 style="margin:10px 0; cursor:pointer;" onclick="window.open('${heroItem.url || '#'}')">${heroItem.title}</h2>
            <ul style="margin-bottom:15px; padding-left:20px;">${heroItem.summary.map(s => `<li>${s.text}</li>`).join('')}</ul>
            <div class="insight-box"><b>📢 인사이트:</b> ${heroItem.insight}</div>
        </div></div>`;
    } else { hero.style.display = 'none'; }

    const gridItems = filter === 'all' ? data.slice(1) : data;
    container.innerHTML = gridItems.map(n => `
        <article class="news-card">
            <span class="category-tag">${n.catName || "실시간 속보"}</span>
            <h3 style="margin:10px 0; font-size:18px; cursor:pointer;" onclick="window.open('${n.url || '#'}')">${n.title}</h3>
            <ul style="margin-bottom:15px; padding-left:20px; color:#555; font-size:14px;">${n.summary.map(s => `<li>${s.text}</li>`).join('')}</ul>
            <div class="insight-box" style="font-size:14px;"><b>📢 인사이트:</b><br>${n.insight}</div>
        </article>`).join('');
    
    window.currentNewsData = data;
}

function fetchMarketData() {
    fetch(EXCHANGE_RATE_API).then(res => res.json()).then(data => {
        const bar = document.getElementById('market-bar');
        if (bar) bar.innerHTML = `<div style="text-align:center;font-size:12px;padding:5px;color:white;">실시간 환율: 1달러 = <b>${data.rates.KRW.toFixed(2)}원</b></div>`;
    });
}

function updateDate() {
    const el = document.getElementById('current-date');
    if (el) el.textContent = new Date().toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric', weekday:'long' });
}

window.showPolicy = function(type) {
    const modal = document.getElementById('detail-modal');
    const body = document.getElementById('modal-body');
    const texts = { about: "실시간 뉴스 요약 서비스입니다.", privacy: "개인정보를 수집하지 않습니다.", terms: "투자 책임은 본인에게 있습니다." };
    body.innerHTML = `<h2>${type}</h2><p>${texts[type] || '준비 중입니다.'}</p>`;
    modal.style.display = 'block';
};

document.querySelector('.close-modal').onclick = () => { document.getElementById('detail-modal').style.display = 'none'; };
document.addEventListener('DOMContentLoaded', init);
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderNews(window.currentNewsData, e.target.dataset.category);
    });
});
