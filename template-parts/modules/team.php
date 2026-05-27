<?php if($teamMembers = get_field('teamleden', 'option')) {
	global $scrollTriggerCount;

	$title = get_sub_field('titel');
	$sectionID = wp_unique_id('team-');
	$titleID = $sectionID.'-title';
	$teamSchemaItems = array();
	$teamVisibleItemCount = 0;

	foreach($teamMembers as $teamMember) {
		if(!empty($teamMember['profielfoto']) && !empty($teamMember['gegevens'])) {
			$teamVisibleItemCount++;
		}

		if(!empty($teamMember['profielfoto']) && !empty($teamMember['gegevens']['naam']) && !empty($teamMember['gegevens']['functie'])) {
			$person = array(
				'@type' => 'Person',
				'name' => visia_schema_text($teamMember['gegevens']['naam']),
				'jobTitle' => visia_schema_text($teamMember['gegevens']['functie'])
			);

			if($imageURL = wp_get_attachment_image_url($teamMember['profielfoto'], 'team-use-retina')) {
				$person['image'] = $imageURL;
			}

			$teamSchemaItems[] = array(
				'@type' => 'ListItem',
				'position' => count($teamSchemaItems) + 1,
				'item' => $person
			);
		}
	}

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<section class="team js-team" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>"<?php echo $title ? ' aria-labelledby="'.esc_attr($titleID).'"' : ''; ?>>
		<div class="css-max-text-width js-section-reveal">
			<?php if($title) {
				echo '<h1 id="'.esc_attr($titleID).'" class="team__title css-title--normal-size css-title js-team-vertical-text-reveal">'.$title.'</h1>';
			} ?>

			<ul class="team__list">
				<?php foreach($teamMembers as $teamMember) {
					if($teamMember['profielfoto'] && $teamMember['gegevens']) { ?>
						<li class="team__list__item js-team-member">
							<?php if($photo = $teamMember['profielfoto']) {
                                echo wp_get_attachment_image($photo, 'team-use-retina', null, array('class' => 'team__list__item__photo'));
							}

							if($gegevens = $teamMember['gegevens']) {
								echo '<div class="team__list__item__persona">';

								if($naam = $gegevens['naam']) {
									echo '<span class="team__list__item__persona__name">'.$naam.'</span>';
								}
								if($functie = $gegevens['functie']) {
									echo '<span class="team__list__item__persona__functie">'.$functie.'</span>';
								}

								echo '</div>';
							} ?>
						</li>
					<?php }
				} ?>
			</ul>
		</div>
	</section>

	<?php if($teamSchemaItems && count($teamSchemaItems) === $teamVisibleItemCount) {
		$teamSchema = array(
			'@context' => 'https://schema.org',
			'@type' => 'ItemList',
			'@id' => get_permalink().'#'.$sectionID,
			'numberOfItems' => count($teamSchemaItems),
			'itemListElement' => $teamSchemaItems
		);

		if($title) {
			$teamSchema['name'] = visia_schema_text($title);
		}

		visia_schema_script($teamSchema);
	}
} ?>
