/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, createValidHtmlId){
    if(document.querySelector('.js-service-scroller')) {
        /* Get all instances as array */
        const serviceScrollers = gsap.utils.toArray('.js-service-scroller');

        /* Loop over instances */
        serviceScrollers.forEach(serviceScroller => {
            const sections = serviceScroller.querySelectorAll('.js-service-scroller-section');

            /* Loop over sections */
            sections.forEach(function(section, i) {
                const sectionInner = section.querySelector('.js-service-scroller-inner');

                /* Setup timeline */
                let timeline = tlSetup(sectionInner, serviceScroller.dataset.stCount);


                /* Build timeline */
                let buildTimeline = function() {
                    /* Add animation for headline reveal */
                    if(section.querySelector('.js-service-scroller-title')) {
                        tlTextReveal(section.querySelector('.js-service-scroller-title'), timeline);
                    }

                    /* Add animation for content reveal */
                    if(section.querySelector('.js-service-scroller-text')) {
                        tlFadeIn(section.querySelector('.js-service-scroller-text'), timeline);
                    }

                    /* Add animation for button reveal (one by one) */
                    if(section.querySelector('.js-service-scroller-button-wrapper')) {
                        const sectionButtons = section.querySelectorAll('.js-service-scroller-button-wrapper');

                        gsap.set(sectionButtons, {
                            autoAlpha: 0,
                            y: "1.5rem",
                            immediateRender: true
                        });

                        timeline.to(sectionButtons, {
                            autoAlpha: 1,
                            y: "0rem",
                            stagger: .2
                        });
                    }
                }

                /* Execute once */
                buildTimeline();


                /* Clear and rebuild timeline on resize (only rebuild if not completed) */
                callAfterResize(function() {
                    buildTlAfterResize(timeline, buildTimeline);
                });




                /* Add IDs to specific sections and items */
                if(section.querySelector('.js-service-scroller-title')) {
                    /* Section */
                    let sectionTitle = section.querySelector('.js-service-scroller-title'),
                        sectionTitleText = sectionTitle.textContent,
                        itemID = createValidHtmlId(sectionTitleText);

                    /* Set section ID */
                    section.setAttribute('id', itemID);


                    /* Navigation */
                    const navItems = serviceScroller.querySelectorAll('.js-service-scroller-nav-list-item-link');

                    /* Set item attributes */
                    navItems.item(i).setAttribute('data-service-scroller-item', itemID);
                    navItems.item(i).href = '#'+itemID;
                }
            });




            /* Add logic for navigation */
            if(serviceScroller.querySelector('.js-service-scroller-nav')) {
                const nav = serviceScroller.querySelector('.js-service-scroller-nav');

                /* Setup scrollTrigger */
                ScrollTrigger.create({
                    trigger: serviceScroller,
                    start: "top top",
                    end: "bottom bottom",
                    invalidateOnRefresh: true,
                    refreshPriority: serviceScroller.dataset.stCount,
                    scrub: true,
                    pin: nav,
                    pinSpacing: false
                });

                /* Fade out navigational element */
                gsap.to(nav, {
                    scrollTrigger: {
                        trigger: serviceScroller,
                        start: "bottom bottom",
                        end: 'bottom center',
                        scrub: true,
                        refreshPriority: serviceScroller.dataset.stCount
                    },
                    autoAlpha: 0
                });

                /* Move tracker and bullet */
                sections.forEach(section => {
                    const sectionInner = section.querySelector('.js-service-scroller-inner');

                    function setActiveSlide() {
                        const navBullet = nav.querySelector('.js-service-scroller-nav-bullet');
                        const navTracker = nav.querySelector('.js-service-scroller-nav-tracker');
                        const navItem = nav.querySelector('.js-service-scroller-nav-list-item-link');
                        const navItems = nav.querySelectorAll('.js-service-scroller-nav-list-item-link');

                        /* Slide bullet */
                        gsap.to(navBullet, {
                            duration: .45,
                            immediateRender:false,
                            y: () => {
                                return nav.querySelector('.js-service-scroller-nav-list-item-link[data-service-scroller-item="'+section.id+'"]').offsetTop + (navItem.offsetHeight / 2);
                            }
                        });

                        /* Grow tracker */
                        gsap.to(navTracker, {
                            duration: .45,
                            immediateRender:false,
                            height: () => {
                                return nav.querySelector('.js-service-scroller-nav-list-item-link[data-service-scroller-item="'+section.id+'"]').offsetTop + (navItem.offsetHeight / 2);
                            }
                        });

                        /* Set active item */
                        gsap.set(navItems, {
                            color: (index, target) => {
                                if(target.getAttribute('data-service-scroller-item') === section.id) {
                                    return 'inherit';
                                } else {
                                    return 'var(--plain-text-color)'
                                }
                            },
                            duration:0,
                            immediateRender: false
                        });
                    }

                    /* Create scrolltrigger */
                    ScrollTrigger.create({
                        trigger: sectionInner,
                        start: "top center",
                        scrub: true,
                        onEnter:() => {
                            setActiveSlide();
                        },
                        onEnterBack:() => {
                            setActiveSlide();
                        }
                    });
                });
            }
        });
    }
}

/* Export init function */
export default {
    init
};