<?php if(get_field('optie_paginalink_online_presentatie', 'option')) {
    global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>

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
                        <a class="js-popup-trigger" data-popup="presentation-download"><i class="fa-light fa-file-heart"></i> <?php _e('Download the presentation (PDF)', 'visia'); ?></a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
<?php } ?>