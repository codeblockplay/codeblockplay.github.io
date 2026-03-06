// Coding Activities JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Audio feedback setup with improved playback
    const playSound = (type) => {
        try {
            let soundPath;
            
            // Define the sound paths
            switch (type) {
                case 'success':
                    soundPath = '../sounds/success.mp3';
                    break;
                case 'error':
                    soundPath = '../sounds/error.mp3';
                    break;
                case 'click':
                    soundPath = '../sounds/click.mp3';
                    break;
                default:
                    return;
            }
            
            // Play sound directly
            const sound = new Audio(soundPath);
            sound.volume = 0.7; // Set a reasonable volume
            
            // Force sound to load and play
            sound.load();
            
            // Play sound immediately (with fallback/error handling)
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.log('Sound playback issue:', err);
                    // Try again with user interaction flag
                    document.addEventListener('click', function soundPlayHandler() {
                        sound.play();
                        document.removeEventListener('click', soundPlayHandler);
                    }, { once: true });
                });
            }
        } catch (err) {
            console.log('Sound system error:', err);
        }
    };

    // Activity Selection
    const activitySelector = document.querySelectorAll('.btn-activity');
    const activityContainers = document.querySelectorAll('.activity-container');
    const backButtons = document.querySelectorAll('.back-btn');

    // Initialize - Hide all activity containers
    activityContainers.forEach(container => {
        container.classList.remove('active');
    });

    // Show activity when button is clicked
    activitySelector.forEach(button => {
        button.addEventListener('click', function() {
            const activity = this.dataset.activity;
            playSound('click');
            
            // Hide all activities
            activityContainers.forEach(container => {
                container.classList.remove('active');
            });
            
            // Show selected activity
            const activityElement = document.getElementById(activity + '-activity');
            if (activityElement) {
                console.log('Showing activity:', activity);
                activityElement.classList.add('active');
            } else {
                console.error('Could not find activity element:', activity + '-activity');
            }
            
            // Initialize the activity
            switch(activity) {
                case 'binary':
                    initBinaryActivity();
                    break;
                case 'grid':
                    initGridActivity();
                    break;
                case 'sequence':
                    initPatternActivity();
                    break;
                // Removed other activities
            }
        });
    });

    // Back buttons
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            playSound('click');
            
            // Hide all activities
            activityContainers.forEach(container => {
                container.classList.remove('active');
            });
        });
    });

    // Show more binary letters button
    const showMoreBinaryBtn = document.querySelector('.show-more-binary');
    if (showMoreBinaryBtn) {
        showMoreBinaryBtn.addEventListener('click', function() {
            playSound('click');
            this.textContent = this.textContent === 'Show More Letters' ? 'Show Less Letters' : 'Show More Letters';
            
            const binaryReference = document.querySelector('.binary-reference .row');
            const moreLetters = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                    <div class="binary-card">
                        <div class="binary-value">01001001</div>
                        <div class="binary-letter">I</div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                    <div class="binary-card">
                        <div class="binary-value">01001010</div>
                        <div class="binary-letter">J</div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                    <div class="binary-card">
                        <div class="binary-value">01001011</div>
                        <div class="binary-letter">K</div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                    <div class="binary-card">
                        <div class="binary-value">01001100</div>
                        <div class="binary-letter">L</div>
                    </div>
                </div>
            `;
            
            if (this.textContent === 'Show Less Letters') {
                binaryReference.innerHTML += moreLetters;
            } else {
                // Remove the additional cards
                const allCards = binaryReference.querySelectorAll('.col-12');
                for (let i = 8; i < allCards.length; i++) {
                    allCards[i].remove();
                }
            }
        });
    }

    // Binary Decoder Activity
    const binaryWords = [
        { binary: ['01001000', '01001001'], word: 'HI' },
        { binary: ['01000011', '01000001', '01010100'], word: 'CAT' },
        { binary: ['01000100', '01001111', '01000111'], word: 'DOG' },
        { binary: ['01010011', '01010101', '01001110'], word: 'SUN' },
        { binary: ['01010000', '01001100', '01000001', '01011001'], word: 'PLAY' },
        { binary: ['01000011', '01001111', '01000100', '01000101'], word: 'CODE' },
        { binary: ['01010011', '01010100', '01000001', '01010010'], word: 'STAR' },
        { binary: ['01001010', '01010101', '01001101', '01010000'], word: 'JUMP' },
        { binary: ['01000010', '01001111', '01001111', '01001011'], word: 'BOOK' },
        { binary: ['01010011', '01001101', '01001001', '01001100', '01000101'], word: 'SMILE' }
    ];

    let currentBinaryIndex = 0;
    let binarySolved = 0;
    let binaryLevel = 1;

    function initBinaryActivity() {
        currentBinaryIndex = 0;
        binarySolved = 0;
        binaryLevel = 1;
        
        updateBinaryStats();
        displayBinaryWord();
    }

    function displayBinaryWord() {
        const binaryWordContainer = document.getElementById('current-binary-word');
        const answerBoxesContainer = document.getElementById('answer-boxes');
        
        if (!binaryWordContainer || !answerBoxesContainer) return;
        
        binaryWordContainer.innerHTML = '';
        answerBoxesContainer.innerHTML = '';
        
        // Display the binary digits for the current word
        const currentWord = binaryWords[currentBinaryIndex];
        
        currentWord.binary.forEach(binaryLetter => {
            const binaryDigitDisplay = document.createElement('div');
            binaryDigitDisplay.className = 'binary-digit-display';
            
            for (let i = 0; i < binaryLetter.length; i++) {
                const digit = document.createElement('span');
                digit.className = 'binary-digit';
                digit.textContent = binaryLetter[i];
                binaryDigitDisplay.appendChild(digit);
            }
            
            binaryWordContainer.appendChild(binaryDigitDisplay);
        });
        
        // Create answer boxes for the word
        for (let i = 0; i < currentWord.word.length; i++) {
            const answerBox = document.createElement('input');
            answerBox.type = 'text';
            answerBox.className = 'answer-box';
            answerBox.maxLength = 1;
            answerBox.dataset.index = i;
            
            // Auto-focus on next box when a letter is entered
            answerBox.addEventListener('input', function() {
                if (this.value.length === this.maxLength) {
                    const nextBox = document.querySelector(`.answer-box[data-index="${parseInt(this.dataset.index) + 1}"]`);
                    if (nextBox) nextBox.focus();
                }
            });
            
            // Allow backspace to go to previous box
            answerBox.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && this.value === '') {
                    const prevBox = document.querySelector(`.answer-box[data-index="${parseInt(this.dataset.index) - 1}"]`);
                    if (prevBox) prevBox.focus();
                }
            });
            
            answerBoxesContainer.appendChild(answerBox);
        }
        
        // Focus on first answer box
        const firstBox = document.querySelector('.answer-box[data-index="0"]');
        if (firstBox) firstBox.focus();
    }

    // Binary Check Answer Button
    const binaryCheckButton = document.getElementById('binary-check');
    if (binaryCheckButton) {
        binaryCheckButton.addEventListener('click', function() {
            checkBinaryAnswer();
        });
    }

    // Binary Next Button
    const binaryNextButton = document.getElementById('binary-next');
    if (binaryNextButton) {
        binaryNextButton.addEventListener('click', function() {
            nextBinaryWord();
        });
    }

    function checkBinaryAnswer() {
        const answerBoxes = document.querySelectorAll('.answer-box');
        const resultMessage = document.getElementById('binary-result');
        
        if (!resultMessage) return;
        
        let userAnswer = '';
        answerBoxes.forEach(box => {
            userAnswer += box.value.toUpperCase();
        });
        
        const correctAnswer = binaryWords[currentBinaryIndex].word;
        
        if (userAnswer === correctAnswer) {
            playSound('success');
            resultMessage.textContent = '🎉 Correct! You decoded the binary!';
            resultMessage.className = 'result-message success animated-feedback';
            binaryNextButton.disabled = false;
            
            binarySolved++;
            updateBinaryProgress();
            updateBinaryStats();
            
            // Check if level up (every 3 solved words)
            if (binarySolved % 3 === 0 && binarySolved > 0) {
                binaryLevel++;
                resultMessage.textContent = `🎉 Level Up! You're now at Level ${binaryLevel}!`;
                updateBinaryStats();
            }
        } else {
            playSound('error');
            resultMessage.textContent = '❌ That\'s not quite right. Try again!';
            resultMessage.className = 'result-message error animated-feedback';
            binaryNextButton.disabled = true;
        }
    }

    function nextBinaryWord() {
        playSound('click');
        const resultMessage = document.getElementById('binary-result');
        
        if (resultMessage) {
            resultMessage.textContent = '';
            resultMessage.className = 'result-message';
        }
        
        currentBinaryIndex = (currentBinaryIndex + 1) % binaryWords.length;
        displayBinaryWord();
        
        binaryNextButton.disabled = true;
    }

    function updateBinaryProgress() {
        const progressBar = document.getElementById('binary-progress');
        if (progressBar) {
            const progressPercentage = (binarySolved % 3) / 3 * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    function updateBinaryStats() {
        const levelSpan = document.getElementById('binary-level');
        const solvedSpan = document.getElementById('binary-solved');
        const totalSpan = document.getElementById('binary-total');
        
        if (levelSpan) levelSpan.textContent = binaryLevel;
        if (solvedSpan) solvedSpan.textContent = binarySolved;
        if (totalSpan) totalSpan.textContent = binaryWords.length;
    }

    // Grid Explorer Activity
    let treasureLocation = { row: 0, col: '' };
    let gridLevel = 1;
    let treasuresFound = 0;

    function initGridActivity() {
        gridLevel = 1; // Always level 1 in simplified version
        treasuresFound = 0;
        updateGridStats();
        placeTreasure();
        
        // Setup grid cell click handlers - this needs to be called on initialization
        setupGridCellClickHandlers();
    }
    
    // This separate function allows us to reset click handlers when needed
    function setupGridCellClickHandlers() {
        // Add click handlers to grid cells
        const gridCells = document.querySelectorAll('.grid-cell');
        
        gridCells.forEach(cell => {
            // First remove any existing click listeners
            cell.removeEventListener('click', handleGridCellClick);
            
            // Then add fresh click listener
            cell.addEventListener('click', handleGridCellClick);
        });
    }
    
    // Separate the handler function for cleaner code
    function handleGridCellClick() {
        // First check if this cell has already been clicked (marked as searched or correct)
        if (this.classList.contains('searched') || this.classList.contains('correct')) {
            console.log('Cell already checked, skipping');
            return; // Skip already checked cells
        }
        
        // Get row and column from data attributes
        const row = this.getAttribute('data-row');
        const col = this.getAttribute('data-col');
        
        console.log(`Cell clicked: Row ${row}, Column ${col}`);
        
        // Set the hidden input values
        const rowInput = document.getElementById('grid-row-input');
        const colInput = document.getElementById('grid-col-input');
        
        if (rowInput && colInput) {
            // FIXED: Explicitly set the input values and verify they're set correctly
            // Use the setAttribute method as an additional way to ensure values are set
            rowInput.value = row;
            rowInput.setAttribute('value', row);
            colInput.value = col;
            colInput.setAttribute('value', col);
            
            console.log(`Set input values: Row=${rowInput.value}, Col=${colInput.value}`);
            
            // Add digging animation to the clicked cell
            this.classList.add('digging');
            
            // Try playing sound with a fallback
            try {
                playSound('click');
            } catch (err) {
                console.log("Sound feedback skipped:", err);
            }
            
            // Check the answer after a short delay for animation
            setTimeout(() => {
                this.classList.remove('digging');
                
                // Store a reference to the clicked cell
                const clickedCell = this;
                console.log('Checking answer for cell:', row, col);
                     // Make sure to remove any background images
            clickedCell.style.backgroundImage = 'none';
            
            // FIXED: Pass the cell element and coordinates directly to checkGridAnswer
            // This ensures we're checking the correct cell even if input values somehow change
            checkGridAnswer(clickedCell, row, col);
            }, 300);
        }
    }

    function placeTreasure() {
        console.log("Setting up new treasure hunt and resetting grid...");
        
        // Clear previous grid state completely
        const gridCells = document.querySelectorAll('.grid-cell');
        
        // First remove all classes and content from cells
        gridCells.forEach(cell => {
            // Clear all content
            cell.textContent = '';
            cell.innerHTML = '';
            
            // Remove all special classes that might have been added
            cell.classList.remove('treasure', 'correct', 'highlighted', 'digging', 
                              'searched', 'shake-effect', 'treasure-found', 
                              'hint-highlight-row', 'hint-highlight-col');
            
            // Reset all inline styles completely
            cell.removeAttribute('style');
            
            // Specifically ensure these critical styles are reset
            cell.style.pointerEvents = 'auto';  // Make cells clickable again
            cell.style.animation = 'none';
            cell.style.backgroundImage = 'none';
            cell.style.backgroundColor = '';
            
            // Remove any existing event listeners by cloning and replacing
            const newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);
        });
        
        // Re-setup all click handlers
        setupGridCellClickHandlers();

        // Reset result and inputs
        const resultMessage = document.getElementById('grid-result');
        if (resultMessage) {
            resultMessage.innerHTML = 'Find the hidden treasure in the grid!';
            resultMessage.className = 'result-message info';
        }

        const rowInput = document.getElementById('grid-row-input');
        const colInput = document.getElementById('grid-col-input');
        // Make sure we're completely resetting the input values
        if (rowInput) {
            rowInput.value = '';
            rowInput.setAttribute('value', '');
        }
        if (colInput) {
            colInput.value = ''; 
            colInput.setAttribute('value', '');
        }

        // Random treasure placement
        const rows = 7;
        const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        
        treasureLocation.row = Math.floor(Math.random() * rows) + 1;
        treasureLocation.col = cols[Math.floor(Math.random() * cols.length)];
        
        // Set treasure clue based on level
        const treasureClue = document.getElementById('treasure-clue');
        if (treasureClue) {
            // Provide clues based on the level
            const resultMessage = document.getElementById('grid-result');
            
            // Always provide a direct clue showing where the treasure is
            treasureClue.innerHTML = `
                <div class="treasure-hint">
                    <div>The treasure is hiding at Row ${treasureLocation.row}, Column ${treasureLocation.col}</div>
                    <div>Click on that square to dig for the treasure!</div>
                </div>
            `;
            
            // Clear the result message
            if (resultMessage) {
                resultMessage.innerHTML = '';
                resultMessage.className = 'result-message';
            }
            
            // Highlight the row and column briefly
            setTimeout(() => {
                // Highlight the row
                const rowCells = document.querySelectorAll(`.grid-cell[data-row="${treasureLocation.row}"]`);
                rowCells.forEach(cell => cell.classList.add('hint-highlight-row'));
                setTimeout(() => rowCells.forEach(cell => cell.classList.remove('hint-highlight-row')), 1500);
                
                // Then highlight the column
                setTimeout(() => {
                    const colCells = document.querySelectorAll(`.grid-cell[data-col="${treasureLocation.col}"]`);
                    colCells.forEach(cell => cell.classList.add('hint-highlight-col'));
                    setTimeout(() => colCells.forEach(cell => cell.classList.remove('hint-highlight-col')), 1500);
                }, 2000);
            }, 1000);
        }

        // In debug mode, console log the treasure location
        console.log(`Hidden treasure at: Row ${treasureLocation.row}, Column ${treasureLocation.col}`);
    }

    // We no longer need the Grid Check Button as we're using direct cell clicks

    // Function to check if the clicked coordinates match the target
    function checkGridAnswer(clickedCell = null, clickedRow = null, clickedCol = null) {
        const rowInput = document.getElementById('grid-row-input');
        const colInput = document.getElementById('grid-col-input');
        const resultMessage = document.getElementById('grid-result');
        
        if (!resultMessage) return;
        
        // Use passed parameters if available, otherwise fall back to input values
        const userRow = clickedRow || (rowInput ? rowInput.value : "");
        const userCol = clickedCol || (colInput ? colInput.value : "");
        
        // Debug output to help diagnose the issue
        console.log(`Checking coordinates: Row=${userRow}, Col=${userCol}, Treasure at: Row=${treasureLocation.row}, Col=${treasureLocation.col}`);
        
        // Make sure we have valid input
        if (userRow === "" || userCol === "") {
            resultMessage.innerHTML = 'Click on a grid position to test your coordinates!';
            resultMessage.className = 'result-message info animated-feedback';
            console.log("No valid input detected");
            return;
        }
        
        // Get the selected cell - either use the passed cell or query for it
        const selectedCell = clickedCell || document.querySelector(`.grid-cell[data-row="${userRow}"][data-col="${userCol}"]`);
        console.log("Selected cell found:", selectedCell ? "Yes" : "No");
        
        // Clear previous highlights but not the correct cell
        document.querySelectorAll('.grid-cell:not(.correct)').forEach(cell => {
            cell.classList.remove('highlighted');
        });
        
        if (selectedCell) {
            selectedCell.classList.add('highlighted');
            
            // Make cell non-clickable once it's been checked
            selectedCell.style.pointerEvents = 'none';
        }
        
        // Convert values for comparison
        const userRowNum = parseInt(userRow, 10);
        const treasureRowNum = parseInt(treasureLocation.row, 10);
        const userColStr = String(userCol).toUpperCase();
        const treasureColStr = String(treasureLocation.col).toUpperCase();
        
        console.log(`Comparing coordinates - userRow: ${userRowNum}, treasureRow: ${treasureRowNum}`);
        console.log(`Comparing coordinates - userCol: ${userColStr}, treasureCol: ${treasureColStr}`);
        
        // Check if the selection matches the treasure location
        const isCorrectRow = !isNaN(userRowNum) && !isNaN(treasureRowNum) && userRowNum === treasureRowNum;
        const isCorrectCol = userColStr && treasureColStr && userColStr === treasureColStr;
        
        console.log(`Coordinate match check: Row match: ${isCorrectRow}, Column match: ${isCorrectCol}`);
        
        console.log(`Comparing: ${isCorrectRow ? 'Row matches!' : 'Row does not match'}, ${isCorrectCol ? 'Column matches!' : 'Column does not match'}`);
        
        if (isCorrectRow && isCorrectCol) {
            console.log('✓✓✓ CORRECT COORDINATES FOUND! Executing success animation... ✓✓✓');
            try {
                playSound('success');
            } catch (err) {
                console.error('Failed to play success sound:', err);
            }
            
            // Use a treasure hunt themed success message
            resultMessage.innerHTML = `
                <div class="treasure-success">
                    <div>💰 TREASURE FOUND! 💰</div>
                    <div>X marks the spot at Row ${userRowNum}, Column ${userColStr}!</div>
                </div>
                <div class="mt-2">🎉 Great job! You found the hidden treasure! �</div>
            `;
            resultMessage.className = 'result-message success animated-feedback';
            
            // Create a treasure reveal animation
            if (selectedCell) {
                console.log('Animating selected cell:', selectedCell);
                
                // Ensure cell is marked as correct to prevent further clicking
                selectedCell.classList.add('correct');
                selectedCell.classList.add('treasure-found');
                
                // Remove any existing content
                selectedCell.innerHTML = '';
                
                // First show digging animation
                selectedCell.innerHTML = '<span class="digging-treasure">💰</span>';
                
                // Make sure the cell can't be clicked again during animation
                selectedCell.style.pointerEvents = 'none';
                
                // Then show treasure with celebration
                setTimeout(() => {
                    console.log('Showing treasure celebration');
                    if (selectedCell) {
                        selectedCell.innerHTML = '🏆';
                        
                        // Add treasure particles with a slight delay to ensure DOM is ready
                        setTimeout(() => createTreasureParticles(selectedCell), 100);
                    }
                }, 500);
            } else {
                console.error('Selected cell not found for treasure animation');
                
                // Try to find the correct cell directly
                const correctCell = document.querySelector(`.grid-cell[data-row="${treasureLocation.row}"][data-col="${treasureLocation.col}"]`);
                if (correctCell) {
                    console.log('Found correct cell manually, animating...');
                    correctCell.classList.add('correct');
                    correctCell.classList.add('treasure-found');
                    correctCell.innerHTML = '🏆';
                    createTreasureParticles(correctCell);
                }
            }
            
            // Increment treasures found counter if less than 10
            if (treasuresFound < 10) {
                treasuresFound++;
                updateGridProgress();
                updateGridStats();
            }
            
            // If we've reached 10 treasures, show completion message
            if (treasuresFound >= 10) {
                const gridContainer = document.querySelector('.grid-container');
                if (gridContainer) {
                    // Disable all cell clicks when game is completed
                    const allCells = document.querySelectorAll('.grid-cell');
                    allCells.forEach(cell => {
                        cell.style.pointerEvents = 'none';
                    });
                }
                
                // Show completion message
                resultMessage.innerHTML = `
                    <div class="completion-message">
                        <div>🎉 CONGRATULATIONS! 🎉</div>
                        <div>You've found all 10 treasures!</div>
                        <div class="mt-2">You're a master treasure hunter!</div>
                    </div>
                `;
                resultMessage.className = 'result-message success animated-feedback';
            }
            
            // Celebrate every 3 treasures found
            if (treasuresFound % 3 === 0 && treasuresFound > 0) {
                // Treasure hunt themed celebration message
                resultMessage.innerHTML = `
                    <div class="level-up-treasure">
                        <div>🏆 TREASURE MILESTONE! 🏆</div>
                        <div>Congratulations! You've found ${treasuresFound} treasures!</div>
                    </div>
                    <div class="mt-2">🗺️ Your treasure hunting skills are impressive!</div>
                `;
                updateGridStats();
            }
            
            // After a delay for celebration, set up a new treasure hunt
            // Display a treasure-themed message about the next challenge
            const treasureNextMessage = document.createElement('div');
            treasureNextMessage.className = 'treasure-next-message';
            treasureNextMessage.innerHTML = `
                <div>🗺️ New treasure map incoming...</div>
                <div>Get ready for your next adventure!</div>
            `;
            resultMessage.appendChild(treasureNextMessage);
            
            setTimeout(() => {
                // Clean up any remaining animations or particles before setting new treasure
                document.querySelectorAll('.treasure-particle, .treasure-marker').forEach(element => {
                    if (element.parentNode) element.parentNode.removeChild(element);
                });
                
                // Now set up a new treasure location challenge
                placeTreasure();
            }, 3000); // Give time to appreciate the success
        } else {
            playSound('error');
            resultMessage.className = 'result-message error';
            
            // Mark the cell as searched
            if (selectedCell) {
                selectedCell.classList.add('searched');
                
                // Add a digging mark to indicate searched location
                if (!selectedCell.classList.contains('correct')) {
                    selectedCell.innerHTML = '<span class="digging-mark">🔍</span>';
                    setTimeout(() => {
                        if (!selectedCell.classList.contains('correct')) {
                            selectedCell.innerHTML = ''; 
                        }
                    }, 2000);
                }
                
                // Add a small shake effect
                selectedCell.classList.add('shake-effect');
                setTimeout(() => {
                    selectedCell.classList.remove('shake-effect');
                }, 500);
            }
            
            // Calculate differences for hint calculation
            const rowDiff = parseInt(userRow) - treasureLocation.row;
            const colDiff = userCol.charCodeAt(0) - treasureLocation.col.charCodeAt(0);
            
            // Provide treasure hunt oriented hints based on level
            if (gridLevel === 1) {
                // Basic treasure map hint for beginners
                resultMessage.innerHTML = `
                    <div class="treasure-hint-output">
                        <div class="treasure-hint-header">🗺️ Treasure Map Clue:</div>
                        <div>The treasure is at Row ${treasureLocation.row}, Column ${treasureLocation.col}</div>
                        <div>Your dig was at Row ${userRowNum}, Column ${userColStr}</div>
                        <div>Try again! Follow the map carefully!</div>
                    </div>
                `;
            } else if (gridLevel === 2) {
                // Directional hint - guide them with compass directions
                const rowDirection = rowDiff > 0 ? "You need to dig further north!" : (rowDiff < 0 ? "You need to dig further south!" : "Your row position is correct! ✓");
                const colDirection = colDiff > 0 ? "Move to the west!" : (colDiff < 0 ? "Move to the east!" : "Your column position is correct! ✓");
                
                resultMessage.innerHTML = `
                    <div class="treasure-hint-output">
                        <div class="treasure-hint-header">🧭 Treasure Hunter's Compass:</div>
                        <div>${rowDirection}</div>
                        <div>${colDirection}</div>
                        <div>Move ${Math.abs(rowDiff)} row(s) ${rowDiff > 0 ? "up" : "down"} and ${Math.abs(colDiff)} column(s) ${colDiff > 0 ? "left" : "right"}</div>
                    </div>
                `;
            } else {
                // Advanced mysterious hint with distance
                const distance = Math.abs(rowDiff) + Math.abs(colDiff); 
                const percentClose = 100 - Math.floor((distance / 12) * 100);
                
                resultMessage.innerHTML = `
                    <div class="treasure-hint-output">
                        <div class="treasure-hint-header">🔍 Treasure Hunter's Instinct:</div>
                        <div>You are ${percentClose}% close to the treasure!</div>
                        <div>The treasure lies ${rowDiff !== 0 ? `${Math.abs(rowDiff)} spaces ${rowDiff > 0 ? "north" : "south"}` : "in the same row"}</div> 
                        <div>and ${colDiff !== 0 ? `${Math.abs(colDiff)} spaces ${colDiff > 0 ? "west" : "east"}` : "in the same column"}</div>
                    </div>
                `;
            }
            
            // For added fun, put a digging mark in the wrong cell
            if (selectedCell && !selectedCell.textContent) {
                selectedCell.textContent = '🪙';
                setTimeout(() => {
                    if (selectedCell) selectedCell.textContent = '';
                }, 1500);
            }
        }
    }

    function updateGridProgress() {
        const progressBar = document.getElementById('grid-progress');
        if (progressBar) {
            const progressPercentage = (treasuresFound % 3) / 3 * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    function updateGridStats() {
        const levelSpan = document.getElementById('grid-level');
        const foundSpan = document.getElementById('grid-found');
        const totalSpan = document.getElementById('grid-total');
        
        if (levelSpan) levelSpan.textContent = '1'; // Always level 1 in simplified version
        if (foundSpan) foundSpan.textContent = treasuresFound;
        if (totalSpan) totalSpan.textContent = '10';
        
        // Update level info - simplified version with just Treasure Hunter label
        // Note: We keep the class name for backward compatibility but display treasure hunt terms
        const levelDescription = document.querySelector(".code-level-description");
        if (levelDescription) {
            levelDescription.textContent = "Treasure Hunter";
        }
    }

    // Pattern Sequencer Activity
    const patternTemplates = [
        { 
            pattern: ['🔴', '🔵', '🔴', '🔵'], 
            solution: ['🔴', '🔵'] 
        },
        { 
            pattern: ['🟢', '🟢', '🟡', '🟢', '🟢'], 
            solution: ['🟡'] 
        },
        { 
            pattern: ['🟡', '🔴', '🔴', '🟡', '🔴'], 
            solution: ['🔴', '🟡'] 
        },
        { 
            pattern: ['🔵', '🟢', '🔵', '🟢', '🟢'], 
            solution: ['🔵', '🟢', '🟢'] 
        },
        { 
            pattern: ['🔴', '🟡', '🟢', '🔴', '🟡'], 
            solution: ['🟢', '🔴'] 
        },
        { 
            pattern: ['🟢', '🔵', '🟢', '🔵', '🟢'], 
            solution: ['🔵', '🟢'] 
        },
        { 
            pattern: ['🟡', '🟡', '🔴', '🟡', '🟡'], 
            solution: ['🔴', '🟡'] 
        },
        { 
            pattern: ['🔴', '🔵', '🟢', '🟡', '🔴'], 
            solution: ['🔵', '🟢', '🟡'] 
        },
        { 
            pattern: ['🟢', '🔴', '🟢', '🔴', '🟢'], 
            solution: ['🔴', '🟢'] 
        },
        { 
            pattern: ['🔵', '🟡', '🔵', '🟡', '🔵'], 
            solution: ['🟡', '🔵'] 
        }
    ];

    let currentPatternIndex = 0;
    let patternsSolved = 0;
    let patternLevel = 1;
    let selectedPatterns = [];

    function initPatternActivity() {
        currentPatternIndex = 0;
        patternsSolved = 0;
        patternLevel = 1;
        updateSequenceStats();
        displayPattern();
    }

    function displayPattern() {
        const patternSequence = document.getElementById('pattern-sequence');
        const patternChoices = document.getElementById('pattern-choices');
        const patternSolution = document.getElementById('pattern-solution');
        const patternResultMsg = document.getElementById('pattern-result');
        
        if (!patternSequence || !patternChoices || !patternSolution) return;
        
        // Check if all patterns are completed
        if (patternsSolved >= 10) {
            // Show completion message
            patternSequence.innerHTML = '<div class="completion-message">🎉 All patterns completed! 🎉</div>';
            patternChoices.innerHTML = '';
            patternSolution.innerHTML = '';
            
            if (patternResultMsg) {
                patternResultMsg.textContent = 'Congratulations! You\'ve completed all the pattern challenges!';
                patternResultMsg.className = 'result-message success animated-feedback';
            }
            return;
        }
        
        // Reset
        patternSequence.innerHTML = '';
        patternChoices.innerHTML = '';
        patternSolution.innerHTML = '';
        selectedPatterns = [];
        
        // Get current pattern
        const currentPattern = patternTemplates[currentPatternIndex];
        
        // Display pattern
        currentPattern.pattern.forEach(item => {
            const patternItem = document.createElement('div');
            patternItem.className = 'pattern-item';
            patternItem.textContent = item;
            patternSequence.appendChild(patternItem);
        });
        
        // Add question marks for solution slots
        for (let i = 0; i < currentPattern.solution.length; i++) {
            const questionItem = document.createElement('div');
            questionItem.className = 'pattern-item';
            questionItem.textContent = '?';
            patternSequence.appendChild(questionItem);
        }
        
        // Pattern choices
        const uniqueItems = Array.from(new Set([...currentPattern.pattern, ...currentPattern.solution]));
        
        // Add one distractor item that's not in the pattern
        const allPatternItems = ['🔴', '🔵', '🟢', '🟡'];
        const distractors = allPatternItems.filter(item => !uniqueItems.includes(item));
        
        if (distractors.length > 0) {
            uniqueItems.push(distractors[0]);
        }
        
        // Shuffle choices
        shuffleArray(uniqueItems);
        
        uniqueItems.forEach(item => {
            const choiceButton = document.createElement('button');
            choiceButton.className = 'btn pattern-choice';
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
            
            choiceButton.textContent = item;
            
            choiceButton.addEventListener('click', function() {
                if (selectedPatterns.length < currentPattern.solution.length) {
                    selectedPatterns.push(item);
                    updateSolutionDisplay();
                    playSound('click');
                }
            });
            
            patternChoices.appendChild(choiceButton);
        });
        
        // Create empty solution slots
        for (let i = 0; i < currentPattern.solution.length; i++) {
            const solutionSlot = document.createElement('div');
            solutionSlot.className = 'pattern-slot';
            solutionSlot.dataset.index = i;
            solutionSlot.textContent = '?';
            patternSolution.appendChild(solutionSlot);
        }
        
        // Reset result message
        const resultMessage = document.getElementById('pattern-result');
        if (resultMessage) {
            resultMessage.textContent = '';
            resultMessage.className = 'result-message';
        }
    }

    function updateSolutionDisplay() {
        const patternSolution = document.getElementById('pattern-solution');
        if (!patternSolution) return;
        
        const slots = patternSolution.querySelectorAll('.pattern-slot');
        
        slots.forEach((slot, index) => {
            if (index < selectedPatterns.length) {
                slot.textContent = selectedPatterns[index];
            } else {
                slot.textContent = '?';
            }
        });
    }

    // Pattern Check Button
    const patternCheckButton = document.getElementById('pattern-check');
    if (patternCheckButton) {
        patternCheckButton.addEventListener('click', function() {
            checkPatternAnswer();
        });
    }

    // Pattern Reset Button
    const patternResetButton = document.getElementById('pattern-reset');
    if (patternResetButton) {
        patternResetButton.addEventListener('click', function() {
            playSound('click');
            selectedPatterns = [];
            updateSolutionDisplay();
            
            // Reset result message
            const resultMessage = document.getElementById('pattern-result');
            if (resultMessage) {
                resultMessage.textContent = '';
                resultMessage.className = 'result-message';
            }
        });
    }

    // Sequence Builder Run button
    const sequenceRunButton = document.getElementById('sequence-run');
    if (sequenceRunButton) {
        sequenceRunButton.addEventListener('click', function() {
            runSequence();
        });
    }

    function runSequence() {
        const animationContainer = document.getElementById('animation-container');
        const resultMessage = document.getElementById('sequence-result');
        
        if (!animationContainer || !resultMessage) return;
        
        // Clear previous animations
        animationContainer.innerHTML = '';
        
        if (currentSequence.length === 0) {
            resultMessage.textContent = 'Add some steps to your sequence first!';
            resultMessage.className = 'result-message error';
            return;
        }
        
        // Display a visual representation of the sequence running
        resultMessage.textContent = 'Running your sequence...';
        resultMessage.className = 'result-message info';
        
        // Create a visual element for each step
        const task = sequenceBuilderTasks[currentSequenceTask % sequenceBuilderTasks.length];
        const stepDelay = 1000; // 1 second per step
        
        currentSequence.forEach((step, index) => {
            setTimeout(() => {
                // Highlight the step being run
                const stepElement = document.createElement('div');
                stepElement.className = 'running-step';
                stepElement.textContent = `Running: ${step}`;
                animationContainer.innerHTML = '';
                animationContainer.appendChild(stepElement);
                
                playSound('click');
                
                // Last step completed
                if (index === currentSequence.length - 1) {
                    setTimeout(() => {
                        resultMessage.textContent = 'Sequence completed! Check your answer to see if it was correct.';
                        resultMessage.className = 'result-message info';
                    }, stepDelay);
                }
            }, index * stepDelay);
        });
    }

    function checkPatternAnswer() {
        const resultMessage = document.getElementById('pattern-result');
        if (!resultMessage) return;
        
        // Don't process if we've already completed all patterns
        if (patternsSolved >= 10) {
            resultMessage.textContent = 'Congratulations! You\'ve completed all the pattern challenges!';
            resultMessage.className = 'result-message success animated-feedback';
            return;
        }
        
        const currentPattern = patternTemplates[currentPatternIndex];
        
        if (selectedPatterns.length < currentPattern.solution.length) {
            resultMessage.textContent = 'Please fill in all the pattern slots.';
            resultMessage.className = 'result-message error';
            return;
        }
        
        const isCorrect = arraysEqual(selectedPatterns, currentPattern.solution);
        
        if (isCorrect) {
            playSound('success');
            resultMessage.textContent = '🎉 Correct! You found the pattern!';
            resultMessage.className = 'result-message success animated-feedback';
            
            patternsSolved++;
            updateSequenceProgress();
            updateSequenceStats();
            
            // Check if all patterns are completed
            if (patternsSolved >= 10) {
                setTimeout(() => {
                    resultMessage.textContent = 'Congratulations! You\'ve completed all the pattern challenges!';
                    resultMessage.className = 'result-message success animated-feedback';
                    displayPattern(); // This will show the completion message
                }, 2000);
                return;
            }
            
            // After a short delay, show next pattern
            setTimeout(() => {
                currentPatternIndex++;
                displayPattern();
            }, 2000);
        } else {
            playSound('error');
            resultMessage.textContent = '❌ That\'s not the right pattern. Try again!';
            resultMessage.className = 'result-message error';
        }
    }

    function updateSequenceProgress() {
        const progressBar = document.getElementById('sequence-progress');
        if (progressBar) {
            const progressPercentage = (patternsSolved % 2) / 2 * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    function updateSequenceStats() {
        const levelSpan = document.getElementById('sequence-level');
        const solvedSpan = document.getElementById('sequence-solved');
        const totalSpan = document.getElementById('sequence-total');
        
        if (levelSpan) levelSpan.textContent = patternLevel;
        if (solvedSpan) solvedSpan.textContent = patternsSolved;
        if (totalSpan) totalSpan.textContent = '10';
    }

    // Sequence Builder Activity
    const sequenceBuilderTasks = [
        {
            id: 1,
            title: "Help the robot find treasure!",
            description: "The robot needs to navigate through the maze to find the treasure. Put the steps in the right order!",
            image: "robot-maze.svg",
            blocks: ["Move forward", "Turn right", "Move forward", "Turn left", "Move forward", "Pick up treasure"],
            solution: ["Move forward", "Turn right", "Move forward", "Turn left", "Move forward", "Pick up treasure"]
        },
        {
            id: 2,
            title: "Make a yummy sandwich!",
            description: "Put the steps in order to make a delicious sandwich for lunch!",
            image: "sandwich.svg",
            blocks: ["Place bread slice", "Add cheese", "Add lettuce", "Add tomato", "Add top bread slice", "Cut sandwich in half"],
            solution: ["Place bread slice", "Add cheese", "Add lettuce", "Add tomato", "Add top bread slice", "Cut sandwich in half"]
        },
        {
            id: 3,
            title: "Plant a beautiful flower!",
            description: "Help arrange the steps to plant a flower in the garden!",
            image: "flower.svg",
            blocks: ["Dig a hole", "Add soil", "Place seed", "Water the seed", "Wait for sunshine", "Watch it grow"],
            solution: ["Dig a hole", "Place seed", "Add soil", "Water the seed", "Wait for sunshine", "Watch it grow"]
        }
    ];

    let currentSequenceTask = 0;
    let sequencesSolved = 0;
    let sequencesLevel = 1;
    let currentSequence = [];

    function initSequenceBuilderActivity() {
        console.log('Initializing Sequence Builder Activity');
        
        // Reset state
        currentSequenceTask = 0;
        sequencesSolved = 0;
        sequencesLevel = 1;
        currentSequence = [];
        
        // Setup activity
        updateSequenceBuilderStats();
        
        try {
            // Preload images for better performance
            sequenceBuilderTasks.forEach((task, index) => {
                const img = new Image();
                if (task.id === 1) img.src = './images/robot-maze.svg';
                else if (task.id === 2) img.src = './images/sandwich.svg';
                else if (task.id === 3) img.src = './images/flower.svg';
                
                img.onerror = () => console.error(`Failed to preload image for task ${index + 1}`);
            });
            
            // Display first task
            displaySequenceTask();
            
            // Debug state
            debugSequenceState();
            
            // Reset result message
            const resultMessage = document.getElementById('sequence-result');
            if (resultMessage) {
                resultMessage.textContent = 'Drag the blocks to create your sequence!';
                resultMessage.className = 'result-message info';
            }
            
            return true;
        } catch (err) {
            console.error('Error initializing Sequence Builder:', err);
            return false;
        }
    }

    function displaySequenceTask() {
        const taskDescription = document.getElementById('task-description');
        const taskImage = document.getElementById('task-image');
        const instructionBlocks = document.getElementById('instruction-blocks');
        const sequenceDropzone = document.getElementById('sequence-dropzone');
        
        if (!taskDescription || !taskImage || !instructionBlocks || !sequenceDropzone) return;
        
        // Reset
        instructionBlocks.innerHTML = '';
        sequenceDropzone.innerHTML = '';
        currentSequence = [];
        
        // Get current task
        const task = sequenceBuilderTasks[currentSequenceTask % sequenceBuilderTasks.length];
        
        // Display task info
        taskDescription.textContent = task.description;
        
        // Set the image with error handling
        try {
            if (task.id === 1) {
                taskImage.src = './images/robot-maze.svg';
                taskImage.alt = 'Robot in a maze';
            } else if (task.id === 2) {
                taskImage.src = './images/sandwich.svg';
                taskImage.alt = 'Making a sandwich';
            } else if (task.id === 3) {
                taskImage.src = './images/flower.svg';
                taskImage.alt = 'Planting a flower';
            }
            
            // Make sure the image is visible
            taskImage.style.display = 'inline-block';
            taskImage.style.maxHeight = '200px';
            taskImage.style.border = '1px solid #ddd';
            taskImage.style.borderRadius = '8px';
            taskImage.style.padding = '5px';
            taskImage.style.backgroundColor = '#fff';
            
            // Handle image load error
            taskImage.onerror = function() {
                console.error('Failed to load image: ' + this.src);
                // Create a fallback display instead of hiding
                this.src = ''; // Clear the source
                this.alt = 'Image not available';
                this.style.backgroundColor = '#f0f0f0';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.style.height = '150px';
                this.style.width = '100%';
                
                // Add text explaining the missing image
                const imageContainer = document.querySelector('.task-image-container');
                if (imageContainer) {
                    const errorMessage = document.createElement('div');
                    errorMessage.textContent = 'Image not available, but you can still solve the puzzle!';
                    errorMessage.style.color = '#d9534f';
                    errorMessage.style.padding = '10px';
                    errorMessage.style.textAlign = 'center';
                    errorMessage.style.fontWeight = 'bold';
                    imageContainer.appendChild(errorMessage);
                }
            };
        } catch (err) {
            console.error('Error setting task image:', err);
        }
        
        // Add instruction blocks
        const shuffledBlocks = [...task.blocks];
        shuffleArray(shuffledBlocks);
        
        shuffledBlocks.forEach(block => {
            const blockElement = document.createElement('div');
            blockElement.className = 'instruction-block';
            blockElement.textContent = block;
            blockElement.draggable = true;
            
            // Enhanced drag start event with better data transfer
            blockElement.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', block);
                e.dataTransfer.effectAllowed = 'move';
                this.classList.add('dragging');
                console.log('Drag started with block:', block);
            });
            
            blockElement.addEventListener('dragend', function() {
                this.classList.remove('dragging');
                console.log('Drag ended');
            });
            
            // Add click alternative for mobile or if drag fails
            blockElement.addEventListener('click', function() {
                console.log('Block clicked:', block);
                // Add the block to the sequence on click as well
                addBlockToSequence(block);
            });
            
            instructionBlocks.appendChild(blockElement);
        });
        
        // Helper function to add a block to the sequence
        function addBlockToSequence(blockText) {
            const blockElement = document.createElement('div');
            blockElement.className = 'instruction-block dropped';
            blockElement.textContent = blockText;
            
            blockElement.addEventListener('click', function() {
                const index = currentSequence.indexOf(blockText);
                if (index !== -1) {
                    currentSequence.splice(index, 1);
                    this.remove();
                    playSound('click');
                    console.log('Block removed from sequence:', blockText);
                    console.log('Current sequence:', currentSequence);
                }
            });
            
            sequenceDropzone.appendChild(blockElement);
            currentSequence.push(blockText);
            playSound('click');
            console.log('Block added to sequence:', blockText);
            console.log('Current sequence:', currentSequence);
        }
        
        // Set up dropzone with improved event handling
        sequenceDropzone.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            this.classList.add('drag-over');
        });
        
        sequenceDropzone.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        sequenceDropzone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const block = e.dataTransfer.getData('text/plain');
            console.log('Drop event with block:', block);
            
            // Only add if the block is valid
            if (block && task.blocks.includes(block)) {
                addBlockToSequence(block);
            }
        });
        
        // Reset result message
        const resultMessage = document.getElementById('sequence-result');
        if (resultMessage) {
            resultMessage.textContent = '';
            resultMessage.className = 'result-message';
        }
    }

    // Loop Explorer Activity
    const loopExplorerTasks = [
        {
            id: 1,
            title: "Paint a fence",
            description: "Help paint all 5 fence posts using loops instead of repeating commands!",
            expectedResult: ["Paint post", "Paint post", "Paint post", "Paint post", "Paint post"],
            availableBlocks: [
                { type: 'repeat', text: 'Repeat 5 times' },
                { type: 'action', text: 'Paint post' }
            ]
        },
        {
            id: 2,
            title: "Dance routine",
            description: "Create a dance routine with 3 spins and 2 jumps!",
            expectedResult: ["Spin", "Spin", "Spin", "Jump", "Jump"],
            availableBlocks: [
                { type: 'repeat', text: 'Repeat 3 times' },
                { type: 'repeat', text: 'Repeat 2 times' },
                { type: 'action', text: 'Spin' },
                { type: 'action', text: 'Jump' }
            ]
        },
        {
            id: 3,
            title: "Plant flowers",
            description: "Plant a row of 4 flowers, then water each one!",
            expectedResult: ["Plant flower", "Plant flower", "Plant flower", "Plant flower", "Water flower", "Water flower", "Water flower", "Water flower"],
            availableBlocks: [
                { type: 'repeat', text: 'Repeat 4 times' },
                { type: 'action', text: 'Plant flower' },
                { type: 'action', text: 'Water flower' }
            ]
        }
    ];

    let currentLoopTask = 0;
    let loopsSolved = 0;
    let loopLevel = 1;
    let loopProgram = [];

    function initLoopExplorerActivity() {
        currentLoopTask = 0;
        loopsSolved = 0;
        loopLevel = 1;
        displayLoopTask();
    }

    function displayLoopTask() {
        const loopDescription = document.getElementById('loop-description');
        const loopPreview = document.getElementById('loop-preview');
        const loopBlocks = document.getElementById('loop-blocks');
        const programContainer = document.getElementById('program-container');
        
        if (!loopDescription || !loopPreview || !loopBlocks || !programContainer) return;
        
        // Reset
        loopBlocks.innerHTML = '';
        programContainer.innerHTML = '';
        loopProgram = [];
        
        // Get current task
        const task = loopExplorerTasks[currentLoopTask % loopExplorerTasks.length];
        
        // Display task info
        loopDescription.textContent = task.description;
        
        // Set preview image based on task
        loopPreview.innerHTML = '';
        const previewImage = document.createElement('img');
        previewImage.className = 'img-fluid';
        previewImage.style.maxHeight = '150px';
        
        if (task.id === 1) {
            previewImage.src = './images/fence.svg';
            previewImage.alt = 'Fence painting task';
        } else if (task.id === 2) {
            previewImage.src = './images/dance.svg';
            previewImage.alt = 'Dance routine task';
        } else {
            // Default or third task
            previewImage.src = './images/flower.svg';
            previewImage.alt = 'Plant flowers task';
        }
        
        loopPreview.appendChild(previewImage);
        
        // Add blocks
        task.availableBlocks.forEach(block => {
            const blockElement = document.createElement('div');
            blockElement.className = `loop-block ${block.type}`;
            
            const icon = document.createElement('i');
            if (block.type === 'repeat') {
                icon.className = 'fas fa-redo-alt';
            } else {
                icon.className = 'fas fa-play';
            }
            blockElement.appendChild(icon);
            
            const textSpan = document.createElement('span');
            textSpan.textContent = block.text;
            blockElement.appendChild(textSpan);
            
            blockElement.draggable = true;
            
            blockElement.addEventListener('click', function() {
                const blockCopy = {...block};
                addBlockToProgram(blockCopy);
                playSound('click');
            });
            
            loopBlocks.appendChild(blockElement);
        });
    }

    function addBlockToProgram(block) {
        const programContainer = document.getElementById('program-container');
        if (!programContainer) return;
        
        const blockElement = document.createElement('div');
        blockElement.className = `loop-block ${block.type}`;
        
        const icon = document.createElement('i');
        if (block.type === 'repeat') {
            icon.className = 'fas fa-redo-alt';
        } else {
            icon.className = 'fas fa-play';
        }
        blockElement.appendChild(icon);
        
        const textSpan = document.createElement('span');
        textSpan.textContent = block.text;
        blockElement.appendChild(textSpan);
        
        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-block';
        removeBtn.innerHTML = '&times;';
        removeBtn.style.marginLeft = 'auto';
        removeBtn.style.background = 'none';
        removeBtn.style.border = 'none';
        removeBtn.style.color = 'white';
        removeBtn.style.fontSize = '1.2rem';
        removeBtn.style.cursor = 'pointer';
        
        removeBtn.addEventListener('click', function() {
            const index = loopProgram.indexOf(block);
            if (index !== -1) {
                loopProgram.splice(index, 1);
                blockElement.remove();
                playSound('click');
            }
        });
        
        blockElement.appendChild(removeBtn);
        programContainer.appendChild(blockElement);
        loopProgram.push(block);
    }

    // Sequence Builder check button
    const sequenceCheckButton = document.getElementById('sequence-check');
    if (sequenceCheckButton) {
        sequenceCheckButton.addEventListener('click', function() {
            checkSequenceAnswer();
        });
    }

    // Sequence Builder reset button
    const sequenceResetButton = document.getElementById('sequence-reset');
    if (sequenceResetButton) {
        sequenceResetButton.addEventListener('click', function() {
            playSound('click');
            currentSequence = [];
            displaySequenceTask();
        });
    }

    // Loop Explorer check button
    const loopCheckButton = document.getElementById('loop-check');
    if (loopCheckButton) {
        loopCheckButton.addEventListener('click', function() {
            checkLoopAnswer();
        });
    }

    // Loop Explorer reset button
    const loopResetButton = document.getElementById('loop-reset');
    if (loopResetButton) {
        loopResetButton.addEventListener('click', function() {
            playSound('click');
            loopProgram = [];
            displayLoopTask();
        });
    }

    // Loop Explorer run button
    const loopRunButton = document.getElementById('loop-run');
    if (loopRunButton) {
        loopRunButton.addEventListener('click', function() {
            executeLoopProgram();
        });
    }

    function checkSequenceAnswer() {
        const resultMessage = document.getElementById('sequence-result');
        if (!resultMessage) return;
        
        const currentTask = sequenceBuilderTasks[currentSequenceTask % sequenceBuilderTasks.length];
        
        if (currentSequence.length < currentTask.solution.length) {
            resultMessage.textContent = 'Your sequence is too short. Add more steps!';
            resultMessage.className = 'result-message error';
            return;
        }
        
        if (currentSequence.length > currentTask.solution.length) {
            resultMessage.textContent = 'Your sequence has too many steps. Try to be more efficient!';
            resultMessage.className = 'result-message error';
            return;
        }
        
        const isCorrect = arraysEqual(currentSequence, currentTask.solution);
        
        if (isCorrect) {
            playSound('success');
            resultMessage.textContent = '🎉 Correct! Your sequence works perfectly!';
            resultMessage.className = 'result-message success animated-feedback';
            
            sequencesSolved++;
            
            // Level up every 3 sequences
            if (sequencesSolved % 3 === 0 && sequencesSolved > 0 && sequencesLevel < 3) {
                sequencesLevel++;
                resultMessage.textContent = `🎉 Level Up! You're now at Level ${sequencesLevel}!`;
            }
            
            // After a delay, show next sequence
            setTimeout(() => {
                currentSequenceTask++;
                displaySequenceTask();
            }, 2000);
        } else {
            playSound('error');
            resultMessage.textContent = '❌ That sequence doesn\'t work. Try a different order!';
            resultMessage.className = 'result-message error';
        }
    }

    function executeLoopProgram() {
        const executionContainer = document.getElementById('execution-container');
        if (!executionContainer) return;
        
        executionContainer.innerHTML = '';
        
        // Flatten program (expand loops)
        const executedSteps = [];
        
        try {
            loopProgram.forEach(block => {
                if (block.type === 'repeat') {
                    // Extract the number from "Repeat X times"
                    const times = parseInt(block.text.match(/\d+/)[0]);
                    
                    // Look for the next action block
                    const nextActionIndex = loopProgram.indexOf(block) + 1;
                    if (nextActionIndex < loopProgram.length && loopProgram[nextActionIndex].type === 'action') {
                        const action = loopProgram[nextActionIndex].text;
                        
                        // Add the action multiple times
                        for (let i = 0; i < times; i++) {
                            executedSteps.push(action);
                        }
                    }
                } else if (block.type === 'action') {
                    // Skip actions that follow a repeat (they're handled by the repeat)
                    const prevIndex = loopProgram.indexOf(block) - 1;
                    if (prevIndex < 0 || loopProgram[prevIndex].type !== 'repeat') {
                        executedSteps.push(block.text);
                    }
                }
            });
            
            // Display executed steps
            executedSteps.forEach((step, index) => {
                setTimeout(() => {
                    const stepElement = document.createElement('div');
                    stepElement.className = 'loop-step';
                    stepElement.textContent = `> ${step}`;
                    executionContainer.appendChild(stepElement);
                    executionContainer.scrollTop = executionContainer.scrollHeight;
                    playSound('click');
                }, index * 500);
            });
        } catch (err) {
            console.error('Error executing program:', err);
            executionContainer.textContent = 'Error in program execution!';
        }
        
        return executedSteps;
    }

    function checkLoopAnswer() {
        const resultMessage = document.getElementById('loop-result');
        if (!resultMessage) return;
        
        const executedSteps = executeLoopProgram();
        const currentTask = loopExplorerTasks[currentLoopTask % loopExplorerTasks.length];
        
        // Check if executed steps match expected result
        const isCorrect = arraysEqual(executedSteps, currentTask.expectedResult);
        
        setTimeout(() => {
            if (isCorrect) {
                playSound('success');
                resultMessage.textContent = '🎉 Correct! Your loop works perfectly!';
                resultMessage.className = 'result-message success animated-feedback';
                
                loopsSolved++;
                
                // Level up every 3 loops
                if (loopsSolved % 3 === 0 && loopsSolved > 0 && loopLevel < 3) {
                    loopLevel++;
                    resultMessage.textContent = `🎉 Level Up! You're now at Level ${loopLevel}!`;
                }
                
                // After a delay, show next loop task
                setTimeout(() => {
                    currentLoopTask++;
                    displayLoopTask();
                }, 2000);
            } else {
                playSound('error');
                resultMessage.textContent = '❌ That doesn\'t produce the expected result. Try again!';
                resultMessage.className = 'result-message error';
            }
        }, executedSteps.length * 500 + 500); // Wait for execution animation to complete
    }

    function updateSequenceBuilderStats() {
        const levelDisplay = document.getElementById('sequence-builder-level');
        const progressBar = document.getElementById('sequence-builder-progress');
        
        if (levelDisplay) {
            levelDisplay.textContent = sequencesLevel;
        }
        
        if (progressBar) {
            const progressPercent = (sequencesSolved % 3) * 33.33;
            progressBar.style.width = `${progressPercent}%`;
        }
        
        console.log('Sequence Builder Stats:', {
            level: sequencesLevel,
            solved: sequencesSolved,
            currentTask: currentSequenceTask,
            currentSequence: currentSequence
        });
    }
    
    // Debug function to check sequence state
    function debugSequenceState() {
        try {
            console.log('Current Sequence Builder State:');
            console.log('Task:', sequenceBuilderTasks[currentSequenceTask % sequenceBuilderTasks.length]);
            console.log('Current Sequence:', currentSequence);
            console.log('Image Elements:', document.getElementById('task-image'));
            console.log('Drop Zone:', document.getElementById('sequence-dropzone'));
            console.log('Instructions:', document.getElementById('instruction-blocks'));
            return true;
        } catch (err) {
            console.error('Debug error:', err);
            return false;
        }
    }

    // Helper function for checking image paths
    window.addEventListener('load', function() {
        console.log('Checking activity images...');
        
        const images = [
            './images/robot-maze.svg',
            './images/sandwich.svg',
            './images/flower.svg',
            './images/fence.svg',
            './images/dance.svg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.onload = function() {
                console.log('✅ Image loaded successfully: ' + src);
            };
            img.onerror = function() {
                console.error('❌ Failed to load image: ' + src);
            };
            img.src = src;
        });
    });
});
