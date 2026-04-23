const marketData = [
    { name: 'KOSPI', value: '6,475.81', change: '+0.90%', up: true },
    { name: 'KOSDAQ', value: '1,174.31', change: '-0.58%', up: false },
    { name: 'NASDAQ', value: '24,657.57', change: '+1.64%', up: true },
    { name: 'S&P 500', value: '7,137.90', change: '+1.05%', up: true },
    { name: '환율(USD/KRW)', value: '1,481.65', change: '+0.38%', up: true }
];

const newsData = [
    {
        id: 1,
        category: 'macro',
        categoryName: '거시경제',
        title: '금리 인하 기대감에 증시 활기, 연준의 다음 행보는?',
        summary: [
            { 
                text: '연준 위원들의 비둘기파적 발언 잇따라', 
                detail: '최근 연준 주요 인사들이 인플레이션 둔화세를 인정하며, 추가 금리 인상보다는 인하 시점을 논의할 때라는 발언을 내놓고 있습니다. 이는 시장에 강력한 유동성 공급 신호로 작용하고 있습니다.',
                url: 'https://www.mk.co.kr/search?word=연준+비둘기파' 
            },
            { 
                text: '소비자 물가 지수(CPI) 예상치 하회하며 안정세', 
                detail: '에너지 가격 하락과 공급망 정상화로 인해 소비자 물가 상승폭이 둔화되었습니다. 특히 근원 물가가 안정되면서 연준의 긴축 종료 명분이 강화되고 있습니다.',
                url: 'https://www.hankyung.com/search?query=CPI+안정' 
            },
            { 
                text: '시장 전문가들, 6월 첫 금리 인하 가능성 70%로 점쳐', 
                detail: '페드워치(FedWatch) 등 시카고상품거래소 데이터에 따르면, 전문가들은 상반기 내 금리 인하가 시작될 확률을 매우 높게 보고 있으며 이는 위험 자산 선호 현상을 부추기고 있습니다.',
                url: 'https://www.mk.co.kr/search?word=금리인하+전망' 
            }
        ],
        insight: '금리 인하가 가시화될 경우 기술주와 성장주에 우호적인 환경이 조성될 것으로 보입니다. 특히 저금리 환경은 기업의 조달 비용을 낮추어 공격적인 투자를 가능케 합니다. 다만, 연준이 금리 인하를 서두르는 이유가 인플레이션 둔화가 아닌 경기 침체(Recession) 때문이라면 시장은 오히려 하락할 수 있으므로, 고용 지표의 급격한 악화 여부를 면밀히 주시해야 합니다.',
        isHero: true
    },
    {
        id: 2,
        category: 'stocks',
        categoryName: '증시/투자',
        title: '반도체 섹터 신고가 경신, AI 수요가 끌어올린 실적',
        summary: [
            { 
                text: '엔비디아 실적 발표 후 관련 반도체주 동반 상승', 
                detail: '엔비디아가 데이터센터 부문에서 압도적인 실적을 기록하며 AI 하드웨어 시장의 건재함을 과시했습니다. 이에 따라 TSMC, SK하이닉스 등 밸류체인 전반의 주가가 재평가받고 있습니다.',
                url: 'https://www.hankyung.com/search?query=엔비디아+실적' 
            },
            { 
                text: 'HBM(고대역폭메모리) 공급 부족 현상 지속', 
                detail: 'AI 서버용 메모리인 HBM3E의 수요가 폭발적으로 증가하면서 내년도 물량까지 선주문이 마감되는 등 공급자 우위 시장이 형성되고 있습니다.',
                url: 'https://www.mk.co.kr/search?word=HBM+공급' 
            },
            { 
                text: '국내 소부장 기업들로 낙수효과 확산 중', 
                detail: '삼성전자와 SK하이닉스의 설비 투자 확대 계획에 따라 세정, 식각, 검사 장비를 공급하는 국내 중소기업들의 수주 잔고가 가파르게 늘어나고 있습니다.',
                url: 'https://www.hankyung.com/search?query=반도체+소부장' 
            }
        ],
        insight: 'AI는 단순한 테마를 넘어 산업 전반의 효율성을 혁신하는 거대한 패러다임 변화입니다. 현재 반도체 섹터의 상승은 기대감을 넘어 실제 수주와 실적으로 증명되고 있습니다. 투자자들은 이제 막연한 성장성보다는 고대역폭메모리(HBM)나 미세 공정 장비 등 기술적 진입장벽이 높은 핵심 공급망 기업 위주로 포트폴리오를 재편하여 장기적인 이익 성장을 누려야 할 시기입니다.'
    },
    {
        id: 3,
        category: 'realestate',
        categoryName: '부동산',
        title: '서울 아파트 거래량 회복세, 바닥 다지기 들어갔나',
        summary: [
            { 
                text: '강남 3구 위주로 급매물 소진되며 거래 활성화', 
                detail: '잠실, 반포 등 선호 지역의 단지들을 중심으로 급매물이 소진된 후 호가가 소폭 상승하는 양상입니다. 실거주 목적의 갈아타기 수요가 시장을 지탱하고 있습니다.',
                url: 'https://www.mk.co.kr/search?word=서울+아파트+거래량' 
            },
            { 
                text: '대출 규제 완화 기대로 매수 심리 소폭 개선', 
                detail: '특례보금자리론 종료 이후 잠시 위축되었던 매수 심리가 금리 인하 전망과 함께 되살아나고 있습니다. 특히 신생아 특례대출 등 정책 자금 활용이 활발합니다.',
                url: 'https://www.hankyung.com/search?query=부동산+대출+규제' 
            },
            { 
                text: '분양가 상한제 주택 실거주 의무 유예가 변수', 
                detail: '실거주 의무가 3년 유예되면서 자금 여력이 부족했던 수분양자들이 전세를 놓아 잔금을 치를 수 있게 되어 매물 잠김 현상이 일부 해소되었습니다.',
                url: 'https://www.mk.co.kr/search?word=실거주+의무+유예' 
            }
        ],
        insight: '서울 주요 지역의 거래량 증가는 가격 하락 압력이 줄어들고 있다는 긍정적인 신호로 해석될 수 있습니다. 그러나 여전히 높은 금리 수준과 대출 규제가 유지되고 있어, 2021년과 같은 전방위적 폭등보다는 선호 지역과 비선호 지역 간의 가치 양극화가 심화될 가능성이 큽니다. 무리한 영끌 투자보다는 입지 가치가 확실한 곳으로의 선별적 접근이 필요하며, 향후 공급 물량 추이를 살피며 신중히 매수 타이밍을 조절해야 합니다.'
    },
    {
        id: 4,
        category: 'tech',
        categoryName: '테크/산업',
        title: '애플, 자체 AI 모델 개발 선언... 빅테크 경쟁 심화',
        summary: [
            { 
                text: '아이폰 내장형 온디바이스 AI 탑재 계획 발표', 
                detail: '애플은 클라우드 연결 없이 기기 자체에서 구동되는 초경량 AI 모델을 통해 개인정보 보호와 속도라는 두 마리 토끼를 잡겠다는 전략입니다.',
                url: 'https://www.hankyung.com/search?query=애플+AI' 
            },
            { 
                text: '구글, 오픈AI와 차별화된 개인 정보 보호 강조', 
                detail: '구글은 제미나이 모델을 안드로이드 생태계에 깊숙이 통합하면서도, 사용자 데이터를 서버로 보내지 않고 처리하는 보안 기술을 강조하며 애플에 맞불을 놨습니다.',
                url: 'https://www.mk.co.kr/search?word=구글+AI' 
            },
            { 
                text: '스마트폰 시장의 교체 주기 단축 효과 기대', 
                detail: 'AI 기능을 제대로 지원하기 위해서는 고성능 NPU가 탑재된 최신 칩셋이 필수적이기에, 지난 몇 년간 길어졌던 스마트폰 교체 주기가 다시 짧아질 것으로 전망됩니다.',
                url: 'https://www.hankyung.com/search?query=스마트폰+교체주기' 
            }
        ],
        insight: '온디바이스 AI 시장의 개화는 침체되었던 스마트폰 하드웨어 시장에 강력한 교체 수요를 자극할 촉매제입니다. 애플과 구글의 경쟁은 단순한 소프트웨어 대결을 넘어 전용 AI 칩셋 설계 능력과 저전력 구동 기술 등 하드웨어 기술 경쟁으로 확산될 것입니다. 이는 결국 고성능 NPU를 설계하는 팹리스와 이를 제조하는 파운드리, 그리고 고용량 모바일 DRAM 수요를 자극하여 테크 밸류체인 전반의 이익 체력을 한 단계 끌어올리는 결과를 낳을 것입니다.'
    },
    {
        id: 5,
        category: 'macro',
        categoryName: '거시경제',
        title: '엔저 현상 심화, 일본 수출 기업에는 호재 vs 가계엔 부담',
        summary: [
            { 
                text: '달러당 엔화 가치 34년 만에 최저치 경신', 
                detail: '미국과 일본의 금리 차이가 좁혀지지 않으면서 엔화 매도세가 이어지고 있습니다. 이는 일본 증시의 수출 대형주들에게는 엄청난 이익 증가 요인입니다.',
                url: 'https://www.mk.co.kr/search?word=엔저+심화' 
            },
            { 
                text: '일본 은행(BOJ)의 개입 가능성에도 약세 지속', 
                detail: '일본 정부의 구두 개입과 실제 외환 시장 개입 흔적에도 불구하고, 근본적인 금리 차이가 해결되지 않아 엔저 흐름을 되돌리기엔 역부족인 상황입니다.',
                url: 'https://www.hankyung.com/search?query=일본은행+개입' 
            },
            { 
                text: '한국 수출 경합 품목의 가격 경쟁력 약화 우려', 
                detail: '자동차, 기계 등 글로벌 시장에서 일본과 경쟁하는 한국 기업들은 엔저로 인한 일본 제품의 가격 경쟁력 강화에 따른 점유율 하락을 우려하고 있습니다.',
                url: 'https://www.mk.co.kr/search?word=엔저+한국수출' 
            }
        ],
        insight: '역대급 엔저는 글로벌 자산 배분 측면에서 일본 증시의 매력도를 높이는 요소지만, 한국 경제에는 상당한 도전 과제입니다. 특히 자동차와 철강 등 일본과 경합하는 품목에서 수출 채산성 악화나 점유율 하락이 우려되는 상황입니다. 투자자들은 엔화 환노출 상품이나 일본 수출 우량주에 관심을 가짐과 동시에, 원/엔 환율 변동이 국내 주요 수출 기업의 분기 실적에 미칠 부정적 영향을 미리 점검하고 방어적인 포트폴리오 전략을 고민해야 합니다.'
    }
];

const marketBar = document.getElementById('market-bar');
const heroContainer = document.getElementById('hero-section');
const newsGrid = document.getElementById('news-grid');
const categoryButtons = document.querySelectorAll('.nav-item');
const themeToggle = document.getElementById('theme-toggle');
const currentDateElement = document.getElementById('current-date');

// Modal Elements
const modal = document.getElementById('detail-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

const lastUpdatedTime = "2026.04.23 15:30";

// 지수 바 렌더링
function renderMarketBar() {
    const indicesHtml = marketData.map(item => `
        <div class="market-item">
            <span class="market-label">${item.name}</span>
            <span class="market-value">${item.value}</span>
            <span class="market-change ${item.up ? 'up' : 'down'}">${item.change}</span>
        </div>
    `).join('');
    
    marketBar.innerHTML = `
        <div class="market-container" style="display: flex; width: 100%; max-width: 1000px; margin: 0 auto; align-items: center; justify-content: space-between; padding: 0 20px;">
            <div class="market-scroll-area" style="display: flex; gap: 25px; overflow-x: auto; scrollbar-width: none;">
                ${indicesHtml}
            </div>
            <div class="market-timestamp" style="font-size: 11px; color: #bdc3c7; white-space: nowrap; margin-left: 20px;">
                최종 업데이트: ${lastUpdatedTime}
            </div>
        </div>
    `;
}

// 날짜 업데이트
function updateDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    currentDateElement.textContent = now.toLocaleDateString('ko-KR', options);
}

// 모달 열기
function openDetailModal(newsId, summaryIndex) {
    const news = newsData.find(n => n.id === newsId);
    if (!news) return;
    
    const summary = news.summary[summaryIndex];
    if (!summary) return;

    modalBody.innerHTML = `
        <h2 class="modal-title">${summary.text}</h2>
        <div class="modal-detail-text">
            ${summary.detail}
        </div>
        <div style="margin-top: 20px; font-size: 14px; color: #666;">
            * 이 내용은 TJ Economy Insight가 정리한 핵심 요약입니다.
        </div>
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

// 모달 닫기
closeModal.onclick = function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
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
                        ${heroNews.summary.map((s, idx) => `
                            <li>
                                <button onclick="window.openDetailModal(${heroNews.id}, ${idx})">${s.text}</button>
                            </li>
                        `).join('')}
                    </ul>
                    <div class="insight-box">
                        <span class="insight-label">Insight</span>
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
                ${item.summary.map((s, idx) => `
                    <li>
                        <button onclick="window.openDetailModal(${item.id}, ${idx})">${s.text}</button>
                    </li>
                `).join('')}
            </ul>
            <div class="insight-box">
                <span class="insight-label">Insight</span>
                <p>${item.insight}</p>
            </div>
        </article>
    `).join('');
}

// 전역 함수로 등록 (onclick 호출용)
window.openDetailModal = openDetailModal;

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
