/* Initialize */
export function init(gsap, ScrollTrigger, Draggable, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    if(document.querySelector('.js-project-slider')) {
        /* Get all project grid slider as array */
        const projectSliders = gsap.utils.toArray('.js-project-slider');

        /* Loop over project slider instances */
        projectSliders.forEach(projectSlider => {
            let projectSliderInner = projectSlider.querySelector('.js-project-slider-inner'),
                projectSliderList = projectSlider.querySelector('.js-project-slider-list'),
                projectSliderListItems = projectSliderList.querySelectorAll('.js-project-slider-list-item');


            /* Setup timeline */
            let timeline = tlSetup(projectSlider, projectSlider.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(projectSlider.querySelector('.js-project-slider-title')) {
                    tlTextReveal(projectSlider.querySelector('.js-project-slider-title'), timeline);
                }

                /* Show items one by one */
                tlFadeIn(projectSliderListItems, timeline);
            }

            /* Execute once */
            buildTimeline();


            /* Clear and rebuild timeline on resize (only rebuild if not completed) */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);
            });



            /* Setup draggable slider */
            Draggable.create(projectSliderList, {
                activeCursor: 'inherit',
                cursor: 'inherit',
                type: "x",
                inertia: true,
                dragResistance: () => {
                    if(window.outerWidth > 810) {
                        return .25;
                    } else {
                        return .125;
                    }
                },
                edgeResistance: () => {
                    if(window.outerWidth > 810) {
                        return .25;
                    } else {
                        return .125;
                    }
                },
                bounds: projectSliderInner,
                overshootTolerance: 0
            });
        });

        /* Add logic for hovering items */
        if(window.matchMedia("(pointer: fine)").matches) {
            gsap.utils.toArray('.js-project-slider-list-item').forEach(projectSliderListItem => {
                const projectSliderListItemLink = projectSliderListItem.querySelector('.js-project-slider-list-item-link');
                const projectSliderListItemVisual = projectSliderListItem.querySelector('.js-project-slider-list-item-visual');

                /* Event listeners */
                projectSliderListItemLink.addEventListener("mouseenter", function() {
                    gsap.to(projectSliderListItemVisual, {
                        scale: 1.1
                    });
                });

                projectSliderListItemLink.addEventListener("mouseleave", function() {
                    gsap.to(projectSliderListItemVisual, {
                        scale: 1
                    });
                });
            });
        }
    }
}

/* Export init function */
export default {
    init
};