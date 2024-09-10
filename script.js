let currentScenario = 0;
let score = 0;
let lives = 3;
let timeLeft = 30;
let hintsLeft = 3;
let level = 1;
let progress = 0;
let multiplier = 1;
let correctStreak = 0;
let timer;

// Additional scenarios to make the game more interesting

const scenarios = [
    {
        description: "You are a citizen participating in a peaceful protest. The government has imposed restrictions on gatherings. What is your best course of action?",
        choices: [
            { text: "Challenge the restriction under Article 19 - Right to Freedom of Speech", valid: true, hint: "The Constitution guarantees freedom of speech and peaceful assembly." },
            { text: "Ignore the restriction and continue the protest", valid: false, hint: "Consider the consequences of breaking the law." },
            { text: "Stop protesting and accept the restrictions", valid: false, hint: "Think about your constitutional rights." }
        ],
        resultValid: "Correct! Article 19 guarantees the Right to Freedom of Speech and peaceful assembly, which can be challenged in court.",
        resultInvalid: "Incorrect! You should challenge the restriction under Article 19, not ignore it or accept it without contest."
    },
    {
        description: "As a government officer, you are asked to ban a religious procession due to potential violence. What is the constitutionally correct approach?",
        choices: [
            { text: "Ban the procession to maintain public order", valid: false, hint: "Consider the constitutional right to freedom of religion." },
            { text: "Allow the procession but ensure security measures are in place", valid: true, hint: "The Constitution protects religious practices under Article 25." },
            { text: "Consult local authorities for their opinion", valid: false, hint: "Decisions about constitutional rights should prioritize legal frameworks." }
        ],
        resultValid: "Correct! Article 25 protects religious freedom, so allowing the procession with proper security is the best course of action.",
        resultInvalid: "Incorrect! Banning the procession outright would violate religious freedom unless absolutely necessary."
    },
    {
        description: "You are a journalist, and the government is trying to censor an article you wrote. What should you do?",
        choices: [
            { text: "Challenge the censorship under Article 19 - Right to Freedom of Speech", valid: true, hint: "The Constitution protects freedom of speech and press." },
            { text: "Withdraw the article to avoid legal consequences", valid: false, hint: "Think about your rights as a journalist." },
            { text: "Ask the government for permission to modify the article", valid: false, hint: "Freedom of the press does not depend on government approval." }
        ],
        resultValid: "Correct! Article 19 protects your Right to Freedom of Speech, so you can challenge the censorship in court.",
        resultInvalid: "Incorrect! You have the right to challenge censorship under Article 19."
    },
    {
        description: "The government has passed a law that discriminates against a minority community. What is your best legal course of action as a citizen?",
        choices: [
            { text: "Challenge the law under Article 14 - Right to Equality", valid: true, hint: "The Constitution guarantees equality before the law." },
            { text: "Request a public debate on the issue", valid: false, hint: "While debate is important, legal action may be necessary to challenge discriminatory laws." },
            { text: "Protest against the law without taking legal action", valid: false, hint: "Protests may not be enough if the law itself is unconstitutional." }
        ],
        resultValid: "Correct! Article 14 guarantees equality before the law, so you should challenge the law in court.",
        resultInvalid: "Incorrect! Challenging the law under Article 14 is the best way to protect equality."
    },
    {
        description: "Your child has been denied admission to a government school despite meeting all the criteria. What is the correct course of action?",
        choices: [
            { text: "Challenge the denial under Article 21A - Right to Education", valid: true, hint: "The Constitution guarantees free and compulsory education for children." },
            { text: "Seek admission in a private school", valid: false, hint: "Consider your child's right to education in a government institution." },
            { text: "Accept the decision and apply to a different school", valid: false, hint: "Think about your constitutional right to challenge the denial." }
        ],
        resultValid: "Correct! Article 21A guarantees the Right to Education, so you should challenge the denial of admission.",
        resultInvalid: "Incorrect! You should challenge the denial under Article 21A, which ensures the Right to Education."
    },
    {
        description: "You are a candidate for an election, and someone has falsely accused you of criminal activity to disqualify you. What should you do?",
        choices: [
            { text: "Challenge the disqualification under Article 102", valid: true, hint: "The Constitution lays out the rules for disqualification of candidates." },
            { text: "Withdraw from the election to avoid conflict", valid: false, hint: "You have the right to challenge false disqualifications." },
            { text: "Ignore the accusations and continue campaigning", valid: false, hint: "It’s important to challenge any constitutional violations." }
        ],
        resultValid: "Correct! Article 102 allows you to challenge the disqualification based on false accusations.",
        resultInvalid: "Incorrect! The correct action is to challenge the disqualification under Article 102."
    },
    {
        description: "You witness a factory polluting a local river, and the authorities have not taken action. What is your best course of action?",
        choices: [
            { text: "File a Public Interest Litigation (PIL) under Article 48A for environmental protection", valid: true, hint: "The Constitution encourages citizens to protect the environment." },
            { text: "Report the issue to the local government and wait for their response", valid: false, hint: "Consider a more direct legal course of action." },
            { text: "Organize a public protest against the factory", valid: false, hint: "Protests may raise awareness, but legal action could directly address the issue." }
        ],
        resultValid: "Correct! Filing a PIL under Article 48A is the most effective way to address environmental issues through the courts.",
        resultInvalid: "Incorrect! A PIL under Article 48A is the best course of action for environmental protection."
    },
    {
        description: "You have been unlawfully detained by the police without a court order. What should you do?",
        choices: [
            { text: "File a habeas corpus petition under Article 32", valid: true, hint: "Habeas corpus is a legal recourse for unlawful detention." },
            { text: "Request the police to release you", valid: false, hint: "Think about legal protections against unlawful detention." },
            { text: "Wait for the police to justify the detention", valid: false, hint: "Your right to personal liberty is guaranteed by the Constitution." }
        ],
        resultValid: "Correct! Filing a habeas corpus petition under Article 32 is the best way to challenge unlawful detention.",
        resultInvalid: "Incorrect! A habeas corpus petition is the right course of action to challenge unlawful detention."
    },
    {
        description: "You are a government employee, and the government has asked you to implement a policy that appears to violate fundamental rights. What should you do?",
        choices: [
            { text: "Challenge the policy in court under Article 32", valid: true, hint: "Article 32 allows you to challenge violations of fundamental rights." },
            { text: "Implement the policy as instructed", valid: false, hint: "Think about the Constitution’s role in protecting fundamental rights." },
            { text: "Consult with other government officials", valid: false, hint: "Legal action is needed when constitutional rights are at stake." }
        ],
        resultValid: "Correct! Challenging the policy under Article 32 is the best course of action to protect fundamental rights.",
        resultInvalid: "Incorrect! You should challenge the policy in court under Article 32."
    }
];


// Don't forget to replace the existing array of scenarios with this expanded array in your game code!


// Function to load the current scenario
function loadScenario() {
    const scenarioBox = document.getElementById('scenario');
    const choicesBox = document.getElementById('choices');
    const resultBox = document.getElementById('result');
    const nextBtn = document.getElementById('nextScenarioBtn');
    const hintBtn = document.getElementById('hintBtn');
    
    // Reset UI elements
    scenarioBox.innerHTML = "";
    choicesBox.innerHTML = "";
    resultBox.innerHTML = "";
    resultBox.className = "result-box";
    nextBtn.style.display = 'none';
    hintBtn.disabled = false;

    // Start the timer
    timeLeft = 30;
    document.getElementById('time').innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(countdown, 1000);

    // Display the current scenario
    scenarioBox.innerHTML = scenarios[currentScenario].description;

    // Create buttons for each choice
    scenarios[currentScenario].choices.forEach((choice, index) => {
        let button = document.createElement("button");
        button.innerText = choice.text;
        button.classList.add('choice-btn');
        button.onclick = () => checkAnswer(choice.valid);
        button.setAttribute('data-hint', choice.hint);
        choicesBox.appendChild(button);
    });
}

// Function to check if the selected answer is correct
function checkAnswer(isValid) {
    const resultBox = document.getElementById('result');
    const nextBtn = document.getElementById('nextScenarioBtn');
    const correctSound = document.getElementById('correctSound');
    const wrongSound = document.getElementById('wrongSound');

    // Stop the timer
    clearInterval(timer);

    // Handle the result
    if (isValid) {
        resultBox.innerHTML = scenarios[currentScenario].resultValid;
        resultBox.classList.add('correct');
        score += 10 * multiplier;
        correctSound.play();
        correctStreak++;
        if (correctStreak >= 3) multiplier++;
    } else {
        resultBox.innerHTML = scenarios[currentScenario].resultInvalid;
        resultBox.classList.add('incorrect');
        wrongSound.play();
        score -= 5;
        lives--;
        document.getElementById('livesCount').innerText = lives;
        if (lives === 0) {
            gameOver();
            return;
        }
        correctStreak = 0;
        multiplier = 1;
    }

    // Update score and show next button
    document.getElementById('scoreValue').innerText = score;
    nextBtn.style.display = 'block';
}

// Countdown timer function
function countdown() {
    timeLeft--;
    document.getElementById('time').innerText = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById('result').innerHTML = "Time's up!";
        document.getElementById('result').classList.add('incorrect');
        document.getElementById('nextScenarioBtn').style.display = 'block';
    }
}

// Function to use a hint
function useHint() {
    if (hintsLeft <= 0) return;
    const choicesBox = document.getElementById('choices');
    const buttons = choicesBox.getElementsByTagName('button');

    // Show the hint for each option
    for (let i = 0; i < buttons.length; i++) {
        let hint = buttons[i].getAttribute('data-hint');
        buttons[i].innerText += ` (Hint: ${hint})`;
    }

    // Deduct points for using a hint
    score -= 5;
    hintsLeft--;
    document.getElementById('hintsLeft').innerText = hintsLeft;
    document.getElementById('scoreValue').innerText = score;

    // Disable the hint button
    document.getElementById('hintBtn').disabled = true;
}

// Function to load the next scenario and progress the game
function nextScenario() {
    currentScenario++;
    progress += 10;
    updateProgressBar();

    // Level up after every 3 scenarios
    if (currentScenario % 3 === 0) {
        level++;
        document.getElementById('currentLevel').innerText = level;
    }

    if (currentScenario < scenarios.length) {
        loadScenario();
    } else {
        endGame();
    }
}

// Update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progress}%`;
}

// End the game
function endGame() {
    document.getElementById('scenario').innerHTML = "Congratulations! You've completed all the scenarios.";
    document.getElementById('choices').innerHTML = "";
    document.getElementById('result').innerHTML = "";
    document.getElementById('nextScenarioBtn').style.display = 'none';
}

// Handle game over
function gameOver() {
    document.getElementById('scenario').innerHTML = "Game Over! You've run out of lives.";
    document.getElementById('choices').innerHTML = "";
    document.getElementById('result').innerHTML = "";
    document.getElementById('nextScenarioBtn').style.display = 'none';
}

// Load the first scenario when the page loads
window.onload = loadScenario;
