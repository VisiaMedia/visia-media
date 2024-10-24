/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, stFadeIn, dayjs, getSiblings){
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
            if(blogSingle.querySelector('.js-blog-single-content')) {
                const blogSingleContent = blogSingle.querySelector('.js-blog-single-content');

                gsap.set(blogSingleContent, {
                    autoAlpha:0
                });

                timeline.to(blogSingleContent, {
                    autoAlpha:1
                });
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
        stFadeIn(document.querySelector('.js-tag-list'), 0);
    }



    /* External items */
    if(document.querySelector('.js-external-items')) {
        stFadeIn(document.querySelector('.js-external-items'), 0);
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
            tlFadeIn(relatedPostItems, timeline);
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