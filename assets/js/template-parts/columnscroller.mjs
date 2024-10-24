/* Initialize */
import {callAfterResize} from "../helpers/functions.mjs";

export function init(gsap, ScrollTrigger, callAfterResize){
    if(document.querySelector('.js-column-scroller')) {
        /* Get all instances as array */
        const columnScrollers = gsap.utils.toArray('.js-column-scroller');

        /* Loop over instances */
        columnScrollers.forEach(columnScroller => {
            const columnScrollerContainer = columnScroller.querySelector('.js-column-scroller-container');
            const columnScrollerSections = columnScroller.querySelectorAll('.js-column-scroller-section');
            const columnScrollerImagesList = columnScroller.querySelector('.js-column-scroller-images-list');
            const columnScrollerImagesListItem = columnScroller.querySelectorAll('.js-column-scroller-images-list-item');
            const columnScrollerScrollTriggerID = Math.random().toString(16).slice(2);



            /* Function for creating or killing ScrollTrigger */
            let createOrKill = function() {
                if(window.outerWidth > 810 && !ScrollTrigger.getById(columnScrollerScrollTriggerID)) {
                    ScrollTrigger.create({
                        trigger: columnScrollerImagesList,
                        start: "center center",
                        pin: true,
                        endTrigger: columnScrollerContainer,
                        end:() => {
                            return "bottom-="+ columnScroller.querySelector('.js-column-scroller-section:last-child').offsetHeight / 2 +"px center";
                        },
                        refreshPriority: columnScroller.dataset.stCount,
                        invalidateOnRefresh: true,
                        id: columnScrollerScrollTriggerID
                    });
                } else if(window.outerWidth <= 810 && ScrollTrigger.getById(columnScrollerScrollTriggerID)) {
                    ScrollTrigger.getById(columnScrollerScrollTriggerID).kill(true, true);
                }
            }

            /* Initially create ScrollTrigger */
            createOrKill();

            /* (Re)create ScrollTrigger on resize */
            callAfterResize(createOrKill);


            /* Initially hide images list */
            gsap.set(columnScrollerImagesListItem, {
                autoAlpha:0
            });



            /* Loop over sections */
            columnScrollerSections.forEach(function(columnScrollerSection, i) {

                /* Function for showing the right images */
                function showImageStack(n) {
                    columnScrollerImagesListItem.forEach(imageStack => {
                        gsap.to(imageStack, {
                            autoAlpha:() => {
                                if(imageStack === columnScrollerImagesListItem[n]) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            }
                        });
                    });
                }


                /* Setup ScrollTrigger for image fading and moving */
                let imagestackTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: columnScrollerSection,
                        scrub: 1,
                        start: "top center",
                        end: "bottom center",
                        invalidateOnRefresh: true,
                        refreshPriority: columnScroller.dataset.stCount,
                        onEnter:() => {
                            showImageStack(i);
                        },
                        onEnterBack:() => {
                            showImageStack(i);
                        }
                    }
                });


                /* Move images up/down */
                if(columnScrollerSection.querySelector('.js-column-scroller-image')) {
                    const currentColumnScrollerImagesListItem = columnScrollerImagesListItem[i];
                    const desktopImages = currentColumnScrollerImagesListItem.querySelectorAll('.js-column-scroller-image');
                    const mobileImages = columnScrollerSection.querySelectorAll('.js-column-scroller-image');


                    imagestackTL.to([desktopImages, mobileImages], {
                        y:(index) => {
                            let returnValue;

                            if(index % 2 == 0) {
                                returnValue = '+=1em';
                            } else {
                                returnValue = '-=1em';
                            }

                            return returnValue;
                        }
                    }, '<');
                }
            });
        });
    }
}

/* Export init function */
export default {
    init
};