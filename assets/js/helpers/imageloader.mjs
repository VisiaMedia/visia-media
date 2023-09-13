/* Initialize */
export function loadImages(ScrollTrigger) {
    const images = document.querySelectorAll('img');

    function loaded() {
        ScrollTrigger.refresh();
    }

    images.forEach(image => {
        if (image.complete) {
            loaded()
        } else {
            image.addEventListener('load', loaded)
            image.addEventListener('error', function() {
                alert('error')
            })
        }
    });
}

/* Export init function */
export default {
    loadImages
};