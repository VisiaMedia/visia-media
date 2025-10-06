/* Initialize */
export function init(gsap, stFadeIn) {
    const imageBlocks = document.querySelectorAll('.js-block-images');

    if (imageBlocks.length > 0) {
        /* Loop over instances */
        imageBlocks.forEach(imageBlock => {
            const items = imageBlock.querySelectorAll('.js-item');
            if (items.length > 0) {
                stFadeIn(items, imageBlock.dataset.stCount);
            }
        });
    }
}

/* Export init function */
export default {
    init
};