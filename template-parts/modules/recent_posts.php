<?php if($posts = get_posts(array(
	'post_type'	=> 'post',
	'posts_per_page' => 3,
	'orderby' => 'date',
	'order' => 'DESC'
))) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<section class="recent-posts js-recent-posts" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<div class="css-max-text-width">
			<?php if($title = get_sub_field('titel')) {
				echo '<h1 class="recent-posts__title css-title--normal-size css-title js-recent-posts-title">'.$title.'</h1>';
			} ?>

			<ul class="recent-posts__list">
				<?php foreach($posts as $post) { setup_postdata($post); ?>
					<li class="recent-posts__list__item js-recent-posts-item">
						<a class="recent-posts__list__item__link" rel="bookmark" href="<?php the_permalink(); ?>" data-no-blobity="true">
							<ul class="recent-posts__list__item__metadata">
								<?php foreach(get_the_category() as $cat) {
									echo '<li>'.$cat->name.'</li>';
								} ?>
							</ul>

							<ul class="recent-posts__list__item__metadata--right recent-posts__list__item__metadata">
								<li>
									<time class="js-recent-posts-item-from-now" datetime="<?php the_time('Y-m-d H:i:s'); ?>"><?php the_time('Y-m-d H:i:s'); ?></time>
								</li>

								<?php if($postReadingTime = get_post_meta($post->ID, '_yoast_wpseo_estimated-reading-time-minutes', true)) {
									echo '<li><time datetime="'.$postReadingTime.'m">'.sprintf(__('%s minutes reading time', 'visia'), $postReadingTime).'</time></li>';
								} ?>
							</ul>

							<h2 class="recent-posts__list__item__title css-title js-recent-posts-item-title"><?php the_title(); ?></h2>
						</a>
					</li>
				<?php } wp_reset_postdata(); ?>
			</ul>
		</div>
	</section>
<?php } ?>