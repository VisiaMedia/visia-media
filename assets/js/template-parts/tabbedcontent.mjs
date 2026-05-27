/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, blobity) {
    const tabbedContents = gsap.utils.toArray('.js-tabbed-content');

    if (tabbedContents.length > 0) {
        /* Loop over instances */
        tabbedContents.forEach(tabbedContent => {
            const tabbedContentTabsContainer = tabbedContent.querySelector('.js-tabbed-content-tabs');
            const tabbedContentButtons = tabbedContent.querySelectorAll('.js-tabbed-content-button');
            const tabbedContentTabs = tabbedContentTabsContainer.querySelectorAll('.js-tabbed-content-tab');
            const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

            /* Set tabs height */
            const setTabsHeight = () => {
                let tallestTab = 0;

                tabbedContentTabs.forEach(tabbedContentTab => {
                    tallestTab = Math.max(tallestTab, tabbedContentTab.offsetHeight);
                });

                gsap.set(tabbedContentTabsContainer, { height: tallestTab + 'px' });
            };

            /* Execute once */
            setTabsHeight();

            /* Clear and rebuild timeline on resize */
            callAfterResize(() => {
                setTabsHeight();
            });

            /* (Re-)set active tab */
            const setPanelFocusableState = (panel, isActive) => {
                panel.querySelectorAll(focusableSelectors).forEach(focusableElement => {
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

            const setActiveTab = (tabNum) => {
                tabbedContentButtons.forEach((button, index) => {
                    const buttonIcon = button.querySelector('.js-tabbed-content-button-icon');
                    const buttonFill = button.querySelector('.js-tabbed-content-button-fill');
                    const isActive = Number(button.dataset.tabNum) === tabNum;

                    button.classList.toggle('js-active', isActive);
                    button.setAttribute('aria-selected', isActive ? 'true' : 'false');
                    button.setAttribute('tabindex', isActive ? '0' : '-1');

                    if (!isActive) {
                        gsap.set([buttonIcon, buttonFill], { clearProps: "all" });
                        gsap.to(button, { autoAlpha: .5 });
                    } else {
                        gsap.to(button, { autoAlpha: 1 });
                    }
                });

                tabbedContentTabs.forEach((tab, index) => {
                    const isActive = Number(tab.dataset.tabNum) === tabNum;

                    tab.setAttribute('aria-hidden', isActive ? 'false' : 'true');
                    tab.setAttribute('tabindex', isActive ? '0' : '-1');
                    setPanelFocusableState(tab, isActive);

                    gsap.to(tab, { autoAlpha: isActive ? 1 : 0 });
                });
            };

            setActiveTab(0);

            /* Button logic */
            tabbedContentButtons.forEach(button => {
                const buttonFill = button.querySelector('.js-tabbed-content-button-fill');
                const buttonIcon = button.querySelector('.js-tabbed-content-button-icon');
                const buttonTl = gsap.timeline({
                    paused: true,
                    yoyo: true,
                    onStart: () => {
                        if(blobity) {
                            blobity.focusElement(buttonFill)
                        }
                    },
                    onComplete: () => {
                        if(blobity) {
                            blobity.focusElement(buttonFill)
                        }
                    },
                    onReverseComplete: () => {
                        gsap.set([buttonIcon, buttonFill], { clearProps: "all" });
                        if (blobity) blobity.updateOptions({ zIndex: 50 });
                    }
                });

                buttonTl.to(button, { autoAlpha: 1 }, '<')
                    .to(buttonIcon, { color: "#ffffff" }, '<')
                    .to(buttonFill, { background: '#ea2c76', borderColor: '#ea2c76', scale: 1.2 }, '<');

                if (button.classList.contains('js-active')) {
                    buttonTl.seek('-=0');
                }

                const setBlobityRadius = () => {
                    if(blobity) {
                        buttonFill.setAttribute('data-blobity-radius', ((buttonFill.offsetWidth * 1.2) + 16) / 2);
                    }
                };

                setBlobityRadius();
                callAfterResize(setBlobityRadius);

                /* Event listeners */
                button.addEventListener("mouseenter", () => {
                    if (!button.classList.contains('js-active') && window.matchMedia("(pointer: fine)").matches) {
                        buttonTl.play(0);
                    } else if (window.matchMedia("(pointer: fine)").matches && blobity) {
                        blobity.focusElement(buttonFill);
                    }
                });

                button.addEventListener("mouseleave", () => {
                    if (!button.classList.contains('js-active') && window.matchMedia("(pointer: fine)").matches) {
                        buttonTl.reverse(0);
                        if (blobity) blobity.reset();
                    } else if (window.matchMedia("(pointer: fine)").matches) {
                        buttonTl.seek('-=0');
                        if (blobity) blobity.reset();
                    }
                });

                button.addEventListener("click", () => {
                    if (!button.classList.contains('js-active')) {
                        buttonTl.seek('-=0');
                    }
                    setActiveTab(Number(button.dataset.tabNum));
                });

                button.addEventListener("keydown", (event) => {
                    const currentIndex = Array.from(tabbedContentButtons).indexOf(button);
                    let targetIndex = null;

                    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                        targetIndex = currentIndex === tabbedContentButtons.length - 1 ? 0 : currentIndex + 1;
                    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                        targetIndex = currentIndex === 0 ? tabbedContentButtons.length - 1 : currentIndex - 1;
                    } else if (event.key === 'Home') {
                        targetIndex = 0;
                    } else if (event.key === 'End') {
                        targetIndex = tabbedContentButtons.length - 1;
                    }

                    if (targetIndex !== null) {
                        event.preventDefault();
                        tabbedContentButtons[targetIndex].focus();
                        tabbedContentButtons[targetIndex].click();
                    }
                });

                /* Invalidate timeline after resize */
                callAfterResize(() => {
                    gsap.set(buttonFill, { clearProps: "scale", onComplete: () => button.classList.contains('js-active') && gsap.set(buttonFill, { scale: 1.2 }) });
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
};
