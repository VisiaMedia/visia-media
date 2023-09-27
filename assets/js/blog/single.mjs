/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn, dayjs, getSiblings){
    if(document.querySelector('.js-blog-single')) {
        const blogSingle = document.querySelector('.js-blog-single');

        /* Wrap setup in self starting function */
        let firstSetup = true,
            setupBlogSingle;

        (setupBlogSingle = function(){
            /* Setup timeline for various animations */
            let blogSingleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: blogSingle,
                    start: "top center",
                    once: true,
                    invalidateOnRefresh: true,
                    refreshPriority: blogSingle.dataset.stCount
                },
                onComplete: () => {
                    blogSingleTl.clear();
                }
            });

            /* Clear timeline on resize */
            callAfterResize(function() {
                blogSingleTl.clear();
            });

            /* Disable timeline and wait for initial reveal animation to enable */
            if(firstSetup === true) {
                blogSingleTl.scrollTrigger.disable();
            }


            /* Add animation for text reveal */
            if(blogSingle.querySelector('.js-blog-single-content')) {
                tlFadeIn(blogSingle.querySelector('.js-blog-single-content'), blogSingleTl);
            }

            firstSetup = false;
        })();

        /* Resetup blog after resize */
        callAfterResize(setupBlogSingle);



        /* Setup related posts section */
        if(document.querySelector('.js-related-posts')) {
            let firstSetup = true,
                setupRelatedPosts;

            (setupRelatedPosts = function(){
                /* Get all related posts instances as array */
                const relatedPostsSections = gsap.utils.toArray('.js-related-posts');

                /* Loop over posts instances */
                relatedPostsSections.forEach(relatedPostsSection => {

                    /* Setup timeline for various animations */
                    let relatedPostsSectionTL = gsap.timeline({
                        scrollTrigger: {
                            trigger: relatedPostsSection,
                            start: "top center",
                            once: true,
                            invalidateOnRefresh: true,
                            refreshPriority: relatedPostsSection.dataset.stCount
                        },
                        onComplete: () => {
                            relatedPostsSectionTL.clear();
                        }
                    });

                    /* Clear timeline on resize */
                    callAfterResize(function() {
                        relatedPostsSectionTL.clear();
                    });

                    /* Disable timeline and wait for initial reveal animation to enable */
                    if(firstSetup === true) {
                        relatedPostsSectionTL.scrollTrigger.disable();
                    }

                    /* Loop over and show posts */
                    let relatedPostItems = relatedPostsSection.querySelectorAll('.js-related-posts-item');

                    gsap.set(relatedPostItems, {
                        autoAlpha:0,
                        y: "1.5rem"
                    });

                    relatedPostsSectionTL.to(relatedPostItems, {
                        autoAlpha: 1,
                        y: "0rem",
                        stagger: .2
                    });

                    /* Set relative date via dayjs */
                    relatedPostItems.forEach(relatedPostItem => {
                        let postDateElem = relatedPostItem.querySelector('.js-related-posts-item-from-now'),
                            postDate = postDateElem.getAttribute('datetime'),
                            postFromNow = dayjs(postDate).fromNow();

                        /* Set text for date element */
                        postDateElem.textContent = postFromNow;
                    });
                });

                firstSetup = false;
            })();

            /* Resetup statements after resize */
            callAfterResize(setupRelatedPosts);



            /* Setup event listeners */
            if(window.matchMedia("(pointer: fine)").matches) {
                gsap.utils.toArray('.js-related-posts-item').forEach(relatedPostItem => {
                    const relatedPostItemTitle = relatedPostItem.querySelector('.js-related-posts-item-title'),
                        relatedPostItemSiblings = getSiblings(relatedPostItem);

                    /* Prepare element for hover state */
                    gsap.set(relatedPostItemTitle, {
                        paddingRight: '0.5em'
                    });

                    /* Event listeners */
                    relatedPostItem.addEventListener("mouseenter", function() {
                        gsap.to(relatedPostItem, {
                            borderBottomColor: () => {
                                return getComputedStyle(document.documentElement).getPropertyValue('--plain-text-color');
                            }
                        })

                        gsap.to(relatedPostItemTitle, {
                            x: "0.5em"
                        });

                        gsap.to(relatedPostItemSiblings, {
                            autoAlpha: .25
                        });
                    });

                    relatedPostItem.addEventListener("mouseleave", function() {
                        gsap.to(relatedPostItemTitle, {
                            x: "0"
                        });

                        gsap.to(relatedPostItemSiblings, {
                            autoAlpha: 1
                        });
                    });
                });
            }
        }
    }
}

/* Export init function */
export default {
    init
};