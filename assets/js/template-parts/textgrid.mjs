/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn) {
    const textgrids = gsap.utils.toArray('.js-textgrid');

    if (textgrids.length > 0) {
        /* Loop over instances */
        textgrids.forEach(textgrid => {
            const verticalTextReveal = textgrid.querySelector('.js-textgrid-vertical-text-reveal');
            const textgridItems = textgrid.querySelectorAll('.js-textgrid-item');
            const buttonWrapper = textgrid.querySelector('.js-textgrid-button-wrapper');
            let timeline = tlSetup(textgrid, textgrid.dataset.stCount);

            /* Build timeline */
            const buildTimeline = function () {
                if (verticalTextReveal) {
                }

                if (textgridItems.length > 0) {
                    tlFadeIn(textgridItems, timeline);
                }

                if (buttonWrapper) {
                    tlFadeIn(buttonWrapper, timeline);
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