/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn) {
    const statements = gsap.utils.toArray('.js-statement');

    if (statements.length > 0) {
        /* Loop over instances */
        statements.forEach(statement => {
            const title = statement.querySelector('.js-statement-title');
            const verticalTextReveal = statement.querySelector('.js-statement-vertical-text-reveal');
            const buttonWrapper = statement.querySelector('.js-statement-button-wrapper');

            let timeline = tlSetup(statement, statement.dataset.stCount);

            /* Build timeline */
            const buildTimeline = function() {
                /* Add animation for title reveal */
                if (title) {
                    tlFadeIn(title, timeline);
                }

                /* Add animation for headline reveal */
                if (verticalTextReveal) {
                }

                /* Add animation for button reveal */
                if (buttonWrapper) {
                    tlFadeIn(buttonWrapper, timeline);
                }
            };

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