/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-logos')) {

        /* Wrap setup in self starting function */
        let firstSetup = true,
            setupLogoGrids;

        (setupLogoGrids = function(){
            /* Get all logo-section instances as array */
            const logoGrids = gsap.utils.toArray('.js-logos');

            /* Loop over logogrid instances */
            logoGrids.forEach(logoGrid => {

                /* Setup timeline for various animations */
                let logoGridTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: logoGrid,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: logoGrid.dataset.stCount
                    },
                    onComplete: () => {
                        logoGridTl.clear();
                    }
                });

                /* Clear timeline on resize */
                callAfterResize(function() {
                    logoGridTl.clear();
                });

                /* Disable timeline and wait for initial reveal animation to enable */
                if(firstSetup === true) {
                    logoGridTl.scrollTrigger.disable();
                }



                /* Add animation for headline reveal */
                if(logoGrid.querySelector('.js-logos-vertical-text-reveal')) {
                    tlTextReveal(logoGrid.querySelector('.js-logos-vertical-text-reveal'), logoGridTl);
                }


                /* Add animation for item reveal */
                if(logoGrid.querySelector('.js-logos-list')) {
                    tlFadeIn(logoGrid.querySelector('.js-logos-list'), logoGridTl);
                }


                /* Add animation for button reveal */
                if (logoGrid.querySelector('.js-logos-button-wrapper')) {
                    tlFadeIn(logoGrid.querySelector('.js-logos-button-wrapper'), logoGridTl);
                }
            });

            firstSetup = false;
        })();

        /* Resetup statements after resize */
        callAfterResize(setupLogoGrids);
    }
}

/* Export init function */
export default {
    init
};