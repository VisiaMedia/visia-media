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

                    if($contactPhonePretty && $contactPhoneFormat || $contactEmail) {
                        echo '<ul class="footer__menu-bar__menu__list">';

                        if($contactPhonePretty && $contactPhoneFormat) {
                            echo '<li><a target="_blank" href="tel:'.$contactPhoneFormat.'">'.$contactPhonePretty.'</a></li>';
                        }

	                    if($contactEmail) {
		                    echo '<li><a target="_blank" href="mailto:'.$contactEmail.'">'.$contactEmail.'</a></li>';
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
                <small>&copy; <?php echo date('Y'); ?>, <?php bloginfo('name'); ?></small>

                <?php wp_nav_menu(array(
			        'menu_class' => 'footer__legal-bar__menu__list',
			        'container' => null,
			        'theme_location' => 'footer_legal',
			        'item_spacing' => 'discard'
		        )); ?>
            </nav>

            <div class="footer__legal-bar__logo-wrapper">
                <a class="footer__legal-bar__logo-wrapper__logo--leadinfo footer__legal-bar__logo-wrapper__logo js-footer-logo" target="_blank" href="https://www.leadinfo.com/nl/">
                    <img class="footer__legal-bar__logo-wrapper__logo__img" src="<?php bloginfo('template_directory');?>/assets/img/Leadinfo-partner-badge.svg" width="290" height="130" alt="<?php esc_attr_e(__('Leadinfo', 'visia')); ?>">
                </a>
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

                        if(get_field('kennisbanktitel')) {
	                        $title = get_field('kennisbanktitel');
                        } else {
                            $title = get_the_title();
                        }

                        echo '<li><a href="'.get_permalink().'">'.$title.'</a></li>';
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

<?php wp_footer(); ?>

</body>
</html>