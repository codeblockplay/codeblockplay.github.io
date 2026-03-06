// Enhanced modal fix with debugging - this will ensure that challenge images are clickable
document.addEventListener('DOMContentLoaded', function() {
    console.log('[ModalFix] Script loaded');
    
    // Get important modal elements
    const challengeImage = document.getElementById('challenge-image');
    const modalImage = document.getElementById('modal-challenge-image');
    const imageModal = document.getElementById('imageModal');
    const imageModalLabel = document.getElementById('imageModalLabel');
    const modalLoading = document.getElementById('modal-loading');
    const modalError = document.getElementById('modal-error');
    
    // Check if elements exist and log results
    if (!challengeImage) console.log('[ModalFix] WARNING: Challenge image element not found!');
    if (!modalImage) console.log('[ModalFix] WARNING: Modal image element not found!');
    if (!imageModal) console.log('[ModalFix] WARNING: Modal element not found!');
    
    // Fix Temperature Advisor and Space Mission image loading
    fixProblemImages();
    
    // Set up general modal image handling
    setupModalImageHandling();
    
    // Function to fix specifically known problematic images
    function fixProblemImages() {
        // Create a list of problematic image patterns and their fixes
        const imageFixMap = {
            'temperature-advisor': {
                checkUrl: './images/temperature-advisor.svg',
                fixUrl: './images/temperature-advisor.svg'
            },
            'space-mission': {
                checkUrl: './images/space-mission.svg',
                fixUrl: './images/space-mission.svg'
            }
        };
        
        console.log('[ModalFix] Checking for problematic images...');
        
        // Get all level buttons
        const levelButtons = document.querySelectorAll('.levels-list button');
        
        // Add special handling for these levels
        levelButtons.forEach(button => {
            const levelText = button.textContent.toLowerCase();
            
            // Check if this button contains any of our problem image keywords
            Object.keys(imageFixMap).forEach(keyword => {
                if (levelText.includes(keyword)) {
                    console.log(`[ModalFix] Found potentially problematic level: ${button.textContent}`);
                    
                    // Add special click handler
                    button.addEventListener('click', function() {
                        setTimeout(() => {
                            if (challengeImage) {
                                console.log(`[ModalFix] Pre-loading image for ${keyword}`);
                                const img = new Image();
                                img.onload = function() {
                                    console.log(`[ModalFix] Successfully pre-loaded ${keyword} image`);
                                    challengeImage.src = img.src;
                                    if (modalImage) modalImage.src = img.src;
                                };
                                img.onerror = function() {
                                    console.error(`[ModalFix] Failed to load ${keyword} image`);
                                    // Fall back to a basic SVG
                                    challengeImage.src = './images/image-error.svg';
                                    if (modalImage) modalImage.src = './images/image-error.svg';
                                    if (modalError) modalError.style.display = 'block';
                                };
                                img.src = imageFixMap[keyword].fixUrl;
                            }
                        }, 300);
                    });
                }
            });
        });
    }
    
    // Setup modal image handling to ensure proper loading
    function setupModalImageHandling() {
        console.log('[ModalFix] Setting up modal image handling');
        
        if (!imageModal || !modalImage || !challengeImage) {
            console.error('[ModalFix] Could not find all required modal elements');
            return;
        }
        
        // When the modal is shown, ensure image is loaded properly
        imageModal.addEventListener('show.bs.modal', function() {
            console.log('[ModalFix] Modal is showing, updating image source');
            
            // Show loading indicator
            if (modalLoading) modalLoading.style.display = 'block';
            if (modalError) modalError.style.display = 'none';
            
            // Use the current challenge image source
            modalImage.src = challengeImage.src;
            
            // Update modal title
            if (imageModalLabel) {
                const title = document.getElementById('task-title');
                imageModalLabel.textContent = title ? title.textContent : 'Challenge Image';
            }
        });
        
        // Make sure modal close button works
        const closeButton = imageModal.querySelector('.btn-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                console.log('[ModalFix] Close button clicked');
                
                // Close modal
                if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                    const bsModal = bootstrap.Modal.getInstance(imageModal);
                    if (bsModal) {
                        bsModal.hide();
                    } else {
                        closeModalManually();
                    }
                } else {
                    closeModalManually();
                }
            });
        }
        
        // Function to manually close the modal if needed
        function closeModalManually() {
            console.log('[ModalFix] Closing modal manually');
            imageModal.style.display = 'none';
            imageModal.classList.remove('show');
            document.body.classList.remove('modal-open');
            
            // Remove backdrop
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
        }
    }
    
    console.log('[ModalFix] Modal fix script initialized successfully');
});
