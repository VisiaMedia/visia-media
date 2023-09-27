<?php get_header();

if(have_posts()) {
	echo '<main>';

	global $scrollTriggerCount;
	global_color_change_trigger('white');

	while(have_posts()) { the_post(); ?>
		<section class="blog-single js-blog-single" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
            <div class="css-max-text-width">
                <div class="blog-single__content css-normal-text js-blog-single-content"><?php the_content(); ?></div>
            </div>
		</section>

		<?php $cats = get_the_category(get_the_ID());
		$tags = get_the_tags(get_the_ID());

		$catArray = array();
		foreach($cats as $key1 => $cat) {
			$catArray[$key1] = $cat->slug;
		}

		$tagArray = array();
		foreach($tags as $key2 => $tag) {
			$tagArray[$key2] = $tag->slug;
		}

		$relatedPosts = new WP_Query(array(
			'posts_per_page' => 3,
			'orderby' => 'rand',
			'post__not_in' => array(get_the_ID()),
			'tax_query' => array(
				'relation' => 'OR',
				array(
					'taxonomy' => 'category',
					'field' => 'slug',
					'terms' => $catArray,
					'include_children' => false
				),
				array(
					'taxonomy' => 'post_tag',
					'field' => 'slug',
					'terms' => $tagArray,
				)
			)
		));

		if($relatedPosts->have_posts()) { ?>
            <aside class="related-posts js-related-posts" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
                <div class="css-max-text-width">
                    <ul class="related-posts__list">
		                <?php while ($relatedPosts->have_posts()) { $relatedPosts->the_post(); ?>
                            <li class="related-posts__list__item js-related-posts-item">
                                <a class="related-posts__list__item__link" rel="bookmark" href="<?php the_permalink(); ?>" data-no-blobity="true">
                                    <ul class="related-posts__list__item__metadata">
						                <?php foreach(get_the_category() as $cat) {
							                echo '<li>'.$cat->name.'</li>';
						                } ?>
                                    </ul>

                                    <ul class="related-posts__list__item__metadata--right related-posts__list__item__metadata">
                                        <li>
                                            <time class="js-related-posts-item-from-now" datetime="<?php the_time('Y-m-d H:i:s'); ?>"><?php the_time('Y-m-d H:i:s'); ?></time>
                                        </li>

						                <?php if($postReadingTime = get_post_meta($post->ID, '_yoast_wpseo_estimated-reading-time-minutes', true)) {
							                echo '<li><time datetime="'.$postReadingTime.'m">'.sprintf(__('%s minutes reading time', 'visia'), $postReadingTime).'</time></li>';
						                } ?>
                                    </ul>

                                    <h2 class="related-posts__list__item__title css-title js-related-posts-item-title"><?php the_title(); ?></h2>
                                </a>
                            </li>
		                <?php } wp_reset_query(); ?>
                    </ul>
                </div>
            </aside>
		<?php }

		if(get_the_tag_list()) {
			echo get_the_tag_list('<ul class="tag-list"><li class="tag-list__item">','</li><li class="tag-list__item">','</li></ul>');
		} ?>
	<?php }

	echo '</main>';
}

get_footer(); ?>