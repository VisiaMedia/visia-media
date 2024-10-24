<?php if($textItems = get_sub_field('items')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<section class="process-carousel js-process-carousel" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<div class="css-max-text-width">
			<?php if($title = get_sub_field('titel')) {
				echo '<h1 class="process-carousel__title css-title--normal-size css-title js-process-carousel-vertical-text-reveal">'.$title.'</h1>';
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
							<span class="process-carousel__items__item__dash"><span></span></span>

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
<?php } ?>