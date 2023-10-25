<?php

if(get_sub_field('query') == 'popular') {
    $orderby = 'menu_order';
} else {
	$orderby = 'rand';
}

if($cases = get_posts(array(
	'post_type'	=> 'case',
	'posts_per_page' => 6,
	'orderby' => $orderby,
	'order' => 'ASC',
    'post__not_in' => array(get_the_ID())
))) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst'));

	$caseCount = count($cases); ?>

	<section class="project-slider js-project-slider" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<div class="project-slider__scroller">
			<div class="project-slider__scroller__inner js-project-slider-inner css-max-text-width">
                <?php if($title = get_sub_field('titel')) {
                    echo '<h1 class="project-slider__scroller__title css-title--normal-size css-title js-project-slider-title">'.$title.'</h1>';
                } ?>

				<ul class="project-slider__scroller__list js-project-slider-list">
					<?php foreach($cases as $post) { setup_postdata($post); ?>
						<li class="project-slider__scroller__list__item js-project-slider-list-item">
							<a class="project-slider__scroller__list__item__link js-project-slider-list-item-link" href="<?php the_permalink(); ?>" rel="bookmark" data-no-blobity>
								<div class="project-slider__scroller__list__item__visual">
									<?php if(has_post_thumbnail()) {
                                        echo wp_get_attachment_image(get_post_thumbnail_id(), 'project-slider-use', null, array('class' => 'project-slider__scroller__list__item__visual__image js-project-slider-list-item-visual'));
									} ?>
								</div>

								<h2 class="project-slider__scroller__list__item__title css-title">
									<?php the_title();

									if($caseStatement = get_field('case_statement')) {
										echo ' &mdash; <span class="project-slider__scroller__list__item__title__statement">'.$caseStatement.'</span>';
									} ?>
								</h2>
							</a>
						</li>
					<?php } wp_reset_postdata(); ?>
				</ul>
			</div>
		</div>
	</section>
<?php } ?>
