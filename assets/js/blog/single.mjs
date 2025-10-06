/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, stFadeIn, dayjs, getSiblings) {
    const blogSingle = document.querySelector('.js-blog-single');
    if (blogSingle) {
        /* Setup timeline */
        let timeline = tlSetup(blogSingle, blogSingle.dataset.stCount);

        /* Build timeline */
        const buildTimeline = () => {
            const headline = blogSingle.querySelector('.js-blog-single-header-headline');
            const blogMeta = blogSingle.querySelector('.js-blog-single-header-blog-meta');
            const content = blogSingle.querySelector('.js-blog-single-content');

            /* Add animation for headline, blog-meta, and text reveal */
            if (headline) tlTextReveal(headline, timeline);
            if (blogMeta) tlFadeIn(blogMeta, timeline);
            if (content) {
                gsap.set(content, { autoAlpha: 0 });
                timeline.to(content, { autoAlpha: 1 });
            }
        };

        /* Execute once */
        buildTimeline();

        /* Clear and rebuild timeline on resize (only rebuild if not completed) */
        callAfterResize(() => buildTlAfterResize(timeline, buildTimeline));
    }

    /* Post tags */
    const tagList = document.querySelector('.js-tag-list');
    if (tagList) stFadeIn(tagList, 0);

    /* External items */
    const externalItems = document.querySelector('.js-external-items');
    if (externalItems) stFadeIn(externalItems, 0);

    /* Setup related posts section */
    const relatedPostsSection = document.querySelector('.js-related-posts');
    if (relatedPostsSection) {
        const relatedPostItems = relatedPostsSection.querySelectorAll('.js-related-posts-item');
        let timeline = tlSetup(relatedPostsSection, relatedPostsSection.dataset.stCount);

        /* Build timeline */
        const buildTimeline = () => {
            const relatedPostsTitle = relatedPostsSection.querySelector('.js-related-posts-title');
            if (relatedPostsTitle) tlTextReveal(relatedPostsTitle, timeline);
            tlFadeIn(relatedPostItems, timeline);
        };

        /* Execute once */
        buildTimeline();

        /* Clear and rebuild timeline on resize (only rebuild if not completed) */
        callAfterResize(() => buildTlAfterResize(timeline, buildTimeline));

        /* Set relative date via dayjs */
        relatedPostItems.forEach(item => {
            const postDateElem = item.querySelector('.js-related-posts-item-from-now');
            if (postDateElem) {
                const postDate = postDateElem.getAttribute('datetime');
                postDateElem.textContent = dayjs(postDate).fromNow();
            }
        });

        /* Setup event listeners for related posts hover */
        if (window.matchMedia("(pointer: fine)").matches) {
            relatedPostItems.forEach(item => {
                const itemTitle = item.querySelector('.js-related-posts-item-title');
                const itemSiblings = getSiblings(item);

                if (itemTitle) {
                    gsap.set(itemTitle, { paddingRight: '0.5em' });

                    item.addEventListener("mouseenter", () => {
                        gsap.to(item, { borderBottomColor: getComputedStyle(document.documentElement).getPropertyValue('--plain-text-color') });
                        gsap.to(itemTitle, { x: "0.5em" });
                        gsap.to(itemSiblings, { autoAlpha: .25 });
                    });

                    item.addEventListener("mouseleave", () => {
                        gsap.to(itemTitle, { x: "0" });
                        gsap.to(itemSiblings, { autoAlpha: 1 });
                    });
                }
            });
        }
    }
}

/* Export init function */
export default {
    init
};