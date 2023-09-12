<!doctype html>
<html <?php language_attributes(); ?>>
<head>

	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-title" content="<?php esc_attr_e(get_bloginfo('name')); ?>">
    <meta name="application-name" content="<?php esc_attr_e(get_bloginfo('name')); ?>">
    <meta name="msapplication-TileColor" content="#ea2c76">
    <meta name="msapplication-TileImage" content="<?php bloginfo('template_directory');?>/assets/favicon/mstile-144x144.png">
    <meta name="msapplication-config" content="<?php bloginfo('template_directory');?>/assets/favicon/browserconfig.xml">
    <meta name="theme-color" content="#1b2843">

    <?php wp_head(); ?>

    <link rel="icon" type="image/svg+xml" href="<?php bloginfo('template_directory');?>/assets/favicon/favicon.svg">
    <link rel="icon" type="image/png" href="<?php bloginfo('template_directory');?>/assets/favicon/favicon.png">
    <link rel="shortcut icon" href="<?php bloginfo('template_directory');?>/assets/favicon/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php bloginfo('template_directory');?>/assets/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php bloginfo('template_directory');?>/assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="194x194" href="<?php bloginfo('template_directory');?>/assets/favicon/favicon-194x194.png">
    <link rel="icon" type="image/png" sizes="192x192" href="<?php bloginfo('template_directory');?>/assets/favicon/android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php bloginfo('template_directory');?>/assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="<?php bloginfo('template_directory');?>/assets/favicon/site.webmanifest">
    <link rel="mask-icon" href="<?php bloginfo('template_directory');?>/assets/favicon/safari-pinned-tab.svg" color="#ea2c76">
    <link rel="preconnect" href="https://use.typekit.net" crossorigin>
    <link rel="preconnect" href="https://p.typekit.net" crossorigin>
    <link rel="preload" href="https://use.typekit.net/gfx2twb.css" as="style"/>
    <link rel="stylesheet" href="https://use.typekit.net/gfx2twb.css" media="print" onload="this.media='all'"/>
</head>

<body <?php body_class(); ?>>

<div class="js-main-body-container css-main-body-container" aria-hidden="false">

<nav class="top-bar js-top-bar">
    <a class="top-bar__logo js-top-bar-logo" href="<?php echo get_home_url(); ?>">
        <img class="top-bar__logo__img" src="<?php bloginfo('template_directory');?>/assets/img/Visia-Media-logo-pink-white-outline.svg" width="275" height="156" alt="<?php esc_attr_e(get_bloginfo('name')); ?>">
    </a>

    <button class="top-bar__menu-button js-main-menu-button" title="<?php esc_attr_e(__('Open main menu', 'visia')); ?>" aria-label="<?php esc_attr_e(__('Open main menu', 'visia')); ?>">
        <span class="top-bar__menu-button__line js-main-menu-button-line-top"></span>
        <span class="top-bar__menu-button__line js-main-menu-button-line-middle"></span>
        <span class="top-bar__menu-button__line--small top-bar__menu-button__line js-main-menu-button-line-bottom"></span>

        <span class="top-bar__menu-button__fill "></span>
        <span class="top-bar__menu-button__quake js-main-menu-button-quake"></span>
    </button>
</nav>

<div class="main-menu-bg-reveal js-main-menu-bg-reveal"></div>
<div class="main-menu-bg-reveal-filler js-main-menu-bg-reveal-filler"></div>

<nav class="main-menu js-main-menu js-is-inactive" aria-label="<?php esc_attr_e(__('Main menu', 'visia')); ?>">
    <div class="main-menu__inner js-main-menu-inner">
        <div class="css-max-text-width">
            <div class="main-menu__container">
                <?php wp_nav_menu(array(
                    'menu_class' => 'main-menu__container__menu js-main-menu-list',
                    'container' => null,
                    'theme_location' => 'main',
                    'item_spacing' => 'discard',
                    'walker' => new visia_main_menu_walker()
                ));

                /* Menu side container */
                $contactLocationName = get_field('optie_contact_locatienaam', 'option');
                $contactLocationName2 = get_field('optie_contact_locatienaam_2', 'option');
                $contactAddress1 = get_field('optie_contact_adresregel_1', 'option');
                $contactAddress2 = get_field('optie_contact_adresregel_2', 'option');

                $contactPhonePretty = get_field('optie_contact_telefoon_mooi', 'option');
                $contactPhoneFormat = get_field('optie_contact_telefoon_geformatteerd', 'option');
                $contactEmail = get_field('optie_contact_emailadres', 'option');

                $contactSocialArr = array(
                    array(
                        'link' => get_field('optie_contact_facebook_url', 'option'),
                        'icon' => '<i class="fa-brands fa-facebook-f"></i>',
                        'title' => __('Follow us on Facebook', 'visia')
                    ),
	                array(
		                'link' => get_field('optie_contact_instagram_url', 'option'),
		                'icon' => '<i class="fa-brands fa-instagram"></i>',
		                'title' => __('Follow us on Instagram', 'visia')
	                ),
	                array(
		                'link' => get_field('optie_contact_linkedin_url', 'option'),
		                'icon' => '<i class="fa-brands fa-linkedin-in"></i>',
		                'title' => __('Follow us on LinkedIn', 'visia')
	                )
                );

                if($contactLocationName || $contactLocationName2 || $contactAddress1 || $contactAddress2 || $contactDetailArr || $contactSocialArr || $contactPhonePretty && $contactPhoneFormat || $contactEmail) {
                    echo '<aside class="main-menu__container__side">';

                    /* Location details */
                    if($contactLocationName || $contactLocationName2 || $contactAddress1 || $contactAddress2) { ?>
                        <div class="main-menu__container__side__block js-main-menu-side-block">
                            <span class="main-menu__container__side__block__label"><?php bloginfo('name'); ?></span>

                            <ul class="main-menu__container__side__block__list">
                                <?php if($contactLocationName || $contactLocationName2) {
                                    echo '<li class="main-menu__container__side__block__list__item">'.(($contactLocationName) ? $contactLocationName.', ' : '').$contactLocationName2.'</li>';
                                } ?>

                                <?php if($contactAddress1 || $contactAddress2) {
	                                echo '<li class="main-menu__container__side__block__list__item">'.(($contactAddress1) ? $contactAddress1.', ' : '').$contactAddress2.'</li>';
                                } ?>
                            </ul>
                        </div>
                    <?php }

                    /* Contact information & socials */
                    if($contactPhonePretty && $contactPhoneFormat || $contactEmail || $contactSocialArr) { ?>
                        <div class="main-menu__container__side__block--columns main-menu__container__side__block js-main-menu-side-block">
                            <?php if($contactPhonePretty && $contactPhoneFormat || $contactEmail) { ?>
                                <div class="main-menu__container__side__block__column">
                                    <span class="main-menu__container__side__block__label"><?php _e('Get in touch', 'visia'); ?></span>

                                    <ul class="main-menu__container__side__block__list">
                                        <?php if($contactPhonePretty && $contactPhoneFormat) {
                                            echo '<li class="main-menu__container__side__block__list__item"><a href="tel:'.$contactPhoneFormat.'" data-blobity-magnetic="false">'.$contactPhonePretty.'</a></li>';
                                        }

                                        if($contactEmail) {
	                                        echo '<li class="main-menu__container__side__block__list__item"><a href="mailto:'.$contactEmail.'" data-blobity-magnetic="false">'.$contactEmail.'</a></li>';
                                        } ?>
                                    </ul>
                                </div>
                            <?php }

                            if($contactSocialArr) { ?>
                                <div class="main-menu__container__side__block__column">
                                    <span class="main-menu__container__side__block__label"><?php _e('Follow us', 'visia'); ?></span>

                                    <ul class="main-menu__container__side__block__list--icons main-menu__container__side__block__list">
                                        <?php foreach($contactSocialArr as $contactSocial) {
                                            if($contactSocial['link'] && $contactSocial['icon']) { ?>
                                                <li class="main-menu__container__side__block__list__item--icon main-menu__container__side__block__list__item">
                                                    <a class="js-main-menu-side-block-icon-link" href="<?php echo $contactSocial['link']; ?>" title="<?php esc_attr_e($contactSocial['title']); ?>" aria-label="<?php esc_attr_e($contactSocial['title']); ?>" target="_blank" data-blobity-magnetic="false" data-blobity-offset-y="6" data-blobity-offset-x="6">
                                                        <?php echo $contactSocial['icon']; ?>
                                                    </a>
                                                </li>
                                            <?php }
                                        } ?>
                                    </ul>
                                </div>
                            <?php } ?>
                        </div>
                    <?php }

                    echo '</aside>';
                } ?>
            </div>
        </div>
    </div>
</nav>

<div class="js-swap-container">

<?php get_template_part('template-parts/modules/header'); ?>