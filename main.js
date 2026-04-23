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
        insight: '쉽게 말해, 은행 이자가 내려갈 것 같다는 기대감 때문에 사람들이 주식 시장으로 모이고 있어요. 이자가 낮아지면 기업들이 돈을 빌려 사업하기 좋아지기 때문이죠. 하지만 나라 경제가 너무 안 좋아서 금리를 내리는 것이라면 오히려 주가가 떨어질 수도 있으니, 사람들이 일자리를 잘 유지하고 있는지(고용 지표)를 함께 지켜봐야 합니다.',
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
        insight: '인공지능(AI) 열풍이 불면서 똑똑한 기계를 만드는 데 꼭 필요한 "반도체"가 엄청나게 팔리고 있어요. 단순히 기대감이 아니라 실제로 돈을 많이 벌고 있다는 게 확인되고 있죠. 앞으로는 반도체를 만드는 큰 회사뿐만 아니라, 그 회사에 부품이나 장비를 대주는 작은 회사들의 성적표도 꼼꼼히 챙겨보는 것이 중요합니다.'
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
        insight: '집을 사려는 사람들이 조금씩 늘어나고 있지만, 예전처럼 모든 동네의 집값이 다 오르는 시기는 아니에요. 사람들이 정말 살고 싶어 하는 인기 지역 위주로만 거래가 되고 있죠. 대출 이자가 여전히 부담스럽기 때문에, 무리하게 빚을 내서 집을 사기보다는 정부에서 지원해 주는 저금리 대출 상품을 활용할 수 있는지 먼저 따져보는 게 좋습니다.'
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
        insight: '이제 내 스마트폰 안에 똑똑한 비서(AI)가 직접 들어오는 시대가 열리고 있어요. 예전에는 인터넷이 연결되어야만 AI를 쓸 수 있었다면, 앞으로는 인터넷 없이도 폰 자체가 스스로 생각하게 되는 거죠. 이 기능을 쓰려면 성능 좋은 최신 폰이 필요하기 때문에, 정체되었던 스마트폰 판매량이 다시 늘어날 수 있고 관련 부품 회사들도 바빠질 것으로 보여요.'
    }
];

const termData = [
    {
        id: 1,
        term: '금리 (Interest Rate)',
        definition: '남에게 돈을 빌린 대가로 치르는 이자의 비율이에요.',
        easyExplainer: '쉽게 생각하면 **"돈의 가격"**이에요. 금리가 높으면 돈을 빌리는 값이 비싸지는 거고, 금리가 낮으면 돈을 빌리는 값이 싸지는 거예요. 금리가 낮아지면 사람들이 돈을 빌려 쇼핑도 하고 사업도 하기 좋아져서 경제가 북적북적해진답니다.',
        example: '은행에 예금을 할 때 받는 이자나, 집을 살 때 빌린 돈에 대해 내는 이자가 모두 금리에 따라 결정돼요.'
    },
    {
        id: 2,
        term: '인플레이션 (Inflation)',
        definition: '물가가 계속해서 오르고, 내가 가진 돈의 가치는 떨어지는 현상이에요.',
        easyExplainer: '작년에는 1,000원으로 과자 한 봉지를 살 수 있었는데, 올해는 과자 값이 올라서 2,000원을 줘야 한다면? 이게 바로 인플레이션이에요. 물건값은 오르고, 내 지갑 속 1,000원의 힘은 약해진 상황인 거죠.',
        example: '짜장면 가격이 옛날에는 500원이었는데 지금은 7,000원인 것도 인플레이션의 한 예예요.'
    },
    {
        id: 3,
        term: '공매도 (Short Selling)',
        definition: '주식이 없는 상태에서 주식을 빌려 팔고, 나중에 가격이 떨어지면 사서 갚는 방식이에요.',
        easyExplainer: '주가가 **내려갈 것 같을 때** 돈을 버는 방법이에요. 예를 들어, 1만원짜리 주식을 빌려서 일단 팔아요(내 손엔 1만원이 생기죠). 나중에 주가가 7천원으로 떨어지면, 그때 주식을 사서 원래 주인에게 갚아요. 그럼 나는 가만히 앉아서 3천원을 벌게 되는 구조랍니다.',
        example: '주가 거품을 빼는 역할도 하지만, 주가를 억지로 떨어뜨린다는 비판을 받기도 해요.'
    },
    {
        id: 4,
        term: 'GDP (국내총생산)',
        definition: '한 나라 안에서 일정 기간 동안 만들어낸 물건과 서비스의 총 가치예요.',
        easyExplainer: '우리나라라는 커다란 공장에서 일 년 동안 얼마나 많은 가치를 만들어냈는지 보여주는 **"나라의 성적표"**라고 보면 돼요. GDP가 작년보다 늘어났다면 우리 나라 경제가 쑥쑥 성장하고 있다는 뜻이에요.',
        example: '삼성이 만든 반도체, 동네 미용실의 파마 서비스 등이 모두 GDP에 포함돼요.'
    }
];

const marketBar = document.getElementById('market-bar');
const heroContainer = document.getElementById('hero-section');
const newsGrid = document.getElementById('news-grid');
const categoryButtons = document.querySelectorAll('.nav-item');
const themeToggle = document.getElementById('theme-toggle');
const currentDateElement = document.getElementById('current-date');

const modal = document.getElementById('detail-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

const lastUpdatedTime = "2026.04.23 15:30";

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

function updateDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    currentDateElement.textContent = now.toLocaleDateString('ko-KR', options);
}

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
    document.body.style.overflow = 'hidden';
}

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

function renderNews(filter = 'all') {
    if (filter === 'terms') {
        renderTerms();
        return;
    }

    const filteredNews = filter === 'all' ? newsData : newsData.filter(item => item.category === filter);
    
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
                        <span class="insight-label">💡 이해하기 쉬운 핵심 포인트</span>
                        <p>${heroNews.insight}</p>
                    </div>
                </div>
            </div>
        `;
        heroContainer.style.display = 'block';
    } else {
        heroContainer.style.display = 'none';
    }

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
                <span class="insight-label">💡 이해하기 쉬운 핵심 포인트</span>
                <p>${item.insight}</p>
            </div>
        </article>
    `).join('');
}

function renderTerms() {
    heroContainer.style.display = 'none';
    newsGrid.innerHTML = termData.map(item => `
        <article class="news-card term-card">
            <span class="category-tag" style="background: #e67e22; color: white;">오늘의 용어</span>
            <h3 class="news-title">${item.term}</h3>
            <p class="term-definition" style="font-weight: 600; color: #2c3e50; margin-bottom: 12px; font-size: 15px;">
                ${item.definition}
            </p>
            <div class="insight-box" style="background: #fdf2e9; border-left-color: #e67e22;">
                <span class="insight-label" style="color: #d35400;">💬 더 쉬운 설명</span>
                <p style="color: #5d4037;">${item.easyExplainer}</p>
            </div>
            <div style="margin-top: 15px; font-size: 13px; color: #7f8c8d; font-style: italic;">
                예시: ${item.example}
            </div>
        </article>
    `).join('');
}

window.openDetailModal = openDetailModal;

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderNews(button.dataset.category);
    });
});

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

const apartmentData = [
    { 
        name: '자양호반써밋 (광진구 자양동)', 
        area: '공급 56㎡ (17평)', 
        price: '12억 9,000', 
        prevPrice: '11억 5,000',
        change: '+1억 4,000 (12.1%)',
        pyeongPrice: '7,588만',
        date: '2026.04.06' 
    },
    { 
        name: '삼선푸르지오 (성북구 삼선동)', 
        area: '공급 82㎡ (25평)', 
        price: '9억 5,000', 
        prevPrice: '8억 7,000',
        change: '+8,000 (9.2%)',
        pyeongPrice: '3,800만',
        date: '2026.04.12' 
    },
    { 
        name: '헬리오시티 (송파구 가락동)', 
        area: '공급 61㎡ (18평)', 
        price: '11억 2,000', 
        prevPrice: '10억 1,000',
        change: '+1억 1,000 (10.9%)',
        pyeongPrice: '6,222만',
        date: '2026.04.15' 
    },
    { 
        name: '관악드림타운 (관악구 봉천동)', 
        area: '공급 114㎡ (34평)', 
        price: '10억 8,000', 
        prevPrice: '9억 9,000',
        change: '+9,000 (9.1%)',
        pyeongPrice: '3,176만',
        date: '2026.04.18' 
    },
    { 
        name: '상계주공7단지 (노원구 상계동)', 
        area: '공급 61㎡ (18평)', 
        price: '7억 4,000', 
        prevPrice: '6억 8,000',
        change: '+6,000 (8.8%)',
        pyeongPrice: '4,111만',
        date: '2026.04.20' 
    }
];

const apartmentListContainer = document.getElementById('apartment-list');

function renderApartmentList() {
    if (!apartmentListContainer) return;
    
    apartmentListContainer.innerHTML = apartmentData.map(item => `
        <div class="apartment-item">
            <div class="apt-main-info">
                <span class="apt-name">${item.name}</span>
                <span class="apt-area">${item.area}</span>
            </div>
            <div class="apt-price-info">
                <div class="current-price">
                    <span class="label">신고가</span>
                    <span class="value">${item.price}</span>
                </div>
                <div class="prev-price">
                    <span class="label">직전가</span>
                    <span class="value">${item.prevPrice}</span>
                </div>
            </div>
            <div class="apt-change-info">
                <span class="price-change">${item.change}</span>
                <span class="pyeong-price">공급평당 ${item.pyeongPrice}</span>
            </div>
            <span class="apt-date">${item.date}</span>
        </div>
    `).join('');
}

renderMarketBar();
updateDate();
renderNews();
renderApartmentList();
