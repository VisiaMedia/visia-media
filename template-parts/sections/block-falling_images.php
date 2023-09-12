<?php if($images = get_sub_field('afbeeldingen')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<aside class="falling-images js-falling-images" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <ul class="falling-images__list js-falling-images-list">
            <?php foreach($images as $image) {
                $imageSource = wp_get_attachment_image_src($image, 'half-width-use'); ?>
                <li class="falling-images__list__item js-falling-images-item">
                    <div class="falling-images__list__item__wrapper">
                        <div class="falling-images__list__item__img" style="padding-bottom:<?php echo ($imageSource[2] / $imageSource[1]) * 100; ?>%;"><?php echo wp_get_attachment_image($image, 'half-width-use', null); ?></div>
                    </div>
                </li>
            <?php } ?>
        </ul>
	</aside>
<?php } ?>