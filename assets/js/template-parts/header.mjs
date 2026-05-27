/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn) {
    const header = document.querySelector('.js-header');

    if (header) {
        const headerTitle = header.querySelector('.js-header-title');
        const headerButtonWrapper = header.querySelector('.js-header-button-wrapper');
        const headerCaseMeta = header.querySelector('.js-header-case-meta');
        const headerUsps = header.querySelector('.js-header-usps');
        const headerUspsUsps = header.querySelectorAll('.js-header-usps-usp');

        /* Setup timeline */
        let timeline = tlSetup(header, header.dataset.stCount);

        /* Build timeline */
        const buildTimeline = () => {
            if (headerTitle) tlFadeIn(headerTitle, timeline);
            if (headerButtonWrapper) tlFadeIn(headerButtonWrapper, timeline);
            if (headerCaseMeta) tlFadeIn(headerCaseMeta, timeline);

            /* Add animation for USPs reveal */
            if (headerUsps) {
                headerUspsUsps.forEach((headerUspsUsp, i) => {
                    const timelinePosition = i === 0 ? timeline.totalDuration() : ">-0.065";
                    const headerUspsUspValue = headerUspsUsp.querySelector('.js-header-usps-usp-value');

                    gsap.set(headerUspsUsp, { autoAlpha: 0, immediateRender: true });

                    timeline.to(headerUspsUsp, {
                        autoAlpha: 1,
                        onStart: () => {
                            if (headerUspsUspValue) {
                                gsap.from(headerUspsUspValue, {
                                    textContent: 0,
                                    duration: 1,
                                    ease: "none",
                                    snap: { textContent: 1 }
                                });
                            }
                        }
                    }, timelinePosition);
                });
            }
        };

        /* Execute once */
        buildTimeline();

        /* Clear and rebuild timeline on resize */
        callAfterResize(() => buildTlAfterResize(timeline, buildTimeline));

        /* Setup ScrollTrigger for fading out USPs */
        if (headerUsps) {
            gsap.to(headerUsps, {
                scrollTrigger: {
                    trigger: header,
                    start: "top top",
                    end: '+=50%',
                    invalidateOnRefresh: true,
                    scrub: 1,
                    refreshPriority: headerUsps.dataset.stCount
                },
                autoAlpha: 0
            });
        }
    }
}

/* Export init function */
export default {
    init
};
