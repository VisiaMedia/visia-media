/* Initialize */
export function init(gsap, callAfterResize) {
    const contactForm = document.querySelector('.js-contact-form');

    if (contactForm) {
        const contactFormContent = contactForm.querySelector('.js-contact-form-content');
        if (contactFormContent) {
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
                setBlobityRadius();
            });
        }
    }
}

/* Export init function */
export default {
    init
};
