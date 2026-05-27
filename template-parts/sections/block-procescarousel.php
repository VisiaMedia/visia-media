<?php if($textItems = get_sub_field('items')) {
	global $scrollTriggerCount;

	$title = get_sub_field('titel');
	$sectionID = wp_unique_id('process-carousel-');
	$titleID = $sectionID.'-title';
	$processSchemaItems = array();
	$processVisibleItemCount = 0;

	foreach($textItems as $index => $textItem) {
		$processVisibleItemCount++;

		if(!empty($textItem['titel']) && !empty($textItem['tekst'])) {
			$processSchemaItems[] = array(
				'@type' => 'ListItem',
				'position' => $processVisibleItemCount,
				'name' => visia_schema_text($textItem['titel']),
				'description' => visia_schema_text($textItem['tekst'])
			);
		}
	}

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<section class="process-carousel js-process-carousel" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>"<?php echo $title ? ' aria-labelledby="'.esc_attr($titleID).'"' : ''; ?>>
		<div class="css-max-text-width js-section-reveal">
			<?php if($title) {
				echo '<h1 id="'.esc_attr($titleID).'" class="process-carousel__title css-title--normal-size css-title js-process-carousel-vertical-text-reveal">'.$title.'</h1>';
			} ?>

			<div class="process-carousel__container js-process-carousel-container">
                <aside class="process-carousel__labels js-process-carousel-labels" aria-hidden="true">
                    <ul class="process-carousel__labels__list js-process-carousel-labels-list">
		                <?php foreach($textItems as $textItem) { ?>
                            <li class="process-carousel__labels__list__item js-process-carousel-label"><?php echo $textItem['titel']; ?></li>
		                <?php } ?>
                    </ul>
                </aside>

				<ul class="process-carousel__items">
					<?php foreach($textItems as $textItem) { ?>
						<li class="process-carousel__items__item js-process-carousel-item">
							<span class="process-carousel__items__item__dash" aria-hidden="true"><span></span></span>

                            <div class="process-carousel__items__item__content">
                                <h2 class="process-carousel__items__item__content__title css-title"><?php echo $textItem['titel']; ?></h2>

                                <div class="process-carousel__items__item__content__text css-normal-text"><?php echo $textItem['tekst']; ?></div>
                            </div>
						</li>
					<?php } ?>
				</ul>
			</div>
		</div>
	</section>

	<?php if($processSchemaItems && count($processSchemaItems) === $processVisibleItemCount) {
		$processSchema = array(
			'@context' => 'https://schema.org',
			'@type' => 'ItemList',
			'@id' => get_permalink().'#'.$sectionID,
			'itemListOrder' => 'https://schema.org/ItemListOrderAscending',
			'numberOfItems' => count($processSchemaItems),
			'itemListElement' => $processSchemaItems
		);

		if($title) {
			$processSchema['name'] = visia_schema_text($title);
		}

		visia_schema_script($processSchema);
	}
} ?>
