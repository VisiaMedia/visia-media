/* Initialize */
export function loadImages(ScrollTrigger) {

    /* Check individual images */
    const images = document.querySelectorAll('img');

    /* Function to refresh ScrollTrigger once an image is loaded */
    function loaded() {
        ScrollTrigger.refresh();
    }

    /* Loop through each image and add event listeners for loading */
    images.forEach(image => {
        if (image.complete && image.naturalWidth !== 0) {
            // Image already loaded, trigger ScrollTrigger refresh immediately
            loaded();
        } else {
            // Add load event listener for images that are still loading
            image.addEventListener('load', function onImageLoad() {
                loaded();
                // Remove the event listener after the image is loaded
                image.removeEventListener('load', onImageLoad);
            });
        }
    });
}

/* Export init function */
export default {
    loadImages
};