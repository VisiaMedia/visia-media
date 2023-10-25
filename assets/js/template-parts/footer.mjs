/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn, blobity){
    if(document.querySelector('.js-footer')) {
        const footer = document.querySelector('.js-footer');

        /* Setup timeline */
        let timeline = tlSetup(footer, footer.dataset.stCount);


        /* Build timeline */
        let buildTimeline = function() {
            /* Animate footer rows */
            if(footer.querySelectorAll('.js-footer-row')) {
                footer.querySelectorAll('.js-footer-row').forEach(footerRow => {
                    tlFadeIn(footerRow, timeline);
                });
            }
        }

        /* Execute once */
        buildTimeline();


        /* Clear and rebuild timeline on resize (only rebuild if not completed) */
        callAfterResize(function() {
            buildTlAfterResize(timeline, buildTimeline);
        });





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



        /* Functionality for Knowledge Base */
        if(footer.querySelector('.js-footer-kb-list')) {
            let knowledgeBaseList = footer.querySelector('.js-footer-kb-list'),
                knowledgeBaseToggle = footer.querySelector('.js-footer-kb-toggle'),
                knowledgeBaseToggleIcon = footer.querySelector('.js-footer-kb-toggle-icon');

            /* Set initial styles */
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


            /* Add event listeners */
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

                                ScrollTrigger.refresh(true);
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

                                ScrollTrigger.refresh(true);
                            }
                        });
                    }
                }
            });
        }
    }
}

/* Export init function */
export default {
    init
};