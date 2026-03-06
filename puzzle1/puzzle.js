document.addEventListener('DOMContentLoaded', () => {
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
        'M': '##',
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
        'Z': '##'
    };

    // List of words to use in puzzles - simple words for kids
    const wordList = ['CAT', 'DOG', 'SUN', 'FUN', 'PLAY', 'STAR', 'GOOD', 'CAKE'];
    let currentWord = '';
    let currentWordIndex = 0;

    // Function to get symbol for a letter
    const getSymbolForLetter = (letter) => symbolMapping[letter.toUpperCase()] || '??';

    // Function to convert word to symbols
    const wordToSymbols = (word) => {
        return word.split('').map(letter => getSymbolForLetter(letter));
    };

    // Function to setup input handlers
    function setupInputHandlers() {
        const inputs = document.querySelectorAll('.letter-input');
        inputs.forEach((input, index) => {
            // Remove existing event listeners by cloning
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
            
            // Add new event listeners
            newInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
                // Get fresh reference to inputs
                const currentInputs = document.querySelectorAll('.letter-input');
                if (e.target.value && index < currentInputs.length - 1) {
                    FeedbackSystem.showClick();
                    currentInputs[index + 1].focus();
                }
            });

            newInput.addEventListener('keydown', (e) => {
                // Get fresh reference to inputs
                const currentInputs = document.querySelectorAll('.letter-input');
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    FeedbackSystem.showClick();
                    currentInputs[index - 1].focus();
                }
            });
        });
    }

    // Function to setup new puzzle
    function setupNewPuzzle() {
        currentWord = wordList[currentWordIndex];
        const symbols = wordToSymbols(currentWord);
        
        // Update symbols guide with a code-like layout
        const symbolsGuide = document.querySelector('.symbols-guide');
        symbolsGuide.innerHTML = Object.entries(symbolMapping)
            .map(([letter, symbol]) => `
                <div class="symbol">
                    <div class="symbol-code">${symbol}</div>
                    <div class="symbol-letter">${letter}</div>
                </div>
            `).join('');

        // Update the secret message with the current word's symbols
        const secretMessage = document.querySelector('.secret-message');
        secretMessage.innerHTML = symbols
            .map(symbol => `<span class="symbol-box">${symbol}</span>`)
            .join(' ');

        // Update answer inputs
        const answerInputs = document.querySelector('.answer-inputs');
        answerInputs.innerHTML = '';
        
        for (let i = 0; i < currentWord.length; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'letter-input';
            input.dataset.position = i;
            answerInputs.appendChild(input);
        }

        // Setup input handlers
        setupInputHandlers();
        
        // Focus first input
        document.querySelector('.letter-input').focus();
    }

    // Function to check answer
    function checkAnswer() {
        const inputs = document.querySelectorAll('.letter-input');
        const userAnswer = Array.from(inputs).map(input => input.value).join('');
        const resultMessage = document.querySelector('.result');
        
        if (userAnswer === currentWord) {
            // Show success message
            FeedbackSystem.showSuccess('🎯 Wow! You broke the code! 🌟');
            resultMessage.textContent = 'DECODED! Get ready for the next secret message...';
            resultMessage.className = 'result success';
            celebrate();
            
            // Clear message and setup next word after a delay
            setTimeout(() => {
                currentWordIndex = (currentWordIndex + 1) % wordList.length;
                setupNewPuzzle();
            }, 3000);
        } else {
            // Show error message briefly
            FeedbackSystem.showError('Keep trying! You can crack this code! 💪');
            resultMessage.textContent = 'Not quite right - try again!';
            resultMessage.className = 'result error';
            
            // Clear error message after a short delay
            setTimeout(() => {
                resultMessage.textContent = '';
                resultMessage.className = 'result';
            }, 2000);
        }
    }

    // Function to create celebration effects
    function celebrate() {
        const puzzle = document.querySelector('.puzzle-container');
        puzzle.classList.add('celebrate');
        setTimeout(() => puzzle.classList.remove('celebrate'), 3000);
    }

    // Check button click handler
    document.querySelector('#check-answer').addEventListener('click', checkAnswer);

    // Initialize first puzzle
    setupNewPuzzle();
});