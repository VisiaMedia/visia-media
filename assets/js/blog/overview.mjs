/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, stFadeIn, dayjs, InfiniteScroll) {
    const blogHome = document.querySelector('.js-blog-home');

    if (!blogHome) return;

    let timeline = tlSetup(blogHome, blogHome.dataset.stCount);

    /* Build timeline */
    const buildTimeline = () => {
        const title = blogHome.querySelector('.js-blog-home-title');
        const headline = blogHome.querySelector('.js-blog-home-headline');
        const postList = blogHome.querySelector('.js-blog-home-list');

        /* Add animation for title, headline and posts reveal */
        if (title) tlFadeIn(title, timeline);
        if (headline) tlTextReveal(headline, timeline);
        if (postList) tlFadeIn(postList, timeline);
    };

    /* Execute once */
    buildTimeline();

    /* Clear and rebuild timeline on resize (only rebuild if not completed) */
    callAfterResize(() => buildTlAfterResize(timeline, buildTimeline));

    /* Animate individual items */
    const blogHomeItems = blogHome.querySelectorAll('.js-blog-home-item');

    /* Setup function for individual items */
    const setupHomeItems = (item, isNew) => {
        if (isNew) stFadeIn(item, blogHome.dataset.stCount);

        /* Set "from-now" date */
        const timeElem = item.querySelector('.js-blog-home-from-now');
        if (timeElem) {
            const postDate = timeElem.getAttribute('datetime');
            timeElem.textContent = dayjs(postDate).fromNow();
        }

        /* Set pointer events for thumbnail */
        const blogItemLink = item.querySelector('.js-blog-home-link');
        const blogItemThumbImg = item.querySelector('.js-blog-home-thumb-img');
        if (window.matchMedia("(pointer: fine)").matches && blogItemLink && blogItemThumbImg) {
            blogItemLink.addEventListener("mouseenter", () => gsap.to(blogItemThumbImg, { scale: 1.1 }));
            blogItemLink.addEventListener("mouseleave", () => gsap.to(blogItemThumbImg, { scale: 1 }));
        }
    };

    /* Setup initial items */
    blogHomeItems.forEach(item => setupHomeItems(item, false));

    /* Setup Infinite Scroll */
    const infiniteScrollContainer = blogHome.querySelector('.js-infinite-scroll-container');
    if (infiniteScrollContainer) {
        const infScroll = new InfiniteScroll(infiniteScrollContainer, {
            path: '.js-nav-next',
            append: '.js-blog-home-item',
            history: false,
            status: '.js-blog-home-status'
        });

        /* Init items after appending */
        infScroll.on('append', (body, path, items) => {
            items.forEach(item => setupHomeItems(item, true));
            ScrollTrigger.refresh();
        });
    }
}

/* Unload */
export function unload(gsap, InfiniteScroll) {
    const blogHome = document.querySelector('.js-blog-home');
    if (blogHome) {
        const infiniteScrollContainer = blogHome.querySelector('.js-infinite-scroll-container');
        if (infiniteScrollContainer) {
            const infScroll = InfiniteScroll.data(infiniteScrollContainer);
            if (infScroll) infScroll.destroy();
        }
    }
}

/* Export init and unload functions */
export default {
    init,
    unload
};