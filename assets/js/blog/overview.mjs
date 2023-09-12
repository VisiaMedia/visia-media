/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn, dayjs, InfiniteScroll){
    if(document.querySelector('.js-blog-home')) {
        const blogHomes = gsap.utils.toArray('.js-blog-home');

        blogHomes.forEach(blogHome => {
            const blogHomeItems = blogHome.querySelectorAll('.js-blog-home-item');

            /* Setup function for individual items */
            function setupHomeItems(item) {
                /* Add reveal animation */
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
                        invalidateOnRefresh: true,
                        refreshPriority: blogHome.dataset.stCount
                    }
                });


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
                    if(item.querySelector('.js-blog-home-thumb-img') && item.querySelector('.js-blog-home-thumb')) {
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
                setupHomeItems(blogHomeItem);
            });



            /* Setup Infinite Scroll */
            const blogHomeList = blogHome.querySelector('.js-blog-home-list');
            const infScroll = new InfiniteScroll(blogHomeList, {
                path: '.js-blog-home-nav-next',
                append: '.js-blog-home-item',
                history: false,
                scrollThreshold: 0,
                status: '.js-blog-home-status'
            });

            /* Init items after appending */
            infScroll.on('append', function(body, path, items) {
                items.forEach(item => {
                    setupHomeItems(item);
                });

                ScrollTrigger.refresh();
            });
        });
    }
}

/* Export init function */
export default {
    init
};