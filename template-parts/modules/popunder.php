<?php if(get_field('popunder_activeren')) {
	$popunderImage = get_field('popunder_afbeelding');
	$popunderContent = get_field('popunder_inhoud');

	if($popunderContent) { ?>
		<?php $popunderID = wp_unique_id('popunder-');
		$popunderTitleID = $popunderID.'-title'; ?>

		<aside class="<?php echo($popunderImage) ? 'popunder--image ' : ''; ?>popunder css-boxed-content js-popunder" role="dialog" aria-modal="false" aria-hidden="true"<?php echo !empty($popunderContent['titel']) ? ' aria-labelledby="'.esc_attr($popunderTitleID).'"' : ''; ?>>
            <div role="document">
                <button class="popunder__close js-close" title="<?php esc_attr_e(__('Close window', 'visia')); ?>" aria-label="<?php esc_attr_e('Close window', 'visia'); ?>">
                    <span class="popunder__close__line--left popunder__close__line" aria-hidden="true"></span>

                    <span class="popunder__close__line--right popunder__close__line" aria-hidden="true"></span>
                </button>

                <?php if($popunderImage) {
                    echo '<div class="popunder__image" style="background-image:url('.wp_get_attachment_image_url($popunderImage, 'extra-medium-small-use').');"></div>';
                } ?>

                <div class="popunder__content">
                    <?php if($title = $popunderContent['titel']) {
                        echo '<h1 id="'.esc_attr($popunderTitleID).'" class="popunder__content__title">'.$title.'</h1>';
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
