/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    const goalforms = document.querySelectorAll('.js-goalform');

    if(goalforms) {
        goalforms.forEach(goalform => {
            /* Set Blobity radius on buttons */
            const options = goalform.querySelectorAll('.js-option');

            if(options) {
                options.forEach(option => {

                    let setBlobityRadius;
                    (setBlobityRadius = function(){
                        option.setAttribute("data-blobity-radius", (option.offsetHeight + 16) / 2);
                    })();

                    callAfterResize(setBlobityRadius);
                });
            }
        });
    }
}

/* Export init function */
export default {
    init
}