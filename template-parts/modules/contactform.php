<?php if(get_sub_field('formuliernaam') && get_sub_field('bedanktpagina')) {
    global $scrollTriggerCount;

    global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst'));

    $formName = get_sub_field('formuliernaam') ?>

    <section class="contact-form js-contact-form" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
        <?php if($headline = get_sub_field('headline')) { ?>
            <div class="contact-form__intro js-contact-form-intro">
                <div class="css-max-text-width">
                    <h1 class="contact-form__intro__title css-title js-contact-form-vertical-text-reveal"><?php echo $headline; ?></h1>
                </div>
            </div>
        <?php } ?>

        <div class="contact-form__content js-contact-form-content">
            <div class="css-max-text-width">
                <div class="contact-form__content__inner">
                    <form class="contact-form__content__form js-form js-contact-form-self" name="<?php esc_attr_e($formName); ?>" method="POST" data-netlify="true" data-swup-form="true" action="<?php echo substr(get_permalink(get_sub_field('bedanktpagina')), strlen(home_url())); ?>">

                        <span class="contact-form__content__form__border js-contact-form-border"></span>

                        <label class="contact-form__content__form__label js-contact-form-field" for="<?php esc_attr_e($formName); ?>-full-name" data-label-num="01">
                            <span class="contact-form__content__form__label__text js-contact-form-field-text"><?php _e('What\'s your name?', 'visia'); ?></span>

                            <input class="contact-form__content__form__label__input js-contact-form-field-input" type="text" name="full-name" id="<?php esc_attr_e($formName); ?>-full-name" required="true" placeholder="<?php esc_attr_e('First and last name', 'visia'); ?> *">
                        </label>

                        <span class="contact-form__content__form__border js-contact-form-border"></span>

                        <label class="contact-form__content__form__label js-contact-form-field" for="<?php esc_attr_e($formName); ?>-email" data-label-num="02">
                            <span class="contact-form__content__form__label__text js-contact-form-field-text"><?php _e('What\'s your email address?', 'visia'); ?></span>

                            <input class="contact-form__content__form__label__input js-contact-form-field-input" type="email" name="email" id="<?php esc_attr_e($formName); ?>-email" required="true" placeholder="<?php esc_attr_e('Email address', 'visia'); ?> *">
                        </label>

                        <span class="contact-form__content__form__border js-contact-form-border"></span>

                        <label class="contact-form__content__form__label js-contact-form-field" for="<?php esc_attr_e($formName); ?>-business" data-label-num="03">
                            <span class="contact-form__content__form__label__text js-contact-form-field-text"><?php _e('What\'s your business\' name?', 'visia'); ?></span>

                            <input class="contact-form__content__form__label__input js-contact-form-field-input" type="text" name="business" id="<?php esc_attr_e($formName); ?>-business" required="true" placeholder="<?php esc_attr_e('Business name', 'visia'); ?> *">
                        </label>

                        <span class="contact-form__content__form__border js-contact-form-border"></span>

                        <label class="contact-form__content__form__label js-contact-form-field" for="<?php esc_attr_e($formName); ?>-message" data-label-num="04">
                            <span class="contact-form__content__form__label__text js-contact-form-field-text"><?php _e('Describe the project', 'visia'); ?></span>

                            <textarea class="contact-form__content__form__label__input js-contact-form-field-input" name="message" id="<?php esc_attr_e($formName); ?>-message" required="true" placeholder="<?php esc_attr_e('Additional information', 'visia'); ?> *" rows="1"></textarea>
                        </label>

                        <span class="contact-form__content__form__border js-contact-form-border"></span>

                        <button class="contact-form__content__form__button css-rounded-button js-rounded-button" type="submit">
                            <span class="css-rounded-button-outline js-rounded-button-outline"></span>

                            <span class="css-rounded-button-label"><?php _e('Discuss project', 'visia'); ?></span>
                        </button>
                    </form>

                    <?php /* Data for side container */
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

                    if($contactLocationName || $contactLocationName2 || $contactAddress1 || $contactAddress2 || $contactDetailArr || $contactSocialArr || $contactPhonePretty && $contactPhoneFormat || $contactEmail) { ?>
                        <aside class="contact-form__content__details js-contact-form-sidebar">
                            <?php if($contactLocationName || $contactLocationName2 || $contactAddress1 || $contactAddress2) { ?>
                                <div class="contact-form__content__details__block">
                                    <span class="contact-form__content__details__block__label"><?php bloginfo('name'); ?></span>

                                    <ul class="contact-form__content__details__block__list">
                                        <?php if($contactLocationName || $contactLocationName2) {
                                            echo '<li class="contact-form__content__details__block__list__item">'.(($contactLocationName) ? $contactLocationName.', ' : '').$contactLocationName2.'</li>';
                                        } ?>

                                        <?php if($contactAddress1 || $contactAddress2) {
                                            echo '<li class="contact-form__content__details__block__list__item">'.(($contactAddress1) ? $contactAddress1.', ' : '').$contactAddress2.'</li>';
                                        } ?>
                                    </ul>
                                </div>
                            <?php }

                            if($contactPhonePretty && $contactPhoneFormat || $contactEmail) { ?>
                                <div class="contact-form__content__details__block">
                                    <span class="contact-form__content__details__block__label"><?php _e('Get in touch', 'visia'); ?></span>

                                    <ul class="contact-form__content__details__block__list">
                                        <?php if($contactPhonePretty && $contactPhoneFormat) {
                                            echo '<li class="contact-form__content__details__block__list__item"><a href="tel:'.$contactPhoneFormat.'" data-blobity-magnetic="false">'.$contactPhonePretty.'</a></li>';
                                        }

                                        if($contactEmail) {
                                            echo '<li class="contact-form__content__details__block__list__item"><a href="mailto:'.$contactEmail.'" data-blobity-magnetic="false">'.$contactEmail.'</a></li>';
                                        } ?>
                                    </ul>
                                </div>
                            <?php }

                            if($contactSocialArr) { ?>
                                <div class="contact-form__content__details__block">
                                    <span class="contact-form__content__details__block__label"><?php _e('Follow us', 'visia'); ?></span>

                                    <ul class="contact-form__content__details__block__list--icons contact-form__content__details__block__list">
                                        <?php foreach($contactSocialArr as $contactSocial) {
                                            if($contactSocial['link'] && $contactSocial['icon']) { ?>
                                                <li class="contact-form__content__details__block__list__item--icon contact-form__content__details__block__list__item">
                                                    <a class="js-contact-form-icon-link" href="<?php echo $contactSocial['link']; ?>" title="<?php esc_attr_e($contactSocial['title']); ?>" aria-label="<?php esc_attr_e($contactSocial['title']); ?>" target="_blank" data-blobity-magnetic="false" data-blobity-offset-y="6" data-blobity-offset-x="6">
                                                        <?php echo $contactSocial['icon']; ?>
                                                    </a>
                                                </li>
                                            <?php }
                                        } ?>
                                    </ul>
                                </div>
                            <?php } ?>
                        </aside>
                    <?php } ?>
                </div>
            </div>
        </div>
    </section>
<?php } ?>