/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-cta-presentation')) {

        /* Wrap setup in self starting function */
        let firstSetup = true,
            setupPresentationCtas;

        (setupPresentationCtas = function(){
            /* Get all cta instances as array */
            const presentationCtas = gsap.utils.toArray('.js-cta-presentation');

            /* Loop over cta instances */
            presentationCtas.forEach(presentationCta => {

                /* Setup timeline for various animations */
                let presentationCtaTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: presentationCta,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: presentationCta.dataset.stCount
                    },
                    onComplete: () => {
                        presentationCtaTL.clear();
                    }
                });

                /* Clear timeline on resize */
                callAfterResize(function() {
                    presentationCtaTL.clear();
                });

                /* Disable timeline and wait for initial reveal animation to enable */
                if(firstSetup === true) {
                    presentationCtaTL.scrollTrigger.disable();
                }



                /* Add animation for headline reveal */
                if(presentationCta.querySelector('.js-cta-presentation-title')) {
                    tlTextReveal(presentationCta.querySelector('.js-cta-presentation-title'), presentationCtaTL);
                }


                /* Add animation for button reveal */
                if(presentationCta.querySelector('.js-cta-presentation-button-wrapper')) {
                    tlFadeIn(presentationCta.querySelector('.js-cta-presentation-button-wrapper'), presentationCtaTL);
                }


                /* Add animation for list reveal */
                if(presentationCta.querySelector('.js-cta-presentation-links')) {
                    tlFadeIn(presentationCta.querySelector('.js-cta-presentation-links'), presentationCtaTL);
                }
            });

            firstSetup = false;
        })();

        /* Resetup statements after resize */
        callAfterResize(setupPresentationCtas);
    }
}

/* Export init function */
export default {
    init
};