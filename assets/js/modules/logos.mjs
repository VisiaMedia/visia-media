/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-logos')) {
        const logoGrids = gsap.utils.toArray('.js-logos');

        /* Loop over instances */
        logoGrids.forEach(logoGrid => {
            let timeline = tlSetup(logoGrid, logoGrid.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(logoGrid.querySelector('.js-logos-vertical-text-reveal')) {
                    tlTextReveal(logoGrid.querySelector('.js-logos-vertical-text-reveal'), timeline);
                }


                /* Add animation for item reveal */
                if(logoGrid.querySelector('.js-logos-list')) {
                    tlFadeIn(logoGrid.querySelector('.js-logos-list'), timeline);
                }


                /* Add animation for button reveal */
                if (logoGrid.querySelector('.js-logos-button-wrapper')) {
                    tlFadeIn(logoGrid.querySelector('.js-logos-button-wrapper'), timeline);
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