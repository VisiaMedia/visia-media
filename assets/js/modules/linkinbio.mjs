/* Initialize */
export function init(gsap, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn) {
    const linkInBio = document.querySelector('.js-link-in-bio');

    if (linkInBio) {
        let timeline = tlSetup(linkInBio, linkInBio.dataset.stCount);

        /* Build timeline */
        const buildTimeline = () => {
            const items = linkInBio.querySelectorAll('.js-item');
            if (items.length > 0) {
                tlFadeIn(items, timeline);
            }
        };

        buildTimeline(); // Execute once

        /* Clear and rebuild timeline on resize */
        callAfterResize(() => {
            buildTlAfterResize(timeline, buildTimeline);
        });
    }
}

/* Export init function */
export default {
    init
};