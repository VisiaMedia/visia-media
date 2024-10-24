<?php if($title = get_sub_field('titel')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<aside class="cta-streamer js-cta-streamer" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <div class="cta-streamer__inner js-cta-streamer-inner">
            <div class="css-max-text-width">
                <h1 class="cta-streamer__title css-title js-cta-streamer-title"><?php echo do_shortcode($title); ?></h1>

		        <?php if(get_sub_field('knop_label') && get_sub_field('knop_doel')) {
			        global_button(get_sub_field('knop_label'), get_sub_field('knop_doel'), 'internal', 'cta-streamer__button-wrapper js-cta-streamer-button-wrapper');
		        } ?>
            </div>
        </div>
	</aside>
<?php } ?>