<?php if($columns = get_sub_field('kolommen')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<div class="column-scroller js-column-scroller" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <div class="css-max-text-width">
            <div class="column-scroller__container js-column-scroller-container">
                <ul class="column-scroller__images-list js-column-scroller-images-list">
                    <?php foreach($columns as $column) {
                        if($images = $column['afbeelding_stack']) { ?>
                            <li class="column-scroller__images-list__item js-column-scroller-images-list-item">
                                <?php $i = 0; foreach($images as $image) { $i++;
                                    echo '<div class="'.(($i == 1) ? 'column-scroller__images-list__item__img--first ' : '').'column-scroller__images-list__item__img js-column-scroller-image"><img src="'.$image['sizes']['half-width-use'].'" alt="'.esc_attr($image['alt']).'" width="'.$image['sizes']['half-width-use-width'].'" height="'.$image['sizes']['half-width-use-height'].'" /></div>';
                                } ?>
                            </li>
                        <?php }
                    } ?>
                </ul>

                <div class="column-scroller__sections">
                    <?php foreach($columns as $column) { ?>
                        <section class="column-scroller__sections__section js-column-scroller-section">
                            <div class="column-scroller__sections__section__inner">
                                <?php if($images = $column['afbeelding_stack']) { ?>
                                    <div class="column-scroller__sections__section__images">
                                        <?php $i = 0; foreach($images as $image) { $i++;
                                            echo '<div class="'.(($i == 1) ? 'column-scroller__sections__section__images__img--first ' : '').'column-scroller__sections__section__images__img js-column-scroller-image"><img src="'.$image['sizes']['half-width-use'].'" alt="'.esc_attr($image['alt']).'" width="'.$image['sizes']['half-width-use-width'].'" height="'.$image['sizes']['half-width-use-height'].'" /></div>';
                                        } ?>
                                    </div>
                                <?php }

                                if($content = $column['content']) { ?>
                                    <div class="column-scroller__sections__section__content">
                                        <?php if($title = $content['titel']) {
                                            echo '<h1 class="column-scroller__sections__section__content__title css-title--normal-size css-title">'.do_shortcode($title).'</h1>';
                                        }

                                        if($text = $content['tekst']) {
                                            echo '<div class="column-scroller__sections__section__content__text css-normal-text">'.$text.'</div>';
                                        }

                                        if($usps = $content['usps']) {
                                            echo '<ul class="column-scroller__sections__section__content__usps">';

                                            foreach($usps as $usp) {
                                                echo '<li class="column-scroller__sections__section__content__usps__usp">'.$usp['usp'].'</li>';
                                            }

                                            echo '</ul>';
                                        } ?>
                                    </div>
                                <?php } ?>
                            </div>
                        </section>
                    <?php } ?>
                </div>
            </div>
        </div>
	</div>
<?php } ?>