/* Initialize */
export function init(gsap, ScrollTrigger, blobity, callAfterResize) {
    const reviewSliders = gsap.utils.toArray('.js-review-slider');

    if (reviewSliders.length > 0) {
        reviewSliders.forEach(reviewSlider => {
            let currentSlide = 0;
            const reviewSliderList = reviewSlider.querySelector('.js-review-slider-list');
            const reviewSliderItems = reviewSlider.querySelectorAll('.js-review-slider-list-item');
            const reviewSliderNavItems = reviewSlider.querySelectorAll('.js-review-slider-nav-item');
            const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

            const setSlideState = (slide, isActive) => {
                slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');

                slide.querySelectorAll(focusableSelectors).forEach(focusableElement => {
                    if (isActive) {
                        if (focusableElement.dataset.originalTabindex) {
                            focusableElement.setAttribute('tabindex', focusableElement.dataset.originalTabindex);
                            delete focusableElement.dataset.originalTabindex;
                        } else {
                            focusableElement.removeAttribute('tabindex');
                        }
                    } else {
                        if (focusableElement.hasAttribute('tabindex')) {
                            focusableElement.dataset.originalTabindex = focusableElement.getAttribute('tabindex');
                        }
                        focusableElement.setAttribute('tabindex', '-1');
                    }
                });
            };

            gsap.set(reviewSliderItems, { autoAlpha: 0 });
            gsap.set(reviewSliderItems[currentSlide], { autoAlpha: 1 });
            reviewSliderItems.forEach((item, index) => setSlideState(item, index === currentSlide));

            /* Set slider height */
            const setSliderHeight = () => {
                gsap.to(reviewSliderList, {
                    height: reviewSliderItems[currentSlide].offsetHeight + 'px',
                    onComplete: ScrollTrigger.refresh
                });
            };

            setSliderHeight(); // Execute once

            /* Set blobity radius */
            const setBlobityRadius = () => {
                if(blobity) {
                    reviewSliderNavItems.forEach(reviewSliderNavItem => {
                        const reviewSliderNavItemFill = reviewSliderNavItem.querySelector('.js-review-slider-nav-item-fill');
                        reviewSliderNavItemFill.setAttribute('data-blobity-radius', ((reviewSliderNavItemFill.offsetWidth * 2) + 16) / 2);
                    });
                }
            };

            setBlobityRadius(); // Execute once

            /* Clear and rebuild timeline on resize */
            callAfterResize(() => {
                if(blobity) setBlobityRadius();
                setSliderHeight();
            });

            /* Set current slide */
            const setCurrentSlide = () => {
                setSliderHeight();
                reviewSliderItems.forEach((item, index) => {
                    setSlideState(item, index === currentSlide);
                });
                gsap.to(reviewSliderItems, {
                    autoAlpha: 0,
                    overwrite: true
                });
                gsap.to(reviewSliderItems[currentSlide], {
                    delay: 0.25,
                    autoAlpha: 1
                });
            };

            /* Setup button behavior */
            reviewSliderNavItems.forEach(reviewSliderNavItem => {
                const reviewSliderNavItemFill = reviewSliderNavItem.querySelector('.js-review-slider-nav-item-fill');
                const reviewSliderNavItemIcon = reviewSliderNavItem.querySelector('.js-review-slider-nav-item-icon');
                const reviewSliderNavItemTL = gsap.timeline({
                    paused: true,
                    yoyo: true,
                    onStart: () => {
                        if(blobity) {
                            blobity.focusElement(reviewSliderNavItemFill);
                            blobity.updateOptions({zIndex: 1});
                        }
                    },
                    onComplete: () => {
                        if(blobity) {
                            blobity.focusElement(reviewSliderNavItemFill);
                            blobity.updateOptions({zIndex: 1});
                        }
                    },
                    onReverseComplete: () => {
                        gsap.set([reviewSliderNavItemIcon, reviewSliderNavItemFill], { clearProps: "all" });
                        if (blobity) blobity.updateOptions({ zIndex: 50 });
                    }
                });

                reviewSliderNavItemTL.to(reviewSliderNavItemIcon, { color: "#ffffff" }, '<');
                reviewSliderNavItemTL.to(reviewSliderNavItemFill, { background: '#ea2c76', borderColor: '#ea2c76', scale: 2 }, '<');

                /* Event functions and listeners */
                reviewSliderNavItem.addEventListener("mouseenter", () => {
                    if (window.matchMedia("(pointer: fine)").matches) {
                        reviewSliderNavItemTL.play(0);
                    }
                });

                reviewSliderNavItem.addEventListener("mouseleave", () => {
                    if (window.matchMedia("(pointer: fine)").matches) {
                        if (blobity) blobity.reset();
                        reviewSliderNavItemTL.reverse(0);
                    }
                });

                reviewSliderNavItem.addEventListener("click", (event) => {
                    event.preventDefault();

                    /* Show button animation */
                    if (window.matchMedia("(pointer: coarse)").matches) {
                        reviewSliderNavItemTL.play(0).then(() => {
                            setTimeout(() => {
                                if (blobity) blobity.reset();
                                reviewSliderNavItemTL.reverse(0);
                            }, 125);
                        });
                    }

                    /* Toggle slide */
                    if (reviewSliderNavItem.dataset.direction === 'prev') {
                        currentSlide = currentSlide === 0 ? reviewSliderItems.length - 1 : currentSlide - 1;
                    } else {
                        currentSlide = currentSlide === reviewSliderItems.length - 1 ? 0 : currentSlide + 1;
                    }

                    setCurrentSlide();
                });

                /* Invalidate timeline after resize */
                callAfterResize(() => {
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
