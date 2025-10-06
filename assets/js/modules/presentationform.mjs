/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn) {
    const presentationForms = gsap.utils.toArray('.js-presentation-form');

    if (presentationForms.length > 0) {
        presentationForms.forEach(presentationForm => {
            const presentationFormSelf = presentationForm.querySelector('.js-presentation-form-self');
            const firstNameInput = presentationForm.querySelector('.js-presentation-form-first-name');
            const businessInput = presentationForm.querySelector('.js-presentation-form-business');

            /* Intro animations */
            const presentationFormIntro = presentationForm.querySelector('.js-presentation-form-intro');
            if (presentationFormIntro) {
                const verticalTextReveal = presentationForm.querySelector('.js-presentation-form-vertical-text-reveal');
                let timelineIntro = tlSetup(presentationFormIntro, presentationForm.dataset.stCount);

                const buildIntroTimeline = () => {
                    if (verticalTextReveal) {
                        tlTextReveal(verticalTextReveal, timelineIntro);
                    }
                };

                buildIntroTimeline(); // Execute once

                /* Clear and rebuild intro timeline on resize */
                callAfterResize(() => buildTlAfterResize(timelineIntro, buildIntroTimeline));
            }

            /* Content animations */
            const presentationFormContent = presentationForm.querySelector('.js-presentation-form-content');
            if (presentationFormContent) {
                let timelineContent = tlSetup(presentationFormContent, presentationForm.dataset.stCount);

                const buildContentTimeline = () => {
                    tlFadeIn(presentationFormSelf, timelineContent);
                };

                buildContentTimeline(); // Execute once

                /* Clear and rebuild content timeline on resize */
                callAfterResize(() => buildTlAfterResize(timelineContent, buildContentTimeline));
            }

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