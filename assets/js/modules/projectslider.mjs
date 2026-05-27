/* Initialize */
export function init(gsap, Draggable) {
    const projectSliders = gsap.utils.toArray('.js-project-slider');

    if (projectSliders.length > 0) {
        /* Loop over project slider instances */
        projectSliders.forEach(projectSlider => {
            const projectSliderInner = projectSlider.querySelector('.js-project-slider-inner');
            const projectSliderList = projectSlider.querySelector('.js-project-slider-list');
            const projectSliderListItems = projectSliderList.querySelectorAll('.js-project-slider-list-item');

            /* Setup draggable slider */
            Draggable.create(projectSliderList, {
                activeCursor: 'inherit',
                cursor: 'inherit',
                type: "x",
                inertia: true,
                dragResistance: window.outerWidth > 810 ? 0.25 : 0.125,
                edgeResistance: window.outerWidth > 810 ? 0.25 : 0.125,
                bounds: projectSliderInner,
                overshootTolerance: 0
            });

            /* Add logic for hovering items if pointer is fine (e.g., mouse devices) */
            if (window.matchMedia("(pointer: fine)").matches) {
                projectSliderListItems.forEach(item => {
                    const itemLink = item.querySelector('.js-project-slider-list-item-link');
                    const itemVisual = item.querySelector('.js-project-slider-list-item-visual');

                    /* Hover event listeners */
                    itemLink.addEventListener("mouseenter", () => {
                        gsap.to(itemVisual, { scale: 1.1 });
                    });

                    itemLink.addEventListener("mouseleave", () => {
                        gsap.to(itemVisual, { scale: 1 });
                    });
                });
            }
        });
    }
}

/* Export init function */
export default {
    init
};
