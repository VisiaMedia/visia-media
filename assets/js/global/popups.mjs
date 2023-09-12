/* Initialize */
export function init(gsap, blobity, callAfterResize, disableScroll, enableScroll){
    const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
    const mainBodyContainer = document.querySelector('.js-main-body-container');

    /* Initially hide popups */
    if(document.querySelector('.js-popups') && document.querySelector('.js-popups-single') && document.querySelector('.js-popups-overlay')) {
        let popupContainer = document.querySelector('.js-popups'),
            singlePopups = document.querySelectorAll('.js-popups-single'),
            popupOverlay = document.querySelector('.js-popups-overlay');

        /* Hide elements */
        gsap.set([popupContainer, singlePopups, popupOverlay], {
            autoAlpha:0
        });



        function closeAllPopups() {
            if(popupContainer.classList.contains('js-active')) {
                gsap.to(popupContainer, {
                    autoAlpha:0,
                    onStart:() => {
                        const focusableElements = mainBodyContainer.querySelectorAll(focusableSelectors);
                        focusableElements.forEach(el => el.removeAttribute('tabindex'));

                        /* Update screenreader focus */
                        singlePopups.forEach(singlePopup => {
                            singlePopup.setAttribute('aria-hidden', 'true');
                        });
                        mainBodyContainer.removeAttribute('aria-hidden');

                        /* Update blobity */
                        blobity.updateOptions({
                            zIndex:50,
                            color:gsap.getProperty(document.querySelector('.js-main-body-container'), 'color')
                        });

                        blobity.bounce();

                        /* Enable scrolling */
                        enableScroll();
                    },
                    onComplete:() => {
                        /* Hide popups and overlay */
                        gsap.set([singlePopups, popupOverlay], {
                            autoAlpha:0
                        });

                        /* Remove active class from container */
                        popupContainer.classList.remove('js-active');
                    }
                });
            }
        }



        /* Loop over triggers */
        if(document.querySelector('.js-popup-trigger')) {
            let popupTriggers = document.querySelectorAll('.js-popup-trigger');

            popupTriggers.forEach(popupTrigger => {
                const targetPopup = popupTrigger.dataset.popup;

                /* Check if popup exists */
                if(document.querySelector('.js-popups-single[data-popup='+targetPopup+']')) {
                    let targetPopupElem = document.querySelector('.js-popups-single[data-popup='+targetPopup+']'),
                        targetPopupCloseElem = targetPopupElem.querySelector('.js-popups-single-close');

                    /* Set blobity radius on popup close button */
                    let setBlobityRadius;
                    (setBlobityRadius = function(){
                        targetPopupCloseElem.setAttribute("data-blobity-offset-x", 0);
                        targetPopupCloseElem.setAttribute("data-blobity-offset-y", 0);
                        targetPopupCloseElem.setAttribute("data-blobity-radius", targetPopupCloseElem.offsetWidth / 2);
                    })();

                    callAfterResize(setBlobityRadius);

                    /* Create timeline and animations */
                    let popupTL = gsap.timeline({
                        paused: true,
                        onStart:() => {
                            /* Focus on first element inside the popup */
                            targetPopupElem.querySelector(focusableSelectors).focus();

                            /* Set negative tabindex for all elements inside main body */
                            const focusableElements = mainBodyContainer.querySelectorAll(focusableSelectors);
                            focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));

                            /* Set aria visibility on popup and main body */
                            targetPopupElem.removeAttribute('aria-hidden');
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
                    popupTL.to(popupOverlay, {
                        autoAlpha:1
                    });

                    /* Fade in popup */
                    popupTL.to(targetPopupElem, {
                        autoAlpha:1
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
                    targetPopupCloseElem.addEventListener("click", closeAllPopups);
                }
            });
        }

        /* Add event listener to overlay */
        popupOverlay.addEventListener("click", closeAllPopups);

        /* Add event listener to escape button */
        document.addEventListener("keydown", function(event) {
            const key = event.key;

            if(key === "Escape") {
                closeAllPopups();
            }
        });
    }
}

/* Export init and unload functions */
export default {
    init
};