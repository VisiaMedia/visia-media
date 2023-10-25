<?php if($teamMembers = get_field('teamleden', 'option')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<section class="team js-team" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<div class="css-max-text-width">
			<?php if($title = get_sub_field('titel')) {
				echo '<h1 class="team__title css-title--normal-size css-title js-team-vertical-text-reveal">'.$title.'</h1>';
			} ?>

			<ul class="team__list">
				<?php foreach($teamMembers as $teamMember) {
					if($teamMember['profielfoto'] && $teamMember['gegevens']) { ?>
						<li class="team__list__item js-team-member">
							<?php if($photo = $teamMember['profielfoto']) {
                                echo wp_get_attachment_image($photo, 'team-width-use', null, array('class' => 'team__list__item__photo'));
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
<?php } ?>