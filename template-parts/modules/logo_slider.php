<?php if($logos = get_field('optie_logos', 'option')) {
	global $scrollTriggerCount;

	$logos = array_values(array_filter($logos, function($item) {
		return !empty($item['logo']);
	}));

	if(!$logos) return;

	shuffle($logos);

	$split = ceil(count($logos) / 2);
	$logoRows = array(
		array_slice($logos, 0, $split),
		array_slice($logos, $split),
	);

	if(!$logoRows[1]) {
		$logoRows[1] = $logoRows[0];
	}

	$fillLogoRow = function($row) {
		$filledRow = $row;

		while(count($filledRow) < 32) {
			$filledRow = array_merge($filledRow, $row);
		}

		return $filledRow;
	};

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<section class="logo-slider js-logo-slider" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>" aria-label="<?php esc_attr_e('Logo slider', 'visia'); ?>">
		<div class="logo-slider__sliders">
			<?php foreach($logoRows as $rowIndex => $logoRow) { ?>
				<div class="logo-slider__slider swiper js-logo-slider-swiper"<?php echo $rowIndex ? ' dir="rtl"' : ''; ?>>
					<ul class="logo-slider__list swiper-wrapper js-logo-slider-list">
						<?php foreach($fillLogoRow($logoRow) as $item) {
							echo '<li class="logo-slider__list__item swiper-slide">'.wp_get_attachment_image($item['logo'], 'full', null, array('class' => 'logo-slider__list__item__img')).'</li>';
						} ?>
					</ul>
				</div>
			<?php } ?>
		</div>
	</section>
<?php } ?>
