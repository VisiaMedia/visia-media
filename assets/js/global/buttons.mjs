/* Initialize */
export function init(gsap, blobity, callAfterResize) {
    const globalButtons = document.querySelectorAll('.js-global-button');
    const roundedButtons = document.querySelectorAll('.js-rounded-button');

    /* Global Buttons */
    if (globalButtons.length > 0) {
        globalButtons.forEach(globalButton => {
            const globalButtonIcon = globalButton.querySelector('.js-global-button-icon');
            const globalButtonFill = globalButton.querySelector('.js-global-button-fill');
            const isBoxedContent = globalButton.classList.contains('js-boxed-content-button');
            const activePopupContainer = () => globalButton.closest('.js-popup-container.js-active');
            const getBlobityHoverZIndex = () => activePopupContainer() ? 815 : (isBoxedContent ? 25 : 1);
            const getBlobityResetZIndex = () => activePopupContainer() ? 815 : 50;

            /* Set Blobity data-attribute on buttons */
            const setBlobityRadius = () => {
                if(blobity) {
                    globalButtonFill.setAttribute('data-blobity-radius', ((globalButtonFill.offsetWidth * 2) + 16) / 2);
                }
            };

            setBlobityRadius();
            callAfterResize(setBlobityRadius);

            /* Setup timeline */
            let globalButtonTl = gsap.timeline({
                paused: true,
                yoyo: true,
                onStart: () => {
                    if(blobity) {
                        blobity.focusElement(globalButtonFill);
                        blobity.updateOptions({zIndex: getBlobityHoverZIndex()});
                    }
                },
                onComplete: () => {
                    if(blobity) {
                        blobity.focusElement(globalButtonFill);
                        blobity.updateOptions({zIndex: getBlobityHoverZIndex()});
                    }
                },
                onReverseComplete: () => {
                    gsap.set([globalButtonIcon, globalButtonFill], { clearProps: "all" });
                    if (blobity) blobity.updateOptions({ zIndex: getBlobityResetZIndex() });
                }
            });

            globalButtonTl.to(globalButtonIcon, { color: "#ffffff" }, '<')
                .to(globalButtonFill, {
                    background: '#ea2c76',
                    borderColor: '#ea2c76',
                    scale: 2
                }, '<');

            /* Event listeners */
            const handleMouseEnter = () => {
                if (window.matchMedia("(pointer: fine)").matches) {
                    globalButtonTl.play(0);
                }
            };

            const handleMouseLeave = () => {
                if (window.matchMedia("(pointer: fine)").matches) {
                    if (blobity) blobity.reset();
                    globalButtonTl.reverse(0);
                    if (blobity) blobity.bounce();
                }
            };

            const handleClick = () => {
                if (window.matchMedia("(pointer: coarse)").matches) {
                    globalButtonTl.play(0).then(() => {
                        setTimeout(() => globalButtonTl.reverse(0), 125);
                    });
                }
            };

            globalButton.addEventListener("mouseenter", handleMouseEnter);
            globalButton.addEventListener("mouseleave", handleMouseLeave);
            globalButton.addEventListener("click", handleClick);

            /* Invalidate timeline after resize */
            callAfterResize(() => globalButtonTl.seek(0).invalidate());
        });
    }

    /* Rounded Buttons */
    if (roundedButtons.length > 0) {
        roundedButtons.forEach(roundedButton => {
            const roundedButtonOutline = roundedButton.querySelector('.js-rounded-button-outline');

            const handleMouseEnter = () => {
                if (window.matchMedia("(pointer: fine)").matches) {
                    if (blobity) blobity.updateOptions({ opacity: 0 });
                    gsap.to(roundedButtonOutline, { duration: 0.225, inset: '-8px' });
                }
            };

            const handleMouseLeave = () => {
                if (window.matchMedia("(pointer: fine)").matches) {
                    if (blobity) blobity.updateOptions({ opacity: 0.1 });
                    gsap.to(roundedButtonOutline, { duration: 0.225, inset: '0px' });
                }
            };

            roundedButton.addEventListener("mouseenter", handleMouseEnter);
            roundedButton.addEventListener("mouseleave", handleMouseLeave);
        });
    }
}

/* Export init and unload functions */
export default {
    init
};
