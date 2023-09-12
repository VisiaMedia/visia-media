<?php if($logos = get_field('optie_logos', 'option')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<section class="logos js-logos" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<div class="css-max-text-width">
			<?php if($title = get_sub_field('titel')) {
				echo '<h1 class="logos__title css-title--normal-size css-title js-logos-vertical-text-reveal">'.$title.'</h1>';
			}

			echo '<ul class="logos__list js-logos-list">';

			foreach($logos as $item) {
				if($logo = $item['logo']) {
					echo '<li class="logos__list__item">'.wp_get_attachment_image($logo, 'logo-width-use', null, array('class' => 'logos__list__item__img')).'</li>';
				}
			}

			echo '</ul>';

			if(get_sub_field('button_label') && get_sub_field('button_doel')) {
				global_button(get_sub_field('button_label'), get_sub_field('button_doel'), 'internal', 'logos__button-wrapper js-logos-button-wrapper');
			} ?>
		</div>
	</section>
<?php } ?>