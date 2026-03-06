document.addEventListener('DOMContentLoaded', () => {
    const MODE_CONFIG = {
        easy: { label: 'Age 5-6', size: 5, tierCap: 2 },
        medium: { label: 'Age 7-8', size: 6, tierCap: 3 },
        hard: { label: 'Age 9-10', size: 7, tierCap: 3 }
    };

    const MAX_ATTEMPTS = 3;
    const MAX_HINT_STEPS = 3;

    const gridBoard = document.getElementById('grid-board');
    const clueElement = document.getElementById('treasure-clue');
    const mapCounter = document.getElementById('map-counter');

    const scoreValue = document.getElementById('score-value');
    const levelValue = document.getElementById('level-value');
    const solvedValue = document.getElementById('solved-value');
    const streakValue = document.getElementById('streak-value');
    const hintsValue = document.getElementById('hints-value');
    const attemptsValue = document.getElementById('attempts-value');

    const hintMessage = document.getElementById('hint-message');
    const resultMessage = document.getElementById('grid-result');
    const explanationMessage = document.getElementById('grid-explanation');

    const hintButton = document.getElementById('hint-btn');
    const prevButton = document.getElementById('grid-prev');
    const resetButton = document.getElementById('grid-reset');
    const checkButton = document.getElementById('grid-check');
    const nextButton = document.getElementById('grid-next');
    const modeButtons = Array.from(document.querySelectorAll('.mode-btn'));

    const game = {
        mode: 'medium',
        maps: [],
        currentIndex: 0,
        solvedCount: 0,
        score: 0,
        streak: 0,
        hintsUsed: 0,
        usedByMode: {
            easy: new Set(),
            medium: new Set(),
            hard: new Set()
        },
        lastIdByMode: {
            easy: '',
            medium: '',
            hard: ''
        }
    };

    function playSound(type) {
        const pathMap = {
            success: '../sounds/success.mp3',
            error: '../sounds/error.mp3',
            click: '../sounds/click.mp3'
        };

        const src = pathMap[type];
        if (!src) {
            return;
        }

        try {
            const audio = new Audio(src);
            audio.volume = 0.7;
            audio.play().catch(() => {});
        } catch (_) {
            // Audio is optional feedback.
        }
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function choice(items) {
        return items[randomInt(0, items.length - 1)];
    }

    function ordinal(number) {
        const mod10 = number % 10;
        const mod100 = number % 100;
        if (mod10 === 1 && mod100 !== 11) return `${number}st`;
        if (mod10 === 2 && mod100 !== 12) return `${number}nd`;
        if (mod10 === 3 && mod100 !== 13) return `${number}rd`;
        return `${number}th`;
    }

    function letterFromColumn(columnNumber) {
        return String.fromCharCode(64 + columnNumber);
    }

    function coordinateLabel(target) {
        return `${letterFromColumn(target.col)}${target.row}`;
    }

    function coordinateKey(row, col) {
        return `${row}:${col}`;
    }

    function parseCoordinateKey(key) {
        const [row, col] = key.split(':').map(Number);
        return { row, col };
    }

    function currentTier() {
        const cap = MODE_CONFIG[game.mode].tierCap;
        if (game.solvedCount < 4) return 1;
        if (game.solvedCount < 10) return Math.min(2, cap);
        return cap;
    }

    function numberExpression(value) {
        const expressions = [`${value}`, `${value + 2} - 2`, `${value * 2} / 2`];

        if (value > 1) {
            expressions.push(`${value - 1} + 1`);
        }

        if (value > 2) {
            expressions.push(`${value - 2} + 2`);
        }

        return choice(expressions);
    }

    function buildClue(mode, target, tier) {
        const colLetter = letterFromColumn(target.col);

        if (tier === 1) {
            return {
                variant: 'direct',
                text: `Captain clue: the gem is at ${colLetter}${target.row}.`,
                explanation: `${colLetter}${target.row} means column ${colLetter} and row ${target.row}.`
            };
        }

        if (tier === 2) {
            const options = [
                {
                    variant: 'count-columns',
                    text: `Find row ${target.row}. Pick the ${ordinal(target.col)} tile from the left.`,
                    explanation: `On row ${target.row}, the ${ordinal(target.col)} tile is ${colLetter}${target.row}.`
                },
                {
                    variant: 'count-rows',
                    text: `Start at column ${colLetter}. Move down to row ${target.row}.`,
                    explanation: `Column ${colLetter} and row ${target.row} meet at ${colLetter}${target.row}.`
                },
                {
                    variant: 'number-letter',
                    text: `Use A=1, B=2. Row is ${target.row}, column number is ${target.col}.`,
                    explanation: `Column number ${target.col} maps to ${colLetter}, so the answer is ${colLetter}${target.row}.`
                }
            ];

            return choice(options);
        }

        const rowEquation = numberExpression(target.row);
        const colEquation = numberExpression(target.col);

        const logicOptions = [
            {
                variant: 'equation',
                text: `Map code puzzle: row = ${rowEquation} and column number = ${colEquation} (A=1).`,
                explanation: `The equations give row ${target.row} and column number ${target.col}, so the spot is ${colLetter}${target.row}.`
            },
            {
                variant: 'mixed-logic',
                text: `Treasure math: row is ${rowEquation}. Column letter is ${target.col}th in the alphabet on this map.`,
                explanation: `Row ${target.row} and column ${colLetter} intersect at ${colLetter}${target.row}.`
            }
        ];

        if (mode === 'easy') {
            return {
                variant: 'easy-boost',
                text: `Extra clue: row ${target.row}, then move to column ${colLetter}.`,
                explanation: `Row ${target.row} with column ${colLetter} gives ${colLetter}${target.row}.`
            };
        }

        return choice(logicOptions);
    }

    function createMapState() {
        const config = MODE_CONFIG[game.mode];
        const size = config.size;
        const tier = currentTier();
        const usedSet = game.usedByMode[game.mode];

        for (let attempt = 0; attempt < 700; attempt += 1) {
            const target = {
                row: randomInt(1, size),
                col: randomInt(1, size)
            };

            const clue = buildClue(game.mode, target, tier);
            const id = `${game.mode}|${tier}|${target.row}|${target.col}|${clue.variant}`;

            if (id === game.lastIdByMode[game.mode] || usedSet.has(id)) {
                continue;
            }

            usedSet.add(id);
            game.lastIdByMode[game.mode] = id;

            return {
                id,
                tier,
                size,
                target,
                clueText: clue.text,
                answerExplanation: clue.explanation,
                selectedKey: '',
                misses: new Set(),
                attempts: 0,
                hintStep: 0,
                solved: false,
                revealed: false,
                counted: false,
                hintText: 'Use hint if you get stuck.',
                resultText: '',
                resultType: '',
                explanationText: ''
            };
        }

        usedSet.clear();

        const target = {
            row: randomInt(1, size),
            col: randomInt(1, size)
        };
        const clue = buildClue(game.mode, target, tier);
        const id = `${game.mode}|fallback|${target.row}|${target.col}|${Date.now()}`;
        game.lastIdByMode[game.mode] = id;

        return {
            id,
            tier,
            size,
            target,
            clueText: clue.text,
            answerExplanation: clue.explanation,
            selectedKey: '',
            misses: new Set(),
            attempts: 0,
            hintStep: 0,
            solved: false,
            revealed: false,
            counted: false,
            hintText: 'Use hint if you get stuck.',
            resultText: '',
            resultType: '',
            explanationText: ''
        };
    }

    function currentMap() {
        return game.maps[game.currentIndex] || null;
    }

    function ensureMapAt(index) {
        while (game.maps.length <= index) {
            const mapState = createMapState();
            if (!mapState) {
                return false;
            }
            game.maps.push(mapState);
        }
        return true;
    }

    function updateModeButtons() {
        modeButtons.forEach((button) => {
            const active = button.dataset.mode === game.mode;
            button.classList.toggle('active', active);
            button.setAttribute('aria-selected', String(active));
        });
    }

    function renderStats() {
        const map = currentMap();
        if (!map) {
            return;
        }

        if (scoreValue) scoreValue.textContent = String(game.score);
        if (levelValue) levelValue.textContent = String(map.tier);
        if (solvedValue) solvedValue.textContent = String(game.solvedCount);
        if (streakValue) streakValue.textContent = String(game.streak);
        if (hintsValue) hintsValue.textContent = String(game.hintsUsed);

        const attemptsLeft = Math.max(0, MAX_ATTEMPTS - map.attempts);
        if (attemptsValue) attemptsValue.textContent = String(attemptsLeft);

        if (mapCounter) {
            mapCounter.textContent = `Map ${game.currentIndex + 1}`;
        }

        if (prevButton) {
            prevButton.disabled = game.currentIndex === 0;
        }

        if (checkButton) {
            checkButton.disabled = map.solved || map.revealed;
        }
    }

    function renderMessages() {
        const map = currentMap();
        if (!map) {
            return;
        }

        if (clueElement) {
            clueElement.textContent = map.clueText;
        }

        if (hintMessage) {
            hintMessage.textContent = map.hintText || 'Use hint if you get stuck.';
            hintMessage.className = 'hint-message';
            if (map.hintText && map.hintText.toLowerCase().includes('great')) {
                hintMessage.classList.add('good');
            }
            if (map.hintText && map.hintText.toLowerCase().includes('no more')) {
                hintMessage.classList.add('warn');
            }
        }

        if (resultMessage) {
            resultMessage.textContent = map.resultText || 'Select one tile and press check.';
            resultMessage.className = 'result-message';

            if (map.resultType === 'success') {
                resultMessage.classList.add('success');
            }

            if (map.resultType === 'error') {
                resultMessage.classList.add('error');
            }
        }

        if (explanationMessage) {
            explanationMessage.textContent = map.explanationText || 'Why this answer will appear here if you solve or reveal the map.';
        }
    }

    function createBoardLabel(text, extraClass = '') {
        const label = document.createElement('div');
        label.className = `grid-label ${extraClass}`.trim();
        label.textContent = text;
        return label;
    }

    function fitGridToStage(size) {
        if (!gridBoard) {
            return;
        }

        const columns = size + 1;
        const rows = size + 1;
        const rect = gridBoard.getBoundingClientRect();

        if (!rect.width || !rect.height) {
            return;
        }

        const boardPadding = 8; // 4px top + 4px bottom
        const gapPx = 5;
        const widthForCells = rect.width - boardPadding - (columns - 1) * gapPx;
        const heightForCells = rect.height - boardPadding - (rows - 1) * gapPx;

        const maxByWidth = widthForCells / columns;
        const maxByHeight = heightForCells / rows;
        const fit = Math.floor(Math.min(maxByWidth, maxByHeight));

        if (!Number.isFinite(fit)) {
            return;
        }

        const minCell = 24;
        const maxCell = 58;
        const nextCellSize = Math.max(minCell, Math.min(maxCell, fit));
        const liveGap = nextCellSize <= 30 ? 3 : nextCellSize <= 36 ? 4 : 5;

        gridBoard.style.setProperty('--gx-live-cell-size', `${nextCellSize}px`);
        gridBoard.style.setProperty('--gx-live-gap', `${liveGap}px`);
    }

    function selectTile(row, col) {
        const map = currentMap();
        if (!map || map.solved || map.revealed) {
            return;
        }

        const key = coordinateKey(row, col);
        if (map.misses.has(key)) {
            return;
        }

        map.selectedKey = key;
        map.resultText = '';
        map.resultType = '';
        map.explanationText = '';

        playSound('click');
        renderBoard();
        renderMessages();
    }

    function renderBoard() {
        const map = currentMap();
        if (!map || !gridBoard) {
            return;
        }

        const size = map.size;
        gridBoard.innerHTML = '';
        fitGridToStage(size);
        gridBoard.style.gridTemplateColumns = `repeat(${size + 1}, var(--gx-live-cell-size, var(--gx-cell-size)))`;

        gridBoard.appendChild(createBoardLabel('', 'corner'));

        for (let col = 1; col <= size; col += 1) {
            gridBoard.appendChild(createBoardLabel(letterFromColumn(col)));
        }

        const targetKey = coordinateKey(map.target.row, map.target.col);

        for (let row = 1; row <= size; row += 1) {
            gridBoard.appendChild(createBoardLabel(String(row)));

            for (let col = 1; col <= size; col += 1) {
                const key = coordinateKey(row, col);
                const cell = document.createElement('button');
                cell.type = 'button';
                cell.className = 'grid-cell';
                cell.setAttribute('role', 'gridcell');
                cell.setAttribute('aria-label', `Row ${row} Column ${letterFromColumn(col)}`);

                if (key === map.selectedKey && !map.solved && !map.revealed) {
                    cell.classList.add('selected');
                }

                if (map.misses.has(key)) {
                    cell.classList.add('miss');
                    cell.textContent = 'x';
                    cell.disabled = true;
                }

                if (map.solved && key === targetKey) {
                    cell.classList.add('found');
                    cell.textContent = 'G';
                    cell.disabled = true;
                }

                if (map.revealed && key === targetKey) {
                    cell.classList.add('revealed');
                    cell.textContent = 'G';
                    cell.disabled = true;
                }

                if (!cell.disabled) {
                    cell.addEventListener('click', () => {
                        selectTile(row, col);
                    });
                }

                gridBoard.appendChild(cell);
            }
        }

        // Re-run fit after DOM updates to avoid clipping on tight viewports.
        requestAnimationFrame(() => {
            fitGridToStage(size);
            gridBoard.style.gridTemplateColumns = `repeat(${size + 1}, var(--gx-live-cell-size, var(--gx-cell-size)))`;
        });
    }

    function buildDistanceHint(selected, target) {
        const rowDiff = target.row - selected.row;
        const colDiff = target.col - selected.col;
        const distance = Math.abs(rowDiff) + Math.abs(colDiff);

        let warmText = 'Far from the gem.';
        if (distance <= 2) {
            warmText = 'Super close!';
        } else if (distance <= 4) {
            warmText = 'Getting warmer.';
        }

        let directionText = '';

        if (rowDiff !== 0 && colDiff !== 0) {
            const vertical = rowDiff > 0 ? 'down' : 'up';
            const horizontal = colDiff > 0 ? 'right' : 'left';
            directionText = `Move ${Math.abs(rowDiff)} ${vertical} and ${Math.abs(colDiff)} ${horizontal}.`;
        } else if (rowDiff !== 0) {
            const vertical = rowDiff > 0 ? 'down' : 'up';
            directionText = `Move ${Math.abs(rowDiff)} ${vertical}.`;
        } else if (colDiff !== 0) {
            const horizontal = colDiff > 0 ? 'right' : 'left';
            directionText = `Move ${Math.abs(colDiff)} ${horizontal}.`;
        }

        return `${warmText} ${directionText}`.trim();
    }

    function checkCurrentSelection() {
        const map = currentMap();
        if (!map || map.solved || map.revealed) {
            return;
        }

        if (!map.selectedKey) {
            map.resultText = 'Pick one tile before checking.';
            map.resultType = 'error';
            map.explanationText = '';
            map.hintText = 'Tap any map tile, then press check.';
            renderMessages();
            playSound('error');
            return;
        }

        const targetKey = coordinateKey(map.target.row, map.target.col);

        if (map.selectedKey === targetKey) {
            map.solved = true;

            let earnedPoints = 0;
            if (!map.counted) {
                map.counted = true;
                game.solvedCount += 1;
                game.streak += 1;

                earnedPoints = Math.max(4, 14 - (map.attempts * 3) - (map.hintStep * 2) + ((map.tier - 1) * 2));
                game.score += earnedPoints;
            }

            map.resultText = `Great job! Gem found at ${coordinateLabel(map.target)}. +${earnedPoints} points.`;
            map.resultType = 'success';
            map.explanationText = `Why this answer: ${map.answerExplanation}`;
            map.hintText = 'Great solve. Use Next for a new map or Previous to review one.';

            playSound('success');
        } else {
            map.attempts += 1;
            map.misses.add(map.selectedKey);
            game.streak = 0;
            game.score = Math.max(0, game.score - 1);

            const selected = parseCoordinateKey(map.selectedKey);
            const target = map.target;

            if (map.attempts >= MAX_ATTEMPTS) {
                map.revealed = true;
                map.selectedKey = coordinateKey(target.row, target.col);
                map.resultText = `3 tries used. The correct tile is ${coordinateLabel(target)}.`;
                map.resultType = 'error';
                map.explanationText = `Why this answer: ${map.answerExplanation}`;
                map.hintText = 'Read the explanation, then tap Next when ready.';
                playSound('error');
            } else {
                const hint = buildDistanceHint(selected, target);
                const left = MAX_ATTEMPTS - map.attempts;
                map.resultText = `No gem there. ${hint}`;
                map.resultType = 'error';
                map.explanationText = '';
                map.hintText = `Attempts left: ${left}.`;
                playSound('error');
            }
        }

        renderBoard();
        renderMessages();
        renderStats();
    }

    function showHint() {
        const map = currentMap();
        if (!map) {
            return;
        }

        if (map.solved || map.revealed) {
            map.hintText = 'This map is complete. Tap Next for a new challenge.';
            map.resultType = map.resultType || '';
            renderMessages();
            return;
        }

        if (map.hintStep >= MAX_HINT_STEPS) {
            map.hintText = 'No more hints on this map.';
            renderMessages();
            return;
        }

        map.hintStep += 1;
        game.hintsUsed += 1;

        const colLetter = letterFromColumn(map.target.col);

        if (map.hintStep === 1) {
            map.hintText = `Hint: the gem is in row ${map.target.row}.`;
        } else if (map.hintStep === 2) {
            map.hintText = `Hint: the gem is in column ${colLetter}.`;
        } else {
            map.hintText = `Final hint: the exact tile is ${colLetter}${map.target.row}.`;
        }

        playSound('click');
        renderMessages();
        renderStats();
    }

    function resetCurrentMap() {
        const map = currentMap();
        if (!map) {
            return;
        }

        if (map.solved || map.revealed) {
            map.hintText = 'Map already finished. Use Next for a fresh map.';
            renderMessages();
            return;
        }

        map.selectedKey = '';
        map.misses.clear();
        map.attempts = 0;
        map.hintStep = 0;
        map.hintText = 'Map reset. Try the clue again.';
        map.resultText = 'Fresh start ready.';
        map.resultType = '';
        map.explanationText = '';

        playSound('click');
        renderBoard();
        renderMessages();
        renderStats();
    }

    function goToMap(index) {
        if (index < 0) {
            return;
        }

        if (!ensureMapAt(index)) {
            return;
        }

        game.currentIndex = index;
        renderAll();
    }

    function resetSession(mode) {
        game.mode = mode;
        game.maps = [];
        game.currentIndex = 0;
        game.solvedCount = 0;
        game.score = 0;
        game.streak = 0;
        game.hintsUsed = 0;
        game.usedByMode[mode].clear();
        game.lastIdByMode[mode] = '';

        ensureMapAt(0);
        renderAll();
    }

    function renderAll() {
        updateModeButtons();
        renderBoard();
        renderMessages();
        renderStats();
    }

    if (hintButton) {
        hintButton.addEventListener('click', showHint);
    }

    if (checkButton) {
        checkButton.addEventListener('click', checkCurrentSelection);
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetCurrentMap);
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            goToMap(game.currentIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            goToMap(game.currentIndex + 1);
        });
    }

    modeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            if (!mode || mode === game.mode || !MODE_CONFIG[mode]) {
                return;
            }

            resetSession(mode);
            playSound('click');
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkCurrentSelection();
        }
    });

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
            renderBoard();
        }, 80);
    });

    ensureMapAt(0);
    renderAll();
});
