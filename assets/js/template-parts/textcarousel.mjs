/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal){
    if(document.querySelector('.js-textcarousel')) {
        /* Get all instances as array */
        const textCarousels = gsap.utils.toArray('.js-textcarousel');

        /* Reveal items in timeline */
        let firstSetup = true,
            setupTextCarousels;

        (setupTextCarousels = function(){
            /* Loop over carousel instances */
            textCarousels.forEach(textCarousel => {

                /* Setup timeline for various animations */
                let textCarouselTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: textCarousel,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: textCarousel.dataset.stCount
                    },
                    onComplete: () => {
                        textCarouselTl.clear();
                    }
                });

                /* Clear timeline on resize */
                callAfterResize(function() {
                    textCarouselTl.clear();
                });

                /* Disable timeline and wait for initial reveal animation to enable */
                if(firstSetup === true) {
                    textCarouselTl.scrollTrigger.disable();
                }



                /* Add animation for headline reveal */
                if(textCarousel.querySelector('.js-textcarousel-vertical-text-reveal')) {
                    tlTextReveal(textCarousel.querySelector('.js-textcarousel-vertical-text-reveal'), textCarouselTl);
                }


                /* Add animation for item reveal */
                if(textCarousel.querySelector('.js-textcarousel-container')) {
                    let textCarouselContainer = textCarousel.querySelectorAll('.js-textcarousel-container');

                    gsap.set(textCarouselContainer, {
                        autoAlpha:0,
                    });

                    textCarouselTl.to(textCarouselContainer, {
                        autoAlpha: 1
                    })
                }
            });

            firstSetup = false;
        })();

        /* Resetup section after resize */
        callAfterResize(setupTextCarousels);



        /* Loop over textcarousel instances */
        textCarousels.forEach(textCarousel => {
            const textCarouselContainer = textCarousel.querySelector('.js-textcarousel-container');
            const textCarouselCounter = textCarousel.querySelector('.js-textcarousel-counter');

            /* Set counter initial position */
            const textCarouselFirstItem = textCarousel.querySelector('.js-textcarousel-item');
            gsap.set(textCarouselCounter, {
               y:() => {
                   return (textCarouselFirstItem.offsetHeight / 2) - (textCarouselCounter.offsetHeight / 2)
               }
            });

            /* Pin counter element */
            ScrollTrigger.create({
                trigger: textCarouselCounter,
                start: "center center",
                pin: true,
                endTrigger: textCarouselContainer,
                end:() => {
                    return "bottom-="+ textCarousel.querySelector('.js-textcarousel-item:last-child').offsetHeight / 2 +"px center";
                },
                refreshPriority: textCarousel.dataset.stCount
            });

            /* Set individual items opacity */
            const textCarouselItems = textCarousel.querySelectorAll('.js-textcarousel-item');

            gsap.set(textCarouselItems, {
                autoAlpha: .125
            });

            /* Increase opacity on scroll */
            textCarouselItems.forEach(function (textCarouselItem, i) {
                let textCarouselItemTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: textCarouselItem,
                        start:() => {
                            if (window.outerWidth > 768) {
                                return "top center";
                            } else {
                                return "top 66.666666%";
                            }
                        },
                        end: "bottom center",
                        scrub: true,
                        refreshPriority: textCarousel.dataset.stCount,
                        snap: "labels",
                        onEnter:() => {
                            const textCarouselCounterList = textCarousel.querySelector('.js-textcarousel-counter-list');

                            gsap.to(textCarouselCounterList, {
                                duration: .45,
                                immediateRender:false,
                                y:() => {
                                    return (textCarouselCounter.offsetHeight * i) * -1;
                                }
                            });
                        },
                        onEnterBack:() => {
                            const textCarouselCounterList = textCarousel.querySelector('.js-textcarousel-counter-list');

                            gsap.to(textCarouselCounterList, {
                                duration: .45,
                                immediateRender:false,
                                y:() => {
                                    return (textCarouselCounter.offsetHeight * i) * -1;
                                }
                            });
                        }
                    }
                });

                textCarouselItemTl.to(textCarouselItem, {
                    autoAlpha: 1,
                    duration: .5
                });

                textCarouselItemTl.addLabel("fadedIn", ">");

                textCarouselItemTl.to(textCarouselItem, {
                    autoAlpha: 1,
                    duration: .5
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
};