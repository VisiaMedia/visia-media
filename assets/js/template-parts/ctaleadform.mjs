/* Initialize */
export function init(callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-cta-leadform')) {
        const ctaLeadforms = document.querySelectorAll('.js-cta-leadform');

        /* Loop over instances */
        ctaLeadforms.forEach(ctaLeadform => {
            const ctaLeadformInner = ctaLeadform.querySelector('.js-cta-leadform-inner');

            /* Setup timeline */
            let timeline = tlSetup(ctaLeadformInner, ctaLeadform.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for title reveal */
                if(ctaLeadform.querySelector('.js-cta-leadform-title')) {
                    tlTextReveal(ctaLeadform.querySelector('.js-cta-leadform-title'), timeline);
                }

                /* Add animation for text reveal */
                if(ctaLeadform.querySelector('.js-cta-leadform-text')) {
                    tlFadeIn(ctaLeadform.querySelector('.js-cta-leadform-text'), timeline);
                }

                /* Add animation for form reveal */
                if(ctaLeadform.querySelector('.js-cta-leadform-form')) {
                    tlFadeIn(ctaLeadform.querySelector('.js-cta-leadform-form'), timeline);
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