<?php if($gridItems = get_sub_field('grid_items')) {
	global $scrollTriggerCount;

	$title = get_sub_field('titel');
	$sectionID = wp_unique_id('textgrid-');
	$titleID = $sectionID.'-title';

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
    <section class="textgrid" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>"<?php echo $title ? ' aria-labelledby="'.esc_attr($titleID).'"' : ''; ?>>
        <div class="css-max-text-width">
            <div class="<?php echo(($format = get_sub_field('format')) ? 'textgrid__inner--'.$format.' ' : ''); ?>textgrid__inner js-section-reveal">
                <?php if($title) {
                    echo '<h1 id="'.esc_attr($titleID).'" class="'.(($format = get_sub_field('format')) ? 'textgrid__title--'.$format.' ' : '').'textgrid__title css-title--normal-size css-title">'.$title.'</h1>';
                } ?>

                <ul class="<?php echo(($format = get_sub_field('format')) ? 'textgrid__grid--'.$format.' ' : ''); ?>textgrid__grid">
                    <?php foreach($gridItems as $gridItem) { ?>
                        <li class="textgrid__grid__item">
                            <?php if($title = $gridItem['titel']) {
                                echo '<h2 class="textgrid__grid__item__title css-title">'.$title.'</h2>';
                            }

                            if($text = $gridItem['tekst']) {
                                echo '<div class="textgrid__grid__item__text css-normal-text">'.do_shortcode($text).'</div>';
                            }

                            if($gridItem['button_label'] && $gridItem['button_doel']) {
	                            global_button($gridItem['button_label'], $gridItem['button_doel'], 'internal', 'textgrid__grid__item__button-wrapper');
                            } ?>
                        </li>
                    <?php } ?>
                </ul>
            </div>

	        <?php if(get_sub_field('button_label') && get_sub_field('button_target')) {
			        global_button(get_sub_field('button_label'), get_sub_field('button_target'), 'internal', 'textgrid__button-wrapper');
	        } ?>
        </div>
    </section>
<?php } ?>
