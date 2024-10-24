/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, stFadeIn, dayjs, InfiniteScroll){
    const blogHome = document.querySelector('.js-blog-home');

    if(blogHome) {
        let timeline = tlSetup(blogHome, blogHome.dataset.stCount);


        /* Build timeline */
        let buildTimeline = function() {
            /* Add animation for title reveal */
            if(blogHome.querySelector('.js-blog-home-title')) {
                tlFadeIn(blogHome.querySelector('.js-blog-home-title'), timeline)
            }

            /* Add animation for headline reveal */
            if(blogHome.querySelector('.js-blog-home-headline')) {
                tlTextReveal(blogHome.querySelector('.js-blog-home-headline'), timeline);
            }

            /* Add animation for posts reveal */
            if(blogHome.querySelector('.js-blog-home-list')) {
                tlFadeIn(blogHome.querySelector('.js-blog-home-list'), timeline)
            }
        }

        /* Execute once */
        buildTimeline();


        /* Clear and rebuild timeline on resize (only rebuild if not completed) */
        callAfterResize(function() {
            buildTlAfterResize(timeline, buildTimeline);
        });




        /* Animate individual items */
        const blogHomeItems = blogHome.querySelectorAll('.js-blog-home-item');

        /* Setup function for individual items */
        function setupHomeItems(item, isnew) {
            /* Add reveal animation for new items */
            if(isnew) {
                stFadeIn(item, blogHome.dataset.stCount);
            }


            /* Set "from-now" date */
            if(item.querySelector('.js-blog-home-from-now')) {
                let timeElem = item.querySelector('.js-blog-home-from-now'),
                    postDate = timeElem.getAttribute('datetime'),
                    fromNow = dayjs(postDate).fromNow();

                /* Set text for date element */
                timeElem.textContent = fromNow;
            }


            /* Set pointer events for thumbnail */
            if(window.matchMedia("(pointer: fine)").matches) {
                if(item.querySelector('.js-blog-home-thumb-img')) {
                    let blogItemLink = item.querySelector('.js-blog-home-link'),
                        blogItemThumbImg = item.querySelector('.js-blog-home-thumb-img');

                    /* Event listeners */
                    blogItemLink.addEventListener("mouseenter", function() {
                        gsap.to(blogItemThumbImg, {
                            scale: 1.1
                        });
                    });

                    blogItemLink.addEventListener("mouseleave", function() {
                        gsap.to(blogItemThumbImg, {
                            scale: 1
                        });
                    });
                }
            }
        }

        /* Setup initial items */
        blogHomeItems.forEach(blogHomeItem => {
            setupHomeItems(blogHomeItem, false);
        });



        /* Setup Infinite Scroll */
        if(blogHome.querySelector('.js-infinite-scroll-container')) {
            const infiniteScrollContainer = blogHome.querySelector('.js-infinite-scroll-container');
            const infScroll = new InfiniteScroll(infiniteScrollContainer, {
                path: '.js-nav-next',
                append: '.js-blog-home-item',
                history: false,
                status: '.js-blog-home-status'
            });

            /* Init items after appending */
            infScroll.on('append', function(body, path, items) {
                items.forEach(item => {
                    setupHomeItems(item, true);
                });

                ScrollTrigger.refresh();
            });
        }
    }
}


/* Unload */
export function unload(gsap, InfiniteScroll) {
    if(document.querySelector('.js-blog-home')) {
        const blogHome = document.querySelector('.js-blog-home');

        if(blogHome.querySelector('.js-infinite-scroll-container')) {
            const infiniteScrollContainer = blogHome.querySelector('.js-infinite-scroll-container');
            const infScroll = InfiniteScroll.data(infiniteScrollContainer);

            /* Destroy the instance */
            infScroll.destroy();
        }
    }
}


/* Export init and unload functions */
export default {
    init,
    unload
}