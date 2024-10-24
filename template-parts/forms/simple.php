<?php if($args['wrapper_class'] && $args['form_name'] && $args['thankyou_page'] && $args['button']) {
	$wrapperClass = $args['wrapper_class'];
    $formName = $args['form_name'];
    $formID = wp_unique_id($formName.'-');
    $thankyouPage = $args['thankyou_page'];
    $button = $args['button']; ?>

    <div class="<?php echo $wrapperClass; ?>">
        <form class="css-form--simple css-form js-form" name="<?php esc_attr_e($formName); ?>" method="POST" data-netlify="true" data-swup-form="true" action="<?php echo $thankyouPage; ?>">
            <p class="css-form-row--simple css-form-row">
                <label class="css-form-label--simple css-form-label" for="<?php esc_attr_e($formID); ?>-first-name">
                    <span><?php _e('First name', 'visia'); ?></span>
                    <span aria-label="required">*</span>
                </label>

                <input class="css-form-input--simple css-form-input" type="text" name="first-name" id="<?php esc_attr_e($formID); ?>-first-name" required="true" aria-required="true" aria-errormessage="<?php esc_attr_e($formID); ?>-first-name-error" placeholder="<?php esc_attr_e('First name', 'visia'); ?> *">

                <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formID); ?>-first-name-error"><?php _e('Please enter your first name', 'visia'); ?></span>
            </p>

            <p class="css-form-row--simple css-form-row">
                <label class="css-form-label--simple css-form-label" for="<?php esc_attr_e($formID); ?>-email-address">
                    <span><?php _e('Email address', 'visia'); ?></span>
                    <span aria-label="required">*</span>
                </label>

                <input class="css-form-input--simple css-form-input" type="email" name="email-address" id="<?php esc_attr_e($formID); ?>-email-address" required="true" aria-required="true" aria-errormessage="<?php esc_attr_e($formID); ?>-email-error" placeholder="<?php esc_attr_e('Email address', 'visia'); ?> *">

                <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formID); ?>-email-error"><?php _e('Please enter your email address', 'visia'); ?></span>
            </p>

            <div class="css-form-footer">
                <label class="css-form-label-privacy" for="<?php esc_attr_e($formID); ?>-privacy">
                    <input type="checkbox" class="js-form-field-privacy-checkbox" name="privacy-checkbox" id="<?php esc_attr_e($formID); ?>-privacy" required="true" aria-required="true" aria-errormessage="<?php esc_attr_e($formID); ?>-privacy-error">

                    <span class="css-form-label-privacy-text"><?php printf(__('I agree to the storage and processing of my data as stated in the %1$sprivacy statement%2$s*', 'visia'), '<a href="'.get_privacy_policy_url().'" target="_blank">', '</a>'); ?></span>

                    <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formID); ?>-privacy-error"><?php _e('Check to confirm that you agree to the processing of your data', 'visia'); ?></span>
                </label>

                <div class="css-form-button-wrapper">
                    <button class="css-form-button css-rounded-button js-rounded-button js-form-submit-button" type="submit">
                        <span class="css-rounded-button-outline js-rounded-button-outline"></span>

                        <span class="css-rounded-button-label"><?php echo $button; ?></span>
                    </button>
                </div>
            </div>
        </form>

    </div>
<?php } ?>