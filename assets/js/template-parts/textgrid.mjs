/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal){
    if(document.querySelector('.js-textgrid')) {
        const textgrids = gsap.utils.toArray('.js-textgrid');

        /* Loop over instances */
        textgrids.forEach(textgrid => {
            let timeline = tlSetup(textgrid, textgrid.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(textgrid.querySelector('.js-textgrid-vertical-text-reveal')) {
                    tlTextReveal(textgrid.querySelector('.js-textgrid-vertical-text-reveal'), timeline);
                }


                /* Add animation for item reveal */
                if(textgrid.querySelector('.js-textgrid-item')) {
                    let textgridItems = gsap.utils.toArray(textgrid.querySelectorAll('.js-textgrid-item'));

                    gsap.set(textgridItems, {
                        autoAlpha:0,
                        y: "1.5rem",
                        immediateRender: true
                    });

                    timeline.to(textgridItems, {
                        autoAlpha: 1,
                        y: "0rem",
                        stagger: .2
                    });
                }
            }

            /* Execute once */
            buildTimeline();


            /* Clear and rebuild timeline on resize (only rebuild if not completed) */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);
            });
        });
    }
}

/* Export init function */
export default {
    init
};