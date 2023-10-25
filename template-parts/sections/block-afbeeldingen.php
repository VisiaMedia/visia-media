<?php if($images = get_sub_field('afbeeldingen')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<aside class="block-images js-block-images" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <ul class="block-images__list">
            <?php foreach($images as $image) { ?>
                <li class="block-images__list__item js-item">
                    <img class="block-images__list__item__img" src="<?php echo $image['sizes']['half-width-use']; ?>" alt="<?php echo esc_attr($image['alt']); ?>" width="<?php echo $image['sizes']['half-width-use-width']; ?>" height="<?php echo $image['sizes']['half-width-use-height']; ?>" />
                </li>
            <?php } ?>
        </ul>
	</aside>
<?php } ?>