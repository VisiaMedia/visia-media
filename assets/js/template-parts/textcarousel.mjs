/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal){
    if(document.querySelector('.js-textcarousel')) {
        const textCarousels = gsap.utils.toArray('.js-textcarousel');

        /* Loop over instances */
        textCarousels.forEach(textCarousel => {
            let timeline = tlSetup(textCarousel, textCarousel.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(textCarousel.querySelector('.js-textcarousel-vertical-text-reveal')) {
                    tlTextReveal(textCarousel.querySelector('.js-textcarousel-vertical-text-reveal'), timeline);
                }


                /* Add animation for item reveal */
                if(textCarousel.querySelector('.js-textcarousel-container')) {
                    let textCarouselContainer = textCarousel.querySelectorAll('.js-textcarousel-container');

                    gsap.set(textCarouselContainer, {
                        autoAlpha:0,
                        immediateRender: true
                    });

                    timeline.to(textCarouselContainer, {
                        autoAlpha: 1
                    });
                }
            }

            /* Execute once */
            buildTimeline();


            /* Clear and rebuild timeline on resize (only rebuild if not completed) */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);
            });




            /* Animate scrolling */
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
                            if (window.outerWidth > 810) {
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