// Feedback system for both sound and visual effects
const FeedbackSystem = {
    // Store DOM elements for feedback
    elements: {
        feedbackContainer: null
    },

    init() {
        // Create feedback container if it doesn't exist
        if (!this.elements.feedbackContainer) {
            const container = document.createElement('div');
            container.id = 'feedback-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
            `;
            document.body.appendChild(container);
            this.elements.feedbackContainer = container;
        }

        // Initialize sound effects when user interacts with the page
        const initSoundOnInteraction = () => {
            SoundEffects.init();
            document.removeEventListener('click', initSoundOnInteraction);
            document.removeEventListener('keydown', initSoundOnInteraction);
        };

        document.addEventListener('click', initSoundOnInteraction);
        document.addEventListener('keydown', initSoundOnInteraction);
    },

    showSuccess(message = 'Great job! 🌟') {
        console.log('Attempting to show success:', message);
        this.showToast(message, 'success');
        if (window.SoundEffects) {
            window.SoundEffects.playSuccessSound();
        } else {
            console.warn('SoundEffects not initialized when trying to play success sound');
        }
    },

    showError(message = 'Try again! 💪') {
        console.log('Attempting to show error:', message);
        this.showToast(message, 'error');
        if (window.SoundEffects) {
            window.SoundEffects.playErrorSound();
        } else {
            console.warn('SoundEffects not initialized when trying to play error sound');
        }
    },

    showClick() {
        if (window.SoundEffects) {
            window.SoundEffects.playClickSound();
        } else {
            console.warn('SoundEffects not initialized when trying to play click sound');
        }
    },

    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `feedback-toast ${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            padding: 12px 24px;
            margin: 8px;
            border-radius: 8px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            animation: slide-in 0.5s ease-out;
        `;

        // Set background color based on type
        if (type === 'success') {
            toast.style.backgroundColor = '#4CAF50';
        } else if (type === 'error') {
            toast.style.backgroundColor = '#ff7043';
        }

        this.elements.feedbackContainer.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
        });

        // Remove toast after animation
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2000);
    }
};

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
@keyframes slide-in {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }
    50% {
        transform: translateX(-10%);
        opacity: 0.8;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.feedback-toast {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
}

.feedback-toast.success {
    background-color: rgba(76, 175, 80, 0.95) !important;
}

.feedback-toast.error {
    background-color: rgba(255, 112, 67, 0.95) !important;
}
`;
document.head.appendChild(style);

// Initialize feedback system when document loads
document.addEventListener('DOMContentLoaded', () => {
    FeedbackSystem.init();
});
