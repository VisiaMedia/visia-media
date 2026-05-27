/* Initialize */
export function init(gsap, dayjs, getSiblings) {
    const recentPostsSections = gsap.utils.toArray('.js-recent-posts');

    if (recentPostsSections.length > 0) {
        /* Loop over instances */
        recentPostsSections.forEach(recentPostsSection => {
            const recentPostItems = recentPostsSection.querySelectorAll('.js-recent-posts-item');

            /* Set relative dates via Day.js */
            recentPostItems.forEach(recentPostItem => {
                const postDateElem = recentPostItem.querySelector('.js-recent-posts-item-from-now');
                const postDate = postDateElem.getAttribute('datetime');
                const postFromNow = dayjs(postDate).fromNow();

                /* Set text for date element */
                postDateElem.textContent = postFromNow;
            });

            /* Setup hover interactions for fine pointer devices (e.g., mouse) */
            if (window.matchMedia("(pointer: fine)").matches) {
                recentPostItems.forEach(recentPostItem => {
                    const recentPostItemTitle = recentPostItem.querySelector('.js-recent-posts-item-title');
                    const recentPostItemSiblings = getSiblings(recentPostItem);

                    /* Prepare element for hover state */
                    gsap.set(recentPostItemTitle, { paddingRight: '0.5em' });

                    /* Hover event listeners */
                    recentPostItem.addEventListener("mouseenter", () => {
                        gsap.to(recentPostItemTitle, { x: "0.5em" });
                        gsap.to(recentPostItemSiblings, { autoAlpha: 0.25 });
                    });

                    recentPostItem.addEventListener("mouseleave", () => {
                        gsap.to(recentPostItemTitle, { x: "0" });
                        gsap.to(recentPostItemSiblings, { autoAlpha: 1 });
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
