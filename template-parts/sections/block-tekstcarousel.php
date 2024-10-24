<?php if($textItems = get_sub_field('items')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<section class="textcarousel js-textcarousel" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<div class="css-max-text-width">
			<?php if($title = get_sub_field('titel')) {
				echo '<h1 class="textcarousel__title css-title--normal-size css-title js-textcarousel-vertical-text-reveal">'.$title.'</h1>';
			} ?>

			<div class="textcarousel__container js-textcarousel-container">
                <ul class="textcarousel__counter js-textcarousel-counter" aria-hidden="true">
                    <li class="textcarousel__counter__live">
                        <ul class="textcarousel__counter__live__list js-textcarousel-counter-list">
							<?php for($i = 1; $i <= count($textItems); $i++) { ?>
                                <li class="textcarousel__counter__live__list__item"><?php echo sprintf('%02d', $i); ?></li>
							<?php } ?>
                        </ul>
                    </li>

                    <li class="textcarousel__counter__total"><?php echo sprintf('%02d', count($textItems)); ?></li>
                </ul>

                <ul class="textcarousel__items">
                    <?php foreach($textItems as $textItem) { ?>
                        <li class="textcarousel__items__item js-textcarousel-item">
                            <span class="textcarousel__items__item__dash"><span></span></span>

                            <p class="textcarousel__items__item__text"><?php echo $textItem['tekst']; ?></p>
                        </li>
                    <?php } ?>
                </ul>
            </div>
		</div>
	</section>
<?php } ?>