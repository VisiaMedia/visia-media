/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, dayjs, getSiblings){
    if(document.querySelector('.js-recent-posts')) {

        /* Wrap setup in self starting function */
        let firstSetup = true,
            setupRecentPosts;

        (setupRecentPosts = function(){
            /* Get all recent posts instances as array */
            const recentPostsSections = gsap.utils.toArray('.js-recent-posts');

            /* Loop over posts instances */
            recentPostsSections.forEach(recentPostsSection => {

                /* Setup timeline for various animations */
                let recentPostsSectionTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: recentPostsSection,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: recentPostsSection.dataset.stCount
                    },
                    onComplete: () => {
                        recentPostsSectionTL.clear();
                    }
                });

                /* Clear timeline on resize */
                callAfterResize(function() {
                    recentPostsSectionTL.clear();
                });

                /* Disable timeline and wait for initial reveal animation to enable */
                if(firstSetup === true) {
                    recentPostsSectionTL.scrollTrigger.disable();
                }

                /* Add animation for headline reveal */
                if(recentPostsSection.querySelector('.js-recent-posts-title')) {
                    tlTextReveal(recentPostsSection.querySelector('.js-recent-posts-title'), recentPostsSectionTL);
                }

                /* Loop over and show posts */
                let recentPostItems = recentPostsSection.querySelectorAll('.js-recent-posts-item');

                gsap.set(recentPostItems, {
                    autoAlpha:0,
                    y: "1.5rem"
                });

                recentPostsSectionTL.to(recentPostItems, {
                    autoAlpha: 1,
                    y: "0rem",
                    stagger: .2
                });

                /* Set relative date via dayjs */
                recentPostItems.forEach(recentPostItem => {
                    let postDateElem = recentPostItem.querySelector('.js-recent-posts-item-from-now'),
                        postDate = postDateElem.getAttribute('datetime'),
                        postFromNow = dayjs(postDate).fromNow();

                    /* Set text for date element */
                    postDateElem.textContent = postFromNow;
                });
            });

            firstSetup = false;
        })();

        /* Resetup statements after resize */
        callAfterResize(setupRecentPosts);



        /* Setup event listeners */
        if(window.matchMedia("(pointer: fine)").matches) {
            gsap.utils.toArray('.js-recent-posts-item').forEach(recentPostItem => {
                const recentPostItemTitle = recentPostItem.querySelector('.js-recent-posts-item-title'),
                    recentPostItemSiblings = getSiblings(recentPostItem);

                /* Prepare element for hover state */
                gsap.set(recentPostItemTitle, {
                    paddingRight: '0.5em'
                });

                /* Event listeners */
                recentPostItem.addEventListener("mouseenter", function() {
                    gsap.to(recentPostItem, {
                        borderBottomColor: () => {
                            return getComputedStyle(document.documentElement).getPropertyValue('--plain-text-color');
                        }
                    })

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
    }
}

/* Export init function */
export default {
    init
};