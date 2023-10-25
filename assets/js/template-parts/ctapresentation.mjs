/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-cta-presentation')) {
        const presentationCtas = gsap.utils.toArray('.js-cta-presentation');

        /* Loop over instances */
        presentationCtas.forEach(presentationCta => {
            let timeline = tlSetup(presentationCta, presentationCta.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(presentationCta.querySelector('.js-cta-presentation-title')) {
                    tlTextReveal(presentationCta.querySelector('.js-cta-presentation-title'), timeline);
                }


                /* Add animation for button reveal */
                if(presentationCta.querySelector('.js-cta-presentation-button-wrapper')) {
                    tlFadeIn(presentationCta.querySelector('.js-cta-presentation-button-wrapper'), timeline);
                }


                /* Add animation for list reveal */
                if(presentationCta.querySelector('.js-cta-presentation-links')) {
                    tlFadeIn(presentationCta.querySelector('.js-cta-presentation-links'), timeline);
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
};