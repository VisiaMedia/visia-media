/* Initialize */
import {tlFadeIn} from "../helpers/functions.mjs";

export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-textgrid')) {
        const textgrids = gsap.utils.toArray('.js-textgrid');

        /* Loop over instances */
        textgrids.forEach(textgrid => {
            let timeline = tlSetup(textgrid, textgrid.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(textgrid.querySelector('.js-textgrid-vertical-text-reveal')) {
                    tlTextReveal(textgrid.querySelector('.js-textgrid-vertical-text-reveal'), timeline);
                }


                /* Add animation for item reveal */
                if(textgrid.querySelector('.js-textgrid-item')) {
                    tlFadeIn(textgrid.querySelectorAll('.js-textgrid-item'), timeline);
                }


                /* Add animation for button reveal */
                if(textgrid.querySelector('.js-textgrid-button-wrapper')) {
                    tlFadeIn(textgrid.querySelector('.js-textgrid-button-wrapper'), timeline);
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