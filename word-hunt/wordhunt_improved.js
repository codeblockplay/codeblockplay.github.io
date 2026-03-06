// Set this to false for production environment
window.DEBUG_MODE = false;

document.addEventListener('DOMContentLoaded', () => {
    // Define words for each puzzle
    const allWordSets = [
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

    // Create an empty 10x10 grid
    function createEmptyGrid() {
        return Array(10).fill().map(() => Array(10).fill('.'));
    }

    // Helper function to check if a cell is already occupied with a different letter
    function hasConflict(grid, row, col, letter) {
        // If outside the grid, it's a conflict
        if (row < 0 || row >= 10 || col < 0 || col >= 10) {
            return true;
        }
        
        // If the cell is empty (.) or already contains the same letter, no conflict
        return grid[row][col] !== '.' && grid[row][col] !== letter;
    }

    // Try to place a word in the grid in the given direction
    function tryPlaceWord(grid, word, direction, startRow, startCol) {
        // Make a copy of the grid to test placement without modifying the original
        const testGrid = grid.map(row => [...row]);
        
        // Check if the word fits and doesn't conflict with existing letters
        for (let i = 0; i < word.length; i++) {
            const letter = word[i];
            const row = direction === 'horizontal' ? startRow : startRow + i;
            const col = direction === 'horizontal' ? startCol + i : startCol;
            
            if (hasConflict(testGrid, row, col, letter)) {
                return false; // Conflict found
            }
        }
        
        // No conflicts, place the word in the test grid
        for (let i = 0; i < word.length; i++) {
            const letter = word[i];
            const row = direction === 'horizontal' ? startRow : startRow + i;
            const col = direction === 'horizontal' ? startCol + i : startCol;
            testGrid[row][col] = letter;
        }
        
        return testGrid; // Return the updated grid if successful
    }
    
    // Find all possible placements for a word in the given direction
    function findAllPossiblePlacements(grid, word, direction) {
        const placements = [];
        const gridSize = 10;
        
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                // Check if word fits in the grid from this position
                if ((direction === 'horizontal' && col + word.length > gridSize) || 
                    (direction === 'vertical' && row + word.length > gridSize)) {
                    continue;
                }
                
                const updatedGrid = tryPlaceWord(grid, word, direction, row, col);
                if (updatedGrid) {
                    placements.push({
                        grid: updatedGrid,
                        startRow: row,
                        startCol: col,
                        endRow: direction === 'horizontal' ? row : row + word.length - 1,
                        endCol: direction === 'horizontal' ? col + word.length - 1 : col,
                        direction
                    });
                }
            }
        }
        
        return placements;
    }
    
    // Create a puzzle by carefully placing words to avoid conflicts
    function createPuzzleWithoutConflicts(words) {
        // Create an empty grid
        let grid = createEmptyGrid();
        const wordPositions = [];
        const placedWords = [];
        
        console.log("Creating puzzle with words:", words.join(", "));
        
        // First attempt to place 3 words horizontally
        const horizontalWords = words.slice(0, 3);
        for (const word of horizontalWords) {
            // Skip if word is too long
            if (word.length > 10) {
                console.warn(`Word "${word}" is too long for the grid, skipping`);
                continue;
            }
            
            // Find all possible horizontal placements
            const horizontalPlacements = findAllPossiblePlacements(grid, word, 'horizontal');
            
            if (horizontalPlacements.length > 0) {
                // Choose a random placement from the viable options
                const placement = horizontalPlacements[Math.floor(Math.random() * horizontalPlacements.length)];
                
                // Update the grid with the chosen placement
                grid = placement.grid;
                
                // Record the word position
                wordPositions.push({
                    word,
                    direction: 'horizontal',
                    startRow: placement.startRow,
                    startCol: placement.startCol,
                    endRow: placement.endRow,
                    endCol: placement.endCol
                });
                
                placedWords.push(word);
                console.log(`Successfully placed "${word}" horizontally at row ${placement.startRow}, cols ${placement.startCol}-${placement.endCol}`);
            } else {
                console.warn(`Could not place "${word}" horizontally without conflicts, skipping`);
            }
        }
        
        // Then attempt to place remaining words vertically
        const verticalWords = words.slice(3);
        for (const word of verticalWords) {
            // Skip if word is too long
            if (word.length > 10) {
                console.warn(`Word "${word}" is too long for the grid, skipping`);
                continue;
            }
            
            // Find all possible vertical placements
            const verticalPlacements = findAllPossiblePlacements(grid, word, 'vertical');
            
            if (verticalPlacements.length > 0) {
                // Choose a random placement from the viable options
                const placement = verticalPlacements[Math.floor(Math.random() * verticalPlacements.length)];
                
                // Update the grid with the chosen placement
                grid = placement.grid;
                
                // Record the word position
                wordPositions.push({
                    word,
                    direction: 'vertical',
                    startRow: placement.startRow,
                    startCol: placement.startCol,
                    endRow: placement.endRow,
                    endCol: placement.endCol
                });
                
                placedWords.push(word);
                console.log(`Successfully placed "${word}" vertically at column ${placement.startCol}, rows ${placement.startRow}-${placement.endRow}`);
            } else {
                // Try horizontal as fallback if vertical placement fails
                const horizontalPlacements = findAllPossiblePlacements(grid, word, 'horizontal');
                
                if (horizontalPlacements.length > 0) {
                    // Choose a random placement from the viable options
                    const placement = horizontalPlacements[Math.floor(Math.random() * horizontalPlacements.length)];
                    
                    // Update the grid with the chosen placement
                    grid = placement.grid;
                    
                    // Record the word position
                    wordPositions.push({
                        word,
                        direction: 'horizontal',
                        startRow: placement.startRow,
                        startCol: placement.startCol,
                        endRow: placement.endRow,
                        endCol: placement.endCol
                    });
                    
                    placedWords.push(word);
                    console.log(`Successfully placed "${word}" horizontally (as fallback) at row ${placement.startRow}, cols ${placement.startCol}-${placement.endCol}`);
                } else {
                    console.warn(`Could not place "${word}" in any direction without conflicts, skipping`);
                }
            }
        }
        
        // Verify all word placements before filling in random letters
        let allPlacementsCorrect = true;
        console.log("Verifying word placements before filling random letters:");
        
        for (const pos of wordPositions) {
            let placedWord = '';
            if (pos.direction === 'horizontal') {
                for (let c = pos.startCol; c <= pos.endCol; c++) {
                    placedWord += grid[pos.startRow][c];
                }
            } else {
                for (let r = pos.startRow; r <= pos.endRow; r++) {
                    placedWord += grid[r][pos.startCol];
                }
            }
            
            if (placedWord !== pos.word) {
                console.error(`VERIFICATION ERROR: Word "${pos.word}" was placed incorrectly as "${placedWord}"`);
                allPlacementsCorrect = false;
            } else {
                console.log(`Verified word "${pos.word}" correctly placed as "${placedWord}"`);
            }
        }
        
        // Fill in random letters for any remaining empty cells
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (grid[row][col] === '.') {
                    grid[row][col] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                }
            }
        }
        
        return {
            grid,
            words: placedWords,
            wordPositions
        };
    }

    // Generate all puzzles
    const puzzles = [];
    for (let i = 0; i < allWordSets.length; i++) {
        console.log(`Generating puzzle #${i + 1}...`);
        const puzzle = createPuzzleWithoutConflicts(allWordSets[i]);
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
                    // This should never happen with our improved algorithm
                    console.error(`Overlap detected at row ${row}, col ${col}`);
                }
            }
        }
    }

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
        
        // Debug log of word positions for verification
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
        currentPuzzle.words.forEach((word) => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            wordItem.textContent = word;
            wordItem.dataset.word = word;
            
            // Find the corresponding word position to know the actual direction
            const wordPosition = currentPuzzle.wordPositions.find(pos => pos.word === word);
            const isHorizontal = wordPosition ? wordPosition.direction === 'horizontal' : false;
            
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
        
        // Add debug styling if DEBUG_MODE is enabled
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
        FeedbackSystem.showClick('Loading another puzzle...');
        
        // Add visual feedback
        resultMessage.textContent = "Loading another puzzle...";
        resultMessage.className = 'result';
        
        // Move to another puzzle with a short delay
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
    console.log("%c VERIFYING FIRST PUZZLE:", "color: red; font-weight: bold;");
    const firstPuzzle = puzzles[0];
    console.log("Words in first puzzle:", firstPuzzle.words);
    console.table(firstPuzzle.wordPositions); // Better display of positions
    
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
    
    // Initialize first puzzle
    setupPuzzle();
});
