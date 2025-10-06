/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, createValidHtmlId) {
    const serviceScrollers = gsap.utils.toArray('.js-service-scroller');

    if (serviceScrollers.length > 0) {
        serviceScrollers.forEach(serviceScroller => {
            const sections = serviceScroller.querySelectorAll('.js-service-scroller-section');
            const nav = serviceScroller.querySelector('.js-service-scroller-nav');
            const navItems = serviceScroller.querySelectorAll('.js-service-scroller-nav-list-item-link');
            const navBullet = nav?.querySelector('.js-service-scroller-nav-bullet');
            const navTracker = nav?.querySelector('.js-service-scroller-nav-tracker');

            sections.forEach((section, i) => {
                const sectionInner = section.querySelector('.js-service-scroller-inner');
                const title = section.querySelector('.js-service-scroller-title');
                const text = section.querySelector('.js-service-scroller-text');
                const buttons = section.querySelectorAll('.js-service-scroller-button-wrapper');

                /* Setup timeline */
                let timeline = tlSetup(sectionInner, serviceScroller.dataset.stCount);

                /* Build timeline */
                const buildTimeline = () => {
                    if (title) tlTextReveal(title, timeline);
                    if (text) tlFadeIn(text, timeline);
                    if (buttons.length > 0) tlFadeIn(buttons, timeline);
                };

                buildTimeline();

                /* Clear and rebuild timeline on resize */
                callAfterResize(() => buildTlAfterResize(timeline, buildTimeline));

                /* Add IDs to sections */
                if (title) {
                    const itemID = createValidHtmlId(title.textContent);
                    section.setAttribute('id', itemID);
                    navItems.item(i).setAttribute('data-service-scroller-item', itemID);
                    navItems.item(i).href = `#${itemID}`;
                }

                /* Set active slide logic */
                const setActiveSlide = () => {
                    const activeNavItem = nav.querySelector(`.js-service-scroller-nav-list-item-link[data-service-scroller-item="${section.id}"]`);
                    const navItemHeight = navItems.item(i).offsetHeight;

                    gsap.to(navBullet, {
                        duration: 0.45,
                        y: activeNavItem.offsetTop + (navItemHeight / 2)
                    });

                    gsap.to(navTracker, {
                        duration: 0.45,
                        height: activeNavItem.offsetTop + (navItemHeight / 2)
                    });

                    gsap.set(navItems, {
                        color: (index, target) => (target.getAttribute('data-service-scroller-item') === section.id ? 'inherit' : 'var(--plain-text-color)')
                    });
                };

                /* ScrollTrigger for each section */
                ScrollTrigger.create({
                    trigger: sectionInner,
                    start: "top center",
                    scrub: true,
                    onEnter: setActiveSlide,
                    onEnterBack: setActiveSlide
                });
            });

            /* Navigation pin and fade logic */
            if (nav) {
                ScrollTrigger.create({
                    trigger: serviceScroller,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                    pin: nav,
                    pinSpacing: false
                });

                gsap.to(nav, {
                    scrollTrigger: {
                        trigger: serviceScroller,
                        start: "bottom bottom",
                        end: "bottom center",
                        scrub: true
                    },
                    autoAlpha: 0
                });
            }
        });
    }
}

/* Export init function */
export default {
    init
};