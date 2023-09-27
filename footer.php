<?php global $scrollTriggerCount;

global_color_change_trigger('blue'); ?>

<footer class="footer js-footer" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
    <div class="css-max-text-width">
        <div class="footer__menu-bar js-footer-row">
            <nav class="footer__menu-bar__menu--wide footer__menu-bar__menu">
                <span class="footer__menu-bar__menu__title css-title"><?php _e('What we do', 'visia'); ?></span>

                <?php wp_nav_menu(array(
                    'menu_class' => 'footer__menu-bar__menu__list--split footer__menu-bar__menu__list',
                    'container' => null,
                    'theme_location' => 'footer_1',
                    'item_spacing' => 'discard'
                )); ?>
            </nav>

            <nav class="footer__menu-bar__menu">
                <span class="footer__menu-bar__menu__title css-title"><?php _e('What we are', 'visia'); ?></span>

                <?php wp_nav_menu(array(
                    'menu_class' => 'footer__menu-bar__menu__list',
                    'container' => null,
                    'theme_location' => 'footer_2',
                    'item_spacing' => 'discard'
                )); ?>
            </nav>

            <nav class="footer__menu-bar__menu">
                <span class="footer__menu-bar__menu__title css-title"><?php _e('Contact', 'visia'); ?></span>

                <?php $contactPhonePretty = get_field('optie_contact_telefoon_mooi', 'option');
                    $contactPhoneFormat = get_field('optie_contact_telefoon_geformatteerd', 'option');
                    $contactEmail = get_field('optie_contact_emailadres', 'option');

                    if($contactEmail || $contactPhonePretty && $contactPhoneFormat) {
                        echo '<ul class="footer__menu-bar__menu__list">';

                        if($contactEmail) {
                            echo '<li><a href="mailto:'.$contactEmail.'">'.$contactEmail.'</a></li>';
                        }

                        if($contactPhonePretty && $contactPhoneFormat) {
                            echo '<li><a href="tel:'.$contactPhoneFormat.'">'.$contactPhonePretty.'</a></li>';
                        }

                        echo '</ul>';
                    }

                    /* Button */
                    if($contactPageID = get_field('optie_paginalink_contact', 'option')) {
                        global_button(__('Get in touch', 'visia'), get_permalink($contactPageID), 'internal', 'footer__menu-bar__menu__button-wrapper');
                    } ?>
            </nav>
        </div>

        <div class="footer__legal-bar js-footer-row">
            <div class="footer__legal-bar__logo-wrapper">
                <a class="footer__legal-bar__logo-wrapper__logo js-footer-logo" href="<?php echo get_home_url(); ?>">
                    <img class="footer__legal-bar__logo-wrapper__logo__img" src="<?php bloginfo('template_directory');?>/assets/img/Visia-Media-logo-black-outline.svg" width="275" height="157" alt="<?php esc_attr_e(get_bloginfo('name')); ?>">
                </a>
            </div>

            <?php $contactSocialArr = array(
                array(
                    'link' => get_field('optie_contact_facebook_url', 'option'),
                    'name' => 'Facebook',
                    'title' => __('Follow us on Facebook', 'visia')
                ),
                array(
                    'link' => get_field('optie_contact_instagram_url', 'option'),
                    'name' => 'Instagram',
                    'title' => __('Follow us on Instagram', 'visia')
                ),
                array(
                    'link' => get_field('optie_contact_linkedin_url', 'option'),
                    'name' => 'LinkedIn',
                    'title' => __('Follow us on LinkedIn', 'visia')
                )
            ); ?>

            <nav class="footer__legal-bar__menu">
                <ul class="footer__legal-bar__menu__list">
                    <?php foreach($contactSocialArr as $contactSocial) {
                        if($contactSocial['link'] && $contactSocial['name']) { ?>
                            <li>
                                <a href="<?php echo $contactSocial['link']; ?>" target="_blank"><?php echo $contactSocial['name']; ?></a>
                            </li>
                        <?php }
                    } ?>
                </ul>
            </nav>

            <nav class="footer__legal-bar__menu">
                <?php wp_nav_menu(array(
			        'menu_class' => 'footer__legal-bar__menu__list',
			        'container' => null,
			        'theme_location' => 'footer_legal',
			        'item_spacing' => 'discard'
		        )); ?>
            </nav>

            <div class="footer__legal-bar__copyright">
                <small>&copy; <?php echo date('Y'); ?>, <?php bloginfo('name'); ?></small>
            </div>
        </div>

        <?php $knowledgeBaseQuery = new WP_Query(array(
            'posts_per_page' => -1,
            'tag' => 'kennisbank'
        ));

        if($knowledgeBaseQuery->have_posts()) { ?>
            <div class="footer__knowledge-base js-footer-row">
                <button class="footer__knowledge-base__title css-title js-footer-kb-toggle" data-no-blobity="true"><?php _e('Knowledge base', 'visia'); ?> <span class="footer__knowledge-base__title__toggle js-footer-kb-toggle-icon"><i class="fa-solid fa-caret-down"></i></span></button>

                <ul class="footer__knowledge-base__menu js-footer-kb-list">
                    <?php while($knowledgeBaseQuery->have_posts()) {
                        $knowledgeBaseQuery->the_post();

                        echo '<li><a href="'.get_permalink().'">'.substr(get_the_title(),0,25).'</a></li>';
                    } ?>
                </ul>
            </div>
        <?php } wp_reset_postdata(); ?>
    </div>
</footer>

<?php /* Determine transition title */
if(is_archive()) {
	$itemTitle = get_the_archive_title();
} elseif(get_field('transitietitel', get_queried_object_id())) {
	$itemTitle = get_field('transitietitel', get_queried_object_id());
} else {
	$itemTitle = get_the_title(get_queried_object_id());
}

/* Determine active menu item */
if(is_home() || is_archive() || is_singular('post')) {
	$activeItemID = get_option('page_for_posts');
} elseif(is_singular('landingpage') && get_field('optie_paginalink_expertises', 'option')) {
	$activeItemID = get_field('optie_paginalink_expertises', 'option');
} elseif(is_singular('case') && get_field('optie_paginalink_cases', 'option')) {
	$activeItemID = get_field('optie_paginalink_cases', 'option');
} elseif($postAncestors = get_post_ancestors(get_queried_object_id())) {
	$activeItemID = array_pop($postAncestors);
} else {
	$activeItemID = get_queried_object_id();
} ?>

<div class="js-item-object"<?php echo ($itemTitle) ? ' data-item-title="'.esc_attr($itemTitle).'"' : ''; echo ($activeItemID) ? ' data-active-menu-item="'.$activeItemID.'"' : '' ?>></div>

</div>
</div>

<div class="popups js-popups">
    <div class="popups__popup css-boxed-content js-popups-single" data-popup="presentation-download" aria-hidden="true" role="dialog">
        <div role="document">
            <button class="popups__popup__close js-popups-single-close" title="<?php esc_attr_e(__('Close popup', 'visia')); ?>">
                <span class="popups__popup__close__line--left popups__popup__close__line"></span>

                <span class="popups__popup__close__line--right popups__popup__close__line"></span>
            </button>

            <?php if($popupTitle = get_field('optie_cta_presentatie_popup_titel', 'option')) {
                echo '<h1 class="popups__popup__title css-title--small-size css-title">'.$popupTitle.'</h1>';
            }

            if($popupText = get_field('optie_cta_presentatie_popup_tekst', 'option')) {
                echo '<div class="popups__popup__content css-normal-text">'.$popupText.'</div>';
            }

            if($thankyouPage = get_field('optie_cta_presentatie_popup_bedanktpagina_formulier', 'option')) {
                $thankyouPage = substr(get_permalink($thankyouPage), strlen(home_url()));

	            get_template_part('template-parts/forms/simple', null, array(
                    'wrapper_class' => 'popups__popup__form',
		            'form_name' => 'presentation-download',
		            'thankyou_page' => $thankyouPage,
		            'button' => __('Request presentation', 'visia')
	            ));
            } ?>
        </div>
    </div>

    <?php if($blogDownloads = get_posts(array(
        'post_type'	=> 'blog_downloads',
        'posts_per_page' => -1,
    ))) {
        foreach($blogDownloads as $post) { setup_postdata($post); ?>
            <div class="popups__popup css-boxed-content js-popups-single" data-popup="blog-download-<?php echo $post->post_name; ?>" aria-hidden="true" role="dialog">
                <div role="document">
                    <button class="popups__popup__close js-popups-single-close" title="<?php esc_attr_e(__('Close popup', 'visia')); ?>">
                        <span class="popups__popup__close__line--left popups__popup__close__line"></span>

                        <span class="popups__popup__close__line--right popups__popup__close__line"></span>
                    </button>

			        <?php if($popupTitle = get_the_title()) {
				        echo '<h1 class="popups__popup__title css-title--small-size css-title">'.$popupTitle.'</h1>';
			        }

			        if($thankyouPage = get_field('bedanktpagina_formulier')) {
				        $thankyouPage = substr(get_permalink($thankyouPage), strlen(home_url()));

				        get_template_part('template-parts/forms/simple', null, array(
					        'wrapper_class' => 'popups__popup__form',
					        'form_name' => 'blog-download-'.$post->post_name,
					        'thankyou_page' => $thankyouPage,
					        'button' => get_field('knop_label')
				        ));
			        } ?>
                </div>
            </div>
        <?php } wp_reset_postdata();
    } ?>

    <div class="popups__overlay js-popups-overlay" tabindex="-1"></div>
</div>

<div class="loader js-loader">
    <i class="loader__spinner fa-duotone fa-spinner-third fa-spin" style="--fa-secondary-opacity: 0.25;"></i>
</div>

<?php wp_footer(); ?>

</body>
</html>