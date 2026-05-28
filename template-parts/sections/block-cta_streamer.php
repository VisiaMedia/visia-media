<?php if($title = get_sub_field('titel')) {
	global $scrollTriggerCount;

	$sectionID = wp_unique_id('cta-streamer-');
	$titleID = $sectionID.'-title';

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
		<aside class="cta-streamer" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>" aria-labelledby="<?php echo esc_attr($titleID); ?>">
	        <div class="cta-streamer__inner js-section-reveal">
	            <div class="css-max-text-width">
	                <h1 id="<?php echo esc_attr($titleID); ?>" class="cta-streamer__title css-title"><?php echo do_shortcode($title); ?></h1>

		        <?php if(get_sub_field('knop_label') && get_sub_field('knop_doel')) {
			        global_button(get_sub_field('knop_label'), get_sub_field('knop_doel'), 'internal', 'cta-streamer__button-wrapper');
		        } ?>
            </div>
        </div>
	</aside>
<?php } ?>
