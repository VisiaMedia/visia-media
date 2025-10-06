/* Initialize */
import {callAfterResize} from "../helpers/functions.mjs";

export function init(gsap, ScrollTrigger) {
    const imagefallers = gsap.utils.toArray('.js-falling-images');

    if (imagefallers.length > 0) {
        imagefallers.forEach(imagefaller => {
            const imagefallerList = imagefaller.querySelector('.js-falling-images-list');
            const imagefallerItems = imagefaller.querySelectorAll('.js-falling-images-item');

            /* Setup function for sizes */
            const setupSizes = () => {
                const firstItem = imagefallerItems[0];
                const offsetSize = (window.outerHeight - firstItem.offsetHeight) / 2;

                /* Position list to vertically center first row */
                gsap.set(imagefallerList, {
                    y: offsetSize
                });

                /* Adjust padding to accommodate new offset */
                gsap.set(imagefaller, {
                    paddingBottom: offsetSize,
                    onComplete: () => {
                        ScrollTrigger.refresh();
                    }
                });
            };

            /* Execute once */
            setupSizes();

            /* Rebuild on resize */
            callAfterResize(setupSizes);

            /* Parallax effect */
            imagefallerItems.forEach(imagefallerItem => {
                const randomOffset = () => "-=" + (gsap.getProperty(imagefallerItem, 'paddingTop') * Math.random() * 0.9 + 0.1);

                gsap.to(imagefallerItem, {
                    scrollTrigger: {
                        trigger: imagefallerItem,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                        refreshPriority: imagefaller.dataset.stCount,
                        onEnter: () => imagefallerItem.style.willChange = 'transform',
                        onEnterBack: () => imagefallerItem.style.willChange = 'transform',
                        onLeave: () => imagefallerItem.style.willChange = 'auto',
                        onLeaveBack: () => imagefallerItem.style.willChange = 'auto',
                    },
                    y: randomOffset
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
};