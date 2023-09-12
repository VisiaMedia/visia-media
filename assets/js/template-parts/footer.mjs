/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlFadeIn, blobity){
    if(document.querySelector('.js-footer')) {

        /* Wrap setup in self starting function */
        let firstSetup = true,
            setupFooters;

        (setupFooters = function(){
            /* Get all statement instances as array */
            const footers = gsap.utils.toArray('.js-footer');

            /* Loop over footer instances */
            footers.forEach(footer => {
                let footerRows = footer.querySelectorAll('.js-footer-row');

                /* Setup timeline for various animations */
                let footerTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: footer,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: footer.dataset.stCount
                    },
                    onComplete: () => {
                        footerTL.clear();
                    }
                });

                /* Clear timeline on resize */
                callAfterResize(function() {
                    footerTL.clear();
                });

                /* Disable timeline and wait for initial reveal animation to enable */
                if(firstSetup === true) {
                    footerTL.scrollTrigger.disable();
                }

                /* Fade in rows one by one */
                footerRows.forEach(footerRow => {
                    tlFadeIn(footerRow, footerTL);
                });



                /* Check if footer has knowledgebase */
                if(footer.querySelector('.js-footer-kb-list')) {
                    let knowledgeBaseList = footer.querySelector('.js-footer-kb-list'),
                        knowledgeBaseToggleIcon = footer.querySelector('.js-footer-kb-toggle-icon');

                    if(window.outerWidth <= 600) {
                        gsap.set(knowledgeBaseToggleIcon, {
                            rotate:0
                        });

                        gsap.set(knowledgeBaseList, {
                            height:0,
                            onComplete:() => {
                                knowledgeBaseList.classList.remove('js-is-visible');
                                knowledgeBaseList.classList.add('js-is-hidden');
                            }
                        });
                    } else {
                        gsap.set(knowledgeBaseList, {
                            height:'auto',
                            onComplete:() => {
                                knowledgeBaseList.classList.remove('js-is-visible');
                                knowledgeBaseList.classList.remove('js-is-hidden');
                            }
                        });
                    }
                }
            });

            firstSetup = false;
        })();

        /* Resetup headers after resize */
        callAfterResize(setupFooters);



        /* Remove blobity on logo hover */
        if(document.querySelector('.js-footer-logo')) {
            const footerLogo = document.querySelector('.js-footer-logo');

            footerLogo.addEventListener("mouseenter", function() {
                blobity.updateOptions({
                    opacity: 0
                });
            });

            footerLogo.addEventListener("mouseleave", function() {
                blobity.updateOptions({
                    opacity:0.1
                });
            });
        }



        /* Add event listener for knowledge base toggle */
        const footers = gsap.utils.toArray('.js-footer');

        footers.forEach(footer => {
            if(footer.querySelector('.js-footer-kb-list')) {
                let knowledgeBaseList = footer.querySelector('.js-footer-kb-list'),
                    knowledgeBaseToggle = footer.querySelector('.js-footer-kb-toggle'),
                    knowledgeBaseToggleIcon = footer.querySelector('.js-footer-kb-toggle-icon');

                knowledgeBaseToggle.addEventListener("click", function(event) {
                    if(window.outerWidth <= 600) {
                        if(knowledgeBaseList.classList.contains('js-is-visible')) {
                            gsap.set(knowledgeBaseToggleIcon, {
                                rotate: 0
                            });

                            gsap.to(knowledgeBaseList, {
                                height:0,
                                onComplete:() => {
                                    knowledgeBaseList.classList.remove('js-is-visible');
                                    knowledgeBaseList.classList.add('js-is-hidden');
                                }
                            });
                        } else {
                            gsap.set(knowledgeBaseToggleIcon, {
                                rotate: 180
                            });

                            gsap.to(knowledgeBaseList, {
                                height:'auto',
                                onComplete:() => {
                                    knowledgeBaseList.classList.remove('js-is-hidden');
                                    knowledgeBaseList.classList.add('js-is-visible');
                                }
                            });
                        }
                    }
                });
            }
        });
    }
}

/* Export init function */
export default {
    init
};