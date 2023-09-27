/* Initialize */
import {getSiblings} from "../helpers/functions.mjs";

export function init(gsap, ScrollTrigger, blobity, callAfterResize, tlTextReveal, tlFadeIn, getSiblings){
    if(document.querySelector('.js-review-slider')) {
        const reviewSliders = gsap.utils.toArray('.js-review-slider');

        /* Loop over slider instances */
        reviewSliders.forEach(reviewSlider => {
            let currentSlide = 1,
                reviewSliderList = reviewSlider.querySelector('.js-review-slider-list'),
                reviewSliderListItems = reviewSlider.querySelectorAll('.js-review-slider-list-item'),
                reviewSliderNavItems = reviewSlider.querySelectorAll('.js-review-slider-nav-item');

            /* (Re-)set current slide and wrapper height */
            let firstSetup = true,
                setCurrentSlide,
                reviewSliderListItemTl;

            (setCurrentSlide = function(initial = true){
                let sliderHeight = 0;

                reviewSliderListItems.forEach(reviewSliderListItem => {
                    /* Initial setup */
                    if(initial === true) {
                        if(currentSlide === parseInt(reviewSliderListItem.dataset.slideCount)) {
                            reviewSliderListItemTl = gsap.timeline({
                                scrollTrigger: {
                                    trigger: reviewSlider,
                                    start: "top center",
                                    once: true,
                                    invalidateOnRefresh: true,
                                    refreshPriority: reviewSlider.dataset.stCount
                                },
                                onComplete: () => {
                                    reviewSliderListItemTl.clear().kill();
                                }
                            });

                            /* Disable timeline and wait for first reveal animation to enable */
                            if(firstSetup === true) {
                                reviewSliderListItemTl.scrollTrigger.disable();
                            }


                            /* Show all elements one by one
                             *
                            * Thumbnail */
                            if(reviewSliderListItem.querySelector('.js-review-slider-list-item-thumbnail')) {
                                let thumbnail = reviewSliderListItem.querySelector('.js-review-slider-list-item-thumbnail');

                                tlFadeIn(thumbnail, reviewSliderListItemTl);
                            }

                            /* Details */
                            if(reviewSliderListItem.querySelector('.js-review-slider-list-item-details')) {
                                let details = reviewSliderListItem.querySelector('.js-review-slider-list-item-details');

                                tlFadeIn(details, reviewSliderListItemTl);
                            }

                            /* Review */
                            if (reviewSliderListItem.querySelector('.js-review-slider-list-item-review')) {
                                let review = reviewSliderListItem.querySelector('.js-review-slider-list-item-review');

                                tlFadeIn(review, reviewSliderListItemTl);
                            }

                            /* Navigation */
                            if(reviewSlider.querySelector('.js-review-slider-nav')) {
                                let nav = reviewSlider.querySelector('.js-review-slider-nav');

                                tlFadeIn(nav, reviewSliderListItemTl);
                            }
                        } else {
                            gsap.set(reviewSliderListItem, {
                                autoAlpha: 0
                            });
                        }
                    } else {
                        if(currentSlide === parseInt(reviewSliderListItem.dataset.slideCount)) {
                            /* Fade in slide */
                            gsap.to(reviewSliderListItem, {
                                delay:.25,
                                autoAlpha: 1,
                                overwrite: true
                            });
                        } else {
                            gsap.to(reviewSliderListItem, {
                                autoAlpha: 0,
                                overwrite: true
                            });
                        }
                    }

                    /* (Re-)set slider height */
                    if (window.outerWidth > 768) {
                        if(initial === true) {
                            if(sliderHeight < reviewSliderListItem.offsetHeight) {
                                sliderHeight = reviewSliderListItem.offsetHeight;

                                gsap.set(reviewSliderList, {
                                    height: () => {
                                        return sliderHeight + 'px';
                                    },
                                    onComplete:() => {
                                        ScrollTrigger.refresh();
                                    }
                                });
                            }
                        }
                    } else if(currentSlide === parseInt(reviewSliderListItem.dataset.slideCount)) {
                        gsap.to(reviewSliderList, {
                            height: () => {
                                return reviewSliderListItem.offsetHeight + 'px';
                            },
                            onComplete:() => {
                                ScrollTrigger.refresh();
                            }
                        });
                    }
                });

                firstSetup = false;
            })();

            callAfterResize(setCurrentSlide);


            /* Set Blobity data-attribute on buttons */
            let setBlobityRadius;

            (setBlobityRadius = function(){
                reviewSliderNavItems.forEach(reviewSliderNavItem => {
                    let reviewSliderNavItemFill = reviewSliderNavItem.querySelector('.js-review-slider-nav-item-fill');

                    reviewSliderNavItemFill.setAttribute('data-blobity-radius', ((reviewSliderNavItemFill.offsetWidth * 2) + 16) / 2);
                });
            })();

            callAfterResize(setBlobityRadius);



            /* Setup timeline and event listeners for button behavior */
            reviewSliderNavItems.forEach(reviewSliderNavItem => {
                let reviewSliderNavItemFill = reviewSliderNavItem.querySelector('.js-review-slider-nav-item-fill'),
                    reviewSliderNavItemIcon = reviewSliderNavItem.querySelector('.js-review-slider-nav-item-icon'),
                    reviewSliderNavItemTL = gsap.timeline({
                    paused: true,
                    yoyo: true,
                    onStart: () => {
                        blobity.focusElement(reviewSliderNavItemFill);
                        blobity.updateOptions({
                            zIndex: 1
                        });
                    },
                    onComplete: () => {
                        blobity.focusElement(reviewSliderNavItemFill);
                        blobity.updateOptions({
                            zIndex: 1
                        });
                    },
                    onReverseComplete: () => {
                        gsap.set([reviewSliderNavItemIcon, reviewSliderNavItemFill], {
                            clearProps: "all"
                        });

                        blobity.updateOptions({
                            zIndex: 50
                        });
                    }
                });

                reviewSliderNavItemTL.to(reviewSliderNavItemIcon, {
                    color: "#ffffff"
                }, '<');

                reviewSliderNavItemTL.to(reviewSliderNavItemFill, {
                    background: '#ea2c76',
                    borderColor: '#ea2c76',
                    scale: 2
                }, '<');

                /* Add event functions and listeners */
                reviewSliderNavItem.addEventListener("mouseenter", function() {
                    if(window.matchMedia("(pointer: fine)").matches) {
                        reviewSliderNavItemTL.play(0);
                    }
                });
                reviewSliderNavItem.addEventListener("mouseleave", function() {
                    if(window.matchMedia("(pointer: fine)").matches) {
                        blobity.reset();

                        reviewSliderNavItemTL.reverse(0);
                    }
                });
                reviewSliderNavItem.addEventListener("click", function(event) {
                    event.preventDefault();

                    /* Show button animation */
                    if(window.matchMedia("(pointer: coarse)").matches) {
                        reviewSliderNavItemTL.play(0).then(function() {
                            setTimeout(function(){
                                blobity.reset();

                                reviewSliderNavItemTL.reverse(0);
                            }, 125);
                        });
                    }

                    /* Toggle slide */
                    if(reviewSliderNavItem.dataset.direction === 'prev') {
                        if(currentSlide === 1) {
                            currentSlide = reviewSliderListItems.length;
                        } else {
                            currentSlide--;
                        }
                    } else {
                        if(currentSlide === reviewSliderListItems.length) {
                            currentSlide = 1;
                        } else {
                            currentSlide++;
                        }
                    }

                    setCurrentSlide(false);
                });



                /* Invalidate timeline after resize */
                callAfterResize(function() {
                    reviewSliderNavItemTL.seek(0).invalidate();
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
};