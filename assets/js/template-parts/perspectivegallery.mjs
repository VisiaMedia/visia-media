/* Initialize */
export function init(gsap, ScrollTrigger, Masonry){
    if (document.querySelector('.js-perspective-gallery')) {
        const perspectiveGalleries = document.querySelectorAll('.js-perspective-gallery');

        perspectiveGalleries.forEach(perspectiveGallery => {
            const perspectiveGalleryList = perspectiveGallery.querySelector('.js-perspective-gallery-list');

            /* Setup Masonry */
            const masonry = new Masonry(perspectiveGalleryList, {
                itemSelector: '.js-perspective-gallery-list-item',
                columnWidth: '.js-perspective-gallery-grid-sizer',
                gutter: '.js-perspective-gallery-gutter',
                percentPosition: true,
                initLayout: false
            });

            /* Add event listener */
            masonry.on('layoutComplete', function() {
                /* (Re-)set container height to rotated list height */
                gsap.set(perspectiveGallery, {
                    height: () => {
                        return perspectiveGalleryList.getBoundingClientRect().height;
                    },
                    paddingTop:() => {
                        return (perspectiveGalleryList.getBoundingClientRect().height - perspectiveGalleryList.offsetHeight) / 2;
                    },
                    onComplete:() => {
                        ScrollTrigger.refresh(true);
                    },
                    immediateRender:false
                });
            });

            /* Layout masrony after images have been loaded */
            const images = perspectiveGallery.querySelectorAll('img');

            function imageLoaded() {
                masonry.layout();
                ScrollTrigger.refresh(true);
            }

            images.forEach(image => {
                if (image.complete && image.naturalWidth !== 0) {
                    imageLoaded();
                } else {
                    image.addEventListener('load', imageLoaded);
                }
            });

            /* Init Masonry */
            masonry.layout();



            /* Initially hide and reveal grid */
            gsap.set(perspectiveGallery, {
                autoAlpha:0,
                y: "1.5rem",
            });

            /* Show element */
            gsap.to(perspectiveGallery, {
                scrollTrigger: {
                    trigger: perspectiveGallery,
                    start: "top center",
                    once: true,
                    refreshPriority: perspectiveGallery.dataset.stCount,
                    invalidateOnRefresh: true
                },
                autoAlpha: 1,
                y: "0rem"
            });



            /* 'Parallax' slide individual items */
            const gridItems = perspectiveGallery.querySelectorAll('.js-perspective-gallery-list-item');

            gsap.to(gridItems, {
                scrollTrigger: {
                    trigger: perspectiveGallery,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    refreshPriority: perspectiveGallery.dataset.stCount,
                    invalidateOnRefresh: true
                },
                y:() => {
                    return "-=" + (gsap.getProperty(perspectiveGallery.querySelector('.js-perspective-gallery-list-item'), "marginBottom") * Math.random() * (1 - 0.1) + 0.1);
                },
                immediateRender: false
            })
        });
    }
}

/* Export init function */
export default {
    init
};