<?php if(get_sub_field('bedanktpagina') && get_sub_field('formulier_naam')) {
	global $scrollTriggerCount;

	$title = get_sub_field('titel');
	$sectionID = wp_unique_id('cta-leadform-');
	$titleID = $sectionID.'-title';

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst')); ?>
	    <aside class="cta-leadform" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>"<?php echo ($fieldSectionID = get_sub_field('formulier_ID')) ? ' id="'.$fieldSectionID.'"' : ''; ?><?php echo $title ? ' aria-labelledby="'.esc_attr($titleID).'"' : ''; ?>>
	        <div class="cta-leadform__inner js-section-reveal">
	            <div class="css-max-text-width">
	                <?php if($title) {
	                    echo '<h1 id="'.esc_attr($titleID).'" class="cta-leadform__title css-title--normal-size css-title">'.$title.'</h1>';
	                }

	                if($content = get_sub_field('content')) {
	                    echo '<div class="cta-leadform__text css-normal-text">'.$content.'</div>';
	                }

                /* Form */
                $thankyouPage = substr(get_permalink(get_sub_field('bedanktpagina')), strlen(home_url()));
                $formName = sanitize_title_with_dashes(get_sub_field('formulier_naam'));
                $formID = wp_unique_id($formName.'-'); ?>

	                <div class="cta-leadform__form">
                    <form class="css-form--simple css-form js-form" name="<?php esc_attr_e($formName); ?>" method="POST" data-netlify="true" data-swup-form="true" action="<?php echo $thankyouPage; ?>">
                        <div class="css-form-columns">
                            <p class="css-form-row--half css-form-row">
                                <label class="css-form-label--simple css-form-label" for="<?php esc_attr_e($formID); ?>-full-name">
                                    <span><?php _e('Full name', 'visia'); ?></span>
                                    <span aria-label="required">*</span>
                                </label>

                                <input class="css-form-input--solid css-form-input css-boxed-content" type="text" name="full-name" id="<?php esc_attr_e($formID); ?>-full-name" required="true" aria-required="true" aria-describedby="<?php esc_attr_e($formID); ?>-full-name-error" aria-errormessage="<?php esc_attr_e($formID); ?>-full-name-error" aria-invalid="false" placeholder="<?php esc_attr_e('Full name', 'visia'); ?> *">

                                <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formID); ?>-full-name-error"><?php _e('Please enter your full name', 'visia'); ?></span>
                            </p>

                            <p class="css-form-row--half css-form-row">
                                <label class="css-form-label--simple css-form-label" for="<?php esc_attr_e($formID); ?>-business">
                                    <span><?php _e('Business name', 'visia'); ?></span>
                                    <span aria-label="required">*</span>
                                </label>

                                <input class="css-form-input--solid css-form-input css-boxed-content" type="text" name="business" id="<?php esc_attr_e($formID); ?>-business" required="true" aria-required="true" aria-describedby="<?php esc_attr_e($formID); ?>-business-error" aria-errormessage="<?php esc_attr_e($formID); ?>-business-error" aria-invalid="false" placeholder="<?php esc_attr_e('Business name', 'visia'); ?> *">

                                <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formID); ?>-business-error"><?php _e('Please enter your business\' name', 'visia'); ?></span>
                            </p>
                        </div>

                        <p class="css-form-row--simple css-form-row">
                            <label class="css-form-label--simple css-form-label" for="<?php esc_attr_e($formID); ?>-email-address">
                                <span><?php _e('Email address', 'visia'); ?></span>
                                <span aria-label="required">*</span>
                            </label>

                            <input class="css-form-input--solid css-form-input css-boxed-content" type="email" name="email-address" id="<?php esc_attr_e($formID); ?>-email-address" required="true" aria-required="true" aria-describedby="<?php esc_attr_e($formID); ?>-email-error" aria-errormessage="<?php esc_attr_e($formID); ?>-email-error" aria-invalid="false" placeholder="<?php esc_attr_e('Email address', 'visia'); ?> *">

                            <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formID); ?>-email-error"><?php _e('Please enter your email address', 'visia'); ?></span>
                        </p>

                        <div class="css-form-footer">
                            <label class="css-form-label-privacy" for="<?php esc_attr_e($formID); ?>-privacy">
                                <input type="checkbox" class="js-form-field-privacy-checkbox" name="privacy-checkbox" id="<?php esc_attr_e($formID); ?>-privacy" required="true" aria-required="true" aria-describedby="<?php esc_attr_e($formID); ?>-privacy-error" aria-errormessage="<?php esc_attr_e($formID); ?>-privacy-error" aria-invalid="false">

                                <span class="css-form-label-privacy-text"><?php printf(__('I agree to the storage and processing of my data as stated in the %1$sprivacy statement%2$s*', 'visia'), '<a href="'.get_privacy_policy_url().'" target="_blank">', '</a>'); ?></span>

                                <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formID); ?>-privacy-error"><?php _e('Check to confirm that you agree to the processing of your data', 'visia'); ?></span>
                            </label>

                            <div class="css-form-button-wrapper">
                                <button class="css-form-button css-rounded-button js-rounded-button js-form-submit-button" type="submit">
                                    <span class="css-rounded-button-outline js-rounded-button-outline"></span>

                                    <span class="css-rounded-button-label"><?php _e('Free advice', 'visia'); ?></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </aside>
<?php } ?>
