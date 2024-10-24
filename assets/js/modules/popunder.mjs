export function init(gsap, ScrollTrigger, blobity, callAfterResize){
    if(document.querySelector('.js-popunder')) {
        const popunder = document.querySelector('.js-popunder'),
            closeButton = popunder.querySelector('.js-close');

        /* Offset element so its invisible */
        gsap.set(popunder, {
            y:() => {
                return gsap.getProperty(popunder, "bottom") + popunder.offsetHeight + 25;
            },
            onComplete:() => {
               popunder.setAttribute('aria-hidden', 'true');

               ScrollTrigger.refresh();
            }
        });

        /* Show element */
        gsap.to(popunder, {
            scrollTrigger: {
                start: () => {
                    return window.innerHeight;
                },
                once: true,
                fastScrollEnd: false
            },
            y: 0,
            duration:.5,
            onComplete:() => {
                popunder.setAttribute('aria-hidden', 'false');
            }
        });



        /* Set Blobity radius on close button */
        let setBlobityRadius = function() {
            closeButton.setAttribute("data-blobity-offset-x", 0);
            closeButton.setAttribute("data-blobity-offset-y", 0);

            const closeButtonRadius = closeButton.offsetWidth / 2;
            closeButton.setAttribute("data-blobity-radius", closeButtonRadius.toString());
        }

        /* Execute once */
        setBlobityRadius();

        /* Execute on resize */
        callAfterResize(setBlobityRadius);



        /* Set blobity color on hover */
        popunder.addEventListener("mouseenter", function() {
            blobity.updateOptions({
                color: '#212121'
            });
        });
        popunder.addEventListener("mouseleave", function() {
            blobity.updateOptions({
                color: getComputedStyle(document.querySelector(':root')).getPropertyValue('--current-color')
            });
        });



        /* Functionality for the close button */
        closeButton.addEventListener("click", function() {
            gsap.to(popunder, {
                autoAlpha: 0,
                onComplete:() => {
                    popunder.setAttribute('aria-hidden', 'true');
                }
            });

            /* Reset blobity */
            blobity.updateOptions({
                color: getComputedStyle(document.querySelector(':root')).getPropertyValue('--current-color')
            });

            blobity.bounce();
        });
    }
}

/* Export init function */
export default {
    init
};