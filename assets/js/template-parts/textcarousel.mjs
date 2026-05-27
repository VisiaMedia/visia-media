/* Initialize */
export function init(gsap, ScrollTrigger) {
    const textCarousels = gsap.utils.toArray('.js-textcarousel');

    if (textCarousels.length > 0) {
        /* Loop over instances */
        textCarousels.forEach(textCarousel => {
            const textCarouselContainer = textCarousel.querySelector('.js-textcarousel-container');
            const textCarouselCounter = textCarousel.querySelector('.js-textcarousel-counter');
            const textCarouselItems = textCarousel.querySelectorAll('.js-textcarousel-item');
            const textCarouselCounterList = textCarousel.querySelector('.js-textcarousel-counter-list');

            /* Set counter initial position */
            const textCarouselFirstItem = textCarousel.querySelector('.js-textcarousel-item');
            gsap.set(textCarouselCounter, {
                y: () => (textCarouselFirstItem.offsetHeight / 2) - (textCarouselCounter.offsetHeight / 2)
            });

            /* Pin counter element */
            ScrollTrigger.create({
                trigger: textCarouselCounter,
                start: "center center",
                pin: true,
                endTrigger: textCarouselContainer,
                end: () => "bottom-=" + textCarouselItems[textCarouselItems.length - 1].offsetHeight / 2 + "px center",
                refreshPriority: textCarousel.dataset.stCount
            });

            /* Set individual items opacity */
            gsap.set(textCarouselItems, { autoAlpha: 0.125 });

            /* Check if mobile or desktop */
            const isDesktop = !window.matchMedia("(pointer: coarse)").matches;

            /* Increase opacity on scroll */
            textCarouselItems.forEach((textCarouselItem, i) => {
                const textCarouselItemTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: textCarouselItem,
                        start: () => (window.outerWidth > 810 ? "top center" : "top 66.666666%"),
                        end: "bottom center",
                        scrub: true,
                        refreshPriority: textCarousel.dataset.stCount,
                        snap: isDesktop ? "labels" : false,
                        onEnter: () => updateCounterPosition(i),
                        onEnterBack: () => updateCounterPosition(i)
                    }
                });

                textCarouselItemTl.to(textCarouselItem, { autoAlpha: 1, duration: 0.5 });

                textCarouselItemTl.addLabel("fadedIn", ">").to(textCarouselItem, { autoAlpha: 1, duration: 0.5 });
            });

            /* Function to update counter position */
            function updateCounterPosition(i) {
                gsap.to(textCarouselCounterList, {
                    duration: 0.45,
                    immediateRender: false,
                    y: () => textCarouselCounter.offsetHeight * i * -1
                });
            }
        });
    }
}

/* Export init function */
export default {
    init
};
