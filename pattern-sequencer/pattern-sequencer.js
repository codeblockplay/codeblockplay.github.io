// Pattern Sequencer JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const ALLOWED_ITEMS = ['🔴', '🔵', '🟢', '🟡'];
    const MAX_ATTEMPTS_PER_PATTERN = 3;

    const patternSequence = document.getElementById('pattern-sequence');
    const patternChoices = document.getElementById('pattern-choices');
    const patternSolution = document.getElementById('pattern-solution');
    const patternResultMsg = document.getElementById('pattern-result');
    const explanationBox = document.getElementById('pattern-explanation');

    const checkButton = document.getElementById('pattern-check');
    const resetButton = document.getElementById('pattern-reset');
    const prevButton = document.getElementById('pattern-prev');
    const nextButton = document.getElementById('pattern-next');

    const levelElement = document.getElementById('sequence-level');
    const solvedElement = document.getElementById('sequence-solved');
    const totalElement = document.getElementById('sequence-total');
    const attemptsElement = document.getElementById('sequence-attempts');
    const progressBar = document.getElementById('sequence-progress');

    const game = {
        patterns: [],
        currentIndex: 0,
        solvedCount: 0,
        usedSignatures: new Set()
    };

    const audioVersion = Date.now();

    function playSound(type) {
        try {
            const map = {
                success: '../sounds/tick.mp3',
                error: '../sounds/cross.mp3',
                click: '../sounds/click.mp3'
            };
            const src = map[type];
            if (!src) return;
            const audio = new Audio(`${src}?v=${audioVersion}`);
            audio.volume = 0.7;
            audio.play().catch(() => {});
        } catch (_) {}
    }

    function shuffleArray(input) {
        const arr = [...input];
        for (let i = arr.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function difficultyFromSolved(solvedCount) {
        if (solvedCount < 10) return 1;
        if (solvedCount < 25) return 2;
        return 3;
    }

    function buildCycleUnit(level) {
        const symbolPool = shuffleArray(ALLOWED_ITEMS);
        const symbolCount = level === 1 ? randomInt(2, 3) : level === 2 ? randomInt(3, 4) : 4;
        const chosenSymbols = symbolPool.slice(0, symbolCount);

        const unitLength = level === 1 ? randomInt(2, 3) : level === 2 ? randomInt(3, 4) : randomInt(4, 5);

        const unit = [];
        for (let i = 0; i < unitLength; i += 1) {
            const candidate = chosenSymbols[randomInt(0, chosenSymbols.length - 1)];
            if (i > 0 && candidate === unit[i - 1]) {
                i -= 1;
                continue;
            }
            unit.push(candidate);
        }

        return unit;
    }

    function generateCyclePattern(level) {
        const unit = buildCycleUnit(level);
        const offset = randomInt(0, unit.length - 1);

        const visibleLength = level === 1 ? randomInt(5, 7) : level === 2 ? randomInt(7, 9) : randomInt(8, 11);
        const solutionLength = level === 1 ? randomInt(1, 2) : level === 2 ? randomInt(2, 3) : randomInt(3, 4);

        const seq = [];
        const total = visibleLength + solutionLength;
        for (let i = 0; i < total; i += 1) {
            const item = unit[(offset + i) % unit.length];
            seq.push(item);
        }

        const pattern = seq.slice(0, visibleLength);
        const solution = seq.slice(visibleLength);

        return {
            rule: 'cycle',
            pattern,
            solution,
            explanation: `The sequence repeats this loop: ${unit.join(' ')}. Continue from the last shown shape.`,
            signature: `cycle|L${level}|U${unit.join('')}|O${offset}|V${visibleLength}|S${solutionLength}`
        };
    }

    function generateBlockPattern(level) {
        const symbols = shuffleArray(ALLOWED_ITEMS).slice(0, level === 1 ? 2 : level === 2 ? 3 : 4);
        const counts = symbols.map((_, index) => {
            if (level === 1) return index === 0 ? 1 : 2;
            if (level === 2) return randomInt(1, 2);
            return randomInt(1, 3);
        });

        const unit = [];
        symbols.forEach((symbol, index) => {
            for (let i = 0; i < counts[index]; i += 1) {
                unit.push(symbol);
            }
        });

        const visibleLength = level === 1 ? randomInt(6, 8) : level === 2 ? randomInt(8, 10) : randomInt(9, 12);
        const solutionLength = level === 1 ? randomInt(1, 2) : level === 2 ? randomInt(2, 3) : randomInt(3, 4);

        const seq = [];
        const total = visibleLength + solutionLength;
        for (let i = 0; i < total; i += 1) {
            seq.push(unit[i % unit.length]);
        }

        const pattern = seq.slice(0, visibleLength);
        const solution = seq.slice(visibleLength);

        return {
            rule: 'blocks',
            pattern,
            solution,
            explanation: `The pattern follows grouped blocks (${symbols.map((s, i) => `${s}×${counts[i]}`).join(', ')}), then repeats.`,
            signature: `blocks|L${level}|U${unit.join('')}|V${visibleLength}|S${solutionLength}`
        };
    }

    function validateTemplate(template) {
        const validShape = template && Array.isArray(template.pattern) && Array.isArray(template.solution);
        if (!validShape) return false;

        if (template.pattern.length < 4 || template.solution.length < 1) return false;

        const allSymbols = [...template.pattern, ...template.solution];
        return allSymbols.every((item) => ALLOWED_ITEMS.includes(item));
    }

    function generateUniqueTemplate(level) {
        for (let i = 0; i < 400; i += 1) {
            const candidate = Math.random() < 0.65
                ? generateCyclePattern(level)
                : generateBlockPattern(level);

            if (!validateTemplate(candidate)) {
                continue;
            }

            if (game.usedSignatures.has(candidate.signature)) {
                continue;
            }

            game.usedSignatures.add(candidate.signature);
            return candidate;
        }

        return null;
    }

    function createPatternState() {
        const level = difficultyFromSolved(game.solvedCount);
        const template = generateUniqueTemplate(level);

        if (!template) {
            return null;
        }

        return {
            id: template.signature,
            level,
            pattern: template.pattern,
            solution: template.solution,
            explanation: template.explanation,
            selected: [],
            failedAttempts: 0,
            solved: false,
            revealed: false,
            counted: false
        };
    }

    function currentPattern() {
        return game.patterns[game.currentIndex] || null;
    }

    function ensurePatternAtIndex(index) {
        while (game.patterns.length <= index) {
            const newPattern = createPatternState();
            if (!newPattern) return false;
            game.patterns.push(newPattern);
        }
        return true;
    }

    function setResult(text, type = '') {
        if (!patternResultMsg) return;
        patternResultMsg.textContent = text;
        patternResultMsg.className = 'result-message';
        if (type === 'success') patternResultMsg.classList.add('success', 'animated-feedback');
        if (type === 'error') patternResultMsg.classList.add('error', 'animated-feedback');
    }

    function setExplanation(text) {
        if (!explanationBox) return;
        explanationBox.textContent = text || '';
        explanationBox.classList.toggle('visible', Boolean(text));
    }

    function updateAttemptsLeft() {
        const pattern = currentPattern();
        if (!attemptsElement || !pattern) return;
        attemptsElement.textContent = String(Math.max(0, MAX_ATTEMPTS_PER_PATTERN - pattern.failedAttempts));
    }

    function updateStats() {
        const pattern = currentPattern();
        if (levelElement && pattern) levelElement.textContent = String(pattern.level);
        if (solvedElement) solvedElement.textContent = String(game.solvedCount);
        if (totalElement) totalElement.textContent = '∞';

        if (progressBar) {
            const progressPercent = ((game.solvedCount % 10) / 10) * 100;
            progressBar.style.width = `${progressPercent}%`;
            progressBar.setAttribute('aria-valuenow', String(progressPercent));
        }

        updateAttemptsLeft();
        if (prevButton) prevButton.disabled = game.currentIndex === 0;
    }

    function renderSolutionSlots() {
        const pattern = currentPattern();
        if (!patternSolution || !pattern) return;

        patternSolution.innerHTML = '';
        for (let i = 0; i < pattern.solution.length; i += 1) {
            const slot = document.createElement('div');
            slot.className = 'solution-item';

            if (i < pattern.selected.length) {
                slot.textContent = pattern.selected[i];

                if (pattern.revealed) {
                    slot.classList.add('revealed-answer');
                } else {
                    slot.addEventListener('click', () => {
                        pattern.selected.splice(i, 1);
                        renderSolutionSlots();
                        playSound('click');
                    });
                }
            }

            patternSolution.appendChild(slot);
        }
    }

    function renderChoices() {
        const pattern = currentPattern();
        if (!patternChoices || !pattern) return;

        patternChoices.innerHTML = '';
        const uniqueItems = Array.from(new Set([...pattern.pattern, ...pattern.solution]));
        const distractor = ALLOWED_ITEMS.find((item) => !uniqueItems.includes(item));
        if (distractor) uniqueItems.push(distractor);

        shuffleArray(uniqueItems).forEach((item) => {
            const button = document.createElement('button');
            button.className = 'btn pattern-choice';
            button.type = 'button';
            button.dataset.pattern = item;
            button.textContent = item;

            switch (item) {
                case '🔴': button.classList.add('btn-outline-danger'); break;
                case '🔵': button.classList.add('btn-outline-primary'); break;
                case '🟢': button.classList.add('btn-outline-success'); break;
                case '🟡': button.classList.add('btn-outline-warning'); break;
                default: break;
            }

            button.addEventListener('click', () => {
                if (pattern.revealed || pattern.solved) return;
                if (pattern.selected.length >= pattern.solution.length) return;

                pattern.selected.push(item);
                renderSolutionSlots();
                playSound('click');
            });

            patternChoices.appendChild(button);
        });
    }

    function renderPattern() {
        const pattern = currentPattern();
        if (!pattern || !patternSequence) return;

        patternSequence.innerHTML = '';

        pattern.pattern.forEach((item) => {
            const block = document.createElement('div');
            block.className = 'pattern-item';
            block.textContent = item;
            patternSequence.appendChild(block);
        });

        for (let i = 0; i < pattern.solution.length; i += 1) {
            const mark = document.createElement('div');
            mark.className = 'pattern-item';
            mark.textContent = '?';
            patternSequence.appendChild(mark);
        }

        renderChoices();
        renderSolutionSlots();

        if (pattern.solved && !pattern.revealed) {
            setResult('Correct. You solved this pattern.', 'success');
            setExplanation(`Why: ${pattern.explanation}`);
        } else if (pattern.revealed) {
            setResult('Answer was revealed after 3 tries.', 'error');
            setExplanation(`Why: ${pattern.explanation}`);
        } else {
            setResult('');
            setExplanation('');
        }

        updateStats();
    }

    function goToPattern(index) {
        if (index < 0) return;
        if (!ensurePatternAtIndex(index)) {
            setResult('Could not generate more unique patterns right now.', 'error');
            return;
        }

        game.currentIndex = index;
        renderPattern();
    }

    function selectionIsCorrect(pattern) {
        if (pattern.selected.length !== pattern.solution.length) return false;
        return pattern.solution.every((item, idx) => item === pattern.selected[idx]);
    }

    function revealAnswer(pattern) {
        pattern.selected = [...pattern.solution];
        pattern.revealed = true;
        renderSolutionSlots();

        setResult('3 attempts reached. Here is the correct answer.', 'error');
        setExplanation(`Why: ${pattern.explanation}`);
        playSound('error');
        updateStats();
    }

    function handleCheck() {
        const pattern = currentPattern();
        if (!pattern) return;

        if (pattern.solved || pattern.revealed) {
            setResult('Use Next Pattern to continue or Previous Pattern to review.', 'success');
            return;
        }

        if (pattern.selected.length < pattern.solution.length) {
            setResult('Please fill all answer slots first.', 'error');
            playSound('error');
            return;
        }

        if (selectionIsCorrect(pattern)) {
            pattern.solved = true;
            if (!pattern.counted) {
                pattern.counted = true;
                game.solvedCount += 1;
            }

            setResult('🎉 Correct! Great job.', 'success');
            setExplanation(`Why: ${pattern.explanation}`);
            playSound('success');
            updateStats();
            return;
        }

        pattern.failedAttempts += 1;
        const remaining = MAX_ATTEMPTS_PER_PATTERN - pattern.failedAttempts;
        updateAttemptsLeft();

        const slots = document.querySelectorAll('.solution-item');
        slots.forEach((slot) => {
            slot.classList.add('shake-effect');
            window.setTimeout(() => slot.classList.remove('shake-effect'), 380);
        });

        if (remaining <= 0) {
            revealAnswer(pattern);
            return;
        }

        setResult(`Not correct. Try again. Attempts left: ${remaining}`, 'error');
        playSound('error');
    }

    function handleReset() {
        const pattern = currentPattern();
        if (!pattern) return;

        if (pattern.revealed || pattern.solved) {
            setResult('This pattern is finished. Use Next Pattern to continue.', 'success');
            return;
        }

        pattern.selected = [];
        renderSolutionSlots();
        setResult('Input cleared. Try again.');
        playSound('click');
    }

    function handleNext() {
        playSound('click');
        goToPattern(game.currentIndex + 1);
    }

    function handlePrev() {
        if (game.currentIndex === 0) return;
        playSound('click');
        goToPattern(game.currentIndex - 1);
    }

    if (checkButton) checkButton.addEventListener('click', handleCheck);
    if (resetButton) resetButton.addEventListener('click', handleReset);
    if (nextButton) nextButton.addEventListener('click', handleNext);
    if (prevButton) prevButton.addEventListener('click', handlePrev);

    const initialized = ensurePatternAtIndex(0);
    if (!initialized) {
        setResult('Pattern generator failed to initialize.', 'error');
        return;
    }

    renderPattern();
});
