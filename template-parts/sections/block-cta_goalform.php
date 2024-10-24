<?php if(get_field('optie_cta_doelenformulier_opties', 'option') && get_field('optie_cta_doelenformulier_formulierpagina', 'option')) {
	global $scrollTriggerCount;

	$options = get_field('optie_cta_doelenformulier_opties', 'option');
	$formPage = get_field('optie_cta_doelenformulier_formulierpagina', 'option');

	$popupID = wp_unique_id('goalform-');

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>

	<aside class="goalform js-goalform" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>"<?php echo ($sectionID = get_sub_field('formulier_ID')) ? ' id="'.$sectionID.'"' : ''; ?>>
		<div class="goalform__inner css-max-text-width js-inner">
			<?php if($title = get_sub_field('titel')) {
	            echo '<h1 class="goalform__title css-title--normal-size css-title js-title">'.$title.'</h1>';
	        }

	        if($content = get_sub_field('content')) {
	            echo '<div class="goalform__text css-normal-text js-text">'.$content.'</div>';
	        } ?>

			<ul class="goalform__options">
				<?php foreach(get_field('optie_cta_doelenformulier_opties', 'option') as $option) {
					echo '<li class="goalform__options__item"><button class="goalform__options__item__button js-option" data-option="'.esc_attr($option['optie']).'">'.$option['optie'].'</button></li>';
				} ?>
			</ul>

			<?php if($button = get_field('optie_cta_doelenformulier_knop', 'option')) { ?>
                <a class="goalform__button css-rounded-button js-rounded-button js-popup-trigger" data-popup="<?php echo $popupID; ?>">
                    <span class="css-rounded-button-outline js-rounded-button-outline"></span>
                    <span class="css-rounded-button-label"><?php echo $button; ?></span>
                </a>
			<?php }

			if($caption = get_field('optie_cta_doelenformulier_onderschrift', 'option')) {
				echo '<span class="goalform__caption js-caption">'.$caption.'</span>';
			} ?>
		</div>
	</aside>

    <div class="popup-container js-popup-container">
        <div class="popup-container__popup--full-screen popup-container__popup css-boxed-content js-popup" data-popup="<?php echo $popupID; ?>" aria-hidden="true" role="dialog">
            <div class="popup-container__popup__full-screen" role="document">
                <div class=""

                <div class="popup-container__popup__full-screen__buttons">
                    <button class="popup-container__popup__full-screen__buttons__close js-close" data-popup="<?php echo $popupID; ?>"><?php _e('Close', 'visia'); ?></button>
                </div>
            </div>
        </div>

        <div class="popup-container__overlay js-overlay" tabindex="-1"></div>
    </div>
<?php } ?>