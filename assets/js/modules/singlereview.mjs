/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-single-review')) {
        const reviewBlocks = gsap.utils.toArray('.js-single-review');

        /* Loop over instances */
        reviewBlocks.forEach(reviewBlock => {
            let timeline = tlSetup(reviewBlock, reviewBlock.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for thumbnail */
                if(reviewBlock.querySelector('.js-single-review-thumbnail')) {
                    tlFadeIn(reviewBlock.querySelector('.js-single-review-thumbnail'), timeline);
                }

                /* Add animation for details */
                if(reviewBlock.querySelector('.js-single-review-details')) {
                    tlFadeIn(reviewBlock.querySelector('.js-single-review-details'), timeline);
                }

                /* Add animation for review */
                if (reviewBlock.querySelector('.js-single-review-text')) {
                    tlFadeIn(reviewBlock.querySelector('.js-single-review-text'), timeline);
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