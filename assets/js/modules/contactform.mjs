/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn, getNextSibling, getPreviousSibling, blobity){
    if(document.querySelector('.js-contact-form')) {
        const contactForms = gsap.utils.toArray('.js-contact-form');

        let firstSetup = true,
            setupContactForm;

        (setupContactForm = function(){
            /* Loop over contact form instances */
            contactForms.forEach(contactForm => {

                /* Add intro animation */
                if(contactForm.querySelector('.js-contact-form-intro')) {
                    const contactFormIntro = contactForm.querySelector('.js-contact-form-intro');

                    /* Setup timeline for intro animation */
                    let contactFormIntroTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: contactFormIntro,
                            start: "top center",
                            once: true,
                            invalidateOnRefresh: true,
                            refreshPriority: contactForm.dataset.stCount
                        },
                        onComplete: () => {
                            contactFormIntroTl.clear();
                        }
                    });

                    /* Clear timeline on resize */
                    callAfterResize(function() {
                        contactFormIntroTl.clear();
                    });

                    /* Disable scrolltrigger and wait for initial reveal animation to enable */
                    if(firstSetup === true) {
                        contactFormIntroTl.scrollTrigger.disable();
                    }

                    /* Add animation for title reveal */
                    if(contactForm.querySelector('.js-contact-form-vertical-text-reveal')) {
                        tlTextReveal(contactForm.querySelector('.js-contact-form-vertical-text-reveal'), contactFormIntroTl);
                    }
                }


                /* Add content animation */
                if(contactForm.querySelector('.js-contact-form-content')) {
                    const contactFormContent = contactForm.querySelector('.js-contact-form-content');

                    /* Setup timeline for animation */
                    let contactFormContentTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: contactFormContent,
                            start: "top center",
                            once: true,
                            invalidateOnRefresh: true,
                            refreshPriority: contactForm.dataset.stCount
                        },
                        onComplete: () => {
                            contactFormContentTl.clear();
                        }
                    });

                    /* Clear timeline on resize */
                    callAfterResize(function() {
                        contactFormContentTl.clear();
                    });

                    /* Disable scrolltrigger and wait for initial reveal animation to enable */
                    if(firstSetup === true) {
                        contactFormContentTl.scrollTrigger.disable();
                    }

                    /* Add animation for form reveal */
                    if(contactFormContent.querySelector('.js-contact-form-self')) {
                        tlFadeIn(contactFormContent.querySelector('.js-contact-form-self'), contactFormContentTl);
                    }

                    /* Add animation for sidebar reveal */
                    if(contactFormContent.querySelector('.js-contact-form-sidebar')) {
                        tlFadeIn(contactFormContent.querySelector('.js-contact-form-sidebar'), contactFormContentTl);
                    }


                    /* Set blobity radius for hovering icon links */
                    if(contactFormContent.querySelector('.js-contact-form-icon-link')) {
                        const iconLinks = contactFormContent.querySelectorAll('.js-contact-form-icon-link');

                        iconLinks.forEach(iconLink => {
                            iconLink.setAttribute("data-blobity-radius", (iconLink.offsetWidth + 12) / 2);
                        });
                    }
                }
            });

            firstSetup = false;
        })();

        /* Resetup section after resize */
        callAfterResize(setupContactForm);



        /* Adding fields functionality and animations */
        contactForms.forEach(contactForm => {
            if(contactForm.querySelector('.js-contact-form-field')) {
                const contactFormFields = contactForm.querySelectorAll('.js-contact-form-field');

                contactFormFields.forEach(contactFormField => {
                    let contactFormFieldText = contactFormField.querySelector('.js-contact-form-field-text'),
                        contactFormFieldInput = contactFormField.querySelector('.js-contact-form-field-input'),
                        previousBorder = getPreviousSibling(contactFormField, '.js-contact-form-border'),
                        nextBorder = getNextSibling(contactFormField, '.js-contact-form-border');

                    /* Add hover functionality */
                    contactFormField.addEventListener("mouseenter", function() {
                        if(previousBorder && nextBorder) {
                            previousBorder.classList.add('js-hover');
                            nextBorder.classList.add('js-hover');
                        }
                    });

                    contactFormField.addEventListener("mouseleave", function() {
                        if(previousBorder && nextBorder) {
                            previousBorder.classList.remove('js-hover');
                            nextBorder.classList.remove('js-hover');
                        }
                    });

                    /* Add focus functionality */
                    contactFormFieldInput.addEventListener("focus", function() {
                        contactFormFieldText.classList.add('js-focus');

                        if(previousBorder && nextBorder) {
                            previousBorder.classList.add('js-focus');
                            nextBorder.classList.add('js-focus');
                        }
                    });

                    contactFormFieldInput.addEventListener("focusout", function() {
                        contactFormFieldText.classList.remove('js-focus');

                        if(previousBorder && nextBorder) {
                            previousBorder.classList.remove('js-focus');
                            nextBorder.classList.remove('js-focus');
                        }
                    });



                    /* Validation */
                    contactFormFieldInput.addEventListener('input', function () {
                        if(contactFormFieldInput.nodeName === "TEXTAREA") {
                            gsap.to(contactFormFieldInput, {
                                height: "auto",
                                duration: 0,
                                immediateRender: false
                            });

                            gsap.to(contactFormFieldInput, {
                                height:() => {
                                    return contactFormFieldInput.scrollHeight + 'px';
                                },
                                onComplete:() => {
                                    ScrollTrigger.refresh();
                                },
                                duration: 0,
                                immediateRender: false
                            });
                        }

                        if(contactFormFieldInput.checkValidity()) {
                            contactFormFieldText.classList.add('js-valid');

                            if(previousBorder && nextBorder) {
                                previousBorder.classList.add('js-valid');
                                nextBorder.classList.add('js-valid');
                            }
                        } else {
                            contactFormFieldText.classList.remove('js-valid');

                            if(previousBorder && nextBorder) {
                                previousBorder.classList.remove('js-valid');
                                nextBorder.classList.remove('js-valid');
                            }
                        }
                    });
                });
            }

            /* Add event listeners for button */
            if(contactForm.querySelector('.js-contact-form-button')) {
                const formSubmitButton = contactForm.querySelector('.js-contact-form-button'),
                    formSubmitButtonOutline = contactForm.querySelector('.js-contact-form-button-outline');

                formSubmitButton.addEventListener("mouseenter", function() {
                    if(window.matchMedia("(pointer: fine)").matches) {
                        blobity.updateOptions({
                            opacity: 0
                        });

                        /* Show outline */
                        gsap.to(formSubmitButtonOutline, {
                            duration:.225,
                            inset: '-8px'
                        });
                    }
                });

                formSubmitButton.addEventListener("mouseleave", function() {
                    if(window.matchMedia("(pointer: fine)").matches) {
                        blobity.updateOptions({
                            opacity:0.1
                        });

                        /* Hide outline */
                        gsap.to(formSubmitButtonOutline, {
                            duration:.225,
                            inset: '0px'
                        });
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