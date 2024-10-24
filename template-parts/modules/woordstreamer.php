<?php if($words = get_sub_field('woorden')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>

	<div class="woordstreamer js-woordstreamer" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<?php $allWords = ''; shuffle($words); foreach($words as $word) {
			if($word['woord']) {
				$allWords .= $word['woord'];
			}
		}

		/* Define row length */
		$rowLength = strlen($allWords) / 2;

		/* Generate output */
		echo '<div class="woordstreamer__inner js-woordstreamer-inner">';

		echo '<ul class="woordstreamer__row--top woordstreamer__row js-woordstreamer-row">';

		$charCounter = 0; $split = false; foreach($words as $word) {
			if($singleWord = $word['woord']) {
				$charCounter = $charCounter + strlen($singleWord);

				if($charCounter >= $rowLength && $split == false) {
					echo '</ul><ul class="woordstreamer__row--bottom woordstreamer__row js-woordstreamer-row js-woordstreamer-row-rtl">';

					$split = true;
				}

				echo '<li class="woordstreamer__row__word js-woordstreamer-row-word">'.$singleWord.'</li><li class="woordstreamer__row__word js-woordstreamer-row-word'.(($split) ? ' js-woordstreamer-row-word-rtl' : '').'">&mdash;</li>';
			}
		}

		echo '</ul>';

		echo '</div>'; ?>
	</div>
<?php } ?>