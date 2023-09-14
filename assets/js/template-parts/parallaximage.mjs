/* Initialize */
export function init(gsap){
    if(document.querySelector('.js-parallax-image')) {
        const parallaxImages = document.querySelectorAll('.js-parallax-image');

        parallaxImages.forEach(parallaxImage => {
            gsap.set(parallaxImage, {
                autoAlpha: 0
            });

            gsap.to(parallaxImage, {
                autoAlpha: 1,
                scrollTrigger: {
                    trigger: parallaxImage,
                    start: "top center",
                    once: true,
                    invalidateOnRefresh: true,
                    refreshPriority: parallaxImage.dataset.stCount
                }
            })
        });
    }
}

/* Export init function */
export default {
    init
};