export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-presentation-form')) {
        const presentationForms = gsap.utils.toArray('.js-presentation-form');

        /* Loop over instances */
        presentationForms.forEach(presentationForm => {
            const presentationFormSelf = presentationForm.querySelector('.js-presentation-form-self');

            /* Intro animations */
            if(presentationForm.querySelector('.js-presentation-form-intro')) {
                const presentationFormIntro = presentationForm.querySelector('.js-presentation-form-intro');

                /* Setup timeline */
                let timeline = tlSetup(presentationFormIntro, presentationForm.dataset.stCount);


                /* Build timeline */
                let buildTimeline = function() {
                    /* Add animation for title reveal */
                    if(presentationForm.querySelector('.js-presentation-form-vertical-text-reveal')) {
                        tlTextReveal(presentationForm.querySelector('.js-presentation-form-vertical-text-reveal'), timeline);
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
            if(presentationForm.querySelector('.js-presentation-form-content')) {
                const presentationFormContent = presentationForm.querySelector('.js-presentation-form-content');

                /* Setup timeline */
                let timeline = tlSetup(presentationFormContent, presentationForm.dataset.stCount);


                /* Build timeline */
                let buildTimeline = function() {
                    tlFadeIn(presentationFormSelf, timeline);
                }

                /* Execute once */
                buildTimeline();


                /* Clear and rebuild timeline on resize */
                callAfterResize(function() {
                    buildTlAfterResize(timeline, buildTimeline);
                });

            }



            /* Submit button behavior (set cookies) */
            presentationFormSelf.addEventListener("submit", function() {
                if(presentationForm.querySelector('.js-presentation-form-first-name').value) {
                    document.cookie = 'presentationFirstName='+presentationForm.querySelector('.js-presentation-form-first-name').value+'; path=/';
                }

                if(presentationForm.querySelector('.js-presentation-form-business').value) {
                    document.cookie = 'presentationBusiness='+presentationForm.querySelector('.js-presentation-form-business').value+'; path=/';
                }
            });
        });
    }
}

/* Export init function */
export default {
    init
};