<?php global $scrollTriggerCount;

global_color_change_trigger('white'); ?>

<header class="header--small header js-header" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
    <div class="header__content--small header__content">
        <div class="css-max-text-width">
            <span class="header__content__title css-title--small-size css-title js-header-title"><?php _e('Case', 'visia'); ?></span>

            <h1 class="header__content__headline css-title--normal-size css-title js-header-vertical-text-reveal"><?php echo get_the_title(get_queried_object_id()); ?></h1>

            <ul class="header__content__case-meta js-header-case-meta">
		        <?php if($client = get_field('case_klant')) { ?>
                    <li class="header__content__case-meta__item">
                        <span class="header__content__case-meta__item__label"><?php _e('Client', 'visia'); ?></span>

                        <span class="header__content__case-meta__item__value"><?php echo $client; ?></span>
                    </li>
		        <?php }

                if($deliverables = get_field('case_deliverables')) {
                    $deliverables = implode(', ', $deliverables); ?>
                    <li class="header__content__case-meta__item">
                        <span class="header__content__case-meta__item__label"><?php _e('Deliverables', 'visia'); ?></span>

                        <span class="header__content__case-meta__item__value"><?php echo $deliverables; ?></span>
                    </li>
                <?php }

		        if($year = get_field('case_jaar')) { ?>
                    <li class="header__content__case-meta__item">
                        <span class="header__content__case-meta__item__label"><?php _e('Year', 'visia'); ?></span>

                        <span class="header__content__case-meta__item__value"><?php echo $year; ?></span>
                    </li>
		        <?php } ?>
            </ul>
        </div>
    </div>
</header>