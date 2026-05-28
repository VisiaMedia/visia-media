<?php if($statement = get_sub_field('statement')) {
	global $scrollTriggerCount;

	$title = get_sub_field('titel');
	$sectionID = wp_unique_id('statement-');
	$titleID = $sectionID.'-title';

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
		<div class="statement" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>"<?php echo $title ? ' aria-labelledby="'.esc_attr($titleID).'"' : ''; ?>>
		<div class="statement__content js-section-reveal">
			<div class="css-max-text-width">
                <?php if($title) {
                    echo '<span id="'.esc_attr($titleID).'" class="statement__content__title css-title--small-size css-title">'.$title.'</span>';
                } ?>

				<div class="statement__content__text css-title--normal-size css-title"><?php echo do_shortcode($statement); ?></div>

				<?php if(get_sub_field('button_label') && get_sub_field('button_doel')) {
					global_button(get_sub_field('button_label'), get_sub_field('button_doel'), 'internal', 'statement__content__button-wrapper');
				} ?>
			</div>
		</div>
	</div>
<?php } ?>
