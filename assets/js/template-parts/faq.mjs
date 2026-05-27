/* Initialize */
export function init(gsap, ScrollTrigger) {
    const faqs = document.querySelectorAll('.js-faqs');

    if (faqs.length > 0) {
        faqs.forEach(faq => {
            const faqItems = faq.querySelectorAll('.js-faq');
            const answers = faq.querySelectorAll('.js-answer');
            const icons = faq.querySelectorAll('.js-icon-line');
            const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

            /* Setup FAQ collapse/expand functionality */
            gsap.set(answers, { height: 0 });
            gsap.set(icons, { rotate: 90 });

            const setFaqState = (singleFaq, isActive) => {
                const question = singleFaq.querySelector('.js-question');
                const answer = singleFaq.querySelector('.js-answer');

                if (question) question.setAttribute('aria-expanded', isActive ? 'true' : 'false');
                if (answer) {
                    answer.setAttribute('aria-hidden', isActive ? 'false' : 'true');

                    answer.querySelectorAll(focusableSelectors).forEach(focusableElement => {
                        if (isActive) {
                            if (focusableElement.dataset.originalTabindex) {
                                focusableElement.setAttribute('tabindex', focusableElement.dataset.originalTabindex);
                                delete focusableElement.dataset.originalTabindex;
                            } else {
                                focusableElement.removeAttribute('tabindex');
                            }
                        } else {
                            if (focusableElement.hasAttribute('tabindex')) {
                                focusableElement.dataset.originalTabindex = focusableElement.getAttribute('tabindex');
                            }
                            focusableElement.setAttribute('tabindex', '-1');
                        }
                    });
                }
            };

            faqItems.forEach((singleFaq, index) => {
                setFaqState(singleFaq, singleFaq.classList.contains('js-active'));

                singleFaq.addEventListener("click", (e) => {
                    if (!e.target.closest('a')) {
                        const isActive = singleFaq.classList.toggle('js-active');
                        setFaqState(singleFaq, isActive);

                        faqItems.forEach((item, i) => {
                            if (i !== index) {
                                item.classList.remove('js-active');
                                setFaqState(item, false);
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

                const question = singleFaq.querySelector('.js-question');

                if (question) {
                    question.addEventListener("keydown", (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            singleFaq.click();
                        }
                    });
                }
            });
        });
    }
}

/* Export init function */
export default {
    init
};
