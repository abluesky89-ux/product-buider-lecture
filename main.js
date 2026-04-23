const marketData = [
    { name: 'KOSPI', value: '2,754.89', change: '+0.42%', up: true },
    { name: 'KOSDAQ', value: '891.56', change: '-0.15%', up: false },
    { name: 'NASDAQ', value: '16,384.47', change: '+1.10%', up: true },
    { name: 'S&P 500', value: '5,248.49', change: '+0.86%', up: true },
    { name: '환율(USD/KRW)', value: '1,342.50', change: '+0.22%', up: true }
];

const newsData = [
    {
        id: 1,
        category: 'macro',
        categoryName: '거시경제',
        title: '금리 인하 기대감에 증시 활기, 연준의 다음 행보는?',
        summary: [
            { text: '연준 위원들의 비둘기파적 발언 잇따라', url: 'https://www.mk.co.kr/search?word=연준+비둘기파' },
            { text: '소비자 물가 지수(CPI) 예상치 하회하며 안정세', url: 'https://www.hankyung.com/search?query=CPI+안정' },
            { text: '시장 전문가들, 6월 첫 금리 인하 가능성 70%로 점쳐', url: 'https://www.mk.co.kr/search?word=금리인하+전망' }
        ],
        insight: '금리 인하가 가시화될 경우 기술주와 성장주에 우호적인 환경이 조성될 것으로 보입니다. 다만, 고용 지표의 급격한 악화 여부를 주시해야 합니다.',
        isHero: true
    },
    {
        id: 2,
        category: 'stocks',
        categoryName: '증시/투자',
        title: '반도체 섹터 신고가 경신, AI 수요가 끌어올린 실적',
        summary: [
            { text: '엔비디아 실적 발표 후 관련 반도체주 동반 상승', url: 'https://www.hankyung.com/search?query=엔비디아+실적' },
            { text: 'HBM(고대역폭메모리) 공급 부족 현상 지속', url: 'https://www.mk.co.kr/search?word=HBM+공급' },
            { text: '국내 소부장 기업들로 낙수효과 확산 중', url: 'https://www.hankyung.com/search?query=반도체+소부장' }
        ],
        insight: 'AI는 단기 테마가 아닌 거대한 패러다임 변화입니다. 실체가 있는 실적을 내는 기업 위주로 포트폴리오를 재편할 시기입니다.'
    },
    {
        id: 3,
        category: 'realestate',
        categoryName: '부동산',
        title: '서울 아파트 거래량 회복세, 바닥 다지기 들어갔나',
        summary: [
            { text: '강남 3구 위주로 급매물 소진되며 거래 활성화', url: 'https://www.mk.co.kr/search?word=서울+아파트+거래량' },
            { text: '대출 규제 완화 기대로 매수 심리 소폭 개선', url: 'https://www.hankyung.com/search?query=부동산+대출+규제' },
            { text: '분양가 상한제 주택 실거주 의무 유예가 변수', url: 'https://www.mk.co.kr/search?word=실거주+의무+유예' }
        ],
        insight: '거래량 증가는 하락 멈춤의 신호일 수 있으나, 고금리 유지가 길어질 수 있어 추격 매수보다는 입지별 양극화에 대비해야 합니다.'
    },
    {
        id: 4,
        category: 'tech',
        categoryName: '테크/산업',
        title: '애플, 자체 AI 모델 개발 선언... 빅테크 경쟁 심화',
        summary: [
            { text: '아이폰 내장형 온디바이스 AI 탑재 계획 발표', url: 'https://www.hankyung.com/search?query=애플+AI' },
            { text: '구글, 오픈AI와 차별화된 개인 정보 보호 강조', url: 'https://www.mk.co.kr/search?word=구글+AI' },
            { text: '스마트폰 시장의 교체 주기 단축 효과 기대', url: 'https://www.hankyung.com/search?query=스마트폰+교체주기' }
        ],
        insight: '온디바이스 AI 시장의 개화는 기기 변경 수요를 자극할 것입니다. 하드웨어 제조 역량을 가진 기업들의 가치가 재평가될 수 있습니다.'
    },
    {
        id: 5,
        category: 'macro',
        categoryName: '거시경제',
        title: '엔저 현상 심화, 일본 수출 기업에는 호재 vs 가계엔 부담',
        summary: [
            { text: '달러당 엔화 가치 34년 만에 최저치 경신', url: 'https://www.mk.co.kr/search?word=엔저+심화' },
            { text: '일본 은행(BOJ)의 개입 가능성에도 약세 지속', url: 'https://www.hankyung.com/search?query=일본은행+개입' },
            { text: '한국 수출 경합 품목의 가격 경쟁력 약화 우려', url: 'https://www.mk.co.kr/search?word=엔저+한국수출' }
        ],
        insight: '역대급 엔저는 일본 여행과 직구에는 기회지만, 글로벌 시장에서 일본 기업과 경쟁하는 국내 기업들에게는 부담 요인입니다.'
    }
];

const marketBar = document.getElementById('market-bar');
const heroContainer = document.getElementById('hero-section');
const newsGrid = document.getElementById('news-grid');
const categoryButtons = document.querySelectorAll('.nav-item');
const themeToggle = document.getElementById('theme-toggle');
const currentDateElement = document.getElementById('current-date');

// 지수 바 렌더링
function renderMarketBar() {
    marketBar.innerHTML = marketData.map(item => `
        <div class="market-item">
            <span class="market-label">${item.name}</span>
            <span class="market-value">${item.value}</span>
            <span class="market-change ${item.up ? 'up' : 'down'}">${item.change}</span>
        </div>
    `).join('');
}

// 날짜 업데이트
function updateDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    currentDateElement.textContent = now.toLocaleDateString('ko-KR', options);
}

// 뉴스 렌더링
function renderNews(filter = 'all') {
    const filteredNews = filter === 'all' ? newsData : newsData.filter(item => item.category === filter);
    
    // Hero 뉴스 렌더링
    const heroNews = newsData.find(item => item.isHero);
    if (filter === 'all' && heroNews) {
        heroContainer.innerHTML = `
            <div class="hero-card">
                <div class="hero-content">
                    <span class="hero-category">${heroNews.categoryName}</span>
                    <h2 class="hero-title">${heroNews.title}</h2>
                    <ul class="news-summary-list hero-summary">
                        ${heroNews.summary.map(s => `<li><a href="${s.url}" target="_blank">${s.text}</a></li>`).join('')}
                    </ul>
                    <div class="insight-box">
                        <span class="insight-label">AI Insight</span>
                        <p>${heroNews.insight}</p>
                    </div>
                </div>
            </div>
        `;
        heroContainer.style.display = 'block';
    } else {
        heroContainer.style.display = 'none';
    }

    // Grid 뉴스 렌더링
    const gridNews = filter === 'all' ? newsData.filter(item => !item.isHero) : filteredNews;
    newsGrid.innerHTML = gridNews.map(item => `
        <article class="news-card">
            <span class="category-tag">${item.categoryName}</span>
            <h3 class="news-title">${item.title}</h3>
            <ul class="news-summary-list">
                ${item.summary.map(s => `<li><a href="${s.url}" target="_blank">${s.text}</a></li>`).join('')}
            </ul>
            <div class="insight-box">
                <span class="insight-label">Insight</span>
                <p>${item.insight}</p>
            </div>
        </article>
    `).join('');
}

// 카테고리 클릭 이벤트
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderNews(button.dataset.category);
    });
});

// 테마 토글
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeButton(currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    themeToggle.textContent = theme === 'dark' ? '라이트 모드' : '다크 모드';
}

// 초기화
renderMarketBar();
updateDate();
renderNews();
