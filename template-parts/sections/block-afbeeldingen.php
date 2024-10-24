<?php if($images = get_sub_field('afbeeldingen')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<aside class="block-images js-block-images" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <?php if(get_sub_field('uitlijnen_content')) {
            echo '<div class="css-max-text-width">';
        } ?>

        <ul class="block-images__list">
            <?php foreach($images as $image) { ?>
                <li class="block-images__list__item js-item">
	                <?php echo wp_get_attachment_image($image['ID'], null, 'large', array('class' => 'block-images__list__item__img')); ?>
                </li>
            <?php } ?>
        </ul>

		<?php if(get_sub_field('uitlijnen_content')) {
			echo '</div>';
		} ?>
	</aside>
<?php } ?>