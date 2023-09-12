/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-statement')) {

        /* Wrap setup in self starting function */
        let firstSetup = true,
            setupStatements;

        (setupStatements = function(){
            /* Get all statement instances as array */
            const statements = gsap.utils.toArray('.js-statement');

            /* Loop over statement instances */
            statements.forEach(statement => {

                /* Setup timeline for various animations */
                let statementTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: statement,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: statement.dataset.stCount
                    },
                    onComplete: () => {
                        statementTl.clear();
                    }
                });

                /* Clear timeline on resize */
                callAfterResize(function() {
                    statementTl.clear();
                });

                /* Disable timeline and wait for initial reveal animation to enable */
                if(firstSetup === true) {
                    statementTl.scrollTrigger.disable();
                }



                /* Add animation for title reveal */
                if(statement.querySelector('.js-statement-title')) {
                    tlFadeIn(statement.querySelector('.js-statement-title'), statementTl);
                }


                /* Add animation for headline reveal */
                if(statement.querySelector('.js-statement-vertical-text-reveal')) {
                    tlTextReveal(statement.querySelector('.js-statement-vertical-text-reveal'), statementTl);
                }


                /* Add animation for button reveal */
                if (statement.querySelector('.js-statement-button-wrapper')) {
                    tlFadeIn(statement.querySelector('.js-statement-button-wrapper'), statementTl);
                }
            });

            firstSetup = false;
        })();

        /* Resetup statements after resize */
        callAfterResize(setupStatements);
    }
}

/* Export init function */
export default {
    init
};