<?php if($args['wrapper_class'] && $args['form_name'] && $args['thankyou_page'] && $args['button']) {
	$wrapperClass = $args['wrapper_class'];
    $formName = $args['form_name'];
    $thankyouPage = $args['thankyou_page'];
    $button = $args['button']; ?>

    <div class="<?php echo $wrapperClass; ?>">
        <form class="css-form--simple css-form js-form" name="<?php esc_attr_e($formName); ?>" method="POST" data-netlify="true" data-swup-form="true" action="<?php echo $thankyouPage; ?>">
            <p class="css-form-row--simple css-form-row">
                <label class="css-form-label--simple css-form-label" for="<?php esc_attr_e($formName); ?>-first-name">
                    <span><?php _e('First name', 'visia'); ?></span>
                    <span aria-label="required">*</span>
                </label>

                <input class="css-form-input--simple css-form-input" type="text" name="first-name" id="<?php esc_attr_e($formName); ?>-first-name" required="true" placeholder="<?php esc_attr_e('First name', 'visia'); ?> *">
            </p>

            <p class="css-form-row--simple css-form-row">
                <label class="css-form-label--simple css-form-label" for="<?php esc_attr_e($formName); ?>-email-address">
                    <span><?php _e('Email address', 'visia'); ?></span>
                    <span aria-label="required">*</span>
                </label>

                <input class="css-form-input--simple css-form-input" type="email" name="email-address" id="<?php esc_attr_e($formName); ?>-email-address" required="true" placeholder="<?php esc_attr_e('Email address', 'visia'); ?> *">
            </p>

            <p class="css-form-row--simple css-form-row--footer css-form-row">
                <button class="css-form-button--simple css-form-button js-form-submit-button js-form-submit-button-simple" type="submit">
                    <span class="css-form-button-outline--simple css-form-button-outline js-form-submit-button-simple-outline"></span>

                    <span class="css-form-button-label--label css-form-button-label"><?php echo $button; ?></span>
                </button>
            </p>
        </form>

    </div>
<?php } ?>