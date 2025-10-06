/* Initialize */
export function init(gsap, ScrollTrigger, blobity, callAfterResize) {
    const popunder = document.querySelector('.js-popunder');

    if (popunder) {
        const closeButton = popunder.querySelector('.js-close');

        /* Offset element so it's invisible */
        gsap.set(popunder, {
            y: () => gsap.getProperty(popunder, "bottom") + popunder.offsetHeight + 25,
            onComplete: () => {
                popunder.setAttribute('aria-hidden', 'true');
                ScrollTrigger.refresh();
            }
        });

        /* Show element with ScrollTrigger */
        gsap.to(popunder, {
            scrollTrigger: {
                start: () => window.innerHeight,
                once: true,
                fastScrollEnd: false
            },
            y: 0,
            duration: 0.5,
            onComplete: () => {
                popunder.setAttribute('aria-hidden', 'false');
            }
        });

        /* Set Blobity radius on close button */
        const setBlobityRadius = () => {
            if(blobity) {
                closeButton.setAttribute("data-blobity-offset-x", 0);
                closeButton.setAttribute("data-blobity-offset-y", 0);
                const closeButtonRadius = closeButton.offsetWidth / 2;
                closeButton.setAttribute("data-blobity-radius", closeButtonRadius.toString());
            }
        };

        /* Execute once and on resize */
        setBlobityRadius();
        callAfterResize(setBlobityRadius);

        /* Set Blobity color on hover */
        popunder.addEventListener("mouseenter", () => {
            if (blobity) blobity.updateOptions({ color: '#212121' });
        });

        popunder.addEventListener("mouseleave", () => {
            const currentColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--current-color');
            if (blobity) blobity.updateOptions({ color: currentColor });
        });

        /* Functionality for the close button */
        closeButton.addEventListener("click", () => {
            gsap.to(popunder, {
                autoAlpha: 0,
                onComplete: () => {
                    popunder.setAttribute('aria-hidden', 'true');
                }
            });

            /* Reset Blobity to the current color and bounce effect */
            const currentColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--current-color');
            if(blobity) {
                blobity.updateOptions({color: currentColor});
                blobity.bounce();
            }
        });
    }
}

/* Export init function */
export default {
    init
};