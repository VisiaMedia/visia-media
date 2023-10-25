/* Initialize */
export function init(gsap, blobity, ScrollTrigger){
    if(document.querySelector('.js-global-color-change-trigger')) {
        ScrollTrigger.clearScrollMemory("manual");

        let oldColor,
            oldBackground,
            oldPlainText,
            oldLightBorder,
            oldDarkBorder,
            oldDropshadow,
            oldImgFilter;

        gsap.utils.toArray(".js-global-color-change-trigger").forEach(function (globalColorChangeTrigger, i) {
            let colorReverse = oldColor,
                backgroundReverse = oldBackground,
                plainTextReverse = oldPlainText,
                lightBorderReverse = oldLightBorder,
                darkBorderReverse = oldDarkBorder,
                dropShadowReverse = oldDropshadow,
                imgFilterReverse = oldImgFilter;

            /* Set initial values for first iteration */
            if(i === 0) {
                gsap.set("html", {
                    "--current-color": globalColorChangeTrigger.dataset.text,
                    "--current-background": globalColorChangeTrigger.dataset.background,
                    "--plain-text-color": globalColorChangeTrigger.dataset.plaintext,
                    "--light-border-color": globalColorChangeTrigger.dataset.lightBorder,
                    "--dark-border-color": globalColorChangeTrigger.dataset.darkBorder,
                    "--dropshadow-color": globalColorChangeTrigger.dataset.dropShadow,
                    "--visual-img-filter": globalColorChangeTrigger.dataset.visualFilter,
                    onComplete:() => {
                        blobity.updateOptions({
                            color: globalColorChangeTrigger.dataset.text
                        });

                        /* Bounce blobity */
                        blobity.bounce();
                    },
                });
            } else {
                ScrollTrigger.create({
                    trigger: globalColorChangeTrigger,
                    start: "top center",
                    invalidateOnRefresh: true,
                    refreshPriority: globalColorChangeTrigger.dataset.stCount,
                    markers:false,
                    preventOverlaps: "global-color-change-trigger",
                    onEnter:() => {
                        gsap.to("html", {
                            "--current-color": globalColorChangeTrigger.dataset.text,
                            "--current-background": globalColorChangeTrigger.dataset.background,
                            "--plain-text-color": globalColorChangeTrigger.dataset.plaintext,
                            "--light-border-color": globalColorChangeTrigger.dataset.lightBorder,
                            "--dark-border-color": globalColorChangeTrigger.dataset.darkBorder,
                            "--dropshadow-color": globalColorChangeTrigger.dataset.dropShadow,
                            "--visual-img-filter": globalColorChangeTrigger.dataset.visualFilter,
                            overwrite: true,
                            onComplete:() => {
                                blobity.updateOptions({
                                    color: globalColorChangeTrigger.dataset.text
                                });

                                /* Bounce blobity */
                                blobity.bounce();
                            }
                        });
                    },
                    onLeaveBack:() => {
                        gsap.to("html", {
                            "--current-color": colorReverse,
                            "--current-background": backgroundReverse,
                            "--plain-text-color": plainTextReverse,
                            "--light-border-color": lightBorderReverse,
                            "--dark-border-color": darkBorderReverse,
                            "--dropshadow-color": dropShadowReverse,
                            "--visual-img-filter": imgFilterReverse,
                            overwrite: true,
                            onComplete:() => {
                                blobity.updateOptions({
                                    color: colorReverse,
                                });

                                /* Bounce blobity */
                                blobity.bounce();
                            }
                        });
                    }
                });
            }

            oldColor = globalColorChangeTrigger.dataset.text;
            oldBackground = globalColorChangeTrigger.dataset.background;
            oldPlainText = globalColorChangeTrigger.dataset.plaintext;
            oldLightBorder = globalColorChangeTrigger.dataset.lightBorder;
            oldDarkBorder = globalColorChangeTrigger.dataset.darkBorder;
            oldDropshadow = globalColorChangeTrigger.dataset.dropShadow;
            oldImgFilter = globalColorChangeTrigger.dataset.visualFilter;
        });
    }
}

/* Export init and unload functions */
export default {
    init
};