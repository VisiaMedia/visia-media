/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, getNextSibling, getPreviousSibling){
    if(document.querySelector('.js-contact-form')) {
        const contactForms = gsap.utils.toArray('.js-contact-form');

        /* Loop over instances */
        contactForms.forEach(contactForm => {

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
        });



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
        });
    }
}

/* Export init function */
export default {
    init
};