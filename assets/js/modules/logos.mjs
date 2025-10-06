/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn) {
    const logoGrids = gsap.utils.toArray('.js-logos');

    if (logoGrids.length > 0) {
        /* Loop over instances */
        logoGrids.forEach(logoGrid => {
            let timeline = tlSetup(logoGrid, logoGrid.dataset.stCount);

            /* Build timeline */
            const buildTimeline = () => {
                const verticalTextReveal = logoGrid.querySelector('.js-logos-vertical-text-reveal');
                const logoList = logoGrid.querySelector('.js-logos-list');
                const buttonWrapper = logoGrid.querySelector('.js-logos-button-wrapper');

                /* Add animation for headline reveal */
                if (verticalTextReveal) {
                    tlTextReveal(verticalTextReveal, timeline);
                }

                /* Add animation for item reveal */
                if (logoList) {
                    tlFadeIn(logoList, timeline);
                }

                /* Add animation for button reveal */
                if (buttonWrapper) {
                    tlFadeIn(buttonWrapper, timeline);
                }
            };

            /* Execute once */
            buildTimeline();

            /* Clear and rebuild timeline on resize */
            callAfterResize(() => buildTlAfterResize(timeline, buildTimeline));
        });
    }
}

/* Export init function */
export default {
    init
};