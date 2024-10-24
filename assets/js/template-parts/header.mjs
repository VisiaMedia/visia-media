/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if (document.querySelector('.js-header')) {
        const header = document.querySelector('.js-header');

        /* Setup timeline */
        let timeline = tlSetup(header, header.dataset.stCount);


        /* Build timeline */
        let buildTimeline = function() {
            /* Add animation for title reveal */
            if(header.querySelector('.js-header-title')) {
                tlFadeIn(header.querySelector('.js-header-title'), timeline);
            }


            /* Add animation for headline reveal */
            if(header.querySelector('.js-header-vertical-text-reveal')) {
                tlTextReveal(header.querySelector('.js-header-vertical-text-reveal'), timeline);
            }


            /* Add animation for button reveal */
            if(header.querySelector('.js-header-button-wrapper')) {
                tlFadeIn(header.querySelector('.js-header-button-wrapper'), timeline);
            }


            /* Add animation for meta reveal */
            if(header.querySelector('.js-header-case-meta')) {
                tlFadeIn(header.querySelector('.js-header-case-meta'), timeline);
            }


            /* Add animation for USPs reveal */
            if(header.querySelector('.js-header-usps')) {
                const headerUspsUsps = header.querySelectorAll('.js-header-usps-usp');

                headerUspsUsps.forEach(function(headerUspsUsp, i) {
                    let timelinePosition;

                    if(i === 0) {
                        timelinePosition = timeline.totalDuration();
                    } else {
                        timelinePosition = ">-0.065";
                    }

                    gsap.set(headerUspsUsp, {
                        autoAlpha: 0,
                        immediateRender: true
                    });

                    timeline.to(headerUspsUsp, {
                        autoAlpha: 1,
                        onStart: () => {
                            if(headerUspsUsp.querySelector('.js-header-usps-usp-value')) {
                                const headerUspsUspValue = headerUspsUsp.querySelector('.js-header-usps-usp-value');

                                gsap.from(headerUspsUspValue, {
                                    textContent: 0,
                                    duration: 1,
                                    ease: "none",
                                    snap: {
                                        textContent: 1
                                    }
                                });
                            }
                        }
                    }, timelinePosition);
                });
            }
        }

        /* Execute once */
        buildTimeline();


        /* Clear and rebuild timeline on resize (only rebuild if not completed) */
        callAfterResize(function() {
            buildTlAfterResize(timeline, buildTimeline);
        });




        /* Setup ScrollTrigger for fading out USPs */
        if(header.querySelector('.js-header-usps')) {
            const headerUsps = header.querySelector('.js-header-usps');

            gsap.to(headerUsps, {
                scrollTrigger: {
                    trigger: header,
                    start: "top top",
                    end: '+=50%',
                    invalidateOnRefresh: true,
                    scrub: 1,
                    refreshPriority: headerUsps.dataset.stCount
                },
                autoAlpha: 0
            });
        }
    }
}

/* Export init function */
export default {
    init
};