/* Initialize */
export function init(gsap, ScrollTrigger, Draggable){
    if(document.querySelector('.js-project-slider')) {
        /* Get all project grid slider as array */
        const projectSliders = gsap.utils.toArray('.js-project-slider');

        /* Loop over project slider instances */
        projectSliders.forEach(projectSlider => {
            let projectSliderInner = projectSlider.querySelector('.js-project-slider-inner'),
                projectSliderList = projectSlider.querySelector('.js-project-slider-list'),
                projectSliderListItems = projectSliderList.querySelectorAll('.js-project-slider-list-item');

            /* Initially hide and offset all slides */
            gsap.set(projectSliderListItems, {
                autoAlpha:0,
                y: "1.5rem"
            });

            /* Reveal slides one-by-one on viewport scroll */
            gsap.to(projectSliderListItems, {
                scrollTrigger: {
                    trigger: projectSlider,
                    start: "top center",
                    once: true,
                    refreshPriority: projectSlider.dataset.stCount
                },
                autoAlpha: 1,
                y: "0rem",
                stagger: .2
            })

            /* Setup draggable slider */
            Draggable.create(projectSliderList, {
                activeCursor: 'inherit',
                cursor: 'inherit',
                type: "x",
                inertia: true,
                dragResistance: () => {
                    if(window.outerWidth > 768) {
                        return .25;
                    } else {
                        return .125;
                    }
                },
                edgeResistance: () => {
                    if(window.outerWidth > 768) {
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