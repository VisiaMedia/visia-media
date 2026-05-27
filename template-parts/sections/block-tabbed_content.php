<?php if($tabs = get_sub_field('tabs')) {
	global $scrollTriggerCount;

	$title = get_sub_field('titel');
	$sectionID = wp_unique_id('tabbed-content-');
	$titleID = $sectionID.'-title';

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>

	<section class="tabbed-content js-tabbed-content" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>"<?php echo $title ? ' aria-labelledby="'.esc_attr($titleID).'"' : ''; ?>>
		<div class="css-max-text-width js-section-reveal">
			<?php if($title) {
				echo '<h1 id="'.esc_attr($titleID).'" class="tabbed-content__title css-title--normal-size css-title js-tabbed-content-vertical-text-reveal">'.$title.'</h1>';
			} ?>

            <div class="tabbed-content__container js-tabbed-content-container">
                <nav class="tabbed-content__navigation js-tabbed-content-nav">
                    <ul class="tabbed-content__navigation__list" role="tablist"<?php echo $title ? ' aria-labelledby="'.esc_attr($titleID).'"' : ''; ?>>
                        <?php $tabCount = 0; foreach($tabs as $tab) {
							$tabID = $sectionID.'-tab-'.$tabCount;
							$panelID = $sectionID.'-panel-'.$tabCount; ?>
                            <li class="tabbed-content__navigation__list__item" role="presentation">
                                <button id="<?php echo esc_attr($tabID); ?>" class="css-global-button--left css-global-button<?php echo ($tabCount == 0) ? ' js-active' : ''; ?> js-tabbed-content-button js-project-grid-button" data-tab-num="<?php echo $tabCount; ?>" role="tab" aria-selected="<?php echo ($tabCount == 0) ? 'true' : 'false'; ?>" aria-controls="<?php echo esc_attr($panelID); ?>" tabindex="<?php echo ($tabCount == 0) ? '0' : '-1'; ?>">
                                    <span class="css-global-button-icon-wrapper--left css-global-button-icon-wrapper js-tabbed-content-button-icon">
                                        <i class="css-global-button-icon js-tabbed-content-button-icon fa-regular fa-arrow-right" aria-hidden="true"></i>

                                        <span class="css-global-button-fill js-tabbed-content-button-fill"></span>
                                    </span>

                                    <span class="css-global-button-text"><?php echo $tab['label'] ?></span>
                                </button>
                            </li>
                        <?php $tabCount++; } ?>
                    </ul>
                </nav>

                <ul class="tabbed-content__tabs js-tabbed-content-tabs">
                    <?php $tabCount = 0; foreach($tabs as $tab) {
						$tabID = $sectionID.'-tab-'.$tabCount;
						$panelID = $sectionID.'-panel-'.$tabCount; ?>
                        <li id="<?php echo esc_attr($panelID); ?>" class="tabbed-content__tabs__tab<?php echo ($tabCount == 0) ? ' js-active' : ''; ?> js-tabbed-content-tab" data-tab-num="<?php echo $tabCount; ?>" role="tabpanel" aria-labelledby="<?php echo esc_attr($tabID); ?>" aria-hidden="<?php echo ($tabCount == 0) ? 'false' : 'true'; ?>" tabindex="<?php echo ($tabCount == 0) ? '0' : '-1'; ?>">
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
