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
                    <form class="contact-form__content__form css-big-form js-form js-big-form js-contact-form-self" name="<?php esc_attr_e($formName); ?>" method="POST" data-netlify="true" data-swup-form="true" action="<?php echo substr(get_permalink(get_sub_field('bedanktpagina')), strlen(home_url())); ?>">
                        <span class="css-big-form-border js-big-form-border"></span>

                        <label class="css-big-form-label js-big-form-field" for="<?php esc_attr_e($formName); ?>-full-name" data-label-num="01">
                            <span class="css-big-form-label-text js-big-form-field-text"><?php _e('What\'s your name?', 'visia'); ?></span>

                            <input class="css-big-form-input js-big-form-field-input" type="text" name="full-name" id="<?php esc_attr_e($formName); ?>-full-name" required="true" aria-required="true" aria-errormessage="<?php esc_attr_e($formName); ?>-full-name-error" placeholder="<?php esc_attr_e('First and last name', 'visia'); ?> *">

                            <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formName); ?>-full-name-error"><?php _e('Please enter your first and last name', 'visia'); ?></span>
                        </label>

                        <span class="css-big-form-border js-big-form-border"></span>

                        <label class="css-big-form-label js-big-form-field" for="<?php esc_attr_e($formName); ?>-email" data-label-num="02">
                            <span class="css-big-form-label-text js-big-form-field-text"><?php _e('What\'s your email address?', 'visia'); ?></span>

                            <input class="css-big-form-input js-big-form-field-input" type="email" name="email" id="<?php esc_attr_e($formName); ?>-email" required="true" aria-required="true" aria-errormessage="<?php esc_attr_e($formName); ?>-email-error" placeholder="<?php esc_attr_e('Email address', 'visia'); ?> *">

                            <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formName); ?>-email-error"><?php _e('Please enter your email address', 'visia'); ?></span>
                        </label>

                        <span class="css-big-form-border js-big-form-border"></span>

                        <label class="css-big-form-label js-big-form-field" for="<?php esc_attr_e($formName); ?>-business" data-label-num="03">
                            <span class="css-big-form-label-text js-big-form-field-text"><?php _e('What\'s your business\' name?', 'visia'); ?></span>

                            <input class="css-big-form-input js-big-form-field-input" type="text" name="business" id="<?php esc_attr_e($formName); ?>-business" required="true" aria-required="true" aria-errormessage="<?php esc_attr_e($formName); ?>-business-error" placeholder="<?php esc_attr_e('Business name', 'visia'); ?> *">

                            <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formName); ?>-business-error"><?php _e('Please enter your business\' name', 'visia'); ?></span>
                        </label>

                        <span class="css-big-form-border js-big-form-border"></span>

                        <label class="css-big-form-label js-big-form-field" for="<?php esc_attr_e($formName); ?>-message" data-label-num="04">
                            <span class="css-big-form-label-text js-big-form-field-text"><?php _e('Describe the project', 'visia'); ?></span>

                            <textarea class="css-big-form-input js-big-form-field-input" name="message" id="<?php esc_attr_e($formName); ?>-message" required="true" aria-required="true" aria-errormessage="<?php esc_attr_e($formName); ?>-message-error" placeholder="<?php esc_attr_e('Brief description of the project', 'visia'); ?> *" rows="1"></textarea>

                            <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formName); ?>-message-error"><?php _e('Please enter a brief description of the project', 'visia'); ?></span>
                        </label>

                        <span class="css-big-form-border js-big-form-border"></span>

                        <div class="css-form-footer css-big-form-footer">
                            <label class="css-form-label-privacy" for="<?php esc_attr_e($formName); ?>-privacy">
                                <input type="checkbox" class="js-form-field-privacy-checkbox" name="privacy-checkbox" id="<?php esc_attr_e($formName); ?>-privacy" required="true" aria-required="true" aria-errormessage="<?php esc_attr_e($formName); ?>-privacy-error">

                                <span class="css-form-label-privacy-text"><?php printf(__('I agree to the storage and processing of my data as stated in the %1$sprivacy statement%2$s*', 'visia'), '<a href="'.get_privacy_policy_url().'" target="_blank">', '</a>'); ?></span>

                                <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formName); ?>-privacy-error"><?php _e('Check to confirm that you agree to the processing of your data', 'visia'); ?></span>
                            </label>

                            <div class="css-form-button-wrapper">
                                <button class="css-big-form-button css-rounded-button js-rounded-button js-form-submit-button" type="submit">
                                    <span class="css-rounded-button-outline js-rounded-button-outline"></span>

                                    <span class="css-rounded-button-label"><?php _e('Discuss project', 'visia'); ?></span>
                                </button>
                            </div>
                        </div>
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
                                            echo '<li class="contact-form__content__details__block__list__item"><a target="_blank" href="tel:'.$contactPhoneFormat.'" data-blobity-magnetic="false">'.$contactPhonePretty.'</a></li>';
                                        }

                                        if($contactEmail) {
                                            echo '<li class="contact-form__content__details__block__list__item"><a target="_blank" href="mailto:'.$contactEmail.'" data-blobity-magnetic="false">'.$contactEmail.'</a></li>';
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