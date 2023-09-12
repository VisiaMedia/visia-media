/* Initialize */
export function init(gsap){
    if(document.querySelector('.js-falling-images')) {

        /* Get all instances as array */
        const imagefallers = gsap.utils.toArray('.js-falling-images');

        /* Loop over faller instances */
        imagefallers.forEach(imagefaller => {
            const imagefallerList = imagefaller.querySelector('.js-falling-images-list'),
                imagefallerItems = imagefaller.querySelectorAll('.js-falling-images-item');

            /* Setup timeline for various animations */
            let imagefallerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: imagefaller,
                    pin: true,
                    start: "top top",
                    end: () => {
                        return "+=" + (imagefallerList.offsetHeight - imagefaller.offsetHeight)
                    },
                    scrub: true,
                    invalidateOnRefresh: true,
                    refreshPriority: imagefaller.dataset.stCount
                }
            });

            /* Position list to vertically center first row */
            const firstItem = imagefaller.querySelector('.js-falling-images-item');

            imagefallerTl.set(imagefallerList, {
               y:() => {
                   return imagefaller.offsetHeight / 2 - gsap.getProperty(imagefallerList, 'paddingTop') - firstItem.offsetHeight / 2;
               }
            });

            /* Simulate list scrolling */
            imagefallerTl.to(imagefallerList, {
                y:() => {
                    return "-=" + (imagefallerList.offsetHeight - imagefaller.offsetHeight);
                },
                ease: "none"
            });

            /* Fade in images on scroll and add parallax effect */
            imagefallerItems.forEach(imagefallerItem => {
                gsap.set(imagefallerItem, {
                    autoAlpha:0
                });

                gsap.to(imagefallerItem, {
                    scrollTrigger: {
                        trigger: imagefallerItem,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: imagefaller.dataset.stCount
                    },
                    autoAlpha: 1
                });

                /* Parallax (desktop only) */
                if(window.matchMedia("(pointer: fine)").matches) {
                    gsap.to(imagefallerItem, {
                        scrollTrigger: {
                            trigger: imagefallerItem,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                            refreshPriority: imagefaller.dataset.stCount
                        },
                        y:() => {
                            return "-=" + (gsap.getProperty(imagefallerItem, 'paddingTop') * Math.random() * (1 - 0.1) + 0.1);
                        }
                    });
                }
            });
        });
    }
}

/* Export init function */
export default {
    init
};