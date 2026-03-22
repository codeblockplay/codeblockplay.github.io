(() => {
    const SCALE = 110;
    const OFFSET_X = 115;
    const OFFSET_Y = 50;
    const STICK_THICKNESS = 12;
    const SNAP_DISTANCE = 42;

    const scene = document.getElementById('matchstick-scene');
    const movesCount = document.getElementById('moves-count');
    const movesLabel = document.getElementById('moves-label');
    const squaresCount = document.getElementById('squares-count');
    const puzzleCount = document.getElementById('puzzle-count');
    const instructionText = document.getElementById('instruction-text');
    const resetBtn = document.getElementById('reset-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const celebrationLayer = document.getElementById('celebration-layer');

    if (!scene || !movesCount || !movesLabel || !squaresCount || !puzzleCount || !instructionText || !resetBtn || !prevBtn || !nextBtn || !celebrationLayer) {
        throw new Error('Missing required Matchstick Shapes elements.');
    }

    const allSlots = [];
    for (let x = 0; x < 3; x += 1) {
        for (let y = 0; y < 4; y += 1) {
            allSlots.push([[x, y], [x + 1, y]]);
        }
    }
    for (let x = 0; x < 4; x += 1) {
        for (let y = 0; y < 3; y += 1) {
            allSlots.push([[x, y], [x, y + 1]]);
        }
    }

    const points = [];
    for (let y = 0; y < 4; y += 1) {
        for (let x = 0; x < 4; x += 1) {
            points.push([x, y]);
        }
    }

    const PUZZLES = [
        {
            title: 'Move 2 matchstick to make 6 squares.',
            mode: 'move',
            maxMoves: 2,
            targetSquares: 6,
            sticks: [
                [[0, 0], [1, 0]], [[1, 0], [2, 0]], [[2, 0], [3, 0]],
                [[0, 1], [1, 1]], [[1, 1], [2, 1]], [[2, 1], [3, 1]],
                [[1, 2], [2, 2]],
                [[1, 3], [2, 3]],
                [[0, 0], [0, 1]],
                [[1, 0], [1, 1]], [[2, 0], [2, 1]], [[3, 0], [3, 1]],
                [[1, 1], [1, 2]], [[2, 1], [2, 2]],
                [[1, 2], [1, 3]], [[2, 2], [2, 3]],
            ],
            validator(summary) {
                return summary.count === 6;
            },
        },
        {
            title: 'Move 3 matchsticks to make 6 squares.',
            mode: 'move',
            maxMoves: 3,
            targetSquares: 6,
            sticks: [
                [[0, 0], [1, 0]], [[1, 0], [2, 0]], [[2, 0], [3, 0]],
                [[0, 1], [1, 1]], [[1, 1], [2, 1]],
                [[2, 2], [3, 2]],
                [[1, 3], [2, 3]],
                [[0, 0], [0, 1]],
                [[2, 0], [2, 1]], [[3, 0], [3, 1]],
                [[1, 1], [1, 2]], [[2, 1], [2, 2]], [[3, 1], [3, 2]],
                [[1, 2], [1, 3]], [[2, 2], [2, 3]],
            ],
            validator(summary) {
                return summary.count === 6 && summary.small === 5 && summary.big === 1 && summary.giant === 0;
            },
        },
        {
            title: 'Move 3 matchsticks to make 4 squares.',
            mode: 'move',
            maxMoves: 3,
            targetSquares: 4,
            sticks: [
                [[0, 0], [1, 0]], [[1, 0], [2, 0]], [[2, 0], [3, 0]],
                [[0, 1], [1, 1]], [[1, 1], [2, 1]], [[2, 1], [3, 1]],
                [[1, 2], [2, 2]],
                [[1, 3], [2, 3]],
                [[0, 0], [0, 1]],
                [[1, 0], [1, 1]], [[2, 0], [2, 1]], [[3, 0], [3, 1]],
                [[1, 1], [1, 2]], [[2, 1], [2, 2]],
                [[1, 2], [1, 3]], [[2, 2], [2, 3]],
            ],
            validator(summary) {
                return summary.count === 4 && summary.small === 4 && summary.big === 0 && summary.giant === 0;
            },
        },
        {
            title: 'Move 3 matchsticks make 3 equal squares.',
            mode: 'move',
            maxMoves: 3,
            targetSquares: 3,
            sticks: [
                [[0, 0], [1, 0]], [[1, 0], [2, 0]],
                [[0, 1], [1, 1]], [[1, 1], [2, 1]],
                [[0, 2], [1, 2]], [[1, 2], [2, 2]],
                [[0, 0], [0, 1]], [[1, 0], [1, 1]], [[2, 0], [2, 1]],
                [[0, 1], [0, 2]], [[1, 1], [1, 2]], [[2, 1], [2, 2]],
            ],
            validator(summary) {
                return summary.count === 3
                    && summary.small === 3
                    && summary.big === 0
                    && summary.giant === 0
                    && summary.allSticksUsedBySmallSquares;
            },
        },
        {
            title: 'Remove 3 matchsticks to leave 3 equal squares.',
            mode: 'remove',
            maxMoves: 3,
            targetSquares: 3,
            sticks: [
                [[0, 0], [1, 0]], [[1, 0], [2, 0]], [[2, 0], [3, 0]],
                [[0, 1], [1, 1]], [[1, 1], [2, 1]], [[2, 1], [3, 1]],
                [[1, 2], [2, 2]], [[2, 2], [3, 2]],
                [[0, 0], [0, 1]],
                [[1, 0], [1, 1]], [[2, 0], [2, 1]], [[3, 0], [3, 1]],
                [[1, 1], [1, 2]], [[2, 1], [2, 2]], [[3, 1], [3, 2]],
            ],
            validator(summary) {
                return summary.count === 3
                    && summary.small === 3
                    && summary.big === 0
                    && summary.giant === 0
                    && summary.allSticksUsedBySmallSquares;
            },
        },
    ];

    let currentPuzzleIndex = 0;
    let moves = 0;
    let sticks = cloneSticks(PUZZLES[0].sticks);
    let dragging = null;
    let previewSlotKey = null;
    let hasCelebrated = false;
    let hasFailedAttempt = false;

    function currentPuzzle() {
        return PUZZLES[currentPuzzleIndex];
    }

    function cloneSticks(source) {
        return source.map((segment) => [segment[0].slice(), segment[1].slice()]);
    }

    function norm(a, b) {
        return JSON.stringify([a, b].sort((left, right) => {
            if (left[0] !== right[0]) return left[0] - right[0];
            return left[1] - right[1];
        }));
    }

    function stickKey(stick) {
        return norm(stick[0], stick[1]);
    }

    function serializeLayout(list) {
        return list.map((stick) => stickKey(stick)).sort().join('|');
    }

    function hasStick(slot, list = sticks, ignoreKey = null) {
        const key = stickKey(slot);
        return list.some((stick) => {
            const currentKey = stickKey(stick);
            if (ignoreKey && currentKey === ignoreKey) {
                return false;
            }
            return currentKey === key;
        });
    }

    function toXY(point) {
        return [OFFSET_X + point[0] * SCALE, OFFSET_Y + point[1] * SCALE];
    }

    function countSquares(sticksSet) {
        const has = (a, b) => sticksSet.some((stick) => norm(stick[0], stick[1]) === norm(a, b));
        let count = 0;
        let small = 0;
        let big = 0;
        let giant = 0;
        const smallSquareStickKeys = new Set();

        for (let size = 1; size <= 3; size += 1) {
            for (let x = 0; x <= 3 - size; x += 1) {
                for (let y = 0; y <= 3 - size; y += 1) {
                    let ok = true;
                    const squareEdges = [];

                    for (let dx = 0; dx < size; dx += 1) {
                        const topEdge = [[x + dx, y], [x + dx + 1, y]];
                        const bottomEdge = [[x + dx, y + size], [x + dx + 1, y + size]];
                        if (!has(...topEdge)) ok = false;
                        if (!has(...bottomEdge)) ok = false;
                        squareEdges.push(topEdge, bottomEdge);
                    }

                    for (let dy = 0; dy < size; dy += 1) {
                        const leftEdge = [[x, y + dy], [x, y + dy + 1]];
                        const rightEdge = [[x + size, y + dy], [x + size, y + dy + 1]];
                        if (!has(...leftEdge)) ok = false;
                        if (!has(...rightEdge)) ok = false;
                        squareEdges.push(leftEdge, rightEdge);
                    }

                    if (ok) {
                        count += 1;
                        if (size === 1) {
                            small += 1;
                            squareEdges.forEach((edge) => {
                                smallSquareStickKeys.add(stickKey(edge));
                            });
                        }
                        if (size === 2) big += 1;
                        if (size === 3) giant += 1;
                    }
                }
            }
        }

        return {
            count,
            small,
            big,
            giant,
            smallSquareStickCount: smallSquareStickKeys.size,
            allSticksUsedBySmallSquares: smallSquareStickKeys.size === sticksSet.length,
        };
    }

    function createDiv(className, style = {}) {
        const element = document.createElement('div');
        element.className = className;
        Object.assign(element.style, style);
        return element;
    }

    function isHorizontal(stick) {
        const [x1, y1] = toXY(stick[0]);
        const [, y2] = toXY(stick[1]);
        return y1 === y2;
    }

    function getStickBox(stick) {
        const [x1, y1] = toXY(stick[0]);
        const [x2, y2] = toXY(stick[1]);
        const horizontal = y1 === y2;

        if (horizontal) {
            return {
                left: Math.min(x1, x2),
                top: y1 - STICK_THICKNESS / 2,
                width: Math.abs(x2 - x1),
                height: STICK_THICKNESS,
                horizontal: true,
            };
        }

        return {
            left: x1 - STICK_THICKNESS / 2,
            top: Math.min(y1, y2),
            width: STICK_THICKNESS,
            height: Math.abs(y2 - y1),
            horizontal: false,
        };
    }

    function getScenePoint(event) {
        const rect = scene.getBoundingClientRect();
        const scaleX = scene.offsetWidth ? scene.offsetWidth / rect.width : 1;
        const scaleY = scene.offsetHeight ? scene.offsetHeight / rect.height : 1;

        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY,
        };
    }

    function findNearestSlot(x, y, ignoreKey) {
        let bestSlot = null;
        let bestDistance = Infinity;

        allSlots.forEach((slot) => {
            if (hasStick(slot, sticks, ignoreKey)) return;

            const box = getStickBox(slot);
            const cx = box.left + box.width / 2;
            const cy = box.top + box.height / 2;
            const distance = Math.hypot(x - cx, y - cy);

            if (distance < bestDistance) {
                bestDistance = distance;
                bestSlot = slot;
            }
        });

        return bestDistance <= SNAP_DISTANCE ? bestSlot : null;
    }

    function generateMoveSolutions(puzzle) {
        const start = cloneSticks(puzzle.sticks);
        const seen = new Set();
        const valid = new Set();

        function walk(currentSticks, depth) {
            const layoutKey = serializeLayout(currentSticks);
            const visitKey = `${depth}|${layoutKey}`;
            if (seen.has(visitKey)) return;
            seen.add(visitKey);

            if (depth > 0) {
                const summary = countSquares(currentSticks);
                if (puzzle.validator(summary) && depth <= puzzle.maxMoves) {
                    valid.add(`${depth}|${layoutKey}`);
                }
            }

            if (depth === puzzle.maxMoves) return;

            currentSticks.forEach((stick, index) => {
                const currentKey = stickKey(stick);
                allSlots.forEach((slot) => {
                    if (stickKey(slot) === currentKey) return;
                    if (hasStick(slot, currentSticks)) return;

                    const next = currentSticks.map((segment, segmentIndex) => (
                        segmentIndex === index ? [slot[0].slice(), slot[1].slice()] : [segment[0].slice(), segment[1].slice()]
                    ));
                    walk(next, depth + 1);
                });
            });
        }

        walk(start, 0);
        return valid;
    }

    function generateRemoveSolutions(puzzle) {
        const start = cloneSticks(puzzle.sticks);
        const valid = new Set();

        function walk(currentSticks, depth, startIndex) {
            if (depth === puzzle.maxMoves) {
                const summary = countSquares(currentSticks);
                if (puzzle.validator(summary)) {
                    valid.add(`${depth}|${serializeLayout(currentSticks)}`);
                }
                return;
            }

            for (let index = startIndex; index < currentSticks.length; index += 1) {
                const next = currentSticks.filter((_, stickIndex) => stickIndex !== index)
                    .map((segment) => [segment[0].slice(), segment[1].slice()]);
                walk(next, depth + 1, index);
            }
        }

        walk(start, 0, 0);
        return valid;
    }

    function ensurePuzzleCache(puzzle) {
        if (puzzle.validLayouts) return;
        puzzle.validLayouts = puzzle.mode === 'remove'
            ? generateRemoveSolutions(puzzle)
            : generateMoveSolutions(puzzle);
    }

    function shouldCheckSolved(puzzle, summary, moveCount) {
        if (moveCount <= 0 || moveCount > puzzle.maxMoves) return false;
        return puzzle.validator(summary);
    }

    function isSolvedNow(puzzle, summary, moveCount, currentSticks) {
        if (!shouldCheckSolved(puzzle, summary, moveCount)) return false;
        ensurePuzzleCache(puzzle);
        return puzzle.validLayouts.has(`${moveCount}|${serializeLayout(currentSticks)}`);
    }

    function renderPoints() {
        points.forEach((point) => {
            const [x, y] = toXY(point);
            const dot = createDiv('ms-point', {
                left: `${x}px`,
                top: `${y}px`,
            });
            scene.appendChild(dot);
        });
    }

    function renderSlots() {
        if (currentPuzzle().mode === 'remove') return;

        allSlots.forEach((slot) => {
            if (hasStick(slot, sticks, dragging?.key || null)) return;

            const box = getStickBox(slot);
            const horizontal = box.horizontal;
            const slotEl = createDiv(
                `ms-slot${dragging ? ' is-active' : ''}${horizontal ? '' : ' is-vertical'}${previewSlotKey === stickKey(slot) ? ' is-target' : ''}`,
                {
                    left: `${box.left}px`,
                    top: `${box.top}px`,
                    width: `${box.width}px`,
                    height: `${box.height}px`,
                }
            );

            slotEl.addEventListener('pointerup', () => {
                if (dragging && previewSlotKey === stickKey(slot)) {
                    finishDrag(slot);
                }
            });

            scene.appendChild(slotEl);
        });
    }

    function renderSticks() {
        sticks.forEach((stick) => {
            const key = stickKey(stick);
            const box = dragging && dragging.key === key ? dragging.box : getStickBox(stick);
            const horizontal = dragging && dragging.key === key ? dragging.horizontal : box.horizontal;

            const stickEl = createDiv(
                `ms-stick${key === dragging?.key ? ' is-selected is-dragging' : ''}${horizontal ? '' : ' is-vertical'}`,
                {
                    left: `${box.left}px`,
                    top: `${box.top}px`,
                    width: `${box.width}px`,
                    height: `${box.height}px`,
                }
            );

            stickEl.addEventListener('pointerdown', (event) => onStickPointerDown(event, stick));
            scene.appendChild(stickEl);
        });
    }

    function playTone(frequency, startOffset, duration, volume, type = 'triangle') {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!window.__msAudioContext) {
            window.__msAudioContext = new AudioContextClass();
        }

        const audioContext = window.__msAudioContext;
        if (audioContext.state === 'suspended') {
            audioContext.resume().catch(() => {});
        }

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gainNode.gain.value = volume;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        const startAt = audioContext.currentTime + startOffset;
        oscillator.start(startAt);
        gainNode.gain.setValueAtTime(volume, startAt);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
        oscillator.stop(startAt + duration);
    }

    function speakText(text, delay = 0, rate = 0.9, pitch = 1.0) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = 1;
        window.setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, delay);
    }

    function playSuccessAudio() {
        playTone(523.25, 0, 0.2, 0.08);
        playTone(659.25, 0.18, 0.22, 0.08);
        playTone(783.99, 0.36, 0.3, 0.09);
        speakText('Goooooooood Job, You solved it', 850, 0.72, 1.08);
    }

    function playFailAudio() {
        playTone(330, 0, 0.16, 0.06, 'sawtooth');
        playTone(247, 0.14, 0.2, 0.06, 'sawtooth');
        speakText('Nooooooo', 180, 0.8, 0.92);
    }

    function launchCelebration() {
        celebrationLayer.innerHTML = '';
        const flowers = ['🌸', '🌼', '🌺', '🌷', '🌻', '🪷'];
        for (let index = 0; index < 16; index += 1) {
            const flower = document.createElement('span');
            flower.className = 'ms-flower';
            flower.textContent = flowers[index % flowers.length];
            flower.style.left = `${6 + (index * 6)}%`;
            flower.style.bottom = `${4 + (index % 4) * 8}%`;
            flower.style.animationDelay = `${index * 0.06}s`;
            celebrationLayer.appendChild(flower);
        }
        window.setTimeout(() => {
            celebrationLayer.innerHTML = '';
        }, 2400);
    }

    function updateStatus() {
        const summary = countSquares(sticks);
        const puzzle = currentPuzzle();
        const solved = isSolvedNow(puzzle, summary, moves, sticks);

        puzzleCount.textContent = `${currentPuzzleIndex + 1} / ${PUZZLES.length}`;
        movesLabel.textContent = puzzle.mode === 'remove' ? 'Removed' : 'Moves';
        movesCount.textContent = `${moves} / ${puzzle.maxMoves}`;
        squaresCount.textContent = `${summary.count} / ${puzzle.targetSquares}`;
        instructionText.textContent = puzzle.title;
        prevBtn.disabled = currentPuzzleIndex === 0;
        nextBtn.disabled = currentPuzzleIndex === PUZZLES.length - 1;

        if (solved) {
            instructionText.classList.add('ms-success');
            if (!hasCelebrated) {
                hasCelebrated = true;
                launchCelebration();
                playSuccessAudio();
            }
            return;
        }

        instructionText.classList.remove('ms-success');
        if (moves === puzzle.maxMoves && !hasFailedAttempt) {
            hasFailedAttempt = true;
            playFailAudio();
        }
    }

    function removeStick(stick) {
        const puzzle = currentPuzzle();
        if (moves >= puzzle.maxMoves || isSolvedNow(puzzle, countSquares(sticks), moves, sticks)) return;
        const removeKey = stickKey(stick);
        sticks = sticks.filter((currentStick) => stickKey(currentStick) !== removeKey);
        moves += 1;
        render();
    }

    function onStickPointerDown(event, stick) {
        if (currentPuzzle().mode === 'remove') {
            event.preventDefault();
            removeStick(stick);
            return;
        }
        startDrag(event, stick);
    }

    function startDrag(event, stick) {
        const puzzle = currentPuzzle();
        if (moves >= puzzle.maxMoves || isSolvedNow(puzzle, countSquares(sticks), moves, sticks)) return;

        event.preventDefault();

        const box = getStickBox(stick);
        const point = getScenePoint(event);
        dragging = {
            key: stickKey(stick),
            horizontal: box.horizontal,
            offsetX: point.x - box.left,
            offsetY: point.y - box.top,
            box: { ...box },
        };
        previewSlotKey = null;

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        render();
    }

    function handlePointerMove(event) {
        if (!dragging) return;

        const point = getScenePoint(event);
        dragging.box.left = point.x - dragging.offsetX;
        dragging.box.top = point.y - dragging.offsetY;

        const centerX = dragging.box.left + dragging.box.width / 2;
        const centerY = dragging.box.top + dragging.box.height / 2;
        const nearest = findNearestSlot(centerX, centerY, dragging.key);
        previewSlotKey = nearest ? stickKey(nearest) : null;

        if (nearest) {
            const targetBox = getStickBox(nearest);
            dragging.horizontal = targetBox.horizontal;
            dragging.box.width = targetBox.width;
            dragging.box.height = targetBox.height;
            dragging.box.left = centerX - targetBox.width / 2;
            dragging.box.top = centerY - targetBox.height / 2;
        }

        render();
    }

    function finishDrag(slot = null) {
        if (!dragging) return;

        if (slot && stickKey(slot) !== dragging.key) {
            sticks = sticks.map((stick) => (
                stickKey(stick) === dragging.key
                    ? [slot[0].slice(), slot[1].slice()]
                    : [stick[0].slice(), stick[1].slice()]
            ));
            moves += 1;
        }

        dragging = null;
        previewSlotKey = null;
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        render();
    }

    function handlePointerUp() {
        if (!dragging) return;
        const targetSlot = previewSlotKey
            ? allSlots.find((slot) => stickKey(slot) === previewSlotKey)
            : null;
        finishDrag(targetSlot || null);
    }

    function renderPoints() {
        points.forEach((point) => {
            const [x, y] = toXY(point);
            const dot = createDiv('ms-point', {
                left: `${x}px`,
                top: `${y}px`,
            });
            scene.appendChild(dot);
        });
    }

    function render() {
        scene.innerHTML = '';
        renderSlots();
        renderSticks();
        renderPoints();
        updateStatus();
    }

    function loadPuzzle(index) {
        currentPuzzleIndex = index;
        moves = 0;
        sticks = cloneSticks(currentPuzzle().sticks);
        dragging = null;
        previewSlotKey = null;
        hasCelebrated = false;
        hasFailedAttempt = false;
        celebrationLayer.innerHTML = '';
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        render();
    }

    resetBtn.addEventListener('click', () => {
        loadPuzzle(currentPuzzleIndex);
    });

    prevBtn.addEventListener('click', () => {
        if (currentPuzzleIndex > 0) {
            loadPuzzle(currentPuzzleIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPuzzleIndex < PUZZLES.length - 1) {
            loadPuzzle(currentPuzzleIndex + 1);
        }
    });

    render();
})();
