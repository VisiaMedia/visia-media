<?php if($content = get_sub_field('content')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
    <section class="textblock js-textblock">
        <div class="css-max-text-width">
            <div class="<?php echo(($format = get_sub_field('format')) ? 'textblock__content--'.$format.' ' : ''); ?>textblock__content">
                <?php if($title = get_sub_field('titel')) {
                    echo '<h1 class="textblock__content__title css-title--normal-size css-title js-textblock-title">'.do_shortcode($title).'</h1>';
                } ?>

                <div class="textblock__content__text css-normal-text js-textblock-text"><?php echo $content; ?></div>
            </div>
        </div>
    </section>
<?php } ?>