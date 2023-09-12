<?php get_header();

if(have_posts()) {
	echo '<main>';

	global $scrollTriggerCount;
	global_color_change_trigger('white'); ?>

		<section class="blog-home js-blog-home" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
			<div class="css-max-text-width">
				<ul class="blog-home__items js-blog-home-list">
					<?php while(have_posts()) { the_post(); ?>
						<li class="blog-home__items__item js-blog-home-item">
							<a class="blog-home__items__item__link js-blog-home-link" rel="bookmark" href="<?php the_permalink(); ?>" data-no-blobity="true">
                                <?php if(has_post_thumbnail()) {
                                    echo '<div class="blog-home__items__item__thumb js-blog-home-thumb">';

                                    the_post_thumbnail('blog-thumb-use', array('class' => 'blog-home__items__item__thumb__img js-blog-home-thumb-img'));

                                    echo '</div>';
                                } ?>

                                <?php if($postCategories = get_the_category()) {
                                    echo '<span class="blog-home__items__item__cat js-blog-home-cat">'.$postCategories[0]->name.', <time class="js-blog-home-from-now" datetime="'.get_the_time('Y-m-d H:i:s').'">'.get_the_time('Y-m-d H:i:s').'</time></span>';
                                } ?>

                                <h2 class="blog-home__items__item__title css-title js-blog-home-title"><?php the_title(); ?></h2>
							</a>
						</li>
					<?php } ?>
				</ul>

                <div class="blog-home__status js-blog-home-status">
                    <i class="blog-home__status__item infinite-scroll-request fa-duotone fa-spinner-third fa-spin" style="--fa-secondary-opacity: 0.25;"></i>
                </div>

                <div class="blog-home__nav js-blog-home-nav">
	                <?php previous_posts_link(__('Previous page', 'visia')); ?>

	                <?php next_posts_link(__('Next page', 'visia')); ?>
                </div>
			</div>
		</section

	<?php echo '</main>';
}

get_footer(); ?>