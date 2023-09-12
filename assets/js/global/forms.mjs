/* Initialize */
export function init(gsap, blobity){
    if(document.querySelector('.js-form')) {
        /* Get all form instances as array */
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
                    } else {
                        formInput.classList.remove("css-is-valid");
                    }
                });
            });

            /* Add event listeners for simple buttons */
            if(form.querySelector('.js-form-submit-button-simple')) {
                const formSubmitButtonSimple = form.querySelector('.js-form-submit-button-simple'),
                    formSubmitButtonOutline = formSubmitButtonSimple.querySelector('.js-form-submit-button-simple-outline');

                formSubmitButtonSimple.addEventListener("mouseenter", function() {
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
                formSubmitButtonSimple.addEventListener("mouseleave", function() {
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

/* Export init and unload functions */
export default {
    init
};