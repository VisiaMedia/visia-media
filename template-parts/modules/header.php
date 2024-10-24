<?php if(get_field('header_titel', get_queried_object_id()) || get_field('header_headline', get_queried_object_id())) {
	$hasUSPS = false;

    if($headerUSPS = get_field('header_usps', get_queried_object_id())) {
        $hasUSPS = true;
    }

    global $scrollTriggerCount;

	global_color_change_trigger(get_field('header_achtergrond_kleurschema', get_queried_object_id()), get_field('header_achtergrond_achtergrond', get_queried_object_id()), get_field('header_achtergrond_tekst', get_queried_object_id())); ?>

	<header class="header<?php echo ($hasUSPS) ? ' header--full-height' : ''; echo (is_front_page()) ? ' header--front-page' : ''; ?> js-header" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <div class="header__content">
            <div class="css-max-text-width">
                <?php if($title = get_field('header_titel', get_queried_object_id())) { ?>
                    <span class="header__content__title css-title--small-size css-title js-header-title"><?php echo $title; ?></span>
                <?php }

                if($headline = get_field('header_headline', get_queried_object_id())) { ?>
                    <h1 class="header__content__headline css-title--normal-size css-title js-header-vertical-text-reveal"><?php echo do_shortcode($headline); ?></h1>
                <?php }

                if(get_field('header_button_label', get_queried_object_id()) && get_field('header_button_doel', get_queried_object_id())) {
                    global_button(get_field('header_button_label', get_queried_object_id()), get_field('header_button_doel', get_queried_object_id()), 'internal', 'header__content__headline__button-wrapper js-header-button-wrapper', 'js-header-button');
                } ?>
            </div>
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