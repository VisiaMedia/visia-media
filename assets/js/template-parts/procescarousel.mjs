/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal){
    if(document.querySelector('.js-process-carousel')) {
        const procesCarousels = gsap.utils.toArray('.js-process-carousel');

        /* Loop over instances */
        procesCarousels.forEach(procesCarousel => {
            let timeline = tlSetup(procesCarousel, procesCarousel.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(procesCarousel.querySelector('.js-process-carousel-vertical-text-reveal')) {
                    tlTextReveal(procesCarousel.querySelector('.js-process-carousel-vertical-text-reveal'), timeline);
                }


                /* Add animation for container reveal */
                if(procesCarousel.querySelector('.js-process-carousel-container')) {
                    let procesCarouselContainer = procesCarousel.querySelectorAll('.js-process-carousel-container');

                    gsap.set(procesCarouselContainer, {
                        autoAlpha:0,
                        immediateRender: true
                    });

                    timeline.to(procesCarouselContainer, {
                        autoAlpha: 1
                    })
                }
            }

            /* Execute once */
            buildTimeline();


            /* Clear and rebuild timeline on resize (only rebuild if not completed) */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);
            });




            /* Animate scrolling */
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
                refreshPriority: procesCarousel.dataset.stCount,
                pinSpacing: false
            });

            /* Set individual items opacity */
            const procesCarouselItems = procesCarousel.querySelectorAll('.js-process-carousel-item');

            gsap.set(procesCarouselItems, {
                autoAlpha: .125
            });


            /* Check if mobile or desktop */
            let isDesktop = true;

            if(window.matchMedia("(pointer: coarse)").matches) {
                isDesktop = false;
            }

            /* Increase opacity on scroll */
            procesCarouselItems.forEach(function (procesCarouselItem, i) {
                let procesCarouselItemTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: procesCarouselItem,
                        start:() => {
                            if (window.outerWidth > 810) {
                                return "top center";
                            } else {
                                return "top 66.666666%";
                            }
                        },
                        end: "bottom center",
                        scrub: true,
                        refreshPriority: procesCarousel.dataset.stCount,
                        snap: isDesktop ? "labels" : false,
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