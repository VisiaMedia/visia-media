<?php if($services = get_sub_field('diensten')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
    <div class="service-scroller js-service-scroller" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <?php foreach($services as $service) {
            if($service['titel'] || $service['content']) { ?>

                <section class="service-scroller__section js-service-scroller-section">
                    <div class="css-max-text-width">
                        <div class="service-scroller__section__inner js-service-scroller-inner">
                            <div class="service-scroller__section__content">
                                <?php if($title = $service['titel']) {
                                    echo '<h1 class="service-scroller__section__content__title css-title--normal-size css-title js-service-scroller-title">'.do_shortcode($title).'</h1>';
                                }

                                if($content = $service['content']) {
                                    echo '<div class="service-scroller__section__content__text css-normal-text js-service-scroller-text">'.$content.'</div>';
                                } ?>
                            </div>

                            <?php if($buttons = $service['knoppen']) {
                                echo '<ul class="service-scroller__section__buttons">';

                                foreach($buttons as $button) {
                                    if($button['label'] && $button['doel']) { ?>
                                        <li class="service-scroller__section__buttons__button-wrapper js-service-scroller-button-wrapper">
                                            <a class="css-global-button--left css-global-button js-global-button" href="<?php echo esc_url($button['doel']); ?>">
                                                <span class="css-global-button-icon-wrapper--left css-global-button-icon-wrapper js-global-button-icon">
                                                    <i class="css-global-button-icon fa-regular fa-arrow-up-right"></i>

                                                    <span class="css-global-button-fill js-global-button-fill"></span>
                                                </span>

                                                <span class="css-global-button-text"><?php echo $button['label']; ?></span>
                                            </a>
                                        </li>
                                    <?php }
                                }

                                echo '</ul>';
                            } ?>
                        </div>
                    </div>
                </section>
            <?php }
        } ?>

        <nav class="service-scroller__nav js-service-scroller-nav">
            <div class="service-scroller__nav__inner">
                <div class="service-scroller__nav__progress">
                    <span class="service-scroller__nav__progress__line--passive service-scroller__nav__progress__line"></span>
                    <span class="service-scroller__nav__progress__line--active service-scroller__nav__progress__line js-service-scroller-nav-tracker"></span>

                    <span class="service-scroller__nav__progress__bullet js-service-scroller-nav-bullet"></span>
                </div>

                <ul class="service-scroller__nav__list">
		            <?php foreach($services as $service) {
			            if($title = $service['titel']) { ?>
                            <li class="service-scroller__nav__list__item">
                                <a class="js-service-scroller-nav-list-item-link"><?php echo do_shortcode($title); ?></a>
                            </li>
                        <?php }
		            } ?>
                </ul>
            </div>
        </nav>
    </div>
<?php } ?>