window.DEBUG_MODE = false;

document.addEventListener('DOMContentLoaded', () => {
    const allWordSets = [
        ['APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'MELON'],
        ['DOG', 'CAT', 'BIRD', 'FISH', 'MOUSE'],
        ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PINK'],
        ['BOOK', 'LEARN', 'READ', 'STUDY', 'WRITE'],
        ['SUN', 'MOON', 'STAR', 'EARTH', 'SPACE'],
        ['JUMP', 'RUN', 'WALK', 'SWIM', 'SKIP'],
        ['TREE', 'FLOWER', 'PLANT', 'GRASS', 'BUSH'],
        ['MILK', 'WATER', 'JUICE', 'SODA', 'TEA'],
        ['HAPPY', 'SAD', 'ANGRY', 'SILLY', 'CALM'],
        ['SHIRT', 'PANTS', 'SOCKS', 'SHOES', 'HAT'],
        ['PLAY', 'GAME', 'FUN', 'TOY', 'BALL'],
        ['HOME', 'HOUSE', 'ROOF', 'DOOR', 'ROOM'],
        ['CAKE', 'CANDY', 'SWEET', 'COOKIE', 'PIE'],
        ['SMILE', 'LAUGH', 'GIGGLE', 'CHEER', 'JOY'],
        ['BEACH', 'SAND', 'SEA', 'WAVE', 'SHELL'],
        ['RAIN', 'SNOW', 'CLOUD', 'WIND', 'STORM'],
        ['SLEEP', 'DREAM', 'BED', 'REST', 'NAP'],
        ['GOOD', 'NICE', 'KIND', 'BRAVE', 'SMART'],
        ['BIG', 'SMALL', 'LARGE', 'TINY', 'HUGE'],
        ['LION', 'TIGER', 'BEAR', 'WOLF', 'FOX']
    ];

    const fallbackPool = [
        'CAT', 'DOG', 'SUN', 'STAR', 'TREE', 'FISH', 'BOOK', 'BALL', 'MOON', 'RAIN',
        'PLANT', 'SHELL', 'HOUSE', 'GRAPE', 'CLOUD', 'JUICE', 'SMILE', 'BRAVE', 'SMART'
    ];

    const profileMap = {
        easy: {
            label: 'Age 5-6',
            gridSize: 8,
            wordsPerPuzzle: 4,
            maxWordLength: 5,
            directions: ['horizontal'],
            hintsPerPuzzle: 3,
            pointsPerWord: 8,
            completionBonus: 20,
            hintPenalty: 2
        },
        medium: {
            label: 'Age 7-8',
            gridSize: 10,
            wordsPerPuzzle: 5,
            maxWordLength: 7,
            directions: ['horizontal', 'vertical'],
            hintsPerPuzzle: 2,
            pointsPerWord: 12,
            completionBonus: 30,
            hintPenalty: 3
        },
        hard: {
            label: 'Age 9-10',
            gridSize: 12,
            wordsPerPuzzle: 6,
            maxWordLength: 9,
            directions: ['horizontal', 'vertical', 'diagonalDown'],
            hintsPerPuzzle: 1,
            pointsPerWord: 16,
            completionBonus: 45,
            hintPenalty: 5
        }
    };

    const directionStep = {
        horizontal: [0, 1],
        vertical: [1, 0],
        diagonalDown: [1, 1]
    };

    const letterGrid = document.getElementById('letter-grid');
    const gridStage = document.getElementById('grid-stage');
    const wordList = document.getElementById('word-list');
    const submitButton = document.getElementById('submit-answer');
    const skipButton = document.getElementById('skip-puzzle');
    const hintButton = document.getElementById('hint-btn');
    const repeatWordButton = document.getElementById('repeat-word-btn');
    const hintMessage = document.getElementById('hint-message');
    const resultMessage = document.getElementById('result-message');
    const currentPuzzleDisplay = document.getElementById('current-puzzle');
    const totalPuzzlesDisplay = document.getElementById('total-puzzles');
    const modeButtons = Array.from(document.querySelectorAll('.mode-btn'));
    const scoreValue = document.getElementById('score-value');
    const streakValue = document.getElementById('streak-value');
    const hintsValue = document.getElementById('hints-value');

    let currentMode = 'medium';
    let profile = profileMap[currentMode];
    let puzzles = [];
    let currentPuzzleIndex = 0;

    let selectedCells = [];
    let foundWords = new Set();
    let score = 0;
    let streak = 0;
    let hintsLeft = profile.hintsPerPuzzle;
    let hintsUsedThisPuzzle = 0;
    let lastSpokenWord = '';

    function playSound(type) {
        if (!window.SoundEffects) return;
        if (type === 'success' && typeof SoundEffects.playSuccessSound === 'function') {
            SoundEffects.playSuccessSound();
        } else if (type === 'error' && typeof SoundEffects.playErrorSound === 'function') {
            SoundEffects.playErrorSound();
        } else if (typeof SoundEffects.playClickSound === 'function') {
            SoundEffects.playClickSound();
        }
    }

    function speakWord(word) {
        if (!word || typeof window.speechSynthesis === 'undefined') {
            return false;
        }

        try {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            utterance.pitch = 1.05;
            window.speechSynthesis.speak(utterance);
            return true;
        } catch (_) {
            return false;
        }
    }

    function showFeedback(type, text) {
        if (!window.FeedbackSystem) {
            resultMessage.textContent = text;
            resultMessage.className = `result ${type}`;
            return;
        }

        if (type === 'success' && typeof FeedbackSystem.showSuccess === 'function') {
            FeedbackSystem.showSuccess(text);
        } else if (type === 'error' && typeof FeedbackSystem.showError === 'function') {
            FeedbackSystem.showError(text);
        } else if (typeof FeedbackSystem.showClick === 'function') {
            FeedbackSystem.showClick(text);
        }
    }

    function shuffle(items) {
        const copy = [...items];
        for (let i = copy.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function createEmptyGrid(size) {
        return Array.from({ length: size }, () => Array(size).fill('.'));
    }

    function inBounds(row, col, size) {
        return row >= 0 && col >= 0 && row < size && col < size;
    }

    function tryPlaceWord(grid, word, direction, startRow, startCol, size) {
        const [dr, dc] = directionStep[direction];
        const testGrid = grid.map((row) => [...row]);

        for (let i = 0; i < word.length; i += 1) {
            const row = startRow + dr * i;
            const col = startCol + dc * i;
            if (!inBounds(row, col, size)) {
                return null;
            }
            const existing = testGrid[row][col];
            if (existing !== '.' && existing !== word[i]) {
                return null;
            }
        }

        for (let i = 0; i < word.length; i += 1) {
            const row = startRow + dr * i;
            const col = startCol + dc * i;
            testGrid[row][col] = word[i];
        }

        return {
            grid: testGrid,
            direction,
            startRow,
            startCol,
            endRow: startRow + dr * (word.length - 1),
            endCol: startCol + dc * (word.length - 1)
        };
    }

    function findPlacements(grid, word, directions, size) {
        const placements = [];
        for (let row = 0; row < size; row += 1) {
            for (let col = 0; col < size; col += 1) {
                directions.forEach((direction) => {
                    const placed = tryPlaceWord(grid, word, direction, row, col, size);
                    if (placed) {
                        placements.push(placed);
                    }
                });
            }
        }
        return placements;
    }

    function buildPuzzleFromWords(words) {
        const size = profile.gridSize;
        const selectedWords = shuffle(words)
            .map((word) => word.toUpperCase())
            .filter((word) => word.length <= profile.maxWordLength)
            .slice(0, profile.wordsPerPuzzle)
            .sort((a, b) => b.length - a.length);

        if (selectedWords.length < Math.max(3, profile.wordsPerPuzzle - 1)) {
            return null;
        }

        let grid = createEmptyGrid(size);
        const wordPositions = [];

        for (const word of selectedWords) {
            const options = findPlacements(grid, word, profile.directions, size);
            if (options.length === 0) {
                return null;
            }

            const chosen = options[Math.floor(Math.random() * options.length)];
            grid = chosen.grid;
            wordPositions.push({
                word,
                direction: chosen.direction,
                startRow: chosen.startRow,
                startCol: chosen.startCol,
                endRow: chosen.endRow,
                endCol: chosen.endCol
            });
        }

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let row = 0; row < size; row += 1) {
            for (let col = 0; col < size; col += 1) {
                if (grid[row][col] === '.') {
                    grid[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
                }
            }
        }

        return {
            grid,
            size,
            words: wordPositions.map((entry) => entry.word),
            wordPositions
        };
    }

    function createPuzzleFromSet(wordSet) {
        const prepared = [...new Set(wordSet.map((word) => word.toUpperCase()))];
        const needed = Math.max(0, profile.wordsPerPuzzle - prepared.length);
        const fallbackWords = shuffle(fallbackPool)
            .filter((word) => !prepared.includes(word))
            .slice(0, needed);

        const combined = [...prepared, ...fallbackWords];

        for (let attempt = 0; attempt < 10; attempt += 1) {
            const puzzle = buildPuzzleFromWords(combined);
            if (puzzle) {
                return puzzle;
            }
        }
        return null;
    }

    function buildPuzzleBank() {
        const built = allWordSets
            .map((set) => createPuzzleFromSet(set))
            .filter(Boolean);

        if (built.length > 0) {
            return built;
        }

        const emergency = createPuzzleFromSet(fallbackPool);
        return emergency ? [emergency] : [];
    }

    function directionLabel(direction) {
        if (direction === 'horizontal') return '→';
        if (direction === 'vertical') return '↓';
        return '↘';
    }

    function updateHud() {
        scoreValue.textContent = String(score);
        streakValue.textContent = String(streak);
        hintsValue.textContent = String(hintsLeft);
        if (repeatWordButton) {
            repeatWordButton.disabled = !lastSpokenWord;
        }
    }

    function fitGridToStage(size) {
        if (!letterGrid || !gridStage || !size) {
            return;
        }

        const stageRect = gridStage.getBoundingClientRect();
        if (!stageRect.width || !stageRect.height) {
            return;
        }

        const stagePadding = 16; // 8px top + 8px bottom
        const maxGap = 3;
        const minGap = 2;

        const availableWidth = stageRect.width - stagePadding;
        const availableHeight = stageRect.height - stagePadding;
        const gap = size >= 12 ? minGap : maxGap;
        const cell = Math.floor(Math.min(
            (availableWidth - (size - 1) * gap) / size,
            (availableHeight - (size - 1) * gap) / size
        ));

        const safeCell = Math.max(16, Math.min(48, cell));
        letterGrid.style.setProperty('--wh-cell-size', `${safeCell}px`);
        letterGrid.style.setProperty('--wh-gap', `${gap}px`);
    }

    function clearSelectionVisuals(withShake) {
        selectedCells.forEach((cell) => {
            if (withShake) {
                cell.classList.add('shake');
                window.setTimeout(() => cell.classList.remove('shake'), 360);
            }
            cell.classList.remove('selected');
        });
        selectedCells = [];
    }

    function setupPuzzle() {
        if (!puzzles.length) {
            resultMessage.textContent = 'Unable to load puzzles for this mode.';
            resultMessage.className = 'result error';
            return;
        }

        const puzzle = puzzles[currentPuzzleIndex];
        foundWords = new Set();
        selectedCells = [];
        hintsLeft = profile.hintsPerPuzzle;
        hintsUsedThisPuzzle = 0;
        lastSpokenWord = '';

        currentPuzzleDisplay.textContent = String(currentPuzzleIndex + 1);
        totalPuzzlesDisplay.textContent = String(puzzles.length);

        letterGrid.innerHTML = '';
        wordList.innerHTML = '';
        letterGrid.style.setProperty('--grid-size', String(puzzle.size));
        letterGrid.style.setProperty('--cell-font', puzzle.size >= 12 ? '0.82rem' : puzzle.size >= 10 ? '0.95rem' : '1.08rem');
        fitGridToStage(puzzle.size);

        for (let row = 0; row < puzzle.size; row += 1) {
            for (let col = 0; col < puzzle.size; col += 1) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = String(row);
                cell.dataset.col = String(col);
                cell.id = `cell-${row}-${col}`;
                cell.textContent = puzzle.grid[row][col];
                cell.addEventListener('click', () => {
                    if (cell.classList.contains('found-cell')) {
                        return;
                    }

                    if (cell.classList.contains('selected')) {
                        cell.classList.remove('selected');
                        selectedCells = selectedCells.filter((selected) => selected !== cell);
                    } else {
                        cell.classList.add('selected');
                        selectedCells.push(cell);
                    }
                    playSound('click');
                });
                letterGrid.appendChild(cell);
            }
        }

        window.requestAnimationFrame(() => {
            fitGridToStage(puzzle.size);
        });

        puzzle.wordPositions.forEach((wordPos) => {
            const item = document.createElement('div');
            item.className = 'word-item';
            item.dataset.word = wordPos.word;
            item.textContent = wordPos.word;

            if (currentMode !== 'hard') {
                const hintTag = document.createElement('span');
                hintTag.className = 'direction-hint';
                hintTag.textContent = ` ${directionLabel(wordPos.direction)}`;
                item.appendChild(hintTag);
            }

            wordList.appendChild(item);
        });

        hintMessage.textContent = `${profile.label} mode ready. Find all hidden words.`;
        hintMessage.className = 'hint-message';
        resultMessage.textContent = '';
        resultMessage.className = 'result';
        updateHud();
    }

    function normalizeSelection() {
        if (selectedCells.length <= 1) {
            return {
                valid: selectedCells.length === 1,
                ordered: [...selectedCells],
                direction: 'single'
            };
        }

        const positions = selectedCells.map((cell) => ({
            cell,
            row: Number(cell.dataset.row),
            col: Number(cell.dataset.col)
        }));

        const sameRow = positions.every((pos) => pos.row === positions[0].row);
        if (sameRow) {
            const ordered = [...positions].sort((a, b) => a.col - b.col);
            const consecutive = ordered.every((pos, index) =>
                index === 0 || pos.col === ordered[index - 1].col + 1
            );
            if (!consecutive) return { valid: false };
            return { valid: true, ordered: ordered.map((pos) => pos.cell), direction: 'horizontal' };
        }

        const sameCol = positions.every((pos) => pos.col === positions[0].col);
        if (sameCol) {
            const ordered = [...positions].sort((a, b) => a.row - b.row);
            const consecutive = ordered.every((pos, index) =>
                index === 0 || pos.row === ordered[index - 1].row + 1
            );
            if (!consecutive) return { valid: false };
            return { valid: true, ordered: ordered.map((pos) => pos.cell), direction: 'vertical' };
        }

        const sameDiagonal = positions.every((pos) => pos.row - pos.col === positions[0].row - positions[0].col);
        if (sameDiagonal) {
            const ordered = [...positions].sort((a, b) => a.row - b.row);
            const consecutive = ordered.every((pos, index) =>
                index === 0 || (pos.row === ordered[index - 1].row + 1 && pos.col === ordered[index - 1].col + 1)
            );
            if (!consecutive) return { valid: false };
            return { valid: true, ordered: ordered.map((pos) => pos.cell), direction: 'diagonalDown' };
        }

        return { valid: false };
    }

    function allWordsFound() {
        const puzzle = puzzles[currentPuzzleIndex];
        return foundWords.size === puzzle.words.length;
    }

    function markWordFound(word, orderedCells) {
        foundWords.add(word);
        const item = wordList.querySelector(`.word-item[data-word="${word}"]`);
        if (item) {
            item.classList.add('found');
        }

        orderedCells.forEach((cell) => {
            cell.classList.remove('selected');
            cell.classList.add('found-cell');
        });

        const wordPoints = profile.pointsPerWord;
        score += wordPoints;
        updateHud();
        clearSelectionVisuals(false);
    }

    function submitSelection() {
        if (selectedCells.length === 0) {
            playSound('error');
            showFeedback('error', 'Select letters first.');
            resultMessage.textContent = 'Select letters first.';
            resultMessage.className = 'result error';
            return;
        }

        const normalized = normalizeSelection();
        if (!normalized.valid) {
            playSound('error');
            showFeedback('error', 'Letters must be consecutive in one line.');
            resultMessage.textContent = 'Letters must be consecutive in one line.';
            resultMessage.className = 'result error';
            clearSelectionVisuals(true);
            return;
        }

        const forwardWord = normalized.ordered.map((cell) => cell.textContent).join('');
        const backwardWord = forwardWord.split('').reverse().join('');
        const puzzle = puzzles[currentPuzzleIndex];

        const match = puzzle.words.find((word) => !foundWords.has(word) && (word === forwardWord || word === backwardWord));
        if (!match) {
            playSound('error');
            showFeedback('error', 'That word is not in this list.');
            resultMessage.textContent = 'That word is not in this list.';
            resultMessage.className = 'result error';
            streak = 0;
            updateHud();
            clearSelectionVisuals(true);
            return;
        }

        playSound('success');
        showFeedback('success', `Great. You found ${match}.`);
        resultMessage.textContent = `Great. You found ${match}.`;
        resultMessage.className = 'result success';
        lastSpokenWord = match;
        speakWord(lastSpokenWord);
        updateHud();

        markWordFound(match, normalized.ordered);

        if (allWordsFound()) {
            streak += 1;
            const bonus = Math.max(0, profile.completionBonus - (hintsUsedThisPuzzle * profile.hintPenalty));
            score += bonus;
            updateHud();
            hintMessage.textContent = `Puzzle cleared. Bonus +${bonus}. Moving to the next puzzle.`;
            hintMessage.className = 'hint-message good';
            window.setTimeout(() => {
                currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
                setupPuzzle();
            }, 1500);
        }
    }

    function skipPuzzle() {
        streak = 0;
        updateHud();
        resultMessage.textContent = 'Skipped. Loading next puzzle...';
        resultMessage.className = 'result';
        currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
        playSound('click');
        window.setTimeout(setupPuzzle, 420);
    }

    function useHint() {
        if (hintsLeft <= 0) {
            playSound('error');
            hintMessage.textContent = 'No hints left for this puzzle.';
            hintMessage.className = 'hint-message warn';
            return;
        }

        const puzzle = puzzles[currentPuzzleIndex];
        const target = puzzle.wordPositions.find((position) => !foundWords.has(position.word));
        if (!target) {
            hintMessage.textContent = 'All words found. Great work.';
            hintMessage.className = 'hint-message good';
            return;
        }

        hintsLeft -= 1;
        hintsUsedThisPuzzle += 1;
        score = Math.max(0, score - profile.hintPenalty);
        updateHud();

        const hintCell = document.getElementById(`cell-${target.startRow}-${target.startCol}`);
        if (hintCell) {
            hintCell.classList.add('hint-cell');
            window.setTimeout(() => hintCell.classList.remove('hint-cell'), 1200);
        }

        if (currentMode === 'easy') {
            hintMessage.textContent = `${target.word} starts at row ${target.startRow + 1}, column ${target.startCol + 1}.`;
        } else if (currentMode === 'medium') {
            hintMessage.textContent = `${target.word} starts near row ${target.startRow + 1}. Direction: ${directionLabel(target.direction)}.`;
        } else {
            hintMessage.textContent = `Highlighted first letter for one hidden word.`;
        }

        hintMessage.className = 'hint-message';
        playSound('click');
    }

    function switchMode(mode) {
        if (!profileMap[mode]) return;

        currentMode = mode;
        profile = profileMap[mode];
        puzzles = buildPuzzleBank();
        currentPuzzleIndex = 0;

        selectedCells = [];
        foundWords = new Set();
        score = 0;
        streak = 0;
        lastSpokenWord = '';

        modeButtons.forEach((button) => {
            button.classList.toggle('active', button.dataset.mode === mode);
            button.setAttribute('aria-selected', button.dataset.mode === mode ? 'true' : 'false');
        });

        setupPuzzle();
    }

    submitButton.addEventListener('click', submitSelection);
    skipButton.addEventListener('click', skipPuzzle);
    hintButton.addEventListener('click', useHint);
    if (repeatWordButton) {
        repeatWordButton.addEventListener('click', () => {
            if (!lastSpokenWord) {
                hintMessage.textContent = 'Find one word first to use repeat voice.';
                hintMessage.className = 'hint-message warn';
                playSound('error');
                return;
            }

            const spoken = speakWord(lastSpokenWord);
            if (spoken) {
                hintMessage.textContent = `Repeating word: ${lastSpokenWord}`;
                hintMessage.className = 'hint-message good';
                playSound('click');
            } else {
                hintMessage.textContent = 'Voice is not supported on this browser.';
                hintMessage.className = 'hint-message warn';
            }
        });
    }

    modeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.dataset.mode === currentMode) return;
            switchMode(button.dataset.mode);
            playSound('click');
        });
    });

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
            const puzzle = puzzles[currentPuzzleIndex];
            if (puzzle) {
                fitGridToStage(puzzle.size);
            }
        }, 80);
    });

    switchMode('medium');
});
