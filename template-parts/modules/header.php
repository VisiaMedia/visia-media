<?php if(get_field('header_titel', get_queried_object_id()) || get_field('header_headline', get_queried_object_id())) {
	$hasUSPS = false;

    if($headerUSPS = get_field('header_usps', get_queried_object_id())) {
        $hasUSPS = true;
    }

    global $scrollTriggerCount;

    global_color_change_trigger(
            get_field('header_achtergrond_kleurschema', get_queried_object_id()),
            get_field('header_achtergrond_achtergrond', get_queried_object_id()),
            get_field('header_achtergrond_tekst', get_queried_object_id()),
            get_field('header_achtergrond_gradient', get_queried_object_id())
    ); ?>

	<header class="header js-header" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <div class="<?php echo (is_front_page()) ? 'header__content--front-page' : ''; ?> header__content js-header-content js-section-reveal">
            <div class="css-max-text-width">
                <?php if($title = get_field('header_titel', get_queried_object_id())) { ?>
                    <span class="header__content__title css-title--small-size css-title"><?php echo $title; ?></span>
                <?php }

                if($headline = get_field('header_headline', get_queried_object_id())) { ?>
                    <h1 class="header__content__headline css-title--normal-size css-title"><?php echo do_shortcode($headline); ?></h1>
                <?php }

                if($intro = get_field('header_intro', get_queried_object_id())) { ?>
                    <div class="header__content__intro css-normal-text"><?php echo $intro; ?></div>
                <?php }

                if(get_field('header_button_label', get_queried_object_id()) && get_field('header_button_doel', get_queried_object_id())) {
                    global_button(get_field('header_button_label', get_queried_object_id()), get_field('header_button_doel', get_queried_object_id()), 'internal', 'header__content__headline__button-wrapper', '');
                } ?>

                <?php if($websiteAnalysis = get_field('header_website_analyse', get_queried_object_id())) { ?>
                    <div class="header__content__website-analysis">
                        <?php if($websiteAnalysisLabel = get_field('header_website_analyse_label',get_queried_object_id())) {
                            echo '<p class="header__content__website-analysis__label">'.$websiteAnalysisLabel.'</p>';
                        } ?>

                        <div class="header__content__website-analysis__input-wrapper">
                            <span>https://</span>
                            <input type="url" placeholder="www.jouw-website.nl" aria-label="<?php esc_attr_e('Website URL', 'visia'); ?>">
                            <button aria-label="<?php esc_attr_e('Start website analysis', 'visia'); ?>"><i class="css-global-button-icon fa-regular fa-arrow-right" aria-hidden="true"></i></button>
                        </div>
                    </div>
                <?php } ?>
            </div>

            <?php if($sliderProjects = get_field('header_projectenslider', get_queried_object_id())) { ?>
                <div class="arched-project-slider js-arch-project-slider">
                    <div class="swiper js-arch-project-slider-swiper">
                        <div class="swiper-wrapper">
                            <?php foreach($sliderProjects as $ID) {
                                $video = get_field('featured_video', $ID);
                                $statement = get_field('case_statement', $ID);
                                $deliverables = get_field('case_deliverables', $ID); ?>

                                <div class="arched-project-slider__slide swiper-slide">
                                    <div class="arched-project-slider__spacer"></div>

                                    <?php if($video) { ?>
                                        <video class="arched-project-slider__visual" <?php echo (has_post_thumbnail($ID)) ? 'poster="'.get_the_post_thumbnail_url($ID, 'project-grid-use').'" ' : ''; ?>muted playsinline loop preload="metadata" aria-label="">
                                            <source src="<?php echo $video['url']; ?>" type="<?php echo $video['mime_type']; ?>">
                                        </video>
                                    <?php } elseif(has_post_thumbnail($ID)) {
                                        echo get_the_post_thumbnail($ID, 'project-grid-use', array(
                                                'class' => 'arched-project-slider__visual',
                                                'loading' => 'eager',
                                                'decoding' => 'sync',
                                                'fetchpriority' => 'high'
                                        ));
                                    } ?>

                                    <span class="arched-project-slider__overlay"></span>

                                    <?php if($statement) {
                                        echo '<div class="arched-project-slider__content js-text">';

                                        if($deliverables) {
                                            echo '<ul class="arched-project-slider__content__tags">';

                                            foreach($deliverables as $deliverable) {
                                                echo '<li class="arched-project-slider__content__tags__tag">'.$deliverable.'</li>';
                                            }

                                            echo '</ul>';
                                        }

                                        echo '<h2 class="arched-project-slider__content__title css-title--small-size css-title">'.$statement.'</h2>';

                                        echo '</div>';
                                    } ?>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            <?php } ?>
        </div>

        <?php if($hasUSPS) { $scrollTriggerCount--;
            echo '<ul class="header__usps js-header-usps" data-st-count="'.$scrollTriggerCount.'">';

            foreach($headerUSPS as $headerUSP) {

                if($headerUSP['waarde'] && $headerUSP['subtext']) { ?>
                    <li class="header__usps__usp js-header-usps-usp">
                        <span class="header__usps__usp__waarde"><span class="js-header-usps-usp-value"><?php echo do_shortcode($headerUSP['waarde']); ?></span><?php echo ($postfix = $headerUSP['postfix']) ? '<span class="header__usps__usp__waarde__postfix">'.$postfix.'</span>' : ''; ?></span>

                        <span class="header__usps__usp__subtext"><?php echo $headerUSP['subtext']; ?></span>
                    </li>
                <?php }
            }

            echo '</ul>';
        } ?>
	</header>
<?php } ?>
