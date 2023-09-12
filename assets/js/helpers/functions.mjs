import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText.js";

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

    return handler;
}



/* Registering "text reveal in timeline" function */
function tlTextReveal(element, timeline) {
    if(element.querySelectorAll('.css-global-vertical-text-reveal-parent')) {
        let existingParents = element.querySelectorAll('.css-global-vertical-text-reveal-parent');

        existingParents.forEach(parent => {
            let child = parent.querySelector('.css-global-vertical-text-reveal-child');

            child.outerHTML = child.innerHTML;
            parent.outerHTML = parent.innerHTML;
        });
    }

    const splitChild = new SplitText(element, {
        type: "lines",
        linesClass: "css-global-vertical-text-reveal-child"
    });

    const splitParent = new SplitText(element, {
        type: "lines",
        linesClass: "css-global-vertical-text-reveal-parent"
    });

    gsap.set(splitChild.lines, {
        y: '100%'
    });

    timeline.to(splitChild.lines, {
        duration: .45,
        stagger: .2,
        y: 0,
        onComplete: () => {
            splitParent.revert();
            splitChild.revert();
        }
    });
}



/* Registering "fade in in timeline" function */
function tlFadeIn(element, timeline) {
    gsap.set(element, {
        autoAlpha: 0,
        y: "1.5rem"
    });

    timeline.to(element, {
        y: "0rem",
        autoAlpha: 1
    });
}



/* Get all siblings of an element */
function getSiblings (elem) {
    return Array.from(elem.parentNode.children).filter(function (sibling) {
        return sibling !== elem;
    });
}



/* Get first siblings of an element, with class */
const getNextSibling = function (elem, selector) {
    // Get the next sibling element
    var sibling = elem.nextElementSibling;

    // If there's no selector, return the first sibling
    if (!selector) return sibling;

    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.nextElementSibling
    }
};

const getPreviousSibling = function (elem, selector) {
    // Get the next sibling element
    var sibling = elem.previousElementSibling;

    // If there's no selector, return the first sibling
    if (!selector) return sibling;

    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.previousElementSibling;
    }
};



/* Add support for disabling scroll */
const scrollKeys = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1};

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

export {callAfterResize, tlTextReveal, tlFadeIn, getSiblings, getNextSibling, getPreviousSibling, disableScroll, enableScroll};