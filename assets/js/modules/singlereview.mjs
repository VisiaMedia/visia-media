/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn) {
    const reviewBlocks = gsap.utils.toArray('.js-single-review');

    if (reviewBlocks.length > 0) {
        /* Loop over instances */
        reviewBlocks.forEach(reviewBlock => {
            const thumbnail = reviewBlock.querySelector('.js-single-review-thumbnail');
            const details = reviewBlock.querySelector('.js-single-review-details');
            const reviewText = reviewBlock.querySelector('.js-single-review-text');

            /* Setup timeline */
            let timeline = tlSetup(reviewBlock, reviewBlock.dataset.stCount);

            /* Build timeline */
            const buildTimeline = () => {
                if (thumbnail) tlFadeIn(thumbnail, timeline);
                if (details) tlFadeIn(details, timeline);
                if (reviewText) tlFadeIn(reviewText, timeline);
            };

            buildTimeline(); // Execute once

            /* Clear and rebuild timeline on resize */
            callAfterResize(() => buildTlAfterResize(timeline, buildTimeline));
        });
    }
}

/* Export init function */
export default {
    init
};