// Pattern Sequencer Complete Fix
document.addEventListener('DOMContentLoaded', function() {
    console.log('[PatternFix] New implementation loaded');
    
    // Setup activity button event listener
    const sequenceButton = document.querySelector('[data-activity="sequence"]');
    if (sequenceButton) {
        sequenceButton.addEventListener('click', function() {
            console.log('[PatternFix] Sequence button clicked');
            // Wait for UI to update
            setTimeout(initializePatternSequencer, 500);
        });
    }
    
    // Call init once at the beginning
    setTimeout(initializePatternSequencer, 500);
    
    function initializePatternSequencer() {
        // Only proceed if the sequence activity is active
        const sequenceActivity = document.getElementById('sequence-activity');
        if (!sequenceActivity || !sequenceActivity.classList.contains('active')) {
            return;
        }
        
        console.log('[PatternFix] Initializing Pattern Sequencer');
        
        // Get necessary elements
        const patternSequence = document.getElementById('pattern-sequence');
        const patternChoices = document.getElementById('pattern-choices');
        const patternSolution = document.getElementById('pattern-solution');
        const checkButton = document.getElementById('pattern-check');
        const resetButton = document.getElementById('pattern-reset');
        
        if (!patternSequence || !patternChoices || !patternSolution) {
            console.error('[PatternFix] Missing required elements');
            return;
        }
        
        // Reset first
        resetPatternTracking();
        
        // If the original initialization function exists, use it
        if (typeof initPatternActivity === 'function') {
            console.log('[PatternFix] Calling original initPatternActivity');
            // Make sure variables are reset
            if (typeof currentPatternIndex !== 'undefined') currentPatternIndex = 0;
            if (typeof patternsSolved !== 'undefined') patternsSolved = 0;
            if (typeof patternLevel !== 'undefined') patternLevel = 1;
            initPatternActivity();
        }
        
        // Apply our overrides
        setupChoiceButtons();
        setupCheckButton();
        setupResetButton();
        updateStatsDisplay();
    }
    
    function resetPatternTracking() {
        // Create a single source of truth for selected patterns
        window.patternFixState = {
            selectedPatterns: [],
            isProcessingClick: false,
            currentSolution: []
        };
        
        // Reset original array if it exists
        if (typeof selectedPatterns !== 'undefined') {
            selectedPatterns = [];
        }
    }
    
    function setupChoiceButtons() {
        // Remove old handlers and apply new ones
        document.querySelectorAll('.pattern-choice').forEach(button => {
            if (button.dataset.patternFixApplied) return;
            
            button.dataset.patternFixApplied = 'true';
            
            // Completely replace click handlers to avoid double-processing
            const pattern = button.dataset.pattern || button.textContent;
            const allHandlers = getEventListeners(button, 'click');
            
            // Remove all existing click handlers
            if (allHandlers && allHandlers.length) {
                allHandlers.forEach(handler => {
                    button.removeEventListener('click', handler);
                });
            }
            
            // Add our own handler
            button.onclick = function(e) {
                // Prevent clicks if we're already processing
                if (window.patternFixState.isProcessingClick) return;
                window.patternFixState.isProcessingClick = true;
                
                console.log('[PatternFix] Pattern clicked:', pattern);
                
                // Get current pattern from original code if available
                const currentPattern = getCurrentPattern();
                if (!currentPattern) {
                    console.error('[PatternFix] Could not determine current pattern');
                    window.patternFixState.isProcessingClick = false;
                    return;
                }
                
                // Don't add more than needed
                const solutionLength = getSolutionLength(currentPattern);
                if (window.patternFixState.selectedPatterns.length >= solutionLength) {
                    console.log('[PatternFix] Solution slots full');
                    window.patternFixState.isProcessingClick = false;
                    return;
                }
                
                // Add to our state
                window.patternFixState.selectedPatterns.push(pattern);
                console.log('[PatternFix] Updated selectedPatterns:', window.patternFixState.selectedPatterns);
                
                // Update UI
                updateSolutionUI();
                
                // Play sound
                if (typeof playSound === 'function') {
                    playSound('click');
                }
                
                // Debug output
                console.log('[PatternFix] Current pattern solution UI updated');
                const slots = document.querySelectorAll('.pattern-slot');
                console.log('[PatternFix] Slot contents:', Array.from(slots).map(s => s.textContent));
                
                // Release lock after a short delay
                setTimeout(() => {
                    window.patternFixState.isProcessingClick = false;
                }, 100);
            };
        });
    }
    
    function getCurrentPattern() {
        // Try to get from original code first
        if (typeof patternTemplates !== 'undefined' && typeof currentPatternIndex !== 'undefined') {
            return patternTemplates[currentPatternIndex];
        }
        
        // Fallback: create a simple pattern
        return {
            pattern: ['🔴', '🔵', '🔴', '🔵'],
            solution: ['🔴', '🔵']
        };
    }
    
    function getSolutionLength(pattern) {
        if (pattern && pattern.solution) {
            return pattern.solution.length;
        }
        return 2; // Default
    }
    
    function updateSolutionUI() {
        const patternSolution = document.getElementById('pattern-solution');
        if (!patternSolution) return;
        
        const slots = patternSolution.querySelectorAll('.pattern-slot');
        
        slots.forEach((slot, index) => {
            if (index < window.patternFixState.selectedPatterns.length) {
                slot.textContent = window.patternFixState.selectedPatterns[index];
            } else {
                slot.textContent = '?';
            }
        });
        
        // Also update original array if it exists
        if (typeof selectedPatterns !== 'undefined') {
            selectedPatterns = [...window.patternFixState.selectedPatterns];
            
            // Call original update function if available
            if (typeof updateSolutionDisplay === 'function') {
                updateSolutionDisplay();
            }
        }
    }
    
    function setupCheckButton() {
        const checkButton = document.getElementById('pattern-check');
        if (!checkButton || checkButton.dataset.patternFixApplied) return;
        
        checkButton.dataset.patternFixApplied = 'true';
        
        // Replace click handler
        checkButton.onclick = function() {
            console.log('[PatternFix] Check button clicked');
            
            const currentPattern = getCurrentPattern();
            if (!currentPattern) return;
            
            // Get current solution
            window.patternFixState.currentSolution = currentPattern.solution || [];
            
            // Check if all slots are filled
            const solutionLength = getSolutionLength(currentPattern);
            if (window.patternFixState.selectedPatterns.length < solutionLength) {
                const resultMessage = document.getElementById('pattern-result');
                if (resultMessage) {
                    resultMessage.textContent = 'Please fill in all the pattern slots.';
                    resultMessage.className = 'result-message error';
                }
                return;
            }
            
            // Check if the answer is correct
            const isCorrect = checkAnswer(window.patternFixState.selectedPatterns, window.patternFixState.currentSolution);
            
            if (isCorrect) {
                handleCorrectAnswer();
            } else {
                handleIncorrectAnswer();
            }
        };
    }
    
    function checkAnswer(selected, solution) {
        if (selected.length !== solution.length) return false;
        
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] !== solution[i]) return false;
        }
        
        return true;
    }
    
    function handleCorrectAnswer() {
        console.log('[PatternFix] Correct answer!');
        
        // Show success message
        const resultMessage = document.getElementById('pattern-result');
        if (resultMessage) {
            resultMessage.textContent = '🎉 Correct! You found the pattern!';
            resultMessage.className = 'result-message success animated-feedback';
        }
        
        // Play sound
        if (typeof playSound === 'function') {
            playSound('success');
        }
        
        // Update progress
        if (typeof patternsSolved !== 'undefined') {
            patternsSolved++;
        }
        
        // Update UI
        updateStatsDisplay();
        
        // Prepare for next pattern after a delay
        setTimeout(() => {
            // Move to next pattern
            if (typeof currentPatternIndex !== 'undefined') {
                currentPatternIndex++;
            }
            
            // Reset selected patterns
            resetPatternTracking();
            
            // Display next pattern
            if (typeof displayPattern === 'function') {
                displayPattern();
                
                // Setup buttons again after pattern is displayed
                setTimeout(() => {
                    setupChoiceButtons();
                }, 200);
            }
        }, 2000);
    }
    
    function handleIncorrectAnswer() {
        console.log('[PatternFix] Incorrect answer');
        
        // Show error message
        const resultMessage = document.getElementById('pattern-result');
        if (resultMessage) {
            resultMessage.textContent = '❌ That\'s not the right pattern. Try again!';
            resultMessage.className = 'result-message error';
        }
        
        // Play sound
        if (typeof playSound === 'function') {
            playSound('error');
        }
    }
    
    function setupResetButton() {
        const resetButton = document.getElementById('pattern-reset');
        if (!resetButton || resetButton.dataset.patternFixApplied) return;
        
        resetButton.dataset.patternFixApplied = 'true';
        
        // Replace click handler
        resetButton.onclick = function() {
            console.log('[PatternFix] Reset button clicked');
            
            // Clear selected patterns
            window.patternFixState.selectedPatterns = [];
            
            // Also clear original array if it exists
            if (typeof selectedPatterns !== 'undefined') {
                selectedPatterns = [];
            }
            
            // Update UI
            updateSolutionUI();
            
            // Clear result message
            const resultMessage = document.getElementById('pattern-result');
            if (resultMessage) {
                resultMessage.textContent = '';
                resultMessage.className = 'result-message';
            }
            
            // Play sound
            if (typeof playSound === 'function') {
                playSound('click');
            }
        };
    }
    
    function updateStatsDisplay() {
        if (typeof patternsSolved === 'undefined' || typeof patternLevel === 'undefined') return;
        
        console.log('[PatternFix] Updating stats - patternsSolved:', patternsSolved);
        
        // Calculate level based on patterns solved
        patternLevel = Math.floor(patternsSolved / 2) + 1;
        
        // Update UI elements
        const levelSpan = document.getElementById('sequence-level');
        const solvedSpan = document.getElementById('sequence-solved');
        
        if (levelSpan) levelSpan.textContent = patternLevel;
        if (solvedSpan) solvedSpan.textContent = patternsSolved;
        
        // Update progress bar
        const progressBar = document.getElementById('sequence-progress');
        if (progressBar) {
            const progressPercentage = (patternsSolved % 2) / 2 * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
        
        // Debug output for stats
        console.log('[PatternFix] Stats updated - Level:', patternLevel, 'Solved:', patternsSolved);
        console.log('[PatternFix] UI Elements - levelSpan:', levelSpan ? levelSpan.textContent : 'null', 
                    'solvedSpan:', solvedSpan ? solvedSpan.textContent : 'null');
    }
    
    // Helper function to get event listeners (simplified implementation)
    function getEventListeners(element, eventType) {
        // We can't directly access event listeners in standard browsers
        // This is just a placeholder - in reality, we're replacing the handlers completely
        return [];
    }
});
