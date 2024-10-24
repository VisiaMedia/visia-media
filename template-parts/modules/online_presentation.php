<?php if(get_sub_field('formuliernaam') && get_sub_field('bedanktpagina')) {
	global $scrollTriggerCount;

	global_color_change_trigger(get_sub_field('kleurschema'), get_sub_field('achtergrond'), get_sub_field('tekst'));

	$formName = get_sub_field('formuliernaam') ?>

	<section class="presentation-form js-presentation-form" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
		<?php if($headline = get_sub_field('headline')) { ?>
			<div class="presentation-form__intro js-presentation-form-intro">
				<div class="css-max-text-width">
					<h1 class="presentation-form__intro__title css-title js-presentation-form-vertical-text-reveal"><?php echo do_shortcode($headline); ?></h1>
				</div>
			</div>
		<?php } ?>

		<div class="presentation-form__content js-presentation-form-content">
			<div class="css-max-text-width">
                <form class="presentation-form__content__form css-big-form js-form js-big-form js-presentation-form-self" name="<?php esc_attr_e($formName); ?>" method="POST" data-netlify="true" data-swup-form="true" action="<?php echo substr(get_permalink(get_sub_field('bedanktpagina')), strlen(home_url())); ?>">
                    <span class="css-big-form-border js-big-form-border"></span>

                    <label class="css-big-form-label js-big-form-field" for="<?php esc_attr_e($formName); ?>-first-name" data-label-num="01">
                        <span class="css-big-form-label-text js-big-form-field-text"><?php _e('What\'s your name?', 'visia'); ?></span>

                        <input class="css-big-form-input js-big-form-field-input js-presentation-form-first-name" type="text" name="first-name" id="<?php esc_attr_e($formName); ?>-first-name" required="true" aria-required="true" aria-errormessage="<?php esc_attr_e($formName); ?>-first-name-error" placeholder="<?php esc_attr_e('First name', 'visia'); ?> *">

                        <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formName); ?>-first-name-error"><?php _e('Please enter your first name', 'visia'); ?></span>
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

                        <input class="css-big-form-input js-big-form-field-input js-presentation-form-business" type="text" name="business" id="<?php esc_attr_e($formName); ?>-business" required="true" aria-required="true" aria-errormessage="<?php esc_attr_e($formName); ?>-business-error" placeholder="<?php esc_attr_e('Business name', 'visia'); ?> *">

                        <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formName); ?>-business-error"><?php _e('Please enter your business\' name', 'visia'); ?></span>
                    </label>

                    <span class="css-big-form-border js-big-form-border"></span>

                    <div class="css-form-footer css-big-form-footer">
                        <label class="css-form-label-privacy" for="<?php esc_attr_e($formName); ?>-privacy">
                            <input type="checkbox" class="js-form-field-privacy-checkbox" name="privacy-checkbox" id="<?php esc_attr_e($formName); ?>-privacy" required="true" aria-required="true" aria-errormessage="<?php esc_attr_e($formName); ?>-privacy-error">

                            <span class="css-form-label-privacy-text"><?php printf(__('I agree to the storage and processing of my data as stated in the %1$sprivacy statement%2$s*', 'visia'), '<a href="'.get_privacy_policy_url().'" target="_blank">', '</a>'); ?></span>

                            <span class="css-form-input-validation-message js-form-validation-message" id="<?php esc_attr_e($formName); ?>-privacy-error"><?php _e('Check to confirm that you agree to the processing of your data', 'visia'); ?></span>
                        </label>

                        <div class="css-form-button-wrapper">
                            <button class="css-form-button css-rounded-button js-rounded-button js-form-submit-button" type="submit">
                                <span class="css-rounded-button-outline js-rounded-button-outline"></span>

                                <span class="css-rounded-button-label"><?php _e('View presentation', 'visia'); ?></span>
                            </button>
                        </div>
                    </div>
                </form>
			</div>
		</div>
	</section>
<?php } ?>