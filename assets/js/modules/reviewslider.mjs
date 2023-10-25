/* Initialize */
export function init(gsap, ScrollTrigger, blobity, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-review-slider')) {
        const reviewSliders = gsap.utils.toArray('.js-review-slider');

        /* Loop over instances */
        reviewSliders.forEach(reviewSlider => {
            let currentSlide = 0,
                reviewSliderList = reviewSlider.querySelector('.js-review-slider-list'),
                reviewSliderItems = reviewSlider.querySelectorAll('.js-review-slider-list-item'),
                reviewSliderNavItems = reviewSlider.querySelectorAll('.js-review-slider-nav-item'),
                timeline = tlSetup(reviewSlider, reviewSlider.dataset.stCount);

            /* Build timeline */
            let buildTimeline = function() {
                /* Set stage for each slide */
                reviewSliderItems.forEach(function(reviewSliderItem, i) {
                    if(i === currentSlide) {
                        timeline.to(reviewSliderItem, {
                            autoAlpha:1,
                            immediateRender: false
                        });

                        /* Add animation for thumbnail */
                        if(reviewSliderItem.querySelector('.js-review-slider-list-item-thumbnail')) {
                            tlFadeIn(reviewSliderItem.querySelector('.js-review-slider-list-item-thumbnail'), timeline);
                        }

                        /* Add animation for details */
                        if(reviewSliderItem.querySelector('.js-review-slider-list-item-details')) {
                            tlFadeIn(reviewSliderItem.querySelector('.js-review-slider-list-item-details'), timeline);
                        }

                        /* Add animation for review */
                        if (reviewSliderItem.querySelector('.js-review-slider-list-item-review')) {
                            tlFadeIn(reviewSliderItem.querySelector('.js-review-slider-list-item-review'), timeline);
                        }

                        /* Add animation for navigation */
                        if(reviewSlider.querySelector('.js-review-slider-nav')) {
                            tlFadeIn(reviewSlider.querySelector('.js-review-slider-nav'), timeline);
                        }
                    } else {
                        gsap.set(reviewSliderItem, {
                            autoAlpha:0,
                            immediateRender:false
                        });
                    }
                });
            }

            /* Execute once */
            buildTimeline();


            /* Set slider height */
            let setSliderHeight = function() {
                gsap.to(reviewSliderList, {
                    height: () => {
                        return reviewSliderItems[currentSlide].offsetHeight + 'px';
                    },
                    onComplete:() => {
                        ScrollTrigger.refresh();
                    }
                });
            }

            /* Execute once */
            setSliderHeight();


            /* Set blobity radius */
            let setBlobityRadius = function(){
                reviewSliderNavItems.forEach(reviewSliderNavItem => {
                    let reviewSliderNavItemFill = reviewSliderNavItem.querySelector('.js-review-slider-nav-item-fill');

                    reviewSliderNavItemFill.setAttribute('data-blobity-radius', ((reviewSliderNavItemFill.offsetWidth * 2) + 16) / 2);
                });
            };

            /* Execute once */
            setBlobityRadius();


            /* Clear and rebuild timeline on resize (only rebuild if not completed) */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);

                setBlobityRadius();
            });




            /* Set current slide */
            function setCurrentSlide() {
                setSliderHeight();

                reviewSliderItems.forEach(function(reviewSliderItem, i) {
                    if(i === currentSlide) {
                        gsap.to(reviewSliderItem, {
                            delay:.25,
                            autoAlpha: 1
                        });
                    } else {
                        gsap.to(reviewSliderItem, {
                            autoAlpha: 0,
                            overwrite:true
                        });
                    }
                });
            }


            /* Setup button behavior */
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
                        if(currentSlide === 0) {
                            currentSlide = (reviewSliderItems.length - 1);
                        } else {
                            currentSlide--;
                        }
                    } else {
                        if(currentSlide === (reviewSliderItems.length - 1)) {
                            currentSlide = 0;
                        } else {
                            currentSlide++;
                        }
                    }

                    setCurrentSlide();
                });



                /* Invalidate timeline after resize */
                callAfterResize(function() {
                    reviewSliderNavItemTL.seek(0).invalidate();

                    setCurrentSlide();
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
}