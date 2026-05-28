let logoSliderInstances = [];

/* Initialize */
export function init(Swiper, Autoplay) {
    const logoSliders = document.querySelectorAll('.js-logo-slider-swiper');

    if (!logoSliders.length) return;

    logoSliders.forEach(swiperElement => {
        const slides = swiperElement.querySelectorAll('.swiper-slide');

        if (slides.length < 2) return;

        const swiper = new Swiper(swiperElement, {
            modules: [Autoplay],
            slidesPerView: 'auto',
            spaceBetween: 0,
            loop: true,
            loopAdditionalSlides: slides.length,
            speed: 6000,
            allowTouchMove: false,
            autoplay: {
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: false
            }
        });

        logoSliderInstances.push(swiper);
    });
}

/* Unload */
export function unload() {
    logoSliderInstances.forEach(swiper => {
        if (swiper && !swiper.destroyed) {
            if (swiper.autoplay) {
                swiper.autoplay.stop();
            }

            swiper.destroy(true, true);
        }
    });

    logoSliderInstances = [];
}

/* Export init function */
export default {
    init,
    unload
};
