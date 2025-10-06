/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn) {
    const faqs = document.querySelectorAll('.js-faqs');

    if (faqs.length > 0) {
        faqs.forEach(faq => {
            const title = faq.querySelector('.js-title');
            const intro = faq.querySelector('.js-intro');
            const faqItems = faq.querySelectorAll('.js-faq');
            const answers = faq.querySelectorAll('.js-answer');
            const icons = faq.querySelectorAll('.js-icon-line');

            let timeline = tlSetup(faq, faq.dataset.stCount);

            /* Build timeline */
            const buildTimeline = () => {
                if (title) tlTextReveal(title, timeline);
                if (intro) tlFadeIn(intro, timeline);
                if (faqItems.length > 0) tlFadeIn(faqItems, timeline);
            };

            buildTimeline();

            /* Clear and rebuild timeline on resize */
            callAfterResize(() => buildTlAfterResize(timeline, buildTimeline));

            /* Setup FAQ collapse/expand functionality */
            gsap.set(answers, { height: 0 });
            gsap.set(icons, { rotate: 90 });

            faqItems.forEach((singleFaq, index) => {
                singleFaq.addEventListener("click", (e) => {
                    if (e.target.tagName !== 'A') {
                        const isActive = singleFaq.classList.toggle('js-active');

                        faqItems.forEach((item, i) => {
                            if (i !== index) {
                                item.classList.remove('js-active');
                                gsap.to(answers[i], { height: 0, duration: 0.5 });
                                gsap.to(icons[i], { rotate: 90, duration: 0.25 });
                            }
                        });

                        gsap.to(answers[index], {
                            height: isActive ? 'auto' : 0,
                            immediateRender: false,
                            duration: 0.5,
                            onComplete: ScrollTrigger.refresh
                        });

                        gsap.to(icons[index], { rotate: isActive ? 0 : 90, duration: 0.25 });
                    }
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
};