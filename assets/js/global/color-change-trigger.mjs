/* Initialize */
export function init(gsap, blobity, ScrollTrigger){
    if(document.querySelector('.js-global-color-change-trigger') && document.querySelector('.js-main-body-container')) {
        let documentRoot = document.querySelector(':root'),
            oldColor,
            oldBackground,
            oldPlainColor,
            oldVisualFilter;

        gsap.utils.toArray(".js-global-color-change-trigger").forEach(function (globalColorChangeTrigger, i) {
            let colorReverse = oldColor,
                backgroundReverse = oldBackground,
                plainColorReverse = oldPlainColor,
                visualFilterReverse = oldVisualFilter;

            gsap.to(".js-main-body-container", {
                scrollTrigger: {
                    trigger: globalColorChangeTrigger,
                    start: () => {
                        return 'top center'
                    },
                    invalidateOnRefresh: false,
                    toggleActions: "play none none reverse",
                    refreshPriority: globalColorChangeTrigger.dataset.stCount,
                    preventOverlaps: 'color-change-trigger',
                    onEnter:() => {
                        documentRoot.style.setProperty('--current-color', globalColorChangeTrigger.dataset.text);
                        documentRoot.style.setProperty('--current-background', globalColorChangeTrigger.dataset.background);
                        documentRoot.style.setProperty('--plain-text-color', globalColorChangeTrigger.dataset.plaintext);
                        documentRoot.style.setProperty('--visual-img-filter', globalColorChangeTrigger.dataset.visualFilter);
                    },
                    onLeaveBack:() => {
                        if(plainColorReverse) {
                            documentRoot.style.setProperty('--current-color', colorReverse);
                            documentRoot.style.setProperty('--current-background', backgroundReverse);
                            documentRoot.style.setProperty('--plain-text-color', plainColorReverse);
                            documentRoot.style.setProperty('--visual-img-filter', visualFilterReverse);
                        }
                    }
                },
                immediateRender: false,
                background: globalColorChangeTrigger.dataset.background,
                color: globalColorChangeTrigger.dataset.text,
                onComplete: () => {
                    blobity.updateOptions({
                        color: globalColorChangeTrigger.dataset.text
                    });

                    /* Bounce blobity */
                    blobity.bounce();

                    /* Update main color variable */
                    documentRoot.style.setProperty('--plain-text-color', globalColorChangeTrigger.dataset.plaintext);
                    documentRoot.style.setProperty('--visual-img-filter', globalColorChangeTrigger.dataset.visualFilter);
                    documentRoot.style.setProperty('--current-color', globalColorChangeTrigger.dataset.text);
                    documentRoot.style.setProperty('--current-background', globalColorChangeTrigger.dataset.background);
                },
                onReverseComplete: () => {
                    if(colorReverse) {
                        blobity.updateOptions({
                            color: colorReverse,
                        });

                        /* Bounce blobity */
                        blobity.bounce();

                        /* Update main color variable */
                        if(plainColorReverse) {
                            documentRoot.style.setProperty('--plain-text-color', plainColorReverse);
                            documentRoot.style.setProperty('--visual-img-filter', visualFilterReverse);
                            documentRoot.style.setProperty('--current-color', colorReverse);
                            documentRoot.style.setProperty('--current-background', backgroundReverse);
                        }
                    }
                }
            });

            oldColor = globalColorChangeTrigger.dataset.text;
            oldBackground = globalColorChangeTrigger.dataset.background;
            oldPlainColor = globalColorChangeTrigger.dataset.plaintext;
            oldVisualFilter = globalColorChangeTrigger.dataset.visualFilter;
        });
    }
}

/* Export init and unload functions */
export default {
    init
};