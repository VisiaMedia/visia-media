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

	<?php }

	echo '</main>';
}

get_footer();?>
