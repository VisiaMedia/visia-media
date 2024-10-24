let mainMenuButton,
    mainMenu,
    mainMenuRevealTl;

/* Initialize */
export function init(gsap, blobity, callAfterResize, disableScroll, enableScroll){
    /* Set blobity z-index */
    blobity.updateOptions({
        zIndex: 50
    });



    /* Remove blobity on logo hover */
    if(document.querySelector('.js-top-bar-logo')) {
        const topBarLogo = document.querySelector('.js-top-bar-logo');

        topBarLogo.addEventListener("mouseenter", function() {
            blobity.updateOptions({
                opacity: 0
            });
        });

        topBarLogo.addEventListener("mouseleave", function() {
            blobity.updateOptions({
                opacity:0.1
            });
        });
    }


    /* Main menu logic */
    if(document.querySelector('.js-main-menu-button') && document.querySelector('.js-main-menu')) {
        mainMenuButton = document.querySelector('.js-main-menu-button');
        mainMenu = document.querySelector('.js-main-menu');



        /* Initially set main menu to 'hidden' */
        mainMenu.setAttribute('aria-hidden', 'true');



        /* Set Blobity data-attribute on menu-button and side block icon links */
        let setBlobityRadius;
        (setBlobityRadius = function(){
            mainMenuButton.setAttribute("data-blobity-radius", (mainMenuButton.offsetWidth + 16) / 2);

            /* Set Blobity data-attribute on side block icon links */
            gsap.utils.toArray(".js-main-menu-side-block-icon-link").forEach(mainMenuSideBlocksIconLink => {
                mainMenuSideBlocksIconLink.setAttribute("data-blobity-radius", (mainMenuSideBlocksIconLink.offsetWidth + 12) / 2);
            });
        })();

        callAfterResize(setBlobityRadius);



        /* Determine and set menu font-size */
        const setMenuItemSize =  function() {
            const menuList = document.querySelector('.js-main-menu-list'),
                menuListItems = menuList.querySelectorAll('.js-main-menu-item'),
                containerPadding = 8 * parseFloat(getComputedStyle(document.body).fontSize),
                menuListOffset = document.querySelector('.js-top-bar').offsetHeight,
                workingHeight = window.innerHeight - containerPadding - menuListOffset;

            let returnValue = workingHeight / menuListItems.length;

            if(returnValue < parseFloat(getComputedStyle(document.body).fontSize)) {
                returnValue = parseFloat(getComputedStyle(document.body).fontSize);
            }

            document.querySelector(':root').style.setProperty('--menu-font-size', returnValue + 'px');
        }

        /* Execute once */
        setMenuItemSize();

        /* Execute on resize */
        let menuItemSizeTimer;

        window.onresize = function() {
            clearTimeout(menuItemSizeTimer);
            menuItemSizeTimer = setTimeout(function() {
                setMenuItemSize();
            }, 100);
        };





        /* Reset positions for button lines */
        gsap.set(".js-main-menu-button-line-top", {
            y: "-0.4em"
        });

        gsap.set(".js-main-menu-button-line-bottom", {
            y: "0.4em"
        });

        /* Hide menu self and BG reveal */
        gsap.set(".js-main-menu-button-quake", {
            scale: 0
        });

        gsap.set(".js-main-menu-bg-reveal", {
           scale: 0
        });

        gsap.set(".js-main-menu-bg-reveal-filler", {
           autoAlpha: 0
        });

        gsap.set(".js-main-menu", {
            autoAlpha: 0,
            display: "flex"
        });

        gsap.set(".js-main-menu-item-wrapper", {
            yPercent: 100
        });

        gsap.set(".js-main-menu-side-block", {
            autoAlpha: 0
        });


        /* Hide menu on scroll (on mobile) */
        let didScroll,
            lastScrollTop = 0,
            delta = 15,
            topBar = document.querySelector(".js-top-bar"),
            topBarHeight = topBar.offsetHeight;

        /* Initially show menu */
        gsap.set(topBar, {
            yPercent: 0
        });

        /* On scroll */
        window.onscroll = function() {
            didScroll = true;
        };

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);

        /* When scrolled */
        function hasScrolled() {
            if (window.matchMedia("(pointer: coarse)").matches) {
                const st = document.documentElement.scrollTop;

                if(Math.abs(lastScrollTop - st) <= delta) {
                    return;
                }

                if(st > lastScrollTop && st > topBarHeight) {
                    gsap.to(topBar, {
                        duration: .5,
                        yPercent: -100
                    });
                } else {
                    gsap.to(topBar, {
                        duration: .5,
                        yPercent: 0
                    });
                }

                lastScrollTop = st;
            }
        }


        /* Setup timeline for menu reveal animation */
        mainMenuRevealTl = gsap.timeline({
            paused: true,
            yoyo: true,
            onComplete: () => {
                mainMenu.setAttribute('aria-hidden', 'false');
                setBlobityRadius();
            },
            onReverseComplete: () => {
                gsap.set('.js-main-menu-button-line-bottom', {
                    clearProps: 'width'
                });

                mainMenu.setAttribute('aria-hidden', 'true');
            }
        });

        callAfterResize(function() {
            mainMenuRevealTl.seek(0, false).invalidate();

            mainMenu.classList.add("js-is-inactive");
        });

        mainMenuRevealTl.addLabel("start")

        .to(".js-main-menu-button-line-bottom", {
            width: () => {
                return gsap.getProperty('.js-main-menu-button-line-top', 'width', 'px');
            }
        })

        .addLabel("startHovered")

        .to(".js-main-menu-button-line-top, .js-main-menu-button-line-bottom", {
            y: 0
        })

        .to(".js-main-menu-button-line-bottom", {
            duration: 0,
            autoAlpha: 0
        })

        .to(".js-main-menu-button-line-top", {
            rotation: -45
        }, '<')

        .to(".js-main-menu-button-line-middle", {
            rotation: 45
        }, '<')

        .to(".js-main-menu-button", {
            color: '#FFFFFF',
            onReverseComplete: () => {
                gsap.set(".js-main-menu-button", {
                    clearProps: "all"
                });
            }
        }, '<')

        .to(".js-main-menu-bg-reveal", {
            duration: .625,
            scale:() => {
                return (Math.max(window.innerWidth, window.innerHeight) / 10) * 2.4;
            },
            onStart: () => {
                blobity.updateOptions({
                    color: '#ffffff',
                    zIndex: 650
                });

                blobity.bounce();

                disableScroll();
            },
            onReverseComplete: () => {
                blobity.updateOptions({
                    color: gsap.getProperty("body", "color"),
                    zIndex: 50
                });

                blobity.bounce();

                enableScroll();
            }
        }, '<')

        .to(".js-main-menu-bg-reveal-filler", {
            duration: 0,
            ease: "none",
            autoAlpha: 1
        })

        .to(".js-main-menu", {
            duration: 0,
            autoAlpha: 1
        })

        .to(".js-main-menu-item-wrapper", {
            stagger: .1,
            yPercent: 0
        })

        .to(".js-main-menu-side-block", {
            stagger: .1,
            autoAlpha: 1
        })

        .addLabel("end");



        /* Setup timeline for button quake on click */
        let mainMenuButtonQuakeTl = gsap.timeline({
            paused: true,
            onComplete: () => {
                mainMenuButtonQuakeTl.time(0).pause();
            }
        });

        mainMenuButtonQuakeTl.time(0).pause();

        mainMenuButtonQuakeTl.to(".js-main-menu-button-quake", {
            duration: .5,
            scale: 2.5,
            autoAlpha: 0
        });



        /* Add event functions and listeners */
        mainMenuButton.addEventListener("mouseenter", function() {
            if (mainMenu.classList.contains("js-is-inactive")) { /* Main menu INactive */
                mainMenuRevealTl.timeScale(1).tweenTo("startHovered");
            }
        });

        mainMenuButton.addEventListener("mouseleave", function() {
            if (mainMenu.classList.contains("js-is-inactive")) { /* Main menu INactive */
                mainMenuRevealTl.timeScale(1).tweenTo("start");
            } else {
                mainMenuRevealTl.timeScale(1).tweenTo("end");
            }
        });


        mainMenuButton.addEventListener("click", function(event) {
            event.preventDefault();

            mainMenuButtonQuakeTl.play();

            if(mainMenu.classList.contains("js-is-inactive")) { /* Main menu INactive */
                mainMenuRevealTl.timeScale(1).tweenTo("endHovered");

                mainMenu.classList.remove("js-is-inactive");
            } else {
                mainMenuRevealTl.timeScale(1.5).tweenTo("startHovered");

                mainMenu.classList.add("js-is-inactive");
            }
        });


        document.addEventListener("keydown", function(event) {
            if(!mainMenu.classList.contains("js-is-inactive")) {
                const key = event.key;
                if (key === "Escape") {
                    mainMenuRevealTl.timeScale(1.5).tweenTo("startHovered", {
                        onComplete: () => {
                            mainMenuRevealTl.timeScale(1).tweenTo("start");
                        }
                    });

                    mainMenu.classList.add("js-is-inactive");
                }
            }
        });




        /* Loop over menu items to animate mask on hover */
        gsap.utils.toArray(".js-main-menu-item").forEach(mainMenuItem => {
            let mainMenuItemHoverTl = gsap.timeline({paused: true, yoyo: true}),
                mainMenuItemLink = mainMenuItem.querySelector('.js-main-menu-item-link'),
                mainMenuItemMasker = mainMenuItem.querySelector('.js-main-menu-item-masker');

            /* Disable mask on load */
            gsap.set(mainMenuItemMasker, {
                width: "0"
            });

            /* Fill timeline for mask reveal animation */
            mainMenuItemHoverTl.to(mainMenuItemMasker, {
                width: "auto"
            });

            /* Add event functions and listeners */
              mainMenuItemLink.addEventListener("mouseenter", function() {
                mainMenuItemHoverTl.play(0);
            });
            mainMenuItemLink.addEventListener("mouseleave", function() {
                mainMenuItemHoverTl.reverse(0);
            });
        });
    }



    /* Set offset for main menu */
    const setMainMenuOffset = function() {
        if (document.querySelector('.js-top-bar') && document.querySelector('.js-main-menu-list')) {
            document.querySelector('.js-main-menu-list').style.paddingTop = document.querySelector('.js-top-bar').offsetHeight + 'px';
        }
    }

    /* Execute once */
    setMainMenuOffset();

    /* Call after resize */
    callAfterResize(setMainMenuOffset);
}

/* Unload */
export function unload(gsap, enableScroll){
    /* Remove all properties from menu button */
    gsap.set(".js-main-menu-button-line-top, .js-main-menu-button-line-bottom, .js-main-menu-button-quake", {
        clearProps: "all"
    });


    /* Clear menu classes */
    mainMenu.classList.add("js-is-inactive");


    /* Remove topbar logo event listener */
    if(document.querySelector('.js-top-bar-logo')) {
        const topBarLogo = document.querySelector('.js-top-bar-logo'),
            newTopBarLogo = topBarLogo.cloneNode(true);

        topBarLogo.parentNode.replaceChild(newTopBarLogo, topBarLogo);
    }


    /* Remove menu-button event listeners */
    if(document.querySelector('.js-main-menu-button')) {
        const mainMenuButton = document.querySelector('.js-main-menu-button'),
            newMainMenuButton = mainMenuButton.cloneNode(true);

        mainMenuButton.parentNode.replaceChild(newMainMenuButton, mainMenuButton);
    }


    /* Remove event listeners from menu items */
    gsap.utils.toArray(".js-main-menu-item").forEach(mainMenuItem => {
        let newMainMenuItem = mainMenuItem.cloneNode(true);

        mainMenuItem.parentNode.replaceChild(newMainMenuItem, mainMenuItem);
    });

    /* Enable scroll */
    enableScroll();

    /* Clear global vars */
    mainMenuButton =
    mainMenu =
    mainMenuRevealTl = null;
}

/* Export init and unload functions */
export default {
    init,
    unload
}