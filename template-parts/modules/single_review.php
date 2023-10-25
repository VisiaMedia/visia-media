<?php if(get_sub_field('review')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<aside class="single-review js-single-review" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<div class="css-max-text-width">
			<?php $post = get_sub_field('review'); setup_postdata($post);

			if(has_post_thumbnail() || get_field('naam') || get_field('bedrijfsnaam')) {
				echo '<div class="single-review__author">';

				if(has_post_thumbnail()) { ?>
					<div class="single-review__author__thumbnail js-single-review-thumbnail">
						<?php echo wp_get_attachment_image(get_post_thumbnail_id(), 'review-portrait-use', null, array('class' => 'single-review__author__thumbnail__img')); ?>
					</div>
				<?php }

				if(get_field('naam') || get_field('bedrijfsnaam')) { ?>
					<div class="single-review__author__details js-single-review-details">
						<?php if($name = get_field('naam')) {
							echo '<div class="single-review__author__details__name">'.$name.'</div>';
						}

						if($business = get_field('bedrijfsnaam')) {
							echo '<div class="single-review__author__details__business">'.$business.'</div>';
						} ?>
					</div>
				<?php }

				echo '</div>';
			}

			if($review = get_field('review')) { ?>
				<div class="single-review__text css-normal-text js-single-review-text"><?php echo $review; ?></div>
			<?php }

			wp_reset_postdata(); ?>
		</div>
	</aside>
<?php } ?>