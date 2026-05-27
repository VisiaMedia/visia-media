<?php if($faqs = get_sub_field('faqs')) {
	global $scrollTriggerCount;

	$title = get_sub_field('titel');
	$intro = get_sub_field('omschrijving');
	$sectionID = wp_unique_id('faqs-');
	$titleID = $sectionID.'-title';
	$faqSchemaItems = array();

	foreach($faqs as $faq) {
		if(!empty($faq['vraag']) && !empty($faq['antwoord'])) {
			$question = visia_schema_text($faq['vraag']);
			$answer = visia_schema_text($faq['antwoord']);

			if($question && $answer) {
				$faqSchemaItems[] = array(
					'@type' => 'Question',
					'name' => $question,
					'acceptedAnswer' => array(
						'@type' => 'Answer',
						'text' => $answer
					)
				);
			}
		}
	}

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<section class="faqs js-faqs"<?php echo $title ? ' aria-labelledby="'.esc_attr($titleID).'"' : ''; ?>>
		<div class="css-max-text-width js-section-reveal">
			<?php if($title) {
				echo '<h1 id="'.esc_attr($titleID).'" class="faqs__title css-title--normal-size css-title js-title">'.do_shortcode($title).'</h1>';
			}

			if($intro) {
				echo '<div class="faqs__intro css-normal-text js-intro">'.$intro.'</div>';
			} ?>

			<ul class="faqs__list">
				<?php $faqCounter = 0; foreach($faqs as $faq) {
					$faqCounter++;
					$questionID = $sectionID.'-question-'.$faqCounter;
					$answerID = $sectionID.'-answer-'.$faqCounter;
					$hasAnswer = !empty($faq['antwoord']); ?>
					<li class="faqs__list__item js-faq">
						<?php if($question = $faq['vraag']) {
							echo '<div id="'.esc_attr($questionID).'" class="faqs__list__item__question js-question"'.($hasAnswer ? ' role="button" tabindex="0" aria-expanded="false" aria-controls="'.esc_attr($answerID).'"' : '').'>'.$question.'<span class="faqs__list__item__question__icon-line" aria-hidden="true"></span><span class="faqs__list__item__question__icon-line js-icon-line" aria-hidden="true"></span></div>';
						}

						if($answer = $faq['antwoord']) {
							echo '<div id="'.esc_attr($answerID).'" class="faqs__list__item__answer js-answer" role="region" aria-labelledby="'.esc_attr($questionID).'" aria-hidden="true"><div class="faqs__list__item__answer__inner css-normal-text">'.$answer.'</div></div>';
						} ?>
					</li>
				<?php } ?>
			</ul>
		</div>
	</section>

	<?php if($faqSchemaItems) {
		$faqSchema = array(
			'@context' => 'https://schema.org',
			'@type' => 'FAQPage',
			'@id' => get_permalink().'#'.$sectionID,
			'mainEntity' => $faqSchemaItems
		);

		if($title) {
			$faqSchema['name'] = visia_schema_text(do_shortcode($title));
		}

		visia_schema_script($faqSchema);
	}
} ?>
