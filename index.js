document.addEventListener('DOMContentLoaded', () => {
    const chips = Array.from(document.querySelectorAll('.age-chip'));
    const cards = Array.from(document.querySelectorAll('.game-card'));
    const visibleCount = document.getElementById('visible-count');

    const colorChoices = Array.from(document.querySelectorAll('.color-choice'));
    const targetName = document.getElementById('target-name');
    const targetSwatch = document.getElementById('target-swatch');
    const colorResult = document.getElementById('color-result');
    const colorCelebrationLayer = document.getElementById('color-celebration-layer');
    const targetCard = document.querySelector('.target-card');

    let activeColor = null;

    function playClickSound() {
        if (window.SoundEffects && typeof window.SoundEffects.playClickSound === 'function') {
            return window.SoundEffects.playClickSound();
        }
        return Promise.resolve();
    }

    function playSuccessSound() {
        if (window.SoundEffects && typeof window.SoundEffects.playSuccessSound === 'function') {
            return window.SoundEffects.playSuccessSound();
        }
        return Promise.resolve();
    }

    function triggerColorCelebration() {
        if (!colorCelebrationLayer) {
            return;
        }

        colorCelebrationLayer.innerHTML = '';
        const flowerEmojis = ['🌸', '🌼', '🌺', '🌷', '🌻'];
        const pieces = 24;

        for (let i = 0; i < pieces; i += 1) {
            const piece = document.createElement('span');
            piece.className = 'color-flower';
            piece.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.fontSize = `${16 + Math.random() * 16}px`;
            piece.style.animationDuration = `${1400 + Math.random() * 1000}ms`;
            piece.style.animationDelay = `${Math.random() * 220}ms`;
            piece.style.setProperty('--flower-drift', `${-30 + Math.random() * 60}px`);
            piece.style.setProperty('--flower-spin', `${-180 + Math.random() * 360}deg`);
            piece.style.setProperty('--flower-scale', `${0.78 + Math.random() * 0.55}`);
            colorCelebrationLayer.appendChild(piece);
        }

        if (targetCard) {
            targetCard.classList.remove('celebrate');
            void targetCard.offsetWidth;
            targetCard.classList.add('celebrate');
        }

        window.setTimeout(() => {
            colorCelebrationLayer.innerHTML = '';
            targetCard?.classList.remove('celebrate');
        }, 1650);
    }

    function updateCount() {
        const count = cards.filter((card) => !card.classList.contains('hidden')).length;
        if (visibleCount) {
            visibleCount.textContent = `${count} game${count === 1 ? '' : 's'} available`;
        }
    }

    function applyFilter(age) {
        cards.forEach((card) => {
            if (age === 'all') {
                card.classList.remove('hidden');
                return;
            }

            const ages = (card.dataset.age || '').split(/\s+/).filter(Boolean);
            const shouldShow = ages.includes(age);
            card.classList.toggle('hidden', !shouldShow);
        });

        chips.forEach((chip) => {
            const selected = chip.dataset.age === age;
            chip.classList.toggle('active', selected);
            chip.setAttribute('aria-selected', selected ? 'true' : 'false');
        });

        updateCount();
    }

    function pickTargetColor() {
        if (!colorChoices.length || !targetName || !targetSwatch || !colorResult) {
            return;
        }

        colorChoices.forEach((choice) => {
            choice.classList.remove('correct', 'wrong');
        });

        const targetChoice = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        activeColor = {
            name: targetChoice.dataset.color || '',
            hex: targetChoice.dataset.hex || '#45c6ff'
        };

        targetName.textContent = activeColor.name;
        targetSwatch.style.backgroundColor = activeColor.hex;
        colorResult.textContent = 'Pick the matching color to start.';
        colorResult.classList.remove('good', 'warn');
    }

    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            const age = chip.dataset.age || 'all';
            applyFilter(age);
            playClickSound();
        });
    });

    // Play click sound for navigation cards/links on home and delay route very slightly
    // so the sound is audible before page transition.
    const navigationLinks = Array.from(document.querySelectorAll(
        '.game-card, .hero-btn, .track-start-btn, .track-links a, .home-header-links a, .kp-shell-footer-links a'
    ));

    navigationLinks.forEach((link) => {
        link.addEventListener('click', async (event) => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || link.target === '_blank') {
                playClickSound();
                return;
            }

            event.preventDefault();
            await playClickSound();
            window.setTimeout(() => {
                window.location.assign(link.href);
            }, 35);
        });
    });

    colorChoices.forEach((choice) => {
        choice.style.background = `linear-gradient(135deg, ${choice.dataset.hex} 0%, #ffffff 100%)`;

        choice.addEventListener('click', () => {
            playClickSound();
            if (!activeColor) {
                return;
            }

            const selectedName = choice.dataset.color || '';
            const isCorrect = selectedName === activeColor.name;

            choice.classList.remove('correct', 'wrong');
            void choice.offsetWidth;
            choice.classList.add(isCorrect ? 'correct' : 'wrong');

            if (isCorrect) {
                colorResult.textContent = `Great match. ${activeColor.name} is correct.`;
                colorResult.classList.remove('warn');
                colorResult.classList.add('good');
                triggerColorCelebration();
                playSuccessSound();
                window.setTimeout(pickTargetColor, 800);
            } else {
                colorResult.textContent = `Nice try. Target is ${activeColor.name}. Try again.`;
                colorResult.classList.remove('good');
                colorResult.classList.add('warn');
            }
        });
    });

    applyFilter('all');
    pickTargetColor();
});
