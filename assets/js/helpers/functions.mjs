import { gsap } from "gsap";

/* Registering GSAP resize function (called when resizing stops) */
function callAfterResize(func, delay) {
    let currentWidth = window.innerWidth,
        dc = gsap.delayedCall(delay || 0.2, func).pause(),
        handler = () => {
            if(currentWidth !== window.innerWidth) {
                dc.restart(true);

                currentWidth = window.innerWidth;
            }
        }

    window.addEventListener("resize", handler);

    if (screen.orientation) {
        screen.orientation.addEventListener("change", handler);
    }

    return handler;
}



/* Registering function for clearing + building timeline after resize */
function buildTlAfterResize(timeline, buildTimeline) {
    if(timeline.totalDuration() > 0) {
        if(timeline.time() < timeline.totalDuration()) {
            timeline.clear();

            buildTimeline();
        } else {
            timeline.clear();
        }
    }
}



/* Registering "setup basic timeline" function */
function tlSetup(element, stCount) {
    let timeline = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            start: "top 75%",
            end: "top top",
            once: true,
            invalidateOnRefresh: true,
            refreshPriority: stCount,
            preventOverlaps: 'globaltimeline'
        }
    });

    /* Instantly disable ScrollTrigger */
    timeline.scrollTrigger.disable();

    /* Return timeline element */
    return timeline;
}

/* Registering "fade in in timeline" function */
function tlFadeIn(element, timeline) {
    gsap.set(element, {
        autoAlpha: 0,
        y: "1.5rem",
        immediateRender: true
    });

    timeline.to(element, {
        y: "0rem",
        autoAlpha: 1,
        onStart:() => {
            if(NodeList.prototype.isPrototypeOf(element)) {
                element.forEach(el => {
                    el.style.willChange = 'transform, opacity';
                });
            } else {
                element.style.willChange = 'transform, opacity';
            }
        },
        onComplete:() => {
            if(NodeList.prototype.isPrototypeOf(element)) {
                element.forEach(el => {
                    el.style.willChange = 'auto';

                    gsap.set(el, {
                        clearProps: "transform",
                    });
                });
            } else {
                element.style.willChange = 'auto';

                gsap.set(element, {
                    clearProps: "transform",
                });
            }
        }
    });
}



/* Registering "section reveal in timeline" function */
function tlSectionReveal(element, timeline) {
    gsap.set(element, {
        autoAlpha: 0,
        y: "1.5rem",
        immediateRender: true
    });

    timeline.to(element, {
        y: "0rem",
        autoAlpha: 1,
        onStart:() => {
            element.style.willChange = 'transform, opacity';
        },
        onComplete:() => {
            element.style.willChange = 'auto';

            gsap.set(element, {
                clearProps: "transform",
            });
        }
    });
}



/* Standalone ScrollTrigger fadein */
function stFadeIn(element, refreshPriority) {

    /* Setup function for a single element */
    function singleSetup(el, refresh) {
        /* Initially hide */
        gsap.set(el, {
            autoAlpha:0,
            y: "1.5rem"
        });

        /* ScrollTrigger */
        gsap.to(el, {
            autoAlpha: 1,
            y: "0rem",
            onStart:() => {
                el.style.willChange = 'transform, opacity';
            },
            onComplete:() => {
                el.style.willChange = 'auto';

                gsap.set(el, {
                    clearProps: "transform",
                });
            },
            scrollTrigger: {
                trigger: el,
                start: "top 75%",
                end: "top top",
                once: true,
                refreshPriority: (refresh === 'self') ? el.dataset.stCount : refresh
            }
        });
    }

    /* If input is nodelist, loop over it and set up each individual element */
    if(NodeList.prototype.isPrototypeOf(element)) {
        element.forEach(el => {
            singleSetup(el, refreshPriority);
        });
    } else { /* Else, just run setup once */
        singleSetup(element, refreshPriority);
    }
}



/* Getcookie */
function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}



/* Get all siblings of an element */
function getSiblings (elem) {
    return Array.from(elem.parentNode.children).filter(function (sibling) {
        return sibling !== elem;
    });
}



/* Get next sibling with optional selector */
const getNextSibling = (elem, selector = '') => {
    let sibling = elem.nextElementSibling;
    while (sibling) {
        if (!selector || sibling.matches(selector)) return sibling;
        sibling = sibling.nextElementSibling;
    }
    return null; // Return null if no matching sibling found
};

/* Get previous sibling with optional selector */
const getPreviousSibling = (elem, selector = '') => {
    let sibling = elem.previousElementSibling;
    while (sibling) {
        if (!selector || sibling.matches(selector)) return sibling;
        sibling = sibling.previousElementSibling;
    }
    return null; // Return null if no matching sibling found
};



/* Create a valid HTML ID from value */
function createValidHtmlId(value) {
    value = value.replace(/[^a-zA-Z ]/g, "");
    let id = value ? value.replace(/\W/g, '_') : '_';
    id = id.charAt(0).match(/[\d_]/g)?.length ? `id_${id}` : id;
    id = id.toLowerCase();

    if(document.getElementById(id)) {
        let postFix = '_1';

        for(let i = 1; document.getElementById(id+'_'+i); i++) {
            postFix = '_'+(i+1);
        }

        id = id + postFix;
    }

    return id;
}



/* Add support for disabling scroll */
const scrollKeys = {37: 1, 38: 1, 39: 1, 40: 1, 33: 1, 34: 1, 35: 1, 36: 1};

function scrollPreventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (scrollKeys[e.keyCode]) {
        scrollPreventDefault(e);
        return false;
    }
}

let supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch(e) {}

const wheelOpt = supportsPassive ? {passive: false} : false;
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

/* Disable scroll */
function disableScroll() {
    window.addEventListener('DOMMouseScroll', scrollPreventDefault, false); // older FF
    window.addEventListener(wheelEvent, scrollPreventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', scrollPreventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

/* Enable scroll */
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', scrollPreventDefault, false);
    window.removeEventListener(wheelEvent, scrollPreventDefault, wheelOpt);
    window.removeEventListener('touchmove', scrollPreventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

export {callAfterResize, buildTlAfterResize, tlSetup, tlFadeIn, tlSectionReveal, stFadeIn, getCookie, getSiblings, getNextSibling, getPreviousSibling, createValidHtmlId, disableScroll, enableScroll};
