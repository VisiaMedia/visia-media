/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal){
    if(document.querySelector('.js-team')) {

        /* Get all team instances as array */
        const teamSections = gsap.utils.toArray('.js-team');

        /* Loop over team instances */
        teamSections.forEach(teamSection => {

            /* Wrap setup in self starting function */
            let firstSetup = true,
                setupTeams;

            (setupTeams = function(){
                /* Setup timeline for various animations */
                let teamTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: teamSection,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: teamSection.dataset.stCount
                    },
                    onComplete: () => {
                        teamTl.clear();
                    }
                });

                /* Clear timeline on resize */
                callAfterResize(function() {
                    teamTl.clear();
                });

                /* Disable timeline and wait for initial reveal animation to enable */
                if(firstSetup === true) {
                    teamTl.scrollTrigger.disable();
                }


                /* Add animation for headline reveal */
                if(teamSection.querySelector('.js-team-vertical-text-reveal')) {
                    tlTextReveal(teamSection.querySelector('.js-team-vertical-text-reveal'), teamTl);
                }

                /* Add animation for item reveal */
                if(teamSection.querySelector('.js-team-member')) {
                    let teamItems = gsap.utils.toArray(teamSection.querySelectorAll('.js-team-member'));

                    gsap.set(teamItems, {
                        autoAlpha:0,
                        y: "1.5rem"
                    });

                    teamTl.to(teamItems, {
                        autoAlpha: 1,
                        y: "0rem",
                        stagger: .2
                    })
                }

                firstSetup = false;
            })();

            /* Resetup grid after resize */
            callAfterResize(setupTeams);
        });
    }
}

/* Export init function */
export default {
    init
};