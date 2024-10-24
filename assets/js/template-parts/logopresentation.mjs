/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-logo-presentation')) {
        const logoPresentations = document.querySelectorAll('.js-logo-presentation');

        logoPresentations.forEach(logoPresentation => {
            let timeline = tlSetup(logoPresentation, logoPresentation.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(logoPresentation.querySelector('.js-title')) {
                    tlTextReveal(logoPresentation.querySelector('.js-title'), timeline);
                }


                /* Add animation for text reveal */
                if(logoPresentation.querySelector('.js-intro')) {
                    tlFadeIn(logoPresentation.querySelector('.js-intro'), timeline);
                }

                /* Add animation for item reveal */
                if(logoPresentation.querySelector('.js-item')) {
                    const items = logoPresentation.querySelectorAll('.js-item');

                    gsap.set(items, {
                        autoAlpha:0
                    });

                    timeline.to(items, {
                        autoAlpha:1,
                        stagger: .2
                    });
                }

                /* Fade in signs */
                if(logoPresentation.querySelector('.js-item-sign')) {
                    const signs = logoPresentation.querySelectorAll('.js-item-sign');

                    gsap.set(signs, {
                        autoAlpha:0
                    });

                    timeline.to(signs, {
                        autoAlpha:1
                    });
                }
            }

            /* Execute once */
            buildTimeline();


            /* Clear and rebuild timeline on resize (only rebuild if not completed) */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);
            });
        });
    }
}

/* Export init function */
export default {
    init
}