<?php if($statistics = get_sub_field('statistieken')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	<aside class="statistics js-statistics" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<div class="css-max-text-width">
			<ul class="statistics__list">
				<?php foreach($statistics as $statistic) {
					if($statistic['waarde'] && $statistic['subtext']) { ?>
						<li class="statistics__list__item js-item">
							<span class="statistics__list__item__waarde">
								<span class="js-item-value"><?php echo $statistic['waarde']; ?></span><?php echo ($postfix = $statistic['postfix']) ? '<span class="statistics__list__item__waarde__postfix">'.$postfix.'</span>' : ''; ?>
							</span>

							<span class="statistics__list__item__subtext"><?php echo $statistic['subtext']; ?></span>
						</li>
					<?php }
				} ?>
			</ul>
		</div>
	</aside>
<?php } ?>