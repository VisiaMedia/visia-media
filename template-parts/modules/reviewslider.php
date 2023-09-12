<?php if($reviews = get_posts(array(
	'post_type'	=> 'review',
	'posts_per_page' => 3,
	'orderby' => 'rand'
))) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
    <aside class="review-slider js-review-slider" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <div class="css-max-text-width">
            <div class="review-slider__inner">
                <ul class="review-slider__list js-review-slider-list">
					<?php $slideCounter = 0; foreach($reviews as $post) { setup_postdata($post); $slideCounter++; ?>
                        <li class="review-slider__list__item js-review-slider-list-item" data-slide-count="<?php echo $slideCounter; ?>">
							<?php if(has_post_thumbnail()) { ?>
                                <div class="review-slider__list__item__thumbnail js-review-slider-list-item-thumbnail">
									<?php echo wp_get_attachment_image(get_post_thumbnail_id(), 'review-portrait-use', null, array('class' => 'review-slider__list__item__thumbnail__img')); ?>
                                </div>
							<?php }

							if(get_field('naam') || get_field('bedrijfsnaam')) { ?>
                                <div class="review-slider__list__item__details js-review-slider-list-item-details">
									<?php if($name = get_field('naam')) {
										echo '<div class="review-slider__list__item__details__name">'.$name.'</div>';
									}

									if($business = get_field('bedrijfsnaam')) {
										echo '<div class="review-slider__list__item__details__business">'.$business.'</div>';
									} ?>
                                </div>
							<?php }

							if($review = get_field('review')) { ?>
                                <div class="review-slider__list__item__review css-normal-text js-review-slider-list-item-review"><?php echo $review; ?></div>
							<?php } ?>
                        </li>
					<?php } wp_reset_postdata();  ?>
                </ul>

                <ul class="review-slider__nav js-review-slider-nav">
                    <li class="review-slider__nav__item">
                        <button class="review-slider__nav__item__icon-wrapper js-review-slider-nav-item" data-direction="prev">
                            <i class="review-slider__nav__item__icon-wrapper__icon fa-regular fa-arrow-left js-review-slider-nav-item-icon"></i>
                            <span class="review-slider__nav__item__icon-wrapper__fill js-review-slider-nav-item-fill"></span>
                        </button>
                    </li>

                    <li class="review-slider__nav__item">
                        <button class="review-slider__nav__item__icon-wrapper js-review-slider-nav-item" data-direction="next">
                            <i class="review-slider__nav__item__icon-wrapper__icon fa-regular fa-arrow-right js-review-slider-nav-item-icon"></i>
                            <span class="review-slider__nav__item__icon-wrapper__fill js-review-slider-nav-item-fill"></span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
<?php } ?>