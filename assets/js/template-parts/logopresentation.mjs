/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn) {
    if (document.querySelector('.js-logo-presentation')) {
        const logoPresentations = document.querySelectorAll('.js-logo-presentation');

        logoPresentations.forEach(logoPresentation => {
            const title = logoPresentation.querySelector('.js-title');
            const intro = logoPresentation.querySelector('.js-intro');
            const items = logoPresentation.querySelectorAll('.js-item');
            const signs = logoPresentation.querySelectorAll('.js-item-sign');

            let timeline = tlSetup(logoPresentation, logoPresentation.dataset.stCount);

            /* Build timeline */
            let buildTimeline = function() {
                /* Animate title */
                if (title) {
                    tlTextReveal(title, timeline);
                }

                /* Animate intro */
                if (intro) {
                    tlFadeIn(intro, timeline);
                }

                /* Animate items */
                if (items.length > 0) {
                    gsap.set(items, { autoAlpha: 0 });

                    timeline.to(items, {
                        autoAlpha: 1,
                        stagger: 0.2
                    });
                }

                /* Animate signs */
                if (signs.length > 0) {
                    gsap.set(signs, { autoAlpha: 0 });

                    timeline.to(signs, {
                        autoAlpha: 1
                    });
                }
            };

            /* Execute once */
            buildTimeline();

            /* Clear and rebuild timeline on resize */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);
            });
        });
    }
}

/* Export init function */
export default {
    init
};
