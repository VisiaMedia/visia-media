/* Initialize */
export function init(gsap, blobity, callAfterResize, disableScroll, enableScroll){
    if(document.querySelector('.js-popup-container')) {
        const popupContainers = document.querySelectorAll('.js-popup-container');
        const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
        const mainBodyContainer = document.querySelector('.js-main-body-container');

        popupContainers.forEach(popupContainer => {
            const singlePopup = popupContainer.querySelector('.js-popup');
            const popupName = singlePopup.dataset.popup;
            const closeButton = popupContainer.querySelector('.js-close');
            const overlay = popupContainer.querySelector('.js-overlay');


            /* Initially hide elements */
            gsap.set([popupContainer, singlePopup, overlay], {
                autoAlpha:0
            });

            gsap.set(popupContainer, {
                display: "flex"
            });

            gsap.set(singlePopup, {
                display: "none"
            });



            /* Set Blobity radius on close button */
            let setBlobityRadius = function() {
                closeButton.setAttribute("data-blobity-offset-x", 0);
                closeButton.setAttribute("data-blobity-offset-y", 0);

                const closeButtonRadius = closeButton.offsetWidth / 2;
                closeButton.setAttribute("data-blobity-radius", closeButtonRadius.toString());
            }

            /* Execute on resize */
            callAfterResize(setBlobityRadius);


            /* Function for closing the popup */
            function closePopup() {
                if(popupContainer.classList.contains('js-active')) {
                    gsap.to(popupContainer, {
                        autoAlpha:0,
                        onStart:() => {
                            const focusableElements = mainBodyContainer.querySelectorAll(focusableSelectors);
                            focusableElements.forEach(el => el.removeAttribute('tabindex'));

                            /* Add negative tabindex to all elements inside popup */
                            const popupFocusableElements = singlePopup.querySelectorAll(focusableSelectors);
                            popupFocusableElements.forEach(el => el.setAttribute('tabindex', '-1'));

                            /* Update screenreader focus */
                            singlePopup.setAttribute('aria-hidden', 'true');
                            mainBodyContainer.setAttribute('aria-hidden', 'false');

                            /* Update blobity */
                            blobity.updateOptions({
                                zIndex:50,
                                color:gsap.getProperty(document.querySelector('body'), 'color')
                            });

                            /* Enable scrolling */
                            enableScroll();
                        },
                        onComplete:() => {
                            /* Hide popups and overlay */
                            gsap.set([singlePopup, overlay], {
                                autoAlpha:0
                            });

                            gsap.set(singlePopup, {
                                display: "none"
                            });

                            /* Remove active class from container */
                            popupContainer.classList.remove('js-active');
                        }
                    });
                }
            }


            /* Function for triggering the popup */
            if(document.querySelector('.js-popup-trigger[data-popup='+popupName+']')) {
                const popupTriggers = document.querySelectorAll('.js-popup-trigger[data-popup='+popupName+']');

                popupTriggers.forEach(popupTrigger => {
                    let popupTL = gsap.timeline({
                        paused: true,
                        onStart:() => {
                            /* Focus on first element inside the popup */
                            singlePopup.querySelector(focusableSelectors).focus();

                            /* Set negative tabindex for all elements inside main body */
                            const focusableElements = mainBodyContainer.querySelectorAll(focusableSelectors);
                            focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));

                            /* Remove (negative) tabindex for all elements inside popup */
                            const popupFocusableElements = singlePopup.querySelectorAll(focusableSelectors);
                            popupFocusableElements.forEach(el => el.removeAttribute('tabindex'));


                            /* Set aria visibility on popup and main body */
                            singlePopup.setAttribute('aria-hidden', 'false');
                            mainBodyContainer.setAttribute('aria-hidden', 'true');

                            /* Disable scrolling */
                            disableScroll();
                        },
                        onComplete:() => {
                            blobity.updateOptions({
                                zIndex: 815,
                                color: '#000'
                            });

                            blobity.reset();
                        }
                    });

                    /* Show popup container */
                    popupTL.set(popupContainer, {
                        autoAlpha:1
                    });

                    /* Fade in overlay */
                    popupTL.to(overlay, {
                        autoAlpha:1
                    });

                    /* Fade in popup */
                    popupTL.to(singlePopup, {
                        autoAlpha:1,
                        display:"block",
                        onComplete:() => {
                            setBlobityRadius();
                        }
                    });

                    /* Create event listener */
                    popupTrigger.addEventListener("click", function(event) {
                        event.preventDefault();

                        popupContainer.classList.add("js-active");

                        popupTL.time(0);

                        /* Play animations */
                        popupTL.play();
                    });

                    /* Add event listener to close button */
                    closeButton.addEventListener("click", closePopup);
                });
            }


            /* Add event listener to overlay */
            overlay.addEventListener("click", closePopup);

            /* Add event listener to escape button */
            document.addEventListener("keydown", function(event) {
                const key = event.key;

                if(key === "Escape") {
                    closePopup();
                }
            });
        });
    }
}

/* Export init and unload functions */
export default {
    init
};