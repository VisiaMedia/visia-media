<?php if($cases = get_posts(array(
	'post_type'	=> 'case',
	'posts_per_page' => 6,
	'orderby' => 'menu_order',
	'order' => 'ASC',
))) {
	global $scrollTriggerCount;
	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst'));

	$sectionID = wp_unique_id('project-grid-');
	$listID = $sectionID.'-list';
	$caseSchemaItems = array();

	foreach($cases as $casePost) {
		$caseItem = array(
			'@type' => 'CreativeWork',
			'name' => get_the_title($casePost),
			'url' => get_permalink($casePost)
		);

		if($caseStatement = get_field('case_statement', $casePost->ID)) {
			$caseItem['description'] = visia_schema_text($caseStatement);
		}

		if(has_post_thumbnail($casePost)) {
			$caseItem['image'] = get_the_post_thumbnail_url($casePost, 'project-grid-use-retina');
		}

		$caseSchemaItems[] = array(
			'@type' => 'ListItem',
			'position' => count($caseSchemaItems) + 1,
			'item' => $caseItem
		);
	}

	$infiniteScroll = false;
    $caseCount = wp_count_posts('case')->publish;
    if($caseCount > 6) {
        $infiniteScroll = true;
    } ?>

	<section class="project-grid js-project-grid" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>" aria-label="<?php esc_attr_e('Cases', 'visia'); ?>">
		<div class="css-max-text-width">
			<ul id="<?php echo esc_attr($listID); ?>" class="project-grid__list js-project-grid-list">
				<?php foreach($cases as $post) { setup_postdata($post); ?>
                    <li class="project-grid__list__item js-project-grid-item">
                        <a class="project-grid__list__item__link js-project-grid-item-link" href="<?php the_permalink(); ?>" rel="bookmark" data-no-blobity>
                            <div class="project-grid__list__item__visual">
                                <?php if(has_post_thumbnail()) {
                                    echo wp_get_attachment_image(get_post_thumbnail_id(), 'project-grid-use-retina', null, array('class' => 'project-grid__list__item__visual__image js-project-grid-item-visual'));
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
				<?php } wp_reset_postdata(); ?>

				<li class="js-grid-sizer"></li>
				<li class="js-gutter-sizer"></li>
			</ul>

            <div class="project-grid__button-wrapper js-project-grid-button-wrapper">
                <button class="project-grid__button-wrapper__button css-global-button js-global-button js-project-grid-button" aria-controls="<?php echo esc_attr($listID); ?>">
                    <span class="css-global-button-text"><?php _e('Show more cases', 'visia'); ?></span>

                    <span class="css-global-button-icon-wrapper js-global-button-icon">
                        <i class="css-global-button-icon fa-regular fa-arrow-down" aria-hidden="true"></i>

                        <span class="css-global-button-fill js-global-button-fill"></span>
                    </span>
                </button>
            </div>
		</div>
	</section>

	<?php if($caseSchemaItems) {
		visia_schema_script(array(
			'@context' => 'https://schema.org',
			'@type' => 'ItemList',
			'@id' => get_permalink().'#'.$sectionID,
			'numberOfItems' => count($caseSchemaItems),
			'itemListElement' => $caseSchemaItems
		));
	}
} ?>
