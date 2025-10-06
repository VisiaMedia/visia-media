/* Initialize */
export function init(gsap, callAfterResize, ScrollTrigger) {
    const woordStreamers = gsap.utils.toArray('.js-woordstreamer');

    if (woordStreamers.length > 0) {
        woordStreamers.forEach(woordStreamer => {
            const woordStreamerInner = woordStreamer.querySelector('.js-woordstreamer-inner');
            const woordStreamerRows = woordStreamer.querySelectorAll('.js-woordstreamer-row');

            let woordStreamerRowSmallestWidth;

            /* Determine dimensions */
            const determineDimensions = () => {
                let woordStreamerHeight = 0;
                woordStreamerRowSmallestWidth = Number.MAX_SAFE_INTEGER;

                woordStreamerRows.forEach(woordStreamerRow => {
                    const woordStreamerRowHeight = gsap.getProperty(woordStreamerRow, "height");
                    const woordStreamerRowMargin = gsap.getProperty(woordStreamerRow, "margin-bottom");
                    const woordStreamerRowWidth = woordStreamerRow.offsetWidth;

                    /* Calculate total height */
                    woordStreamerHeight += woordStreamerRowHeight + woordStreamerRowMargin;

                    /* Find the smallest width */
                    if (woordStreamerRowWidth < woordStreamerRowSmallestWidth) {
                        woordStreamerRowSmallestWidth = woordStreamerRowWidth;
                    }
                });

                /* Set inner height */
                gsap.set(woordStreamerInner, {
                    height: woordStreamerHeight,
                    onComplete: ScrollTrigger.refresh
                });
            };

            /* Execute on load and resize */
            determineDimensions();
            callAfterResize(determineDimensions);

            /* Setup scroll triggers for each row */
            woordStreamerRows.forEach(woordStreamerRow => {
                gsap.to(woordStreamerRow, {
                    scrollTrigger: {
                        trigger: woordStreamerInner,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.75,
                        invalidateOnRefresh: true,
                        refreshPriority: woordStreamer.dataset.stCount,
                        onEnter: () => woordStreamerRow.style.willChange = 'transform',
                        onEnterBack: () => woordStreamerRow.style.willChange = 'transform',
                        onLeave: () => woordStreamerRow.style.willChange = 'auto',
                        onLeaveBack: () => woordStreamerRow.style.willChange = 'auto'
                    },
                    x: (index, target) => {
                        const isRTL = target.classList.contains('js-woordstreamer-row-rtl');
                        const maxX = Math.min(woordStreamerRowSmallestWidth - window.outerWidth, window.outerWidth / 2);
                        return isRTL ? -maxX : maxX;
                    },
                    ease: 'none'
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
};