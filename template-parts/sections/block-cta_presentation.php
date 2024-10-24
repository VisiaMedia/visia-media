<?php if(get_field('optie_paginalink_online_presentatie', 'option')) {
    global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst'));

    $popupID = wp_unique_id('pricelist-download-'); ?>

    <section class="cta-presentation js-cta-presentation" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <div class="css-max-text-width">
            <?php if($title = get_sub_field('titel')) {
                echo '<h1 class="cta-presentation__title css-title js-cta-presentation-title">'.$title.'</h1>';
            }

            if($contactPageID = get_field('optie_paginalink_contact', 'option')) {
                global_button(__('Schedule a no-obligation conversation', 'visia'), get_permalink($contactPageID), 'internal', 'cta-presentation__button-wrapper js-cta-presentation-button-wrapper', 'js-cta-presentation-button');
            } ?>

            <div class="cta-presentation__links js-cta-presentation-links">
                <h2 class="cta-presentation__links__title css-title"><?php _e('All information summarized', 'visia'); ?></h2>

                <ul class="cta-presentation__links__list">
                    <?php if($onlinePresentationID = get_field('optie_paginalink_online_presentatie', 'option')) { ?>
                        <li>
                            <a href="<?php the_permalink($onlinePresentationID); ?>"><i class="fa-light fa-presentation-screen"></i> <?php _e('Online presentation', 'visia'); ?></a>
                        </li>
                    <?php } ?>

                    <li>
                        <a class="js-popup-trigger" data-popup="<?php echo $popupID; ?>"><i class="fa-light fa-file-heart"></i> <?php _e('Download the pricelist (PDF)', 'visia'); ?></a>
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <div class="popup-container js-popup-container">
        <div class="popup-container__popup css-boxed-content js-popup" data-popup="<?php echo $popupID; ?>" aria-hidden="true" role="dialog">
            <div role="document">
                <button class="popup-container__popup__close js-close" title="<?php esc_attr_e(__('Close popup', 'visia')); ?>">
                    <span class="popup-container__popup__close__line--left popup-container__popup__close__line"></span>

                    <span class="popup-container__popup__close__line--right popup-container__popup__close__line"></span>
                </button>

			    <?php if($popupTitle = get_field('optie_cta_prijslijst_popup_titel', 'option')) {
				    echo '<h1 class="popup-container__popup__title css-title--small-size css-title">'.$popupTitle.'</h1>';
			    }

			    if($popupText = get_field('optie_cta_prijslijst_popup_tekst', 'option')) {
				    echo '<div class="popup-container__popup__content css-normal-text">'.$popupText.'</div>';
			    }

			    if($thankyouPage = get_field('optie_cta_prijslijst_popup_bedanktpagina_formulier', 'option')) {
				    $thankyouPage = substr(get_permalink($thankyouPage), strlen(home_url()));

				    get_template_part('template-parts/forms/simple', null, array(
					    'wrapper_class' => 'popups__popup__form',
					    'form_name' => 'pricelist-download',
					    'thankyou_page' => $thankyouPage,
					    'button' => __('Request pricelist', 'visia')
				    ));
			    } ?>
            </div>
        </div>

        <div class="popup-container__overlay js-overlay" tabindex="-1"></div>
    </div>
<?php } ?>