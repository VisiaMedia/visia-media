<?php if($content = get_sub_field('content')) {
	global $scrollTriggerCount;

	$title = get_sub_field('titel');
	$sectionID = wp_unique_id('textblock-');
	$titleID = $sectionID.'-title';

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
    <section class="textblock"<?php echo $title ? ' aria-labelledby="'.esc_attr($titleID).'"' : ''; ?>>
        <div class="css-max-text-width">
            <div class="<?php echo(($format = get_sub_field('format')) ? 'textblock__content--'.$format.' ' : ''); ?>textblock__content js-section-reveal">
                <?php if($title) {
                    echo '<h1 id="'.esc_attr($titleID).'" class="textblock__content__title css-title--normal-size css-title">'.do_shortcode($title).'</h1>';
                } ?>

                <div class="textblock__content__text css-normal-text"><?php echo $content; ?></div>
            </div>
        </div>
    </section>
<?php } ?>
