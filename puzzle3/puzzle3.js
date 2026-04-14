document.addEventListener('DOMContentLoaded', () => {
    const MODE_CONFIG = {
        easy: {
            label: 'Age 5-6',
            maxHints: 3,
            maxAttempts: 3,
            minLength: 5,
            maxLength: 6,
            allowedTypes: ['arithmetic'],
            maxValue: 60
        },
        medium: {
            label: 'Age 7-8',
            maxHints: 3,
            maxAttempts: 3,
            minLength: 5,
            maxLength: 7,
            allowedTypes: ['arithmetic', 'alternating', 'geometric'],
            maxValue: 120
        },
        hard: {
            label: 'Age 9-10',
            maxHints: 2,
            maxAttempts: 3,
            minLength: 6,
            maxLength: 8,
            allowedTypes: ['arithmetic', 'alternating', 'geometric', 'fibonacciLike'],
            maxValue: 199
        }
    };

    const challengeCounter = document.getElementById('challenge-counter');
    const sequenceTrack = document.getElementById('sequence-track');
    const choicePad = document.getElementById('choice-pad');
    const feedbackBar = document.getElementById('feedback-bar');
    const feedbackStamp = document.getElementById('feedback-stamp');

    const scoreValue = document.getElementById('score-value');
    const levelValue = document.getElementById('level-value');
    const streakValue = document.getElementById('streak-value');
    const hintsValue = document.getElementById('hints-value');
    const attemptsValue = document.getElementById('attempts-value');

    const hintMessage = document.getElementById('hint-message');
    const resultMessage = document.getElementById('result-message');
    const explanationMessage = document.getElementById('explanation-message');

    const hintButton = document.getElementById('hint-btn');
    const prevButton = document.getElementById('challenge-prev');
    const resetButton = document.getElementById('reset-answer');
    const checkButton = document.getElementById('check-answer');
    const nextButton = document.getElementById('challenge-next');
    const modeButtons = Array.from(document.querySelectorAll('.mode-btn'));

    const game = {
        mode: 'medium',
        challenges: [],
        currentIndex: 0,
        solvedCount: 0,
        score: 0,
        streak: 0,
        usedByMode: {
            easy: new Set(),
            medium: new Set(),
            hard: new Set()
        },
        lastSignatureByMode: {
            easy: '',
            medium: '',
            hard: ''
        }
    };

    let feedbackTimer = null;
    const audioVersion = Date.now();

    function playAudioFile(src, volume = 0.82) {
        try {
            const audio = new Audio(`${src}?v=${audioVersion}`);
            audio.volume = volume;
            audio.play().catch(() => {});
        } catch (_) {
            // Audio is optional.
        }
    }

    function playSound(type) {
        if (type === 'success') {
            playAudioFile('../sounds/tick.mp3', 0.92);
            return;
        }

        if (type === 'error') {
            playAudioFile('../sounds/cross.mp3', 0.9);
            return;
        }

        if (window.SoundEffects && typeof window.SoundEffects.playClickSound === 'function') {
            window.SoundEffects.playClickSound();
            return;
        }

        playAudioFile('../sounds/click.mp3', 0.5);
    }

    function clearFeedback() {
        if (!feedbackStamp || !feedbackBar) {
            return;
        }
        if (feedbackTimer) {
            window.clearTimeout(feedbackTimer);
            feedbackTimer = null;
        }
        feedbackStamp.className = 'feedback-stamp';
        feedbackBar.classList.remove('has-feedback');
    }

    function showFeedback(type) {
        if (!feedbackStamp || !feedbackBar) {
            return;
        }

        feedbackStamp.className = `feedback-stamp ${type}`;
        feedbackBar.classList.add('has-feedback');
        void feedbackStamp.offsetWidth;
        feedbackStamp.classList.add('show');

        if (feedbackTimer) {
            window.clearTimeout(feedbackTimer);
        }
        feedbackTimer = window.setTimeout(() => {
            clearFeedback();
        }, 2400);
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffleArray(input) {
        const arr = [...input];
        for (let i = arr.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function currentConfig() {
        return MODE_CONFIG[game.mode];
    }

    function currentChallenge() {
        return game.challenges[game.currentIndex] || null;
    }

    function currentTier() {
        if (game.solvedCount < 4) return 1;
        if (game.solvedCount < 10) return 2;
        return 3;
    }

    function explanationFor(type, sequence, meta) {
        if (type === 'arithmetic') {
            return `Rule: add ${meta.step} each time. Full sequence: ${sequence.join(', ')}`;
        }

        if (type === 'alternating') {
            return `Rule: two interleaved patterns (odd positions +${meta.stepA}, even positions +${meta.stepB}). Full sequence: ${sequence.join(', ')}`;
        }

        if (type === 'geometric') {
            return `Rule: multiply by ${meta.factor} each step. Full sequence: ${sequence.join(', ')}`;
        }

        return `Rule: each next number = previous two numbers added. Full sequence: ${sequence.join(', ')}`;
    }

    function buildArithmetic(config, tier) {
        const length = randomInt(config.minLength, config.maxLength);
        const positiveOnly = game.mode === 'easy';
        const stepBase = tier === 1 ? [1, 2, 3] : tier === 2 ? [2, 3, 4, 5] : [3, 4, 5, 6];
        const rawStep = stepBase[randomInt(0, stepBase.length - 1)];
        const step = positiveOnly ? rawStep : (Math.random() > 0.25 ? rawStep : -rawStep);

        let startMin;
        let startMax;

        if (step > 0) {
            startMin = 2;
            startMax = Math.max(startMin + 4, config.maxValue - step * (length - 1));
        } else {
            startMin = Math.abs(step) * (length - 1) + 2;
            startMax = Math.max(startMin + 4, config.maxValue - 2);
        }

        const start = randomInt(startMin, startMax);
        const sequence = Array.from({ length }, (_, idx) => start + idx * step);

        return {
            type: 'arithmetic',
            sequence,
            meta: { step },
            clue: tier === 1
                ? 'Pattern clue: numbers move by the same amount each time.'
                : 'Pattern clue: check the jump from one number to the next.'
        };
    }

    function buildAlternating(config, tier) {
        const length = Math.max(6, randomInt(config.minLength, config.maxLength));
        const startA = randomInt(2, Math.floor(config.maxValue / 3));
        const startB = randomInt(3, Math.floor(config.maxValue / 3));
        const stepA = tier === 1 ? randomInt(1, 2) : randomInt(2, 4);
        const stepB = tier === 1 ? randomInt(1, 2) : randomInt(2, 5);

        const sequence = [];
        let a = startA;
        let b = startB;

        for (let i = 0; i < length; i += 1) {
            if (i % 2 === 0) {
                sequence.push(a);
                a += stepA;
            } else {
                sequence.push(b);
                b += stepB;
            }
        }

        return {
            type: 'alternating',
            sequence,
            meta: { stepA, stepB },
            clue: 'Pattern clue: odd positions and even positions follow different mini-patterns.'
        };
    }

    function buildGeometric(config, tier) {
        const factor = tier === 1 ? 2 : (Math.random() > 0.4 ? 2 : 3);
        const length = factor === 3 ? Math.min(6, config.maxLength) : randomInt(config.minLength, Math.min(config.maxLength, 7));

        const maxStart = Math.max(2, Math.floor(config.maxValue / Math.pow(factor, length - 1)));
        const start = randomInt(1, Math.max(1, maxStart));

        const sequence = Array.from({ length }, (_, idx) => start * Math.pow(factor, idx));

        return {
            type: 'geometric',
            sequence,
            meta: { factor },
            clue: 'Pattern clue: each number grows by multiplication.'
        };
    }

    function buildFibonacciLike(config) {
        const length = randomInt(6, Math.min(config.maxLength, 8));
        let a = randomInt(1, 4);
        let b = randomInt(2, 6);

        const sequence = [a, b];
        while (sequence.length < length) {
            const next = sequence[sequence.length - 1] + sequence[sequence.length - 2];
            if (next > config.maxValue) {
                a = randomInt(1, 3);
                b = randomInt(2, 5);
                sequence.length = 0;
                sequence.push(a, b);
                continue;
            }
            sequence.push(next);
        }

        return {
            type: 'fibonacciLike',
            sequence,
            meta: {},
            clue: 'Pattern clue: each number is made from the two numbers before it.'
        };
    }

    function chooseGenerator(type, config, tier) {
        if (type === 'arithmetic') return () => buildArithmetic(config, tier);
        if (type === 'alternating') return () => buildAlternating(config, tier);
        if (type === 'geometric') return () => buildGeometric(config, tier);
        return () => buildFibonacciLike(config, tier);
    }

    function pickBlankIndexes(length, tier) {
        const all = Array.from({ length }, (_, i) => i);
        const internal = all.slice(1, length - 1);

        let blankCount = tier === 1 ? 1 : 2;
        if (game.mode === 'hard' && tier === 3) {
            blankCount = 3;
        }

        const source = internal.length >= blankCount ? internal : all;
        const chosen = shuffleArray(source).slice(0, blankCount).sort((a, b) => a - b);
        return chosen;
    }

    function buildChoices(sequence, answers, tier) {
        const set = new Set(answers);

        const minVal = Math.min(...sequence);
        const maxVal = Math.max(...sequence);
        const width = Math.max(10, maxVal - minVal + 8);
        const choiceTarget = tier === 1 ? 8 : tier === 2 ? 10 : 12;

        while (set.size < choiceTarget) {
            const candidate = randomInt(Math.max(0, minVal - 6), minVal + width);
            set.add(candidate);
        }

        return shuffleArray(Array.from(set));
    }

    function generateChallenge() {
        const config = currentConfig();
        const tier = currentTier();
        const types = config.allowedTypes;
        const used = game.usedByMode[game.mode];

        for (let attempt = 0; attempt < 600; attempt += 1) {
            const type = types[randomInt(0, types.length - 1)];
            const challenge = chooseGenerator(type, config, tier)();

            if (!challenge || !challenge.sequence || challenge.sequence.length < 5) {
                continue;
            }

            if (challenge.sequence.some((value) => value < 0 || value > config.maxValue)) {
                continue;
            }

            const blankIndexes = pickBlankIndexes(challenge.sequence.length, tier);
            const answers = blankIndexes.map((index) => challenge.sequence[index]);
            const signature = `${game.mode}|${type}|${challenge.sequence.join(',')}|${blankIndexes.join('-')}`;

            if (signature === game.lastSignatureByMode[game.mode] || used.has(signature)) {
                continue;
            }

            used.add(signature);
            game.lastSignatureByMode[game.mode] = signature;

            return {
                id: signature,
                tier,
                type,
                clue: challenge.clue,
                sequence: challenge.sequence,
                blankIndexes,
                choices: buildChoices(challenge.sequence, answers, tier),
                selections: {},
                activeBlank: blankIndexes[0],
                attempts: 0,
                hintStep: 0,
                solved: false,
                revealed: false,
                counted: false,
                wrongIndexes: new Set(),
                explanation: explanationFor(type, challenge.sequence, challenge.meta),
                resultText: '',
                resultType: '',
                extraExplanation: ''
            };
        }

        used.clear();
        return null;
    }

    function ensureChallengeAt(index) {
        while (game.challenges.length <= index) {
            const challenge = generateChallenge();
            if (!challenge) {
                return false;
            }
            game.challenges.push(challenge);
        }
        return true;
    }

    function updateModeButtons() {
        modeButtons.forEach((button) => {
            const active = button.dataset.mode === game.mode;
            button.classList.toggle('active', active);
            button.setAttribute('aria-selected', active ? 'true' : 'false');
        });
    }

    function clearWrongMarks() {
        const challenge = currentChallenge();
        if (!challenge) {
            return;
        }
        challenge.wrongIndexes.clear();
    }

    function renderSequence() {
        const challenge = currentChallenge();
        if (!challenge || !sequenceTrack) {
            return;
        }

        sequenceTrack.innerHTML = '';

        challenge.sequence.forEach((number, index) => {
            const blank = challenge.blankIndexes.includes(index);
            const cell = document.createElement(blank ? 'button' : 'div');
            cell.className = `seq-cell ${blank ? 'blank' : 'fixed'}`;
            cell.dataset.index = String(index);

            if (blank) {
                cell.type = 'button';
                const value = challenge.selections[index];
                cell.textContent = value !== undefined ? String(value) : '?';

                if (challenge.activeBlank === index && !challenge.solved && !challenge.revealed) {
                    cell.classList.add('active');
                }

                if (challenge.wrongIndexes.has(index)) {
                    cell.classList.add('wrong');
                }

                if (challenge.revealed) {
                    cell.textContent = String(number);
                    cell.classList.add('revealed');
                    cell.disabled = true;
                }

                if (challenge.solved) {
                    cell.textContent = String(number);
                    cell.classList.add('revealed');
                    cell.disabled = true;
                }

                if (!cell.disabled) {
                    cell.addEventListener('click', () => {
                        clearFeedback();
                        challenge.activeBlank = index;
                        playSound('click');
                        renderSequence();
                    });
                }
            } else {
                cell.textContent = String(number);
            }

            sequenceTrack.appendChild(cell);
        });
    }

    function fillSelectedBlank(value) {
        const challenge = currentChallenge();
        if (!challenge || challenge.solved || challenge.revealed) {
            return;
        }

        clearFeedback();

        if (challenge.activeBlank === null || challenge.activeBlank === undefined) {
            challenge.activeBlank = challenge.blankIndexes[0];
        }

        challenge.selections[challenge.activeBlank] = value;

        const next = challenge.blankIndexes.find((idx) => challenge.selections[idx] === undefined);
        if (next !== undefined) {
            challenge.activeBlank = next;
        }

        clearWrongMarks();
        playSound('click');
        renderSequence();
    }

    function removeSelectedBlank() {
        const challenge = currentChallenge();
        if (!challenge || challenge.solved || challenge.revealed) {
            return;
        }

        clearFeedback();

        if (challenge.activeBlank === null || challenge.activeBlank === undefined) {
            challenge.activeBlank = challenge.blankIndexes[0];
        }

        if (challenge.selections[challenge.activeBlank] !== undefined) {
            delete challenge.selections[challenge.activeBlank];
        } else {
            const filled = [...challenge.blankIndexes].reverse().find((idx) => challenge.selections[idx] !== undefined);
            if (filled !== undefined) {
                delete challenge.selections[filled];
                challenge.activeBlank = filled;
            }
        }

        clearWrongMarks();
        playSound('click');
        renderSequence();
    }

    function renderChoices() {
        const challenge = currentChallenge();
        if (!challenge || !choicePad) {
            return;
        }

        choicePad.innerHTML = '';

        challenge.choices.forEach((number) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'choice-btn';
            button.textContent = String(number);
            button.addEventListener('click', () => {
                fillSelectedBlank(number);
            });
            choicePad.appendChild(button);
        });

        const clear = document.createElement('button');
        clear.type = 'button';
        clear.className = 'choice-btn clear';
        clear.innerHTML = '<i class="fas fa-delete-left"></i>';
        clear.setAttribute('aria-label', 'Erase selected blank');
        clear.addEventListener('click', removeSelectedBlank);

        choicePad.appendChild(clear);
    }

    function updateHud() {
        const challenge = currentChallenge();
        if (!challenge) {
            return;
        }

        if (scoreValue) scoreValue.textContent = String(game.score);
        if (levelValue) levelValue.textContent = String(Math.max(1, Math.floor(game.solvedCount / 3) + 1));
        if (streakValue) streakValue.textContent = String(game.streak);

        const hintsLeft = Math.max(0, currentConfig().maxHints - challenge.hintStep);
        const attemptsLeft = Math.max(0, currentConfig().maxAttempts - challenge.attempts);

        if (hintsValue) hintsValue.textContent = String(hintsLeft);
        if (attemptsValue) attemptsValue.textContent = String(attemptsLeft);

        if (challengeCounter) {
            challengeCounter.textContent = `Challenge ${game.currentIndex + 1}`;
        }

        if (prevButton) prevButton.disabled = game.currentIndex === 0;
        if (checkButton) checkButton.disabled = challenge.solved || challenge.revealed;
    }

    function updateMessages() {
        const challenge = currentChallenge();
        if (!challenge) {
            return;
        }

        if (hintMessage) {
            hintMessage.textContent = challenge.clue;
            hintMessage.className = 'hint-message';
        }

        if (resultMessage) {
            resultMessage.textContent = challenge.resultText || 'Fill all blanks, then press check.';
            resultMessage.className = 'result';
            if (challenge.resultType === 'success') resultMessage.classList.add('success');
            if (challenge.resultType === 'error') resultMessage.classList.add('error');
        }

        if (explanationMessage) {
            explanationMessage.textContent = challenge.extraExplanation || 'Pattern explanation appears after solve or after 3 failed attempts.';
        }
    }

    function renderAll() {
        updateModeButtons();
        renderSequence();
        renderChoices();
        updateHud();
        updateMessages();
    }

    function checkChallenge() {
        const challenge = currentChallenge();
        if (!challenge || challenge.solved || challenge.revealed) {
            return;
        }

        clearFeedback();

        const hasUnfilled = challenge.blankIndexes.some((idx) => challenge.selections[idx] === undefined);
        if (hasUnfilled) {
            challenge.resultText = 'Fill all missing numbers first.';
            challenge.resultType = 'error';
            challenge.extraExplanation = '';
            updateMessages();
            showFeedback('error');
            playSound('error');
            return;
        }

        clearWrongMarks();
        const wrong = challenge.blankIndexes.filter((idx) => challenge.selections[idx] !== challenge.sequence[idx]);

        if (wrong.length === 0) {
            challenge.solved = true;

            let points = 0;
            if (!challenge.counted) {
                challenge.counted = true;
                game.solvedCount += 1;
                game.streak += 1;

                const tierBonus = (challenge.tier - 1) * 3;
                points = Math.max(4, 12 + tierBonus - (challenge.attempts * 3) - (challenge.hintStep * 2));
                game.score += points;
            }

            challenge.resultText = `Perfect. Pattern solved. +${points} points.`;
            challenge.resultType = 'success';
            challenge.extraExplanation = challenge.explanation;
            challenge.clue = 'Great job. Use Next for a new challenge.';
            showFeedback('success');
            playSound('success');

            challenge.blankIndexes.forEach((idx) => {
                challenge.selections[idx] = challenge.sequence[idx];
            });
        } else {
            challenge.attempts += 1;
            game.streak = 0;
            game.score = Math.max(0, game.score - 1);
            wrong.forEach((idx) => challenge.wrongIndexes.add(idx));

            if (challenge.attempts >= currentConfig().maxAttempts) {
                challenge.revealed = true;
                challenge.blankIndexes.forEach((idx) => {
                    challenge.selections[idx] = challenge.sequence[idx];
                });
                challenge.resultText = '3 attempts used. Correct pattern revealed.';
                challenge.resultType = 'error';
                challenge.extraExplanation = challenge.explanation;
                challenge.clue = 'Read the explanation, then use Next.';
                showFeedback('error');
                playSound('error');
            } else {
                const left = currentConfig().maxAttempts - challenge.attempts;
                challenge.resultText = `Not correct yet. Try again. Attempts left: ${left}.`;
                challenge.resultType = 'error';
                challenge.extraExplanation = '';
                showFeedback('error');
                playSound('error');
                window.setTimeout(() => {
                    clearWrongMarks();
                    renderSequence();
                }, 520);
            }
        }

        renderAll();
    }

    function useHint() {
        const challenge = currentChallenge();
        if (!challenge || challenge.solved || challenge.revealed) {
            if (challenge) {
                clearFeedback();
                challenge.clue = 'This challenge is complete. Use Next for another one.';
                updateMessages();
            }
            return;
        }

        const maxHints = currentConfig().maxHints;
        if (challenge.hintStep >= maxHints) {
            clearFeedback();
            challenge.clue = 'No hints left on this challenge.';
            updateMessages();
            playSound('error');
            return;
        }

        clearFeedback();
        challenge.hintStep += 1;

        if (challenge.hintStep === 1) {
            challenge.clue = challenge.type === 'arithmetic'
                ? 'Hint: check the constant jump between visible numbers.'
                : challenge.type === 'alternating'
                    ? 'Hint: split the pattern into odd and even positions.'
                    : challenge.type === 'geometric'
                        ? 'Hint: try multiplication, not addition.'
                        : 'Hint: each term depends on the previous two.';
        } else if (challenge.hintStep === 2) {
            const unrevealed = challenge.blankIndexes.filter((idx) => challenge.selections[idx] === undefined);
            const revealIndex = unrevealed.length ? unrevealed[randomInt(0, unrevealed.length - 1)] : challenge.blankIndexes[0];
            challenge.selections[revealIndex] = challenge.sequence[revealIndex];
            challenge.activeBlank = challenge.blankIndexes.find((idx) => challenge.selections[idx] === undefined) ?? revealIndex;
            challenge.clue = `Hint: one missing value is ${challenge.sequence[revealIndex]}.`;
        } else {
            challenge.clue = `Final hint: ${challenge.explanation}`;
        }

        game.score = Math.max(0, game.score - 2);
        playSound('click');
        renderAll();
    }

    function resetAnswer() {
        const challenge = currentChallenge();
        if (!challenge) {
            return;
        }

        if (challenge.solved || challenge.revealed) {
            clearFeedback();
            challenge.clue = 'Challenge already complete. Use Next for a new one.';
            updateMessages();
            return;
        }

        clearFeedback();
        challenge.selections = {};
        challenge.activeBlank = challenge.blankIndexes[0];
        challenge.wrongIndexes.clear();
        challenge.resultText = 'Answer reset.';
        challenge.resultType = '';
        challenge.extraExplanation = '';
        challenge.clue = 'Try again. Look carefully at the pattern rule.';
        playSound('click');
        renderAll();
    }

    function goToChallenge(index) {
        if (index < 0) {
            return;
        }

        if (!ensureChallengeAt(index)) {
            return;
        }

        game.currentIndex = index;
        renderAll();
    }

    function resetSession(mode) {
        game.mode = mode;
        game.challenges = [];
        game.currentIndex = 0;
        game.solvedCount = 0;
        game.score = 0;
        game.streak = 0;
        game.usedByMode[mode].clear();
        game.lastSignatureByMode[mode] = '';

        ensureChallengeAt(0);
        renderAll();
    }

    if (hintButton) {
        hintButton.addEventListener('click', useHint);
    }

    if (checkButton) {
        checkButton.addEventListener('click', checkChallenge);
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetAnswer);
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            clearFeedback();
            goToChallenge(game.currentIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            clearFeedback();
            goToChallenge(game.currentIndex + 1);
        });
    }

    modeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            if (!mode || mode === game.mode || !MODE_CONFIG[mode]) {
                return;
            }
            playSound('click');
            resetSession(mode);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkChallenge();
        }
    });

    ensureChallengeAt(0);
    renderAll();
});
