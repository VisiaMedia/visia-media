/* Initialize */
export function loadImages(ScrollTrigger) {
    const images = document.querySelectorAll('img');

    function loaded() {
        ScrollTrigger.refresh(true);
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