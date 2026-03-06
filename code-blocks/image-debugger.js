// Image debugger script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Image debugger loaded');
    
    // Check and log image loading status
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        const src = img.getAttribute('src');
        console.log(`Testing image: ${src}`);
        
        // Create new image object to test loading
        const testImg = new Image();
        
        testImg.onload = function() {
            console.log(`✅ SUCCESS: Image loaded successfully: ${src}`);
            console.log(`   - Dimensions: ${testImg.width}x${testImg.height}`);
        };
        
        testImg.onerror = function() {
            console.error(`❌ ERROR: Failed to load image: ${src}`);
        };
        
        testImg.src = src;
    });
});
