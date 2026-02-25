document.getElementById("analyzeBtn").addEventListener("click", function () {

    const emailText = document.getElementById("emailInput").value;
    const link = document.getElementById("linkInput").value;
    const loading = document.getElementById("loadingAnimation");
    const output = document.getElementById("analysisOutput");

    const riskFill = document.getElementById("riskFill");
    const riskLabel = document.getElementById("riskLabel");
    const redFlagsDiv = document.getElementById("redFlags");
    const highlightedText = document.getElementById("highlightedText");

    loading.classList.remove("hidden");
    output.classList.add("hidden");

    setTimeout(() => {

        loading.classList.add("hidden");
        output.classList.remove("hidden");

        let riskScore = 0;
        let flags = [];

        const suspiciousWords = [
            "urgent",
            "verify",
            "suspend",
            "immediately",
            "password",
            "confirm",
            "click here",
            "account locked"
        ];

        let processedText = emailText;

        suspiciousWords.forEach(word => {
            const regex = new RegExp(word, "gi");
            if (regex.test(emailText)) {
                riskScore += 10;
                flags.push(`Suspicious keyword detected: "${word}"`);
                processedText = processedText.replace(regex,
                    `<span class="highlight">${word}</span>`);
            }
        });

        if (link.includes("http://") || link.match(/\d+\.\d+\.\d+\.\d+/)) {
            riskScore += 20;
            flags.push("IP-based or unsecured HTTP link detected.");
        }

        if (riskScore > 60) {
            riskFill.style.background = "#ef4444";
            riskLabel.textContent = "HIGH RISK";
        } else if (riskScore > 30) {
            riskFill.style.background = "#f59e0b";
            riskLabel.textContent = "MEDIUM RISK";
        } else {
            riskFill.style.background = "#10b981";
            riskLabel.textContent = "LOW RISK";
        }

        riskFill.style.width = riskScore + "%";

        redFlagsDiv.innerHTML = flags.length
            ? flags.map(f => `<p>⚠ ${f}</p>`).join("")
            : "<p>No major red flags detected.</p>";

        highlightedText.innerHTML = processedText;

    }, 1500);
});