/* Initialize */
export function init(gsap, ScrollTrigger) {
    const procesCarousels = gsap.utils.toArray('.js-process-carousel');

    if (procesCarousels.length > 0) {
        /* Loop over instances */
        procesCarousels.forEach(procesCarousel => {
            const procesCarouselContainer = procesCarousel.querySelector('.js-process-carousel-container');
            const procesCarouselLabels = procesCarousel.querySelector('.js-process-carousel-labels');
            const procesCarouselLabelsList = procesCarousel.querySelector('.js-process-carousel-labels-list');
            const procesCarouselItems = procesCarousel.querySelectorAll('.js-process-carousel-item');
            const procesCarouselFirstItem = procesCarouselItems[0];

            /* Animate scrolling */
            if (procesCarouselFirstItem && procesCarouselLabels) {
                gsap.set(procesCarouselLabels, {
                    y: () => (procesCarouselFirstItem.offsetHeight / 2) - (procesCarouselLabels.offsetHeight / 2)
                });

                /* Pin counter element */
                ScrollTrigger.create({
                    trigger: procesCarouselLabels,
                    start: "center center",
                    pin: true,
                    endTrigger: procesCarouselContainer,
                    end: `bottom-=${procesCarouselItems[procesCarouselItems.length - 1].offsetHeight / 2}px center`,
                    refreshPriority: procesCarousel.dataset.stCount,
                    pinSpacing: false
                });

                /* Set individual items opacity */
                gsap.set(procesCarouselItems, { autoAlpha: 0.125 });

                const isDesktop = !window.matchMedia("(pointer: coarse)").matches;

                /* Increase opacity on scroll */
                procesCarouselItems.forEach((procesCarouselItem, i) => {
                    const targetLabel = procesCarouselLabels.querySelector(`.js-process-carousel-label:nth-child(${i + 1})`);

                    const procesCarouselItemTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: procesCarouselItem,
                            start: window.outerWidth > 810 ? "top center" : "top 66.666666%",
                            end: "bottom center",
                            scrub: true,
                            refreshPriority: procesCarousel.dataset.stCount,
                            snap: isDesktop ? "labels" : false,
                            onEnter: () => updateLabelPosition(targetLabel),
                            onEnterBack: () => updateLabelPosition(targetLabel)
                        }
                    });

                    procesCarouselItemTl.to(procesCarouselItem, { autoAlpha: 1, duration: 0.5 })
                        .addLabel("fadedIn", ">")
                        .to(procesCarouselItem, { autoAlpha: 1, duration: 0.5 });
                });

                function updateLabelPosition(targetLabel) {
                    if (targetLabel) {
                        const targetOffset = targetLabel.offsetTop * -1;
                        gsap.to(procesCarouselLabelsList, { duration: 0.45, y: targetOffset });
                    }
                }
            }
        });
    }
}

/* Export init function */
export default {
    init
};
