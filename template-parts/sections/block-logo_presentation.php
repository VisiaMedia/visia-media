<?php if($images = get_sub_field('afbeeldingen')) {
    $imageCount = count($images);
    $imageCounter = 0;
	$title = get_sub_field('titel');
	$sectionID = wp_unique_id('logo-presentation-');
	$titleID = $sectionID.'-title';

	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>

		<section class="logo-presentation" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>"<?php echo $title ? ' aria-labelledby="'.esc_attr($titleID).'"' : ''; ?>>
			<div class="css-max-text-width js-section-reveal">
            <?php if($title) {
                echo '<h1 id="'.esc_attr($titleID).'" class="logo-presentation__title css-title--normal-size css-title">'.do_shortcode($title).'</h1>';
            }

            if($text = get_sub_field('omschrijving')) {
                echo '<div class="logo-presentation__description css-normal-text">'.$text.'</div>';
            } ?>

            <ul class="<?php echo (get_sub_field('kader')) ? 'logo-presentation__list--is-boxed ' : ''; echo (get_sub_field('tekens')) ? 'logo-presentation__list--has-signs ' : ''; ?>logo-presentation__list">
                <?php foreach($images as $image) { $imageCounter++; ?>
                    <li class="<?php echo ($image['onderschrift']) ? 'logo-presentation__list__item--has-caption ' : ''; echo (get_sub_field('tekens')) ? 'logo-presentation__list__item--has-signs ' : ''; echo (get_sub_field('kader')) ? 'logo-presentation__list__item--is-boxed css-boxed-content ' : ''; echo (get_sub_field('groot')) ? 'logo-presentation__list__item--is-large ' : '';?>logo-presentation__list__item">
                        <?php echo wp_get_attachment_image($image['afbeelding'], 'logo-presentation-use', null, array('class' => 'logo-presentation__list__item__img'));

                        if($caption = $image['onderschrift']) {
                            echo '<span class="'.((get_sub_field('kader')) ? 'logo-presentation__list__item__caption--is-boxed ' : '').'logo-presentation__list__item__caption">'.$caption.'</span>';
                        } ?>
                    </li>

                    <?php if(get_sub_field('tekens') && $imageCount != $imageCounter) { ?>
                        <li class="logo-presentation__list__item--sign logo-presentation__list__item" aria-hidden="true">
                            <span class="logo-presentation__list__item__sign"><?php echo ($imageCounter == ($imageCount - 1)) ? '=' : '+'; ?></span>
                        </li>
	                <?php }
                } ?>
            </ul>
		</div>
	</section>
<?php } ?>
