/* Initialize */
export function init(callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn) {
    const ctaStreamers = document.querySelectorAll('.js-cta-streamer');

    if (ctaStreamers.length > 0) {
        /* Loop over instances */
        ctaStreamers.forEach(ctaStreamer => {
            const ctaStreamerInner = ctaStreamer.querySelector('.js-cta-streamer-inner');
            const title = ctaStreamer.querySelector('.js-cta-streamer-title');
            const buttonWrapper = ctaStreamer.querySelector('.js-cta-streamer-button-wrapper');

            /* Setup timeline */
            let timeline = tlSetup(ctaStreamerInner, ctaStreamer.dataset.stCount);

            /* Build timeline */
            const buildTimeline = () => {
                if (title) tlTextReveal(title, timeline);
                if (buttonWrapper) tlFadeIn(buttonWrapper, timeline);
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