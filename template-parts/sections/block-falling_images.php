<?php if($images = get_sub_field('afbeeldingen')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<aside class="falling-images js-falling-images" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <ul class="falling-images__list js-falling-images-list">
            <?php foreach($images as $image) { ?>
                <li class="falling-images__list__item js-falling-images-item">
                    <div class="falling-images__list__item__wrapper">
                        <?php echo wp_get_attachment_image($image, 'large', null, array('class' => 'falling-images__list__item__img')); ?>
                    </div>
                </li>
            <?php } ?>
        </ul>
	</aside>
<?php } ?>