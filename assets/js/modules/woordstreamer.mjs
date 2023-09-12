/* Initialize */
export function init(gsap, callAfterResize){
    if(document.querySelector('.js-woordstreamer')) {
        const woordStreamers = gsap.utils.toArray('.js-woordstreamer');

        /* Loop over woordstreamer instances */
        woordStreamers.forEach(woordStreamer => {
            const woordStreamerInner = woordStreamer.querySelector('.js-woordstreamer-inner'),
                woordStreamerRows = woordStreamer.querySelectorAll('.js-woordstreamer-row');

            let woordStreamerRowSmallestWidth;

            /* Determine dimensions (on resize) */
            let determineDimensions;
            (determineDimensions = function(){
                let woordStreamerHeight = 0;

                woordStreamerRowSmallestWidth = 9999999;

                /* Loop over rows to determine sizes */
                woordStreamerRows.forEach(woordStreamerRow => {
                    let woordStreamerRowHeight = gsap.getProperty(woordStreamerRow, "height"),
                        woordStreamerRowMargin = gsap.getProperty(woordStreamerRow, "margin-bottom"),

                        woordStreamerRowWidth = woordStreamerRow.offsetWidth;

                    /* Combined height */
                    woordStreamerHeight = woordStreamerHeight + woordStreamerRowHeight + woordStreamerRowMargin;

                    /* Smallest width */
                    if(woordStreamerRowWidth < woordStreamerRowSmallestWidth) {
                        woordStreamerRowSmallestWidth = woordStreamerRowWidth;
                    }
                });

                /* Set inner height */
                gsap.set(woordStreamerInner, {
                    height: woordStreamerHeight
                });
            })();

            callAfterResize(determineDimensions);



            /* Loop over rows to set up scrolltriggers */
            woordStreamerRows.forEach(woordStreamerRow => {
                let woordStreamerRowWords = gsap.utils.toArray(woordStreamerRow.querySelectorAll('.js-woordstreamer-row-word'));

                gsap.to(woordStreamerRowWords, {
                    scrollTrigger: {
                        trigger: woordStreamerInner,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.75,
                        invalidateOnRefresh: true,
                        refreshPriority: woordStreamer.dataset.stCount
                    },
                    x: (index, target) => {
                        if(target.classList.contains('js-woordstreamer-row-word-rtl')) {
                            return Math.min(woordStreamerRowSmallestWidth - window.outerWidth, window.outerWidth / 2) * -1;
                        } else {
                            return Math.min(woordStreamerRowSmallestWidth - window.outerWidth, window.outerWidth / 2);
                        }
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