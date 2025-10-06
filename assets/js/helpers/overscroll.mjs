/* Initialize */
export function stopOverscroll(gsap, element) {
    element = gsap.utils.toArray(element)[0] || window;
    if (element === document.body || element === document.documentElement) {
        element = window;
    }

    let lastScroll = 0,
        lastTouch,
        forcing = false,
        forward = true,
        isRoot = element === window,
        scroller = isRoot ? document.scrollingElement : element,
        ua = window.navigator.userAgent + "",
        getMax = isRoot ? () => scroller.scrollHeight - window.innerHeight : () => scroller.scrollHeight - scroller.clientHeight,
        addListener = (type, func) => element.addEventListener(type, func, { passive: false }),
        removeListener = (type, func) => element.removeEventListener(type, func),
        revert = () => {
            scroller.style.overflowY = "auto";
            forcing = false;
        },
        kill = () => {
            forcing = true;
            scroller.style.overflowY = "hidden";
            if (!forward && scroller.scrollTop < 1) {
                scroller.scrollTop = 1;
            } else {
                scroller.scrollTop = getMax() - 1;
            }
            setTimeout(revert, 1);
        },
        handleTouch = e => {
            let evt = e.changedTouches ? e.changedTouches[0] : e,
                forward = evt.pageY <= lastTouch;
            if (((!forward && scroller.scrollTop <= 1) || (forward && scroller.scrollTop >= getMax() - 1)) && e.type === "touchmove") {
                e.preventDefault();
            } else {
                lastTouch = evt.pageY;
            }
        },
        handleScroll = e => {
            if (!forcing) {
                let scrollTop = scroller.scrollTop;
                forward = scrollTop > lastScroll;
                if ((!forward && scrollTop < 1) || (forward && scrollTop >= getMax() - 1)) {
                    e.preventDefault();
                    kill();
                }
                lastScroll = scrollTop;
            }
        };

    // Apply to Safari specifically or allow to all browsers
    if ("ontouchend" in document) {
        addListener('scroll', handleScroll);
        addListener('touchstart', handleTouch);
        addListener('touchmove', handleTouch);
    }

    scroller.style.overscrollBehavior = "none";

    // Return a cleanup function to remove listeners
    return () => {
        removeListener('scroll', handleScroll);
        removeListener('touchstart', handleTouch);
        removeListener('touchmove', handleTouch);
        scroller.style.overscrollBehavior = ""; // Reset style
    };
}

/* Export init function */
export default {
    stopOverscroll
};