/* Initialize */
export function init(gsap, blobity, callAfterResize, disableScroll, enableScroll) {
    if (document.querySelector('.js-popup-container')) {
        const popupContainers = document.querySelectorAll('.js-popup-container');
        const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
        const mainBodyContainer = document.querySelector('.js-main-body-container');

        popupContainers.forEach(popupContainer => {
            const singlePopup = popupContainer.querySelector('.js-popup');
            const popupName = singlePopup.dataset.popup;
            const closeButton = popupContainer.querySelector('.js-close');
            const overlay = popupContainer.querySelector('.js-overlay');
            const popupTriggers = document.querySelectorAll(`.js-popup-trigger[data-popup='${popupName}']`);

            /* Initially hide elements */
            gsap.set([popupContainer, singlePopup, overlay], { autoAlpha: 0 });
            gsap.set(popupContainer, { display: "flex" });
            gsap.set(singlePopup, { display: "none" });

            /* Set Blobity radius on close button */
            const setBlobityRadius = () => {
                if(blobity) {
                    const closeButtonRadius = closeButton.offsetWidth / 2;
                    closeButton.setAttribute("data-blobity-radius", closeButtonRadius.toString());
                    closeButton.setAttribute("data-blobity-offset-x", 0);
                    closeButton.setAttribute("data-blobity-offset-y", 0);
                }
            };
            callAfterResize(setBlobityRadius);

            /* Function to close the popup */
            const closePopup = () => {
                if (popupContainer.classList.contains('js-active')) {
                    gsap.to(popupContainer, {
                        autoAlpha: 0,
                        onStart: () => {
                            const focusableElements = mainBodyContainer.querySelectorAll(focusableSelectors);
                            focusableElements.forEach(el => el.removeAttribute('tabindex'));

                            const popupFocusableElements = singlePopup.querySelectorAll(focusableSelectors);
                            popupFocusableElements.forEach(el => el.setAttribute('tabindex', '-1'));

                            popupTriggers.forEach(popupTrigger => popupTrigger.setAttribute('aria-expanded', 'false'));
                            singlePopup.setAttribute('aria-hidden', 'true');
                            mainBodyContainer.setAttribute('aria-hidden', 'false');

                            if(blobity) {
                                blobity.updateOptions({
                                    zIndex: 50,
                                    color: gsap.getProperty(document.querySelector('body'), 'color')
                                });
                            }

                            enableScroll();
                        },
                        onComplete: () => {
                            gsap.set([singlePopup, overlay], { autoAlpha: 0 });
                            gsap.set(singlePopup, { display: "none" });
                            popupContainer.classList.remove('js-active');
                        }
                    });
                }
            };

            /* Function to trigger the popup */
            if (popupTriggers.length > 0) {
                popupTriggers.forEach(popupTrigger => {
                    const popupTL = gsap.timeline({
                        paused: true,
                        onStart: () => {
                            const firstFocusableElement = singlePopup.querySelector(focusableSelectors);
                            if (firstFocusableElement) firstFocusableElement.focus();

                            const focusableElements = mainBodyContainer.querySelectorAll(focusableSelectors);
                            focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));

                            const popupFocusableElements = singlePopup.querySelectorAll(focusableSelectors);
                            popupFocusableElements.forEach(el => el.removeAttribute('tabindex'));

                            popupTrigger.setAttribute('aria-expanded', 'true');
                            singlePopup.setAttribute('aria-hidden', 'false');
                            mainBodyContainer.setAttribute('aria-hidden', 'true');
                            disableScroll();
                        },
                        onComplete: () => {
                            if(blobity) {
                                blobity.updateOptions({zIndex: 815, color: '#000'});
                                blobity.reset();
                            }
                        }
                    });

                    /* Show popup container and fade in */
                    popupTL.set(popupContainer, { autoAlpha: 1 })
                        .to(overlay, { autoAlpha: 1 })
                        .to(singlePopup, {
                            autoAlpha: 1,
                            display: "block",
                            onComplete: () => setBlobityRadius()
                        });

                    const openPopup = event => {
                        event.preventDefault();
                        popupContainer.classList.add("js-active");
                        popupTL.time(0).play();
                    };

                    popupTrigger.addEventListener("click", openPopup);

                    popupTrigger.addEventListener("keydown", event => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            openPopup(event);
                        }
                    });

                    /* Close popup on close button click */
                    closeButton.addEventListener("click", closePopup);
                });
            }

            /* Add event listener to overlay */
            overlay.addEventListener("click", closePopup);

            /* Add event listener to escape key */
            document.addEventListener("keydown", event => {
                if (event.key === "Escape") {
                    closePopup();
                }
            });
        });
    }
}

/* Export init and unload functions */
export default { init };
