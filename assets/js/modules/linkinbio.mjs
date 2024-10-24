/* Initialize */
export function init(gsap, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn){
    if(document.querySelector('.js-link-in-bio')) {
        const linkInBio = document.querySelector('.js-link-in-bio');
        let timeline = tlSetup(linkInBio, linkInBio.dataset.stCount);

        /* Build timeline */
        let buildTimeline = function() {
            /* Add animation for item reveal */
            if(linkInBio.querySelector('.js-item')) {
                tlFadeIn(linkInBio.querySelectorAll('.js-item'), timeline);
            }
        }

        /* Execute once */
        buildTimeline();


        /* Clear and rebuild timeline on resize (only rebuild if not completed) */
        callAfterResize(function() {
            buildTlAfterResize(timeline, buildTimeline);
        });
    }
}

/* Export init function */
export default {
    init
};