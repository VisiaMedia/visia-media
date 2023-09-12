/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal){
    if(document.querySelector('.js-textgrid')) {

        /* Wrap setup in self starting function */
        let firstSetup = true,
            setupTextgrids;

        (setupTextgrids = function(){
            /* Get all textgrid instances as array */
            const textgrids = gsap.utils.toArray('.js-textgrid');

            /* Loop over textgrid instances */
            textgrids.forEach(textgrid => {

                /* Setup timeline for various animations */
                let textgridTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: textgrid,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: textgrid.dataset.stCount
                    },
                    onComplete: () => {
                        textgridTL.clear();
                    }
                });

                /* Clear timeline on resize */
                callAfterResize(function() {
                    textgridTL.clear();
                });

                /* Disable timeline and wait for initial reveal animation to enable */
                if(firstSetup === true) {
                    textgridTL.scrollTrigger.disable();
                }



                /* Add animation for headline reveal */
                if(textgrid.querySelector('.js-textgrid-vertical-text-reveal')) {
                    tlTextReveal(textgrid.querySelector('.js-textgrid-vertical-text-reveal'), textgridTL);
                }


                /* Add animation for item reveal */
                if(textgrid.querySelector('.js-textgrid-item')) {
                    let textgridItems = gsap.utils.toArray(textgrid.querySelectorAll('.js-textgrid-item'));

                    gsap.set(textgridItems, {
                        autoAlpha:0,
                        y: "1.5rem"
                    });

                    textgridTL.to(textgridItems, {
                        autoAlpha: 1,
                        y: "0rem",
                        stagger: .2
                    });
                }
            });

            firstSetup = false;
        })();

        /* Resetup grid after resize */
        callAfterResize(setupTextgrids);
    }
}

/* Export init function */
export default {
    init
};