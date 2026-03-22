const { useMemo, useRef, useState } = React;

let matchstickAudioContext = null;

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!matchstickAudioContext) {
    matchstickAudioContext = new AudioContextClass();
  }
  return matchstickAudioContext;
}

function playToneSequence(tones) {
  const audioContext = getAudioContext();
  if (!audioContext) return;

  const startAt = audioContext.currentTime + 0.02;

  tones.forEach((tone, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const toneStart = startAt + index * tone.duration;
    const toneEnd = toneStart + tone.duration;

    oscillator.type = tone.type || 'sine';
    oscillator.frequency.setValueAtTime(tone.frequency, toneStart);

    gain.gain.setValueAtTime(0.0001, toneStart);
    gain.gain.linearRampToValueAtTime(tone.volume || 0.08, toneStart + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, toneEnd);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(toneStart);
    oscillator.stop(toneEnd);
  });
}

function speakWord(text, options = {}) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate || 0.92;
  utterance.pitch = options.pitch || 1.12;
  utterance.volume = options.volume || 0.95;
  window.speechSynthesis.speak(utterance);
}

function playFeedback(type) {
  if (type === 'success') {
    playToneSequence([
      { frequency: 520, duration: 0.16, volume: 0.07, type: 'triangle' },
      { frequency: 660, duration: 0.16, volume: 0.08, type: 'triangle' },
      { frequency: 820, duration: 0.24, volume: 0.09, type: 'triangle' }
    ]);
    return;
  }

  playToneSequence([
    { frequency: 280, duration: 0.14, volume: 0.05, type: 'sine' },
    { frequency: 230, duration: 0.16, volume: 0.05, type: 'sine' },
    { frequency: 180, duration: 0.22, volume: 0.05, type: 'sine' }
  ]);
  speakWord('Nooooooo!', {
    rate: 0.78,
    pitch: 0.92,
    volume: 0.98
  });
}

const DIGIT_SEGMENTS = {
  '0': ['a', 'b', 'c', 'd', 'e', 'f'],
  '1': ['b', 'c'],
  '2': ['a', 'b', 'g', 'e', 'd'],
  '3': ['a', 'b', 'g', 'c', 'd'],
  '4': ['f', 'g', 'b', 'c'],
  '5': ['a', 'f', 'g', 'c', 'd'],
  '6': ['a', 'f', 'g', 'e', 'c', 'd'],
  '7': ['a', 'b', 'c'],
  '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  '9': ['a', 'b', 'c', 'd', 'f', 'g']
};

const DIGIT_BY_SEGMENTS = new Map(
  Object.entries(DIGIT_SEGMENTS).map(([digit, segments]) => [
    [...segments].sort().join(''),
    digit
  ])
);

const TOKEN_SLOTS = {
  digit: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  plus: ['h', 'v'],
  minus: ['h'],
  multiply: ['d1', 'd2'],
  equals: ['top', 'bottom']
};

const OPERATOR_FAMILY_SLOTS = ['h', 'v', 'd1', 'd2'];

function isOperatorKind(kind) {
  return kind === 'plus' || kind === 'minus' || kind === 'multiply';
}

function getAvailableSlots(kind) {
  if (isOperatorKind(kind)) return OPERATOR_FAMILY_SLOTS;
  return TOKEN_SLOTS[kind];
}

function normalizeExpression(input) {
  return input.replace(/\s+/g, '');
}

function makeTokens(expression) {
  const normalized = normalizeExpression(expression);
  const tokens = [];

  for (let index = 0; index < normalized.length; index += 1) {
    const value = normalized[index];
    let kind = 'digit';
    let displayValue = value;

    if (value === '+') kind = 'plus';
    else if (value === '-') kind = 'minus';
    else if (value === '=' ) kind = 'equals';
    else if (value === 'x' || value === 'X' || value === '*') {
      kind = 'multiply';
      displayValue = '×';
    } else if (!/^[0-9]$/.test(value)) {
      continue;
    }

    tokens.push({
      id: `t${index + 1}`,
      kind,
      value: displayValue
    });
  }

  return tokens;
}

function cloneSegments(token) {
  if (token.kind === 'digit') return [...DIGIT_SEGMENTS[token.value]];
  return [...TOKEN_SLOTS[token.kind]];
}

function tokenFromSegments(tokenId, kindHint, segments) {
  const sorted = [...segments].sort();

  if (kindHint === 'digit') {
    const digit = DIGIT_BY_SEGMENTS.get(sorted.join(''));
    return digit ? { id: tokenId, kind: 'digit', value: digit } : null;
  }

  if (isOperatorKind(kindHint)) {
    const joined = sorted.join(',');
    if (joined === 'h,v') return { id: tokenId, kind: 'plus', value: '+' };
    if (joined === 'h') return { id: tokenId, kind: 'minus', value: '-' };
    if (joined === 'd1,d2') return { id: tokenId, kind: 'multiply', value: '×' };
    return null;
  }

  if (kindHint === 'equals') {
    return sorted.join(',') === 'bottom,top'
      ? { id: tokenId, kind: 'equals', value: '=' }
      : null;
  }

  return null;
}

function countSticks(tokens) {
  return tokens.reduce((sum, token) => sum + cloneSegments(token).length, 0);
}

function formatEquation(tokens) {
  return tokens.reduce((text, token, index) => {
    if (index === 0) return token.value;
    const previous = tokens[index - 1];
    if (token.kind === 'digit' && previous.kind === 'digit') {
      return `${text}${token.value}`;
    }
    return `${text} ${token.value}`;
  }, '').replace(/ ([=+\-×])/g, ' $1 ').replace(/\s+/g, ' ').trim();
}

function tokenizeSide(tokens) {
  const parts = [];
  let currentNumber = '';

  tokens.forEach((token) => {
    if (token.kind === 'digit') {
      currentNumber += token.value;
      return;
    }

    if (currentNumber) {
      parts.push(Number(currentNumber));
      currentNumber = '';
    }

    if (token.kind === 'plus' || token.kind === 'minus' || token.kind === 'multiply') {
      parts.push(token.value);
    }
  });

  if (currentNumber) {
    parts.push(Number(currentNumber));
  }

  return parts;
}

function evaluateSide(tokens) {
  const parts = tokenizeSide(tokens);
  if (!parts.length) return null;
  if (typeof parts[0] !== 'number' || typeof parts[parts.length - 1] !== 'number') return null;

  for (let index = 1; index < parts.length; index += 2) {
    if (typeof parts[index] !== 'string') return null;
    if (typeof parts[index + 1] !== 'number') return null;
  }

  const values = [parts[0]];
  const operators = [];

  for (let index = 1; index < parts.length; index += 2) {
    const operator = parts[index];
    const nextValue = parts[index + 1];

    if (operator === '×') {
      values[values.length - 1] *= nextValue;
    } else {
      operators.push(operator);
      values.push(nextValue);
    }
  }

  let total = values[0];
  operators.forEach((operator, index) => {
    if (operator === '+') total += values[index + 1];
    if (operator === '-') total -= values[index + 1];
  });

  return total;
}

function isEquationTrue(tokens) {
  const equalsIndex = tokens.findIndex((token) => token.kind === 'equals');
  if (equalsIndex <= 0 || equalsIndex >= tokens.length - 1) return false;
  if (tokens.filter((token) => token.kind === 'equals').length !== 1) return false;

  const leftValue = evaluateSide(tokens.slice(0, equalsIndex));
  const rightValue = evaluateSide(tokens.slice(equalsIndex + 1));

  if (leftValue === null || rightValue === null) return false;
  return leftValue === rightValue;
}

function applyMove(tokens, fromTokenId, fromSegment, toTokenId, toSegment) {
  if (fromTokenId === toTokenId && fromSegment === toSegment) return null;

  const fromToken = tokens.find((token) => token.id === fromTokenId);
  const toToken = tokens.find((token) => token.id === toTokenId);
  if (!fromToken || !toToken) return null;

  const fromSegments = cloneSegments(fromToken);
  const toSegments = cloneSegments(toToken);

  if (!fromSegments.includes(fromSegment)) return null;
  if (toSegments.includes(toSegment)) return null;

  if (fromToken.id === toToken.id) {
    const sameTokenSegments = toSegments
      .filter((segment) => segment !== fromSegment)
      .concat(toSegment);
    const sameToken = tokenFromSegments(toToken.id, toToken.kind, sameTokenSegments);
    if (!sameToken) return null;

    return tokens.map((token) => (token.id === toToken.id ? sameToken : token));
  }

  const nextFromToken = tokenFromSegments(
    fromToken.id,
    fromToken.kind,
    fromSegments.filter((segment) => segment !== fromSegment)
  );
  const nextToToken = tokenFromSegments(
    toToken.id,
    toToken.kind,
    [...toSegments, toSegment]
  );

  if (!nextFromToken || !nextToToken) return null;

  return tokens.map((token) => {
    if (token.id === fromToken.id) return nextFromToken;
    if (token.id === toToken.id) return nextToToken;
    return token;
  });
}

function getNeighbors(tokens) {
  const baseStickCount = countSticks(tokens);
  const nextStates = new Map();

  tokens.forEach((fromToken) => {
    cloneSegments(fromToken).forEach((fromSegment) => {
      tokens.forEach((toToken) => {
        const allSegments = getAvailableSlots(toToken.kind);
        allSegments.forEach((toSegment) => {
          if (cloneSegments(toToken).includes(toSegment)) return;

          const nextTokens = applyMove(tokens, fromToken.id, fromSegment, toToken.id, toSegment);
          if (!nextTokens) return;
          if (countSticks(nextTokens) !== baseStickCount) return;

          const nextText = formatEquation(nextTokens);
          if (nextText === formatEquation(tokens)) return;
          nextStates.set(nextText, nextTokens);
        });
      });
    });
  });

  return [...nextStates.values()];
}

function findValidSolutions(startExpression, requiredMoves = 1) {
  let frontier = [makeTokens(startExpression)];

  for (let move = 0; move < requiredMoves; move += 1) {
    const nextFrontierMap = new Map();
    frontier.forEach((tokens) => {
      getNeighbors(tokens).forEach((neighbor) => {
        nextFrontierMap.set(formatEquation(neighbor), neighbor);
      });
    });
    frontier = [...nextFrontierMap.values()];
  }

  return frontier
    .filter((tokens) => isEquationTrue(tokens))
    .map((tokens) => formatEquation(tokens))
    .filter((value, index, array) => array.indexOf(value) === index);
}

const PUZZLES = [
  { start: '6 + 4 = 4', preferredAnswer: '8 - 4 = 4', requiredMoves: 1 },
  { start: '1 + 2 = 5', preferredAnswer: '1 + 2 = 3', requiredMoves: 1 },
  { start: '3 + 9 = 5', preferredAnswer: '3 + 3 = 6', requiredMoves: 1 },
  { start: '6 + 9 = 6', preferredAnswer: '6 + 0 = 6', requiredMoves: 1 },
  { start: '9 - 2 = 8', preferredAnswer: '8 - 2 = 6', requiredMoves: 1 },
  { start: '6 - 9 = 3', preferredAnswer: '8 - 5 = 3', requiredMoves: 1 },
  { start: '6 + 1 = 12', preferredAnswer: '5 + 7 = 12', requiredMoves: 1 },
  { start: '15 - 3 = 9', preferredAnswer: '12 - 3 = 9', requiredMoves: 2 }
];

function isVertical(segment) {
  return ['b', 'c', 'e', 'f', 'v'].includes(segment);
}

function isDiagonal(segment) {
  return ['d1', 'd2'].includes(segment);
}

function segmentClass(segment) {
  switch (segment) {
    case 'a': return 'mp-slot mp-slot-a';
    case 'b': return 'mp-slot mp-slot-b';
    case 'c': return 'mp-slot mp-slot-c';
    case 'd': return 'mp-slot mp-slot-d';
    case 'e': return 'mp-slot mp-slot-e';
    case 'f': return 'mp-slot mp-slot-f';
    case 'g': return 'mp-slot mp-slot-g';
    case 'h': return 'mp-slot mp-slot-h';
    case 'v': return 'mp-slot mp-slot-v';
    case 'top': return 'mp-slot mp-slot-top';
    case 'bottom': return 'mp-slot mp-slot-bottom';
    case 'd1': return 'mp-slot mp-slot-d1';
    case 'd2': return 'mp-slot mp-slot-d2';
    default: return 'mp-slot';
  }
}

function Stick({
  active,
  vertical,
  diagonal = null,
  placeholder = false,
  hiddenTarget = false,
  dragging = false,
  dropTarget = false,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop
}) {
  const classes = ['mp-stick'];
  if (diagonal) classes.push(diagonal);
  else classes.push(vertical ? 'v' : 'h');
  if (!active && placeholder) classes.push('placeholder');
  if (hiddenTarget) classes.push('hidden-target');
  if (dragging) classes.push('dragging');
  if (dropTarget) classes.push('drop-target');

  return (
    <div
      className={classes.join(' ')}
      draggable={active}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="mp-stick-body" />
      <div className="mp-stick-hit" />
    </div>
  );
}

function DigitToken({
  token,
  dragging,
  dropTarget,
  onDragStart,
  onDragEnd,
  onDragEnterPlaceholder,
  onDragLeavePlaceholder,
  onDropOnPlaceholder
}) {
  const activeSegments = cloneSegments(token);

  return (
    <div className="mp-token mp-token-digit">
      {TOKEN_SLOTS.digit.map((segment) => {
        const active = activeSegments.includes(segment);
        const isDragging = dragging && dragging.fromTokenId === token.id && dragging.fromSegment === segment;
        const isDropTarget = dropTarget && dropTarget.tokenId === token.id && dropTarget.segment === segment;

        return (
          <div key={segment} className={segmentClass(segment)}>
            <Stick
              active={active}
              vertical={isVertical(segment)}
              placeholder={!active}
              dragging={!!isDragging}
              dropTarget={!!isDropTarget}
              onDragStart={active ? (e) => onDragStart(token.id, segment, e) : undefined}
              onDragEnd={active ? onDragEnd : undefined}
              onDragOver={!active ? (e) => {
                e.preventDefault();
                onDragEnterPlaceholder(token.id, segment);
              } : undefined}
              onDragLeave={!active ? () => onDragLeavePlaceholder(token.id, segment) : undefined}
              onDrop={!active ? (e) => onDropOnPlaceholder(token.id, segment, e) : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}

function SymbolToken({
  token,
  dragging,
  dropTarget,
  onDragStart,
  onDragEnd,
  onDragEnterPlaceholder,
  onDragLeavePlaceholder,
  onDropOnPlaceholder
}) {
  function renderSlot(segment, { hiddenTarget = false, active = true } = {}) {
    const isDragging = dragging && dragging.fromTokenId === token.id && dragging.fromSegment === segment;
    const isDropTarget = dropTarget && dropTarget.tokenId === token.id && dropTarget.segment === segment;

    return (
      <div key={`${segment}-${hiddenTarget ? 'hidden' : 'shown'}`} className={segmentClass(segment)}>
        <Stick
          active={active}
          vertical={isVertical(segment)}
          diagonal={isDiagonal(segment) ? segment : null}
          placeholder={!active && !!isDropTarget}
          hiddenTarget={hiddenTarget && !isDropTarget}
          dragging={!!isDragging}
          dropTarget={!!isDropTarget}
          onDragStart={active ? (e) => onDragStart(token.id, segment, e) : undefined}
          onDragEnd={active ? onDragEnd : undefined}
          onDragOver={!active ? (e) => {
            e.preventDefault();
            onDragEnterPlaceholder(token.id, segment);
          } : undefined}
          onDragLeave={!active ? () => onDragLeavePlaceholder(token.id, segment) : undefined}
          onDrop={!active ? (e) => onDropOnPlaceholder(token.id, segment, e) : undefined}
        />
      </div>
    );
  }

  if (token.kind === 'equals') {
    return (
      <div className="mp-token mp-token-symbol">
        {renderSlot('top')}
        {renderSlot('bottom')}
      </div>
    );
  }

  if (token.kind === 'plus') {
    return (
      <div className="mp-token mp-token-symbol mp-token-operator">
        {renderSlot('h')}
        {renderSlot('v')}
        {renderSlot('d1', { active: false, hiddenTarget: true })}
        {renderSlot('d2', { active: false, hiddenTarget: true })}
      </div>
    );
  }

  if (token.kind === 'minus') {
    return (
      <div className="mp-token mp-token-symbol mp-token-operator">
        {renderSlot('h')}
        {renderSlot('v', { active: false, hiddenTarget: true })}
        {renderSlot('d1', { active: false, hiddenTarget: true })}
        {renderSlot('d2', { active: false, hiddenTarget: true })}
      </div>
    );
  }

  return (
    <div className="mp-token mp-token-symbol mp-token-operator mp-token-multiply">
      {renderSlot('d1')}
      {renderSlot('d2')}
      {renderSlot('h', { active: false, hiddenTarget: true })}
      {renderSlot('v', { active: false, hiddenTarget: true })}
    </div>
  );
}

function TokenView(props) {
  if (props.token.kind === 'digit') {
    return <DigitToken {...props} />;
  }
  return <SymbolToken {...props} />;
}

function groupTokens(tokens) {
  const groups = [];
  let currentNumberGroup = [];

  tokens.forEach((token) => {
    if (token.kind === 'digit') {
      currentNumberGroup.push(token);
      return;
    }

    if (currentNumberGroup.length) {
      groups.push({ type: 'number', tokens: currentNumberGroup });
      currentNumberGroup = [];
    }
    groups.push({ type: 'single', tokens: [token] });
  });

  if (currentNumberGroup.length) {
    groups.push({ type: 'number', tokens: currentNumberGroup });
  }

  return groups;
}

function MatchstickPuzzleGame() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [expression, setExpression] = useState(makeTokens(PUZZLES[0].start));
  const [dragging, setDragging] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [moves, setMoves] = useState(0);
  const [message, setMessage] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const successVoiceTimerRef = useRef(null);
  const celebrationTimerRef = useRef(null);
  const currentPuzzle = PUZZLES[currentPuzzleIndex];

  const equationText = useMemo(() => formatEquation(expression), [expression]);
  const displayGroups = useMemo(() => groupTokens(expression), [expression]);
  const instructionText = currentPuzzle.requiredMoves === 2
    ? 'Move two matchsticks and make the equation correct.'
    : 'Move one matchstick and make the equation correct.';

  function clearSuccessTimers() {
    if (successVoiceTimerRef.current) {
      window.clearTimeout(successVoiceTimerRef.current);
      successVoiceTimerRef.current = null;
    }
    if (celebrationTimerRef.current) {
      window.clearTimeout(celebrationTimerRef.current);
      celebrationTimerRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  function startSuccessCelebration() {
    clearSuccessTimers();
    setShowCelebration(true);
    celebrationTimerRef.current = window.setTimeout(() => {
      setShowCelebration(false);
      celebrationTimerRef.current = null;
    }, 2200);
    successVoiceTimerRef.current = window.setTimeout(() => {
      speakWord('Goooooood Jaaaaaab!', {
        rate: 0.7,
        pitch: 1.2,
        volume: 1
      });
      successVoiceTimerRef.current = null;
    }, 900);
  }

  function handleDragStart(tokenId, segment, e) {
    const payload = { fromTokenId: tokenId, fromSegment: segment };
    e.dataTransfer.setData('text/plain', JSON.stringify(payload));
    e.dataTransfer.effectAllowed = 'move';
    setDragging(payload);
    setDropTarget(null);
  }

  function handleDragEnd() {
    setDragging(null);
    setDropTarget(null);
  }

  function handleDragEnterPlaceholder(tokenId, segment) {
    setDropTarget({ tokenId, segment });
  }

  function handleDragLeavePlaceholder(tokenId, segment) {
    setDropTarget((current) => {
      if (!current) return null;
      if (current.tokenId === tokenId && current.segment === segment) return null;
      return current;
    });
  }

  function handleSolvedExpression(nextExpression, nextMoves) {
    const nextText = formatEquation(nextExpression);
    const isValidEquation = isEquationTrue(nextExpression);
    const isSolved = isValidEquation && nextMoves === currentPuzzle.requiredMoves;

    if (isSolved) {
      setMessage(`Solved: ${nextText}`);
      playFeedback('success');
      startSuccessCelebration();
      return;
    }

    if (isValidEquation && nextMoves < currentPuzzle.requiredMoves) {
      setMessage(`Nice. One more move to finish this puzzle.`);
      return;
    }

    if (isValidEquation && nextMoves > currentPuzzle.requiredMoves) {
      setMessage(`Correct equation, but this puzzle needs exactly ${currentPuzzle.requiredMoves} moves.`);
      return;
    }

    setMessage(`Current equation: ${nextText}`);
  }

  function tryMoveStick(fromTokenId, fromSegment, toTokenId, toSegment) {
    const nextExpression = applyMove(expression, fromTokenId, fromSegment, toTokenId, toSegment);

    if (!nextExpression) {
      setMessage('That move does not make valid symbols.');
      playFeedback('error');
      return;
    }

    if (countSticks(nextExpression) !== countSticks(expression)) {
      setMessage('You must move exactly one existing stick.');
      playFeedback('error');
      return;
    }

    const nextMoves = moves + 1;
    setExpression(nextExpression);
    setMoves(nextMoves);
    handleSolvedExpression(nextExpression, nextMoves);
  }

  function handleDropOnPlaceholder(tokenId, segment, e) {
    e.preventDefault();

    let payload = dragging;
    if (!payload) {
      try {
        payload = JSON.parse(e.dataTransfer.getData('text/plain'));
      } catch {
        payload = null;
      }
    }

    if (!payload) return;

    tryMoveStick(payload.fromTokenId, payload.fromSegment, tokenId, segment);
    setDragging(null);
    setDropTarget(null);
  }

  function reset() {
    clearSuccessTimers();
    setExpression(makeTokens(currentPuzzle.start));
    setDragging(null);
    setDropTarget(null);
    setMoves(0);
    setMessage('');
    setShowCelebration(false);
  }

  function showAnswer() {
    clearSuccessTimers();
    setExpression(makeTokens(currentPuzzle.preferredAnswer));
    setDragging(null);
    setDropTarget(null);
    setMoves(currentPuzzle.requiredMoves);
    setShowCelebration(false);
    setMessage(`Answer: ${formatEquation(makeTokens(currentPuzzle.preferredAnswer))}`);
  }

  function openPuzzle(index) {
    clearSuccessTimers();
    const nextIndex = Math.max(0, Math.min(PUZZLES.length - 1, index));
    setCurrentPuzzleIndex(nextIndex);
    setExpression(makeTokens(PUZZLES[nextIndex].start));
    setDragging(null);
    setDropTarget(null);
    setMoves(0);
    setMessage('');
    setShowCelebration(false);
  }

  return (
    <div className="mp-shell">
      <div className="mp-topbar">
        <div>
          <h1>Matchstick Puzzle</h1>
        </div>
        <a href="../brainy-blocks/index.html" className="mp-back-btn">
          Back to Puzzle Hub
        </a>
      </div>

      <div className="mp-board">
        {showCelebration ? (
          <div className="mp-celebration" aria-hidden="true">
            <span className="mp-flower flower-1">🌼</span>
            <span className="mp-flower flower-2">🌸</span>
            <span className="mp-flower flower-3">🌺</span>
            <span className="mp-flower flower-4">🌼</span>
            <span className="mp-flower flower-5">🌸</span>
            <span className="mp-flower flower-6">🌺</span>
            <span className="mp-flower flower-7">🌼</span>
            <span className="mp-flower flower-8">🌸</span>
          </div>
        ) : null}
        <div className="mp-puzzle-badge">Puzzle {currentPuzzleIndex + 1} / {PUZZLES.length}</div>
        <div className="mp-moves-badge">Moves: {moves}</div>
        <div className="mp-instruction">{instructionText}</div>
        <div className="mp-equation">
          {displayGroups.map((group, groupIndex) => (
            <div
              key={`group-${groupIndex}`}
              className={group.type === 'number' ? 'mp-number-group' : 'mp-single-group'}
            >
              {group.tokens.map((token) => (
                <TokenView
                  key={token.id}
                  token={token}
                  dragging={dragging}
                  dropTarget={dropTarget}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragEnterPlaceholder={handleDragEnterPlaceholder}
                  onDragLeavePlaceholder={handleDragLeavePlaceholder}
                  onDropOnPlaceholder={handleDropOnPlaceholder}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mp-footer">
        <div className="mp-status">
          {message ? (
            <h2 className={isEquationTrue(expression) && moves === currentPuzzle.requiredMoves ? 'success' : ''}>
              {message}
            </h2>
          ) : null}
        </div>

        <div className="mp-actions">
          <button
            className="mp-action-btn"
            onClick={() => openPuzzle(currentPuzzleIndex - 1)}
            disabled={currentPuzzleIndex === 0}
          >
            Previous
          </button>
          <button className="mp-action-btn" onClick={showAnswer}>Show Answer</button>
          <button className="mp-action-btn primary" onClick={reset}>Reset</button>
          <button
            className="mp-action-btn"
            onClick={() => openPuzzle(currentPuzzleIndex + 1)}
            disabled={currentPuzzleIndex === PUZZLES.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('matchstick-root'));
root.render(<MatchstickPuzzleGame />);
