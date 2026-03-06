document.addEventListener('DOMContentLoaded', () => {
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

    // List of words to use in puzzles
    const wordList = ['STAR', 'MOON', 'BEAR', 'CAKE', 'TREE', 'FISH', 'LION', 'DUCK'];
    let currentWord = '';
    let currentWordIndex = 0;

    // Function to get emoji for a letter
    const getEmojiForLetter = (letter) => emojiMapping[letter.toUpperCase()] || '❓';

    // Function to convert word to emojis
    const wordToEmojis = (word) => {
        return word.split('').map(letter => getEmojiForLetter(letter));
    };

    // Function to setup new puzzle
    const setupNewPuzzle = () => {
        currentWord = wordList[currentWordIndex];
        const emojis = wordToEmojis(currentWord);
        
        // Update symbols guide
        const symbolsGuide = document.querySelector('.symbols-guide');
        symbolsGuide.innerHTML = Object.entries(emojiMapping)
            .map(([letter, emoji]) => `
                <div class="symbol">
                    <div class="symbol-emoji">${emoji}</div>
                    <div class="symbol-letter">${letter}</div>
                </div>
            `)
            .join('');

        // Update secret message
        const secretMessage = document.querySelector('.secret-message');
        secretMessage.innerHTML = emojis
            .map(emoji => `<span>${emoji}</span>`)
            .join('');

        // Update input boxes
        const answerInputs = document.querySelector('.answer-inputs');
        answerInputs.innerHTML = currentWord
            .split('')
            .map((_, index) => `<input type="text" maxlength="1" class="letter-input" data-position="${index}">`)
            .join('');

        // Reset result message
        document.getElementById('result-message').textContent = '';
        
        // Setup input handlers
        setupInputHandlers();
    };

    // Function to setup input handlers
    const setupInputHandlers = () => {
        const letterInputs = document.querySelectorAll('.letter-input');
        letterInputs.forEach((input, index) => {
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
            
            newInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
                const currentInputs = document.querySelectorAll('.letter-input');
                if (e.target.value && index < currentInputs.length - 1) {
                    FeedbackSystem.showClick();
                    currentInputs[index + 1].focus();
                }
            });

            newInput.addEventListener('keydown', (e) => {
                const currentInputs = document.querySelectorAll('.letter-input');
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    FeedbackSystem.showClick();
                    currentInputs[index - 1].focus();
                }
            });
        });
    };

    // Check answer button
    const checkButton = document.getElementById('check-answer');
    const resultMessage = document.getElementById('result-message');

    const checkAnswer = () => {
        const inputs = document.querySelectorAll('.letter-input');
        const userAnswer = Array.from(inputs).map(input => input.value).join('');
        const resultMessage = document.getElementById('result-message');

        if (userAnswer === currentWord) {
            resultMessage.textContent = '🎉 Fantastic! The emoji code is solved! Ready for the next puzzle? 🌟';
            resultMessage.className = 'result success';
            
            // Play success animation and sound only once
            FeedbackSystem.showSuccess('🎯 Amazing work! You\'re an emoji master! 🌟');
            celebrate();
            
            // Setup next word after a short delay
            setTimeout(() => {
                currentWordIndex = (currentWordIndex + 1) % wordList.length;
                setupNewPuzzle();
            }, 3000);
        } else {
            FeedbackSystem.showError('😅 Almost there! Try matching the emojis again! 💪');
            resultMessage.className = 'result error';
        }
    };

    // Function to create celebration effects
    const celebrate = () => {
        const puzzle = document.querySelector('.puzzle-container');
        puzzle.classList.add('celebrate');
        setTimeout(() => puzzle.classList.remove('celebrate'), 3000);
    };

    // Check button click handler
    document.querySelector('#check-answer').addEventListener('click', checkAnswer);

    // Initialize first puzzle
    setupNewPuzzle();
});
