/* Initialize */
export function init(gsap, blobity, ScrollTrigger) {
    const colorChangeTriggers = document.querySelectorAll('.js-global-color-change-trigger');
    if (colorChangeTriggers.length > 0) {
        ScrollTrigger.clearScrollMemory("manual");

        let oldColor, oldBackground, oldPlainText, oldLightBorder, oldDarkBorder, oldDropshadow, oldImgFilter;

        colorChangeTriggers.forEach((trigger, i) => {
            let colorReverse = oldColor,
                backgroundReverse = oldBackground,
                plainTextReverse = oldPlainText,
                lightBorderReverse = oldLightBorder,
                darkBorderReverse = oldDarkBorder,
                dropShadowReverse = oldDropshadow,
                imgFilterReverse = oldImgFilter;

            /* Set initial values for the first trigger */
            if (i === 0) {
                gsap.set("html", {
                    "--current-color": trigger.dataset.text,
                    "--current-background": trigger.dataset.background,
                    "--plain-text-color": trigger.dataset.plaintext,
                    "--light-border-color": trigger.dataset.lightBorder,
                    "--dark-border-color": trigger.dataset.darkBorder,
                    "--dropshadow-color": trigger.dataset.dropShadow,
                    "--visual-img-filter": trigger.dataset.visualFilter,
                    onComplete: () => {
                        if(blobity) {
                            blobity.updateOptions({color: trigger.dataset.text});
                            blobity.bounce(); // Bounce Blobity after setting colors
                        }
                    }
                });
            } else {
                /* Create ScrollTrigger for subsequent color change triggers */
                ScrollTrigger.create({
                    trigger: trigger,
                    start: "top center",
                    invalidateOnRefresh: true,
                    refreshPriority: trigger.dataset.stCount,
                    preventOverlaps: "global-color-change-trigger",
                    onEnter: () => {
                        gsap.to("html", {
                            "--current-color": trigger.dataset.text,
                            "--current-background": trigger.dataset.background,
                            "--plain-text-color": trigger.dataset.plaintext,
                            "--light-border-color": trigger.dataset.lightBorder,
                            "--dark-border-color": trigger.dataset.darkBorder,
                            "--dropshadow-color": trigger.dataset.dropShadow,
                            "--visual-img-filter": trigger.dataset.visualFilter,
                            overwrite: true,
                            onComplete: () => {
                                if(blobity) {
                                    blobity.updateOptions({color: trigger.dataset.text});
                                    blobity.bounce(); // Bounce Blobity on color change
                                }
                            }
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to("html", {
                            "--current-color": colorReverse,
                            "--current-background": backgroundReverse,
                            "--plain-text-color": plainTextReverse,
                            "--light-border-color": lightBorderReverse,
                            "--dark-border-color": darkBorderReverse,
                            "--dropshadow-color": dropShadowReverse,
                            "--visual-img-filter": imgFilterReverse,
                            overwrite: true,
                            onComplete: () => {
                                if(blobity) {
                                    blobity.updateOptions({color: colorReverse});
                                    blobity.bounce(); // Bounce Blobity when reverting colors
                                }
                            }
                        });
                    }
                });
            }

            /* Cache old values for reverse transitions */
            oldColor = trigger.dataset.text;
            oldBackground = trigger.dataset.background;
            oldPlainText = trigger.dataset.plaintext;
            oldLightBorder = trigger.dataset.lightBorder;
            oldDarkBorder = trigger.dataset.darkBorder;
            oldDropshadow = trigger.dataset.dropShadow;
            oldImgFilter = trigger.dataset.visualFilter;
        });
    }
}

/* Export init function */
export default {
    init
};