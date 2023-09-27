/* Importing dependencies */
import Swup from 'swup';
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupBodyClassPlugin from '@swup/body-class-plugin';
import SwupJsPlugin from '@swup/js-plugin';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupFormsPlugin from '@swup/forms-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';

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

/* Day.js */
import dayjs from 'dayjs';
import 'dayjs/locale/nl';
dayjs.extend(require('dayjs/plugin/relativeTime')).locale('nl');

/* Masonry */
import Masonry from "masonry-layout";

/* Infinite scroll */
import InfiniteScroll from "infinite-scroll";

/* Blobity */
import Blobity from "blobity";
let blobity = new Blobity({
    licenseKey: 'A5B1423C-7B244787-AC4F5CE3-FECC6E8C',
    dotColor: 'rgb(234, 44, 118)',
    size: 40,
    dotSize: 8,
    opacity:.1,
    zIndex: '50',
    focusableElementsOffsetX: 8,
    focusableElementsOffsetY: 8,
});

/* Importing helper functions */
import overscroll from './helpers/overscroll.mjs';
import imageLoader from './helpers/imageloader.mjs';
import {callAfterResize, tlTextReveal, tlFadeIn, getSiblings, getNextSibling, getPreviousSibling, createValidHtmlId, disableScroll, enableScroll} from './helpers/functions.mjs';

/* Importing global / side-wide modules */
import main from './global/main.mjs';
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
import fallingimages from './template-parts/fallingimages.mjs';
import textcarousel from './template-parts/textcarousel.mjs';
import tabbedcontent from './template-parts/tabbedcontent.mjs';
import dienstenscroller from './template-parts/dienstenscroller.mjs';
import procescarousel from './template-parts/procescarousel.mjs';
import parallaximage from './template-parts/parallaximage.mjs';

/* Modules */
import reviewslider from './modules/reviewslider.mjs';
import logos from './modules/logos.mjs';
import team from './modules/team.mjs';
import woordstreamer from './modules/woordstreamer.mjs';
import projectslider from './modules/projectslider.mjs';
import projectgrid from './modules/projectgrid.mjs';
import recentposts from './modules/recentposts.mjs';
import contactform from './modules/contactform.mjs';

/* Blog */
import blogOverview from './blog/overview.mjs';
import blogSingle from './blog/single.mjs';
import shortcodes from './blog/shortcodes.mjs';

/* CTA's */
import ctapresentation from './template-parts/ctapresentation.mjs';



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
                to: '(.*)',
                in: (next) => {
                    let pageTransitionWrapper = document.querySelector('.js-page-transition'),
                        pageTransitionTitle = document.querySelector('.js-transition-page-title'),
                        pageTransitionTitleText = document.querySelector('.js-item-object');

                    gsap.to(pageTransitionTitle, {
                        autoAlpha: 1,
                        onStart:() => {
                            pageTransitionTitle.textContent = pageTransitionTitleText.dataset.itemTitle;
                        }
                    });

                    gsap.to(pageTransitionWrapper, {
                        id: 'pageTransitionIn',
                        clipPath: "inset(0% 0% 100% 0%)",
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
                    /* Create top-level element */
                    let pageTransitionWrapper = document.createElement('div');
                    pageTransitionWrapper.className = 'js-page-transition';

                    /* Create title container */
                    let pageTransitionTitleWrapper = document.createElement('div');
                    pageTransitionTitleWrapper.className = 'js-page-transition-title-wrapper';

                    /* Create title el itself */
                    let pageTransitionTitle = document.createElement('div');
                    pageTransitionTitle.className = 'js-transition-page-title';

                    /* Insert elements into eachother and then into body */
                    pageTransitionWrapper.appendChild(pageTransitionTitleWrapper);
                    pageTransitionTitleWrapper.appendChild(pageTransitionTitle);
                    document.body.appendChild(pageTransitionWrapper);

                    /* Initially hide title-text element */
                    gsap.set(pageTransitionTitle, {
                        autoAlpha:0
                    });

                    /* Animate page-out reveal */
                    gsap.to(pageTransitionWrapper, {
                        id: 'pageTransitionOut',
                        clipPath: "inset(0% 0% 0% 0%)",
                        ease: "power1.in",
                        duration: .625,
                        onComplete: () => {
                            revealAnimationListener.state = false;

                            document.body.scrollTop = document.documentElement.scrollTop = 0;

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
        new SwupPreloadPlugin()
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
        activeMenuItem.init();

        // Globals
        colorChangeTrigger.init(gsap, blobity, ScrollTrigger);
        buttons.init(gsap, blobity, callAfterResize);
        popups.init(gsap, blobity, callAfterResize, disableScroll, enableScroll);
        forms.init(gsap, blobity);

        /* Importing theme parts */
        header.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn);
        footer.init(gsap, ScrollTrigger, callAfterResize, tlFadeIn, blobity);

        /* Template parts */
        statement.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn);
        textgrid.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal);
        ctapresentation.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn);
        fallingimages.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn);
        textcarousel.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn);
        procescarousel.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn);
        tabbedcontent.init(gsap, ScrollTrigger, callAfterResize, blobity, tlTextReveal, tlFadeIn);
        dienstenscroller.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn, createValidHtmlId);
        parallaximage.init(gsap);

        /* Modules */
        reviewslider.init(gsap, ScrollTrigger, blobity, callAfterResize, tlTextReveal, tlFadeIn, getSiblings);
        logos.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn);
        team.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal);
        woordstreamer.init(gsap, callAfterResize);
        projectslider.init(gsap, ScrollTrigger, Draggable);
        projectgrid.init(gsap, ScrollTrigger, blobity, Masonry, callAfterResize, getSiblings);
        recentposts.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, dayjs, getSiblings);
        contactform.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn, getNextSibling, getPreviousSibling, blobity);

        /* Blog */
        blogOverview.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn, dayjs, InfiniteScroll);
        blogSingle.init(gsap, ScrollTrigger, callAfterResize, tlTextReveal, tlFadeIn, dayjs, getSiblings);
        shortcodes.init(gsap, createValidHtmlId);

        /* Bounce blobity and refresh ScrollTrigger on resize */
        /*let resetScrolltrigger;

        (resetScrolltrigger = function(){
            blobity.bounce();

            ScrollTrigger.refresh();
        })();

        callAfterResize(resetScrolltrigger);*/

        /* Enable all disabled ScrollTriggers after initial reveal is done */
        revealAnimationListener.registerNewListener((val) => { if(val === true) {
            ScrollTrigger.getAll().forEach(singleScrollTrigger => {
                singleScrollTrigger.enable();
            });
        }});

        /* Initial loader reveal */
        if(document.querySelector('.js-loader')) {
            const loader = document.querySelector('.js-loader');

            gsap.to(loader, {
                autoAlpha: 0,
                onComplete: () => {
                    loader.remove();

                    revealAnimationListener.state = true;
                }
            });
        }
    });
} swup.hooks.on('content:replace', swupInit);

if (document.readyState === 'complete') {
    swupInit();
} else {
    document.addEventListener('DOMContentLoaded', () => swupInit());
}



/* Kill functions on content replace */
function swupUnload() {
    /* Kill individual timelines */
    gsap.globalTimeline.getChildren(true, false).forEach(timeline => {
        /* Unset properties */
        const targets = timeline.getChildren();

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
    ScrollTrigger.killAll();

    ScrollTrigger.getAll().forEach(t => t.kill());

    /* Main template */
    main.unload(gsap, enableScroll);
} swup.hooks.before('content:replace', swupUnload);