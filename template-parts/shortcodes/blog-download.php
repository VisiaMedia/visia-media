<?php if($atts['id']) {
	global $post, $scrollTriggerCount;
	$post = get_post($atts['id']);

	setup_postdata($post);
	    $popupID = wp_unique_id('blog-download-'); ?>
        <aside class="blog-download css-boxed-content js-blog-download" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
            <?php if($image = get_field('afbeelding')) {
                echo '<div class="blog-download__image">'.wp_get_attachment_image($image, 'medium').'</div>';
            } ?>

            <div class="blog-download__content">
                <h3 class="blog-download__content__title css-title"><?php the_title(); ?></h3>

                <?php if($usps = get_field('usps')) {
                    echo '<ul class="blog-download__content__usps">';

                    foreach($usps as $usp) {
                        echo '<li class="blog-download__content__usps__usp">'.$usp['text'].'</li>';
                    }

                    echo '</ul>';
                }

                if(get_field('knop_label') || get_field('knop_onderschrift')) {
                    echo '<div class="blog-download__content__button-wrapper">';

                    if($buttonLabel = get_field('knop_label')) { ?>
                        <button class="blog-download__content__button-wrapper__button css-rounded-button js-rounded-button js-popup-trigger" data-popup="<?php echo $popupID; ?>">
                            <span class="css-rounded-button-outline js-rounded-button-outline"></span>

                            <span class="css-rounded-button-label"><?php echo $buttonLabel; ?></span>
                        </button>
                    <?php }

                    if($buttonSubtext = get_field('knop_onderschrift')) {
                        echo '<span class="blog-download__content__button-wrapper__subtext">'.$buttonSubtext.'</span>';
                    }

                    echo '</div>';
                } ?>
            </div>
        </aside>

        <div class="popup-container js-popup-container">
            <div class="popup-container__popup css-boxed-content js-popup" data-popup="<?php echo $popupID; ?>" aria-hidden="true" role="dialog">
                <div role="document">
                    <button class="popup-container__popup__close js-close" title="<?php esc_attr_e(__('Close popup', 'visia')); ?>">
                        <span class="popup-container__popup__close__line--left popup-container__popup__close__line"></span>

                        <span class="popup-container__popup__close__line--right popup-container__popup__close__line"></span>
                    </button>

			        <?php if($popupTitle = get_the_title()) {
				        echo '<h1 class="popup-container__popup__title css-title--small-size css-title">'.$popupTitle.'</h1>';
			        }

                    echo '<div class="popup-container__popup__content css-normal-text">'.__('Leave your details and we will send you the download.', 'visia').'</div>';

			        if($thankyouPage = get_field('bedanktpagina_formulier')) {
				        $thankyouPage = substr(get_permalink($thankyouPage), strlen(home_url()));

				        get_template_part('template-parts/forms/simple', null, array(
					        'wrapper_class' => 'popups__popup__form',
					        'form_name' => 'blog-download-'.$post->post_name,
					        'thankyou_page' => $thankyouPage,
					        'button' => get_field('knop_label')
				        ));
			        } ?>
                </div>
            </div>

            <div class="popup-container__overlay js-overlay" tabindex="-1"></div>
        </div>
    <?php wp_reset_postdata();
} ?>
