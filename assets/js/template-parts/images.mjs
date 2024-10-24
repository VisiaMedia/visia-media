export function init(gsap, stFadeIn){
    if(document.querySelector('.js-block-images')) {
        const imageBlocks = document.querySelectorAll('.js-block-images');

        /* Loop over instances */
        imageBlocks.forEach(imageBlock => {
            stFadeIn(imageBlock.querySelectorAll('.js-item'), imageBlock.dataset.stCount);
        });
    }
}

/* Export init function */
export default {
    init
};