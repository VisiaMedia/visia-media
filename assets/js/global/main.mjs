let mainMenuButton, mainMenu, middleMenu, middleMenuBg, mainMenuRevealTl, mainMenuButtonQuakeTl;

/* Initialize */
export function init(gsap, blobity, callAfterResize, disableScroll, enableScroll) {
    /* Set Blobity z-index */
    if (blobity) blobity.updateOptions({ zIndex: 50 });

    /* Remove Blobity on logo hover */
    const topBarLogo = document.querySelector('.js-top-bar-logo');
    if (topBarLogo && blobity) {
        topBarLogo.addEventListener("mouseenter", () => blobity.updateOptions({ opacity: 0 }));
        topBarLogo.addEventListener("mouseleave", () => blobity.updateOptions({ opacity: 0.1 }));
    }

    middleMenu = document.querySelector('.js-middle-menu');
    middleMenuBg = document.querySelector('.js-middle-menu-bg');

    const setMiddleMenuBg = () => {
        if (middleMenu && middleMenuBg) {
            const middleMenuStyle = getComputedStyle(middleMenu);

            if (middleMenuStyle.display === 'none') {
                middleMenuBg.style.setProperty('--middle-menu-width', '0px');
                middleMenuBg.style.setProperty('--middle-menu-height', '0px');
                return;
            }

            const middleMenuRect = middleMenu.getBoundingClientRect();

            middleMenuBg.style.setProperty('--middle-menu-top', `${middleMenuRect.top}px`);
            middleMenuBg.style.setProperty('--middle-menu-left', `${middleMenuRect.left}px`);
            middleMenuBg.style.setProperty('--middle-menu-width', `${middleMenuRect.width}px`);
            middleMenuBg.style.setProperty('--middle-menu-height', `${middleMenuRect.height}px`);
        }
    };

    setMiddleMenuBg();
    callAfterResize(setMiddleMenuBg);

    /* Main Menu Logic */
    mainMenuButton = document.querySelector('.js-main-menu-button');
    mainMenu = document.querySelector('.js-main-menu');

    if (mainMenuButton && mainMenu) {
        /* Initially set main menu to 'hidden' */
        mainMenu.setAttribute('aria-hidden', 'true');

        /* Set Blobity radius on button and side block icons */
        const setBlobityRadius = () => {
            if(blobity) {
                mainMenuButton.setAttribute("data-blobity-radius", (mainMenuButton.offsetWidth + 16) / 2);
                gsap.utils.toArray(".js-main-menu-side-block-icon-link").forEach(iconLink => {
                    iconLink.setAttribute("data-blobity-radius", (iconLink.offsetWidth + 12) / 2);
                });
                gsap.utils.toArray(".js-middle-menu .js-button > a").forEach(button => {
                    const blobityOffsetY = button.getAttribute("data-blobity-offset-y")
                        ? parseFloat(button.getAttribute("data-blobity-offset-y"))
                        : blobity.options.focusableElementsOffsetY;

                    button.setAttribute("data-blobity-radius", Math.round((button.getBoundingClientRect().height + (blobityOffsetY * 2)) / 2));
                });
            }
        };

        setBlobityRadius();
        callAfterResize(setBlobityRadius);

        gsap.utils.toArray(".js-middle-menu a").forEach(menuItem => {
            menuItem.addEventListener("mouseenter", () => {
                if (window.matchMedia("(pointer: fine)").matches && blobity && mainMenu.classList.contains("js-is-inactive")) {
                    blobity.updateOptions({ zIndex: 750 });
                }
            });

            menuItem.addEventListener("mouseleave", () => {
                if (window.matchMedia("(pointer: fine)").matches && blobity && mainMenu.classList.contains("js-is-inactive")) {
                    blobity.updateOptions({ zIndex: 50 });
                }
            });
        });

        /* Set menu font-size */
        const setMenuItemSize = () => {
            const menuList = document.querySelector('.js-main-menu-list');
            const menuListItems = menuList.querySelectorAll('.js-main-menu-item');
            const containerPadding = 8 * parseFloat(getComputedStyle(document.body).fontSize);
            const menuListOffset = document.querySelector('.js-top-bar').offsetHeight;
            const workingHeight = window.innerHeight - containerPadding - menuListOffset;
            let returnValue = workingHeight / menuListItems.length;

            returnValue = returnValue < parseFloat(getComputedStyle(document.body).fontSize)
                ? parseFloat(getComputedStyle(document.body).fontSize)
                : returnValue;

            document.documentElement.style.setProperty('--menu-font-size', returnValue + 'px');
        };

        setMenuItemSize();
        let menuItemSizeTimer;
        window.onresize = () => {
            clearTimeout(menuItemSizeTimer);
            menuItemSizeTimer = setTimeout(setMenuItemSize, 100);
        };

        let middleMenuClosedColor, middleMenuBgClosedColor;
        const getMiddleMenuColorTargets = () => [middleMenu, middleMenuBg].filter(Boolean);

        const animateMiddleMenuOpen = () => {
            const middleMenuColorTargets = getMiddleMenuColorTargets();

            gsap.killTweensOf(middleMenuColorTargets, "color");

            if (!middleMenuClosedColor && middleMenu) {
                middleMenuClosedColor = gsap.getProperty(middleMenu, "color");
            }

            if (!middleMenuBgClosedColor && middleMenuBg) {
                middleMenuBgClosedColor = gsap.getProperty(middleMenuBg, "color");
            }

            gsap.to(middleMenuColorTargets, { duration: 0.2, color: '#FFFFFF' });
        };

        const animateMiddleMenuClosed = () => {
            const middleMenuColorTargets = getMiddleMenuColorTargets();

            gsap.killTweensOf(middleMenuColorTargets, "color");

            gsap.to(middleMenuColorTargets, {
                duration: 0.2,
                color: (index, target) => target === middleMenu ? middleMenuClosedColor : middleMenuBgClosedColor,
                onComplete: () => {
                    gsap.set(middleMenuColorTargets, { clearProps: "color" });
                    middleMenuClosedColor = null;
                    middleMenuBgClosedColor = null;
                }
            });
        };

        /* Reset positions for button lines */
        gsap.set(".js-main-menu-button-line-top", { y: "-0.4em" });
        gsap.set(".js-main-menu-button-line-bottom", { y: "0.4em" });

        /* Hide initial menu elements */
        gsap.set([".js-main-menu-button-quake", ".js-main-menu-bg-reveal"], { scale: 0 });
        gsap.set(".js-main-menu-bg-reveal-filler", { autoAlpha: 0 });
        gsap.set(mainMenu, { autoAlpha: 0, display: "flex" });
        gsap.set(".js-main-menu-item-wrapper", { yPercent: 100 });
        gsap.set(".js-main-menu-side-block", { autoAlpha: 0 });

        /* Hide top bar on scroll (mobile) */
        const topBar = document.querySelector(".js-top-bar");
        const topBarItems = [topBar, middleMenu, middleMenuBg].filter(Boolean);
        const getTopBarHiddenY = (index, target) => -target.getBoundingClientRect().bottom;
        let lastScrollTop = 0, didScroll, delta = 15;

        window.onscroll = () => didScroll = true;
        setInterval(() => { if (didScroll) hasScrolled(); didScroll = false; }, 250);

        const hasScrolled = () => {
            if (window.matchMedia("(pointer: coarse)").matches) {
                const st = document.documentElement.scrollTop;
                if (Math.abs(lastScrollTop - st) <= delta) return;
                if (st > lastScrollTop) {
                    gsap.to(topBarItems, { duration: 0.5, y: getTopBarHiddenY });
                } else {
                    gsap.to(topBarItems, { duration: 0.5, y: 0 });
                }
                lastScrollTop = st;
            }
        };

        /* Main menu reveal animation */
        mainMenuRevealTl = gsap.timeline({
            paused: true,
            yoyo: true,
            onComplete: () => {
                mainMenu.setAttribute('aria-hidden', 'false');
                setBlobityRadius();
            },
            onReverseComplete: () => {
                gsap.set('.js-main-menu-button-line-bottom', { clearProps: 'width' });
                mainMenu.setAttribute('aria-hidden', 'true');
            }
        });

        callAfterResize(() => {
            mainMenuRevealTl.seek(0, false).invalidate();
            mainMenu.classList.add("js-is-inactive");
        });

        mainMenuRevealTl.addLabel("start")
            .to(".js-main-menu-button-line-bottom", {
                width: () => gsap.getProperty('.js-main-menu-button-line-top', 'width', 'px')
            })
            .addLabel("startHovered")
            .to(".js-main-menu-button-line-top, .js-main-menu-button-line-bottom", { y: 0 })
            .to(".js-main-menu-button-line-bottom", { duration: 0, autoAlpha: 0 })
            .to(".js-main-menu-button-line-top", { rotation: -45 }, '<')
            .to(".js-main-menu-button-line-middle", { rotation: 45 }, '<')
            .to(".js-main-menu-button", {
                color: '#FFFFFF',
                onReverseComplete: () => {
                    gsap.set(".js-main-menu-button", { clearProps: "color" });
                    gsap.set(".js-main-menu-button-line-bottom", {
                        width: gsap.getProperty('.js-main-menu-button-line-top', 'width', 'px'), // Reset to the top width when reversing
                        autoAlpha: 1 // Ensure visibility
                    });
                }
            }, '<')
            .to(".js-main-menu-bg-reveal", {
                duration: 0.625,
                scale: () => (Math.max(window.innerWidth, window.innerHeight) / 10) * 2.4,
                onStart: () => {
                    animateMiddleMenuOpen();
                    if (blobity) blobity.updateOptions({ color: '#ffffff', zIndex: 750 });
                    if (blobity) blobity.bounce();
                    disableScroll();
                },
                onReverseComplete: () => {
                    if (blobity) {
                        blobity.updateOptions({
                            color: gsap.getProperty("body", "color"),
                            zIndex: 50
                        });

                        blobity.bounce();
                    }
                    enableScroll();
                }
            }, '<')
            .to(".js-main-menu-bg-reveal-filler", { duration: 0, autoAlpha: 1 })
            .to(mainMenu, { duration: 0, autoAlpha: 1 })
            .to(".js-main-menu-item-wrapper", { stagger: 0.1, yPercent: 0 })
            .to(".js-main-menu-side-block", { stagger: 0.1, autoAlpha: 1 })
            .addLabel("end")
            .call(() => {
                if (mainMenu.classList.contains("js-is-inactive")) {
                    animateMiddleMenuClosed();
                }
            }, null, "startHovered+=0.25");

        /* Initialize the quake timeline for the menu button */
        mainMenuButtonQuakeTl = gsap.timeline({
            paused: true,
            onComplete: () => {
                mainMenuButtonQuakeTl.time(0).pause();
            }
        });

        mainMenuButtonQuakeTl.to(".js-main-menu-button-quake", {
            duration: 0.5,
            scale: 2.5,
            autoAlpha: 0
        });

        /* Menu button click event */
        mainMenuButton.addEventListener("click", (event) => {
            event.preventDefault();
            mainMenuButtonQuakeTl.play();
            if (mainMenu.classList.contains("js-is-inactive")) {
                mainMenuRevealTl.timeScale(1).tweenTo("endHovered");
                mainMenu.classList.remove("js-is-inactive");
            } else {
                mainMenuRevealTl.timeScale(1.5).tweenTo("startHovered");
                mainMenu.classList.add("js-is-inactive");
            }
        });

        /* Menu button hover event */
        mainMenuButton.addEventListener("mouseenter", () => {
            if (mainMenu.classList.contains("js-is-inactive")) {
                mainMenuRevealTl.tweenTo("startHovered");
            }
        });

        mainMenuButton.addEventListener("mouseleave", () => {
            if (mainMenu.classList.contains("js-is-inactive")) {
                mainMenuRevealTl.tweenTo("start");
            }
        });

        /* Close menu on 'Escape' key */
        document.addEventListener("keydown", (event) => {
            if (!mainMenu.classList.contains("js-is-inactive") && event.key === "Escape") {
                mainMenuRevealTl.timeScale(1.5).tweenTo("startHovered", {
                    onComplete: () => mainMenuRevealTl.timeScale(1).tweenTo("start")
                });
                mainMenu.classList.add("js-is-inactive");
            }
        });

        /* Menu item hover animation */
        gsap.utils.toArray(".js-main-menu-item").forEach(mainMenuItem => {
            const mainMenuItemHoverTl = gsap.timeline({ paused: true, yoyo: true });
            const mainMenuItemLink = mainMenuItem.querySelector('.js-main-menu-item-link');
            const mainMenuItemMasker = mainMenuItem.querySelector('.js-main-menu-item-masker');

            gsap.set(mainMenuItemMasker, { width: "0" });
            mainMenuItemHoverTl.to(mainMenuItemMasker, { width: "auto" });

            mainMenuItemLink.addEventListener("mouseenter", () => mainMenuItemHoverTl.play(0));
            mainMenuItemLink.addEventListener("mouseleave", () => mainMenuItemHoverTl.reverse(0));
        });
    }

    /* Set top bar height CSS variable */
    const setTopBarHeightVar = () => {
        const topBar = document.querySelector('.js-top-bar');
        if (topBar) {
            document.documentElement.style.setProperty('--top-bar-height', `${topBar.offsetHeight}px`);
        }
    };

    setTopBarHeightVar();
    callAfterResize(setTopBarHeightVar);

    /* Set main menu offset */
    const setMainMenuOffset = () => {
        const topBar = document.querySelector('.js-top-bar');
        const mainMenuList = document.querySelector('.js-main-menu-list');
        if (topBar && mainMenuList) {
            mainMenuList.style.paddingTop = topBar.offsetHeight + 'px';
        }
    };

    setMainMenuOffset();
    callAfterResize(setMainMenuOffset);
}

/* Unload */
export function unload(gsap, enableScroll) {
    /* Clear properties on menu button */
    gsap.set(".js-main-menu-button-line-top, .js-main-menu-button-line-bottom, .js-main-menu-button-quake", { clearProps: "all" });

    /* Clear menu inactive class */
    if (mainMenu) {
        mainMenu.classList.add("js-is-inactive");
    }

    /* Clear middle-menu colors */
    gsap.set(".js-middle-menu, .js-middle-menu-bg", { clearProps: "color" });

    /* Remove topbar logo event listeners */
    const topBarLogo = document.querySelector('.js-top-bar-logo');
    if (topBarLogo) {
        const newTopBarLogo = topBarLogo.cloneNode(true);
        topBarLogo.parentNode.replaceChild(newTopBarLogo, topBarLogo);
    }

    /* Remove menu-button event listeners */
    if (mainMenuButton) {
        const newMainMenuButton = mainMenuButton.cloneNode(true);
        mainMenuButton.parentNode.replaceChild(newMainMenuButton, mainMenuButton);
    }

    /* Remove middle-menu event listeners */
    gsap.utils.toArray(".js-middle-menu a").forEach(menuItem => {
        const newMenuItem = menuItem.cloneNode(true);
        menuItem.parentNode.replaceChild(newMenuItem, menuItem);
    });

    /* Remove event listeners from menu items */
    gsap.utils.toArray(".js-main-menu-item").forEach(mainMenuItem => {
        const newMainMenuItem = mainMenuItem.cloneNode(true);
        mainMenuItem.parentNode.replaceChild(newMainMenuItem, mainMenuItem);
    });

    /* Enable scrolling */
    enableScroll();

    /* Clear global variables */
    mainMenuButton = mainMenu = middleMenu = middleMenuBg = mainMenuRevealTl = mainMenuButtonQuakeTl = null;
}

/* Export init and unload functions */
export default {
    init,
    unload
};
