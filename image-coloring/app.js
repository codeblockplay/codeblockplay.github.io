document.addEventListener('DOMContentLoaded', () => {
    const OUTLINE_STROKE = '#6f86b4';
    const OUTLINE_FILL = '#ffffff';

    function polarPoint(cx, cy, radius, angleDeg) {
        const radians = (Math.PI / 180) * angleDeg;
        return {
            x: cx + (Math.cos(radians) * radius),
            y: cy + (Math.sin(radians) * radius)
        };
    }

    function pointsToString(points) {
        return points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' ');
    }

    function regularPolygonPoints(cx, cy, radius, sides, rotationDeg = -90) {
        const points = [];
        for (let i = 0; i < sides; i += 1) {
            const angle = rotationDeg + ((360 / sides) * i);
            points.push(polarPoint(cx, cy, radius, angle));
        }
        return pointsToString(points);
    }

    function starPolygonPoints(cx, cy, outerRadius, innerRadius, spikes = 8, rotationDeg = -90) {
        const points = [];
        const step = 360 / (spikes * 2);
        for (let i = 0; i < spikes * 2; i += 1) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            points.push(polarPoint(cx, cy, radius, rotationDeg + (i * step)));
        }
        return pointsToString(points);
    }

    function ringArcPath(cx, cy, outerRadius, innerRadius, startDeg, endDeg) {
        const startOuter = polarPoint(cx, cy, outerRadius, startDeg);
        const endOuter = polarPoint(cx, cy, outerRadius, endDeg);
        const endInner = polarPoint(cx, cy, innerRadius, endDeg);
        const startInner = polarPoint(cx, cy, innerRadius, startDeg);
        const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;

        return `M ${startOuter.x.toFixed(2)} ${startOuter.y.toFixed(2)} \
A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${endOuter.x.toFixed(2)} ${endOuter.y.toFixed(2)} \
L ${endInner.x.toFixed(2)} ${endInner.y.toFixed(2)} \
A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${startInner.x.toFixed(2)} ${startInner.y.toFixed(2)} Z`;
    }

    function heartPath(cx, cy, size) {
        return `M ${cx} ${(cy + size * 0.88).toFixed(2)} \
C ${(cx - size).toFixed(2)} ${(cy + size * 0.3).toFixed(2)}, ${(cx - size * 1.04).toFixed(2)} ${(cy - size * 0.25).toFixed(2)}, ${cx.toFixed(2)} ${(cy - size * 0.34).toFixed(2)} \
C ${(cx + size * 1.04).toFixed(2)} ${(cy - size * 0.25).toFixed(2)}, ${(cx + size).toFixed(2)} ${(cy + size * 0.3).toFixed(2)}, ${cx.toFixed(2)} ${(cy + size * 0.88).toFixed(2)} Z`;
    }

    function wrapScene(ariaLabel, content, bg = '#fbfdff', extraAttrs = '') {
        return `<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${ariaLabel}" data-scene-kind="free-color"${extraAttrs ? ` ${extraAttrs}` : ''}>
            <rect x="0" y="0" width="800" height="520" fill="${bg}"/>
            ${content}
        </svg>`;
    }

    function buildMandalaScene() {
        const cx = 400;
        const cy = 260;

        let spikes = '';
        for (let i = 0; i < 32; i += 1) {
            const angle = -90 + ((360 / 32) * i);
            const p1 = polarPoint(cx, cy, 228, angle - 4);
            const p2 = polarPoint(cx, cy, 300, angle);
            const p3 = polarPoint(cx, cy, 228, angle + 4);
            spikes += `<polygon class="paint-zone" points="${pointsToString([p1, p2, p3])}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>`;
        }

        let petals = '';
        for (let i = 0; i < 12; i += 1) {
            const angle = i * 30;
            petals += `<ellipse class="paint-zone" cx="${cx}" cy="${cy - 104}" rx="24" ry="68" transform="rotate(${angle} ${cx} ${cy})" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>`;
        }

        let dots = '';
        for (let i = 0; i < 16; i += 1) {
            const point = polarPoint(cx, cy, 160, i * 22.5);
            dots += `<circle class="paint-zone" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="11" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>`;
        }

        return wrapScene(
            'Mandala coloring page',
            `
            <circle class="paint-zone" cx="${cx}" cy="${cy}" r="248" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <circle class="paint-zone" cx="${cx}" cy="${cy}" r="212" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <circle class="paint-zone" cx="${cx}" cy="${cy}" r="176" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            ${spikes}
            ${petals}
            ${dots}
            <circle class="paint-zone" cx="${cx}" cy="${cy}" r="60" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <circle class="paint-zone" cx="${cx}" cy="${cy}" r="24" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            `,
            '#fbfcff'
        );
    }

    function buildGridCastleScene() {
        let grid = '';
        for (let x = 30; x <= 770; x += 34) {
            grid += `<line x1="${x}" y1="26" x2="${x}" y2="494" stroke="#c9cdd8" stroke-width="1.5"/>`;
        }
        for (let y = 26; y <= 494; y += 34) {
            grid += `<line x1="30" y1="${y}" x2="770" y2="${y}" stroke="#c9cdd8" stroke-width="1.5"/>`;
        }

        return wrapScene(
            'Castle on grid coloring page',
            `
            ${grid}
            <rect class="paint-zone" x="70" y="220" width="660" height="160" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <rect class="paint-zone" x="90" y="150" width="110" height="80" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <polygon class="paint-zone" points="80,150 145,82 210,150" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <rect class="paint-zone" x="245" y="196" width="82" height="126" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <polygon class="paint-zone" points="233,196 286,136 339,196" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <rect class="paint-zone" x="355" y="128" width="90" height="252" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <polygon class="paint-zone" points="340,128 400,62 460,128" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <rect class="paint-zone" x="490" y="166" width="102" height="214" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <polygon class="paint-zone" points="476,166 542,98 608,166" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <rect class="paint-zone" x="614" y="150" width="110" height="80" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <polygon class="paint-zone" points="604,150 669,82 734,150" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <path class="paint-zone" d="M236 380 C240 300, 328 300, 332 380 Z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <path class="paint-zone" d="M510 380 C516 278, 566 278, 572 380 Z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <path class="paint-zone" d="M118 380 C122 308, 170 308, 174 380 Z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="M624 380 C628 308, 676 308, 680 380 Z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <circle class="paint-zone" cx="401" cy="174" r="16" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <rect class="paint-zone" x="316" y="336" width="68" height="44" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="M426 380 A48 48 0 0 1 522 380 Z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <polygon class="paint-zone" points="145,80 145,44 186,56" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <polygon class="paint-zone" points="400,60 400,28 444,42" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <polygon class="paint-zone" points="669,80 669,44 708,56" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            `,
            '#ffffff'
        );
    }

    function buildHexFlamingoScene() {
        let hexCells = '';
        const radius = 18;
        const stepX = radius * 1.72;
        const stepY = radius * 1.5;

        for (let row = 0; row < 12; row += 1) {
            for (let col = 0; col < 14; col += 1) {
                const cx = 150 + (col * stepX) + ((row % 2) * (stepX / 2));
                const cy = 72 + (row * stepY);
                if (cx > 74 && cx < 726 && cy > 56 && cy < 470) {
                    hexCells += `<polygon class="paint-zone" points="${regularPolygonPoints(cx, cy, radius, 6, 30)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="2"/>`;
                }
            }
        }

        return wrapScene(
            'Hex mosaic flamingo page',
            `
            ${hexCells}
            <ellipse class="paint-zone" cx="434" cy="306" rx="92" ry="58" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <path class="paint-zone" d="M460 250 C452 186, 408 162, 350 186 C372 226, 400 248, 428 270 Z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <circle class="paint-zone" cx="350" cy="186" r="26" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="5"/>
            <circle class="paint-zone" cx="344" cy="182" r="4" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <path class="paint-zone" d="M324 188 L286 198 L322 210 Z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <rect class="paint-zone" x="422" y="354" width="18" height="92" rx="8" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <rect class="paint-zone" x="462" y="350" width="18" height="98" rx="8" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="M404 448 h62 v18 h-62 z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="M450 448 h66 v18 h-66 z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            `,
            '#f7fcff'
        );
    }

    function buildHeartsFlowersScene() {
        const hearts = [
            { x: 190, y: 320, size: 58 },
            { x: 632, y: 208, size: 44 },
            { x: 502, y: 370, size: 34 },
            { x: 308, y: 412, size: 30 }
        ];

        const leaves = [
            { x: 322, y: 170, rx: 44, ry: 24, rot: -14 },
            { x: 506, y: 154, rx: 34, ry: 18, rot: 22 },
            { x: 576, y: 292, rx: 46, ry: 24, rot: -34 },
            { x: 330, y: 376, rx: 50, ry: 25, rot: 10 }
        ];

        const flowers = [
            { x: 250, y: 148, petals: 10, outer: 28, inner: 15 },
            { x: 438, y: 218, petals: 12, outer: 32, inner: 17 },
            { x: 622, y: 334, petals: 10, outer: 28, inner: 15 },
            { x: 538, y: 402, petals: 8, outer: 22, inner: 12 },
            { x: 196, y: 404, petals: 8, outer: 22, inner: 12 }
        ];

        let heartShapes = '';
        hearts.forEach((item) => {
            heartShapes += `<path class="paint-zone" d="${heartPath(item.x, item.y, item.size)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>`;
        });

        let leafShapes = '';
        leaves.forEach((item) => {
            leafShapes += `<ellipse class="paint-zone" cx="${item.x}" cy="${item.y}" rx="${item.rx}" ry="${item.ry}" transform="rotate(${item.rot} ${item.x} ${item.y})" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>`;
        });

        let flowerShapes = '';
        flowers.forEach((flower) => {
            flowerShapes += `<polygon class="paint-zone" points="${starPolygonPoints(flower.x, flower.y, flower.outer, flower.inner, flower.petals)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>`;
            flowerShapes += `<circle class="paint-zone" cx="${flower.x}" cy="${flower.y}" r="8" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>`;
        });

        return wrapScene(
            'Hearts and floral doodle page',
            `
            <circle class="paint-zone" cx="400" cy="260" r="218" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            ${heartShapes}
            ${leafShapes}
            ${flowerShapes}
            <path class="paint-zone" d="M122 254 C170 192, 228 192, 272 254 C228 286, 170 286, 122 254 Z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="M526 250 C578 188, 642 188, 690 250 C642 286, 578 286, 526 250 Z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="M256 258 C278 232, 312 232, 334 258 C312 278, 278 278, 256 258 Z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="M458 258 C480 232, 514 232, 536 258 C514 278, 480 278, 458 258 Z" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <circle class="paint-zone" cx="220" cy="260" r="10" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <circle class="paint-zone" cx="584" cy="260" r="10" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <circle class="paint-zone" cx="410" cy="420" r="10" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            `,
            '#fffcff'
        );
    }

    function buildPetalMotifScene() {
        const motifs = [
            { x: 240, y: 152, scale: 1 },
            { x: 560, y: 152, scale: 1 },
            { x: 240, y: 356, scale: 1.08 },
            { x: 560, y: 356, scale: 1.08 }
        ];

        let motifShapes = '';
        motifs.forEach((motif) => {
            const outerRx = 58 * motif.scale;
            const outerRy = 28 * motif.scale;
            const innerRx = 36 * motif.scale;
            const innerRy = 17 * motif.scale;
            [0, 45, 90, 135].forEach((angle) => {
                motifShapes += `<ellipse class="paint-zone" cx="${motif.x}" cy="${motif.y}" rx="${outerRx}" ry="${outerRy}" transform="rotate(${angle} ${motif.x} ${motif.y})" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>`;
                motifShapes += `<ellipse class="paint-zone" cx="${motif.x}" cy="${motif.y}" rx="${innerRx}" ry="${innerRy}" transform="rotate(${angle} ${motif.x} ${motif.y})" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>`;
            });
            motifShapes += `<polygon class="paint-zone" points="${starPolygonPoints(motif.x, motif.y, 20 * motif.scale, 10 * motif.scale, 4, -45)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>`;
            motifShapes += `<circle class="paint-zone" cx="${motif.x}" cy="${motif.y}" r="${8 * motif.scale}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>`;
        });

        return wrapScene(
            'Petal pattern page',
            `
            <rect class="paint-zone" x="84" y="50" width="632" height="420" rx="22" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <line x1="400" y1="64" x2="400" y2="456" stroke="${OUTLINE_STROKE}" stroke-width="3" stroke-dasharray="8 10"/>
            <line x1="98" y1="256" x2="702" y2="256" stroke="${OUTLINE_STROKE}" stroke-width="3" stroke-dasharray="8 10"/>
            ${motifShapes}
            `,
            '#ffffff'
        );
    }

    function hexRingSegments(cx, cy, outerRadius, innerRadius) {
        let segmentMarkup = '';
        for (let i = 0; i < 6; i += 1) {
            const a0 = 30 + (i * 60);
            const a1 = 30 + ((i + 1) * 60);
            const p1 = polarPoint(cx, cy, outerRadius, a0);
            const p2 = polarPoint(cx, cy, outerRadius, a1);
            const p3 = polarPoint(cx, cy, innerRadius, a1);
            const p4 = polarPoint(cx, cy, innerRadius, a0);
            segmentMarkup += `<polygon class="paint-zone" points="${pointsToString([p1, p2, p3, p4])}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>`;
        }
        return segmentMarkup;
    }

    function buildHexRingScene() {
        return wrapScene(
            'Hex ring puzzle page',
            `
            <rect class="paint-zone" x="144" y="48" width="512" height="424" rx="24" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            ${hexRingSegments(400, 176, 108, 72)}
            ${hexRingSegments(400, 176, 66, 36)}
            <polygon class="paint-zone" points="${regularPolygonPoints(400, 176, 30, 6, 30)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            ${hexRingSegments(400, 340, 108, 72)}
            ${hexRingSegments(400, 340, 66, 36)}
            <polygon class="paint-zone" points="${regularPolygonPoints(400, 340, 30, 6, 30)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            `,
            '#fcfcff'
        );
    }

    function tileBlock(x, y, size) {
        const half = size / 2;
        const q = size / 4;
        return `
            <rect class="paint-zone" x="${x}" y="${y}" width="${size}" height="${size}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <polygon class="paint-zone" points="${starPolygonPoints(x + half, y + half, size * 0.19, size * 0.1, 4, -45)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <rect class="paint-zone" x="${x + q}" y="${y + q}" width="${half}" height="${half}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <polygon class="paint-zone" points="${x},${y} ${x + q},${y} ${x + q},${y + q}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <polygon class="paint-zone" points="${x + size},${y} ${x + size - q},${y} ${x + size - q},${y + q}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <polygon class="paint-zone" points="${x},${y + size} ${x + q},${y + size} ${x + q},${y + size - q}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <polygon class="paint-zone" points="${x + size},${y + size} ${x + size - q},${y + size} ${x + size - q},${y + size - q}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
        `;
    }

    function buildStarTileScene() {
        return wrapScene(
            'Star and square tile coloring page',
            `
            ${tileBlock(150, 72, 170)}
            ${tileBlock(480, 72, 170)}
            ${tileBlock(150, 280, 170)}
            ${tileBlock(480, 280, 170)}
            `,
            '#ffffff'
        );
    }

    function circleTile(x, y, size) {
        const cx = x + (size / 2);
        const cy = y + (size / 2);
        const r = size * 0.46;
        return `
            <rect class="paint-zone" x="${x}" y="${y}" width="${size}" height="${size}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <circle class="paint-zone" cx="${cx}" cy="${cy}" r="${r}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <polygon class="paint-zone" points="${starPolygonPoints(cx, cy, size * 0.2, size * 0.11, 4, 0)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <ellipse class="paint-zone" cx="${cx - size * 0.2}" cy="${cy}" rx="${size * 0.22}" ry="${size * 0.12}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <ellipse class="paint-zone" cx="${cx + size * 0.2}" cy="${cy}" rx="${size * 0.22}" ry="${size * 0.12}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <ellipse class="paint-zone" cx="${cx}" cy="${cy - size * 0.2}" rx="${size * 0.12}" ry="${size * 0.22}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <ellipse class="paint-zone" cx="${cx}" cy="${cy + size * 0.2}" rx="${size * 0.12}" ry="${size * 0.22}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
        `;
    }

    function buildCircleTileScene() {
        return wrapScene(
            'Circle tile pattern page',
            `
            ${circleTile(180, 74, 200)}
            ${circleTile(420, 74, 200)}
            ${circleTile(180, 254, 200)}
            ${circleTile(420, 254, 200)}
            `,
            '#fffefe'
        );
    }

    function drawPixelBoard(x, y, cell, rows, cols) {
        let cells = '';
        for (let row = 0; row < rows; row += 1) {
            for (let col = 0; col < cols; col += 1) {
                const px = x + (col * cell);
                const py = y + (row * cell);
                cells += `<rect class="paint-zone" x="${px}" y="${py}" width="${cell}" height="${cell}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="1.8"/>`;
            }
        }
        return `<rect x="${x}" y="${y}" width="${cols * cell}" height="${rows * cell}" fill="#ffffff" stroke="${OUTLINE_STROKE}" stroke-width="4"/>${cells}`;
    }

    function buildPixelMosaicScene() {
        return wrapScene(
            'Pixel grid mosaic page',
            `
            ${drawPixelBoard(68, 64, 16, 10, 10)}
            ${drawPixelBoard(262, 64, 16, 10, 10)}
            ${drawPixelBoard(456, 64, 16, 10, 10)}
            ${drawPixelBoard(650, 64, 16, 10, 10)}
            ${drawPixelBoard(68, 250, 16, 10, 10)}
            ${drawPixelBoard(262, 250, 16, 10, 10)}
            ${drawPixelBoard(456, 250, 16, 10, 10)}
            ${drawPixelBoard(650, 250, 16, 10, 10)}
            `,
            '#ffffff'
        );
    }

    function buildRainbowKiteScene() {
        return wrapScene(
            'Rainbow and kite coloring page',
            `
            <polygon class="paint-zone" points="180,92 398,132 330,330 128,280" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="${ringArcPath(128, 280, 270, 224, -12, 72)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <path class="paint-zone" d="${ringArcPath(128, 280, 222, 178, -12, 72)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <path class="paint-zone" d="${ringArcPath(128, 280, 176, 136, -12, 72)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <path class="paint-zone" d="${ringArcPath(128, 280, 134, 96, -12, 72)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <path class="paint-zone" d="${ringArcPath(128, 280, 94, 58, -12, 72)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <path class="paint-zone" d="${ringArcPath(402, 486, 242, 208, 200, 340)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="${ringArcPath(402, 486, 206, 176, 200, 340)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="${ringArcPath(402, 486, 174, 148, 200, 340)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="${ringArcPath(402, 486, 146, 122, 200, 340)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="${ringArcPath(402, 486, 120, 98, 200, 340)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="${ringArcPath(402, 486, 96, 76, 200, 340)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <path class="paint-zone" d="${ringArcPath(402, 486, 74, 54, 200, 340)}" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="4"/>
            <circle class="paint-zone" cx="204" cy="418" r="18" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <circle class="paint-zone" cx="254" cy="418" r="18" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <circle class="paint-zone" cx="304" cy="418" r="18" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <circle class="paint-zone" cx="354" cy="418" r="18" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <circle class="paint-zone" cx="454" cy="418" r="18" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <circle class="paint-zone" cx="504" cy="418" r="18" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            <circle class="paint-zone" cx="554" cy="418" r="18" fill="${OUTLINE_FILL}" stroke="${OUTLINE_STROKE}" stroke-width="3"/>
            `,
            '#fbfdff'
        );
    }

    function wrapPortraitScene(ariaLabel, content, bg = '#f4f4f4') {
        return `<svg viewBox="0 0 620 800" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${ariaLabel}" data-scene-kind="symmetry">
            <rect x="0" y="0" width="620" height="800" fill="${bg}"/>
            ${content}
        </svg>`;
    }

    const SYMMETRY_COLOR_MAP = {
        R: '#f23c2f',
        Y: '#ffea35',
        B: '#1d84d9',
        G: '#17bc62',
        O: '#ff924c',
        P: '#f15bb5',
        V: '#9b5de5',
        C: '#00bbf9'
    };

    function cellsFromHalfRows(rows) {
        const cells = [];
        rows.forEach((row, r) => {
            for (let c = 0; c < 8; c += 1) {
                const key = (row[c] || '.').toUpperCase();
                const color = SYMMETRY_COLOR_MAP[key];
                if (!color) {
                    continue;
                }
                cells.push({ c, r, color });
            }
        });
        return cells;
    }

    function buildSymmetryScene(config) {
        const cols = 16;
        const rows = config.rows.length;
        const cell = 28;
        const gridX = Math.round((620 - (cols * cell)) / 2);
        const gridY = 132;
        const axisX = gridX + ((cols / 2) * cell);
        const leftCells = cellsFromHalfRows(config.rows);

        const toCellX = (col) => gridX + (col * cell);
        const toCellY = (row) => gridY + (row * cell);

        let leftMarkup = '';
        let rightMarkup = '';
        const mirroredKeys = new Set();

        leftCells.forEach((entry) => {
            leftMarkup += `<rect x="${toCellX(entry.c)}" y="${toCellY(entry.r)}" width="${cell}" height="${cell}" fill="${entry.color}" stroke="#2c2c2c" stroke-width="1.1"/>`;

            const mirroredCol = (cols - 1) - entry.c;
            const key = `${mirroredCol}-${entry.r}`;
            if (mirroredKeys.has(key)) {
                return;
            }
            mirroredKeys.add(key);
            rightMarkup += `<rect class="paint-zone" data-required-color="${entry.color}" x="${toCellX(mirroredCol)}" y="${toCellY(entry.r)}" width="${cell}" height="${cell}" fill="#ffffff" stroke="#2c2c2c" stroke-width="1.1"/>`;
        });

        let gridLines = '';
        for (let c = 0; c <= cols; c += 1) {
            const x = gridX + (c * cell);
            gridLines += `<line x1="${x}" y1="${gridY}" x2="${x}" y2="${gridY + (rows * cell)}" stroke="#b3b3b3" stroke-width="1"/>`;
        }
        for (let r = 0; r <= rows; r += 1) {
            const y = gridY + (r * cell);
            gridLines += `<line x1="${gridX}" y1="${y}" x2="${gridX + (cols * cell)}" y2="${y}" stroke="#b3b3b3" stroke-width="1"/>`;
        }

        return wrapPortraitScene(
            `${config.title} symmetry puzzle`,
            `
            <text x="310" y="54" text-anchor="middle" fill="#161616" font-size="42" font-weight="700" font-family="Baloo 2, Fredoka, sans-serif">Symmetrical Shapes</text>
            <text x="310" y="88" text-anchor="middle" fill="#303030" font-size="22" font-weight="600" font-family="Baloo 2, Fredoka, sans-serif">${config.title}</text>
            <rect x="${gridX - 10}" y="${gridY - 10}" width="${(cols * cell) + 20}" height="${(rows * cell) + 20}" fill="#ffffff" stroke="#191919" stroke-width="4"/>
            ${leftMarkup}
            ${rightMarkup}
            <line x1="${axisX}" y1="${gridY}" x2="${axisX}" y2="${gridY + (rows * cell)}" stroke="#2b2b2b" stroke-width="3.2" stroke-dasharray="8 6"/>
            <g pointer-events="none">
                ${gridLines}
            </g>
            `,
            '#f3f3f3'
        );
    }

    const SYMMETRY_PATTERNS = [
        {
            title: 'Rocket Mirror',
            rows: [
                '........', '...B....', '..BG....', '..RRR...', '...YY...', '...YY...', '...YY...', '....R...',
                '..RBB...', '..RBB...', '..RBB...', '..RBB...', '..RBB...', '..RRR...', '...G....', '...G....',
                '...G....', '...G....', '...G....', '..RR....', '........', '........'
            ]
        },
        {
            title: 'Castle Mirror',
            rows: [
                '........', '..B.....', '..BR....', '.RYYR...', '.RYYR...', '.RRRR...', '..G.G...', '.GGGG...',
                '.G..G...', '.GOOG...', '.G..G...', '.GGGG...', '.RRRR...', '.R..R...', '.R..R...', '.R..R...',
                '.RRRR...', '...Y....', '..YYY...', '...Y....', '........', '........'
            ]
        },
        {
            title: 'Flower Mirror',
            rows: [
                '........', '...P....', '..PPP...', '.PPPPP..', '..PYP...', '...Y....', '..GYG...', '.GYYYG..',
                '..GYG...', '...Y....', '..C.C...', '.CCCCC..', '..C.C...', '...R....', '..RRR...', '..R.R...',
                '..R.R...', '..R.R...', '..RRR...', '........', '........', '........'
            ]
        },
        {
            title: 'Robot Mirror',
            rows: [
                '..BBB...', '..B.B...', '..BBB...', '...Y....', '..RRR...', '..R.R...', '..RRR...', '.G...G..',
                '.G...G..', '.GGGGG..', '.GCCC...', '.GCCC...', '.GCCC...', '.GGGGG..', '..P.P...', '..P.P...',
                '..P.P...', '..PPP...', '...O....', '..OOO...', '........', '........'
            ]
        },
        {
            title: 'Butterfly Mirror',
            rows: [
                '........', '..P.P...', '.PPPPP..', '.PYYYP..', '.PPPPP..', '..P.P...', '...R....', '..RRR...',
                '.RRRRR..', '..RRR...', '...R....', '..B.B...', '.BBBBB..', '.BCCC...', '.BBBBB..', '..B.B...',
                '...G....', '..GGG...', '...G....', '..OOO...', '...O....', '........'
            ]
        },
        {
            title: 'Mosaic Mirror',
            rows: [
                '.RBYG...', '.YGBP...', '.GBPR...', '.BPRY...', '.PRYG...', '.RYGB...', '.YGBP...', '.GBPR...',
                '.BPRY...', '.PRYG...', '.RYGB...', '.YGBP...', '.GBPR...', '.BPRY...', '.PRYG...', '.RYGB...',
                '.YGBP...', '.GBPR...', '.BPRY...', '.PRYG...', '.RYGB...', '........'
            ]
        }
    ];

    let SCENES = [];

    const CATEGORY_GROUPS = [
        { key: 'rainbow-rangers', label: 'Rainbow Rangers' },
        { key: 'mirror-magic', label: 'Mirror Magic' }
    ];

    function sceneDef(markup, category, label) {
        return { markup, category, label };
    }

    function decorateImportedSvgMarkup(svgMarkup, sceneKind, ariaLabel) {
        const withoutPreamble = svgMarkup
            .replace(/<\?xml[\s\S]*?\?>/i, '')
            .replace(/<!DOCTYPE[\s\S]*?>/i, '')
            .trim();

        const svgStart = withoutPreamble.search(/<svg\b/i);
        if (svgStart < 0) {
            return '';
        }
        const svgOnly = withoutPreamble.slice(svgStart);

        return svgOnly.replace(/<svg\b([^>]*)>/i, (_match, attrs) => {
            const cleanAttrs = attrs
                .replace(/\sdata-scene-kind\s*=\s*["'][^"']*["']/gi, '')
                .replace(/\srole\s*=\s*["'][^"']*["']/gi, '')
                .replace(/\saria-label\s*=\s*["'][^"']*["']/gi, '');
            return `<svg${cleanAttrs} data-scene-kind="${sceneKind}" role="img" aria-label="${ariaLabel}">`;
        });
    }

    async function loadExternalSvgScene(path, ariaLabel) {
        try {
            const response = await fetch(path, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`Scene fetch failed with ${response.status}`);
            }

            const rawMarkup = await response.text();
            return decorateImportedSvgMarkup(rawMarkup, 'free-color', ariaLabel);
        } catch (error) {
            console.warn(`Unable to load scene from ${path}`, error);
            return '';
        }
    }

    const IMPORTED_COLORING_SCENES = [
        { file: 'deer.svg', label: 'Deer Coloring', category: 'rainbow-rangers' },
        { file: '1.svg', label: 'Rainbow Rangers 1', category: 'rainbow-rangers' },
        { file: '2.svg', label: 'Rainbow Rangers 2', category: 'rainbow-rangers' },
        { file: '3.svg', label: 'Rainbow Rangers 3', category: 'rainbow-rangers' }
    ];

    async function initializeScenes() {
        const sceneDeck = [];
        for (const scene of IMPORTED_COLORING_SCENES) {
            const importedScene = await loadExternalSvgScene(`./eps/${scene.file}`, scene.label);
            if (importedScene) {
                sceneDeck.push(sceneDef(importedScene, scene.category, scene.label));
            }
        }

        sceneDeck.push(...SYMMETRY_PATTERNS.map((pattern) => sceneDef(
            buildSymmetryScene(pattern),
            'mirror-magic',
            pattern.title
        )));
        SCENES = sceneDeck;
    }

    const PALETTE = [
        '#f23c2f', '#ffea35', '#1d84d9', '#17bc62', '#ff924c', '#f15bb5', '#9b5de5', '#00bbf9',
        '#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#06d6a0', '#ffd166', '#f28482',
        '#84a59d', '#577590', '#b5179e', '#00f5d4', '#4263eb', '#52b788', '#000000', '#ffffff'
    ];

    const SHAPES = [
        { key: 'circle', icon: 'fa-circle', label: 'Circle' },
        { key: 'square', icon: 'fa-square', label: 'Square' },
        { key: 'triangle', icon: 'fa-play', label: 'Triangle' },
        { key: 'star', icon: 'fa-star', label: 'Star' },
        { key: 'diamond', icon: 'fa-gem', label: 'Diamond' },
        { key: 'heart', icon: 'fa-heart', label: 'Heart' }
    ];

    const MODE_CONFIG = {
        easy: {
            label: 'Age 5-6',
            targetCount: 4,
            shapeGoalKinds: 2,
            maxHints: 4,
            pointsPerTarget: 7,
            pointsPerGoal: 8,
            bonus: 18,
            hintPenalty: 2
        },
        medium: {
            label: 'Age 7-8',
            targetCount: 6,
            shapeGoalKinds: 3,
            maxHints: 3,
            pointsPerTarget: 10,
            pointsPerGoal: 12,
            bonus: 28,
            hintPenalty: 3
        },
        hard: {
            label: 'Age 9-10',
            targetCount: 8,
            shapeGoalKinds: 4,
            maxHints: 2,
            pointsPerTarget: 14,
            pointsPerGoal: 16,
            bonus: 40,
            hintPenalty: 5
        }
    };

    const sceneCounter = document.getElementById('scene-counter');
    const categoryStrip = document.getElementById('category-strip');
    const scoreValue = document.getElementById('score-value');
    const levelValue = document.getElementById('level-value');
    const streakValue = document.getElementById('streak-value');
    const hintsValue = document.getElementById('hints-value');

    const missionText = document.getElementById('mission-text');
    const resultMessage = document.getElementById('result-message');
    const missionList = document.getElementById('mission-list');

    const artStage = document.getElementById('art-stage');
    const sceneContainer = document.getElementById('scene-container');
    const stickerLayer = document.getElementById('sticker-layer');

    const colorPalette = document.getElementById('color-palette');
    const shapePicker = document.getElementById('shape-picker');
    const stampSizeInput = document.getElementById('stamp-size');
    const stampSizeValue = document.getElementById('stamp-size-value');

    const hintButton = document.getElementById('hint-btn');
    const prevButton = document.getElementById('prev-btn');
    const clearButton = document.getElementById('clear-btn');
    const undoButton = document.getElementById('undo-btn');
    const nextButton = document.getElementById('next-btn');
    const modeButtons = Array.from(document.querySelectorAll('.mode-btn'));

    const game = {
        mode: 'medium',
        activeCategory: CATEGORY_GROUPS[0].key,
        sceneIndex: 0,
        score: 0,
        streak: 0,
        level: 1,
        selectedColor: PALETTE[0],
        selectedShape: SHAPES[0].key,
        stampSize: Number(stampSizeInput?.value || 48),
        sceneState: null,
        usedTargetSignatures: {
            easy: new Set(),
            medium: new Set(),
            hard: new Set()
        }
    };

    function profile() {
        return MODE_CONFIG[game.mode];
    }

    function playSound(type) {
        if (!window.SoundEffects) {
            return;
        }

        if (type === 'success' && typeof window.SoundEffects.playSuccessSound === 'function') {
            window.SoundEffects.playSuccessSound();
            return;
        }

        if (type === 'error' && typeof window.SoundEffects.playErrorSound === 'function') {
            window.SoundEffects.playErrorSound();
            return;
        }

        if (typeof window.SoundEffects.playClickSound === 'function') {
            window.SoundEffects.playClickSound();
        }
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffleArray(input) {
        const arr = [...input];
        for (let i = arr.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function colorLabel(hex) {
        const map = {
            '#ff595e': 'Cherry', '#ff924c': 'Orange Pop', '#ffca3a': 'Sun Yellow', '#8ac926': 'Leaf Green',
            '#52b788': 'Mint', '#1a759f': 'Ocean', '#1982c4': 'Sky Blue', '#4263eb': 'Royal Blue',
            '#6a4c93': 'Purple', '#b5179e': 'Magenta', '#f15bb5': 'Candy Pink', '#ff6b6b': 'Coral',
            '#ffd166': 'Gold', '#06d6a0': 'Aqua Green', '#00bbf9': 'Cyan', '#00f5d4': 'Neon Mint',
            '#9b5de5': 'Berry Violet', '#f28482': 'Rose', '#84a59d': 'Sage', '#f6bd60': 'Mango',
            '#f23c2f': 'Bright Red', '#ffea35': 'Lemon Yellow', '#1d84d9': 'Deep Sky Blue', '#17bc62': 'Grass Green',
            '#f7ede2': 'Cream', '#90be6d': 'Pistachio', '#577590': 'Steel Blue', '#000000': 'Black', '#ffffff': 'White'
        };
        return map[hex.toLowerCase()] || hex;
    }

    function shapeLabel(key) {
        const shape = SHAPES.find((item) => item.key === key);
        return shape ? shape.label : key;
    }

    function normalizeHexColor(value) {
        if (!value) {
            return '';
        }

        const raw = value.trim().toLowerCase();
        if (!raw || raw === 'none' || raw === 'transparent' || !raw.startsWith('#')) {
            return '';
        }

        if (raw.length === 4) {
            return `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`;
        }

        if (raw.length === 7) {
            return raw;
        }

        return '';
    }

    function getStyleFill(styleValue) {
        if (!styleValue) {
            return '';
        }
        const match = styleValue.match(/fill\s*:\s*([^;]+)/i);
        return match ? match[1].trim() : '';
    }

    function getElementFillHex(element) {
        const attrFill = normalizeHexColor(element.getAttribute('fill') || '');
        if (attrFill) {
            return attrFill;
        }
        return normalizeHexColor(getStyleFill(element.getAttribute('style') || ''));
    }

    function setElementFill(element, color) {
        element.setAttribute('fill', color);
        const styleValue = element.getAttribute('style');
        if (!styleValue) {
            return;
        }
        if (/fill\s*:/i.test(styleValue)) {
            element.setAttribute('style', styleValue.replace(/fill\s*:\s*[^;]+/i, `fill:${color}`));
        }
    }

    function isDarkFillColor(color) {
        const hex = normalizeHexColor(color);
        if (!hex) {
            return false;
        }

        const red = Number.parseInt(hex.slice(1, 3), 16);
        const green = Number.parseInt(hex.slice(3, 5), 16);
        const blue = Number.parseInt(hex.slice(5, 7), 16);
        const brightness = ((red * 299) + (green * 587) + (blue * 114)) / 1000;
        return brightness < 52;
    }

    function prepareFreeColorScene(svg) {
        if (svg.querySelector('.paint-zone')) {
            return;
        }

        const candidateShapes = Array.from(svg.querySelectorAll('path, circle, rect, polygon, ellipse'));
        candidateShapes.forEach((shape) => {
            const fill = getElementFillHex(shape);
            if (!fill || isDarkFillColor(fill)) {
                return;
            }

            shape.classList.add('paint-zone');
            setElementFill(shape, '#ffffff');
        });
    }

    function getSceneFillables(svg) {
        const markedFillables = Array.from(svg.querySelectorAll('.paint-zone'));
        if (markedFillables.length > 0) {
            return markedFillables;
        }
        return Array.from(svg.querySelectorAll('path, circle, rect, polygon, ellipse'));
    }

    function paintElement(element, color) {
        setElementFill(element, color);
    }

    function flashCellValidation(element, type) {
        if (!element) {
            return;
        }

        const className = type === 'good' ? 'cell-valid' : 'cell-invalid';
        element.classList.remove('cell-valid', 'cell-invalid');
        element.classList.add(className);

        window.setTimeout(() => {
            element.classList.remove(className);
        }, 520);
    }

    function currentSceneState() {
        return game.sceneState;
    }

    function categoryLabel(categoryKey) {
        return CATEGORY_GROUPS.find((group) => group.key === categoryKey)?.label || categoryKey;
    }

    function visibleScenes() {
        return SCENES.filter((scene) => scene.category === game.activeCategory);
    }

    function renderCategoryStrip() {
        if (!categoryStrip) {
            return;
        }

        categoryStrip.innerHTML = '';

        CATEGORY_GROUPS.forEach((group) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `category-chip${group.key === game.activeCategory ? ' active' : ''}`;
            button.textContent = group.label;
            button.setAttribute('aria-label', group.label);

            button.addEventListener('click', () => {
                if (group.key === game.activeCategory) {
                    return;
                }

                game.activeCategory = group.key;
                game.sceneIndex = 0;
                renderCategoryStrip();
                setupScene();
                playSound('click');
            });

            categoryStrip.appendChild(button);
        });
    }

    function setMissionText(text, state = '') {
        if (!missionText) {
            return;
        }
        missionText.textContent = text;
        missionText.classList.remove('good', 'warn');
        if (state === 'good') missionText.classList.add('good');
        if (state === 'warn') missionText.classList.add('warn');
    }

    function setResult(text, type = '') {
        if (!resultMessage) {
            return;
        }
        resultMessage.textContent = text;
        resultMessage.className = 'result-message';
        if (type === 'success') resultMessage.classList.add('success');
        if (type === 'error') resultMessage.classList.add('error');
    }

    function updateHud() {
        const scenes = visibleScenes();
        const totalScenes = scenes.length;
        if (sceneCounter) {
            const pageLabel = totalScenes > 0 ? `${game.sceneIndex + 1}/${totalScenes}` : '0/0';
            sceneCounter.textContent = `Page ${pageLabel}`;
        }
        if (scoreValue) scoreValue.textContent = String(game.score);
        if (levelValue) levelValue.textContent = String(game.level);
        if (streakValue) streakValue.textContent = String(game.streak);

        const state = currentSceneState();
        const hintsLeft = state ? Math.max(0, profile().maxHints - state.hintsUsed) : profile().maxHints;
        if (hintsValue) hintsValue.textContent = String(hintsLeft);

        if (undoButton) {
            undoButton.disabled = !state || state.stickers.length === 0;
        }

        if (prevButton) {
            prevButton.disabled = totalScenes <= 1;
        }
        if (nextButton) {
            nextButton.disabled = totalScenes <= 1;
        }
        if (clearButton) {
            clearButton.disabled = totalScenes === 0;
        }
    }

    function renderPalette() {
        if (!colorPalette) {
            return;
        }

        colorPalette.innerHTML = '';
        PALETTE.forEach((color) => {
            const swatch = document.createElement('button');
            const colorName = colorLabel(color);
            swatch.type = 'button';
            swatch.className = `color-swatch${color === game.selectedColor ? ' selected' : ''}`;
            swatch.style.backgroundColor = color;
            swatch.setAttribute('aria-label', colorName);
            swatch.setAttribute('title', colorName);
            swatch.dataset.colorName = colorName;

            swatch.addEventListener('click', () => {
                game.selectedColor = color;
                renderPalette();
                playSound('click');
            });

            colorPalette.appendChild(swatch);
        });
    }

    function renderShapePicker() {
        if (!shapePicker) {
            return;
        }

        shapePicker.innerHTML = '';

        SHAPES.forEach((shape) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `shape-btn${shape.key === game.selectedShape ? ' active' : ''}`;
            btn.innerHTML = `<i class="fas ${shape.icon}"></i>`;
            btn.title = shape.label;
            btn.setAttribute('aria-label', shape.label);

            btn.addEventListener('click', () => {
                game.selectedShape = shape.key;
                renderShapePicker();
                playSound('click');
            });

            shapePicker.appendChild(btn);
        });
    }

    function setStickerToolsEnabled(enabled) {
        if (!shapePicker) {
            return;
        }

        shapePicker.classList.toggle('disabled', !enabled);
        Array.from(shapePicker.querySelectorAll('button')).forEach((button) => {
            button.disabled = !enabled;
        });

        if (stampSizeInput) {
            stampSizeInput.disabled = !enabled;
            stampSizeInput.classList.toggle('disabled', !enabled);
        }
    }

    function buildSceneTargets(fillables) {
        const presetTargets = fillables
            .map((shape, index) => ({
                index,
                color: (shape.dataset.requiredColor || '').toLowerCase()
            }))
            .filter((target) => target.color && target.color !== '#ffffff')
            .map((target) => ({
                type: 'color',
                index: target.index,
                color: target.color,
                done: false,
                locked: false,
                preset: true
            }));

        if (presetTargets.length > 0) {
            return presetTargets;
        }

        const p = profile();
        const used = game.usedTargetSignatures[game.mode];

        for (let attempt = 0; attempt < 200; attempt += 1) {
            const indices = shuffleArray(fillables.map((_, idx) => idx)).slice(0, Math.min(p.targetCount, fillables.length));
            const colors = shuffleArray(PALETTE.filter((color) => color !== '#ffffff')).slice(0, indices.length);

            const targets = indices.map((index, i) => ({
                type: 'color',
                index,
                color: colors[i],
                done: false,
                locked: false,
                preset: false
            }));

            const signature = `${game.sceneIndex}|${targets.map((t) => `${t.index}-${t.color}`).join('|')}`;
            if (used.has(signature)) {
                continue;
            }

            used.add(signature);
            return targets;
        }

        return [];
    }

    function buildShapeGoals(disabled = false) {
        if (disabled) {
            return [];
        }

        const p = profile();
        const kinds = Math.min(p.shapeGoalKinds, SHAPES.length);
        const picked = shuffleArray(SHAPES.map((shape) => shape.key)).slice(0, kinds);

        return picked.map((shape, idx) => ({
            type: 'shape',
            shape,
            needed: randomInt(1, idx === 0 ? 2 : 3),
            placed: 0,
            done: false,
            locked: false
        }));
    }

    function renderMissionList() {
        const state = currentSceneState();
        if (!missionList || !state) {
            return;
        }

        missionList.innerHTML = '';

        if (state.guidedTargets) {
            const grouped = new Map();
            state.targets.forEach((target) => {
                const key = target.color.toLowerCase();
                if (!grouped.has(key)) {
                    grouped.set(key, { total: 0, done: 0 });
                }
                const item = grouped.get(key);
                item.total += 1;
                if (target.done) {
                    item.done += 1;
                }
            });

            Array.from(grouped.entries())
                .sort((a, b) => b[1].total - a[1].total)
                .forEach(([color, progress]) => {
                    const row = document.createElement('div');
                    row.className = `mission-item${progress.done === progress.total ? ' done' : ''}`;

                    const swatch = document.createElement('span');
                    swatch.className = 'mission-swatch';
                    swatch.style.backgroundColor = color;

                    const text = document.createElement('span');
                    text.textContent = `Mirror ${colorLabel(color)} cells (${progress.done}/${progress.total})`;

                    row.appendChild(swatch);
                    row.appendChild(text);
                    missionList.appendChild(row);
                });
            return;
        }

        state.targets.forEach((target, i) => {
            const item = document.createElement('div');
            item.className = `mission-item${target.done ? ' done' : ''}`;

            const swatch = document.createElement('span');
            swatch.className = 'mission-swatch';
            swatch.style.backgroundColor = target.color;

            const text = document.createElement('span');
            text.textContent = `Color target ${i + 1} with ${colorLabel(target.color)}`;

            item.appendChild(swatch);
            item.appendChild(text);
            missionList.appendChild(item);
        });

        state.shapeGoals.forEach((goal) => {
            const item = document.createElement('div');
            item.className = `mission-item${goal.done ? ' done' : ''}`;

            const icon = document.createElement('span');
            icon.className = 'mission-shape';
            const shapeIcon = SHAPES.find((s) => s.key === goal.shape)?.icon || 'fa-shapes';
            icon.innerHTML = `<i class="fas ${shapeIcon}"></i>`;

            const text = document.createElement('span');
            text.textContent = `Place ${goal.needed} ${shapeLabel(goal.shape)} sticker${goal.needed === 1 ? '' : 's'} (${goal.placed}/${goal.needed})`;

            item.appendChild(icon);
            item.appendChild(text);
            missionList.appendChild(item);
        });
    }

    function allTargetsDone() {
        const state = currentSceneState();
        return !!state && state.targets.every((target) => target.done);
    }

    function allShapeGoalsDone() {
        const state = currentSceneState();
        return !!state && state.shapeGoals.every((goal) => goal.done);
    }

    function maybeCompleteScene() {
        const state = currentSceneState();
        if (!state || state.completed) {
            return;
        }

        if (state.freeColorMode) {
            return;
        }

        if (state.targets.length === 0 && state.shapeGoals.length === 0) {
            return;
        }

        if (!allTargetsDone() || !allShapeGoalsDone()) {
            return;
        }

        state.completed = true;
        game.streak += 1;

        const bonus = Math.max(0, profile().bonus - (state.hintsUsed * profile().hintPenalty));
        game.score += bonus;
        game.level += 1;

        if (state.guidedTargets) {
            setMissionText(`Mirror complete. Bonus +${bonus}. Next page loading...`, 'good');
            setResult('Perfect symmetry. You mirrored the pattern correctly.', 'success');
        } else {
            setMissionText(`Page complete. Bonus +${bonus}. Next pattern page loading...`, 'good');
            setResult('Amazing work. You completed all color + shape goals.', 'success');
        }
        updateHud();
        renderMissionList();

        playSound('success');
        artStage.classList.add('mission-win');

        window.setTimeout(() => {
            artStage.classList.remove('mission-win');
            const totalVisibleScenes = visibleScenes().length;
            if (totalVisibleScenes > 0) {
                game.sceneIndex = (game.sceneIndex + 1) % totalVisibleScenes;
            }
            setupScene();
        }, 1200);
    }

    function updateShapeGoalProgress() {
        const state = currentSceneState();
        if (!state) {
            return;
        }

        state.shapeGoals.forEach((goal) => {
            const placed = state.stickerCounts[goal.shape] || 0;
            goal.placed = placed;

            const reached = placed >= goal.needed;
            if (reached && !goal.locked) {
                goal.locked = true;
                game.score += profile().pointsPerGoal;
            }

            goal.done = goal.locked || reached;
        });
    }

    function recalcStickerCountsFromLayer() {
        const state = currentSceneState();
        if (!state) {
            return;
        }

        state.stickerCounts = {};
        state.stickers.forEach((sticker) => {
            state.stickerCounts[sticker.shape] = (state.stickerCounts[sticker.shape] || 0) + 1;
        });
        updateShapeGoalProgress();
        renderMissionList();
        updateHud();
    }

    function createStickerElement(sticker) {
        const element = document.createElement('div');
        element.className = `sticker shape-${sticker.shape}`;
        element.style.left = `${sticker.x}px`;
        element.style.top = `${sticker.y}px`;
        element.style.width = `${sticker.size}px`;
        element.style.height = `${sticker.size}px`;
        element.style.backgroundColor = sticker.color;
        return element;
    }

    function placeSticker(clientX, clientY) {
        const state = currentSceneState();
        if (!state || state.completed || !state.allowStickers) {
            return;
        }

        const rect = artStage.getBoundingClientRect();
        const x = clientX - rect.left - 10;
        const y = clientY - rect.top - 10;

        if (x < 0 || y < 0 || x > rect.width - 20 || y > rect.height - 20) {
            return;
        }

        const sticker = {
            shape: game.selectedShape,
            color: game.selectedColor,
            size: game.stampSize,
            x,
            y
        };

        state.stickers.push(sticker);
        const node = createStickerElement(sticker);
        stickerLayer.appendChild(node);

        if (state.stickers.length > 90) {
            state.stickers.shift();
            if (stickerLayer.firstChild) {
                stickerLayer.removeChild(stickerLayer.firstChild);
            }
        }

        recalcStickerCountsFromLayer();
        setResult(`Sticker placed: ${shapeLabel(sticker.shape)} in ${colorLabel(sticker.color)}.`, '');
        playSound('click');
        maybeCompleteScene();
    }

    function handleFill(event) {
        const state = currentSceneState();
        if (!state || state.completed) {
            return;
        }

        const element = event.currentTarget;
        event.stopPropagation();

        paintElement(element, game.selectedColor);

        const index = Number(element.dataset.fillIndex);
        const target = state.targets.find((entry) => entry.index === index);

        if (!target) {
            setResult('Nice color splash.', '');
            playSound('click');
            return;
        }

        if (state.guidedTargets && target.locked) {
            // Keep already-correct mirrored cell locked.
            playSound('click');
            return;
        }

        const selectedColor = game.selectedColor.toLowerCase();
        const isMatch = target.color === selectedColor;

        if (state.guidedTargets) {
            if (isMatch) {
                target.done = true;
                target.locked = true;
                element.classList.add('target-done');
                flashCellValidation(element, 'good');
                game.score += profile().pointsPerTarget;
                playSound('success');
            } else {
                target.done = false;
                paintElement(element, '#ffffff');
                element.classList.remove('target-done');
                flashCellValidation(element, 'bad');
                game.score = Math.max(0, game.score - 1);
                playSound('error');
            }
        } else if (isMatch) {
            target.done = true;
            element.classList.add('target-done');
            if (!target.locked) {
                game.score += profile().pointsPerTarget;
                target.locked = true;
            }

            setResult(`Great. Target matched with ${colorLabel(target.color)}.`, 'success');
            setMissionText('Great color match. Keep going to finish all goals.', 'good');
            playSound('success');
        } else {
            target.done = false;
            element.classList.remove('target-done');
            game.score = Math.max(0, game.score - 1);
            setResult(`Try ${colorLabel(target.color)} for this target.`, 'error');
            setMissionText(`Wrong color on target. Use ${colorLabel(target.color)}.`, 'warn');
            playSound('error');
        }

        updateHud();
        renderMissionList();
        maybeCompleteScene();
    }

    function wireFillableShapes(svg) {
        const sceneKind = (svg.dataset.sceneKind || '').toLowerCase();
        const freeColorMode = sceneKind === 'free-color';
        if (freeColorMode) {
            prepareFreeColorScene(svg);
        }

        const fillables = getSceneFillables(svg);
        fillables.forEach((shape, index) => {
            shape.dataset.fillIndex = String(index);
            shape.classList.add('fillable-shape');
            shape.addEventListener('click', handleFill);
        });

        const targets = freeColorMode ? [] : buildSceneTargets(fillables);
        const guidedTargets = !freeColorMode && targets.some((target) => target.preset);
        const allowStickers = !freeColorMode && !guidedTargets && !!shapePicker && !!stampSizeInput;

        game.sceneState = {
            fillables,
            targets,
            shapeGoals: allowStickers ? buildShapeGoals(false) : [],
            stickers: [],
            stickerCounts: {},
            hintsUsed: 0,
            completed: false,
            guidedTargets,
            freeColorMode,
            allowStickers
        };

        recalcStickerCountsFromLayer();
        updateHud();
        renderMissionList();

        if (guidedTargets) {
            setStickerToolsEnabled(false);
            setMissionText('Mirror mission: copy the left pattern on the right half using matching colors.', '');
            setResult('Start with the right side cells. Hints can reveal exact colors.', '');
        } else if (freeColorMode) {
            setStickerToolsEnabled(false);
            setMissionText('Free-color page: tap any white deer area to paint.', '');
            setResult('Pick any color and start coloring.', '');
        } else if (allowStickers) {
            setStickerToolsEnabled(true);
            setMissionText('Mission: finish all color targets and all sticker goals.', '');
            setResult('Pick a color and start tapping page shapes.', '');
        } else {
            setStickerToolsEnabled(false);
            setMissionText('Fill all target cells with the matching colors.', '');
            setResult('Pick a color and tap a target cell.', '');
        }
    }

    function setupScene() {
        const scenes = visibleScenes();
        stickerLayer.innerHTML = '';

        if (scenes.length === 0) {
            game.sceneState = null;
            sceneContainer.innerHTML = `<div class="scene-empty dark">${categoryLabel(game.activeCategory)} is waiting for your SVG pages.</div>`;
            setStickerToolsEnabled(false);
            setMissionText('Category ready. Add SVG pages to start coloring here.', '');
            setResult('Upload SVGs for this category and I will wire them in.', '');
            updateHud();
            return;
        }

        if (game.sceneIndex >= scenes.length) {
            game.sceneIndex = 0;
        }

        sceneContainer.innerHTML = scenes[game.sceneIndex].markup;

        const svg = sceneContainer.querySelector('svg');
        if (!svg) {
            game.sceneState = null;
            return;
        }

        wireFillableShapes(svg);
        updateHud();
    }

    function useHint() {
        const state = currentSceneState();
        if (!state) {
            return;
        }

        if (state.freeColorMode) {
            setResult('This page is free coloring. Hints are not needed here.', '');
            playSound('click');
            return;
        }

        if (state.completed) {
            setMissionText('Page already complete. Next page coming.', 'good');
            return;
        }

        if (state.hintsUsed >= profile().maxHints) {
            setMissionText('No hints left on this page.', 'warn');
            playSound('error');
            return;
        }

        state.hintsUsed += 1;
        game.score = Math.max(0, game.score - profile().hintPenalty);

        const pendingTarget = state.targets.find((target) => !target.done);
        const pendingShapeGoal = state.shapeGoals.find((goal) => !goal.done);

        if (pendingTarget && (!pendingShapeGoal || Math.random() > 0.4)) {
            const element = sceneContainer.querySelector(`[data-fill-index="${pendingTarget.index}"]`);
            if (element) {
                element.classList.add('hint-target');
                window.setTimeout(() => {
                    element.classList.remove('hint-target');
                }, 1400);
            }

            setMissionText(`Hint: highlighted shape wants ${colorLabel(pendingTarget.color)}.`, '');
            setResult(`Hint used. Target color: ${colorLabel(pendingTarget.color)}.`, '');
        } else if (pendingShapeGoal) {
            const remaining = Math.max(0, pendingShapeGoal.needed - pendingShapeGoal.placed);
            setMissionText(`Hint: place ${remaining} more ${shapeLabel(pendingShapeGoal.shape)} sticker${remaining === 1 ? '' : 's'}.`, '');
            setResult(`Hint used. Try ${shapeLabel(pendingShapeGoal.shape)} stickers.`, '');
        }

        updateHud();
        playSound('click');
    }

    function clearScene() {
        setupScene();
        playSound('click');
    }

    function undoSticker() {
        const state = currentSceneState();
        if (!state || state.stickers.length === 0 || state.completed) {
            return;
        }

        state.stickers.pop();
        if (stickerLayer.lastChild) {
            stickerLayer.removeChild(stickerLayer.lastChild);
        }

        recalcStickerCountsFromLayer();
        setResult('Last sticker removed.', '');
        playSound('click');
    }

    function changeScene(offset) {
        const totalVisibleScenes = visibleScenes().length;
        if (totalVisibleScenes <= 1) {
            return;
        }
        game.sceneIndex = (game.sceneIndex + offset + totalVisibleScenes) % totalVisibleScenes;
        setupScene();
        playSound('click');
    }

    function updateModeButtons() {
        modeButtons.forEach((button) => {
            const active = button.dataset.mode === game.mode;
            button.classList.toggle('active', active);
            button.setAttribute('aria-selected', active ? 'true' : 'false');
        });
    }

    function switchMode(mode) {
        if (!MODE_CONFIG[mode]) {
            return;
        }

        game.mode = mode;
        game.score = 0;
        game.level = 1;
        game.streak = 0;
        game.sceneIndex = 0;

        updateModeButtons();
        renderCategoryStrip();
        setupScene();
    }

    if (stampSizeInput) {
        stampSizeInput.addEventListener('input', () => {
            game.stampSize = Number(stampSizeInput.value);
            if (stampSizeValue) {
                stampSizeValue.textContent = String(game.stampSize);
            }
        });
    }

    if (artStage) {
        artStage.addEventListener('click', (event) => {
            if (event.target.closest('.fillable-shape')) {
                return;
            }
            placeSticker(event.clientX, event.clientY);
        });
    }

    if (hintButton) hintButton.addEventListener('click', useHint);
    if (clearButton) clearButton.addEventListener('click', clearScene);
    if (undoButton) undoButton.addEventListener('click', undoSticker);
    if (prevButton) prevButton.addEventListener('click', () => changeScene(-1));
    if (nextButton) nextButton.addEventListener('click', () => changeScene(1));

    modeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            if (!mode || mode === game.mode) {
                return;
            }
            playSound('click');
            switchMode(mode);
        });
    });

    async function bootstrap() {
        renderPalette();
        renderShapePicker();
        await initializeScenes();
        renderCategoryStrip();
        switchMode('medium');
    }

    bootstrap();
});
