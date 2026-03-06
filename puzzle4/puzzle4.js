document.addEventListener('DOMContentLoaded', function() {
    let currentLevel = 1;
    const maxLevel = 10;
    const correctAnswers = {
        1: '10',
        2: '5',
        3: '3',
        4: '10',
        5: '15',
        6: '7',
        7: '3',
        8: '12',
        9: '7',    // Triangle count puzzle (7 triangles total)
        10: '9'    // Square count puzzle (9 squares total)
    };

    // Initialize sound system
    SoundEffects.init();

    // Get DOM elements
    const checkButton = document.getElementById('check-answer');
    const nextButton = document.getElementById('next-level');
    const skipButton = document.getElementById('skip-level');
    const resultMessage = document.querySelector('.result-message');

    function showLevel(level) {
        try {
            // First hide all levels
            document.querySelectorAll('.level').forEach(el => {
                el.classList.add('hidden');
                el.style.opacity = '0';
            });

            // Show the current level
            const currentLevelElement = document.getElementById(`level${level}`);
            if (currentLevelElement) {
                currentLevelElement.classList.remove('hidden');
                setTimeout(() => {
                    currentLevelElement.style.opacity = '1';
                }, 50);
            }

            // Reset UI elements
            nextButton.classList.add('hidden');
            resultMessage.textContent = '';
            resultMessage.className = 'result-message';
            
            // Reset any selected options
            document.querySelectorAll('.selected').forEach(el => {
                el.classList.remove('selected');
            });

            // Update skip button visibility
            if (level === maxLevel) {
                skipButton.style.display = 'none';
            } else {
                skipButton.style.display = 'block';
            }
        } catch (error) {
            console.error('Error in showLevel:', error);
        }
    }

    async function checkAnswer() {
        let userAnswer;
        const currentLevelElement = document.getElementById(`level${currentLevel}`);
        
        // Get selected answer
        const selectedButton = currentLevelElement.querySelector('.option-btn.selected');
        userAnswer = selectedButton ? selectedButton.textContent : null;

        if (!userAnswer) {
            resultMessage.textContent = 'Please select an answer!';
            resultMessage.className = 'result-message error';
            await SoundEffects.playErrorSound();
            return;
        }

        if (userAnswer === correctAnswers[currentLevel]) {
            resultMessage.textContent = 'Correct! Well done! 🎉';
            resultMessage.className = 'result-message success';
            await SoundEffects.playSuccessSound();
            
            if (currentLevel < maxLevel) {
                nextButton.classList.remove('hidden');
            } else {
                resultMessage.textContent += ' You completed all levels! 🏆';
                // Hide skip and next buttons on last level
                skipButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
        } else {
            resultMessage.textContent = 'Try again!';
            resultMessage.className = 'result-message error';
            await SoundEffects.playErrorSound();
        }
    }

    function nextLevel() {
        if (currentLevel < maxLevel) {
            currentLevel++;
            showLevel(currentLevel);
        }
    }

    async function skipLevel() {
        try {
            await SoundEffects.playClickSound();
            if (currentLevel < maxLevel) {
                currentLevel++;
                showLevel(currentLevel);
                resultMessage.textContent = '';
                resultMessage.className = 'result-message';
            }
        } catch (error) {
            console.error('Error in skipLevel:', error);
        }
    }

    // Event Listeners
    checkButton.addEventListener('click', async () => {
        try {
            await SoundEffects.playClickSound();
            await checkAnswer();
        } catch (error) {
            console.error('Error in checkAnswer:', error);
        }
    });

    nextButton.addEventListener('click', async () => {
        try {
            await SoundEffects.playClickSound();
            nextLevel();
        } catch (error) {
            console.error('Error in nextLevel:', error);
        }
    });

    skipButton.addEventListener('click', skipLevel);

    // Option button click handlers
    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', async function() {
            try {
                await SoundEffects.playClickSound();
                const currentLevelElement = this.closest('.level');
                currentLevelElement.querySelectorAll('.option-btn').forEach(btn => {
                    btn.classList.remove('selected');
                });
                this.classList.add('selected');
            } catch (error) {
                console.error('Error in option button handler:', error);
            }
        });
    });

    // Initialize first level
    showLevel(1);
});
