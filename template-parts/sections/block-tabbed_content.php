<?php if($tabs = get_sub_field('tabs')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>

	<section class="tabbed-content js-tabbed-content" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<div class="css-max-text-width">
			<?php if($title = get_sub_field('titel')) {
				echo '<h1 class="tabbed-content__title css-title--normal-size css-title js-tabbed-content-vertical-text-reveal">'.$title.'</h1>';
			} ?>

            <div class="tabbed-content__container js-tabbed-content-container">
                <nav class="tabbed-content__navigation js-tabbed-content-nav">
                    <ul class="tabbed-content__navigation__list">
                        <?php $tabCount = 0; foreach($tabs as $tab) { ?>
                            <li class="tabbed-content__navigation__list__item">
                                <button class="css-global-button--left css-global-button<?php echo ($tabCount == 0) ? ' js-active' : ''; ?> js-tabbed-content-button js-project-grid-button" data-tab-num="<?php echo $tabCount; ?>">
                                    <span class="css-global-button-icon-wrapper--left css-global-button-icon-wrapper js-tabbed-content-button-icon">
                                        <i class="css-global-button-icon js-tabbed-content-button-icon fa-regular fa-arrow-right"></i>

                                        <span class="css-global-button-fill js-tabbed-content-button-fill"></span>
                                    </span>

                                    <span class="css-global-button-text"><?php echo $tab['label'] ?></span>
                                </button>
                            </li>
                        <?php $tabCount++; } ?>
                    </ul>
                </nav>

                <ul class="tabbed-content__tabs js-tabbed-content-tabs">
                    <?php $tabCount = 0; foreach($tabs as $tab) { ?>
                        <li class="tabbed-content__tabs__tab<?php echo ($tabCount == 0) ? ' js-active' : ''; ?> js-tabbed-content-tab" data-tab-num="<?php echo $tabCount; ?>">
                            <?php if($title = $tab['titel']) {
	                            echo '<span class="tabbed-content__tabs__tab__title css-title">'.do_shortcode($title).'</span>';
                            }

                            if($content = $tab['content']) {
                                echo '<div class="tabbed-content__tabs__tab__content css-normal-text">'.$content.'</div>';
                            } ?>
                        </li>
                    <?php $tabCount++; } ?>
                </ul>
            </div>
		</div>
	</section>
<?php } ?>