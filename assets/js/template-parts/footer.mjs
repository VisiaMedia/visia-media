/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn, blobity) {
    const footer = document.querySelector('.js-footer');

    if (footer) {
        const footerRows = footer.querySelectorAll('.js-footer-row');
        const footerLogos = footer.querySelectorAll('.js-footer-logo');
        const knowledgeBaseList = footer.querySelector('.js-footer-kb-list');
        const knowledgeBaseToggle = footer.querySelector('.js-footer-kb-toggle');
        const knowledgeBaseToggleIcon = footer.querySelector('.js-footer-kb-toggle-icon');

        /* Setup timeline */
        let timeline = tlSetup(footer, footer.dataset.stCount);

        /* Build timeline */
        const buildTimeline = () => {
            footerRows.forEach(footerRow => {
                tlFadeIn(footerRow, timeline);
            });
        };

        /* Execute once */
        buildTimeline();

        /* Clear and rebuild timeline on resize */
        callAfterResize(() => buildTlAfterResize(timeline, buildTimeline));

        /* Remove blobity on logo hover */
        footerLogos.forEach(footerLogo => {
            if(blobity) {
                footerLogo.addEventListener("mouseenter", () => blobity.updateOptions({opacity: 0}));
                footerLogo.addEventListener("mouseleave", () => blobity.updateOptions({opacity: 0.1}));
            }
        });

        /* Knowledge Base functionality */
        const knowledgeBaseSetup = () => {
            if (window.outerWidth <= 600) {
                gsap.set(knowledgeBaseToggleIcon, { rotate: 0 });
                gsap.set(knowledgeBaseList, { height: 0, immediateRender: false });
                knowledgeBaseList.classList.remove('js-is-visible');
                knowledgeBaseList.classList.add('js-is-hidden');
            } else {
                gsap.set(knowledgeBaseList, { height: 'auto', immediateRender: false });
                knowledgeBaseList.classList.remove('js-is-visible', 'js-is-hidden');
            }
        };

        /* Execute once */
        knowledgeBaseSetup();

        /* Re-execute on resize */
        callAfterResize(knowledgeBaseSetup);

        /* Toggle Knowledge Base on click */
        knowledgeBaseToggle.addEventListener("click", () => {
            const isVisible = knowledgeBaseList.classList.contains('js-is-visible');
            gsap.to(knowledgeBaseList, {
                height: isVisible ? 0 : 'auto',
                onComplete: () => {
                    knowledgeBaseList.classList.toggle('js-is-visible', !isVisible);
                    knowledgeBaseList.classList.toggle('js-is-hidden', isVisible);
                    gsap.to(knowledgeBaseToggleIcon, { rotate: isVisible ? 0 : 180 });
                    ScrollTrigger.refresh(true);
                }
            });
        });
    }
}

/* Export init function */
export default {
    init
};