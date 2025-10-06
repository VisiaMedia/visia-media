/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn) {
    const contactForm = document.querySelector('.js-contact-form');

    if (contactForm) {
        /* Intro animations */
        const contactFormIntro = contactForm.querySelector('.js-contact-form-intro');
        if (contactFormIntro) {
            let timelineIntro = tlSetup(contactFormIntro, contactForm.dataset.stCount);

            /* Build intro timeline */
            const buildIntroTimeline = () => {
                const verticalTextReveal = contactFormIntro.querySelector('.js-contact-form-vertical-text-reveal');
                if (verticalTextReveal) {
                    tlTextReveal(verticalTextReveal, timelineIntro);
                }
            };

            buildIntroTimeline(); // Execute once

            /* Clear and rebuild timeline on resize */
            callAfterResize(() => buildTlAfterResize(timelineIntro, buildIntroTimeline));
        }

        /* Content animations */
        const contactFormContent = contactForm.querySelector('.js-contact-form-content');
        if (contactFormContent) {
            let timelineContent = tlSetup(contactFormContent, contactForm.dataset.stCount);

            /* Build content timeline */
            const buildContentTimeline = () => {
                const formSelf = contactFormContent.querySelector('.js-contact-form-self');
                const formSidebar = contactFormContent.querySelector('.js-contact-form-sidebar');

                if (formSelf) tlFadeIn(formSelf, timelineContent);
                if (formSidebar) tlFadeIn(formSidebar, timelineContent);
            };

            buildContentTimeline(); // Execute once

            /* Set blobity-radius for icons */
            const setBlobityRadius = () => {
                const iconLinks = contactFormContent.querySelectorAll('.js-contact-form-icon-link');
                iconLinks.forEach(iconLink => {
                    iconLink.setAttribute("data-blobity-radius", (iconLink.offsetWidth + 12) / 2);
                });
            };

            setBlobityRadius(); // Execute once

            /* Clear and rebuild content timeline on resize */
            callAfterResize(() => {
                buildTlAfterResize(timelineContent, buildContentTimeline);
                setBlobityRadius();
            });
        }
    }
}

/* Export init function */
export default {
    init
};