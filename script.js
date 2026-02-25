// ================= VIDEO INTRO CONTROL =================

const video = document.getElementById("introVideo");
const heroContent = document.getElementById("heroContent");
const heroSection = document.querySelector(".hero");
const navbar = document.querySelector(".navbar");

// Disable scrolling during video
document.body.style.overflow = "hidden";

video.addEventListener("ended", () => {

    // Lock video on last frame
    video.currentTime = video.duration - 0.05;
    video.pause();

    // Add blur effect
    video.classList.add("video-ended");

    // Slow cinematic zoom
    video.style.transform = "scale(1.08)";

    // Show hero content (slide + fade)
    heroContent.classList.add("show-content");

    // Enable scroll
    document.body.style.overflow = "auto";
});


// ================= PARALLAX EFFECT =================

heroSection.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 60;
    const y = (window.innerHeight / 2 - e.clientY) / 60;

    video.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
});


// ================= NAVBAR SCROLL EFFECT =================

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0,0,0,0.7)";
        navbar.style.backdropFilter = "blur(10px)";
    } else {
        navbar.style.background = "rgba(0,0,0,0.4)";
    }
});


// ================= SMOOTH SCROLL ENHANCEMENT =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
// ================= PHISHING SIMULATION ENGINE =================

const scenarios = [
    {
        title: "Urgent Bank Alert",
        message: "Your account will be suspended within 24 hours. Click here to verify immediately.",
        isPhishing: true,
        explanation: "Urgent language and fear tactics are common phishing signs."
    },
    {
        title: "HR Policy Update",
        message: "Please review the updated employee handbook available on the internal portal.",
        isPhishing: false,
        explanation: "No urgency, internal portal reference, normal tone."
    },
    {
        title: "Instagram Verification",
        message: "Your account violated policies. Verify now to avoid deletion.",
        isPhishing: true,
        explanation: "Threatening tone and generic message are red flags."
    }
];

let currentScenario = 0;
let score = 0;

const titleEl = document.getElementById("scenarioTitle");
const messageEl = document.getElementById("scenarioMessage");
const feedbackBox = document.getElementById("feedbackBox");
const scoreBox = document.getElementById("scoreBox");

const clickBtn = document.getElementById("clickBtn");
const ignoreBtn = document.getElementById("ignoreBtn");

function loadScenario() {
    const scenario = scenarios[currentScenario];
    titleEl.textContent = scenario.title;
    messageEl.textContent = scenario.message;
    feedbackBox.textContent = "";
}

function nextScenario() {
    currentScenario++;

    if (currentScenario < scenarios.length) {
        setTimeout(loadScenario, 1500);
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    titleEl.textContent = "Simulation Complete!";
    messageEl.textContent = "";
    feedbackBox.textContent = "";
    scoreBox.textContent = `Your Awareness Score: ${Math.round((score / scenarios.length) * 100)}%`;
    clickBtn.style.display = "none";
    ignoreBtn.style.display = "none";
}

function handleChoice(userClicked) {
    const scenario = scenarios[currentScenario];

    if (userClicked === scenario.isPhishing) {
        feedbackBox.style.color = "#4ade80";
        feedbackBox.textContent = "✅ Correct! " + scenario.explanation;
        score++;
    } else {
        feedbackBox.style.color = "#f87171";
        feedbackBox.textContent = "⚠️ Incorrect! " + scenario.explanation;
    }

    nextScenario();
}

clickBtn.addEventListener("click", () => handleChoice(true));
ignoreBtn.addEventListener("click", () => handleChoice(false));

// Load first scenario automatically
loadScenario();
// ================= TRIGGER FROM FREE TOOLS CARD =================

const toolCard = document.getElementById("phishingToolCard");
const simulationSection = document.getElementById("simulation");

let simulationStarted = false;

toolCard.addEventListener("click", () => {

    // Smooth scroll to simulation
    simulationSection.scrollIntoView({ behavior: "smooth" });

    // Small delay for smooth scroll before animation
    setTimeout(() => {
        simulationSection.classList.add("show-simulation");

        if (!simulationStarted) {
            loadScenario();
            simulationStarted = true;
        }
    }, 500);
});