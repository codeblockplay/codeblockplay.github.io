document.addEventListener('DOMContentLoaded', () => {
    // ======= SHARED VARIABLES & FUNCTIONS =======
    let currentLevel = 1;
    const levels = document.querySelectorAll('.puzzle-container');

    function shuffleArray(input) {
        const arr = Array.isArray(input) ? [...input] : [];
        for (let i = arr.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    
    // Function to switch levels
    function switchToLevel(level) {
        // Hide all levels
        levels.forEach(lvl => {
            lvl.classList.remove('active');
        });
        
        // Show the selected level
        document.querySelector(`.puzzle-container[data-level="${level}"]`).classList.add('active');
        currentLevel = level;
        
        // Update the challenge title
        const challengeTitle = document.getElementById('current-challenge-title');
        if (level === 1) {
            challengeTitle.textContent = 'Secret Code Challenge';
            challengeTitle.classList.add('animate-title');
        } else {
            challengeTitle.textContent = 'Emoji Mystery';
            challengeTitle.classList.add('animate-title');
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            challengeTitle.classList.remove('animate-title');
        }, 500);
        
        // Clear any previous result messages
        document.querySelectorAll('.result').forEach(el => {
            el.textContent = '';
            el.className = 'result';
        });
        
        // Adjust viewport on mobile if needed
        if (window.innerWidth <= 768) {
            window.scrollTo(0, 0);
        }
    }
    
    // Function to create celebration effects
    function celebrate() {
        const puzzle = document.querySelector('.puzzle-container.active');
        puzzle.classList.add('celebrate');
        setTimeout(() => puzzle.classList.remove('celebrate'), 3000);
    }
    
    // ======= LEVEL 1: SECRET CODE PUZZLE =======
    // Symbol mapping for each letter - using special characters for the secret code
    const symbolMapping = {
        'A': '::',
        'B': '%#',
        'C': '&#',
        'D': '@@',
        'E': '$$',
        'F': '++',
        'G': '##',
        'H': '**',
        'I': '!!',
        'J': '??',
        'K': '&&',
        'L': '%%',
        'M': ';:',
        'N': '^^',
        'O': '~~',
        'P': '><',
        'Q': '[]',
        'R': '{}',
        'S': '//',
        'T': '\\\\',
        'U': '()',
        'V': '<>',
        'W': '==',
        'X': '--',
        'Y': '||',
        'Z': '|#'
    };

    // List of words for Level 1 (used dynamically)
    const level1WordBank = [
        'CAT', 'DOG', 'SUN', 'FUN', 'PLAY', 'STAR', 'GOOD', 'CAKE', 'FISH', 'BOOK', 'TREE', 'BIRD',
        'RAIN', 'MOON', 'SMILE', 'HAPPY', 'JUICE', 'APPLE', 'BERRY', 'MAGIC', 'CANDY', 'PAINT',
        'COLOR', 'HEART', 'TIGER', 'ZEBRA', 'LION', 'PANDA', 'KOALA', 'BUNNY', 'DRAGON', 'ROBOT',
        'PIZZA', 'MUSIC', 'DANCE', 'PARTY', 'SUPER', 'BRAVE', 'HONEY', 'MANGO', 'GRAPE', 'PEACH',
        'LEMON', 'RIVER', 'OCEAN', 'SHELL', 'SWEET', 'SMALL', 'GIANT', 'CLOUD', 'STORM', 'FROST',
        'FAIRY', 'NINJA', 'HERO', 'LASER', 'SPACE', 'COMET', 'PLANET', 'ROCKET', 'BUBBLE', 'PUZZLE',
        'GARDEN', 'FLOWER', 'SPRING', 'SUMMER', 'AUTUMN', 'WINTER', 'CIRCUS', 'MIRROR', 'RIDDLE', 'JELLY'
    ];
    const SECRET_UNLOCK_TARGET = 8;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let currentWord1 = '';
    let currentWord1Index = 0;
    let level1Score = 0;
    let level1Streak = 0;
    let level1AttemptsLeft = 3;
    let level1HintsLeft = 2;
    let level1WordSolved = false;
    let activeLevel1Input = 0;
    const solvedLevel1Indexes = new Set();
    const level1WordHistory = [];
    let availableLevel1Words = [];

    const scoreEl1 = document.getElementById('secret-score-1');
    const streakEl1 = document.getElementById('secret-streak-1');
    const attemptsEl1 = document.getElementById('secret-attempts-1');
    const hintsEl1 = document.getElementById('secret-hints-1');
    const progressFillEl1 = document.getElementById('secret-progress-fill');
    const letterBankEl1 = document.getElementById('letter-bank-1');
    const sparkleZone1 = document.getElementById('sparkle-zone-1');
    const hintButton1 = document.getElementById('hint-1');
    const repeatWordButton1 = document.getElementById('repeat-word-1');
    const checkButton1 = document.getElementById('check-answer-1');

    // Function to get symbol for a letter
    const getSymbolForLetter = (letter) => symbolMapping[letter.toUpperCase()] || '??';

    // Function to convert word to symbols
    const wordToSymbols = (word) => word.split('').map((letter) => getSymbolForLetter(letter));

    function refillLevel1WordPool() {
        availableLevel1Words = shuffleArray([...new Set(level1WordBank)]);
    }

    function nextGeneratedLevel1Word() {
        if (availableLevel1Words.length === 0) {
            refillLevel1WordPool();
        }
        return availableLevel1Words.pop();
    }

    function ensureLevel1WordAt(index) {
        while (level1WordHistory.length <= index) {
            level1WordHistory.push(nextGeneratedLevel1Word());
        }
    }

    function getLevel1Inputs() {
        return Array.from(document.querySelectorAll('#secret-code-puzzle .letter-input'));
    }

    function speakWord(word) {
        if (!window.speechSynthesis || !word) {
            return;
        }
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.rate = 0.85;
        utterance.pitch = 1.2;
        utterance.lang = 'en-US';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }

    function fireSparkles(count = 12) {
        if (!sparkleZone1) {
            return;
        }

        sparkleZone1.innerHTML = '';
        const symbols = ['✨', '⭐', '💫'];

        for (let i = 0; i < count; i += 1) {
            const node = document.createElement('span');
            node.className = 'sparkle';
            node.textContent = symbols[i % symbols.length];
            const dx = (Math.random() * 220) - 110;
            const dy = -20 - (Math.random() * 120);
            node.style.setProperty('--dx', `${dx}px`);
            node.style.setProperty('--dy', `${dy}px`);
            sparkleZone1.appendChild(node);
        }

        setTimeout(() => {
            sparkleZone1.innerHTML = '';
        }, 900);
    }

    function updateSecretHud() {
        const solvedCount = solvedLevel1Indexes.size;
        if (scoreEl1) scoreEl1.textContent = String(level1Score);
        if (streakEl1) streakEl1.textContent = String(level1Streak);
        if (attemptsEl1) attemptsEl1.textContent = String(level1AttemptsLeft);
        if (hintsEl1) hintsEl1.textContent = String(level1HintsLeft);

        if (progressFillEl1) {
            const progress = Math.min(100, (solvedCount / SECRET_UNLOCK_TARGET) * 100);
            progressFillEl1.style.width = `${progress}%`;
        }

        if (hintButton1) {
            hintButton1.disabled = level1HintsLeft <= 0 || level1WordSolved;
        }
        if (checkButton1) {
            checkButton1.disabled = level1WordSolved;
        }
    }

    function setActiveLevel1Input(index) {
        const inputs = getLevel1Inputs();
        if (inputs.length === 0) {
            return;
        }

        activeLevel1Input = Math.max(0, Math.min(index, inputs.length - 1));
        inputs.forEach((input, idx) => {
            input.classList.toggle('active-slot', idx === activeLevel1Input);
        });
        inputs[activeLevel1Input].focus();
    }

    function moveToNextEmptyInput() {
        const inputs = getLevel1Inputs();
        const emptyIndex = inputs.findIndex((input) => !input.value);
        if (emptyIndex >= 0) {
            setActiveLevel1Input(emptyIndex);
        }
    }

    function buildLevel1LetterBank() {
        if (!letterBankEl1) {
            return;
        }

        const required = [...new Set(currentWord1.split(''))];
        const extras = shuffleArray(alphabet.filter((letter) => !required.includes(letter)));
        const bankLetters = shuffleArray([...required, ...extras.slice(0, Math.max(0, 12 - required.length))]);

        const chips = bankLetters.map((letter) => `
            <button type="button" class="letter-chip" data-letter="${letter}" aria-label="Letter ${letter}">${letter}</button>
        `).join('');

        letterBankEl1.innerHTML = `${chips}
            <button type="button" class="letter-chip erase" data-erase="true" aria-label="Erase letter"><i class="fas fa-backspace"></i></button>`;

        letterBankEl1.querySelectorAll('.letter-chip[data-letter]').forEach((button) => {
            button.addEventListener('click', () => {
                if (level1WordSolved) {
                    return;
                }
                const letter = button.dataset.letter || '';
                const inputs = getLevel1Inputs();
                if (!inputs.length) {
                    return;
                }
                inputs[activeLevel1Input].value = letter;
                FeedbackSystem.showClick();
                moveToNextEmptyInput();
            });
        });

        const eraseButton = letterBankEl1.querySelector('.letter-chip.erase');
        if (eraseButton) {
            eraseButton.addEventListener('click', () => {
                if (level1WordSolved) {
                    return;
                }
                const inputs = getLevel1Inputs();
                if (!inputs.length) {
                    return;
                }
                inputs[activeLevel1Input].value = '';
                FeedbackSystem.showClick();
            });
        }
    }

    // Function to setup input handlers for level 1
    function setupLevel1InputHandlers() {
        const inputs = getLevel1Inputs();
        inputs.forEach((input, index) => {
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);

            newInput.addEventListener('focus', () => {
                setActiveLevel1Input(index);
            });

            newInput.addEventListener('input', (e) => {
                e.target.value = (e.target.value || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 1);
                if (e.target.value && index < inputs.length - 1) {
                    setActiveLevel1Input(index + 1);
                }
            });

            newInput.addEventListener('keydown', (e) => {
                const currentInputs = getLevel1Inputs();
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    FeedbackSystem.showClick();
                    setActiveLevel1Input(index - 1);
                }

                if (e.key === 'Enter') {
                    checkLevel1Answer();
                }
            });
        });
    }

    function revealLevel1Answer() {
        const inputs = getLevel1Inputs();
        inputs.forEach((input, index) => {
            input.value = currentWord1[index];
            input.classList.add('revealed');
            input.disabled = true;
        });
        level1WordSolved = true;
        if (repeatWordButton1) {
            repeatWordButton1.disabled = false;
        }
        updateSecretHud();
    }

    function drawLevel1Guide() {
        const symbolsGuide = document.querySelector('#secret-code-puzzle .symbols-guide');
        symbolsGuide.innerHTML = alphabet.map((letter) => `
            <div class="symbol">
                <div class="symbol-code">${getSymbolForLetter(letter)}</div>
                <div class="symbol-letter">${letter}</div>
            </div>
        `).join('');
    }

    // Function to setup new puzzle for level 1
    function setupLevel1Puzzle() {
        ensureLevel1WordAt(currentWord1Index);
        currentWord1 = level1WordHistory[currentWord1Index];
        level1AttemptsLeft = 3;
        level1HintsLeft = 2;
        level1WordSolved = false;
        activeLevel1Input = 0;

        const symbols = wordToSymbols(currentWord1);
        document.getElementById('current-puzzle-1').textContent = currentWord1Index + 1;

        drawLevel1Guide();

        const secretMessage = document.querySelector('#secret-code-puzzle .secret-message');
        secretMessage.innerHTML = symbols
            .map((symbol) => `<span class="symbol-box">${symbol}</span>`)
            .join('');

        const answerInputs = document.querySelector('#secret-code-puzzle .answer-inputs');
        answerInputs.innerHTML = '';

        for (let i = 0; i < currentWord1.length; i += 1) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'letter-input';
            input.dataset.position = String(i);
            answerInputs.appendChild(input);
        }

        setupLevel1InputHandlers();
        buildLevel1LetterBank();
        setActiveLevel1Input(0);

        if (repeatWordButton1) {
            repeatWordButton1.disabled = true;
        }

        const resultMessage = document.getElementById('result-message-1');
        const remainToUnlock = Math.max(0, SECRET_UNLOCK_TARGET - solvedLevel1Indexes.size);
        resultMessage.textContent = remainToUnlock > 0
            ? `Decode the symbols. Solve ${remainToUnlock} more code${remainToUnlock === 1 ? '' : 's'} to unlock Emoji Mystery.`
            : 'Emoji Mystery is unlocked. Keep decoding for more points!';
        resultMessage.className = 'result';
        updateSecretHud();
    }

    // Function to check answer for level 1
    function checkLevel1Answer() {
        if (level1WordSolved) {
            return;
        }

        const inputs = getLevel1Inputs();
        const userAnswer = inputs.map((input) => input.value).join('');
        const resultMessage = document.getElementById('result-message-1');

        if (userAnswer.length < currentWord1.length) {
            resultMessage.textContent = 'Fill all boxes first, code detective!';
            resultMessage.className = 'result error';
            FeedbackSystem.showError('Fill every box first!');
            return;
        }

        if (userAnswer === currentWord1) {
            if (!solvedLevel1Indexes.has(currentWord1Index)) {
                solvedLevel1Indexes.add(currentWord1Index);
                const scoreGain = 12 + ((level1AttemptsLeft - 1) * 4) + (level1HintsLeft * 2) + (level1Streak * 2);
                level1Score += Math.max(10, scoreGain);
            }

            level1Streak += 1;
            level1WordSolved = true;
            inputs.forEach((input) => {
                input.classList.add('revealed');
                input.disabled = true;
            });
            if (repeatWordButton1) {
                repeatWordButton1.disabled = false;
            }

            FeedbackSystem.showSuccess('🎯 Wow! You broke the code! 🌟');
            const justUnlocked = solvedLevel1Indexes.size === SECRET_UNLOCK_TARGET;
            resultMessage.textContent = justUnlocked
                ? `DECODED! ${currentWord1}. Emoji Mystery unlocked! Tap the title to switch.`
                : `DECODED! The word is ${currentWord1}. Tap Next for a new mission.`;
            resultMessage.className = 'result success';
            celebrate();
            fireSparkles(15);
            speakWord(currentWord1);
            updateSecretHud();
            return;
        }

        level1AttemptsLeft -= 1;
        level1Streak = 0;
        updateSecretHud();

        if (level1AttemptsLeft <= 0) {
            FeedbackSystem.showError('Code reveal activated!');
            resultMessage.textContent = `Code reveal: ${currentWord1}. Press Next for a new mission.`;
            resultMessage.className = 'result error';
            revealLevel1Answer();
            speakWord(currentWord1);
            return;
        }

        FeedbackSystem.showError('Keep trying! You can crack this code! 💪');
        resultMessage.textContent = `Not yet. Try again! Attempts left: ${level1AttemptsLeft}`;
        resultMessage.className = 'result error';
    }

    function useLevel1Hint() {
        if (level1WordSolved || level1HintsLeft <= 0) {
            return;
        }

        const inputs = getLevel1Inputs();
        const candidates = [];
        inputs.forEach((input, index) => {
            if ((input.value || '').toUpperCase() !== currentWord1[index]) {
                candidates.push(index);
            }
        });

        if (!candidates.length) {
            return;
        }

        const revealIndex = candidates[Math.floor(Math.random() * candidates.length)];
        inputs[revealIndex].value = currentWord1[revealIndex];
        inputs[revealIndex].classList.add('revealed');
        level1HintsLeft -= 1;
        setActiveLevel1Input(revealIndex);
        moveToNextEmptyInput();
        updateSecretHud();

        const resultMessage = document.getElementById('result-message-1');
        resultMessage.textContent = `Hint sparkle: letter ${revealIndex + 1} is "${currentWord1[revealIndex]}".`;
        resultMessage.className = 'result';
        FeedbackSystem.showClick('Hint used!');
    }

    // ======= LEVEL 2: EMOJI PUZZLE =======
    // List of emojis to use for letters
    const emojiMapping = {
        'A': '😄',
        'B': '🐻',
        'C': '🍪',
        'D': '🦮',
        'E': '🦅',
        'F': '🌸',
        'G': '🦒',
        'H': '🏠',
        'I': '🍦',
        'J': '🤹',
        'K': '🪁',
        'L': '🦁',
        'M': '🌙',
        'N': '📝',
        'O': '🍊',
        'P': '🐼',
        'Q': '👸',
        'R': '🌈',
        'S': '⭐',
        'T': '🌳',
        'U': '☔',
        'V': '🌋',
        'W': '🌊',
        'X': '❌',
        'Y': '🪀',
        'Z': '⚡'
    };

    // List of words for Level 2
    const level2Words = ['STAR', 'MOON', 'BEAR', 'CAKE', 'TREE', 'FISH', 'LION', 'DUCK'];
    let currentWord2 = '';
    let currentWord2Index = 0;

    // Set total puzzle count for level 2
    document.getElementById('total-puzzles-2').textContent = level2Words.length;

    // Function to get emoji for a letter
    const getEmojiForLetter = (letter) => emojiMapping[letter.toUpperCase()] || '❓';

    // Function to convert word to emojis
    const wordToEmojis = (word) => {
        return word.split('').map(letter => getEmojiForLetter(letter));
    };

    // Function to setup input handlers for level 2
    function setupLevel2InputHandlers() {
        const letterInputs = document.querySelectorAll('#emoji-puzzle .letter-input');
        letterInputs.forEach((input, index) => {
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
            
            newInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
                const currentInputs = document.querySelectorAll('#emoji-puzzle .letter-input');
                if (e.target.value && index < currentInputs.length - 1) {
                    FeedbackSystem.showClick();
                    currentInputs[index + 1].focus();
                }
            });

            newInput.addEventListener('keydown', (e) => {
                const currentInputs = document.querySelectorAll('#emoji-puzzle .letter-input');
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    FeedbackSystem.showClick();
                    currentInputs[index - 1].focus();
                }
                
                // Submit on Enter key
                if (e.key === 'Enter') {
                    checkLevel2Answer();
                }
            });
        });
    }

    // Function to setup new puzzle for level 2
    function setupLevel2Puzzle() {
        currentWord2 = level2Words[currentWord2Index];
        const emojis = wordToEmojis(currentWord2);
        
        // Update puzzle counter
        document.getElementById('current-puzzle-2').textContent = currentWord2Index + 1;
        
        // Update symbols guide
        const symbolsGuide = document.querySelector('#emoji-puzzle .symbols-guide');
        symbolsGuide.innerHTML = Object.entries(emojiMapping)
            .map(([letter, emoji]) => `
                <div class="symbol">
                    <div class="symbol-emoji">${emoji}</div>
                    <div class="symbol-letter">${letter}</div>
                </div>
            `)
            .join('');

        // Update secret message
        const secretMessage = document.querySelector('#emoji-puzzle .secret-message');
        secretMessage.innerHTML = emojis
            .map(emoji => `<span>${emoji}</span>`)
            .join('');

        // Update input boxes
        const answerInputs = document.querySelector('#emoji-puzzle .answer-inputs');
        answerInputs.innerHTML = '';
        
        for (let i = 0; i < currentWord2.length; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'letter-input';
            input.dataset.position = i;
            answerInputs.appendChild(input);
        }

        // Reset result message
        const resultMessage = document.getElementById('result-message-2');
        resultMessage.textContent = '';
        resultMessage.className = 'result';
        
        // Setup input handlers
        setupLevel2InputHandlers();
        
        // Focus first input
        document.querySelector('#emoji-puzzle .letter-input').focus();
    }

    // Function to check answer for level 2
    function checkLevel2Answer() {
        const inputs = document.querySelectorAll('#emoji-puzzle .letter-input');
        const userAnswer = Array.from(inputs).map(input => input.value).join('');
        const resultMessage = document.getElementById('result-message-2');

        if (userAnswer === currentWord2) {
            resultMessage.textContent = '🎉 Fantastic! The emoji code is solved! Ready for the next puzzle? 🌟';
            resultMessage.className = 'result success';
            
            // Play success animation and sound only once
            FeedbackSystem.showSuccess('🎯 Amazing work! You\'re an emoji master! 🌟');
            celebrate();
            
            // Move to next word
            currentWord2Index++;
            
            // If all puzzles in level 2 are completed, show completion message
            if (currentWord2Index >= level2Words.length) {
                setTimeout(() => {
                    resultMessage.textContent = '🏆 CONGRATULATIONS! You have completed all puzzles! 🏆';
                    resultMessage.className = 'result success';
                }, 3000);
            } else {
                // Otherwise, setup next word in level 2
                setTimeout(() => {
                    setupLevel2Puzzle();
                }, 3000);
            }
        } else {
            FeedbackSystem.showError('😅 Almost there! Try matching the emojis again! 💪');
            resultMessage.textContent = 'Not quite right - try again!';
            resultMessage.className = 'result error';
            
            // Clear error message after a short delay
            setTimeout(() => {
                resultMessage.textContent = '';
                resultMessage.className = 'result';
            }, 2000);
        }
    }

    // ======= EVENT LISTENERS =======
    
    // Challenge title click handler to toggle between puzzles
    document.getElementById('current-challenge-title').addEventListener('click', function() {
        if (currentLevel === 1) {
            // Only allow switching if level 1 is completed
            if (solvedLevel1Indexes.size >= SECRET_UNLOCK_TARGET) {
                switchToLevel(2);
                setupLevel2Puzzle();
            } else {
                FeedbackSystem.showError('Solve all secret codes first to unlock Emoji Mystery!');
            }
        } else {
            switchToLevel(1);
            setupLevel1Puzzle();
        }
    });

    // Level 1 Check Answer button handler
    document.getElementById('check-answer-1').addEventListener('click', checkLevel1Answer);

    // Level 1 Hint button handler
    if (hintButton1) {
        hintButton1.addEventListener('click', useLevel1Hint);
    }

    // Level 1 Repeat word button handler
    if (repeatWordButton1) {
        repeatWordButton1.addEventListener('click', () => {
            if (level1WordSolved) {
                speakWord(currentWord1);
                FeedbackSystem.showClick('Listening mode on!');
            }
        });
    }
    
    // Level 1 Previous button handler
    document.getElementById('prev-puzzle-1').addEventListener('click', () => {
        FeedbackSystem.showClick('Moving to another puzzle...');
        if (currentWord1Index > 0) {
            currentWord1Index--;
            setupLevel1Puzzle();
        }
    });
    
    // Level 1 Next button handler
    document.getElementById('next-puzzle-1').addEventListener('click', () => {
        FeedbackSystem.showClick('Moving to another puzzle...');
        currentWord1Index++;
        setupLevel1Puzzle();
    });

    // Level 2 Check Answer button handler
    document.getElementById('check-answer-2').addEventListener('click', checkLevel2Answer);
    
    // Level 2 Previous button handler
    document.getElementById('prev-puzzle-2').addEventListener('click', () => {
        FeedbackSystem.showClick('Moving to another puzzle...');
        if (currentWord2Index > 0) {
            currentWord2Index--;
            setupLevel2Puzzle();
        } else {
            switchToLevel(1);
            setupLevel1Puzzle();
        }
    });
    
    // Level 2 Next button handler
    document.getElementById('next-puzzle-2').addEventListener('click', () => {
        FeedbackSystem.showClick('Moving to another puzzle...');
        if (currentWord2Index < level2Words.length - 1) {
            currentWord2Index++;
            setupLevel2Puzzle();
        }
    });
    
    // Restart button handler
    document.getElementById('restart-game').addEventListener('click', () => {
        FeedbackSystem.showClick('Restarting all puzzles...');
        
        // Reset all game data
        currentWord1Index = 0;
        currentWord2Index = 0;
        level1Score = 0;
        level1Streak = 0;
        level1AttemptsLeft = 3;
        level1HintsLeft = 2;
        level1WordSolved = false;
        solvedLevel1Indexes.clear();
        level1WordHistory.length = 0;
        availableLevel1Words = [];
        
        // Switch back to level 1
        switchToLevel(1);
        
        // Setup first puzzle
        setupLevel1Puzzle();
    });

    // Initialize first puzzle
    try {
        setupLevel1Puzzle();
    } catch (error) {
        const fallback = document.getElementById('result-message-1');
        if (fallback) {
            fallback.textContent = 'Puzzle loading issue. Please press Reset once.';
            fallback.className = 'result error';
        }
        console.error('Secret Code Challenge failed to initialize:', error);
    }
});
