/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal){
    if(document.querySelector('.js-process-carousel')) {
        /* Get all instances as array */
        const procesCarousels = gsap.utils.toArray('.js-process-carousel');

        /* Reveal items in timeline */
        let firstSetup = true,
            setupProcesCarousels;

        (setupProcesCarousels = function(){
            /* Loop over carousel instances */
            procesCarousels.forEach(procesCarousel => {

                /* Setup timeline for various animations */
                let procesCarouselTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: procesCarousel,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: procesCarousel.dataset.stCount
                    },
                    onComplete: () => {
                        procesCarouselTl.clear();
                    }
                });

                /* Clear timeline on resize */
                callAfterResize(function() {
                    procesCarouselTl.clear();
                });

                /* Disable timeline and wait for initial reveal animation to enable */
                if(firstSetup === true) {
                    procesCarouselTl.scrollTrigger.disable();
                }



                /* Add animation for headline reveal */
                if(procesCarousel.querySelector('.js-process-carousel-vertical-text-reveal')) {
                    tlTextReveal(procesCarousel.querySelector('.js-process-carousel-vertical-text-reveal'), procesCarouselTl);
                }


                /* Add animation for container reveal */
                if(procesCarousel.querySelector('.js-process-carousel-container')) {
                    let procesCarouselContainer = procesCarousel.querySelectorAll('.js-process-carousel-container');

                    gsap.set(procesCarouselContainer, {
                        autoAlpha:0,
                    });

                    procesCarouselTl.to(procesCarouselContainer, {
                        autoAlpha: 1
                    })
                }
            });

            firstSetup = false;
        })();

        /* Resetup section after resize */
        callAfterResize(setupProcesCarousels);



        /* Loop over carousel instances */
        procesCarousels.forEach(procesCarousel => {
            const procesCarouselContainer = procesCarousel.querySelector('.js-process-carousel-container');
            const procesCarouselLabels = procesCarousel.querySelector('.js-process-carousel-labels');
            const procesCarouselLabelsList = procesCarousel.querySelector('.js-process-carousel-labels-list');

            /* Set labels initial position */
            const procesCarouselFirstItem = procesCarousel.querySelector('.js-process-carousel-item');

            gsap.set(procesCarouselLabels, {
                y:() => {
                    return (procesCarouselFirstItem.offsetHeight / 2) - (procesCarouselLabels.offsetHeight / 2)
                }
            });

            /* Pin counter element */
            ScrollTrigger.create({
                trigger: procesCarouselLabels,
                start: "center center",
                pin: true,
                endTrigger: procesCarouselContainer,
                end:() => {
                    return "bottom-="+ procesCarousel.querySelector('.js-process-carousel-item:last-child').offsetHeight / 2 +"px center";
                },
                refreshPriority: procesCarousel.dataset.stCount
            });

            /* Set individual items opacity */
            const procesCarouselItems = procesCarousel.querySelectorAll('.js-process-carousel-item');

            gsap.set(procesCarouselItems, {
                autoAlpha: .125
            });



            /* Increase opacity on scroll */
            procesCarouselItems.forEach(function (procesCarouselItem, i) {
                let procesCarouselItemTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: procesCarouselItem,
                        start:() => {
                            if (window.outerWidth > 768) {
                                return "top center";
                            } else {
                                return "top 66.666666%";
                            }
                        },
                        end: "bottom center",
                        scrub: true,
                        refreshPriority: procesCarousel.dataset.stCount,
                        snap: "labels",
                        onEnter:() => {
                            let targetLabel = procesCarouselLabels.querySelector('.js-process-carousel-label:nth-child('+(i + 1)+')'),
                                targetOffset = targetLabel.offsetTop * -1;

                            gsap.to(procesCarouselLabelsList, {
                                duration: .45,
                                immediateRender:false,
                                y:() => {
                                    return targetOffset;
                                }
                            });
                        },
                        onEnterBack:() => {
                            let targetLabel = procesCarouselLabels.querySelector('.js-process-carousel-label:nth-child('+(i + 1)+')'),
                                targetOffset = targetLabel.offsetTop * -1;

                            gsap.to(procesCarouselLabelsList, {
                                duration: .45,
                                immediateRender:false,
                                y:() => {
                                    return targetOffset;
                                }
                            });
                        }
                    }
                });

                procesCarouselItemTl.to(procesCarouselItem, {
                    autoAlpha: 1,
                    duration: .5
                });

                procesCarouselItemTl.addLabel("fadedIn", ">");

                procesCarouselItemTl.to(procesCarouselItem, {
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