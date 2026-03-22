const { useMemo, useState } = React;

const SCALE = 100;
const OFFSET_X = 130;
const OFFSET_Y = 60;
const MAX_MOVES = 3;
const TARGET = 6;

function norm(a, b) {
  return JSON.stringify([a, b].sort((left, right) => {
    if (left[0] !== right[0]) return left[0] - right[0];
    return left[1] - right[1];
  }));
}

function cloneSticks(sticks) {
  return sticks.map((segment) => [segment[0].slice(), segment[1].slice()]);
}

const INITIAL_STICKS = [
  [[0, 0], [1, 0]], [[1, 0], [2, 0]], [[2, 0], [3, 0]],
  [[0, 1], [1, 1]], [[1, 1], [2, 1]], [[2, 1], [3, 1]],
  [[1, 2], [2, 2]],
  [[1, 3], [2, 3]],
  [[0, 0], [0, 1]],
  [[1, 0], [1, 1]], [[2, 0], [2, 1]], [[3, 0], [3, 1]],
  [[1, 1], [1, 2]], [[2, 1], [2, 2]],
  [[1, 2], [1, 3]], [[2, 2], [2, 3]],
];

const POINTS = [];
for (let y = 0; y < 4; y += 1) {
  for (let x = 0; x < 4; x += 1) {
    POINTS.push([x, y]);
  }
}

const ALL_SLOTS = [];
for (let x = 0; x < 3; x += 1) {
  for (let y = 0; y < 4; y += 1) {
    ALL_SLOTS.push([[x, y], [x + 1, y]]);
  }
}
for (let x = 0; x < 4; x += 1) {
  for (let y = 0; y < 3; y += 1) {
    ALL_SLOTS.push([[x, y], [x, y + 1]]);
  }
}

function toXY(point) {
  return [OFFSET_X + point[0] * SCALE, OFFSET_Y + point[1] * SCALE];
}

function countSquares(sticksSet) {
  const has = (a, b) => sticksSet.some((stick) => norm(stick[0], stick[1]) === norm(a, b));
  let count = 0;

  for (let size = 1; size <= 3; size += 1) {
    for (let x = 0; x <= 3 - size; x += 1) {
      for (let y = 0; y <= 3 - size; y += 1) {
        let ok = true;

        for (let dx = 0; dx < size; dx += 1) {
          if (!has([x + dx, y], [x + dx + 1, y])) ok = false;
          if (!has([x + dx, y + size], [x + dx + 1, y + size])) ok = false;
        }
        for (let dy = 0; dy < size; dy += 1) {
          if (!has([x, y + dy], [x, y + dy + 1])) ok = false;
          if (!has([x + size, y + dy], [x + size, y + dy + 1])) ok = false;
        }

        if (ok) count += 1;
      }
    }
  }

  return count;
}

function MatchstickShapes() {
  const [moves, setMoves] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);
  const [sticks, setSticks] = useState(cloneSticks(INITIAL_STICKS));

  const squares = useMemo(() => countSquares(sticks), [sticks]);

  function hasStick(slot) {
    const key = norm(slot[0], slot[1]);
    return sticks.some((stick) => norm(stick[0], stick[1]) === key);
  }

  function handleSelect(stick) {
    if (moves >= MAX_MOVES) return;
    setSelectedKey(norm(stick[0], stick[1]));
  }

  function moveSelected(slot) {
    if (!selectedKey || moves >= MAX_MOVES) return;
    if (hasStick(slot)) return;

    setSticks((prev) => prev.map((stick) => (
      norm(stick[0], stick[1]) === selectedKey
        ? [slot[0].slice(), slot[1].slice()]
        : [stick[0].slice(), stick[1].slice()]
    )));
    setMoves((prev) => prev + 1);
    setSelectedKey(null);
  }

  function resetGame() {
    setMoves(0);
    setSelectedKey(null);
    setSticks(cloneSticks(INITIAL_STICKS));
  }

  const instruction = (() => {
    if (squares === TARGET && moves <= MAX_MOVES) {
      return { text: 'You solved it. Great job!', success: true };
    }
    if (moves >= MAX_MOVES) {
      return { text: 'No more moves left. Press reset and try again.', success: false };
    }
    if (selectedKey) {
      return { text: 'Now tap one dotted place to drop the selected stick.', success: false };
    }
    return { text: 'Tap one matchstick, then tap a dotted place to move it.', success: false };
  })();

  return (
    <section className="ms-panel" aria-label="Matchstick Shapes starter puzzle">
      <div className="ms-topbar">
        <div>
          <h1>Matchstick Shapes</h1>
          <p>Use up to 3 moves to make 6 squares.</p>
        </div>
        <a href="../brainy-blocks/index.html" className="ms-back-btn">Back to Puzzle Hub</a>
      </div>

      <div className="ms-status-row">
        <div className="ms-badge"><span>Moves</span><strong>{moves} / {MAX_MOVES}</strong></div>
        <div className="ms-badge"><span>Squares</span><strong>{squares} / {TARGET}</strong></div>
      </div>

      <div className="ms-board-wrap">
        <div className={`ms-instruction${instruction.success ? ' ms-success' : ''}`}>{instruction.text}</div>
        <svg className="ms-board" viewBox="0 0 560 460" role="img" aria-label="Matchstick puzzle board">
          <defs>
            <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffbf58"></stop>
              <stop offset="55%" stopColor="#f09b3d"></stop>
              <stop offset="100%" stopColor="#df7b22"></stop>
            </linearGradient>
          </defs>

          {ALL_SLOTS.map((slot, index) => {
            if (hasStick(slot)) return null;
            const [x1, y1] = toXY(slot[0]);
            const [x2, y2] = toXY(slot[1]);
            const active = Boolean(selectedKey) && moves < MAX_MOVES;
            return (
              <line
                key={`slot-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={`ms-slot${active ? ' is-active' : ''}`}
                style={{ opacity: active ? 1 : 0 }}
                onClick={() => moveSelected(slot)}
              />
            );
          })}

          {sticks.map((stick, index) => {
            const [x1, y1] = toXY(stick[0]);
            const [x2, y2] = toXY(stick[1]);
            const key = norm(stick[0], stick[1]);
            const isSelected = key === selectedKey;
            return (
              <React.Fragment key={`stick-${index}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className="ms-stick-hit"
                  onClick={() => handleSelect(stick)}
                />
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className={`ms-stick-line${isSelected ? ' is-selected' : ''}`}
                  stroke={isSelected ? '#7c3aed' : 'url(#matchGradient)'}
                />
                {stick.map((point, pointIndex) => {
                  const [cx, cy] = toXY(point);
                  return <circle key={`dot-${index}-${pointIndex}`} cx={cx} cy={cy} r="5.2" className="ms-stick-dot" />;
                })}
              </React.Fragment>
            );
          })}
        </svg>
      </div>

      <div className="ms-actions">
        <button type="button" className="ms-action-btn" onClick={resetGame}>Reset</button>
      </div>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById('matchstick-shapes-root'));
root.render(<MatchstickShapes />);
