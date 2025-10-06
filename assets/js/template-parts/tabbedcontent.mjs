/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, blobity, tlSetup, tlTextReveal, tlFadeIn) {
    const tabbedContents = gsap.utils.toArray('.js-tabbed-content');

    if (tabbedContents.length > 0) {
        /* Loop over instances */
        tabbedContents.forEach(tabbedContent => {
            const tabbedContentVerticalTextReveal = tabbedContent.querySelector('.js-tabbed-content-vertical-text-reveal');
            const tabbedContentNav = tabbedContent.querySelector('.js-tabbed-content-nav');
            const tabbedContentTabsContainer = tabbedContent.querySelector('.js-tabbed-content-tabs');
            const tabbedContentButtons = tabbedContent.querySelectorAll('.js-tabbed-content-button');
            const tabbedContentTabs = tabbedContentTabsContainer.querySelectorAll('.js-tabbed-content-tab');

            let timeline = tlSetup(tabbedContent, tabbedContent.dataset.stCount);

            /* Build timeline */
            const buildTimeline = function() {
                if (tabbedContentVerticalTextReveal) {
                    tlTextReveal(tabbedContentVerticalTextReveal, timeline);
                }

                if (tabbedContentNav) {
                    tlFadeIn(tabbedContentNav, timeline);
                }

                if (tabbedContentTabsContainer) {
                    tlFadeIn(tabbedContentTabsContainer, timeline);
                }
            };

            /* Execute once */
            buildTimeline();

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
                buildTlAfterResize(timeline, buildTimeline);
                setTabsHeight();
            });

            /* (Re-)set active tab */
            const setActiveTab = (tabNum) => {
                tabbedContentButtons.forEach((button, index) => {
                    const buttonIcon = button.querySelector('.js-tabbed-content-button-icon');
                    const buttonFill = button.querySelector('.js-tabbed-content-button-fill');
                    const isActive = Number(button.dataset.tabNum) === tabNum;

                    button.classList.toggle('js-active', isActive);

                    if (!isActive) {
                        gsap.set([buttonIcon, buttonFill], { clearProps: "all" });
                        gsap.to(button, { autoAlpha: .5 });
                    } else {
                        gsap.to(button, { autoAlpha: 1 });
                    }
                });

                tabbedContentTabs.forEach((tab, index) => {
                    gsap.to(tab, { autoAlpha: Number(tab.dataset.tabNum) === tabNum ? 1 : 0 });
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