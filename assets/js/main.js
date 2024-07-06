class User {
    constructor(name, coins) {
        this.name = name;
        this.coins = coins;
    }
}

// Sample users for testing
const users = [
    new User("User1", 15000),
    new User("User2", 50000),
    new User("User3", 75000),
    new User("User4", 150000),
    new User("User5", 300000),
    new User("User6", 1100000),
    // Add more users as needed
];

// Define rank thresholds
const rankThresholds = [
    { rank: "Little Dog", minCoins: 0, maxCoins: 20000 },
    { rank: "Puppy of Wall ST", minCoins: 20000, maxCoins: 200000 },
    { rank: "Fire Lord", minCoins: 1000000, maxCoins: Infinity }
];

// Assign ranks and sort users within each rank
const rankedUsers = rankThresholds.map(threshold => ({
    rank: threshold.rank,
    users: users.filter(user => user.coins >= threshold.minCoins && user.coins < threshold.maxCoins)
                .sort((a, b) => b.coins - a.coins)
                .slice(0, 50)
}));

// Function to update the HTML for ranks
function updateRanks() {
    rankedUsers.forEach(rankData => {
        const rankSection = document.getElementById(rankData.rank.toLowerCase().replace(/\s+/g, '-'));
        if (rankSection) {
            const userList = rankSection.querySelector('ul');
            userList.innerHTML = '';
            rankData.users.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = `${user.name} - ${user.coins.toLocaleString()} coins`;
                userList.appendChild(listItem);
            });
        }
    });
}

// Function to copy referral link
function copyReferralLink() {
    const referralLink = `${window.location.origin}${window.location.pathname}?referredBy=sampleUser`; // Simulated referral link
    navigator.clipboard.writeText(referralLink).then(() => {
        alert('Referral link copied to clipboard!');
    });
}

// Simulate receiving a referral
function simulateReferral() {
    const referredBy = new URLSearchParams(window.location.search).get('referredBy');
    if (referredBy) {
        alert(`Referred by: ${referredBy}`);
        // Simulate giving bonus coins for referral
        let coins = localStorage.getItem('coins');
        coins = coins ? parseInt(coins) : 0;
        coins += 5000; // Add bonus coins for referral
        localStorage.setItem('coins', coins);
        document.querySelector('h1').textContent = coins.toLocaleString();
    }
}

// Call the function to update the HTML on page load
document.addEventListener('DOMContentLoaded', () => {
    updateRanks();
    simulateReferral();
    // Add event listener for copying referral link
    const copyButton = document.querySelector('.frens-open-detail button');
    if (copyButton) {
        copyButton.addEventListener('click', copyReferralLink);
    }
});

// Existing functionality for handling coins and power

const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count');

if (coins == null) {
    localStorage.setItem('coins', '0');
    h1.textContent = '0';
} else {
    h1.textContent = Number(coins).toLocaleString();
}

if (total == null) {
    localStorage.setItem('total', '500');
    body.querySelector('#total').textContent = '/500';
} else {
    body.querySelector('#total').textContent = `/${total}`;
}

if (power == null) {
    localStorage.setItem('power', '500');
    body.querySelector('#power').textContent = '500';
} else {
    body.querySelector('#power').textContent = power;
}

if (count == null) {
    localStorage.setItem('count', '1');
}

image.addEventListener('click', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');

    if (Number(power) > 0) {
        localStorage.setItem('coins', `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;

        localStorage.setItem('power', `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;
    }

    if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);

    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});

setInterval(() => {
    count = localStorage.getItem('count');
    power = localStorage.getItem('power');
    total = localStorage.getItem('total');
    if (Number(total) > power) {
        localStorage.setItem('power', `${Number(power) + Number(count)}`);
        body.querySelector('#power').textContent = `${Number(power) + Number(count)}`;
        body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
    }
}, 1000);
