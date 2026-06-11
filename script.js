tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "on-primary-fixed-variant": "#574500",
                "inverse-on-surface": "#303032",
                "on-tertiary-fixed": "#1b1b1d",
                "on-tertiary-fixed-variant": "#474649",
                "inverse-surface": "#e5e1e4",
                "surface-variant": "#353437",
                "surface-container-low": "#1b1b1d",
                "inverse-primary": "#735c00",
                "secondary-container": "#755e00",
                "on-primary-fixed": "#241a00",
                "on-secondary": "#3c2f00",
                "surface": "#131315",
                "surface-bright": "#39393b",
                "secondary-fixed": "#ffe083",
                "outline": "#99907c",
                "primary-fixed-dim": "#e9c349",
                "tertiary-container": "#b4b2b4",
                "on-error-container": "#ffdad6",
                "surface-container": "#201f21",
                "error-container": "#93000a",
                "surface-container-highest": "#353437",
                "background": "#131315",
                "error": "#ffb4ab",
                "primary-fixed": "#ffe088",
                "on-secondary-fixed-variant": "#564500",
                "on-secondary-container": "#fada77",
                "primary": "#f2ca50",
                "surface-tint": "#e9c349",
                "tertiary": "#d0cdd0",
                "tertiary-fixed-dim": "#c8c6c8",
                "surface-container-lowest": "#0e0e10",
                "primary-container": "#d4af37",
                "on-primary-container": "#554300",
                "on-tertiary": "#303032",
                "on-primary": "#3c2f00",
                "on-error": "#690005",
                "on-background": "#e5e1e4",
                "on-surface-variant": "#d0c5af",
                "surface-container-high": "#2a2a2c",
                "on-secondary-fixed": "#231b00",
                "secondary-fixed-dim": "#e3c464",
                "outline-variant": "#4d4635",
                "on-surface": "#e5e1e4",
                "on-tertiary-container": "#454547",
                "secondary": "#e3c464",
                "tertiary-fixed": "#e4e2e4",
                "surface-dim": "#131315"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            "spacing": {
                "margin-desktop": "64px",
                "gutter": "24px",
                "base": "8px",
                "container-max": "1280px",
                "margin-mobile": "20px"
            },
            "fontFamily": {
                "headline-lg": ["Plus Jakarta Sans"],
                "body-md": ["Hanken Grotesk"],
                "headline-lg-mobile": ["Plus Jakarta Sans"],
                "headline-md": ["Plus Jakarta Sans"],
                "display-lg": ["Plus Jakarta Sans"],
                "body-lg": ["Hanken Grotesk"],
                "label-md": ["Hanken Grotesk"],
                "label-sm": ["Hanken Grotesk"]
            },
            "fontSize": {
                "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "500"}]
            }
        },
    },
}// DOM Element Selectors
const input = document.getElementById('food-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('food-list');
const rollBtn = document.getElementById('roll-btn');
const overlay = document.getElementById('result-overlay');
const winnerName = document.getElementById('winner-name');

// App State Memory
let foodItems = [];

/**
 * Syncs the application state array with the dynamic HTML list UI layout.
 */
function renderList() {
    list.innerHTML = '';
    foodItems.forEach((item, index) => {
        const chip = document.createElement('div');
        chip.className = 'flex items-center gap-2 bg-[#2C2C2E] text-secondary border border-outline-variant/30 px-4 py-2 rounded-full font-label-md animate-in fade-in slide-in-from-bottom-2 duration-300';
        chip.innerHTML = `
            <span>${item}</span>
            <button onclick="removeItem(${index})" class="hover:text-primary transition-colors">
                <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
        `;
        list.appendChild(chip);
    });
    // Allow rolling as soon as the user has suggested one food
    rollBtn.disabled = foodItems.length === 0;
}

/**
 * Captures clean user string value and saves it into memory stack.
 */
function addItem() {
    const val = input.value.trim();
    const alreadyExists = foodItems.some(item => item.toLowerCase() === val.toLowerCase());
    if (val && !alreadyExists) {
        foodItems.push(val);
        input.value = '';
        renderList();
    }
}

/**
 * Removes individual unique targeted indices on chip user click action.
 * @param {number} index - Index targeted inside food items list array.
 */
function removeItem(index) {
    foodItems.splice(index, 1);
    renderList();
}

/**
 * Generates a pseudo-random number using multiple chaotic methods
 */
function getChaosValue() {
    const now = Date.now();
    const timeHash = (now * 7919) % 1000;
    const mouseData = Math.sin(performance.now()) * 10000;
    const randomSeed = Math.random() * Math.random() * Math.random();
    return (timeHash + mouseData + randomSeed) % 1;
}

/**
 * Multiple unpredictable selection algorithms
 */
function selectWinner() {
    const methods = [
        // Method 1: Chaotic weighted distribution
        () => {
            const weights = foodItems.map(() => Math.random() ** Math.random());
            const sum = weights.reduce((a, b) => a + b, 0);
            let rand = Math.random() * sum;
            for (let i = 0; i < weights.length; i++) {
                rand -= weights[i];
                if (rand <= 0) return i;
            }
            return foodItems.length - 1;
        },
        
        // Method 2: Time-based chaos algorithm
        () => {
            const now = Date.now();
            const bits = (now ^ (now << 13) ^ (now << 21)) % foodItems.length;
            return Math.abs(bits);
        },
        
        // Method 3: Fibonacci chaos sequence
        () => {
            let a = 1, b = 1;
            for (let i = 0; i < Math.floor(Math.random() * 50) + 10; i++) {
                [a, b] = [b, (a + b) % 1000000];
            }
            return b % foodItems.length;
        },
        
        // Method 4: Double randomization with noise
        () => {
            const r1 = Math.random();
            const r2 = Math.random();
            const combined = (r1 * r2 + r1 - r2) % 1;
            return Math.floor(combined * foodItems.length);
        },
        
        // Method 5: Performance-based randomness
        () => {
            const perf = (performance.now() * 0.001) % 1;
            const chaos = Math.sin(perf * Math.PI * 100);
            return Math.abs(Math.floor(chaos * foodItems.length)) % foodItems.length;
        },
        
        // Method 6: XOR-based selection
        () => {
            const now = Date.now();
            let result = 0;
            for (let i = 0; i < foodItems.length; i++) {
                result ^= (now + Math.random() * 1000) >>> i;
            }
            return Math.abs(result) % foodItems.length;
        },
        
        // Method 7: Probability matrix chaos
        () => {
            const matrix = Array.from({length: foodItems.length}, () => Math.random());
            const maxIdx = matrix.reduce((maxI, val, i, arr) => val > arr[maxI] ? i : maxI, 0);
            return (maxIdx + Math.floor(Math.random() * 3)) % foodItems.length;
        }
    ];
    
    // Pick a random algorithm randomly
    const selectedMethod = methods[Math.floor(Math.random() * methods.length)];
    return foodItems[selectedMethod()];
}

/**
 * Triggers decision algorithm animation and unveils structural winner modal display view.
 */
function rollTheDice() {
    if (foodItems.length === 0) return;
    
    rollBtn.classList.add('animate-roll');
    rollBtn.innerText = "Consulting the chaos...";
    
    // Multiple random delays for additional unpredictability
    const delayVariance = Math.random() * 1500 + 800;
    
    setTimeout(() => {
        const winner = selectWinner();
        winnerName.innerText = winner.toUpperCase();
        
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.replace('opacity-0', 'opacity-100'), 10);
        
        rollBtn.classList.remove('animate-roll');
        rollBtn.innerText = "Roll the Dice";
    }, delayVariance);
}

/**
 * Handles smooth transition reset state workflow to dissolve overlay views safely.
 */
function closeResult() {
    overlay.classList.replace('opacity-100', 'opacity-0');
    setTimeout(() => overlay.classList.add('hidden'), 300);
}

// Global Event Declarations Engine Configuration setup
addBtn.addEventListener('click', addItem);
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addItem(); });
rollBtn.addEventListener('click', rollTheDice);

// Interactive Light Leak mouse tracking mapping system
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});

// Initializing Initial Data Paint Render Call
renderList();