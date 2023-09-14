<?php if(get_sub_field('afbeeldingen') && get_sub_field('content')) {
	global $scrollTriggerCount;
	$type = get_sub_field('type');

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<section class="project-columns js-project-columns" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<div class="css-max-text-width">
			<div class="project-columns__inner">
				<?php if($images = get_sub_field('afbeeldingen')) {
					$count = count($images);

					echo '<ul class="project-columns__images js-project-columns-images js-project-columns-images-'.$type.'-'.$count.'">';

					foreach($images as $image) {
						echo '<li class="project-columns__images__image">'.get_device_image($image, $type, 'js-project-columns-images-image').'</li>';
					}

					echo '</ul>';
				}

				if($content = get_sub_field('content')) {
					echo '<div class="project-columns__content">';

					if($title = $content['titel']) {
						echo '<h2 class="project-columns__content__title css-title--normal-size css-title js-project-columns-title">'.do_shortcode($title).'</h2>';
					}
					if($text = $content['tekst']) {
						echo '<div class="project-columns__content__text css-normal-text js-project-columns-text">'.$text.'</div>';
					}
					if($usps = $content['usps']) {
						echo '<ul class="project-columns__content__usps js-project-columns-usps">';

						foreach($usps as $usp) {
							if($uspText = $usp['usp']) {
								echo '<li class="project-columns__content__usps__usp js-project-columns-usps-usp">'.$uspText.'</li>';
							}
						}

						echo '</ul>';
					}

					echo '</div>';
				} ?>
			</div>
		</div>
	</section>
<?php } ?>