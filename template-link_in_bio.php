<?php /*
Template Name: Link in bio
*/
get_header();

if($links = get_field('social_links')) {
	global $scrollTriggerCount;

	global_color_change_trigger('blue'); ?>
	<main>
		<div class="social-links js-link-in-bio" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
			<div class="css-max-text-width">
				<ul class="social-links__list">
					<?php foreach($links as $link) {
						echo '<li class="social-links__list__item js-item"><a class="social-links__list__item__link" href="'.esc_url($link['doel']).'"'.(($link['nieuw_tabblad']) ? ' target="_blank"' : '').'>'.$link['label'].'</a></li>';
					} ?>
				</ul>
			</div>
		</div>
	</main>
<?php }

get_footer(); ?>