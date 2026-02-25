document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       DOM ELEMENTS
    ============================ */

    const viewer = document.getElementById("storyViewer");
    const storyImage = document.getElementById("storyImage");
    const storyText = document.getElementById("storyText");
    const nextBtn = document.getElementById("nextScene");
    const countdownEl = document.getElementById("countdownTimer");

    if (!viewer || !storyImage || !storyText || !nextBtn || !countdownEl) {
        console.error("Required HTML elements missing.");
        return;
    }

    /* ============================
       STATE
    ============================ */

    let currentScene = 0;
    let timerInterval = null;
    let timeLeft = 60;
    let storyActive = false;

    /* ============================
       STORY DATA
    ============================ */

    const officeScenes = [
        {
            image: "image.1.jpeg",
            text: "It’s your first week as an intern. You were scolded today. Then… a new email appears."
        },
        {
            image: "image.2.jpeg",
            text: "Subject: Urgent Payroll Update Required. The sender looks slightly off. Deadline tomorrow 8 AM. It asks for personal details.",
            choices: ["Ask your senior", "Fill the form"]
        },
        {
            image: "image.3.jpeg",
            text: "You ask your senior. They respond sharply. Maybe you overthought it."
        },
        {
            image: "image.4.jpeg",
            text: "It’s 10 PM. You’re exhausted. Another urgent email appears asking for sensitive company information.",
            choices: ["Ignore the mail", "Just fill it"]
        },
        {
            image: "image.5.jpeg",
            text: "Next morning IT confirms data was leaked. It traces back to your submission."
        }
    ];

    /* ============================
       START STORY
    ============================ */

    function startOfficeStory() {

        if (storyActive) return;

        storyActive = true;
        currentScene = 0;
        timeLeft = 60;

        viewer.classList.remove("hidden");
        countdownEl.classList.remove("hidden");

        updateTimer();
        startTimer();
        renderScene();
    }

    /* ============================
       TIMER
    ============================ */

    function startTimer() {

        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimer();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert("Oops, time over.");
                redirectToGuide();
            }

        }, 1000);
    }

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownEl.textContent =
            `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    /* ============================
       SCENE RENDERING
    ============================ */

    function renderScene() {

        const scene = officeScenes[currentScene];
        if (!scene) return;

        storyImage.src = scene.image;
        storyText.textContent = scene.text;

        removeChoices();

        if (scene.choices) {
            nextBtn.classList.add("hidden");
            createChoices(scene.choices);
        } else {
            nextBtn.classList.remove("hidden");
        }
    }

    /* ============================
       CHOICES
    ============================ */

    function createChoices(options) {

        const container = document.createElement("div");
        container.className = "choice-container";

        options.forEach(option => {
            const btn = document.createElement("button");
            btn.className = "choice-btn";
            btn.textContent = option;

            btn.addEventListener("click", () => {
                handleChoice(option);
            });

            container.appendChild(btn);
        });

        storyText.parentElement.appendChild(container);
    }

    function removeChoices() {
        const old = document.querySelector(".choice-container");
        if (old) old.remove();
    }

    function handleChoice(choice) {

        // Scene 2 decision
        if (currentScene === 1) {
            currentScene = (choice === "Ask your senior") ? 2 : 3;
            renderScene();
            return;
        }

        // Scene 4 decision
        if (currentScene === 3) {

            if (choice === "Ignore the mail") {
                redirectToGuide();
                return;
            }

            if (choice === "Just fill it") {
                currentScene = 4;
                renderScene();
                return;
            }
        }
    }

    /* ============================
       NEXT BUTTON
    ============================ */

    nextBtn.addEventListener("click", () => {

        if (!storyActive) return;

        // After Scene 3 (scolding)
        if (currentScene === 2) {
            currentScene = 3;
            renderScene();
            return;
        }

        // If final scene
        if (currentScene === officeScenes.length - 1) {
            redirectToGuide();
            return;
        }

        currentScene++;
        renderScene();
    });

    /* ============================
       REDIRECT + RESET
    ============================ */

    function redirectToGuide() {
        stopTimer();
        window.location.href = "phishing-guide.html";
    }

    /* ============================
       CARD CLICK BINDING
    ============================ */

    document.querySelectorAll(".story-card").forEach(card => {
        card.addEventListener("click", function () {
            const type = this.getAttribute("data-story");
            if (type === "office") {
                startOfficeStory();
            }
        });
    });

});