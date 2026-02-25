// ===== STATIC REALISTIC DATA =====

const phishingData = {
    dailyEmails: 3400000000,
    aiGenerated: 72,
    cloudTargets: 1850000,
    channels: {
        Email: 78,
        SMS: 10,
        Social: 8,
        Voice: 4
    }
};

// ===== ANIMATED COUNTERS =====

function animateValue(id, end, isPercent = false) {
    let start = 0;
    const duration = 1500;
    const stepTime = 20;
    const increment = end / (duration / stepTime);

    const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
            start = end;
            clearInterval(counter);
        }

        document.getElementById(id).innerText =
            isPercent
                ? Math.floor(start) + "%"
                : Math.floor(start).toLocaleString();
    }, stepTime);
}

window.addEventListener("DOMContentLoaded", () => {
    animateValue("emailsCount", phishingData.dailyEmails);
    animateValue("aiPercent", phishingData.aiGenerated, true);
    animateValue("cloudTargets", phishingData.cloudTargets);

    createPieChart();
    generateLiveFeed();
});

// ===== ANIMATED PIE CHART =====

let chartInstance;

function createPieChart() {
    const ctx = document.getElementById("pieChart");

    chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(phishingData.channels),
            datasets: [{
                data: Object.values(phishingData.channels),
                backgroundColor: [
                    "#0071e3",
                    "#34c759",
                    "#ff9500",
                    "#ff3b30"
                ]
            }]
        },
        options: {
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });
}

// ===== EXPORT PNG =====

document.getElementById("exportBtn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "phishing-trends.png";
    link.href = chartInstance.toBase64Image();
    link.click();
});

// ===== LIVE FEED =====

function generateLiveFeed() {
    const feed = document.getElementById("feedContainer");

    const threats = [
        "New banking phishing campaign detected.",
        "AI-generated spear phishing spike reported.",
        "QR phishing campaign targeting retailers.",
        "Fake Microsoft 365 login page detected.",
        "Cloud SaaS credential harvesting surge."
    ];

    setInterval(() => {
        const threat = threats[Math.floor(Math.random() * threats.length)];
        const div = document.createElement("div");
        div.textContent = "⚠ " + threat;
        feed.prepend(div);
    }, 4000);
}