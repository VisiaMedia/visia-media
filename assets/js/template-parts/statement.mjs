/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-statement')) {
        const statements = gsap.utils.toArray('.js-statement');

        /* Loop over instances */
        statements.forEach(statement => {
            let timeline = tlSetup(statement, statement.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for title reveal */
                if(statement.querySelector('.js-statement-title')) {
                    tlFadeIn(statement.querySelector('.js-statement-title'), timeline);
                }


                /* Add animation for headline reveal */
                if(statement.querySelector('.js-statement-vertical-text-reveal')) {
                    tlTextReveal(statement.querySelector('.js-statement-vertical-text-reveal'), timeline);
                }


                /* Add animation for button reveal */
                if (statement.querySelector('.js-statement-button-wrapper')) {
                    tlFadeIn(statement.querySelector('.js-statement-button-wrapper'), timeline);
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