/* Initialize */
export function init(gsap) {
    const presentationForms = gsap.utils.toArray('.js-presentation-form');

    if (presentationForms.length > 0) {
        presentationForms.forEach(presentationForm => {
            const presentationFormSelf = presentationForm.querySelector('.js-presentation-form-self');
            const firstNameInput = presentationForm.querySelector('.js-presentation-form-first-name');
            const businessInput = presentationForm.querySelector('.js-presentation-form-business');

            /* Submit button behavior (set cookies) */
            presentationFormSelf.addEventListener("submit", () => {
                if (firstNameInput && firstNameInput.value) {
                    document.cookie = `presentationFirstName=${firstNameInput.value}; path=/`;
                }

                if (businessInput && businessInput.value) {
                    document.cookie = `presentationBusiness=${businessInput.value}; path=/`;
                }
            });
        });
    }
}

/* Export init function */
export default {
    init
};
