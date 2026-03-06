// Sound Generator for the puzzle game
class SoundGenerator {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Resume audio context after user interaction
    async resume() {
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }

    async generateSuccessSound() {
        await this.resume();
        const now = this.audioContext.currentTime;

        // --- 1. Sparkle chimes (magical feeling)
        const sparkleFreqs = [600, 750, 900, 1020];
        sparkleFreqs.forEach((freq, index) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.type = 'triangle'; // Soft sparkle
            osc.frequency.setValueAtTime(freq, now + index * 0.08);
            
            gain.gain.setValueAtTime(0.1, now + index * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.08 + 0.2);
            
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            
            osc.start(now + index * 0.08);
            osc.stop(now + index * 0.08 + 0.3);
        });

        // --- 2. Main friendly "Wow" tone
        const mainOsc = this.audioContext.createOscillator();
        const mainGain = this.audioContext.createGain();
        const vibratoOsc = this.audioContext.createOscillator();
        const vibratoGain = this.audioContext.createGain();

        // Connect nodes
        mainOsc.connect(mainGain);
        mainGain.connect(this.audioContext.destination);

        vibratoOsc.connect(vibratoGain);
        vibratoGain.connect(mainOsc.frequency);

        // Use sine for soft "wow"
        mainOsc.type = 'sine';
        mainOsc.frequency.setValueAtTime(350, now + 0.3);
        mainOsc.frequency.exponentialRampToValueAtTime(650, now + 1.2); // Not too sharp

        mainGain.gain.setValueAtTime(0.25, now + 0.3);
        mainGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

        // Vibrato: subtle wobble
        vibratoOsc.type = 'sine';
        vibratoOsc.frequency.setValueAtTime(5, now);
        vibratoGain.gain.setValueAtTime(8, now); // Gentle variation (not 25 like before)

        // Start
        mainOsc.start(now + 0.3);
        mainOsc.stop(now + 1.3);
        vibratoOsc.start(now + 0.3);
        vibratoOsc.stop(now + 1.3);
    }





    async generateSuccessSound_1() {
        await this.resume();  // Ensure audio context is resumed (user interaction required)

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        // Connect nodes
        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        // Use triangle wave for a cartoon-like tone (playful)
        osc.type = 'triangle';

        // Glide from lower pitch to higher pitch
        const now = this.audioContext.currentTime;
        osc.frequency.setValueAtTime(300, now);              // Start at 300 Hz
        osc.frequency.exponentialRampToValueAtTime(1000, now + 1.0); // End at 1000 Hz over 1s

        // Volume envelope: soft fade-out
        gain.gain.setValueAtTime(0.25, now);                 // Start louder
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);  // Fade to near zero over 1s

        osc.start(now);
        osc.stop(now + 1.0);
    }


    // Generate a success sound (wow excellent effect)
    async generateSuccessSound_backup() {
        await this.resume();
        // First chord (major chord)
        const freqs1 = [523.25, 659.25, 783.99];
        freqs1.forEach(freq => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            
            gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
            
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.5);
        });

        // Rising "wow" effect
        setTimeout(() => {
            const sweep = this.audioContext.createOscillator();
            const sweepGain = this.audioContext.createGain();
            
            sweep.connect(sweepGain);
            sweepGain.connect(this.audioContext.destination);
            
            sweep.type = 'sine';
            sweep.frequency.setValueAtTime(400, this.audioContext.currentTime);
            sweep.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3);
            
            sweepGain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            sweepGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            sweep.start();
            sweep.stop(this.audioContext.currentTime + 0.3);
        }, 200);
    }

    // Generate an error sound (gentle "try again" effect)
    async generateErrorSound() {
        await this.resume();
        // First beep
        const osc1 = this.audioContext.createOscillator();
        const gain1 = this.audioContext.createGain();
        
        osc1.connect(gain1);
        gain1.connect(this.audioContext.destination);
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(400, this.audioContext.currentTime);
        
        gain1.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        osc1.start();
        osc1.stop(this.audioContext.currentTime + 0.2);

        // Second lower beep after a short delay
        setTimeout(() => {
            const osc2 = this.audioContext.createOscillator();
            const gain2 = this.audioContext.createGain();
            
            osc2.connect(gain2);
            gain2.connect(this.audioContext.destination);
            
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(300, this.audioContext.currentTime);
            
            gain2.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            osc2.start();
            osc2.stop(this.audioContext.currentTime + 0.2);
        }, 250);
    }

    // Generate a click sound (soft pop)
    async generateClickSound() {
        await this.resume();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }
}
