/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, blobity, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-tabbed-content')) {
        const tabbedContents = gsap.utils.toArray('.js-tabbed-content');

        /* Loop over instances */
        tabbedContents.forEach(tabbedContent => {
            let timeline = tlSetup(tabbedContent, tabbedContent.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(tabbedContent.querySelector('.js-tabbed-content-vertical-text-reveal')) {
                    tlTextReveal(tabbedContent.querySelector('.js-tabbed-content-vertical-text-reveal'), timeline);
                }


                /* Add animation for navigation reveal */
                if(tabbedContent.querySelector('.js-tabbed-content-nav')) {
                    tlFadeIn(tabbedContent.querySelector('.js-tabbed-content-nav'), timeline);
                }


                /* Add animation for container reveal */
                if(tabbedContent.querySelector('.js-tabbed-content-tabs')) {
                    tlFadeIn(tabbedContent.querySelector('.js-tabbed-content-tabs'), timeline);
                }
            }

            /* Execute once */
            buildTimeline();


            /* Set tabs height */
            let setTabsHeight = function() {
                const tabbedContentTabContainer = tabbedContent.querySelector('.js-tabbed-content-tabs'),
                    tabbedContentTabs = tabbedContentTabContainer.querySelectorAll('.js-tabbed-content-tab');

                let tallestTab = 0;

                tabbedContentTabs.forEach(tabbedContentTab => {
                    if(tabbedContentTab.offsetHeight > tallestTab) {
                        tallestTab = tabbedContentTab.offsetHeight;
                    }
                });

                gsap.set(tabbedContentTabContainer, {
                    height: () => {
                        return tallestTab + 'px';
                    }
                });
            }

            /* Execute once */
            setTabsHeight();


            /* Clear and rebuild timeline on resize (only rebuild if not completed) */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);

                setTabsHeight();
            });




            /* Add functionality for tabbing
             *
             * (Re-)set active tab */
            function setActiveTab(tabNum) {
                const buttons = tabbedContent.querySelectorAll('.js-tabbed-content-button'),
                    tabs = tabbedContent.querySelectorAll('.js-tabbed-content-tab');

                /* Loop over buttons to set active */
                buttons.forEach(button => {
                    const curTabNum = Number(button.dataset.tabNum);

                    if(curTabNum === tabNum) {
                        button.classList.add('js-active');
                    } else {
                        const buttonIcon = button.querySelector('.js-tabbed-content-button-icon'),
                            buttonFill = button.querySelector('.js-tabbed-content-button-fill');

                        button.classList.remove('js-active');

                        gsap.set([buttonIcon, buttonFill], {
                            clearProps: "all"
                        });

                        gsap.to(button, {
                            autoAlpha:.5
                        });
                    }
                });

                /* Loop over tabs to set active */
                tabs.forEach(tab => {
                    const curTabNum = Number(tab.dataset.tabNum);

                    if(curTabNum === tabNum) {
                        gsap.to(tab, {
                            autoAlpha:1
                        });
                    } else {
                        gsap.set(tab, {
                            autoAlpha:0
                        });
                    }
                });
            }

            setActiveTab(0);



            /* Button logic */
            const buttons = tabbedContent.querySelectorAll('.js-tabbed-content-button');

            buttons.forEach(button => {
                let buttonFill = button.querySelector('.js-tabbed-content-button-fill'),
                    buttonIcon = button.querySelector('.js-tabbed-content-button-icon'),
                    buttonTl = gsap.timeline({
                        paused: true,
                        yoyo: true,
                        onStart: () => {
                            blobity.focusElement(buttonFill);
                            blobity.updateOptions({
                                zIndex: 1
                            });
                        },
                        onComplete: () => {
                            blobity.focusElement(buttonFill);
                            blobity.updateOptions({
                                zIndex: 1
                            });
                        },
                        onReverseComplete: () => {
                            gsap.set([buttonIcon, buttonFill], {
                                clearProps: "all"
                            });

                            blobity.updateOptions({
                                zIndex: 50
                            });
                        }
                    });

                buttonTl.to(button, {
                    autoAlpha:1
                }, '<');

                buttonTl.to(buttonIcon, {
                    color: "#ffffff"
                }, '<');

                buttonTl.to(buttonFill, {
                    background: '#ea2c76',
                    borderColor: '#ea2c76',
                    scale: 1.2
                }, '<');



                /* Set initial active button */
                if(button.classList.contains('js-active')) {
                    buttonTl.seek('-=0');
                }

                /* Set blobity radius */
                let setBlobityRadius;

                (setBlobityRadius = function(){
                    buttonFill.setAttribute('data-blobity-radius', ((buttonFill.offsetWidth * 1.2) + 16) / 2);
                })();

                callAfterResize(setBlobityRadius);


                /* Set event listeners */
                button.addEventListener("mouseenter", function() {
                    if(window.matchMedia("(pointer: fine)").matches && !button.classList.contains('js-active')) {
                        buttonTl.play(0);
                    } else if(window.matchMedia("(pointer: fine)").matches) {
                        blobity.focusElement(buttonFill);
                    }
                });
                button.addEventListener("mouseleave", function() {
                    if(window.matchMedia("(pointer: fine)").matches && !button.classList.contains('js-active')) {
                        blobity.reset();

                        buttonTl.reverse(0);

                        blobity.bounce();
                    } else if(window.matchMedia("(pointer: fine)").matches) {
                        blobity.reset();

                        buttonTl.seek('-=0');

                        blobity.bounce();
                    }
                });
                button.addEventListener("click", function() {
                    if(!button.classList.contains('js-active')) {
                        if(window.matchMedia("(pointer: coarse)").matches) {
                            buttonTl.play(0);
                        } else {
                            buttonTl.seek('-=0');
                        }
                    }

                    setActiveTab(Number(button.dataset.tabNum));
                });


                /* Invalidate timeline after resize */
                callAfterResize(function() {
                    const buttonFill = button.querySelector('.js-tabbed-content-button-fill');

                    gsap.set(buttonFill, {
                        clearProps:"scale",
                        onComplete:() => {
                            if(button.classList.contains('js-active')) {
                                gsap.set(buttonFill, {
                                    scale: 1.2
                                });
                            }
                        }
                    });
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
};