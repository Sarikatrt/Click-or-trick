document.addEventListener("DOMContentLoaded", function () {

    const scenarios = [
        {
            from: "security@yourbank-alert.com",
            subject: "Urgent: Account Suspension Notice",
            message: "Your account will be suspended within 24 hours. Verify immediately.",
            link: "http://192.168.0.22/login",
            isPhishing: true
        },
        {
            from: "hr@company.com",
            subject: "Updated Employee Handbook",
            message: "Please review the updated handbook on internal portal.",
            link: "https://company.com/internal",
            isPhishing: false
        },
        {
            from: "support@instagram-verification.net",
            subject: "Account Violation Warning",
            message: "Verify now to prevent deletion.",
            link: "http://verify-account-now.net",
            isPhishing: true
        }
    ];

    let currentScenario = 0;
    let score = 0;
    let timerInterval;
    let timeLeft = 15;

    const timerEl = document.getElementById("timer");
    const fromEl = document.getElementById("emailFrom");
    const subjectEl = document.getElementById("emailSubject");
    const messageEl = document.getElementById("emailMessage");
    const linkEl = document.getElementById("emailLink");
    const feedbackBox = document.getElementById("feedbackBox");

    const inboxView = document.getElementById("inboxView");
    const emailView = document.getElementById("emailView");
    const inboxList = document.getElementById("inboxList");
    const finalScore = document.getElementById("finalScore");

    const clickBtn = document.getElementById("clickBtn");
    const ignoreBtn = document.getElementById("ignoreBtn");

    function startTimer() {
        timeLeft = 15;
        timerEl.textContent = timeLeft;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleChoice(false); // auto mark as safe if timeout
            }
        }, 1000);
    }

    function loadScenario() {
        const scenario = scenarios[currentScenario];

        fromEl.textContent = scenario.from;
        subjectEl.textContent = scenario.subject;
        messageEl.textContent = scenario.message;
        linkEl.textContent = scenario.link;
        linkEl.setAttribute("data-real-link", scenario.link);

        feedbackBox.textContent = "";
        startTimer();
    }

    function handleChoice(userThinksPhishing) {
        clearInterval(timerInterval);

        const scenario = scenarios[currentScenario];
        const correct = (userThinksPhishing === scenario.isPhishing);

        if (correct) score++;

        inboxList.innerHTML += `
            <div class="${correct ? 'correct-mail' : 'incorrect-mail'}">
                ${scenario.subject} - ${correct ? "Correct" : "Incorrect"}
            </div>
        `;

        currentScenario++;

        if (currentScenario < scenarios.length) {
            setTimeout(loadScenario, 1000);
        } else {
            showInboxView();
        }
    }

    function showInboxView() {
        emailView.style.display = "none";
        inboxView.style.display = "block";

        finalScore.innerHTML =
            "<h3>Your Awareness Score: " +
            Math.round((score / scenarios.length) * 100) +
            "%</h3>";
    }

    clickBtn.addEventListener("click", () => handleChoice(true));
    ignoreBtn.addEventListener("click", () => handleChoice(false));

    loadScenario();
});