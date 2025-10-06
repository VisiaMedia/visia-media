/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn) {
    const teamSections = gsap.utils.toArray('.js-team');

    if (teamSections.length > 0) {
        /* Loop over instances */
        teamSections.forEach(teamSection => {
            const verticalTextReveal = teamSection.querySelector('.js-team-vertical-text-reveal');
            const teamMembers = teamSection.querySelectorAll('.js-team-member');

            /* Setup timeline */
            let timeline = tlSetup(teamSection, teamSection.dataset.stCount);

            /* Build timeline */
            const buildTimeline = () => {
                if (verticalTextReveal) {
                    tlTextReveal(verticalTextReveal, timeline);
                }
                if (teamMembers.length > 0) {
                    tlFadeIn(teamMembers, timeline);
                }
            };

            buildTimeline(); // Execute once

            /* Clear and rebuild timeline on resize */
            callAfterResize(() => buildTlAfterResize(timeline, buildTimeline));
        });
    }
}

/* Export init function */
export default {
    init
};