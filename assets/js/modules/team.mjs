/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-team')) {
        const teamSections = gsap.utils.toArray('.js-team');

        /* Loop over instances */
        teamSections.forEach(teamSection => {
            let timeline = tlSetup(teamSection, teamSection.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(teamSection.querySelector('.js-team-vertical-text-reveal')) {
                    tlTextReveal(teamSection.querySelector('.js-team-vertical-text-reveal'), timeline);
                }

                /* Add animation for item reveal */
                if(teamSection.querySelector('.js-team-member')) {
                    tlFadeIn(teamSection.querySelectorAll('.js-team-member'), timeline);
                }
            }

            /* Execute once */
            buildTimeline();


            /* Clear and rebuild timeline on resize (only rebuild if not completed) */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);
            });
        });
    }
}

/* Export init function */
export default {
    init
}