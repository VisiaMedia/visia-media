/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn){
    if (document.querySelector('.js-header')) {

        /* Wrap setup in self starting function */
        let firstSetup = true,
            setupHeaders;

        (setupHeaders = function(){
            /* Get all statement instances as array */
            const headers = gsap.utils.toArray('.js-header');

            /* Loop over header instances */
            headers.forEach(header => {

                /* Setup timeline for various animations */
                let headerTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: header,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: header.dataset.stCount
                    },
                    onComplete: () => {
                        headerTl.clear();
                    }
                });

                /* Clear timeline on resize */
                callAfterResize(function() {
                    headerTl.clear();
                });

                /* Disable scrolltrigger and wait for initial reveal animation to enable */
                if(firstSetup === true) {
                    headerTl.scrollTrigger.disable();
                }


                /* Add animation for title reveal */
                if(header.querySelector('.js-header-title')) {
                    tlFadeIn(header.querySelector('.js-header-title'), headerTl)
                }


                /* Add animation for headline reveal */
                if(header.querySelector('.js-header-vertical-text-reveal')) {
                    tlTextReveal(header.querySelector('.js-header-vertical-text-reveal'), headerTl);
                }


                /* Add animation for button reveal */
                if(header.querySelector('.js-header-button-wrapper')) {
                    tlFadeIn(header.querySelector('.js-header-button-wrapper'), headerTl)
                }


                /* Add animation for USPs reveal */
                if(header.querySelector('.js-header-usps')) {
                    const headerUsps = header.querySelector('.js-header-usps'),
                        headerUspsUsps = header.querySelectorAll('.js-header-usps-usp');

                    headerUspsUsps.forEach(headerUspsUsp => {
                        gsap.set(headerUspsUsp, {
                            autoAlpha: 0
                        });

                        headerTl.to(headerUspsUsp, {
                            autoAlpha: 1,
                            onStart: () => {
                                if(headerUspsUsp.querySelector('.js-header-usps-usp-value')) {
                                    const headerUspsUspValue = headerUspsUsp.querySelector('.js-header-usps-usp-value');

                                    gsap.from(headerUspsUspValue, {
                                        textContent: 0,
                                        duration: 1,
                                        ease: "none",
                                        snap: {
                                            textContent: 1
                                        }
                                    });
                                }
                            }
                        }, ">-0.065");
                    });


                    /* Setup timeline for fading out USPs */
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

                /* Add animation for blog-meta reveal */
                if(header.querySelector('.js-header-blog-meta')) {
                    const blogMeta = header.querySelector('.js-header-blog-meta'),
                        blogMetaItems = header.querySelectorAll('.js-header-blog-meta-item');

                    blogMetaItems.forEach(blogMetaItem => {
                        gsap.set(blogMetaItem, {
                            autoAlpha: 0
                        });

                        headerTl.to(blogMetaItem, {
                            autoAlpha: 1
                        }, ">-0.065");
                    });


                    /* Setup timeline for fading out USPs */
                    gsap.to(blogMeta, {
                        scrollTrigger: {
                            trigger: header,
                            start: "top top",
                            end: '+=50%',
                            invalidateOnRefresh: true,
                            scrub: 1,
                            refreshPriority: blogMeta.dataset.stCount
                        },
                        autoAlpha: 0
                    });
                }
            });

            firstSetup = false;
        })();

        /* Resetup headers after resize */
        callAfterResize(setupHeaders);
    }
}

/* Export init function */
export default {
    init
};