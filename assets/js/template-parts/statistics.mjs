/* Initialize */
export function init(gsap, callAfterResize, buildTlAfterResize, tlSetup) {
    const statisticBlocks = document.querySelectorAll('.js-statistics');

    if (statisticBlocks.length > 0) {
        /* Loop over instances */
        statisticBlocks.forEach(statisticBlock => {
            const items = statisticBlock.querySelectorAll('.js-item');
            let timeline = tlSetup(statisticBlock, statisticBlock.dataset.stCount);

            /* Build timeline */
            const buildTimeline = function() {
                gsap.set(items, {
                    autoAlpha: 0
                });

                /* Loop over items */
                items.forEach((item, i) => {
                    const itemValue = item.querySelector('.js-item-value');
                    let timelinePosition = i === 0 ? 0 : ">-0.065";

                    /* Show on (and count) on scroll */
                    timeline.to(item, {
                        autoAlpha: 1,
                        onStart: () => {
                            if (itemValue) {
                                gsap.from(itemValue, {
                                    textContent: 0,
                                    duration: 1,
                                    ease: "none",
                                    snap: {
                                        textContent: 1
                                    }
                                });
                            }
                        }
                    }, timelinePosition);
                });
            };

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