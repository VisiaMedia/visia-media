<?php if($gridItems = get_sub_field('grid_items')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
    <section class="textgrid js-textgrid" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <div class="css-max-text-width">
            <div class="textgrid__inner">
                <?php if($title = get_sub_field('titel')) {
                    echo '<h1 class="textgrid__title css-title--normal-size css-title js-textgrid-vertical-text-reveal">'.$title.'</h1>';
                } ?>

                <ul class="textgrid__grid">
                    <?php foreach($gridItems as $gridItem) { ?>
                        <li class="textgrid__grid__item js-textgrid-item">
                            <?php if($title = $gridItem['titel']) {
                                echo '<h2 class="textgrid__grid__item__title css-title">'.$title.'</h2>';
                            }

                            if($text = $gridItem['tekst']) {
                                echo '<div class="textgrid__grid__item__text css-normal-text">'.$text.'</div>';
                            }

                            if($gridItem['button_label'] && $gridItem['button_doel']) {
	                            global_button($gridItem['button_label'], $gridItem['button_doel'], 'internal', 'textgrid__grid__item__button-wrapper js-textgrid-grid-button');
                            } ?>
                        </li>
                    <?php } ?>
                </ul>
            </div>
        </div>
    </section>
<?php } ?>