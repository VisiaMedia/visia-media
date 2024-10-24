<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-title" content="<?php esc_attr_e(get_bloginfo('name')); ?>">
    <meta name="application-name" content="<?php esc_attr_e(get_bloginfo('name')); ?>">
    <meta name="theme-color" content="#1b2843">

    <!-- Google Tag Manager -->
    <script>!function(){"use strict";function l(e){for(var t=e,r=0,n=document.cookie.split(";");r<n.length;r++){var o=n[r].split("=");if(o[0].trim()===t)return o[1]}}function s(e){return localStorage.getItem(e)}function u(e){return window[e]}function d(e,t){e=document.querySelector(e);return t?null==e?void 0:e.getAttribute(t):null==e?void 0:e.textContent}var e=window,t=document,r="script",n="dataLayer",o="MCTK73C9",a="https://gtm.visia.media",i="https://load.gtm.visia.media",c="pvyhpfqo",E="stapeUserId",I="",v="",g=!1;try{var g=!!E&&(m=navigator.userAgent,!!(m=new RegExp("Version/([0-9._]+)(.*Mobile)?.*Safari.*").exec(m)))&&16.4<=parseFloat(m[1]),A="stapeUserId"===E,f=g&&!A?function(e,t,r){void 0===t&&(t="");var n={cookie:l,localStorage:s,jsVariable:u,cssSelector:d},t=Array.isArray(t)?t:[t];if(e&&n[e])for(var o=n[e],a=0,i=t;a<i.length;a++){var c=i[a],c=r?o(c,r):o(c);if(c)return c}else console.warn("invalid uid source",e)}(E,I,v):void 0;g=g&&(!!f||A)}catch(e){console.error(e)}var m=e,E=(m[n]=m[n]||[],m[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"}),t.getElementsByTagName(r)[0]),I="dataLayer"===n?"":"&l="+n,v=f?"&bi="+encodeURIComponent(f):"",A=t.createElement(r),e=g?"kp"+c:c,n=!g&&i?i:a;A.async=!0,A.src=n+"/"+e+".js?st="+o+I+v,null!=(f=E.parentNode)&&f.insertBefore(A,E)}();</script>
    <!-- End Google Tag Manager -->

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
</head>

<body <?php body_class(); ?>>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://load.gtm.visia.media/ns.html?id=GTM-MCTK73C9" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<div class="loader js-loader">
    <i class="loader__spinner fa-duotone fa-spinner-third fa-spin" style="--fa-secondary-opacity: 0.25;"></i>
</div>

<div class="css-main-body-container js-main-body-container" aria-hidden="false">

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

<nav class="main-menu js-main-menu js-is-inactive" aria-label="<?php esc_attr_e(__('Main menu', 'visia')); ?>" aria-hidden="true">
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
                                            echo '<li class="main-menu__container__side__block__list__item"><a target="_blank" href="tel:'.$contactPhoneFormat.'" data-blobity-magnetic="false">'.$contactPhonePretty.'</a></li>';
                                        }

                                        if($contactEmail) {
	                                        echo '<li class="main-menu__container__side__block__list__item"><a target="_blank" href="mailto:'.$contactEmail.'" data-blobity-magnetic="false">'.$contactEmail.'</a></li>';
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

<?php if(!is_archive()) {
	get_template_part('template-parts/modules/header', get_post_type(get_queried_object_id()));
} ?>