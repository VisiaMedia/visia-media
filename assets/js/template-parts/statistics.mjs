/* Initialize */
export function init(gsap, callAfterResize, buildTlAfterResize, tlSetup){
    if(document.querySelector('.js-statistics')) {
        const statisticBlocks = document.querySelectorAll('.js-statistics');

        /* Loop over instances */
        statisticBlocks.forEach(statisticBlock => {
            let timeline = tlSetup(statisticBlock, statisticBlock.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                const items = statisticBlock.querySelectorAll('.js-item');

                gsap.set(items, {
                    autoAlpha: 0
                });

                /* Loop over items */
                items.forEach(function(item, i) {
                    let timelinePosition;

                    if(i === 0) {
                        timelinePosition = 0;
                    } else {
                        timelinePosition = ">-0.065";
                    }

                    /* Show on (and count) on scroll */
                    timeline.to(item, {
                        autoAlpha: 1,
                        onStart: () => {
                            if(item.querySelector('.js-item-value')) {
                                const itemValue = item.querySelector('.js-item-value');

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
}