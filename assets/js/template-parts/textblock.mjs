/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn) {
    const textblocks = gsap.utils.toArray('.js-textblock');

    if (textblocks.length > 0) {
        /* Loop over instances */
        textblocks.forEach(textblock => {
            const textblockTitle = textblock.querySelector('.js-textblock-title');
            const textblockText = textblock.querySelector('.js-textblock-text');
            let timeline = tlSetup(textblock, textblock.dataset.stCount);

            /* Build timeline */
            const buildTimeline = function() {
                if (textblockTitle) {
                    tlTextReveal(textblockTitle, timeline);
                }

                if (textblockText) {
                    tlFadeIn(textblockText, timeline);
                }
            };

            /* Execute once */
            buildTimeline();

            /* Clear and rebuild timeline on resize (only rebuild if not completed) */
            callAfterResize(() => {
                buildTlAfterResize(timeline, buildTimeline);
            });
        });
    }
}

/* Export init function */
export default {
    init
};