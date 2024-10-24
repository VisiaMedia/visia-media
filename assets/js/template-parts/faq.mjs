/* Initialize */
export function init(gsap, ScrollTrigger, callAfterResize, buildTlAfterResize, tlSetup, tlTextReveal, tlFadeIn){
    const faqs = document.querySelectorAll('.js-faqs');

    if(faqs) {
        faqs.forEach(faq => {
            let timeline = tlSetup(faq, faq.dataset.stCount);


            /* Build timeline */
            let buildTimeline = function() {
                /* Add animation for headline reveal */
                if(faq.querySelector('.js-title')) {
                    tlTextReveal(faq.querySelector('.js-title'), timeline);
                }


                /* Add animation for intro reveal */
                if(faq.querySelector('.js-intro')) {
                    tlFadeIn(faq.querySelector('.js-intro'), timeline);
                }


                /* Add animation for faqs reveal */
                if(faq.querySelector('.js-faq')) {
                    tlFadeIn(faq.querySelectorAll('.js-faq'), timeline);
                }
            }

            /* Execute once */
            buildTimeline();


            /* Clear and rebuild timeline on resize (only rebuild if not completed) */
            callAfterResize(function() {
                buildTlAfterResize(timeline, buildTimeline);
            });



            // Selecteer alle FAQ-items, antwoorden, en iconen in de FAQ-container
            const singleFaqs = faq.querySelectorAll('.js-faq'),
                answers = faq.querySelectorAll('.js-answer'),
                icons = faq.querySelectorAll('.js-icon-line');

            // Stel initieel de hoogte van alle antwoorden in op 0 en de rotatie van iconen op 90 graden
            gsap.set(answers, { height: 0 });
            gsap.set(icons, { rotate: 90 });

            // Voeg een click event listener toe aan elk FAQ item
            singleFaqs.forEach((singleFaq, index) => {
                singleFaq.addEventListener("click", function(e) {
                    // Controleer of de klik niet op een hyperlink binnen de FAQ was
                    if (e.target.tagName !== 'A') {
                        // Schakel de 'js-active' klasse in of uit voor het huidige FAQ item en controleer of het actief is
                        const isActive = singleFaq.classList.toggle('js-active');

                        // Loop door alle FAQ items
                        singleFaqs.forEach((item, i) => {
                            if (i !== index) {
                                // Verwijder de 'js-active' klasse van andere FAQ's
                                item.classList.remove('js-active');
                                // Animeer de hoogte van niet-gekozen antwoorden naar 0
                                gsap.to(answers[i], {
                                    height: 0,
                                    onComplete: () => {
                                        if (i === singleFaqs.length - 1) ScrollTrigger.refresh();
                                    }
                                });
                                // Stel de rotatie van iconen van niet-gekozen FAQ's in op 90 graden
                                gsap.to(icons[i], {
                                    rotate: 90,
                                    duration: 0.25
                                });
                            }
                        });

                        // Animeer de hoogte van het gekozen antwoord afhankelijk van de actieve staat
                        gsap.to(answers[index], {
                            height: isActive ? 'auto' : 0,
                            onComplete: () => ScrollTrigger.refresh()
                        });

                        // Animeer de rotatie van het icoon van het gekozen FAQ item afhankelijk van de actieve staat
                        gsap.to(icons[index], {
                            rotate: isActive ? 0 : 90,
                            duration: 0.25
                        });
                    }
                });
            });
        });
    }
}

/* Export init function */
export default {
    init
}