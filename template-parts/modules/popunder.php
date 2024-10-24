<?php if(get_field('popunder_activeren')) {
	$popunderImage = get_field('popunder_afbeelding');
	$popunderContent = get_field('popunder_inhoud');

	if($popunderContent) { ?>
		<aside class="<?php echo($popunderImage) ? 'popunder--image ' : ''; ?>popunder css-boxed-content js-popunder">
            <div role="document">
                <button class="popunder__close js-close" title="<?php esc_attr_e(__('Close window', 'visia')); ?>">
                    <span class="popunder__close__line--left popunder__close__line"></span>

                    <span class="popunder__close__line--right popunder__close__line"></span>
                </button>

                <?php if($popunderImage) {
                    echo '<div class="popunder__image" style="background-image:url('.wp_get_attachment_image_url($popunderImage, 'extra-medium-small-use').');"></div>';
                } ?>

                <div class="popunder__content">
                    <?php if($title = $popunderContent['titel']) {
                        echo '<h1 class="popunder__content__title">'.$title.'</h1>';
                    }

                    if($text = $popunderContent['tekst']) {
                        echo '<div class="popunder__content__text css-normal-text">'.$text.'</div>';
                    }

                    if($popunderContent['button_label'] && $popunderContent['button_doel']) {
                        global_button($popunderContent['button_label'], $popunderContent['button_doel'], 'internal', 'popunder__content__button-wrapper', 'js-boxed-content-button');
                    } ?>
                </div>
            </div>
		</aside>
	<?php }
} ?>