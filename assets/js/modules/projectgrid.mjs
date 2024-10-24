/* Initialize */
export function init(gsap, ScrollTrigger, stFadeIn, blobity, Masonry, InfiniteScroll, imagesLoaded){
    if(document.querySelector('.js-project-grid')) {
        /* Get all project grid instances as array */
        const projectGrids = gsap.utils.toArray('.js-project-grid');

        /* Loop over project grid instances */
        projectGrids.forEach(projectGrid => {
            const projectGridList = projectGrid.querySelector('.js-project-grid-list');

            /* Setup Masonry for grid layout */
            const masonry = new Masonry(projectGridList, {
                itemSelector: '.js-project-grid-item',
                columnWidth: '.js-grid-sizer',
                gutter: '.js-gutter-sizer',
                percentPosition: true,
                initLayout: false,
                transitionDuration: 0
            });

            /* Add event listener */
            masonry.on('layoutComplete', function() {
                ScrollTrigger.refresh();
            });

            /* Add function for laying out Masrony on image load */
            function newImageLoaded() {
                masonry.layout();
            }


            /* Add imagesloaded to InifinteScroll */
            InfiniteScroll.imagesLoaded = imagesLoaded;


            /* Setup InfiniteScroll */
            const infScroll = new InfiniteScroll(projectGridList, {
                path: function() {
                    let returnValue,
                        pageNumber = this.loadCount + 1;

                    if(pageNumber === 1) {
                        returnValue = '/case-archive/';
                    } else {
                        returnValue = `/case-archive/page/${pageNumber}`;
                    }

                    return returnValue;
                },
                checkLastPage: '.js-nav-next',
                append: '.js-project-grid-item',
                history: false,
                prefill: false,
                outlayer: masonry,
                button: '.js-project-grid-button',
                scrollThreshold: false,
            });

            /* Init items after appending */
            infScroll.on('append', function(body, path, items) {
                items.forEach(item => {
                    setupGridItem(item);
                });

                ScrollTrigger.refresh();

                masonry.layout();
            });


            /* Init Masonry */
            masonry.layout();



            /* Setup function for grid items */
            function setupGridItem(item, isInitial = false) {
                const itemLink = item.querySelector('.js-project-grid-item-link');
                const itemVisual = item.querySelector('.js-project-grid-item-visual');

                /* Add event listener for loading image and recalculating ScrollTrigger + Masrony */
                itemVisual.addEventListener('load', newImageLoaded);

                /* Initially hide elements */
                gsap.set(item, {
                    autoAlpha:0,
                    y: "1.5rem"
                });

                if(isInitial) {
                    gsap.to(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: "top center",
                            end: "top top",
                            once: true,
                            refreshPriority: projectGrid.dataset.stCount
                        },
                        autoAlpha: 1,
                        y: "0rem",
                        onStart:() => {
                            item.style.willChange = 'transform, opacity';
                        },
                        onComplete:() => {
                            item.style.willChange = 'auto';

                            gsap.set(item, {
                                clearProps: "transform",
                            });
                        },
                    });
                } else {
                    gsap.to(item, {
                        autoAlpha: 1,
                        y: "0rem",
                        onStart:() => {
                            item.style.willChange = 'transform, opacity';
                        },
                        onComplete:() => {
                            item.style.willChange = 'auto';

                            gsap.set(item, {
                                clearProps: "transform",
                            });
                        },
                    });
                }


                /* Add logic for hovering */
                if(window.matchMedia("(pointer: fine)").matches) {
                    itemLink.addEventListener("mouseenter", function() {
                        gsap.to(itemVisual, {
                            scale: 1.1
                        });
                    });

                    itemLink.addEventListener("mouseleave", function() {
                        gsap.to(itemVisual, {
                            scale: 1
                        });
                    });
                }
            }

            /* Set up initial items */
            const initialItems = projectGridList.querySelectorAll('.js-project-grid-item');

            initialItems.forEach(initialItem => {
                setupGridItem(initialItem, true);
            });

            /* Fade in button on scroll */
            if(projectGrid.querySelector('.js-project-grid-button-wrapper')) {
                stFadeIn(projectGrid.querySelector('.js-project-grid-button-wrapper'), projectGrid.dataset.stCount);
            }
        });
    }
}


/* Unload */
export function unload(gsap, Masonry, InfiniteScroll) {
    if(document.querySelector('.js-project-grid')) {
        const projectGrids = gsap.utils.toArray('.js-project-grid');

        projectGrids.forEach(projectGrid => {
            const projectGridList = projectGrid.querySelector('.js-project-grid-list');
            const masonry = Masonry.data(projectGridList);
            const infScroll = InfiniteScroll.data(projectGridList)

            /* Destroy Masonry */
            masonry.destroy();

            /* Destroy Infinite Scroll */
            infScroll.destroy();
        });
    }
}


/* Export init and unload functions */
export default {
    init,
    unload
}