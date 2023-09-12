/* Initialize */
export function init(gsap, ScrollTrigger, blobity, Masonry){
    if(document.querySelector('.js-project-grid')) {
        /* Get all project grid instances as array */
        const projectGrids = gsap.utils.toArray('.js-project-grid');

        /* Loop over project grid instances */
        projectGrids.forEach(projectGrid => {
            const projectGridList = projectGrid.querySelector('.js-project-grid-list');

            /* Setup Masonry for grid layout */
            const masonry = new Masonry(projectGridList, {
                itemSelector: '.js-project-grid-item',
                columnWidth: '.js-grid-sizer',
                gutter: '.js-gutter-sizer',
                percentPosition: true
            });

            masonry.on('layoutComplete', function() {
                setTimeout(function() { ScrollTrigger.refresh() }, 400);
            });



            /* Animate grid items on scroll */
            const projectGridItems = projectGrid.querySelectorAll('.js-project-grid-item');

            /* Loop over projectgrid items */
            projectGridItems.forEach(projectGridItem => {
                /* Initially hide element */
                gsap.set(projectGridItem, {
                    autoAlpha:0,
                    y: "1.5rem"
                });

                /* Show element */
                gsap.to(projectGridItem, {
                    scrollTrigger: {
                        trigger: projectGridItem,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: projectGrid.dataset.stCount
                    },
                    autoAlpha: 1,
                    y: "0rem"
                });
            });



            /* Add logic for hovering items */
            if(window.matchMedia("(pointer: fine)").matches) {
                gsap.utils.toArray('.js-project-grid-item').forEach(projectGridItem => {
                    const projectGridItemLink = projectGridItem.querySelector('.js-project-grid-item-link');
                    const projectGridItemVisual = projectGridItem.querySelector('.js-project-grid-item-visual');

                    /* Event listeners */
                    projectGridItemLink.addEventListener("mouseenter", function() {
                        gsap.to(projectGridItemVisual, {
                            scale: 1.1
                        });
                    });

                    projectGridItemLink.addEventListener("mouseleave", function() {
                        gsap.to(projectGridItemVisual, {
                            scale: 1
                        });
                    });
                });
            }



            /* Animate 'show more' button on scroll and add functionality */
            if(projectGrid.querySelector('.js-project-grid-button-wrapper')) {
                const projectGridButtonWrapper = projectGrid.querySelector('.js-project-grid-button-wrapper'),
                    projectGridButton = projectGridButtonWrapper.querySelector('.js-project-grid-button'),
                    projectGridExtraCases = projectGrid.querySelector('.js-project-grid-extra-cases');

                /* Initially hide element */
                gsap.set(projectGridButtonWrapper, {
                    autoAlpha:0,
                    y: "1.5rem"
                });

                /* Show element */
                gsap.to(projectGridButtonWrapper, {
                    scrollTrigger: {
                        trigger: projectGridButtonWrapper,
                        start: "top center",
                        once: true,
                        invalidateOnRefresh: true,
                        refreshPriority: projectGrid.dataset.stCount
                    },
                    autoAlpha: 1,
                    y: "0rem"
                });



                /* Adding event listener */
                projectGridButton.addEventListener("click", function() {
                    blobity.reset();

                    let extraCases = projectGridExtraCases.children,
                        appendCount = 0,
                        appendingElems = [],
                        documentFragment = document.createDocumentFragment();

                    for(let i = 0; i < extraCases.length && i < 4; i++) {
                        appendCount++;

                        let extraCase = extraCases[i],
                            extraCaseElem = document.createElement('li');

                        /* Create the element
                         *
                         * Define variables */
                        let elemPermalink = extraCase.dataset.casePermalink,
                            elemTitle = extraCase.dataset.caseTitle,
                            caseStatement = extraCase.dataset.caseStatement,
                            elemThumbnail = extraCase.dataset.caseThumbnail;

                        /* Build HTML element */
                        extraCaseElem.className = 'project-grid__list__item js-project-grid-item';

                        /* Create the link */
                        let extraCaseElemLink = document.createElement('a');
                        extraCaseElemLink.className = 'project-grid__list__item__link';
                        extraCaseElemLink.setAttribute('rel', 'bookmark');
                        extraCaseElemLink.setAttribute('data-no-blobity', 'true');
                        extraCaseElemLink.setAttribute('href', elemPermalink);

                        /* Create the thumbnail */
                        let extraCaseElemVisual = document.createElement('div');
                        extraCaseElemVisual.className = 'project-grid__list__item__visual';

                        /* Create the image */
                        let extraCaseElemVisualImg = document.createElement('div');
                        extraCaseElemVisualImg.className = 'project-grid__list__item__visual__image';
                        extraCaseElemVisualImg.style.backgroundImage = 'url("'+elemThumbnail+'")';


                        /* Create the heading */
                        let extraCaseElemHeading = document.createElement('h2');
                        extraCaseElemHeading.className = 'project-grid__list__item__title css-title';
                        extraCaseElemHeading.innerHTML = decodeURI(elemTitle) + ' &mdash; ';

                        /* Create the statement */
                        let extraCaseElemStatement = document.createElement('span');
                        extraCaseElemStatement.className = 'project-grid__list__item__title__statement';
                        extraCaseElemStatement.innerText = decodeURI(caseStatement);

                        /* Put it together */
                        extraCaseElemVisual.appendChild(extraCaseElemVisualImg);
                        extraCaseElemHeading.appendChild(extraCaseElemStatement);

                        extraCaseElemLink.appendChild(extraCaseElemVisual);
                        extraCaseElemLink.appendChild(extraCaseElemHeading);

                        extraCaseElem.appendChild(extraCaseElemLink);

                        /* Add logic for hovering */
                        if(window.matchMedia("(pointer: fine)").matches) {
                            /* Event listeners */
                            extraCaseElemLink.addEventListener("mouseenter", function() {
                                gsap.to(extraCaseElemVisualImg, {
                                    scale: 1.1
                                });
                            });

                            extraCaseElemLink.addEventListener("mouseleave", function() {
                                gsap.to(extraCaseElemVisualImg, {
                                    scale: 1
                                });
                            });
                        }

                        /* Append new element to Document Fragment and push to array */
                        documentFragment.appendChild(extraCaseElem);
                        appendingElems.push(extraCaseElem);
                    }

                    /* Add new items to grid */
                    projectGridList.appendChild(documentFragment);

                    /* Lay-out using Masonry */
                    masonry.appended(appendingElems);

                    /* Remove appended items */
                    for(let x = 0; x < appendCount; x++) {
                        extraCases.item(0).remove();
                    }

                    /* Remove button if extraCases is empty */
                    if(!projectGridExtraCases.hasChildNodes()) {
                        gsap.to(projectGridButtonWrapper, {
                            autoAlpha: 0,
                            height: 0,
                            margin: 0,
                            padding: 0,
                            duration:.1,
                            onComplete: blobity.reset(),
                            onStart:() => {
                                gsap.to(projectGridButton, {
                                    display: 'none',
                                    autoAlpha: 0,
                                    height: 0,
                                    margin: 0,
                                    padding: 0,
                                    duration:.1,
                                    onStart: blobity.reset(),
                                    onComplete: blobity.reset(),
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}

/* Export init function */
export default {
    init
};