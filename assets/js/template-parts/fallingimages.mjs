/* Initialize */
import {callAfterResize} from "../helpers/functions.mjs";

export function init(gsap, ScrollTrigger, callAfterResize){
    if(document.querySelector('.js-falling-images')) {

        /* Get all instances as array */
        const imagefallers = gsap.utils.toArray('.js-falling-images');

        /* Loop over faller instances */
        imagefallers.forEach(imagefaller => {
            const imagefallerList = imagefaller.querySelector('.js-falling-images-list');

            /* Setup */
            let setupSizes = function() {
                const firstItem = imagefaller.querySelector('.js-falling-images-item');
                const offsetSize = (window.outerHeight - firstItem.offsetHeight) / 2;

                /* Position list to vertically center first row */
                gsap.set(imagefallerList, {
                    y: offsetSize
                });

                /* Make up for new offset */
                gsap.set(imagefaller, {
                    paddingBottom: offsetSize,
                    onComplete:() => {
                        ScrollTrigger.refresh();
                    }
                });
            }

            /* Execute once */
            setupSizes();

            /* Rebuild on resize */
            callAfterResize(function() {
                setupSizes();
            });



            /* Parallax (desktop only) */
            const imagefallerItems = imagefaller.querySelectorAll('.js-falling-images-item');

            /* Add will-change functions */
            function addWillChange(item) {
                item.style.willChange = 'transform';
            }
            function removeWillChange(item) {
                item.style.willChange = 'auto'
            }

            imagefallerItems.forEach(imagefallerItem => {
                gsap.to(imagefallerItem, {
                    scrollTrigger: {
                        trigger: imagefallerItem,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                        refreshPriority: imagefaller.dataset.stCount,
                        onEnter:() => {
                            addWillChange(imagefallerItem);
                        },
                        onEnterBack:() => {
                            addWillChange(imagefallerItem);
                        },
                        onLeave:() => {
                            removeWillChange(imagefallerItem);
                        },
                        onLeaveBack:() => {
                            removeWillChange(imagefallerItem);
                        }
                    },
                    y:() => {
                        return "-=" + (gsap.getProperty(imagefallerItem, 'paddingTop') * Math.random() * (1 - 0.1) + 0.1);
                    }
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
};