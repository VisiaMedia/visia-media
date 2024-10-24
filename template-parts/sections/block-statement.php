<?php if($statement = get_sub_field('statement')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<div class="statement js-statement" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<div class="statement__content">
			<div class="css-max-text-width">
                <?php if($title = get_sub_field('titel')) {
                    echo '<span class="statement__content__title css-title--small-size css-title js-statement-title">'.$title.'</span>';
                } ?>

				<div class="statement__content__text css-title--normal-size css-title js-statement-vertical-text-reveal"><?php echo do_shortcode($statement); ?></div>

				<?php if(get_sub_field('button_label') && get_sub_field('button_doel')) {
					global_button(get_sub_field('button_label'), get_sub_field('button_doel'), 'internal', 'statement__content__button-wrapper js-statement-button-wrapper');
				} ?>
			</div>
		</div>
	</div>
<?php } ?>