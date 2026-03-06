document.addEventListener('DOMContentLoaded', () => {
    // Function to create a 10x10 grid filled with random letters
    function createRandomGrid() {
        const grid = [];
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        // Create 10 rows
        for (let i = 0; i < 10; i++) {
            const row = [];
            // Create 10 columns
            for (let j = 0; j < 10; j++) {
                // Add random letter from alphabet
                row.push(alphabet.charAt(Math.floor(Math.random() * alphabet.length)));
            }
            grid.push(row);
        }
        return grid;
    }

    // Define words for each puzzle
    const wordSets = [
        ['APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'MELON'],
        ['DOG', 'CAT', 'BIRD', 'FISH', 'MOUSE'],
        ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PINK'],
        ['BOOK', 'LEARN', 'READ', 'STUDY', 'WRITE'],
        ['SUN', 'MOON', 'STAR', 'EARTH', 'SPACE'],
        ['JUMP', 'RUN', 'WALK', 'SWIM', 'SKIP'],
        ['TREE', 'FLOWER', 'PLANT', 'GRASS', 'BUSH'],
        ['MILK', 'WATER', 'JUICE', 'SODA', 'TEA'],
        ['HAPPY', 'SAD', 'ANGRY', 'SILLY', 'CALM'],
        ['SHIRT', 'PANTS', 'SOCKS', 'SHOES', 'HAT']
    ];

    // Generate all puzzles - placing words in perfect sequence
    const puzzles = [];
    for (let i = 0; i < wordSets.length; i++) {
        // Start with an empty grid filled with placeholder characters
        const emptyGrid = Array(10).fill().map(() => Array(10).fill('.'));
        
        const puzzle = { 
            grid: emptyGrid, 
            words: wordSets[i],
            wordPositions: [] // Store positions for debugging
        };
        
        // Simple word placement algorithm that guarantees consecutive placement
        for (let w = 0; w < puzzle.words.length; w++) {
            const word = puzzle.words[w];
            
            // Simple alternating pattern - even words horizontal, odd vertical
            const isHorizontal = w % 2 === 0;
            
            // Each word gets its own row/column to avoid overlap
            const rowIndex = Math.floor(w/2); // 0, 0, 1, 1, 2, 2, etc.
            
            if (isHorizontal) {
                // Place word horizontally in its own row
                const startRow = rowIndex;
                const startCol = 0; // Start at beginning of row
                
                // Place each letter consecutively
                for (let c = 0; c < word.length; c++) {
                    puzzle.grid[startRow][startCol + c] = word[c];
                }
                
                // Store position info
                puzzle.wordPositions.push({
                    word,
                    direction: 'horizontal',
                    startRow: startRow,
                    startCol: startCol,
                    endRow: startRow,
                    endCol: startCol + word.length - 1
                });
                
            } else {
                // Place word vertically in its own column
                const startCol = rowIndex;
                const startRow = 0; // Start at top of column
                
                // Place each letter consecutively
                for (let r = 0; r < word.length; r++) {
                    puzzle.grid[startRow + r][startCol] = word[r];
                }
                
                // Store position info
                puzzle.wordPositions.push({
                    word,
                    direction: 'vertical',
                    startRow: startRow,
                    startCol: startCol,
                    endRow: startRow + word.length - 1,
                    endCol: startCol
                });
            }
        }
        
        // Fill remaining spaces with random letters
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                if (puzzle.grid[r][c] === '.') {
                    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    puzzle.grid[r][c] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                }
            }
        }
        
        puzzles.push(puzzle);
    }

    // Track current state
    let currentPuzzleIndex = 0;
    let selectedCells = [];
    let foundWords = [];

    // DOM Elements
    const letterGrid = document.getElementById('letter-grid');
    const wordList = document.getElementById('word-list');
    const submitButton = document.getElementById('submit-answer');
    const clearButton = document.getElementById('clear-selections');
    const resultMessage = document.getElementById('result-message');
    const currentPuzzleDisplay = document.getElementById('current-puzzle');
    const totalPuzzlesDisplay = document.getElementById('total-puzzles');

    // Update total puzzles display
    totalPuzzlesDisplay.textContent = puzzles.length;

    // Function to setup the current puzzle
    function setupPuzzle() {
        // Clear previous state
        letterGrid.innerHTML = '';
        wordList.innerHTML = '';
        selectedCells = [];
        foundWords = [];
        resultMessage.textContent = '';
        resultMessage.className = 'result';
        
        // Update current puzzle number
        currentPuzzleDisplay.textContent = currentPuzzleIndex + 1;
        
        const currentPuzzle = puzzles[currentPuzzleIndex];
        const debugMode = true; // Set to true to see word placements
        
        // Log positions for debugging
        console.log(`Setting up puzzle ${currentPuzzleIndex + 1}`);
        currentPuzzle.wordPositions.forEach(pos => {
            console.log(`Word "${pos.word}" placed ${pos.direction} at (${pos.startRow},${pos.startCol}) to (${pos.endRow},${pos.endCol})`);
        });
        
        // Create grid cells
        for (let row = 0; row < currentPuzzle.grid.length; row++) {
            for (let col = 0; col < currentPuzzle.grid[row].length; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                
                // Add data attributes
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.textContent = currentPuzzle.grid[row][col];
                
                // Add row highlighting
                if (row % 2 === 0) {
                    cell.classList.add('even-row');
                } else {
                    cell.classList.add('odd-row');
                }
                
                // Debug highlighting to visualize word placement
                if (debugMode) {
                    for (const pos of currentPuzzle.wordPositions) {
                        const isInWord = 
                            pos.direction === 'horizontal' && 
                            row === pos.startRow && 
                            col >= pos.startCol && 
                            col <= pos.endCol;
                        
                        const isInVerticalWord = 
                            pos.direction === 'vertical' && 
                            col === pos.startCol && 
                            row >= pos.startRow && 
                            row <= pos.endRow;
                            
                        if (isInWord || isInVerticalWord) {
                            cell.classList.add('debug-word-cell');
                            cell.classList.add(`debug-${pos.direction}`);
                            cell.dataset.wordPart = pos.word;
                            
                            // Mark start of word
                            if ((pos.direction === 'horizontal' && col === pos.startCol) ||
                                (pos.direction === 'vertical' && row === pos.startRow)) {
                                cell.classList.add('debug-word-start');
                            }
                            break;
                        }
                    }
                }
                
                // Add click event
                cell.addEventListener('click', function() {
                    toggleCellSelection(this);
                });
                
                letterGrid.appendChild(cell);
            }
        }
        
        // Create word list
        currentPuzzle.words.forEach((word) => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            wordItem.textContent = word;
            wordItem.dataset.word = word;
            
            // Find the word position to get direction
            const wordPos = currentPuzzle.wordPositions.find(pos => pos.word === word);
            const isHorizontal = wordPos ? wordPos.direction === 'horizontal' : false;
            
            // Add direction info
            wordItem.dataset.direction = isHorizontal ? 'horizontal' : 'vertical';
            
            // Add direction hint
            const directionHint = document.createElement('span');
            directionHint.className = 'direction-hint';
            directionHint.textContent = isHorizontal ? ' ➡️' : ' ⬇️';
            wordItem.appendChild(directionHint);
            
            wordList.appendChild(wordItem);
        });
        
        // Initial message
        resultMessage.textContent = "Find all the words in the grid!";
        setTimeout(() => {
            resultMessage.textContent = "";
        }, 2000);
    }

    // Toggle cell selection
    function toggleCellSelection(cell) {
        if (cell.classList.contains('selected')) {
            // Deselect
            cell.classList.remove('selected');
            
            // Remove from array
            for (let i = 0; i < selectedCells.length; i++) {
                const selected = selectedCells[i];
                if (selected.dataset.row === cell.dataset.row && selected.dataset.col === cell.dataset.col) {
                    selectedCells.splice(i, 1);
                    break;
                }
            }
            
            // Play sound
            SoundEffects.playClickSound();
        } else {
            // Select
            cell.classList.add('selected');
            selectedCells.push(cell);
            
            // Play sound
            SoundEffects.playClickSound();
        }
    }
    
    // Check if selected cells are consecutive
    function checkConsecutiveCells() {
        if (selectedCells.length <= 1) return { isConsecutive: true, direction: null };
        
        // Get row and column positions
        const positions = selectedCells.map(cell => ({
            row: parseInt(cell.dataset.row),
            col: parseInt(cell.dataset.col),
            elem: cell
        }));
        
        // Check if same row (horizontal) or column (vertical)
        const sameRow = positions.every(pos => pos.row === positions[0].row);
        const sameCol = positions.every(pos => pos.col === positions[0].col);
        
        if (!sameRow && !sameCol) {
            return { isConsecutive: false, direction: null };
        }
        
        if (sameRow) {
            // Horizontal - sort by column and check consecutive
            positions.sort((a, b) => a.col - b.col);
            
            for (let i = 1; i < positions.length; i++) {
                if (positions[i].col !== positions[i-1].col + 1) {
                    return { isConsecutive: false, direction: null };
                }
            }
            return { isConsecutive: true, direction: 'horizontal', positions };
        } else {
            // Vertical - sort by row and check consecutive
            positions.sort((a, b) => a.row - b.row);
            
            for (let i = 1; i < positions.length; i++) {
                if (positions[i].row !== positions[i-1].row + 1) {
                    return { isConsecutive: false, direction: null };
                }
            }
            return { isConsecutive: true, direction: 'vertical', positions };
        }
    }
    
    // Check for all words found
    function allWordsFound() {
        return foundWords.length === puzzles[currentPuzzleIndex].words.length;
    }

    // Submit button handler
    submitButton.addEventListener('click', () => {
        if (selectedCells.length === 0) {
            SoundEffects.playErrorSound();
            FeedbackSystem.showError("Please select some letters first!");
            return;
        }
        
        const currentPuzzle = puzzles[currentPuzzleIndex];
        console.log(`Checking selected cells against words: ${currentPuzzle.words.join(', ')}`);
        
        // Check if cells are consecutive
        const consecutiveInfo = checkConsecutiveCells();
        if (!consecutiveInfo.isConsecutive) {
            SoundEffects.playErrorSound();
            FeedbackSystem.showError("Letters must be consecutive in a row or column!");
            
            // Shake and clear selections
            selectedCells.forEach(cell => {
                cell.classList.add('shake');
                setTimeout(() => {
                    cell.classList.remove('shake');
                    cell.classList.remove('selected');
                }, 500);
            });
            selectedCells = [];
            return;
        }
        
        // Get selected letters in order
        let selectedLetters;
        if (consecutiveInfo.direction === 'horizontal') {
            const sortedCells = [...selectedCells].sort((a, b) => 
                parseInt(a.dataset.col) - parseInt(b.dataset.col)
            );
            selectedLetters = sortedCells.map(cell => cell.textContent).join('');
        } else {
            const sortedCells = [...selectedCells].sort((a, b) => 
                parseInt(a.dataset.row) - parseInt(b.dataset.row)
            );
            selectedLetters = sortedCells.map(cell => cell.textContent).join('');
        }
        
        // Try forward and reverse
        const reverseLetters = selectedLetters.split('').reverse().join('');
        console.log(`Selected letters: "${selectedLetters}" (reversed: "${reverseLetters}")`);
        
        // Check for matching word
        let foundWord = null;
        let matchedPosition = null;
        
        for (const word of currentPuzzle.words) {
            if (foundWords.includes(word)) continue;
            
            if (selectedLetters.length === word.length) {
                if (selectedLetters === word) {
                    console.log(`Match found! "${selectedLetters}" = "${word}" (forward)`);
                    foundWord = word;
                    matchedPosition = currentPuzzle.wordPositions.find(pos => pos.word === word);
                    break;
                } else if (reverseLetters === word) {
                    console.log(`Match found! "${reverseLetters}" = "${word}" (reversed)`);
                    foundWord = word;
                    matchedPosition = currentPuzzle.wordPositions.find(pos => pos.word === word);
                    break;
                }
            }
        }
        
        if (foundWord) {
            // Success!
            SoundEffects.playSuccessSound();
            FeedbackSystem.showSuccess(`You found "${foundWord}"!`);
            foundWords.push(foundWord);
            
            // Mark word in list
            const wordItem = document.querySelector(`.word-item[data-word="${foundWord}"]`);
            if (wordItem) {
                wordItem.classList.add('found');
            }
            
            // Mark cells
            selectedCells.forEach(cell => {
                cell.classList.add('found-cell');
                if (matchedPosition) {
                    cell.classList.add(matchedPosition.direction);
                }
                setTimeout(() => {
                    cell.classList.remove('selected');
                }, 300);
            });
            
            // Reset selection
            selectedCells = [];
            
            // Check if all words found
            if (allWordsFound()) {
                resultMessage.textContent = "Correct! Well done! 🎉";
                resultMessage.className = 'result success';
                
                // Move to next puzzle after delay
                setTimeout(() => {
                    currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
                    setupPuzzle();
                }, 3000);
            }
        } else {
            // Not a match
            SoundEffects.playErrorSound();
            FeedbackSystem.showError("That's not one of the words. Try again!");
            
            // Clear selection with animation
            selectedCells.forEach(cell => {
                cell.classList.add('shake');
                setTimeout(() => {
                    cell.classList.remove('shake');
                    cell.classList.remove('selected');
                }, 500);
            });
            selectedCells = [];
        }
    });

    // Clear button handler
    clearButton.addEventListener('click', () => {
        document.querySelectorAll('.grid-cell.selected').forEach(cell => {
            cell.classList.remove('selected');
        });
        selectedCells = [];
        SoundEffects.playClickSound();
    });
    
    // Skip button handler
    document.getElementById('skip-puzzle').addEventListener('click', () => {
        SoundEffects.playClickSound();
        
        resultMessage.textContent = "Skipping to the next puzzle...";
        
        setTimeout(() => {
            currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
            setupPuzzle();
        }, 500);
    });

    // Initialize first puzzle
    setupPuzzle();
});
