/* Core imports */
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
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

/* Set GSAP defaults */
gsap.defaults({
    ease: "power2.out",
    duration: .3125
});

/* Set ScrollTrigger defaults */
ScrollTrigger.defaults({
    fastScrollEnd: true
});



/* Blobity async function (only if desktop) */
let blobity = null;

async function initializeBlobity() {
    const isDesktop = window.matchMedia("(pointer: coarse)").matches === false;
    if (!isDesktop) {
        return Promise.resolve(); // Direct resolve als Blobity niet geladen hoeft te worden
    }

    const { default: Blobity } = await import(/* webpackChunkName: "blobity" */ 'blobity');

    blobity = new Blobity({
        licenseKey: 'A5B1423C-7B244787-AC4F5CE3-FECC6E8C',
        dotColor: 'rgb(234, 44, 118)',
        size: 40,
        dotSize: 8,
        opacity: 0.1,
        zIndex: 50,
        focusableElementsOffsetX: 8,
        focusableElementsOffsetY: 8,
        mode: 'bouncy'
    });
}


/* Dayjs async function */
async function loadDayjs() {
    const dayjs = (await import(/* webpackChunkName: "dayjs" */ 'dayjs')).default;
    await import(/* webpackChunkName: "dayjs" */ 'dayjs/locale/nl');
    const { default: relativeTime } = await import(/* webpackChunkName: "dayjs" */ 'dayjs/plugin/relativeTime');
    dayjs.extend(relativeTime);
    dayjs.locale('nl');

    return dayjs;
}


/* Slider deps async function */
async function loadSliderDeps() {
    const DraggableModule = await import(/* webpackChunkName: "draggable-inertia" */ 'gsap/Draggable.js');
    const InertiaPluginModule = await import(/* webpackChunkName: "draggable-inertia" */ 'gsap/InertiaPlugin.js');

    const Draggable = DraggableModule.default || DraggableModule;
    const InertiaPlugin = InertiaPluginModule.default || InertiaPluginModule;

    gsap.registerPlugin(Draggable, InertiaPlugin);
    return { Draggable, InertiaPlugin };
}


/* Panorama slider deps async function */
async function loadPanoramaSliderDeps() {
    const SwiperModule = await import(/* webpackChunkName: "swiper" */ 'swiper');
    const SwiperModules = await import(/* webpackChunkName: "swiper" */ 'swiper/modules');
    const EffectPanoramaModule = await import(
        /* webpackChunkName: "panorama-slider" */
        './vendor/panorama/effect-panorama.esm.js'
        );

    return {
        Swiper: SwiperModule.default || SwiperModule,
        Autoplay: SwiperModules.Autoplay,
        EffectPanorama: EffectPanoramaModule.default || EffectPanoramaModule
    };
}


/* Swiper async function */
async function loadSwiperDeps() {
    const SwiperModule = await import(/* webpackChunkName: "swiper" */ 'swiper');
    const SwiperModules = await import(/* webpackChunkName: "swiper" */ 'swiper/modules');

    return {
        Swiper: SwiperModule.default || SwiperModule,
        Autoplay: SwiperModules.Autoplay
    };
}


/* Masonry async function */
async function loadMasonry() {
    const MasonryModule = await import(/* webpackChunkName: "masonry" */ 'masonry-layout');
    return MasonryModule.default || MasonryModule;
}


/* Infinite Scroll async function */
async function loadInfiniteScroll() {
    const InfiniteScrollModule = await import(/* webpackChunkName: "infinite-scroll" */ 'infinite-scroll');
    return InfiniteScrollModule.default || InfiniteScrollModule;
}


/* ImagesLoaded async function */
async function loadImagesLoaded() {
    const ImagesLoadedModule = await import(/* webpackChunkName: "imagesloaded" */ 'imagesloaded');
    return ImagesLoadedModule.default || ImagesLoadedModule;
}



/* Importing helper functions */
import overscroll from './helpers/overscroll.mjs';
import imageLoader from './helpers/imageloader.mjs';
import { callAfterResize, clearAfterResizeHandlers, buildTlAfterResize, tlSetup, tlFadeIn, tlSectionReveal, stFadeIn, getCookie, getSiblings, getNextSibling, getPreviousSibling, createValidHtmlId, disableScroll, enableScroll } from './helpers/functions.mjs';

/* Importing global / site-wide modules */
import main from './global/main.mjs';
import activeMenuItem from './global/active-menu-item.mjs';
import colorChangeTrigger from './global/color-change-trigger.mjs';
import buttons from './global/buttons.mjs';
import popups from './global/popups.mjs';
import forms from './global/forms.mjs';

/* Importing theme parts */
import header from './template-parts/header.mjs';
import footer from './template-parts/footer.mjs';


/* Flags */
let modulesLoaded = false; // Flag to check if all modules are loaded
let transitionComplete = false; // Flag for initial animation or page transition completion

function getTopBarItems() {
    return [document.querySelector(".js-top-bar"), document.querySelector(".js-middle-menu"), document.querySelector(".js-middle-menu-bg")].filter(Boolean);
}

function getTopBarHiddenY(index, target) {
    return -target.getBoundingClientRect().bottom;
}

function setInitialTopBarPosition() {
    if (document.querySelector('.js-loader')) {
        gsap.set(getTopBarItems(), { y: getTopBarHiddenY });
    }
}

// /* Setup function for listening to reveal animation */
let revealAnimationListener = {
    value: false,
    get state() { return this.value; },
    set state(val) {
        this.value = val;
        this.listener(val);
    },
    listener: function (val) { },
    registerNewListener: function (externalListenerFunction) {
        this.listener = externalListenerFunction;
    }
};

/* Enable all disabled ScrollTriggers after reveal is done */
revealAnimationListener.registerNewListener((val) => {
    if (val === true) {
        ScrollTrigger.getAll().forEach(singleScrollTrigger => singleScrollTrigger.enable());
        ScrollTrigger.refresh(true);

        if (blobity) {
            blobity.updateOptions({ opacity: 0.1, zIndex: 50 });
            blobity.bounce();
        }
    }
});


/* Creating Swup instance */
const swup = new Swup({
    containers: ['.js-swap-container'],
    animateHistoryBrowsing: true,
    plugins: [
        new SwupA11yPlugin({
            announcementTemplate: 'Genavigeerd naar: {title}',
            urlTemplate: 'Nieuwe pagina op {url}'
        }),
        new SwupBodyClassPlugin(),
        new SwupJsPlugin([
            {
                from: '(.*)',
                to: /bedankt(.*)/,
                in: (next) => {
                    const pageLoader = document.querySelector('.js-thanks-loader');
                    gsap.to(pageLoader, { autoAlpha: 0, onComplete: () => {
                            pageLoader.remove();
                            transitionComplete = true;
                            activateRevealListenerIfReady();
                            if (blobity) blobity.reset();
                            next();
                        }});
                },
                out: (next) => {
                    let pageLoaderWrapper = document.createElement('div');
                    pageLoaderWrapper.classList.add('loader', 'js-thanks-loader');
                    let pageLoaderSpinner = document.createElement('i');
                    pageLoaderSpinner.classList.add('loader__spinner', 'fa-duotone', 'fa-spinner-third', 'fa-spin');
                    pageLoaderSpinner.style.setProperty('--fa-secondary-opacity', '0.25');
                    pageLoaderWrapper.appendChild(pageLoaderSpinner);
                    document.body.appendChild(pageLoaderWrapper);
                    gsap.set(pageLoaderWrapper, { autoAlpha: 0 });
                    gsap.to(pageLoaderWrapper, { autoAlpha: 1, onComplete: () => {
                            setTimeout(() => { transitionComplete = false; document.documentElement.scrollTop = 0; }, 100);
                            setTimeout(() => { next(); }, 200);
                        }});
                }
            },
            {
                from: '(.*)',
                to: '(.*)',
                in: (next) => {
                    const pageTransitionWrapper = document.querySelector('.js-page-transition');
                    const pageTransitionTitle = document.querySelector('.js-transition-page-title');
                    const pageTransitionTitleText = document.querySelector('.js-item-object');
                    gsap.to(pageTransitionTitle, {
                        autoAlpha: 1, onStart: () => {
                            document.documentElement.scrollTop = 0;
                            pageTransitionTitle.textContent = pageTransitionTitleText.dataset.itemTitle;
                        }
                    });
                    gsap.to(pageTransitionWrapper, {
                        height: "0",
                        ease: "power1.out",
                        duration: .625,
                        delay: .625,
                        onComplete: () => {
                            pageTransitionWrapper.remove();
                            transitionComplete = true;
                            activateRevealListenerIfReady();
                            if (blobity) blobity.reset();
                            next();
                        }
                    });
                },
                out: (next) => {
                    let pageTransitionWrapper = document.createElement('div');
                    pageTransitionWrapper.className = 'js-page-transition';
                    let pageTransitionTitle = document.createElement('div');
                    pageTransitionTitle.className = 'js-transition-page-title';
                    pageTransitionWrapper.appendChild(pageTransitionTitle);
                    document.body.appendChild(pageTransitionWrapper);
                    gsap.set(pageTransitionWrapper, { yPercent: 100, height: "100%" });
                    gsap.set(pageTransitionTitle, { autoAlpha: 0 });
                    gsap.to(pageTransitionWrapper, {
                        yPercent: 0,
                        ease: "power1.in",
                        duration: .625,
                        onComplete: () => { transitionComplete = false; next(); }
                    });
                }
            }
        ]),
        new SwupHeadPlugin({ persistTags: 'style[data-blobity-global-styles]' }),
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


/* Cache loaded modules */
const loadedModules = {};
let overscrollCleanup = null;

/* Initialize functions on load */
async function swupInit() {
    await document.fonts.ready;

    // Array to keep track of async initiation promises
    const asyncPromises = [];

    /* Helpers */
    if (overscrollCleanup) {
        overscrollCleanup();
    }
    overscrollCleanup = overscroll.stopOverscroll(gsap);
    imageLoader.loadImages(ScrollTrigger);

    /* Blobity */
    if(blobity === null) {
        await initializeBlobity();
    }

    /* Main template */
    main.init(gsap, blobity, callAfterResize, disableScroll, enableScroll);
    setInitialTopBarPosition();
    activeMenuItem.init();

    /* Globals */
    colorChangeTrigger.init(gsap, blobity, ScrollTrigger);
    buttons.init(gsap, blobity, callAfterResize);
    popups.init(gsap, blobity, callAfterResize, disableScroll, enableScroll);
    forms.init(gsap, ScrollTrigger, getNextSibling, getPreviousSibling);

    /* Section reveals */
    gsap.utils.toArray('.js-section-reveal').forEach(sectionReveal => {
        const scrollTriggerParent = sectionReveal.closest('[data-st-count]');
        let timeline = tlSetup(sectionReveal, scrollTriggerParent ? scrollTriggerParent.dataset.stCount : 0);

        const buildTimeline = () => {
            tlSectionReveal(sectionReveal, timeline);
        };

        buildTimeline();

        callAfterResize(() => {
            buildTlAfterResize(timeline, buildTimeline);
        });
    });

    /* Theme parts */
    header.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn);
    footer.init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn, blobity);

    /* Template parts */
    if (document.querySelector('.js-block-images')) { // Images
        asyncPromises.push(import('./template-parts/images.mjs').then(({ default: images }) => {
            images.init(gsap, stFadeIn);
        }));
    }
    if (document.querySelector('.js-statistics')) { // Statistics
        asyncPromises.push(import('./template-parts/statistics.mjs').then(({ default: statistics }) => {
            statistics.init(gsap, callAfterResize, buildTlAfterResize, tlSetup);
        }));
    }
    if (document.querySelector('.js-column-scroller')) { // Column scroller
        asyncPromises.push(import('./template-parts/columnscroller.mjs').then(({ default: columnscroller }) => {
            columnscroller.init(gsap, ScrollTrigger, callAfterResize);
        }));
    }
    if (document.querySelector('.js-falling-images')) { // Falling images
        asyncPromises.push(import('./template-parts/fallingimages.mjs').then(({ default: fallingimages }) => {
            fallingimages.init(gsap, ScrollTrigger, callAfterResize);
        }));
    }
    if (document.querySelector('.js-textcarousel')) { // Text carousel
        asyncPromises.push(import('./template-parts/textcarousel.mjs').then(({ default: textcarousel }) => {
            textcarousel.init(gsap, ScrollTrigger);
        }));
    }
    if (document.querySelector('.js-process-carousel')) { // Proces carousel
        asyncPromises.push(import('./template-parts/procescarousel.mjs').then(({ default: procescarousel }) => {
            procescarousel.init(gsap, ScrollTrigger);
        }));
    }
    if (document.querySelector('.js-tabbed-content')) { // Tabbed content
        asyncPromises.push(import('./template-parts/tabbedcontent.mjs').then(({ default: tabbedcontent }) => {
            tabbedcontent.init(gsap, ScrollTrigger, callAfterResize, blobity);
        }));
    }
    if (document.querySelector('.js-service-scroller')) { // Dienstenscroller
        asyncPromises.push(import('./template-parts/dienstenscroller.mjs').then(({ default: dienstenscroller }) => {
            dienstenscroller.init(gsap, ScrollTrigger, createValidHtmlId);
        }));
    }
    if (document.querySelector('.js-perspective-gallery')) { // Perspective gallery
        asyncPromises.push(
            Promise.all([
                import('./template-parts/perspectivegallery.mjs'),
                loadMasonry()
            ]).then(([{ default: perspectivegallery }, Masonry]) => {
                perspectivegallery.init(gsap, stFadeIn, ScrollTrigger, Masonry);

                /* Add to cache with unload function */
                loadedModules.perspectivegallery = { unload: () => perspectivegallery.unload(Masonry) };
            })
        );
    }
    if (document.querySelector('.js-faqs')) { // FAQ
        asyncPromises.push(import('./template-parts/faq.mjs').then(({ default: faq }) => {
            faq.init(gsap, ScrollTrigger);
        }));
    }

    /* CTA's */

    /* Modules */
    if (document.querySelector('.js-presentation-first-name-placeholder') ||
        document.querySelector('.js-presentation-business-name-placeholder')) { // Presentation placeholders
        asyncPromises.push(import('./global/presentation-placeholders.mjs').then(({ default: presentationPlaceholders }) => {
            presentationPlaceholders.init(getCookie);
        }));
    }
    if (document.querySelector('.js-review-slider')) { // Review slider
        asyncPromises.push(import('./modules/reviewslider.mjs').then(({ default: reviewslider }) => {
            reviewslider.init(gsap, ScrollTrigger, blobity, callAfterResize);
        }));
    }
    if (document.querySelector('.js-woordstreamer')) { // Woordstreamer
        asyncPromises.push(import('./modules/woordstreamer.mjs').then(({ default: woordstreamer }) => {
            woordstreamer.init(gsap, callAfterResize, ScrollTrigger);
        }));
    }
    if (document.querySelector('.js-project-slider')) { // Project slider
        asyncPromises.push(
            Promise.all([
                import('./modules/projectslider.mjs'),
                loadSliderDeps()
            ]).then(([{ default: projectslider }, { Draggable, InertiaPlugin }]) => {

                projectslider.init(gsap, Draggable);
            })
        );
    }
    if (document.querySelector('.js-arch-project-slider')) { // Arched project slider
        asyncPromises.push(
            Promise.all([
                import('./modules/archedprojectslider.mjs'),
                loadPanoramaSliderDeps()
            ]).then(([{ default: archedprojectslider }, { Swiper, Autoplay, EffectPanorama }]) => {
                archedprojectslider.init(gsap, Swiper, Autoplay, EffectPanorama, ScrollTrigger, callAfterResize);

                loadedModules.archedprojectslider = {
                    unload: () => archedprojectslider.unload()
                };
            })
        );
    }
    if (document.querySelector('.js-logo-slider')) { // Logo slider
        asyncPromises.push(
            Promise.all([
                import('./modules/logoslider.mjs'),
                loadSwiperDeps()
            ]).then(([{ default: logoslider }, { Swiper, Autoplay }]) => {
                logoslider.init(Swiper, Autoplay);

                loadedModules.logoslider = {
                    unload: () => logoslider.unload()
                };
            })
        );
    }
    if (document.querySelector('.js-project-grid')) { // Project grid
        asyncPromises.push(
            Promise.all([
                import('./modules/projectgrid.mjs'),
                loadMasonry(),
                loadInfiniteScroll(),
                loadImagesLoaded()
            ]).then(([{ default: projectgrid }, Masonry, InfiniteScroll, imagesLoaded]) => {
                projectgrid.init(gsap, ScrollTrigger, stFadeIn, Masonry, InfiniteScroll, imagesLoaded);

                /* Add to cache with unload function */
                loadedModules.projectgrid = { unload: () => projectgrid.unload(gsap, Masonry, InfiniteScroll) };
            })
        );
    }
    if (document.querySelector('.js-recent-posts')) { // Recent posts
        asyncPromises.push(import('./modules/recentposts.mjs').then(async ({ default: recentposts }) => {
            const dayjs = await loadDayjs();

            recentposts.init(gsap, dayjs, getSiblings);
        }));
    }
    if (document.querySelector('.js-contact-form')) { // Contact form
        asyncPromises.push(import('./modules/contactform.mjs').then(({ default: contactform }) => {
            contactform.init(gsap, callAfterResize);
        }));
    }
    if (document.querySelector('.js-presentation-form')) { // Presentation form
        asyncPromises.push(import('./modules/presentationform.mjs').then(({ default: presentationform }) => {
            presentationform.init(gsap);
        }));
    }
    if (document.querySelector('.js-popunder')) { // Popunder
        asyncPromises.push(import('./modules/popunder.mjs').then(({ default: popunder }) => {
            popunder.init(gsap, ScrollTrigger, blobity, callAfterResize);
        }));
    }
    if (document.querySelector('.js-link-in-bio')) { // Link in bio
        asyncPromises.push(import('./modules/linkinbio.mjs').then(({ default: linkinbio }) => {
            linkinbio.init(gsap, callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn);
        }));
    }

    /* Blog related */
    if (document.querySelector('.js-blog-home')) { // Blog overview
        asyncPromises.push(
            Promise.all([
                import('./blog/overview.mjs'),
                loadInfiniteScroll(),
                loadDayjs()
            ]).then(([{ default: blogOverview }, InfiniteScroll, dayjs]) => {
                blogOverview.init(gsap, ScrollTrigger, stFadeIn, dayjs, InfiniteScroll);

                /* Add to cache with unload function */
                loadedModules.blogOverview = { unload: () => blogOverview.unload(gsap, InfiniteScroll) };
            })
        );
    }
    if (document.querySelector('.js-blog-single') || document.querySelector('.js-related-posts') || document.querySelector('.js-tag-list')) { // Blog single
        asyncPromises.push(
            Promise.all([
                import('./blog/single.mjs'),
                loadDayjs()
            ]).then(([{ default: blogSingle }, dayjs]) => {
                blogSingle.init(gsap, ScrollTrigger, stFadeIn, dayjs, getSiblings);
            })
        );
    }
    if (
        document.querySelector('.js-blog-download') ||
        (document.querySelector('.js-blog-single-content') && document.querySelector('.js-table-of-contents')) ||
        document.querySelector('.js-blockquote') ||
        document.querySelector('.js-checklist')
    ) { // Shortcodes
        asyncPromises.push(import('./blog/shortcodes.mjs').then(({ default: shortcodes }) => {
            shortcodes.init(gsap, ScrollTrigger, createValidHtmlId, getCookie, stFadeIn);
        }));
    }



    // Once all async imports and initializations are done, set modulesLoaded to true
    Promise.all(asyncPromises).then(() => {
        modulesLoaded = true;
        activateRevealListenerIfReady();
    }).catch(() => {
        modulesLoaded = true;
        activateRevealListenerIfReady();
    });
}
swup.hooks.on('content:replace', swupInit);

if (document.readyState === 'complete') {
    swupInit();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        swupInit();
    });
}

/* Function to trigger revealAnimationListener when both conditions are true */
function activateRevealListenerIfReady() {
    if (modulesLoaded && transitionComplete) {
        revealAnimationListener.state = true; // Both conditions are true, activate revealAnimationListener
    }
}


/* Kill functions on content replace */
function swupUnload() {
    modulesLoaded = false;

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

    /* Kill all ScrollTriggers */
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    /* Main template unload */
    main.unload(gsap, enableScroll);
    popups.unload();

    if (overscrollCleanup) {
        overscrollCleanup();
        overscrollCleanup = null;
    }

    /* Other templates unload */
    for (const moduleName in loadedModules) {
        if (typeof loadedModules[moduleName].unload === 'function') {
            loadedModules[moduleName].unload();
        }
    }

    /* Clear the loadedModules cache after unloading */
    for (const key in loadedModules) {
        delete loadedModules[key];
    }

    /* Clear page-specific resize listeners */
    clearAfterResizeHandlers();
}
swup.hooks.before('content:replace', swupUnload);


/* Bounce Blobity and refresh ScrollTrigger on resize */
callAfterResize(() => {
    if (blobity) blobity.bounce();
    ScrollTrigger.refresh(true);
}, null, true);


/* Initial loader reveal */
document.addEventListener("readystatechange", () => {
    if (document.readyState === 'complete' && document.querySelector('.js-loader')) {
        const loader = document.querySelector('.js-loader');
        const topBarItems = getTopBarItems();
        gsap.to(loader, {
            autoAlpha: 0,
            onComplete: () => {
                loader.remove();
                transitionComplete = true;
                activateRevealListenerIfReady();
                gsap.to(topBarItems, { duration: .5, y: 0 });
            }
        });
    }
});


/* Prevent browser from trying to restore scroll position from history */
if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
}
