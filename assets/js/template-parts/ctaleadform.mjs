/* Initialize */
export function init(callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn) {
    const ctaLeadforms = document.querySelectorAll('.js-cta-leadform');

    if (ctaLeadforms.length > 0) {
        ctaLeadforms.forEach(ctaLeadform => {
            const ctaLeadformInner = ctaLeadform.querySelector('.js-cta-leadform-inner');
            const ctaLeadformTitle = ctaLeadform.querySelector('.js-cta-leadform-title');
            const ctaLeadformText = ctaLeadform.querySelector('.js-cta-leadform-text');
            const ctaLeadformForm = ctaLeadform.querySelector('.js-cta-leadform-form');

            /* Setup timeline */
            let timeline = tlSetup(ctaLeadformInner, ctaLeadform.dataset.stCount);

            /* Build timeline */
            const buildTimeline = () => {
                if (ctaLeadformTitle) tlTextReveal(ctaLeadformTitle, timeline);
                if (ctaLeadformText) tlFadeIn(ctaLeadformText, timeline);
                if (ctaLeadformForm) tlFadeIn(ctaLeadformForm, timeline);
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