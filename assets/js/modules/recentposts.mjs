/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, dayjs, getSiblings){
    if(document.querySelector('.js-recent-posts')) {
        const recentPostsSections = gsap.utils.toArray('.js-recent-posts');

        /* Loop over instances */
        recentPostsSections.forEach(recentPostsSection => {
            let timeline = tlSetup(recentPostsSection, recentPostsSection.dataset.stCount),
                recentPostItems = recentPostsSection.querySelectorAll('.js-recent-posts-item');


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(recentPostsSection.querySelector('.js-recent-posts-title')) {
                    tlTextReveal(recentPostsSection.querySelector('.js-recent-posts-title'), timeline);
                }

                /* Add animation for showing items */
                tlFadeIn(recentPostsSection.querySelectorAll('.js-recent-posts-item'), timeline);
            }

            /* Execute once */
            buildTimeline();


            /* Clear and rebuild timeline on resize (only rebuild if not completed) */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);
            });



            /* Set relative date via dayjs */
            recentPostItems.forEach(recentPostItem => {
                let postDateElem = recentPostItem.querySelector('.js-recent-posts-item-from-now'),
                    postDate = postDateElem.getAttribute('datetime'),
                    postFromNow = dayjs(postDate).fromNow();

                /* Set text for date element */
                postDateElem.textContent = postFromNow;
            });



            /* Setup event listeners */
            if(window.matchMedia("(pointer: fine)").matches) {
                recentPostItems.forEach(recentPostItem => {
                    const recentPostItemTitle = recentPostItem.querySelector('.js-recent-posts-item-title'),
                        recentPostItemSiblings = getSiblings(recentPostItem);

                    /* Prepare element for hover state */
                    gsap.set(recentPostItemTitle, {
                        paddingRight: '0.5em'
                    });

                    /* Event listeners */
                    recentPostItem.addEventListener("mouseenter", function() {
                        gsap.to(recentPostItemTitle, {
                            x: "0.5em"
                        });

                        gsap.to(recentPostItemSiblings, {
                            autoAlpha: .25
                        });
                    });

                    recentPostItem.addEventListener("mouseleave", function() {
                        gsap.to(recentPostItemTitle, {
                            x: "0"
                        });

                        gsap.to(recentPostItemSiblings, {
                            autoAlpha: 1
                        });
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