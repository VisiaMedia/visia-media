/* Initialize */
export function init(gsap, blobity, callAfterResize){
    if(document.querySelector('.js-global-button')) {
        gsap.utils.toArray(".js-global-button").forEach(globalButton => {
            const globalButtonIcon = globalButton.querySelector('.js-global-button-icon'),
                globalButtonFill = globalButton.querySelector('.js-global-button-fill');

            /* Set Blobity data-attribute on buttons */
            let setBlobityRadius;

            (setBlobityRadius = function(){
                globalButtonFill.setAttribute('data-blobity-radius', ((globalButtonFill.offsetWidth * 2) + 16) / 2);
            })();

            callAfterResize(setBlobityRadius);



            /* Setup timeline */
            let globalButtonTl = gsap.timeline({
                paused: true,
                yoyo: true,
                onStart: () => {
                    blobity.focusElement(globalButtonFill);
                    blobity.updateOptions({
                        zIndex: 1
                    });
                },
                onComplete: () => {
                    blobity.focusElement(globalButtonFill);
                    blobity.updateOptions({
                        zIndex: 1
                    });
                },
                onReverseComplete: () => {
                    gsap.set([globalButtonIcon, globalButtonFill], {
                        clearProps: "all"
                    });

                    blobity.updateOptions({
                        zIndex: 50
                    });
                }
            });

            globalButtonTl.to(globalButtonIcon, {
                color: "#ffffff"
            }, '<');

            globalButtonTl.to(globalButtonFill, {
                background: '#ea2c76',
                borderColor: '#ea2c76',
                scale: 2
            }, '<');

            /* Add event functions and listeners */
            globalButton.addEventListener("mouseenter", function() {
                if(window.matchMedia("(pointer: fine)").matches) {
                    globalButtonTl.play(0);
                }
            });
            globalButton.addEventListener("mouseleave", function() {
                if(window.matchMedia("(pointer: fine)").matches) {
                    blobity.reset();

                    globalButtonTl.reverse(0);

                    blobity.bounce();
                }
            });
            globalButton.addEventListener("click", function() {
                if(window.matchMedia("(pointer: coarse)").matches) {
                    globalButtonTl.play(0).then(function() {
                        setTimeout(function(){
                            blobity.reset();

                            globalButtonTl.reverse(0);
                        }, 125);
                    });
                }

                blobity.reset();
            });

            /* Invalidate timeline after resize */
            callAfterResize(function() {
                globalButtonTl.seek(0).invalidate();
            });
        });
    }
}

/* Export init and unload functions */
export default {
    init
};