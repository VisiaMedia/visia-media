/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal){
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
                    const teamMembers = teamSection.querySelectorAll('.js-team-member');

                    gsap.set(teamMembers, {
                        autoAlpha: 0,
                        y: "1.5rem",
                        immediateRender: true
                    });

                    timeline.to(teamMembers, {
                        autoAlpha: 1,
                        y: "0rem",
                        stagger: .2,
                    });
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