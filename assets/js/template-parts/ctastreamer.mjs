/* Initialize */
export function init(callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-cta-streamer')) {
        const ctaStreamers = document.querySelectorAll('.js-cta-streamer');

        /* Loop over instances */
        ctaStreamers.forEach(ctaStreamer => {
            const ctaStreamerInner = ctaStreamer.querySelector('.js-cta-streamer-inner');

            /* Setup timeline */
            let timeline = tlSetup(ctaStreamerInner, ctaStreamer.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for title reveal */
                if(ctaStreamer.querySelector('.js-cta-streamer-title')) {
                    tlTextReveal(ctaStreamer.querySelector('.js-cta-streamer-title'), timeline);
                }

                /* Add animation for button reveal */
                if(ctaStreamer.querySelector('.js-cta-streamer-button-wrapper')) {
                    tlFadeIn(ctaStreamer.querySelector('.js-cta-streamer-button-wrapper'), timeline);
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