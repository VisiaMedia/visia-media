<?php if($images = get_sub_field('afbeeldingen')) {
    $imageCount = count($images);

    if($imageCount == 2 || $imageCount == 4) {
        $sizerClass = 2;
    } else {
        $sizerClass = 3;
    }

	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>

	<aside class="perspective-gallery js-perspective-gallery" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<ul class="<?php echo (get_sub_field('perspectief') ? '' : 'perspective-gallery__list--flat '); ?>perspective-gallery__list--<?php echo $sizerClass; ?> perspective-gallery__list js-perspective-gallery-list">
            <li class="perspective-gallery__list__gutter js-perspective-gallery-gutter"></li>
            <li class="perspective-gallery__list__grid-sizer--<?php echo $sizerClass; ?> perspective-gallery__list__grid-sizer js-perspective-gallery-grid-sizer"></li>

			<?php foreach($images as $image) { ?>
				<li class="perspective-gallery__list__item--<?php echo $sizerClass; ?> perspective-gallery__list__item js-perspective-gallery-list-item">
					<?php if(get_sub_field('perspectief')) {
                        echo wp_get_attachment_image($image, 'large', null, array('class' => 'perspective-gallery__list__item__img skip-lazy'));
					} else {
						echo wp_get_attachment_image($image, 'large', null, array('class' => 'perspective-gallery__list__item__img--flat perspective-gallery__list__item__img skip-lazy'));
					} ?>
				</li>
			<?php } ?>
		</ul>
	</aside>
<?php } ?>