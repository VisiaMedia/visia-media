/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn) {
    const presentationCtas = gsap.utils.toArray('.js-cta-presentation');

    if (presentationCtas.length > 0) {
        /* Loop over instances */
        presentationCtas.forEach(presentationCta => {
            const title = presentationCta.querySelector('.js-cta-presentation-title');
            const buttonWrapper = presentationCta.querySelector('.js-cta-presentation-button-wrapper');
            const links = presentationCta.querySelector('.js-cta-presentation-links');

            /* Setup timeline */
            let timeline = tlSetup(presentationCta, presentationCta.dataset.stCount);

            /* Build timeline */
            const buildTimeline = () => {
                if (buttonWrapper) tlFadeIn(buttonWrapper, timeline);
                if (links) tlFadeIn(links, timeline);
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