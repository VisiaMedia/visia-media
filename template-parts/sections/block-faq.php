<?php if($faqs = get_sub_field('faqs')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<section class="faqs js-faqs">
		<div class="css-max-text-width">
			<?php if($title = get_sub_field('titel')) {
				echo '<h1 class="faqs__title css-title--normal-size css-title js-title">'.do_shortcode($title).'</h1>';
			}

			if($intro = get_sub_field('omschrijving')) {
				echo '<div class="faqs__intro css-normal-text js-intro">'.$intro.'</div>';
			} ?>

			<ul class="faqs__list">
				<?php foreach($faqs as $faq) { ?>
					<li class="faqs__list__item js-faq">
						<?php if($question = $faq['vraag']) {
							echo '<div class="faqs__list__item__question js-question">'.$question.'<span class="faqs__list__item__question__icon-line"></span><span class="faqs__list__item__question__icon-line js-icon-line"></span></div>';
						}

						if($answer = $faq['antwoord']) {
							echo '<div class="faqs__list__item__answer js-answer"><div class="faqs__list__item__answer__inner css-normal-text">'.$answer.'</div></div>';
						} ?>
					</li>
				<?php } ?>
			</ul>
		</div>
	</section>
<?php } ?>