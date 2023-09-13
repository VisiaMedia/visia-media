/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn, dayjs, InfiniteScroll){
    if(document.querySelector('.js-blog-single')) {
        const blogSingle = document.querySelector('.js-blog-single');

        /* Wrap setup in self starting function */
        let firstSetup = true,
            setupBlogSingle;

        (setupBlogSingle = function(){
            /* Setup timeline for various animations */
            let blogSingleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: blogSingle,
                    start: "top center",
                    once: true,
                    invalidateOnRefresh: true,
                    refreshPriority: blogSingle.dataset.stCount
                },
                onComplete: () => {
                    blogSingleTl.clear();
                }
            });

            /* Clear timeline on resize */
            callAfterResize(function() {
                blogSingleTl.clear();
            });

            /* Disable timeline and wait for initial reveal animation to enable */
            if(firstSetup === true) {
                blogSingleTl.scrollTrigger.disable();
            }


            /* Add animation for text reveal */
            if(blogSingle.querySelector('.js-blog-single-content')) {
                tlFadeIn(blogSingle.querySelector('.js-blog-single-content'), blogSingleTl);
            }

            firstSetup = false;
        })();

        /* Resetup blog after resize */
        callAfterResize(setupBlogSingle);
    }
}

/* Export init function */
export default {
    init
};