document.addEventListener('DOMContentLoaded', () => {
    const MODE_CONFIG = {
        easy: { label: 'Age 5-6', tierCap: 2 },
        medium: { label: 'Age 7-8', tierCap: 3 },
        hard: { label: 'Age 9-10', tierCap: 3 }
    };

    const MAX_ATTEMPTS = 3;
    const MAX_HINT_STEPS = 3;

    const WORD_BANK = {
        easy: {
            1: [
                { word: 'CAT', clue: 'A pet that says meow.' },
                { word: 'DOG', clue: 'A pet that says woof.' },
                { word: 'SUN', clue: 'It shines bright in daytime.' },
                { word: 'CAR', clue: 'A road vehicle with wheels.' },
                { word: 'PEN', clue: 'Used for writing letters.' },
                { word: 'HAT', clue: 'You wear it on your head.' },
                { word: 'CUP', clue: 'You drink juice from it.' },
                { word: 'MAP', clue: 'Helps you find places.' },
                { word: 'BOX', clue: 'A container for toys.' },
                { word: 'TOY', clue: 'A fun thing to play with.' },
                { word: 'BUS', clue: 'Kids ride this to school.' },
                { word: 'BED', clue: 'You sleep on it at night.' },
                { word: 'RUN', clue: 'Move quickly with your legs.' },
                { word: 'NET', clue: 'Can catch fish or balls.' },
                { word: 'BEE', clue: 'A tiny insect that makes honey.' }
            ],
            2: [
                { word: 'BOOK', clue: 'It has pages and stories.' },
                { word: 'TREE', clue: 'Tall plant with leaves.' },
                { word: 'FISH', clue: 'Swims in water.' },
                { word: 'MOON', clue: 'Seen in the night sky.' },
                { word: 'STAR', clue: 'A twinkly light in the sky.' },
                { word: 'CAKE', clue: 'A sweet birthday treat.' },
                { word: 'GAME', clue: 'Play this for fun.' },
                { word: 'BIRD', clue: 'Animal with wings and feathers.' },
                { word: 'BALL', clue: 'A round toy for sports.' },
                { word: 'SHIP', clue: 'A big boat on water.' },
                { word: 'RAIN', clue: 'Water drops from clouds.' },
                { word: 'FROG', clue: 'Green jumper near ponds.' },
                { word: 'MILK', clue: 'A white healthy drink.' },
                { word: 'BELL', clue: 'It rings loudly.' },
                { word: 'KING', clue: 'Wears a crown.' }
            ]
        },
        medium: {
            1: [
                { word: 'MATH', clue: 'Subject with numbers and sums.' },
                { word: 'PLAY', clue: 'Kids love to do this.' },
                { word: 'WAVE', clue: 'Water motion in the sea.' },
                { word: 'JUMP', clue: 'Go up quickly from the ground.' },
                { word: 'LAMP', clue: 'Gives light in a room.' },
                { word: 'DOOR', clue: 'You open this to enter.' },
                { word: 'BIKE', clue: 'Two-wheel ride with pedals.' },
                { word: 'WIND', clue: 'Moving air.' },
                { word: 'PARK', clue: 'Place to play outside.' },
                { word: 'CODE', clue: 'Instructions for computers.' },
                { word: 'RING', clue: 'A small circle or phone sound.' },
                { word: 'SNOW', clue: 'Cold white flakes from sky.' },
                { word: 'CLOUD', clue: 'White shape floating in the sky.' }
            ],
            2: [
                { word: 'ROBOT', clue: 'A machine helper.' },
                { word: 'SPACE', clue: 'Where planets and stars are.' },
                { word: 'MUSIC', clue: 'Rhythm and songs.' },
                { word: 'APPLE', clue: 'A red or green fruit.' },
                { word: 'TRAIN', clue: 'Long vehicle on rails.' },
                { word: 'RIVER', clue: 'Long flowing water.' },
                { word: 'TIGER', clue: 'Striped wild cat.' },
                { word: 'LIGHT', clue: 'Helps you see.' },
                { word: 'BRUSH', clue: 'Used for hair or paint.' },
                { word: 'DANCE', clue: 'Move your body to music.' },
                { word: 'MAGIC', clue: 'Feels like cool tricks.' },
                { word: 'PLANT', clue: 'Living green thing that grows.' },
                { word: 'SMILE', clue: 'Happy face expression.' }
            ],
            3: [
                { word: 'WORLD', clue: 'The Earth and all its places.' },
                { word: 'BRAIN', clue: 'Part of body used for thinking.' },
                { word: 'DEBUG', clue: 'Fixing errors in code.' },
                { word: 'LOGIC', clue: 'Clear thinking with rules.' },
                { word: 'PIXEL', clue: 'A tiny dot in digital images.' },
                { word: 'QUEST', clue: 'A mission or adventure.' },
                { word: 'SHAPE', clue: 'Circle, square, and more.' },
                { word: 'INPUT', clue: 'Data entered into a program.' },
                { word: 'CLICK', clue: 'Mouse action on a button.' },
                { word: 'COLOR', clue: 'Red, blue, green and more.' },
                { word: 'STORY', clue: 'A tale you read or hear.' },
                { word: 'STACK', clue: 'Items piled one above another.' }
            ]
        },
        hard: {
            1: [
                { word: 'BLOCK', clue: 'A coding piece snapped in place.' },
                { word: 'ALPHA', clue: 'The first letter group starter.' },
                { word: 'CHESS', clue: 'A strategic board game.' },
                { word: 'STORM', clue: 'Strong weather with heavy wind.' },
                { word: 'SCORE', clue: 'Points in a game.' },
                { word: 'MATCH', clue: 'A game contest.' },
                { word: 'SPARK', clue: 'A tiny flash of light.' },
                { word: 'BRAVE', clue: 'Not scared in tough moments.' },
                { word: 'TRACE', clue: 'Follow the path of something.' },
                { word: 'GLOVE', clue: 'Wear this on your hand.' }
            ],
            2: [
                { word: 'PUZZLE', clue: 'A challenge to solve.' },
                { word: 'CODING', clue: 'Writing computer instructions.' },
                { word: 'NUMBER', clue: 'Digit value used in math.' },
                { word: 'PLANET', clue: 'Large world in space.' },
                { word: 'ORANGE', clue: 'A fruit and also a color.' },
                { word: 'ROCKET', clue: 'Vehicle that can fly to space.' },
                { word: 'BUTTON', clue: 'Click this on a screen.' },
                { word: 'BINARY', clue: 'Code language made of 0 and 1.' },
                { word: 'DRAGON', clue: 'A mythical flying creature.' },
                { word: 'NATURE', clue: 'Plants, animals, and outdoors.' },
                { word: 'FRIEND', clue: 'A person who cares about you.' }
            ],
            3: [
                { word: 'SCRIPT', clue: 'A piece of program code.' },
                { word: 'METHOD', clue: 'A defined way to do something.' },
                { word: 'OBJECT', clue: 'An item with properties in code.' },
                { word: 'MEMORY', clue: 'Where data is stored in a system.' },
                { word: 'VECTOR', clue: 'A direction and magnitude quantity.' },
                { word: 'SIGNAL', clue: 'A message sent from one point to another.' },
                { word: 'CIPHER', clue: 'A secret encoding method.' },
                { word: 'TUNNEL', clue: 'A passage through or under land.' },
                { word: 'LADDER', clue: 'Used to climb up.' },
                { word: 'SUNSET', clue: 'When sun goes down.' },
                { word: 'FLOWER', clue: 'Colorful blooming plant part.' }
            ]
        }
    };

    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const wordClue = document.getElementById('word-clue');
    const binaryWord = document.getElementById('binary-word');
    const answerBoxes = document.getElementById('answer-boxes');
    const letterBank = document.getElementById('letter-bank');
    const referenceGrid = document.getElementById('reference-grid');

    const scoreValue = document.getElementById('score-value');
    const levelValue = document.getElementById('level-value');
    const solvedValue = document.getElementById('solved-value');
    const streakValue = document.getElementById('streak-value');
    const hintsValue = document.getElementById('hints-value');
    const attemptsValue = document.getElementById('attempts-value');

    const hintMessage = document.getElementById('hint-message');
    const resultMessage = document.getElementById('decoder-result');
    const explanationMessage = document.getElementById('decoder-explanation');
    const decoderStamp = document.getElementById('decoder-stamp');

    const hintButton = document.getElementById('hint-btn');
    const speakButton = document.getElementById('speak-btn');
    const prevButton = document.getElementById('decoder-prev');
    const resetButton = document.getElementById('decoder-reset');
    const checkButton = document.getElementById('decoder-check');
    const nextButton = document.getElementById('decoder-next');
    const modeButtons = Array.from(document.querySelectorAll('.mode-btn'));

    const game = {
        mode: 'medium',
        rounds: [],
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
        lastWordByMode: {
            easy: '',
            medium: '',
            hard: ''
        }
    };

    function playSound(type) {
        const version = 'v1';
        const pathMap = {
            success: `../sounds/tick.mp3?${version}`,
            error: `../sounds/cross.mp3?${version}`,
            click: `../sounds/click.mp3?${version}`
        };

        const src = pathMap[type];
        if (!src) return;

        try {
            const audio = new Audio(src);
            audio.volume = 0.7;
            audio.play().catch(() => {});
        } catch (_) {
            // Audio is optional.
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

    function toBinary(letter) {
        return letter.charCodeAt(0).toString(2).padStart(8, '0');
    }

    function currentTier() {
        const cap = MODE_CONFIG[game.mode].tierCap;
        if (game.solvedCount < 4) return 1;
        if (game.solvedCount < 10) return Math.min(2, cap);
        return cap;
    }

    function poolForModeAndTier(mode, tier) {
        const modeBank = WORD_BANK[mode] || {};
        if (modeBank[tier] && modeBank[tier].length > 0) {
            return modeBank[tier];
        }

        const fallback = [];
        Object.values(modeBank).forEach((list) => {
            fallback.push(...list);
        });

        return fallback;
    }

    function createExplanation(word) {
        const segments = word
            .split('')
            .map((letter) => `${toBinary(letter)} = ${letter}`)
            .join(' | ');

        return `Why this answer: ${segments}`;
    }

    function buildChoiceLetters(word) {
        const letters = new Set(word.split(''));

        while (letters.size < Math.max(10, word.length + 3)) {
            const randomLetter = ALPHABET[randomInt(0, ALPHABET.length - 1)];
            letters.add(randomLetter);
        }

        return shuffleArray(Array.from(letters));
    }

    function createRoundState() {
        const tier = currentTier();
        const pool = poolForModeAndTier(game.mode, tier);
        const usedSet = game.usedByMode[game.mode];

        const freshCandidates = pool.filter((entry) => !usedSet.has(entry.word) && entry.word !== game.lastWordByMode[game.mode]);
        const candidates = freshCandidates.length > 0 ? freshCandidates : pool.filter((entry) => entry.word !== game.lastWordByMode[game.mode]);

        if (freshCandidates.length === 0) {
            usedSet.clear();
        }

        const selected = candidates[randomInt(0, candidates.length - 1)] || pool[randomInt(0, pool.length - 1)];
        if (!selected) {
            return null;
        }

        usedSet.add(selected.word);
        game.lastWordByMode[game.mode] = selected.word;

        return {
            id: `${game.mode}|${tier}|${selected.word}`,
            tier,
            word: selected.word,
            clue: selected.clue,
            binary: selected.word.split('').map(toBinary),
            inputLetters: Array(selected.word.length).fill(''),
            choiceLetters: buildChoiceLetters(selected.word),
            activeIndex: 0,
            attempts: 0,
            hintStep: 0,
            solved: false,
            revealed: false,
            counted: false,
            spoken: false,
            hintText: '',
            resultText: '',
            resultType: '',
            explanationText: ''
        };
    }

    function currentRound() {
        return game.rounds[game.currentIndex] || null;
    }

    function ensureRoundAt(index) {
        while (game.rounds.length <= index) {
            const round = createRoundState();
            if (!round) {
                return false;
            }
            game.rounds.push(round);
        }
        return true;
    }

    function setInputAt(index, value) {
        const round = currentRound();
        if (!round || round.solved || round.revealed) {
            return;
        }

        if (index < 0 || index >= round.inputLetters.length) {
            return;
        }

        const clean = (value || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 1);
        round.inputLetters[index] = clean;

        if (clean) {
            for (let i = index + 1; i < round.inputLetters.length; i += 1) {
                if (!round.inputLetters[i]) {
                    round.activeIndex = i;
                    renderAnswerBoxes();
                    return;
                }
            }
        }

        round.activeIndex = Math.min(index, round.inputLetters.length - 1);
        renderAnswerBoxes();
    }

    function removeLetter() {
        const round = currentRound();
        if (!round || round.solved || round.revealed) {
            return;
        }

        let index = round.activeIndex;
        if (index >= round.inputLetters.length) {
            index = round.inputLetters.length - 1;
        }

        if (round.inputLetters[index]) {
            round.inputLetters[index] = '';
            renderAnswerBoxes();
            return;
        }

        for (let i = index - 1; i >= 0; i -= 1) {
            if (round.inputLetters[i]) {
                round.inputLetters[i] = '';
                round.activeIndex = i;
                break;
            }
        }

        renderAnswerBoxes();
    }

    function fillFromLetterBank(letter) {
        const round = currentRound();
        if (!round || round.solved || round.revealed) {
            return;
        }

        let targetIndex = round.activeIndex;

        if (round.inputLetters[targetIndex]) {
            targetIndex = round.inputLetters.findIndex((entry) => !entry);
            if (targetIndex === -1) {
                targetIndex = round.inputLetters.length - 1;
            }
        }

        round.inputLetters[targetIndex] = letter;

        const nextEmpty = round.inputLetters.findIndex((entry, idx) => idx > targetIndex && !entry);
        if (nextEmpty !== -1) {
            round.activeIndex = nextEmpty;
        } else {
            round.activeIndex = Math.min(targetIndex + 1, round.inputLetters.length - 1);
        }

        playSound('click');
        renderAnswerBoxes();
    }

    function highlightMistakes(correctWord) {
        const inputs = answerBoxes.querySelectorAll('.answer-box');
        inputs.forEach((input, index) => {
            input.classList.remove('correct', 'wrong', 'revealed');
            const guess = (input.value || '').toUpperCase();
            if (!guess) {
                input.classList.add('wrong');
                return;
            }

            if (guess === correctWord[index]) {
                input.classList.add('correct');
            } else {
                input.classList.add('wrong');
            }
        });
    }

    function clearInputHighlight() {
        const inputs = answerBoxes.querySelectorAll('.answer-box');
        inputs.forEach((input) => {
            input.classList.remove('correct', 'wrong', 'revealed');
        });
    }

    function answerString(round) {
        return round.inputLetters.join('');
    }

    function updateModeButtons() {
        modeButtons.forEach((button) => {
            const active = button.dataset.mode === game.mode;
            button.classList.toggle('active', active);
            button.setAttribute('aria-selected', String(active));
        });
    }

    function renderReference() {
        if (!referenceGrid) return;

        const lettersToShow = ALPHABET;
        referenceGrid.innerHTML = '';

        lettersToShow.forEach((letter) => {
            const item = document.createElement('div');
            item.className = 'reference-item';

            const binary = document.createElement('span');
            binary.className = 'reference-binary';
            binary.textContent = toBinary(letter);

            const label = document.createElement('span');
            label.className = 'reference-letter';
            label.textContent = letter;

            item.appendChild(binary);
            item.appendChild(label);
            referenceGrid.appendChild(item);
        });

    }

    function renderBinaryWord() {
        const round = currentRound();
        if (!round || !binaryWord) {
            return;
        }

        binaryWord.innerHTML = '';

        round.binary.forEach((binary, index) => {
            const card = document.createElement('div');
            card.className = 'binary-card';

            const marker = document.createElement('span');
            marker.className = 'binary-index';
            marker.textContent = `Letter ${index + 1}`;

            const value = document.createElement('div');
            value.className = 'binary-value';

            binary.split('').forEach((bit) => {
                const bitNode = document.createElement('span');
                bitNode.className = 'binary-bit';
                bitNode.textContent = bit;
                value.appendChild(bitNode);
            });

            card.appendChild(marker);
            card.appendChild(value);
            binaryWord.appendChild(card);
        });
    }

    function renderAnswerBoxes() {
        const round = currentRound();
        if (!round || !answerBoxes) {
            return;
        }

        answerBoxes.innerHTML = '';

        round.inputLetters.forEach((letter, index) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'answer-box';
            input.value = letter;
            input.setAttribute('aria-label', `Letter ${index + 1}`);

            if (index === round.activeIndex && !round.solved && !round.revealed) {
                input.autofocus = true;
            }

            if (round.revealed) {
                input.classList.add('revealed');
                input.readOnly = true;
            }

            if (round.solved) {
                input.classList.add('correct');
                input.readOnly = true;
            }

            input.addEventListener('focus', () => {
                round.activeIndex = index;
            });

            input.addEventListener('input', () => {
                setInputAt(index, input.value);
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Backspace' && !input.value && index > 0) {
                    round.activeIndex = index - 1;
                    round.inputLetters[index - 1] = '';
                    renderAnswerBoxes();
                }
                if (event.key === 'Enter') {
                    checkAnswer();
                }
            });

            answerBoxes.appendChild(input);
        });
    }

    function renderLetterBank() {
        const round = currentRound();
        if (!round || !letterBank) {
            return;
        }

        letterBank.innerHTML = '';

        round.choiceLetters.forEach((letter) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'letter-chip';
            button.textContent = letter;
            button.addEventListener('click', () => {
                fillFromLetterBank(letter);
            });
            letterBank.appendChild(button);
        });

        const erase = document.createElement('button');
        erase.type = 'button';
        erase.className = 'letter-chip erase';
        erase.innerHTML = '<i class="fas fa-delete-left"></i>';
        erase.setAttribute('aria-label', 'Erase one letter');
        erase.addEventListener('click', () => {
            removeLetter();
        });

        letterBank.appendChild(erase);
    }

    function renderMessages() {
        const round = currentRound();
        if (!round) {
            return;
        }

        if (wordClue) {
            wordClue.textContent = round.clue;
        }

        if (hintMessage) {
            hintMessage.textContent = round.hintText || '';
            hintMessage.className = 'hint-message';
            if (round.hintText && round.hintText.toLowerCase().includes('great')) {
                hintMessage.classList.add('good');
            }
            if (round.hintText && round.hintText.toLowerCase().includes('no more')) {
                hintMessage.classList.add('warn');
            }
        }

        if (decoderStamp) {
            decoderStamp.className = 'decoder-stamp';
            decoderStamp.textContent = '';

            if (round.resultType === 'success') {
                decoderStamp.classList.add('show', 'success');
                decoderStamp.textContent = '✓';
            }

            if (round.resultType === 'error') {
                decoderStamp.classList.add('show', 'error');
                decoderStamp.textContent = '✕';
            }
        }

        if (resultMessage) {
            resultMessage.textContent = round.resultText || '';
            resultMessage.className = 'result-message';

            if (round.resultType === 'success') {
                resultMessage.classList.add('success');
            }

            if (round.resultType === 'error') {
                resultMessage.classList.add('error');
            }
        }

        if (explanationMessage) {
            explanationMessage.textContent = round.explanationText || '';
        }
    }

    function renderStats() {
        const round = currentRound();
        if (!round) {
            return;
        }

        if (scoreValue) scoreValue.textContent = String(game.score);
        if (levelValue) levelValue.textContent = String(round.tier);
        if (solvedValue) solvedValue.textContent = String(game.solvedCount);
        if (streakValue) streakValue.textContent = String(game.streak);
        if (hintsValue) hintsValue.textContent = String(game.hintsUsed);
        if (attemptsValue) attemptsValue.textContent = String(Math.max(0, MAX_ATTEMPTS - round.attempts));

        if (prevButton) {
            prevButton.disabled = game.currentIndex === 0;
        }

        if (checkButton) {
            checkButton.disabled = round.solved || round.revealed;
        }

        if (speakButton) {
            speakButton.disabled = !(round.solved || round.revealed);
        }
    }

    function checkAnswer() {
        const round = currentRound();
        if (!round || round.solved || round.revealed) {
            return;
        }

        clearInputHighlight();

        const answer = answerString(round);
        const hasEmptyInput = round.inputLetters.some((letter) => !letter);
        if (answer.length !== round.word.length || hasEmptyInput) {
            round.resultText = 'Buzz';
            round.resultType = 'error';
            round.explanationText = '';
            round.hintText = '';
            playSound('error');
            renderMessages();
            return;
        }

        if (answer === round.word) {
            round.solved = true;

            let earnedPoints = 0;
            if (!round.counted) {
                round.counted = true;
                game.solvedCount += 1;
                game.streak += 1;
                earnedPoints = Math.max(4, 14 - (round.attempts * 3) - (round.hintStep * 2) + ((round.tier - 1) * 2));
                game.score += earnedPoints;
            }

            round.resultText = '';
            round.resultType = 'success';
            round.explanationText = '';
            round.hintText = '';

            playSound('success');
            if (speakWord(round.word)) {
                round.spoken = true;
            }

            renderAnswerBoxes();
        } else {
            round.attempts += 1;
            game.streak = 0;
            game.score = Math.max(0, game.score - 1);
            highlightMistakes(round.word);

            if (round.attempts >= MAX_ATTEMPTS) {
                round.revealed = true;
                round.inputLetters = round.word.split('');
                round.resultText = '';
                round.resultType = 'error';
                round.explanationText = '';
                round.hintText = '';
                playSound('error');
                renderAnswerBoxes();
            } else {
                round.resultText = '';
                round.resultType = 'error';
                round.explanationText = '';
                round.hintText = '';
                playSound('error');
            }
        }

        renderMessages();
        renderStats();
    }

    function showHint() {
        const round = currentRound();
        if (!round) {
            return;
        }

        if (round.solved || round.revealed) {
            round.hintText = '';
            renderMessages();
            return;
        }

        if (round.hintStep >= MAX_HINT_STEPS) {
            round.hintText = 'No more hints.';
            renderMessages();
            return;
        }

        round.hintStep += 1;
        game.hintsUsed += 1;

        if (round.hintStep === 1) {
            const first = round.word[0];
            round.inputLetters[0] = first;
            round.activeIndex = Math.min(1, round.word.length - 1);
            round.hintText = `Hint: first letter is ${first}.`;
        } else if (round.hintStep === 2) {
            const candidates = [];
            for (let i = 0; i < round.word.length; i += 1) {
                if (round.inputLetters[i] !== round.word[i]) {
                    candidates.push(i);
                }
            }

            const revealIndex = candidates.length > 0 ? candidates[randomInt(0, candidates.length - 1)] : Math.min(1, round.word.length - 1);
            const revealedLetter = round.word[revealIndex];
            round.inputLetters[revealIndex] = revealedLetter;
            round.activeIndex = Math.min(revealIndex + 1, round.word.length - 1);
            round.hintText = `Hint: letter ${revealIndex + 1} is ${revealedLetter}.`;
        } else {
            round.hintText = `Final hint: ${round.word.length} letters. ${round.clue}`;
        }

        playSound('click');
        renderAnswerBoxes();
        renderMessages();
        renderStats();
    }

    function resetCurrentAnswer() {
        const round = currentRound();
        if (!round) {
            return;
        }

        if (round.solved || round.revealed) {
            round.hintText = '';
            renderMessages();
            return;
        }

        round.inputLetters = Array(round.word.length).fill('');
        round.activeIndex = 0;
        round.resultText = '';
        round.resultType = '';
        round.explanationText = '';
        round.hintText = '';

        clearInputHighlight();
        playSound('click');
        renderAnswerBoxes();
        renderMessages();
        renderStats();
    }

    function goToRound(index) {
        if (index < 0) {
            return;
        }

        if (!ensureRoundAt(index)) {
            return;
        }

        game.currentIndex = index;
        renderAll();
    }

    function resetSession(mode) {
        game.mode = mode;
        game.rounds = [];
        game.currentIndex = 0;
        game.solvedCount = 0;
        game.score = 0;
        game.streak = 0;
        game.hintsUsed = 0;
        game.usedByMode[mode].clear();
        game.lastWordByMode[mode] = '';

        ensureRoundAt(0);
        renderAll();
    }

    function renderAll() {
        updateModeButtons();
        renderReference();
        renderBinaryWord();
        renderAnswerBoxes();
        renderLetterBank();
        renderMessages();
        renderStats();
    }

    if (hintButton) {
        hintButton.addEventListener('click', showHint);
    }

    if (speakButton) {
        speakButton.addEventListener('click', () => {
            const round = currentRound();
            if (!round || !(round.solved || round.revealed)) {
                return;
            }

            if (speakWord(round.word)) {
                round.hintText = `Spoken: ${round.word}`;
                round.spoken = true;
                renderMessages();
            } else {
                round.hintText = 'Voice is not supported on this browser.';
                renderMessages();
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            goToRound(game.currentIndex - 1);
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetCurrentAnswer);
    }

    if (checkButton) {
        checkButton.addEventListener('click', checkAnswer);
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            goToRound(game.currentIndex + 1);
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
            checkAnswer();
        }
    });

    ensureRoundAt(0);
    renderAll();
});
