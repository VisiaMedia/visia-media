let panoramaSliderInstances = [];

export function init( gsap, Swiper, Autoplay, EffectPanorama, ScrollTrigger, callAfterResize ) {
    const sliders = document.querySelectorAll('.js-arch-project-slider');

    if (!sliders.length) return;

    sliders.forEach(slider => {
        const swiperElement = slider.querySelector('.js-arch-project-slider-swiper');
        const slides = swiperElement ? swiperElement.querySelectorAll('.swiper-slide') : [];
        const getSpaceBetween = () => parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;

        if (!swiperElement || slides.length < 2) return;

        const loopEnabled = slides.length > 4;

        const instance = {
            swiper: null,
            resizeHandler: null,
            rafId: null,
            videoPlayId: 0,
            unloaded: false
        };

        function getActiveSlide() {
            return swiperElement.querySelector('.swiper-slide-active');
        }

        function getActiveVideo() {
            const activeSlide = getActiveSlide();

            return activeSlide ? activeSlide.querySelector('video') : null;
        }

        function getTexts() {
            return Array.from(swiperElement.querySelectorAll('.js-text'));
        }

        function getActiveText() {
            const activeSlide = getActiveSlide();

            return activeSlide ? activeSlide.querySelector('.js-text') : null;
        }

        function pauseInactiveVideos() {
            const activeVideo = getActiveVideo();

            swiperElement.querySelectorAll('video').forEach(video => {
                if (video !== activeVideo) {
                    video.pause();
                }
            });
        }

        function playActiveVideo() {
            const swiper = instance.swiper;

            if (instance.unloaded || !swiper || swiper.destroyed) return;

            const video = getActiveVideo();

            pauseInactiveVideos();

            if (!video) return;

            const playId = ++instance.videoPlayId;

            if (video.readyState < 2) {
                video.load();
            }

            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        if (
                            playId !== instance.videoPlayId ||
                            instance.unloaded ||
                            swiper.destroyed ||
                            video !== getActiveVideo()
                        ) {
                            video.pause();
                        }
                    })
                    .catch(() => {});
            }
        }

        function hideInactiveTexts() {
            const activeText = getActiveText();

            getTexts().forEach(text => {
                if (text !== activeText) {
                    gsap.to(text, {
                        autoAlpha: 0,
                        duration: .2,
                        overwrite: true
                    });
                }
            });
        }

        function showActiveText(instant = false) {
            const activeText = getActiveText();

            hideInactiveTexts();

            if (!activeText) return;

            gsap.to(activeText, {
                autoAlpha: 1,
                duration: instant ? 0 : .3125,
                overwrite: true
            });
        }

        function syncActiveSlide(instantText = false) {
            const swiper = instance.swiper;

            if (instance.unloaded || !swiper || swiper.destroyed) return;

            playActiveVideo();
            showActiveText(instantText);
        }

        function queueActiveSlideSync(instantText = false) {
            if (instance.rafId) {
                cancelAnimationFrame(instance.rafId);
            }

            instance.rafId = requestAnimationFrame(() => {
                syncActiveSlide(instantText);
                instance.rafId = null;
            });
        }

        const swiper = new Swiper(swiperElement, {
            modules: [ Autoplay, EffectPanorama ],
            init: false,

            effect: 'panorama',
            slidesPerView: 1.25,
            loop: loopEnabled,
            loopAdditionalSlides: loopEnabled ? 1 : 0,
            rewind: true,
            centeredSlides: true,
            grabCursor: true,
            speed: 625,
            spaceBetween: getSpaceBetween(),
            watchOverflow: true,

            panoramaEffect: {
                rotate: 20,
                depth: 0
            },

            autoplay: {
                delay: 5000
            },

            breakpoints: {
                600: {
                    slidesPerView: 1.5
                },
                810: {
                    slidesPerView: 1.75
                },
                1200: {
                    slidesPerView: 2
                },
                1680: {
                    slidesPerView: 2.25
                },
                1920: {
                    slidesPerView: 2.5
                },
                2020: {
                    slidesPerView: 2.75
                },
                2250: {
                    slidesPerView: 3
                },
            },

            on: {
                init() {
                    gsap.set(getTexts(), {
                        autoAlpha: 0
                    });

                    queueActiveSlideSync(true);
                    ScrollTrigger.refresh();
                },

                slideChange() {
                    instance.videoPlayId++;
                    hideInactiveTexts();
                    queueActiveSlideSync();
                },

                realIndexChange() {
                    instance.videoPlayId++;
                    queueActiveSlideSync();
                },

                slideChangeTransitionStart() {
                    hideInactiveTexts();
                },

                slideChangeTransitionEnd() {
                    queueActiveSlideSync();
                    ScrollTrigger.refresh();
                },

                transitionEnd() {
                    queueActiveSlideSync();
                },

                resize() {
                    queueActiveSlideSync(true);
                }
            }
        });

        instance.swiper = swiper;

        swiper.init();

        queueActiveSlideSync(true);

        instance.resizeHandler = callAfterResize(() => {
            if (instance.unloaded || swiper.destroyed) return;

            swiper.params.spaceBetween = getSpaceBetween();
            swiper.update();
            queueActiveSlideSync(true);
            ScrollTrigger.refresh();
        });

        panoramaSliderInstances.push(instance);
    });
}

function releaseVideo(video) {
    video.pause();

    /**
     * Hard release video resources.
     * This frees network/decoder/buffer memory after swup page change.
     */
    video.removeAttribute('src');

    video.querySelectorAll('source').forEach(source => {
        source.removeAttribute('src');
    });

    video.load();
}

export function unload() {
    panoramaSliderInstances.forEach(instance => {
        instance.unloaded = true;
        instance.videoPlayId++;

        if (instance.rafId) {
            cancelAnimationFrame(instance.rafId);
            instance.rafId = null;
        }

        if (instance.resizeHandler) {
            window.removeEventListener('resize', instance.resizeHandler);

            if (screen.orientation) {
                screen.orientation.removeEventListener('change', instance.resizeHandler);
            }

            instance.resizeHandler = null;
        }

        const swiper = instance.swiper;

        if (swiper && !swiper.destroyed) {
            if (swiper.autoplay) {
                swiper.autoplay.stop();
            }

            swiper.slides.forEach(slide => {
                slide.querySelectorAll('video').forEach(releaseVideo);
            });

            swiper.destroy(true, true);
        }

        instance.swiper = null;
    });

    panoramaSliderInstances = [];
}

export default { init, unload };