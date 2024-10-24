/* Initialize */
export function loadImages(ScrollTrigger) {

    /* Check individual images */
    const images = document.querySelectorAll('img');

    function loaded() {
        ScrollTrigger.refresh();
    }

    images.forEach(image => {
        if (image.complete && image.naturalWidth !== 0) {
            loaded();
        } else {
            image.addEventListener('load', loaded);
        }
    });
}

/* Export init function */
export default {
    loadImages
};