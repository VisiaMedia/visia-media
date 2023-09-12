<?php if($cases = get_posts(array(
	'post_type'	=> 'case',
	'posts_per_page' => -1,
	'orderby' => 'menu_order',
	'order' => 'ASC'
))) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>

	<section class="project-grid js-project-grid" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<div class="css-max-text-width">
			<ul class="project-grid__list js-project-grid-list">
				<?php $totalCases = count($cases); $caseCount = 0; $extraCases = null; foreach($cases as $post) { setup_postdata($post); $caseCount++;

					if($caseCount <= 6) { ?>
						<li class="project-grid__list__item js-project-grid-item">
							<a class="project-grid__list__item__link js-project-grid-item-link" href="<?php the_permalink(); ?>" rel="bookmark" data-no-blobity>
								<div class="project-grid__list__item__visual">
									<?php if(has_post_thumbnail()) {
										echo '<div class="project-grid__list__item__visual__image js-project-grid-item-visual" style="background-image:url('.wp_get_attachment_image_url(get_post_thumbnail_id(), 'half-width-use').');"></div>';
									} ?>
								</div>

								<h2 class="project-grid__list__item__title css-title">
									<?php the_title();

									if($caseStatement = get_field('case_statement')) {
										echo ' &mdash; <span class="project-grid__list__item__title__statement">'.$caseStatement.'</span>';
									} ?>
								</h2>
							</a>
						</li>
					<?php } elseif($totalCases > 6) {
						$extraCases .= '<li data-case-permalink="'.get_permalink().'"'.((has_post_thumbnail()) ? ' data-case-thumbnail="'.wp_get_attachment_image_url(get_post_thumbnail_id(), 'half-width-use').'"' : '').' data-case-title="'.rawurlencode(get_the_title()).'"'.((get_field('case_statement')) ? ' data-case-statement="'.rawurlencode(get_field('case_statement')).'"' : '').'>kek</li>';
					} ?>
				<?php } wp_reset_postdata(); ?>

				<li class="js-grid-sizer"></li>
				<li class="js-gutter-sizer"></li>
			</ul>

			<?php if($totalCases > 6 && $extraCases) { ?>
				<ul class="project-grid__extra-cases js-project-grid-extra-cases"><?php echo $extraCases; ?></ul>

				<div class="project-grid__button-wrapper js-project-grid-button-wrapper">
					<button class="css-global-button js-global-button js-project-grid-button">
						<span class="css-global-button-text"><?php _e('Show more cases', 'visia'); ?></span>

						<span class="css-global-button-icon-wrapper js-global-button-icon">
                        <i class="css-global-button-icon fa-regular fa-arrow-down"></i>

                        <span class="css-global-button-fill js-global-button-fill"></span>
                    </span>
					</button>
				</div>
			<?php } ?>
		</div>
	</section>
<?php } ?>