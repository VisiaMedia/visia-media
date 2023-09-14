<?php if($background = get_sub_field('afbeelding')) {

	global $scrollTriggerCount; ?>
    <aside class="parallax-image js-parallax-image" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <div class="<?php echo ($size = get_sub_field('grootte')) ? 'parallax-image__background--'.$size.' ' : ''; ?>parallax-image__background" style="background-image:url(<?php echo wp_get_attachment_image_url($background, 'full-width-use', null); ?>);"></div>
    </aside>
<?php } ?>