/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-contact-form')) {
        const contactForm = document.querySelector('.js-contact-form');

        /* Intro animations */
        if(contactForm.querySelector('.js-contact-form-intro')) {
            const contactFormIntro = contactForm.querySelector('.js-contact-form-intro');

            /* Setup timeline */
            let timeline = tlSetup(contactFormIntro, contactForm.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for title reveal */
                if(contactForm.querySelector('.js-contact-form-vertical-text-reveal')) {
                    tlTextReveal(contactForm.querySelector('.js-contact-form-vertical-text-reveal'), timeline);
                }
            }

            /* Execute once */
            buildTimeline();


            /* Clear and rebuild timeline on resize (only rebuild if not completed) */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);
            });
        }



        /* Content animations */
        if(contactForm.querySelector('.js-contact-form-content')) {
            const contactFormContent = contactForm.querySelector('.js-contact-form-content');

            /* Setup timeline */
            let timeline = tlSetup(contactFormContent, contactForm.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for form reveal */
                if(contactFormContent.querySelector('.js-contact-form-self')) {
                    tlFadeIn(contactFormContent.querySelector('.js-contact-form-self'), timeline);
                }

                /* Add animation for sidebar reveal */
                if(contactFormContent.querySelector('.js-contact-form-sidebar')) {
                    tlFadeIn(contactFormContent.querySelector('.js-contact-form-sidebar'), timeline);
                }
            }

            /* Execute once */
            buildTimeline();


            /* Set blobity-radius for icons */
            let setBlobityRadius = function() {
                if(contactFormContent.querySelector('.js-contact-form-icon-link')) {
                    const iconLinks = contactFormContent.querySelectorAll('.js-contact-form-icon-link');

                    iconLinks.forEach(iconLink => {
                        iconLink.setAttribute("data-blobity-radius", (iconLink.offsetWidth + 12) / 2);
                    });
                }
            }

            /* Execute once */
            setBlobityRadius();


            /* Clear and rebuild timeline on resize */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);

                setBlobityRadius();
            });
        }
    }
}

/* Export init function */
export default {
    init
};