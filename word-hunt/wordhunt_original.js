// Set this to false for production environment
window.DEBUG_MODE = false;

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
    
    // Function to place a word in the grid
    function placeWord(grid, word, startRow, startCol, direction) {
        const directions = {
            'horizontal': [0, 1],
            'vertical': [1, 0]
        };
        
        const [rowStep, colStep] = directions[direction];
        
        // Place each letter of the word
        for (let i = 0; i < word.length; i++) {
            const row = startRow + (i * rowStep);
            const col = startCol + (i * colStep);
            
            // Place the letter in the grid
            if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
                grid[row][col] = word[i];
            }
        }
        
        return grid;
    }
    
    // Function to check if a word can fit in the grid direction
    function wordFits(grid, word, startRow, startCol, direction) {
        const directions = {
            'horizontal': [0, 1],
            'vertical': [1, 0]
        };
        
        const [rowStep, colStep] = directions[direction];
        
        // Check if the word fits in the grid
        for (let i = 0; i < word.length; i++) {
            const row = startRow + (i * rowStep);
            const col = startCol + (i * colStep);
            
            // Check if position is within grid bounds
            if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
                return false;
            }
        }
        
        return true;
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

    // Generate all puzzles with guaranteed conflict-free word placement
    const puzzles = [];
    for (let i = 0; i < wordSets.length; i++) {
        // Start with an empty grid filled with placeholder characters
        const emptyGrid = Array(10).fill().map(() => Array(10).fill('.'));
        
        const puzzle = { 
            grid: JSON.parse(JSON.stringify(emptyGrid)), // Deep copy to avoid reference issues
            words: wordSets[i],
            wordPositions: [] // Store positions for debugging
        };
        
        // Ensure we start with a completely clean grid
        console.log("Creating puzzle #" + (i+1) + " with words: " + wordSets[i].join(", "));
        
        // Place words in the grid - first placing horizontal words, then vertical words
        // Create a map to track which cells have words placed in them
        const placedCells = {};
        
        // First, place 3 horizontal words in rows 0, 2, and 4
        const horizontalWords = puzzle.words.slice(0, 3);
        const verticalWords = puzzle.words.slice(3);
        
        // Place horizontal words first (these have priority)
        for (let w = 0; w < horizontalWords.length; w++) {
            const word = horizontalWords[w];
            const rowIdx = w * 2; // Place in rows 0, 2, 4
            const startRow = rowIdx;
            const startCol = 0;
            
            // Check if word can fit in grid
            if (word.length > 10) {
                console.error(`Word "${word}" is too long to fit in the grid!`);
                continue;
            }
            
            // Place the word horizontally
            for (let i = 0; i < word.length; i++) {
                puzzle.grid[startRow][startCol + i] = word.charAt(i);
                // Mark this cell as containing a letter from this word
                placedCells[`${startRow},${startCol + i}`] = {
                    letter: word.charAt(i),
                    word: word
                };
            }
            
            // Store word position info
            puzzle.wordPositions.push({
                word,
                direction: 'horizontal',
                startRow: startRow,
                startCol: startCol,
                endRow: startRow,
                endCol: startCol + word.length - 1
            });
            
            console.log(`Placed "${word}" horizontally at row ${startRow}, cols ${startCol}-${startCol + word.length - 1}`);
        }
        
        // Now place vertical words, checking for conflicts
        for (let w = 0; w < verticalWords.length; w++) {
            const word = verticalWords[w];
            
            // Try to place in column w*2 (0, 2)
            let startCol = w * 2;
            let placed = false;
            
            // Try different column positions if the default has conflicts
            for (let attempt = 0; attempt < 5 && !placed; attempt++) {
                const testCol = (startCol + attempt) % 10;
                let canPlace = true;
                
                // Check for conflicts with already placed words
                for (let i = 0; i < word.length; i++) {
                    const cellKey = `${i},${testCol}`;
                    if (placedCells[cellKey] && placedCells[cellKey].letter !== word.charAt(i)) {
                        // Conflict: this cell already has a different letter
                        canPlace = false;
                        break;
                    }
                }
                
                if (canPlace && word.length <= 10) {
                    // No conflicts found, safe to place the word here
                    startCol = testCol;
        // Use a completely conflict-free placement approach
        // Track which cells have already been used
        const placedCells = {};
        
        // Determine word order - try to place 3 words horizontally and 2 vertically
        // But we'll be flexible if we can't place them without conflicts
        let placementSucceeded = true;
        
        // Step 1: Try to place first 3 words horizontally
        for (let w = 0; w < Math.min(3, puzzle.words.length); w++) {
            const word = puzzle.words[w];
            
            // Skip words that are too long
            if (word.length > 10) {
                console.error(`Word "${word}" is too long to fit in the grid!`);
                continue;
            }
            
            // Try to place horizontally without conflicts
            const placement = tryPlaceWordWithoutConflict(puzzle.grid, word, 'horizontal', placedCells);
            
            if (placement.success) {
                // Word placed successfully, record its position
                puzzle.wordPositions.push({
                    word,
                    direction: 'horizontal',
                    startRow: placement.startRow,
                    startCol: placement.startCol,
                    endRow: placement.endRow,
                    endCol: placement.endCol
                });
                
                console.log(`Placed "${word}" horizontally at row ${placement.startRow}, cols ${placement.startCol}-${placement.endCol}`);
            } else {
                // If we couldn't place horizontally, try vertical as fallback
                const verticalPlacement = tryPlaceWordWithoutConflict(puzzle.grid, word, 'vertical', placedCells);
                
                if (verticalPlacement.success) {
                    puzzle.wordPositions.push({
                        word,
                        direction: 'vertical',
                        startRow: verticalPlacement.startRow,
                        startCol: verticalPlacement.startCol,
                        endRow: verticalPlacement.endRow,
                        endCol: verticalPlacement.endCol
                    });
                    
                    console.log(`Placed "${word}" vertically at column ${verticalPlacement.startCol}, rows ${verticalPlacement.startRow}-${verticalPlacement.endRow}`);
                } else {
                    console.error(`Failed to place "${word}" in any direction!`);
                    placementSucceeded = false;
                }
            }
        }
        
        // Step 2: Try to place remaining words vertically
        for (let w = 3; w < puzzle.words.length; w++) {
            const word = puzzle.words[w];
            
            // Skip words that are too long
            if (word.length > 10) {
                console.error(`Word "${word}" is too long to fit in the grid!`);
                continue;
            }
            
            // Try to place vertically without conflicts
            const placement = tryPlaceWordWithoutConflict(puzzle.grid, word, 'vertical', placedCells);
            
            if (placement.success) {
                // Word placed successfully, record its position
                puzzle.wordPositions.push({
                    word,
                    direction: 'vertical',
                    startRow: placement.startRow,
                    startCol: placement.startCol,
                    endRow: placement.endRow,
                    endCol: placement.endCol
                });
                
                console.log(`Placed "${word}" vertically at column ${placement.startCol}, rows ${placement.startRow}-${placement.endRow}`);
            } else {
                // If we couldn't place vertically, try horizontal as fallback
                const horizontalPlacement = tryPlaceWordWithoutConflict(puzzle.grid, word, 'horizontal', placedCells);
                
                if (horizontalPlacement.success) {
                    puzzle.wordPositions.push({
                        word,
                        direction: 'horizontal',
                        startRow: horizontalPlacement.startRow,
                        startCol: horizontalPlacement.startCol,
                        endRow: horizontalPlacement.endRow,
                        endCol: horizontalPlacement.endCol
                    });
                    
                    console.log(`Placed "${word}" horizontally at row ${horizontalPlacement.startRow}, cols ${horizontalPlacement.startCol}-${horizontalPlacement.endCol}`);
                } else {
                    console.error(`Failed to place "${word}" in any direction!`);
                    placementSucceeded = false;
                }
            }
        }
        
        // Verify word placement for all placed words
        allWordsCorrect = true;
        
        // Check each placed word
        for (const pos of puzzle.wordPositions) {
            let placedWord = '';
            if (pos.direction === 'horizontal') {
                for (let i = 0; i <= pos.endCol - pos.startCol; i++) {
                    placedWord += puzzle.grid[pos.startRow][pos.startCol + i];
                }
            } else {
                for (let i = 0; i <= pos.endRow - pos.startRow; i++) {
                    placedWord += puzzle.grid[pos.startRow + i][pos.startCol];
                }
            }
            
            if (placedWord !== pos.word) {
                console.error(`Word placement ERROR: Expected "${pos.word}", got "${placedWord}"`);
                allWordsCorrect = false;
                
                // Show the grid for debugging this error
                console.log("%cCurrent grid state with FAILED word placement:", "color:red;");
                let gridDisplay = '';
                for (let r = 0; r < 10; r++) {
                    let rowStr = '';
                    for (let c = 0; c < 10; c++) {
                        rowStr += puzzle.grid[r][c] + ' ';
                    }
                    gridDisplay += rowStr + '\n';
                }
                console.log(gridDisplay);
            } else {
                console.log(`✓ Word "${pos.word}" placed correctly as "${placedWord}"`);
                
                // Show the grid after successful placement
                if (window.DEBUG_MODE) {
                    console.log("%cCurrent grid state after placing " + pos.word + ":", "color:green;");
                    let gridDisplay = '';
                    for (let r = 0; r < 10; r++) {
                        let rowStr = '';
                        for (let c = 0; c < 10; c++) {
                            rowStr += puzzle.grid[r][c] + ' ';
                        }
                        gridDisplay += rowStr + '\n';
                    }
                    console.log(gridDisplay);
                }
            }
        }
        
        // STEP 1: Double-verify all words are correctly placed
        console.log("Verifying all words are placed correctly before adding random letters:");
        // Reset verification flag
        allWordsCorrect = true;
        for (const pos of puzzle.wordPositions) {
            let actualWord = '';
            if (pos.direction === 'horizontal') {
                for (let c = pos.startCol; c <= pos.endCol; c++) {
                    actualWord += puzzle.grid[pos.startRow][c];
                }
            } else {
                for (let r = pos.startRow; r <= pos.endRow; r++) {
                    actualWord += puzzle.grid[r][pos.startCol];
                }
            }
            if (actualWord !== pos.word) {
                console.error(`CRITICAL ERROR: Word "${pos.word}" is incorrectly placed as "${actualWord}"`);
                allWordsCorrect = false;
            }
        }
        
        if (!allWordsCorrect) {
            console.error("Word placement issues detected! Please check the puzzle generation.");
        }
        
        // STEP 2: Create a map of cells that contain word letters (to prevent overwriting them)
        const wordCells = {};
        for (const pos of puzzle.wordPositions) {
            if (pos.direction === 'horizontal') {
                for (let c = pos.startCol; c <= pos.endCol; c++) {
                    const key = `${pos.startRow},${c}`;
                    wordCells[key] = pos.word;
                }
            } else {
                for (let r = pos.startRow; r <= pos.endRow; r++) {
                    const key = `${r},${pos.startCol}`;
                    wordCells[key] = pos.word;
                }
            }
        }
        
        // STEP 3: Fill remaining '.' placeholder cells with random letters, NEVER OVERWRITING WORD LETTERS
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                const key = `${r},${c}`;
                if (wordCells[key]) {
                    // This cell contains a letter from a word - DO NOT MODIFY IT
                    continue;
                }
                
                // Only non-word cells should be filled with random letters
                if (puzzle.grid[r][c] === '.') {
                    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    puzzle.grid[r][c] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                }
            }
        }
        
        // FINAL VERIFICATION: Check all words one more time after filling in random letters
        console.log("Final verification after adding random letters:");
        for (const pos of puzzle.wordPositions) {
            let finalWord = '';
            if (pos.direction === 'horizontal') {
                for (let c = pos.startCol; c <= pos.endCol; c++) {
                    finalWord += puzzle.grid[pos.startRow][c];
                }
            } else {
                for (let r = pos.startRow; r <= pos.endRow; r++) {
                    finalWord += puzzle.grid[r][pos.startCol];
                }
            }
            if (finalWord !== pos.word) {
                console.error(`CRITICAL ERROR AFTER FILLING: Word "${pos.word}" is incorrectly placed as "${finalWord}"`);
            } else {
                console.log(`Word "${pos.word}" verified correctly after filling random letters`);
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
        const debugMode = false; // Set to false for production, true only for development/debugging
        
        // Debug log of word positions for verification - only when debugging
        if (window.DEBUG_MODE) {
            console.log('Word positions for puzzle ' + currentPuzzleIndex + ':');
            for (const pos of currentPuzzle.wordPositions) {
                console.log(`${pos.word} - ${pos.direction} from (${pos.startRow},${pos.startCol}) to (${pos.endRow},${pos.endCol})`);
            }
        }
        
        // Create grid cells with distinct row/column classes for better visibility
        for (let row = 0; row < currentPuzzle.grid.length; row++) {
            for (let col = 0; col < currentPuzzle.grid[row].length; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                
                // Add row and column data attributes
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.textContent = currentPuzzle.grid[row][col];
                
                // Add subtle highlighting for even/odd rows to make sequence visibility easier
                if (row % 2 === 0) {
                    cell.classList.add('even-row');
                } else {
                    cell.classList.add('odd-row');
                }
                
                // Set ID for each cell so we can reference it later for debug styling
                cell.id = `cell-${row}-${col}`;
                
                // Add click event listener
                cell.addEventListener('click', function() {
                    toggleCellSelection(this);
                });
                
                letterGrid.appendChild(cell);
            }
        }
        
        // Create word list with direction hints
        currentPuzzle.words.forEach((word, index) => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            wordItem.textContent = word;
            wordItem.dataset.word = word;
            
            // Find the corresponding word position to know the actual direction
            const wordPosition = currentPuzzle.wordPositions.find(pos => pos.word === word);
            const isHorizontal = wordPosition ? wordPosition.direction === 'horizontal' : (index % 2 === 0);
            
            // Add direction data attribute
            wordItem.dataset.direction = isHorizontal ? 'horizontal' : 'vertical';
            
            // Add a small icon hint
            const directionHint = document.createElement('span');
            directionHint.className = 'direction-hint';
            directionHint.textContent = isHorizontal ? ' ➡️' : ' ⬇️';
            wordItem.appendChild(directionHint);
            
            // Also add length indicator
            wordItem.title = `${word} (${word.length} letters, ${isHorizontal ? 'horizontal' : 'vertical'})`;
            
            wordList.appendChild(wordItem);
        });
        
        // Show a welcome message briefly
        resultMessage.textContent = "Find all the words in the grid!";
        resultMessage.className = 'result';
        setTimeout(() => {
            resultMessage.textContent = "";
        }, 2000);
        
        // Add debug styling for placed words if DEBUG_MODE is enabled
        function addDebugStyling() {
            if (!window.DEBUG_MODE) return;
            
            const puzzle = puzzles[currentPuzzleIndex];
            
            // Add debug classes to cells based on their word positions
            for (const pos of puzzle.wordPositions) {
                if (pos.direction === 'horizontal') {
                    for (let c = pos.startCol; c <= pos.endCol; c++) {
                        const cellId = `cell-${pos.startRow}-${c}`;
                        const cell = document.getElementById(cellId);
                        if (cell) {
                            cell.classList.add('debug-word');
                            cell.classList.add('debug-horizontal');
                            cell.setAttribute('data-word', pos.word);
                        }
                    }
                } else {
                    for (let r = pos.startRow; r <= pos.endRow; r++) {
                        const cellId = `cell-${r}-${pos.startCol}`;
                        const cell = document.getElementById(cellId);
                        if (cell) {
                            cell.classList.add('debug-word');
                            cell.classList.add('debug-vertical');
                            cell.setAttribute('data-word', pos.word);
                        }
                    }
                }
            }
            
            // Check for overlaps and mark them
            const overlapCounts = {};
            
            for (const pos of puzzle.wordPositions) {
                if (pos.direction === 'horizontal') {
                    for (let c = pos.startCol; c <= pos.endCol; c++) {
                        const key = `${pos.startRow},${c}`;
                        overlapCounts[key] = (overlapCounts[key] || 0) + 1;
                    }
                } else {
                    for (let r = pos.startRow; r <= pos.endRow; r++) {
                        const key = `${r},${pos.startCol}`;
                        overlapCounts[key] = (overlapCounts[key] || 0) + 1;
                    }
                }
            }
            
            // Mark cells with overlaps
            for (const key in overlapCounts) {
                if (overlapCounts[key] > 1) {
                    const [row, col] = key.split(',').map(Number);
                    const cellId = `cell-${row}-${col}`;
                    const cell = document.getElementById(cellId);
                    if (cell) {
                        cell.classList.add('debug-overlap');
                    }
                }
            }
        }
        
        addDebugStyling();
    }

    // Toggle cell selection with sound feedback
    function toggleCellSelection(cell) {
        if (cell.classList.contains('selected')) {
            // Deselect cell
            cell.classList.remove('selected');
            
            // Find and remove this cell from the selectedCells array
            for (let i = 0; i < selectedCells.length; i++) {
                const selected = selectedCells[i];
                if (selected.dataset.row === cell.dataset.row && selected.dataset.col === cell.dataset.col) {
                    selectedCells.splice(i, 1);
                    break;
                }
            }
            
            // Play click sound
            SoundEffects.playClickSound();
        } else {
            // Select cell
            cell.classList.add('selected');
            selectedCells.push(cell);
            
            // Play click sound
            SoundEffects.playClickSound();
        }
    }

    // Get word from selected cells in the order they were selected
    function getSelectedWord() {
        return selectedCells
            .map(cell => cell.textContent)
            .join('');
    }
    
    // Check for word in any direction, but strictly with consecutive cells
    function checkForWord(word) {
        console.log(`Checking if selection matches word: "${word}"`);
        
        if (selectedCells.length !== word.length) {
            console.log(`Length mismatch: selected ${selectedCells.length} cells, word is ${word.length} letters`);
            return false;
        }
        
        // First check if the cells are consecutive (either horizontally or vertically)
        const consecutiveInfo = checkConsecutiveCells();
        if (!consecutiveInfo.isConsecutive) {
            console.log('Selected cells are not consecutive');
            return false;
        }
        
        console.log(`Cells are consecutive in ${consecutiveInfo.direction} direction`);
        
        // Get the letters from the selected cells in the appropriate order
        let selectedLetters;
        let sortedCells;
        
        if (consecutiveInfo.direction === 'horizontal') {
            // Sort cells horizontally for horizontal words
            sortedCells = [...selectedCells].sort((a, b) => 
                parseInt(a.dataset.col) - parseInt(b.dataset.col)
            );
            selectedLetters = sortedCells.map(cell => cell.textContent).join('');
        } else {
            // Sort cells vertically for vertical words
            sortedCells = [...selectedCells].sort((a, b) => 
                parseInt(a.dataset.row) - parseInt(b.dataset.row)
            );
            selectedLetters = sortedCells.map(cell => cell.textContent).join('');
        }
        
        // Log the cell positions and letters for debugging
        console.log('Cell positions (row,col) and letters:');
        sortedCells.forEach(cell => {
            console.log(`(${cell.dataset.row},${cell.dataset.col}): ${cell.textContent}`);
        });
        
        console.log(`Selected letters: ${selectedLetters}`);
        
        // Check in both directions
        const forwardMatch = selectedLetters === word;
        const reverseMatch = selectedLetters.split('').reverse().join('') === word;
        
        if (forwardMatch) {
            console.log(`Found match forward: ${selectedLetters} = ${word}`);
            return true;
        } else if (reverseMatch) {
            console.log(`Found match reversed: ${selectedLetters.split('').reverse().join('')} = ${word}`);
            return true;
        } else {
            console.log(`No match: "${selectedLetters}" doesn't match "${word}"`);
            return false;
        }
    }

    // Helper function to check if selected cells are consecutive
    function checkConsecutiveCells() {
        if (selectedCells.length <= 1) return { isConsecutive: true, direction: null };
        
        // Convert rows and columns to numbers
        const positions = selectedCells.map(cell => ({
            row: parseInt(cell.dataset.row),
            col: parseInt(cell.dataset.col),
            elem: cell
        }));
        
        // Check if cells are in same row (horizontal)
        const sameRow = positions.every(pos => pos.row === positions[0].row);
        
        // Check if cells are in same column (vertical)
        const sameCol = positions.every(pos => pos.col === positions[0].col);
        
        // If not in the same row or column, not a valid selection
        if (!sameRow && !sameCol) {
            return { isConsecutive: false, direction: null };
        }
        
        if (sameRow) {
            // For horizontal words, sort by column and check consecutive
            positions.sort((a, b) => a.col - b.col);
            
            // Check if columns are consecutive
            for (let i = 1; i < positions.length; i++) {
                if (positions[i].col !== positions[i-1].col + 1) {
                    return { isConsecutive: false, direction: null };
                }
            }
            return { isConsecutive: true, direction: 'horizontal', positions };
        } else {
            // For vertical words, sort by row and check consecutive
            positions.sort((a, b) => a.row - b.row);
            
            // Check if rows are consecutive
            for (let i = 1; i < positions.length; i++) {
                if (positions[i].row !== positions[i-1].row + 1) {
                    return { isConsecutive: false, direction: null };
                }
            }
            return { isConsecutive: true, direction: 'vertical', positions };
        }
    }
    
    // Check if all words have been found
    function allWordsFound() {
        const currentPuzzle = puzzles[currentPuzzleIndex];
        return foundWords.length === currentPuzzle.words.length;
    }

    // Submit answer button handler
    submitButton.addEventListener('click', () => {
        if (selectedCells.length === 0) {
            // Play error sound
            SoundEffects.playErrorSound();
            FeedbackSystem.showError("Please select some letters first!");
            return;
        }
        
        const currentPuzzle = puzzles[currentPuzzleIndex];
        let foundWord = null;
        let matchedPosition = null;
        
        console.log("Submit button clicked - checking for word match");
        console.log(`Selected ${selectedCells.length} cells`);
        console.log(`Current puzzle has these words: ${currentPuzzle.words.join(', ')}`);
        
        // Debug - show all word positions in this puzzle
        console.log("Word positions in current puzzle:");
        currentPuzzle.wordPositions.forEach(pos => {
            console.log(`${pos.word}: ${pos.direction} from (${pos.startRow},${pos.startCol}) to (${pos.endRow},${pos.endCol})`);
        });
        
        // Display the selected cells and their content
        console.log("Selected cells (row, col): content");
        selectedCells.forEach(cell => {
            console.log(`(${cell.dataset.row}, ${cell.dataset.col}): ${cell.textContent}`);
        });
        
        // Get the raw selected text
        const rawSelectedText = selectedCells.map(cell => cell.textContent).join('');
        console.log(`Raw selected text: "${rawSelectedText}"`);
        
        // First check if the selected cells are consecutive
        const consecutiveInfo = checkConsecutiveCells();
        if (!consecutiveInfo.isConsecutive) {
            // Not consecutive - show an error
            console.log("Cells are not consecutive!");
            SoundEffects.playErrorSound();
            FeedbackSystem.showError("Letters must be consecutive in a row or column!");
            
            // Clear selection with a shake animation
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
        
        // Get properly ordered letters from selected cells
        let selectedWord;
        if (consecutiveInfo.direction === 'horizontal') {
            // Sort by column for horizontal words
            const sortedCells = [...selectedCells].sort((a, b) => 
                parseInt(a.dataset.col) - parseInt(b.dataset.col)
            );
            selectedWord = sortedCells.map(cell => cell.textContent).join('');
        } else {
            // Sort by row for vertical words
            const sortedCells = [...selectedCells].sort((a, b) => 
                parseInt(a.dataset.row) - parseInt(b.dataset.row)
            );
            selectedWord = sortedCells.map(cell => cell.textContent).join('');
        }
        
        const reverseSelectedWord = selectedWord.split('').reverse().join('');
        
        console.log(`Ordered selected word: "${selectedWord}"`);
        console.log(`Reverse of selected word: "${reverseSelectedWord}"`);
        
        // Try matching against each word in both directions
        for (const word of currentPuzzle.words) {
            console.log(`Checking against word: "${word}"`);
            
            // Skip words already found
            if (foundWords.includes(word)) {
                console.log(`(already found "${word}" - skipping)`);
                continue;
            }
            
            // First check if lengths match
            if (selectedCells.length !== word.length) {
                console.log(`Length mismatch: selected ${selectedCells.length} cells, but "${word}" has ${word.length} letters`);
                continue;
            }
            
            // Try forward and reverse match
            if (selectedWord === word) {
                console.log(`MATCH FOUND! "${selectedWord}" matches "${word}" (forward)`);
                foundWord = word;
                matchedPosition = currentPuzzle.wordPositions.find(pos => pos.word === word);
                break;
            } else if (reverseSelectedWord === word) {
                console.log(`MATCH FOUND! "${reverseSelectedWord}" matches "${word}" (reverse)`);
                foundWord = word;
                matchedPosition = currentPuzzle.wordPositions.find(pos => pos.word === word);
                break;
            } else {
                console.log(`No match: "${selectedWord}" doesn't match "${word}"`);
            }
        }
        
        if (foundWord) {
            // Found a valid word - play success sound
            console.log(`Successfully found word "${foundWord}"!`);
            SoundEffects.playSuccessSound();
            FeedbackSystem.showSuccess(`You found "${foundWord}"!`);
            foundWords.push(foundWord);
            
            // Mark word as found in the list
            const wordItem = document.querySelector(`.word-item[data-word="${foundWord}"]`);
            if (wordItem) {
                console.log(`Marking word "${foundWord}" as found in the list`);
                wordItem.classList.add('found');
                
                // Show which direction the word was in
                if (matchedPosition) {
                    wordItem.dataset.found = 'true';
                    wordItem.dataset.foundDirection = matchedPosition.direction;
                    console.log(`Word "${foundWord}" direction: ${matchedPosition.direction}`);
                }
            } else {
                console.error(`Could not find wordItem for "${foundWord}" in the DOM`);
            }
            
            // Mark selected cells as found with a cool animation
            selectedCells.forEach(cell => {
                cell.classList.add('found-cell');
                if (matchedPosition) {
                    cell.classList.add(matchedPosition.direction);
                }
                // Keep selected class only briefly for animation
                setTimeout(() => {
                    cell.classList.remove('selected');
                }, 300);
            });
            
            // Reset selected cells array but don't remove the 'found-cell' class
            selectedCells = [];
            
            // Check if all words found
            if (allWordsFound()) {
                resultMessage.textContent = "Correct! Well done! 🎉";
                resultMessage.className = 'result success';
                celebrate();
                
                // Move to next puzzle after delay
                setTimeout(() => {
                    currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
                    setupPuzzle();
                }, 3000);
            }
        } else {
            // Invalid word - play error sound
            console.log("No matching word found in the list");
            SoundEffects.playErrorSound();
            FeedbackSystem.showError("That's not one of the words. Try again!");
            
            // Clear selection with a shake animation
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
        // Get all currently selected cells from the DOM
        const allSelectedCells = document.querySelectorAll('.grid-cell.selected');
        
        // Remove selected class from each cell
        allSelectedCells.forEach(cell => {
            cell.classList.remove('selected');
        });
        
        // Reset selected cells array
        selectedCells = [];
        
        // Play click sound
        SoundEffects.playClickSound();
        
        // Show feedback
        FeedbackSystem.showClick('Cleared your selection!');
        
        // Brief visual feedback
        resultMessage.textContent = "Selection cleared!";
        resultMessage.className = 'result';
        setTimeout(() => {
            resultMessage.textContent = "";
        }, 1000);
    });
    
    // Skip button handler
    document.getElementById('skip-puzzle').addEventListener('click', () => {
        // Play sound
        SoundEffects.playClickSound();
        
        // Show feedback
        FeedbackSystem.showClick('Skipping to next puzzle...');
        
        // Add visual feedback
        resultMessage.textContent = "Skipping to the next puzzle...";
        resultMessage.className = 'result';
        
        // Move to next puzzle with a short delay
        setTimeout(() => {
            currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
            
            // Add a brief transition effect
            const puzzleContainer = document.querySelector('.puzzle-container');
            puzzleContainer.style.opacity = '0.5';
            
            setTimeout(() => {
                setupPuzzle();
                puzzleContainer.style.opacity = '1';
            }, 300);
        }, 500);
    });

    // Function to create celebration effects
    function celebrate() {
        const puzzle = document.querySelector('.puzzle-container');
        puzzle.classList.add('celebrate');
        setTimeout(() => puzzle.classList.remove('celebrate'), 3000);
    }

    // Check that the first puzzle is properly set up
    console.log("%c VERIFYING FIRST PUZZLE (should contain APPLE):", "color: red; font-weight: bold;");
    const firstPuzzle = puzzles[0];
    console.log("Words in first puzzle:", firstPuzzle.words);
    console.table(firstPuzzle.wordPositions); // Better display of positions
    
    // For APPLE specifically
    const applePosition = firstPuzzle.wordPositions.find(pos => pos.word === "APPLE");
    if (applePosition) {
        console.log("%cAPPLE is placed:", "color:green; font-weight:bold", applePosition);
        console.log("Let's verify the grid at those coordinates:");
        
        if (applePosition.direction === 'horizontal') {
            let verifiedWord = '';
            for (let i = 0; i < "APPLE".length; i++) {
                verifiedWord += firstPuzzle.grid[applePosition.startRow][applePosition.startCol + i];
            }
            console.log("Grid horizontally reads:", verifiedWord);
        } else {
            let verifiedWord = '';
            for (let i = 0; i < "APPLE".length; i++) {
                verifiedWord += firstPuzzle.grid[applePosition.startRow + i][applePosition.startCol];
            }
            console.log("Grid vertically reads:", verifiedWord);
        }
        
        // Print the entire grid for the first puzzle
        console.log("%cFull grid for the first puzzle:", "color:blue; font-weight:bold");
        let gridDisplay = '';
        for (let r = 0; r < 10; r++) {
            let rowStr = '';
            for (let c = 0; c < 10; c++) {
                rowStr += firstPuzzle.grid[r][c] + ' ';
            }
            gridDisplay += rowStr + '\n';
        }
        console.log(gridDisplay);
    } else {
        console.error("APPLE not found in word positions!");
    }
    
    // Initialize first puzzle
    setupPuzzle();
    
    // Improved function to place a word in the grid without conflicts
    function tryPlaceWordWithoutConflict(grid, word, direction, placedCells) {
        const gridSize = 10;
        let bestStartRow = -1;
        let bestStartCol = -1;
        let minConflicts = Infinity;
        
        // Calculate possible starting positions based on direction and word length
        for (let startRow = 0; startRow < gridSize; startRow++) {
            for (let startCol = 0; startCol < gridSize; startCol++) {
                // Check if word would fit from this position
                let fits = true;
                
                if (direction === 'horizontal' && startCol + word.length > gridSize) {
                    fits = false;
                } else if (direction === 'vertical' && startRow + word.length > gridSize) {
                    fits = false;
                }
                
                if (!fits) continue;
                
                // Count conflicts at this position
                let conflicts = 0;
                
                for (let i = 0; i < word.length; i++) {
                    const row = direction === 'horizontal' ? startRow : startRow + i;
                    const col = direction === 'horizontal' ? startCol + i : startCol;
                    const cellKey = `${row},${col}`;
                    
                    if (placedCells[cellKey] && placedCells[cellKey].letter !== word.charAt(i)) {
                        conflicts++;
                    }
                }
                
                // Update best position if this has fewer conflicts
                if (conflicts < minConflicts) {
                    minConflicts = conflicts;
                    bestStartRow = startRow;
                    bestStartCol = startCol;
                    
                    // If we found a position with no conflicts, we can stop searching
                    if (conflicts === 0) {
                        break;
                    }
                }
            }
            
            // Break early if we found a perfect position
            if
