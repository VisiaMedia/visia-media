/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlSetup, tlTextReveal, tlFadeIn, dayjs, InfiniteScroll){
    if(document.querySelector('.js-blog-home')) {
        const blogHomes = gsap.utils.toArray('.js-blog-home');

        /* Loop over instances */
        blogHomes.forEach(blogHome => {
            /* Setup timeline */
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


            /* Clear and rebuild timeline on resize */
            callAfterResize(function() {
                timeline.clear();

                buildTimeline();
            });




            /* Animate individual items */
            const blogHomeItems = blogHome.querySelectorAll('.js-blog-home-item');

            /* Setup function for individual items */
            function setupHomeItems(item, isnew) {
                /* Add reveal animation for new items*/
                if(isnew) {
                    gsap.set(item, {
                        autoAlpha:0,
                        y: "1.5rem"
                    });

                    gsap.to(item, {
                        autoAlpha: 1,
                        y: "0rem",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 75%",
                            once: true,
                            refreshPriority: blogHome.dataset.stCount
                        }
                    });
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
                    path: '.js-blog-home-nav-next',
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
        });
    }
}

/* Export init function */
export default {
    init
};