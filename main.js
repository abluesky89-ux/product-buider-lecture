class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');
        const ball = document.createElement('div');
        ball.textContent = number;
        const style = document.createElement('style');
        style.textContent = `
            div {
                width: 60px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                background-color: ${this.getColor(number)};
                color: white;
                font-size: 24px;
                font-weight: bold;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s ease;
            }
            div:hover {
                transform: scale(1.1);
            }
        `;
        shadow.appendChild(style);
        shadow.appendChild(ball);
    }

    getColor(number) {
        const num = parseInt(number);
        if (num <= 10) return '#f39c12'; // 주황색
        if (num <= 20) return '#3498db'; // 파란색
        if (num <= 30) return '#e74c3c'; // 빨간색
        if (num <= 40) return '#9b59b6'; // 보라색
        return '#2ecc71'; // 녹색
    }
}

customElements.define('lotto-ball', LottoBall);

const lottoNumbersContainer = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');

// 테마 토글 로직
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

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
    lottoNumbersContainer.innerHTML = '';
    for (const number of numbers) {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoBall);
    }
}

generateBtn.addEventListener('click', () => {
    const newNumbers = generateNumbers();
    displayNumbers(newNumbers);
});

// 초기 번호 생성
displayNumbers(generateNumbers());
