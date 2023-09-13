<?php global $scrollTriggerCount;

global_color_change_trigger('blue'); ?>

<header class="header--single-post header js-header" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
    <div class="header__content">
        <div class="css-max-text-width">
            <?php if($headline = get_the_title(get_queried_object_id())) { ?>
                <h1 class="header__content__headline--bold header__content__headline css-title--normal-size css-title js-header-vertical-text-reveal"><?php echo $headline; ?></h1>
            <?php } ?>
        </div>
    </div>

    <ul class="header__blog-meta js-header-blog-meta" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <?php if(get_the_time()) { ?>
            <li class="header__blog-meta__item js-header-blog-meta-item">
                <span class="header__blog-meta__item__label"><?php _e('Published on', 'visia'); ?></span>

                <span class="header__blog-meta__item__value"><?php the_time(get_option('date_format')); ?></span>
            </li>
        <?php }

        if(get_the_author_meta('first_name') && get_the_author_meta('last_name')) { ?>
            <li class="header__blog-meta__item js-header-blog-meta-item">
                <span class="header__blog-meta__item__label"><?php _e('Written by', 'visia'); ?></span>

                <a href="<?php echo get_author_posts_url(get_the_author_meta('ID')); ?>" class="header__blog-meta__item__value"><?php echo get_the_author_meta('first_name').' '.get_the_author_meta('last_name'); ?></a>
            </li>
        <?php }

        if($postCategories = get_the_category()) { ?>
            <li class="header__blog-meta__item js-header-blog-meta-item">
                <span class="header__blog-meta__item__label"><?php _e('Category', 'visia'); ?></span>

                <span class="header__blog-meta__item__value"><?php echo $postCategories[0]->name; ?></span>
            </li>
        <?php }

        if($readingTime = get_post_meta(get_the_ID(), '_yoast_wpseo_estimated-reading-time-minutes', true)) { ?>
            <li class="header__blog-meta__item js-header-blog-meta-item">
                <span class="header__blog-meta__item__label"><?php _e('Reading time', 'visia'); ?></span>

                <span class="header__blog-meta__item__value"><?php printf(__('%s minutes', 'visia' ), $readingTime); ?></span>
            </li>
        <?php } ?>
    </ul>
</header>