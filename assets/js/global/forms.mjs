/* Initialize */
export function init(gsap, ScrollTrigger, getNextSibling, getPreviousSibling){
    if(document.querySelector('.js-form')) {
        const forms = gsap.utils.toArray('.js-form');

        forms.forEach(form => {
            let formInputs = form.querySelectorAll('input, textarea');

            /* Clear values on load */
            form.reset();

            /* Disable autocomplete on form fields and add basic HTML5 validation */
            formInputs.forEach(formInput => {
                formInput.autocomplete = 'off';
                formInput.setAttribute('autocomplete', 'off');
                formInput.classList.remove("css-is-valid");

                /* Validation */
                formInput.addEventListener('input', function () {
                    if(formInput.checkValidity()) {
                        formInput.classList.add("css-is-valid");

                        const parent = formInput.parentNode;
                        const fieldMessage = parent.querySelector('.js-form-validation-message');

                        gsap.set(fieldMessage, {
                            display: "none",
                            onComplete:() => {
                                fieldMessage.setAttribute('aria-hidden', 'true');
                                ScrollTrigger.refresh();
                            }
                        });
                    } else {
                        formInput.classList.remove("css-is-valid");
                    }
                });
            });


            /* Initially hide all validation messages */
            let validationMessages = form.querySelectorAll('.js-form-validation-message');

            validationMessages.forEach(validationMessage => {
                gsap.set(validationMessage, {
                    display: "none",
                    onComplete:() => {
                        validationMessage.setAttribute('aria-hidden', 'true');
                        ScrollTrigger.refresh();
                    }
                });
            });



            /* Suppress the default bubbles */
            form.addEventListener("invalid", function(e) {
                e.preventDefault();
            }, true);

            /* Support suppressing for shitty browsers */
            form.addEventListener("submit", function(e) {
                if(!this.checkValidity() ) {
                    e.preventDefault();
                }
            });

            /* Add validation logic to click button event */
            let submitButton = form.querySelector('.js-form-submit-button');

            submitButton.addEventListener("click", function() {
                /* Hide existing messages */
                validationMessages.forEach(validationMessage => {
                    gsap.set(validationMessage, {
                        display: "none",
                        onComplete:() => {
                            validationMessage.setAttribute('aria-hidden', 'true');
                            ScrollTrigger.refresh();
                        }
                    });
                });

                /* Loop over invalid fields and display error messages */
                let invalidFields = form.querySelectorAll(':invalid');

                invalidFields.forEach(invalidField => {
                    const parent = invalidField.parentNode;
                    const fieldMessage = parent.querySelector('.js-form-validation-message');

                    gsap.set(fieldMessage, {
                        display: "block",
                        onComplete:() => {
                            fieldMessage.setAttribute('aria-hidden', 'false');
                            ScrollTrigger.refresh();
                        }
                    });
                });

                /* If any errors, focus on first invalid field */
                if (invalidFields.length > 0) {
                    invalidFields[0].focus();
                }
            });
        });
    }


    if(document.querySelector('.js-big-form')) {
        const bigForms = document.querySelectorAll('.js-big-form');

        bigForms.forEach(bigForm => {
            if(bigForm.querySelector('.js-big-form-field')) {
                const bigFormFields = bigForm.querySelectorAll('.js-big-form-field');

                bigFormFields.forEach(bigFormField => {
                    let bigFormFieldText = bigFormField.querySelector('.js-big-form-field-text'),
                        bigFormFieldInput = bigFormField.querySelector('.js-big-form-field-input'),
                        previousBorder = getPreviousSibling(bigFormField, '.js-big-form-border'),
                        nextBorder = getNextSibling(bigFormField, '.js-big-form-border');

                    /* Add hover functionality */
                    bigFormField.addEventListener("mouseenter", function() {
                        if(previousBorder && nextBorder) {
                            previousBorder.classList.add('js-hover');
                            nextBorder.classList.add('js-hover');
                        }
                    });

                    bigFormField.addEventListener("mouseleave", function() {
                        if(previousBorder && nextBorder) {
                            previousBorder.classList.remove('js-hover');
                            nextBorder.classList.remove('js-hover');
                        }
                    });

                    /* Add focus functionality */
                    bigFormFieldInput.addEventListener("focus", function() {
                        bigFormFieldText.classList.add('js-focus');

                        if(previousBorder && nextBorder) {
                            previousBorder.classList.add('js-focus');
                            nextBorder.classList.add('js-focus');
                        }
                    });

                    bigFormFieldInput.addEventListener("focusout", function() {
                        bigFormFieldText.classList.remove('js-focus');

                        if(previousBorder && nextBorder) {
                            previousBorder.classList.remove('js-focus');
                            nextBorder.classList.remove('js-focus');
                        }
                    });



                    /* Validation */
                    bigFormFieldInput.addEventListener('input', function () {
                        if(bigFormFieldInput.nodeName === "TEXTAREA") {
                            gsap.to(bigFormFieldInput, {
                                height: "auto",
                                duration: 0,
                                immediateRender: false
                            });

                            gsap.to(bigFormFieldInput, {
                                height:() => {
                                    return bigFormFieldInput.scrollHeight + 'px';
                                },
                                onComplete:() => {
                                    ScrollTrigger.refresh();
                                },
                                duration: 0,
                                immediateRender: false
                            });
                        }

                        if(bigFormFieldInput.checkValidity()) {
                            bigFormFieldText.classList.add('js-valid');

                            if(previousBorder && nextBorder) {
                                previousBorder.classList.add('js-valid');
                                nextBorder.classList.add('js-valid');
                            }
                        } else {
                            bigFormFieldText.classList.remove('js-valid');

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

/* Export init and unload functions */
export default {
    init
};