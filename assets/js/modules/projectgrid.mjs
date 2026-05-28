/* Initialize */
export function init(gsap, ScrollTrigger, stFadeIn, Masonry, InfiniteScroll, imagesLoaded) {
    const projectGrids = gsap.utils.toArray('.js-project-grid');

    if (projectGrids.length > 0) {
        /* Loop over project grid instances */
        projectGrids.forEach(projectGrid => {
            const projectGridList = projectGrid.querySelector('.js-project-grid-list');
            const buttonWrapper = projectGrid.querySelector('.js-project-grid-button-wrapper');
            const initialItems = projectGridList.querySelectorAll('.js-project-grid-item');
            const mediaQueryFinePointer = window.matchMedia("(pointer: fine)");
            const caseArchiveUrl = projectGrid.dataset.caseArchiveUrl || '/case-archive/';
            const caseArchiveBaseUrl = caseArchiveUrl.endsWith('/') ? caseArchiveUrl : `${caseArchiveUrl}/`;

            /* Setup Masonry for grid layout */
            const masonry = new Masonry(projectGridList, {
                itemSelector: '.js-project-grid-item',
                columnWidth: '.js-grid-sizer',
                gutter: '.js-gutter-sizer',
                percentPosition: true,
                initLayout: false,
                transitionDuration: 0
            });

            /* Refresh ScrollTrigger on Masonry layout */
            masonry.on('layoutComplete', () => {
                ScrollTrigger.refresh(true);
            });

            /* Lay out Masonry when new images load */
            function newImageLoaded() {
                masonry.layout();
            }

            /* Add imagesLoaded to InfiniteScroll */
            InfiniteScroll.imagesLoaded = imagesLoaded;

            /* Setup InfiniteScroll */
            const infScroll = new InfiniteScroll(projectGridList, {
                path: function() {
                    let pageNumber = this.loadCount + 1; // Correct use of 'this'
                    return pageNumber === 1 ? caseArchiveBaseUrl : `${caseArchiveBaseUrl}page/${pageNumber}/`;
                },
                checkLastPage: '.js-nav-next',
                append: '.js-project-grid-item',
                history: false,
                prefill: false,
                outlayer: masonry,
                button: '.js-project-grid-button',
                scrollThreshold: false,
            });

            /* Set up grid item animations and interactions */
            function setupGridItem(item, isInitial = false) {
                const itemLink = item.querySelector('.js-project-grid-item-link');
                const itemVisual = item.querySelector('.js-project-grid-item-visual');

                /* Add event listener for loading image */
                itemVisual.addEventListener('load', newImageLoaded);

                /* Initially hide elements */
                gsap.set(item, { autoAlpha: 0, y: "1.5rem" });

                /* Fade-in animation */
                gsap.to(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                        once: true,
                        refreshPriority: projectGrid.dataset.stCount
                    },
                    autoAlpha: 1,
                    y: "0rem",
                    onStart: () => item.style.willChange = 'transform, opacity',
                    onComplete: () => {
                        item.style.willChange = 'auto';
                        gsap.set(item, { clearProps: "transform" });
                    }
                });

                /* Hover effect for desktop devices */
                if (mediaQueryFinePointer.matches) {
                    itemLink.addEventListener("mouseenter", () => gsap.to(itemVisual, { scale: 1.1 }));
                    itemLink.addEventListener("mouseleave", () => gsap.to(itemVisual, { scale: 1 }));
                }
            }

            /* Handle appending new items via InfiniteScroll */
            infScroll.on('append', (body, path, items) => {
                items.forEach(item => setupGridItem(item));
                ScrollTrigger.refresh();
                masonry.layout();
            });

            /* Initialize Masonry layout and grid items */
            masonry.layout();
            initialItems.forEach(item => setupGridItem(item, true));

            /* Fade in button on scroll */
            if (buttonWrapper) {
                stFadeIn(buttonWrapper, projectGrid.dataset.stCount);
            }
        });
    }
}

/* Unload */
export function unload(gsap, Masonry, InfiniteScroll) {
    const projectGrids = gsap.utils.toArray('.js-project-grid');

    projectGrids.forEach(projectGrid => {
        const projectGridList = projectGrid.querySelector('.js-project-grid-list');
        const masonry = Masonry.data(projectGridList);
        const infScroll = InfiniteScroll.data(projectGridList);

        /* Destroy Masonry */
        masonry.destroy();

        /* Destroy Infinite Scroll */
        infScroll.destroy();
    });
}

/* Export init and unload functions */
export default {
    init,
    unload
};
