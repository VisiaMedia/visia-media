<?php get_header();

if(have_posts()) {
	global $scrollTriggerCount;
	global_color_change_trigger('white');

	while(have_posts()) { the_post(); ?>
        <div class="blog-single js-blog-single" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
            <header>
                <div class="css-max-text-width">
                    <div class="blog-single__hero">
	                    <?php if($headline = get_the_title(get_queried_object_id())) { ?>
                            <h1 class="blog-single__hero__headline css-title--normal-size css-title js-blog-single-header-headline"><?php echo $headline; ?></h1>
	                    <?php } ?>

                        <ul class="blog-single__hero__blog-meta js-blog-single-header-blog-meta">
		                    <?php if(get_the_time()) { ?>
                                <li class="blog-single__hero__blog-meta__item">
                                    <span class="blog-single__hero__blog-meta__item__label"><?php _e('Date', 'visia'); ?></span>

                                    <span class="blog-single__hero__blog-meta__item__value"><?php the_time(get_option('date_format')); ?></span>
                                </li>
		                    <?php }

		                    if(get_the_author_meta('first_name') && get_the_author_meta('last_name')) { ?>
                                <li class="blog-single__hero__blog-meta__item">
                                    <span class="blog-single__hero__blog-meta__item__label"><?php _e('Author', 'visia'); ?></span>

                                    <a href="<?php echo get_author_posts_url(get_the_author_meta('ID')); ?>" class="blog-single__hero__blog-meta__item__value"><?php echo get_the_author_meta('first_name').' '.get_the_author_meta('last_name'); ?></a>
                                </li>
		                    <?php }

		                    if($postCategories = get_the_category()) { ?>
                                <li class="blog-single__hero__blog-meta__item">
                                    <span class="blog-single__hero__blog-meta__item__label"><?php _e('Category', 'visia'); ?></span>

                                    <a class="blog-single__hero__blog-meta__item__value" href="<?php echo get_category_link($postCategories[0]); ?>"><?php echo $postCategories[0]->name; ?></a>
                                </li>
		                    <?php }

		                    if($readingTime = get_post_meta(get_the_ID(), '_yoast_wpseo_estimated-reading-time-minutes', true)) { ?>
                                <li class="blog-single__hero__blog-meta__item">
                                    <span class="blog-single__hero__blog-meta__item__label"><?php _e('Reading time', 'visia'); ?></span>

                                    <span class="blog-single__hero__blog-meta__item__value"><?php printf(__('%s minutes', 'visia' ), $readingTime); ?></span>
                                </li>
		                    <?php } ?>
                        </ul>
                    </div>
                </div>
            </header>

            <main>
                <section>
                    <div class="css-max-text-width">
                        <div class="blog-single__content css-normal-text js-blog-single-content">
                            <?php the_content();

                            if(get_the_tag_list()) {
                                echo get_the_tag_list('<ul class="blog-single__tag-list js-tag-list"><li class="blog-single__tag-list__item">','</li><li class="blog-single__tag-list__item">','</li></ul>');
                            }

                            if($externalItems = get_field('externe_items')) { ?>
                                <div class="blog-single__external-items js-external-items">
                                    <span class="blog-single__external-items__title"><?php _e('Other interesting articles:', 'visia'); ?></span>

                                    <ul class="blog-single__external-items__list">
                                        <?php foreach($externalItems as $externalItem) {
                                            if($externalItem['url'] && $externalItem['label']) {
                                                echo '<li class="blog-single__external-items__list__item"><a class="blog-single__external-items__list__item__link" href="'.esc_url($externalItem['url']).'" target="_blank">'.$externalItem['label'].'</a></li>';
                                            }
                                        } ?>
                                    </ul>
                                </div>
                            <?php } ?>
                        </div>
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
                            <h1 class="related-posts__title css-title--normal-size css-title js-related-posts-title"><?php _e('Related posts', 'visia'); ?></h1>

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
	            <?php } ?>
            </main>
        </div>
    <?php }
}

get_footer(); ?>