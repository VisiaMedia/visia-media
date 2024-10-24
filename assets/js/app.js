/* Importing dependencies */
import Swup from 'swup';
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupBodyClassPlugin from '@swup/body-class-plugin';
import SwupJsPlugin from '@swup/js-plugin';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupFormsPlugin from '@swup/forms-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupGtmPlugin from '@swup/gtm-plugin';

/* GSAP */
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { TextPlugin } from "gsap/TextPlugin.js";
import { Draggable } from "gsap/Draggable.js";
import { InertiaPlugin } from "gsap/InertiaPlugin.js";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(InertiaPlugin);

/* Set GSAP defaults */
gsap.defaults({
    ease: "power2.out",
    duration:.3125
});

/* Set ScrollTrigger defaults */
ScrollTrigger.defaults({
    fastScrollEnd: true
});

/* Day.js */
import dayjs from 'dayjs';
import 'dayjs/locale/nl';
dayjs.extend(require('dayjs/plugin/relativeTime')).locale('nl');

/* Infinite scroll */
import InfiniteScroll from "infinite-scroll";

/* Masonry */
import Masonry from "masonry-layout";

/* Images loaded */
import imagesLoaded from "imagesloaded";

/* Blobity */
let isDesktop = true;

if(window.matchMedia("(pointer: coarse)").matches) {
    isDesktop = false;
}

import Blobity from "blobity";
let blobity = new Blobity({
    licenseKey: 'A5B1423C-7B244787-AC4F5CE3-FECC6E8C',
    dotColor: 'rgb(234, 44, 118)',
    size: isDesktop ? 40 : 0,
    dotSize: 8,
    opacity:.1,
    zIndex: '50',
    focusableElementsOffsetX: 8,
    focusableElementsOffsetY: 8,
});

/* Importing helper functions */
import overscroll from './helpers/overscroll.mjs';
import imageLoader from './helpers/imageloader.mjs';
import {callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, stFadeIn, getCookie, getSiblings, getNextSibling, getPreviousSibling, createValidHtmlId, disableScroll, enableScroll} from './helpers/functions.mjs';

/* Importing global / side-wide modules */
import main from './global/main.mjs';
import presentationPlaceholders from './global/presentation-placeholders.mjs';
import activeMenuItem from './global/active-menu-item.mjs';
import colorChangeTrigger from './global/color-change-trigger.mjs';
import buttons from './global/buttons.mjs';
import popups from './global/popups.mjs';
import forms from './global/forms.mjs';

/* Importing theme parts */
import header from './template-parts/header.mjs';
import footer from './template-parts/footer.mjs';

/* Importing template-parts */
import statement from './template-parts/statement.mjs';
import textgrid from './template-parts/textgrid.mjs';
import textblock from './template-parts/textblock.mjs';
import images from './template-parts/images.mjs';
import statistics from './template-parts/statistics.mjs';
import columnscroller from './template-parts/columnscroller.mjs';
import fallingimages from './template-parts/fallingimages.mjs';
import textcarousel from './template-parts/textcarousel.mjs';
import tabbedcontent from './template-parts/tabbedcontent.mjs';
import dienstenscroller from './template-parts/dienstenscroller.mjs';
import procescarousel from './template-parts/procescarousel.mjs';
import perspectivegallery from './template-parts/perspectivegallery.mjs';
import logopresentation from './template-parts/logopresentation.mjs';
import faq from './template-parts/faq.mjs';
import goalform from './template-parts/goalform.mjs';

/* Modules */
import reviewslider from './modules/reviewslider.mjs';
import singlereview from './modules/singlereview.mjs';
import logos from './modules/logos.mjs';
import team from './modules/team.mjs';
import woordstreamer from './modules/woordstreamer.mjs';
import projectslider from './modules/projectslider.mjs';
import projectgrid from './modules/projectgrid.mjs';
import recentposts from './modules/recentposts.mjs';
import contactform from './modules/contactform.mjs';
import presentationform from './modules/presentationform.mjs';
import popunder from './modules/popunder.mjs';
import linkinbio from './modules/linkinbio.mjs';

/* Blog */
import blogOverview from './blog/overview.mjs';
import blogSingle from './blog/single.mjs';
import shortcodes from './blog/shortcodes.mjs';

/* CTA's */
import ctapresentation from './template-parts/ctapresentation.mjs';
import ctastreamer from './template-parts/ctastreamer.mjs';
import ctaleadform from './template-parts/ctaleadform.mjs';



/* Setup function for listening to reveal animation */
let revealAnimationListener = {
    value: false,

    get state() {
        return this.value;
    },
    set state(val) {
        this.value = val;
        this.listener(val);
    },
    listener: function (val) {},
    registerNewListener: function (externalListenerFunction) {
        this.listener = externalListenerFunction;
    }
};

/* Creating swup instance */
const swup = new Swup({
    containers: ['.js-swap-container'],
    animateHistoryBrowsing: true,
    plugins: [
        new SwupA11yPlugin({
            announcementTemplate: 'Genavigeerd naar: {title}',
            urlTemplate: 'Nieuwe pagina op {url}}'
        }),
        new SwupBodyClassPlugin(),
        new SwupJsPlugin([
            {
                from: '(.*)',
                to: /bedankt(.*)/,
                in: (next) => {
                    const pageLoader = document.querySelector('.js-thanks-loader');

                    gsap.to(pageLoader, {
                        autoAlpha: 0,
                        onComplete: () => {
                            /* Remove element */
                            pageLoader.remove();

                            /* Set animation listener */
                            revealAnimationListener.state = true;

                            /* Reset blobity */
                            blobity.reset();

                            /* Init new page content */
                            next();
                        }
                    });
                },
                out: (next) => {
                    /* Create loader element */
                    let pageLoaderWrapper = document.createElement('div');
                    pageLoaderWrapper.classList.add('loader', 'js-thanks-loader');

                    /* Create Font Awesome spinner */
                    let pageLoaderSpinner = document.createElement('i');
                    pageLoaderSpinner.classList.add('loader__spinner', 'fa-duotone', 'fa-spinner-third', 'fa-spin');
                    pageLoaderSpinner.style.setProperty('--fa-secondary-opacity', '0.25');

                    /* Insert elements into eachother and then into body */
                    pageLoaderWrapper.appendChild(pageLoaderSpinner);
                    document.body.appendChild(pageLoaderWrapper);

                    /* Hide loader at first */
                    gsap.set(pageLoaderWrapper, {
                        autoAlpha:0
                    });

                    /* Animate page-out reveal */
                    gsap.to(pageLoaderWrapper, {
                        autoAlpha:1,
                        onComplete:() => {
                            setTimeout(function() {
                                revealAnimationListener.state = false;

                                document.documentElement.scrollTop = document.body.scrollTop = 0;
                            }, 100);

                            setTimeout(function() {
                                next();
                            }, 200);
                        }
                    });
                }
            }, {
                from: '(.*)',
                to: '(.*)',
                in: (next) => {
                    let pageTransitionWrapper = document.querySelector('.js-page-transition'),
                        pageTransitionTitle = document.querySelector('.js-transition-page-title'),
                        pageTransitionTitleText = document.querySelector('.js-item-object');

                    gsap.to(pageTransitionTitle, {
                        autoAlpha: 1,
                        onStart:() => {
                            document.documentElement.scrollTop = document.body.scrollTop = 0;

                            pageTransitionTitle.textContent = pageTransitionTitleText.dataset.itemTitle;
                        }
                    });

                    gsap.to(pageTransitionWrapper, {
                        height: "0",
                        ease: "power1.out",
                        duration: .625,
                        delay: .625,
                        onComplete: () => {
                            /* Remove overlay */
                            pageTransitionWrapper.remove();

                            /* Set animation listener */
                            revealAnimationListener.state = true;

                            /* Reset blobity */
                            blobity.reset();

                            /* Init new page content */
                            next();
                        }
                    });
                },
                out: (next) => {
                    if(document.querySelector('.js-page-transition')) {
                        const pageTransitions = document.querySelectorAll('.js-page-transition');

                        pageTransitions.forEach(pageTransition => {
                            pageTransition.parentNode.removeChild(pageTransition);
                        });
                    }

                    /* Create top-level element */
                    let pageTransitionWrapper = document.createElement('div');
                    pageTransitionWrapper.className = 'js-page-transition';

                    /* Create title el itself */
                    let pageTransitionTitle = document.createElement('div');
                    pageTransitionTitle.className = 'js-transition-page-title';

                    /* Insert elements into eachother and then into body */
                    pageTransitionWrapper.appendChild(pageTransitionTitle);
                    document.body.appendChild(pageTransitionWrapper);

                    /* Offset wrapper element */
                    gsap.set(pageTransitionWrapper, {
                        yPercent:100,
                        height:"100%"
                    });

                    /* Initially hide title-text element */
                    gsap.set(pageTransitionTitle, {
                        autoAlpha:0
                    });

                    /* Animate page-out reveal */
                    gsap.to(pageTransitionWrapper, {
                        yPercent:0,
                        ease: "power1.in",
                        duration: .625,
                        onComplete: () => {
                            revealAnimationListener.state = false;

                            next();
                        }
                    });

                }
            }
        ]),
        new SwupHeadPlugin({
            persistTags: 'style[data-blobity-global-styles]'
        }),
        new SwupFormsPlugin(),
        new SwupPreloadPlugin(),
        new SwupGtmPlugin(),
        new SwupScrollPlugin({
            doScrollingRightAway: true,
            animateScroll: {
                betweenPages: false,
                samePageWithHash: true,
                samePage: false
            }
        })
    ]
});



/* Initialize functions on load */
function swupInit() {
    document.fonts.ready.then(function () {
        /* Helpers */
        overscroll.stopOverscroll(gsap);
        imageLoader.loadImages(ScrollTrigger);

        /* Main template */
        main.init(gsap, blobity, callAfterResize, disableScroll, enableScroll);
        presentationPlaceholders.init(getCookie);
        activeMenuItem.init();

        // Globals
        colorChangeTrigger.init(gsap, blobity, ScrollTrigger);
        buttons.init(gsap, blobity, callAfterResize);
        popups.init(gsap, blobity, callAfterResize, disableScroll, enableScroll);
        forms.init(gsap, ScrollTrigger, getNextSibling, getPreviousSibling);

        /* Importing theme parts */
        header.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        footer.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn, blobity);

        /* Template parts */
        statement.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        textgrid.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        textblock.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        images.init(gsap, stFadeIn);
        statistics.init(gsap, callAfterResize, buildTlAfterResize, tlSetup);
        columnscroller.init(gsap, ScrollTrigger, callAfterResize);
        ctapresentation.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        ctastreamer.init(callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        ctaleadform.init(callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        fallingimages.init(gsap, ScrollTrigger, callAfterResize);
        textcarousel.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal);
        procescarousel.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal);
        tabbedcontent.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, blobity, tlSetup, tlTextReveal, tlFadeIn);
        dienstenscroller.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, createValidHtmlId);
        perspectivegallery.init(gsap, stFadeIn, ScrollTrigger, Masonry);
        logopresentation.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        faq.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        goalform.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);

        /* Modules */
        reviewslider.init(gsap, ScrollTrigger, blobity, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        singlereview.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        logos.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        team.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        woordstreamer.init(gsap, callAfterResize, ScrollTrigger);
        projectslider.init(gsap, ScrollTrigger, Draggable, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        projectgrid.init(gsap, ScrollTrigger, stFadeIn, blobity, Masonry, InfiniteScroll, imagesLoaded);
        recentposts.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, dayjs, getSiblings);
        contactform.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, getNextSibling, getPreviousSibling);
        presentationform.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn);
        popunder.init(gsap, ScrollTrigger, blobity, callAfterResize);
        linkinbio.init(gsap, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn);

        /* Blog */
        blogOverview.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, stFadeIn, dayjs, InfiniteScroll);
        blogSingle.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn, stFadeIn, dayjs, getSiblings);
        shortcodes.init(gsap, ScrollTrigger, createValidHtmlId, getCookie, stFadeIn);

        /* Enable all disabled ScrollTriggers after initial reveal is done */
        revealAnimationListener.registerNewListener((val) => { if(val === true) {
            ScrollTrigger.getAll().forEach(singleScrollTrigger => {
                singleScrollTrigger.enable();
            });

            /* Refresh global ScrollTrigger and bounce Blobity to reset */
            ScrollTrigger.refresh(true);

            blobity.updateOptions({
                opacity:.1,
                zIndex: '50'
            });

            blobity.bounce();
        }});
    });
} swup.hooks.on('content:replace', swupInit);

if(document.readyState === 'complete') {
    swupInit();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        swupInit();
    });
}



/* Kill functions on content replace */
function swupUnload() {
    /* Kill individual timelines */
    gsap.globalTimeline.getChildren(true, false).forEach(timeline => {
        /* Unset properties */
        const targets = timeline.getChildren(true, true, false);

        for(let i = 0; i < targets.length; i++) {
            if(targets[i].targets().length) {
                gsap.set(targets[i].targets(), {
                    clearProps: 'all'
                });
            }
        }

        /* Kill timeline */
        timeline.kill();
    });

    /* Kill all scrollTriggers */
    //ScrollTrigger.killAll();
    ScrollTrigger.getAll().forEach(t => {
        t.scroll(0);
        t.kill(true);
    });

    /* Main template */
    main.unload(gsap, enableScroll);

    /* Other templates */
    projectgrid.unload(gsap, Masonry, InfiniteScroll);
    perspectivegallery.unload(Masonry);
    blogOverview.unload(gsap, InfiniteScroll);
} swup.hooks.before('content:replace', swupUnload);



/* Bounce Blobity and refresh ScrollTrigger on resize */
let resetColoring;

(resetColoring = function(){
    blobity.bounce();

    ScrollTrigger.refresh(true);
})();

callAfterResize(resetColoring);



/* Initial loader reveal */
document.addEventListener("readystatechange", (event) => {
    if(document.readyState === 'complete' && document.querySelector('.js-loader')) {
        const loader = document.querySelector('.js-loader'),
            topBar = document.querySelector(".js-top-bar");

        gsap.set(topBar, {
            yPercent: -100
        });

        gsap.to(loader, {
            autoAlpha: 0,
            onComplete: () => {
                loader.remove();

                revealAnimationListener.state = true;

                gsap.to(topBar, {
                    duration: .5,
                    yPercent: 0
                });
            }
        });
    }
});



/* Prevent browser from trying to restore scroll position from history */
if(history.scrollRestoration) {
    history.scrollRestoration = "manual";
}