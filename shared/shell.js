(() => {
    const ensureFavicon = () => {
        const existing = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
        if (existing) {
            return;
        }

        const shellScript = document.currentScript || Array.from(document.scripts).find((script) => (
            script.src.includes('/shared/shell.js') || script.src.endsWith('shared/shell.js')
        ));

        const href = shellScript?.src
            ? new URL('./favicon.svg', shellScript.src).href
            : '../shared/favicon.svg';

        const icon = document.createElement('link');
        icon.rel = 'icon';
        icon.type = 'image/svg+xml';
        icon.href = href;
        document.head.appendChild(icon);
    };

    ensureFavicon();

    const links = [
        { key: 'home', label: 'Home', href: '../index.html', icon: 'fa-home' },
        { key: 'block-coding', label: 'Block Coding', href: '../code-blocks/block-coding.html', icon: 'fa-puzzle-piece' },
        { key: 'brainy-puzzles', label: 'Brainy Hub', href: '../brainy-blocks/index.html', icon: 'fa-brain' },
        { key: 'riddles', label: 'Fun Riddles', href: '../puzzle1/multi_riddle.html', icon: 'fa-question-circle' },
        { key: 'word-hunt', label: 'Word Hunt', href: '../word-hunt/wordhunt.html', icon: 'fa-search' },
        { key: 'math-sequence', label: 'Math Sequence', href: '../puzzle3/puzzle3.html', icon: 'fa-calculator' },
        { key: 'coloring', label: 'Color Splash', href: '../image-coloring/index.html', icon: 'fa-palette' }
    ];

    const body = document.body;
    body.classList.add('kp-shell-enabled');

    const pageKey = body.dataset.page || '';
    const ageBand = body.dataset.age || 'Level Mode';

    const header = document.createElement('div');
    header.className = 'kp-shell-header';

    const brand = `
        <a class="kp-brand" href="../index.html" aria-label="Go to Code Blocks Playground home">
            <img src="../shared/logo.svg" alt="Code Blocks logo" loading="lazy">
            <span class="kp-brand-text">
                <span class="kp-brand-title">Code Blocks Playground</span>
                <span class="kp-brand-sub">Code While Playing</span>
            </span>
        </a>
    `;

    const menuLinks = links.map((item) => {
        const active = item.key === pageKey;
        return `
            <a class="kp-menu-link" href="${item.href}" data-active="${active}">
                <span><i class="fas ${item.icon}"></i> ${item.label}</span>
                <span><i class="fas fa-angle-right"></i></span>
            </a>
        `;
    }).join('');

    header.innerHTML = `
        ${brand}
        <div class="kp-header-actions">
            <span class="kp-pill"><i class="fas fa-layer-group"></i> ${ageBand}</span>
            <button class="kp-menu-btn" type="button" aria-label="Open game menu" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    `;

    const overlay = document.createElement('div');
    overlay.className = 'kp-menu-overlay';

    const drawer = document.createElement('aside');
    drawer.className = 'kp-menu-drawer';
    drawer.setAttribute('aria-label', 'Kids game menu');
    drawer.innerHTML = `
        <p class="kp-menu-title">Jump To A Game</p>
        <nav class="kp-menu-links">${menuLinks}</nav>
    `;

    const footer = document.createElement('div');
    footer.className = 'kp-shell-footer';
    footer.innerHTML = `
        <strong>Code Blocks Playground</strong> • Code While Playing
        <div class="kp-shell-footer-links">
            <a href="../index.html">Home</a>
            <a href="../code-blocks/block-coding.html">Block Coding</a>
            <a href="../brainy-blocks/index.html">Brainy Hub</a>
        </div>
    `;

    body.prepend(header);
    body.appendChild(overlay);
    body.appendChild(drawer);
    body.appendChild(footer);

    const menuButton = header.querySelector('.kp-menu-btn');

    const closeMenu = () => {
        body.classList.remove('kp-menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        body.classList.add('kp-menu-open');
        menuButton.setAttribute('aria-expanded', 'true');
    };

    menuButton.addEventListener('click', () => {
        if (body.classList.contains('kp-menu-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    document.querySelectorAll('a[href]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const href = anchor.getAttribute('href');
            if (!href || href.startsWith('#') || anchor.target === '_blank') {
                return;
            }

            let targetUrl;
            try {
                targetUrl = new URL(anchor.href, window.location.href);
            } catch {
                return;
            }

            const sameOrigin = targetUrl.origin === window.location.origin;
            if (!sameOrigin) {
                return;
            }

            const isCurrent = targetUrl.pathname === window.location.pathname;
            if (isCurrent) {
                return;
            }

            event.preventDefault();
            closeMenu();
            body.classList.add('kp-page-leaving');
            window.setTimeout(() => {
                window.location.assign(targetUrl.href);
            }, 130);
        });
    });
})();
