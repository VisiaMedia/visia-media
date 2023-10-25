/* Initialize */
export function init(gsap){
    if(document.querySelector('.js-block-images')) {
        const imageBlocks = document.querySelectorAll('.js-block-images');

        /* Loop over instances */
        imageBlocks.forEach(imageBlock => {
            const items = imageBlock.querySelectorAll('.js-item');

            /* Initially hide each item */
            gsap.set(items, {
                autoAlpha:0,
                y: "1.5rem",
                immediateRender: true
            });

            /* Loop over items */
            items.forEach(item => {
                /* Reveal item on scroll */
                gsap.to(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top center",
                        once: true,
                        refreshPriority: imageBlock.dataset.stCount,
                        invalidateOnRefresh: true
                    },
                    autoAlpha: 1,
                    y: "0rem"
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
};