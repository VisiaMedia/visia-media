/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-textblock')) {
        const textblocks = gsap.utils.toArray('.js-textblock');

        /* Loop over instances */
        textblocks.forEach(textblock => {
            let timeline = tlSetup(textblock, textblock.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(textblock.querySelector('.js-textblock-title')) {
                    tlTextReveal(textblock.querySelector('.js-textblock-title'), timeline);
                }


                /* Add animation for item reveal */
                if(textblock.querySelector('.js-textblock-text')) {
                    tlFadeIn(textblock.querySelector('.js-textblock-text'), timeline);
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