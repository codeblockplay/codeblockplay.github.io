// Pattern Sequencer Fix Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('[PatternFix] Script loaded');
    
    // Create a global tracker for selected patterns to prevent double application
    window.patternFixSelectedPatterns = [];
    
    // Wait a bit to ensure the main script has run
    setTimeout(fixPatternSequencer, 500);
    
    // Setup activity button event listener to ensure fix runs when activity is selected
    const sequenceButton = document.querySelector('[data-activity="sequence"]');
    if (sequenceButton) {
        console.log('[PatternFix] Found sequence button, adding listener');
        sequenceButton.addEventListener('click', function() {
            console.log('[PatternFix] Sequence button clicked, running fix');
            // Reset our tracking to sync with the original code
            window.patternFixSelectedPatterns = [];
            
            // Use our more aggressive initialization
            setTimeout(() => {
                fixPatternSequencer();
                ensurePatternActivityInitialized();
            }, 500);
        });
    }
    
    // Also add click handler fix for the pattern choices
    addPatternClickHandlerFix();
    
    function addPatternClickHandlerFix() {
        console.log('[PatternFix] Adding pattern click handler fix');
        
        // Monitor DOM changes to catch when new pattern choices are added
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    // Look for pattern choice buttons that were added
                    mutation.addedNodes.forEach(function(node) {
                        if (node.classList && node.classList.contains('pattern-choice') && !node.dataset.fixApplied) {
                            console.log('[PatternFix] Fixing newly added pattern choice button');
                            fixPatternButton(node);
                        }
                    });
                }
            });
        });
        
        // Start observing the document
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
        
        // Fix any existing pattern choice buttons
        document.querySelectorAll('.pattern-choice').forEach(fixPatternButton);
    }
    
    function fixPatternButton(button) {
        if (button.dataset.fixApplied) return; // Don't apply fix twice
        
        // Mark as fixed
        button.dataset.fixApplied = 'true';
        
        // Store but don't remove the original click handler
        const originalClick = button.onclick;
        
        // Replace with our own handler that coordinates between systems
        button.onclick = function(e) {
            console.log('[PatternFix] Pattern button clicked:', button.textContent);
            
            // Get the current pattern data
            const currentPattern = typeof patternTemplates !== 'undefined' && typeof currentPatternIndex !== 'undefined' 
                ? patternTemplates[currentPatternIndex] 
                : null;
            
            // Get solution length (default to 2 if we can't determine it)
            const solutionLength = currentPattern ? currentPattern.solution.length : 2;
            
            // Check if our global tracker already has enough items
            if (window.patternFixSelectedPatterns && window.patternFixSelectedPatterns.length >= solutionLength) {
                console.log('[PatternFix] Pattern slots already full, ignoring click');
                return; // Prevent adding more than needed
            }
            
            // Get the pattern from the button
            const pattern = button.dataset.pattern || button.textContent;
            
            // Add to our global tracker
            if (!window.patternFixSelectedPatterns) {
                window.patternFixSelectedPatterns = [];
            }
            window.patternFixSelectedPatterns.push(pattern);
            console.log('[PatternFix] Added to patternFixSelectedPatterns:', window.patternFixSelectedPatterns);
            
            // Update the original array used by main code
            if (typeof selectedPatterns !== 'undefined') {
                // Start fresh to avoid duplicates
                selectedPatterns.length = 0;
                
                // Copy our patterns to the original array
                for (const p of window.patternFixSelectedPatterns) {
                    selectedPatterns.push(p);
                }
                
                // Call original update function if available
                if (typeof updateSolutionDisplay === 'function') {
                    updateSolutionDisplay();
                }
            } else {
                // Fallback to manual update if original variables aren't available
                console.log('[PatternFix] Using fallback pattern display');
                // Use manual update function if it exists
                if (typeof window.updatePatternSolutionDisplayManual === 'function') {
                    window.updatePatternSolutionDisplayManual();
                }
                
                // Fall back to manual pattern selection
                const patternSolution = document.getElementById('pattern-solution');
                if (patternSolution) {
                    // Find the first empty slot
                    const slots = patternSolution.querySelectorAll('.pattern-slot');
                    let emptySlotFound = false;
                    
                    slots.forEach(slot => {
                        if (!emptySlotFound && slot.textContent === '?') {
                            slot.textContent = pattern;
                            emptySlotFound = true;
                            
                            // Play sound if available
                            if (typeof playSound === 'function') {
                                playSound('click');
                            }
                        }
                    });
                }
            }
        };
    }
    
    function fixPatternSequencer() {
        console.log('[PatternFix] Running Pattern Sequencer fix');
        
        // Check if the activity is visible
        const sequenceActivity = document.getElementById('sequence-activity');
        if (!sequenceActivity || !sequenceActivity.classList.contains('active')) {
            console.log('[PatternFix] Activity not active, skipping fix');
            return;
        }
        
        // Get references to key elements
        const patternSequence = document.getElementById('pattern-sequence');
        const patternChoices = document.getElementById('pattern-choices');
        const patternSolution = document.getElementById('pattern-solution');
        
        // Check if elements exist
        if (!patternSequence || !patternChoices || !patternSolution) {
            console.error('[PatternFix] Could not find all required elements');
            return;
        }
        
        // Check if content is missing
        if (patternChoices.children.length === 0) {
            console.log('[PatternFix] Pattern choices empty, forcing refresh');
            
            // Force re-initialization
            if (typeof initPatternActivity === 'function') {
                console.log('[PatternFix] Calling initPatternActivity()');
                
                // If counters are available, make sure they're properly initialized
                if (typeof patternsSolved !== 'undefined') {
                    console.log('[PatternFix] Current patternsSolved:', patternsSolved);
                }
                
                initPatternActivity();
                
                // Sync arrays after initialization
                setTimeout(syncPatternArrays, 200);
                
                // Make sure stats are correct
                setTimeout(updateSequenceStatsAndProgress, 300);
            } else {
                console.error('[PatternFix] initPatternActivity function not found');
                
                // Create some default pattern choices if function not available
                createDefaultPatterns();
            }
        } else {
            console.log('[PatternFix] Pattern choices already populated');
            
            // Make sure our arrays are in sync
            syncPatternArrays();
            
            // Update stats and progress
            updateSequenceStatsAndProgress();
        }
        
        // Also fix the check button to ensure proper progress tracking
        fixCheckButton();
        
        // Fix the reset button
        fixResetButton();
        
        // Make sure all buttons are properly fixed
        document.querySelectorAll('.pattern-choice').forEach(fixPatternButton);
    }
    
    function createDefaultPatterns() {
        console.log('[PatternFix] Creating default patterns');
        
        const patternSequence = document.getElementById('pattern-sequence');
        const patternChoices = document.getElementById('pattern-choices');
        const patternSolution = document.getElementById('pattern-solution');
        
        if (!patternSequence || !patternChoices || !patternSolution) return;
        
        // Clear containers
        patternSequence.innerHTML = '';
        patternChoices.innerHTML = '';
        patternSolution.innerHTML = '';
        
        // Create a default pattern
        const defaultPattern = ['🔴', '🔵', '🔴', '🔵'];
        defaultPattern.forEach(item => {
            const patternItem = document.createElement('div');
            patternItem.className = 'pattern-item';
            patternItem.textContent = item;
            patternSequence.appendChild(patternItem);
        });
        
        // Add question marks
        const questionItem1 = document.createElement('div');
        questionItem1.className = 'pattern-item';
        questionItem1.textContent = '?';
        patternSequence.appendChild(questionItem1);
        
        const questionItem2 = document.createElement('div');
        questionItem2.className = 'pattern-item';
        questionItem2.textContent = '?';
        patternSequence.appendChild(questionItem2);
        
        // Use global tracker for selected patterns
        window.patternFixSelectedPatterns = [];
        
        // Add choices with proper click handlers
        const choices = ['🔴', '🔵', '🟢', '🟡'];
        choices.forEach(item => {
            const choiceButton = document.createElement('button');
            choiceButton.className = 'btn pattern-choice';
            choiceButton.textContent = item;
            choiceButton.dataset.pattern = item;
            
            // Set button color based on item
            switch(item) {
                case '🔴':
                    choiceButton.classList.add('btn-outline-danger');
                    break;
                case '🔵':
                    choiceButton.classList.add('btn-outline-primary');
                    break;
                case '🟢':
                    choiceButton.classList.add('btn-outline-success');
                    break;
                case '🟡':
                    choiceButton.classList.add('btn-outline-warning');
                    break;
            }
            
            // Add click handler
            choiceButton.addEventListener('click', function() {
                console.log(`[PatternFix] Pattern choice clicked: ${item}`);
                
                // Add the pattern to selected patterns if there's still room
                if (window.patternFixSelectedPatterns.length < 2) { // Hardcoded to 2 slots for default pattern
                    window.patternFixSelectedPatterns.push(item);
                    
                    // Update solution display
                    updatePatternSolutionDisplay();
                    
                    // Play click sound if available
                    if (typeof playSound === 'function') {
                        playSound('click');
                    } else {
                        console.log('[PatternFix] playSound function not available');
                    }
                }
            });
            
            patternChoices.appendChild(choiceButton);
        });
        
        // Create solution slots
        for (let i = 0; i < 2; i++) {
            const solutionSlot = document.createElement('div');
            solutionSlot.className = 'pattern-slot';
            solutionSlot.dataset.index = i;
            solutionSlot.textContent = '?';
            patternSolution.appendChild(solutionSlot);
        }
        
        // Add reset button functionality
        const resetButton = document.getElementById('pattern-reset');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                console.log('[PatternFix] Reset button clicked');
                window.patternFixSelectedPatterns.length = 0; // Clear array
                updatePatternSolutionDisplay();
                
                if (typeof playSound === 'function') {
                    playSound('click');
                }
            });
        }
        
        // Add check button functionality 
        const checkButton = document.getElementById('pattern-check');
        if (checkButton) {
            // Remove existing click handlers to avoid duplication
            const existingClickHandler = checkButton.onclick;
            checkButton.onclick = null;
            
            checkButton.addEventListener('click', function() {
                console.log('[PatternFix] Check button clicked');
                
                // Try original checker first if available
                if (typeof checkPatternAnswer === 'function') {
                    console.log('[PatternFix] Using original checkPatternAnswer function');
                    checkPatternAnswer();
                    return;
                }
                
                // Fall back to our own checker
                const resultMessage = document.getElementById('pattern-result');
                
                // Only proceed if the original checker didn't work
                if (window.patternFixSelectedPatterns.join('') === '🔴🔵') {
                    console.log('[PatternFix] Pattern is correct!');
                    if (resultMessage) {
                        resultMessage.textContent = 'Correct! You found the pattern!';
                        resultMessage.className = 'result-message success animated-feedback';
                    }
                    if (typeof playSound === 'function') {
                        playSound('success');
                    }
                    
                    // Update progress manually if needed
                    if (typeof patternsSolved !== 'undefined') {
                        patternsSolved++;
                        console.log('[PatternFix] Updated patternsSolved:', patternsSolved);
                        
                        // Update the UI
                        updateSequenceStatsAndProgress();
                        
                        // Show next pattern after delay
                        setTimeout(() => {
                            if (typeof currentPatternIndex !== 'undefined') {
                                currentPatternIndex++;
                                console.log('[PatternFix] Moving to next pattern');
                                
                                if (typeof displayPattern === 'function') {
                                    displayPattern();
                                } else {
                                    window.location.reload(); // Last resort
                                }
                            }
                        }, 2000);
                    }
                } else {
                    console.log('[PatternFix] Pattern is incorrect');
                    if (resultMessage) {
                        resultMessage.textContent = 'Not quite right. Try again!';
                        resultMessage.className = 'result-message error animated-feedback';
                    }
                    if (typeof playSound === 'function') {
                        playSound('error');
                    }
                }
            });
        }
        
        // Function to update the solution display based on selected patterns
        function updatePatternSolutionDisplay() {
            const slots = patternSolution.querySelectorAll('.pattern-slot');
            
            slots.forEach((slot, index) => {
                if (index < window.patternFixSelectedPatterns.length) {
                    slot.textContent = window.patternFixSelectedPatterns[index];
                } else {
                    slot.textContent = '?';
                }
            });
        }
        
        // Global function for manual pattern solution display
        window.updatePatternSolutionDisplayManual = function() {
            const patternSolution = document.getElementById('pattern-solution');
            if (!patternSolution) return;
            
            const slots = patternSolution.querySelectorAll('.pattern-slot');
            
            slots.forEach((slot, index) => {
                if (index < window.patternFixSelectedPatterns.length) {
                    slot.textContent = window.patternFixSelectedPatterns[index];
                } else {
                    slot.textContent = '?';
                }
            });
        };
    }
    
    // Set up helper functions to sync arrays and update progress
    function syncPatternArrays() {
        // Ensure our arrays match
        if (typeof selectedPatterns !== 'undefined') {
            // Make a copy of the original array
            window.patternFixSelectedPatterns = [...selectedPatterns];
            console.log('[PatternFix] Synced arrays:', window.patternFixSelectedPatterns);
        }
    }
    
    function updateSequenceStatsAndProgress() {
        // Only run if the original variables are defined
        if (typeof patternsSolved !== 'undefined' && typeof currentPatternIndex !== 'undefined') {
            console.log('[PatternFix] Updating stats - patternsSolved:', patternsSolved);
            
            // Force the UI elements to update
            const levelSpan = document.getElementById('sequence-level');
            const solvedSpan = document.getElementById('sequence-solved');
            const totalSpan = document.getElementById('sequence-total');
            
            // Make sure level calculation is correct
            if (typeof patternLevel !== 'undefined') {
                patternLevel = Math.floor(patternsSolved / 2) + 1;
            }
            
            // Update spans directly for immediate visual feedback
            if (levelSpan && typeof patternLevel !== 'undefined') levelSpan.textContent = patternLevel;
            if (solvedSpan) solvedSpan.textContent = patternsSolved;
            if (totalSpan && !totalSpan.textContent) totalSpan.textContent = '10';
            
            // Then call original update functions if available
            if (typeof updateSequenceStats === 'function') {
                updateSequenceStats();
                
                // Double check that UI was actually updated
                setTimeout(() => {
                    if (solvedSpan && solvedSpan.textContent !== String(patternsSolved)) {
                        console.log('[PatternFix] Forcing UI update');
                        solvedSpan.textContent = patternsSolved;
                    }
                }, 100);
            }
            
            // Update progress bar
            const progressBar = document.getElementById('sequence-progress');
            if (progressBar) {
                const progressPercentage = (patternsSolved % 2) / 2 * 100;
                progressBar.style.width = `${progressPercentage}%`;
            }
            
            if (typeof updateSequenceProgress === 'function') {
                updateSequenceProgress();
            }
        }
    }
    
    function fixResetButton() {
        const resetButton = document.getElementById('pattern-reset');
        if (resetButton && !resetButton.dataset.fixApplied) {
            resetButton.dataset.fixApplied = 'true';
            
            // Add our handler to sync arrays after reset
            const originalHandler = resetButton.onclick;
            resetButton.onclick = function(e) {
                // Call original handler if exists
                if (typeof originalHandler === 'function') {
                    originalHandler.call(this, e);
                }
                
                console.log('[PatternFix] Reset clicked, clearing arrays');
                // Clear our array
                window.patternFixSelectedPatterns = [];
                
                // Also clear the original array if it exists
                if (typeof selectedPatterns !== 'undefined') {
                    selectedPatterns.length = 0;
                }
                
                // Play sound if available
                if (typeof playSound === 'function') {
                    playSound('click');
                }
            };
        }
    }
    
    function fixCheckButton() {
        const checkButton = document.getElementById('pattern-check');
        if (checkButton && !checkButton.dataset.fixApplied) {
            checkButton.dataset.fixApplied = 'true';
            
            // Save original click handler
            const originalHandler = checkButton.onclick;
            
            // Replace with enhanced handler
            checkButton.onclick = function(e) {
                console.log('[PatternFix] Check button clicked');
                
                // Get the current pattern
                const currentPattern = typeof patternTemplates !== 'undefined' && typeof currentPatternIndex !== 'undefined' 
                    ? patternTemplates[currentPatternIndex] 
                    : null;
                
                // Make sure arrays are in sync before checking
                if (typeof selectedPatterns !== 'undefined') {
                    // Make sure arrays match
                    if (!arraysEqual(selectedPatterns, window.patternFixSelectedPatterns)) {
                        console.log('[PatternFix] Arrays out of sync, fixing before check');
                        selectedPatterns.length = 0; // Clear first
                        window.patternFixSelectedPatterns.forEach(p => selectedPatterns.push(p));
                    }
                }
                
                // Check for a correct answer first ourselves
                let isCorrect = false;
                if (currentPattern && window.patternFixSelectedPatterns.length === currentPattern.solution.length) {
                    isCorrect = arraysEqual(window.patternFixSelectedPatterns, currentPattern.solution);
                }
                
                // Call original handler if exists
                if (typeof originalHandler === 'function') {
                    originalHandler.call(this, e);
                }
                
                // If correct, manually update the progress and advance
                if (isCorrect) {
                    console.log('[PatternFix] Pattern is correct! Updating progress...');
                    
                    // Update our progress counters directly
                    if (typeof patternsSolved !== 'undefined') {
                        // Make sure it's actually incremented
                        setTimeout(function() {
                            // Force update the UI
                            const solvedSpan = document.getElementById('sequence-solved');
                            if (solvedSpan) {
                                if (solvedSpan.textContent === '0') {
                                    console.log('[PatternFix] Forcing patternsSolved update');
                                    patternsSolved++;
                                }
                                solvedSpan.textContent = patternsSolved;
                            }
                            
                            // Also update level if needed
                            const levelSpan = document.getElementById('sequence-level');
                            if (levelSpan && typeof patternLevel !== 'undefined') {
                                patternLevel = Math.floor(patternsSolved / 2) + 1;
                                levelSpan.textContent = patternLevel;
                            }
                            
                            // Update progress bar
                            const progressBar = document.getElementById('sequence-progress');
                            if (progressBar) {
                                const progressPercentage = (patternsSolved % 2) / 2 * 100;
                                progressBar.style.width = `${progressPercentage}%`;
                            }
                            
                            // After short delay, show next pattern
                            setTimeout(() => {
                                if (typeof currentPatternIndex !== 'undefined') {
                                    // Make sure index is updated
                                    currentPatternIndex++;
                                    
                                    // Clear selections
                                    window.patternFixSelectedPatterns = [];
                                    if (typeof selectedPatterns !== 'undefined') {
                                        selectedPatterns.length = 0;
                                    }
                                    
                                    console.log('[PatternFix] Forcing display of next pattern');
                                    // Display next pattern
                                    if (typeof displayPattern === 'function') {
                                        displayPattern();
                                    }
                                }
                            }, 2000);
                        }, 500);
                    }
                }
            };
        }
    }
    
    // Add a function to ensure the entire pattern activity is properly initialized
    function ensurePatternActivityInitialized() {
        // Reset our internal state
        window.patternFixSelectedPatterns = [];
        
        // Reset the original state if available
        if (typeof selectedPatterns !== 'undefined') {
            selectedPatterns.length = 0;
        }
        
        // Check if we need to initialize from scratch
        if (typeof initPatternActivity === 'function') {
            // Only reinitialize if the UI doesn't look right
            const solvedSpan = document.getElementById('sequence-solved');
            const patternChoices = document.getElementById('pattern-choices');
            
            if (!solvedSpan || !solvedSpan.textContent || patternChoices.children.length === 0) {
                console.log('[PatternFix] Forcing complete pattern activity reinitialization');
                
                // Reset pattern variables to their initial state
                if (typeof patternsSolved !== 'undefined') patternsSolved = 0;
                if (typeof currentPatternIndex !== 'undefined') currentPatternIndex = 0;
                if (typeof patternLevel !== 'undefined') patternLevel = 1;
                
                // Call initialization
                initPatternActivity();
            }
        }
        
        // After a short delay, make sure our UI is up to date
        setTimeout(() => {
            updateSequenceStatsAndProgress();
            
            // Fix the buttons
            fixCheckButton();
            fixResetButton();
            
            // Fix existing pattern choice buttons
            document.querySelectorAll('.pattern-choice').forEach(fixPatternButton);
        }, 300);
    }
    
    // Helper function to check if two arrays are equal
    function arraysEqual(a, b) {
        if (!a || !b) return false;
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
});
