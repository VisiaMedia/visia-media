/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, dayjs, getSiblings){
    if(document.querySelector('.js-blog-single')) {
        const blogSingle = document.querySelector('.js-blog-single');

        /* Setup timeline */
        let timeline = tlSetup(blogSingle, blogSingle.dataset.stCount);


        /* Build timeline */
        let buildTimeline = function() {
            /* Add animation for headline reveal */
            if (blogSingle.querySelector('.js-blog-single-header-headline')) {
                tlTextReveal(blogSingle.querySelector('.js-blog-single-header-headline'), timeline);
            }

            /* Add animation for blog-meta reveal */
            if (blogSingle.querySelector('.js-blog-single-header-blog-meta')) {
                tlFadeIn(blogSingle.querySelector('.js-blog-single-header-blog-meta'), timeline);
            }

            /* Add animation for text reveal */
            if (blogSingle.querySelector('.js-blog-single-content')) {
                tlFadeIn(blogSingle.querySelector('.js-blog-single-content'), timeline);
            }
        }

        /* Execute once */
        buildTimeline();


        /* Clear and rebuild timeline on resize (only rebuild if not completed) */
        callAfterResize(function() {
            buildTlAfterResize(timeline, buildTimeline);
        });
    }




    /* Post tags */
    if(document.querySelector('.js-tag-list')) {
        const tagList = document.querySelector('.js-tag-list');

        gsap.set(tagList, {
            autoAlpha:0,
            y: "1.5rem"
        });

        gsap.to(tagList, {
            scrollTrigger: {
                trigger: tagList,
                start: "top center",
                once: true,
                invalidateOnRefresh: true
            },
            autoAlpha: 1,
            y: "0rem"
        });
    }



    /* External items */
    if(document.querySelector('.js-external-items')) {
        const externalItems = document.querySelector('.js-external-items');

        gsap.set(externalItems, {
            autoAlpha:0,
            y: "1.5rem"
        });

        gsap.to(externalItems, {
            scrollTrigger: {
                trigger: externalItems,
                start: "top center",
                once: true,
                invalidateOnRefresh: true
            },
            autoAlpha: 1,
            y: "0rem"
        });
    }



    /* Setup related posts section */
    if(document.querySelector('.js-related-posts')) {
        let relatedPostsSection = document.querySelector('.js-related-posts'),
            relatedPostItems = relatedPostsSection.querySelectorAll('.js-related-posts-item');

        /* Setup timeline */
        let timeline = tlSetup(relatedPostsSection, relatedPostsSection.dataset.stCount);


        /* Build timeline */
        let buildTimeline = function() {
            /* Add animation for headline reveal */
            if(relatedPostsSection.querySelector('.js-related-posts-title')) {
                tlTextReveal(relatedPostsSection.querySelector('.js-related-posts-title'), timeline);
            }

            /* Add animation for showing items */
            gsap.set(relatedPostItems, {
                autoAlpha:0,
                y: "1.5rem",
                immediateRender: true
            });

            timeline.to(relatedPostItems, {
                autoAlpha: 1,
                y: "0rem",
                stagger: .2
            });
        }

        /* Execute once */
        buildTimeline();


        /* Clear and rebuild timeline on resize (only rebuild if not completed) */
        callAfterResize(function() {
            buildTlAfterResize(timeline, buildTimeline);
        });



        /* Set relative date via dayjs */
        relatedPostItems.forEach(relatedPostItem => {
            let postDateElem = relatedPostItem.querySelector('.js-related-posts-item-from-now'),
                postDate = postDateElem.getAttribute('datetime'),
                postFromNow = dayjs(postDate).fromNow();

            /* Set text for date element */
            postDateElem.textContent = postFromNow;
        });




        /* Setup event listeners */
        if(window.matchMedia("(pointer: fine)").matches) {
            relatedPostItems.forEach(relatedPostItem => {
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

/* Export init function */
export default {
    init
};