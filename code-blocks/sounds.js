// Sound management for Block Coding
function playSound(soundType) {
    const soundMap = {
        'click': '../sounds/click.mp3',
        'success': '../sounds/success.mp3',
        'error': '../sounds/error.mp3'
    };
    
    try {
        const soundFile = soundMap[soundType];
        if (!soundFile) return;
        
        const audio = new Audio(soundFile);
        audio.volume = 0.5; // Reduce volume to be less disruptive
        
        // Just return if play fails - don't block UI interaction
        audio.play().catch(error => {
            console.warn('Audio play failed, continuing anyway:', error);
        });
    } catch (error) {
        console.warn('Error in sound system, continuing anyway:', error);
    }
}

// Export the function
window.playSound = playSound;
