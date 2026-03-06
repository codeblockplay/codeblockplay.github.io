const SoundEffects = {
    soundGenerator: null,
    isInitialized: false,

    init() {
        if (this.isInitialized) return;
        
        // Initialize the sound generator
        try {
            this.soundGenerator = new SoundGenerator();
            this.isInitialized = true;
            console.log('Sound system initialized successfully');
        } catch (err) {
            console.warn('Could not initialize sound system:', err);
        }
    },

    ensureInitialized() {
        if (!this.isInitialized) {
            this.init();
        }
    },

    async playSuccessSound() {
        this.ensureInitialized();
        if (this.soundGenerator) {
            try {
                await this.soundGenerator.generateSuccessSound();
            } catch (err) {
                console.warn('Could not play success sound:', err);
            }
        }
    },

    async playErrorSound() {
        this.ensureInitialized();
        if (this.soundGenerator) {
            try {
                await this.soundGenerator.generateErrorSound();
            } catch (err) {
                console.warn('Could not play error sound:', err);
            }
        }
    },

    async playClickSound() {
        this.ensureInitialized();
        if (this.soundGenerator) {
            try {
                await this.soundGenerator.generateClickSound();
            } catch (err) {
                console.warn('Could not play click sound:', err);
            }
        }
    }
};

// Export to global scope if needed
window.SoundEffects = SoundEffects;
