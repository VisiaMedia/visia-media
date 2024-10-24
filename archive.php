<?php get_header();

if(have_posts()) {
	global $scrollTriggerCount;
	global_color_change_trigger('white');

    if($wp_query->found_posts > get_option('posts_per_page')) {
        $infiniteScroll = true;
    } else {
        $infiniteScroll = false;
    } ?>

    <div class="blog-home--archive blog-home js-blog-home" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <?php if(is_archive() && get_the_archive_title()) {
	        $headline = get_the_archive_title(); ?>

            <header class="blog-home__archive-header">
                <div class="css-max-text-width">
			        <?php if (is_category()) {
				        $title = __('Category', 'visia');
			        } elseif (is_tag()) {
				        $title = __('Tag', 'visia');
			        } elseif (is_author()) {
				        $title = __('Author', 'visia');
			        }

			        if($title) {
				        echo '<h1 class="blog-home__archive-header__title css-title--small-size css-title js-blog-home-title">'.$title.'</h1>';
			        }

			        echo '<h1 class="blog-home__archive-header__headline css-title--normal-size css-title js-blog-home-headline">'.$headline.'</h1>';
			        ?>
                </div>
            </header>
        <?php } ?>

        <main>
            <section>
                <div class="css-max-text-width">
                    <ul class="blog-home__items js-blog-home-list <?php echo ($infiniteScroll) ? 'js-infinite-scroll-container' : ''; ?>">
				        <?php while(have_posts()) { the_post(); ?>
                            <li class="blog-home__items__item js-blog-home-item">
                                <a class="blog-home__items__item__link js-blog-home-link" rel="bookmark" href="<?php the_permalink(); ?>" data-no-blobity="true">
							        <?php if(has_post_thumbnail()) {
								        echo '<div class="blog-home__items__item__thumb">';

								        the_post_thumbnail('blog-thumb-use-retina', array('class' => 'blog-home__items__item__thumb__img js-blog-home-thumb-img'));

								        if($readingTime = get_post_meta(get_the_ID(), '_yoast_wpseo_estimated-reading-time-minutes', true)) {
									        echo '<span class="blog-home__items__item__thumb__reading-time">'.sprintf(__('Reading time: %s minutes', 'visia' ), $readingTime).'</span>';
								        }

								        echo '</div>';
							        } ?>

							        <?php if($postCategories = get_the_category()) {
								        echo '<span class="blog-home__items__item__cat">'.$postCategories[0]->name.', <time pubdate class="js-blog-home-from-now" datetime="'.get_the_time('Y-m-d H:i:s').'">'.get_the_time('Y-m-d H:i:s').'</time></span>';
							        } ?>

                                    <h2 class="blog-home__items__item__title css-title js-blog-home-title"><?php the_title(); ?></h2>
                                </a>
                            </li>
				        <?php } ?>
                    </ul>

                    <?php if($infiniteScroll) { ?>
                        <div class="blog-home__status js-blog-home-status">
                            <i class="blog-home__status__item infinite-scroll-request fa-duotone fa-spinner-third fa-spin" style="--fa-secondary-opacity: 0.25;"></i>
                        </div>

                        <div class="blog-home__nav js-blog-home-nav">
                            <?php previous_posts_link(__('Previous page', 'visia')); ?>

                            <?php next_posts_link(__('Next page', 'visia')); ?>
                        </div>
                    <?php } ?>
                </div>
            </section>
        </main>
    </div>
<?php }

get_footer(); ?>