<?php if($atts['id']) {
	global $post, $scrollTriggerCount;
	$post = get_post($atts['id']);

	setup_postdata($post);

    if($download = get_field('download')) { ?>
        <aside class="blog-download css-boxed-content js-blog-download" data-st-count="<?php $scrollTriggerCount--; echo $scrollTriggerCount; ?>">
            <?php if($image = get_field('afbeelding')) {
                echo '<div class="blog-download__image">'.wp_get_attachment_image($image, 'large').'</div>';
            } ?>

            <div class="blog-download__content">
                <h3 class="blog-download__content__title css-title"><?php the_title(); ?></h3>

                <?php if($usps = get_field('usps')) {
                    echo '<ul class="blog-download__content__usps">';

                    foreach($usps as $usp) {
                        echo '<li class="blog-download__content__usps__usp">'.$usp['text'].'</li>';
                    }

                    echo '</ul>';
                }

                if(get_field('knop_label') || get_field('knop_onderschrift')) {
                    echo '<div class="blog-download__content__button-wrapper">';

                    if($buttonLabel = get_field('knop_label')) { ?>
                        <button class="blog-download__content__button-wrapper__button css-rounded-button js-rounded-button js-popup-trigger" data-popup="blog-download-<?php echo $post->post_name; ?>">
                            <span class="css-rounded-button-outline js-rounded-button-outline"></span>

                            <span class="css-rounded-button-label"><?php echo $buttonLabel; ?></span>
                        </button>
                    <?php }

                    if($buttonSubtext = get_field('knop_onderschrift')) {
                        echo '<span class="blog-download__content__button-wrapper__subtext">'.$buttonSubtext.'</span>';
                    }

                    echo '</div>';
                } ?>
            </div>
        </aside>
	    <?php }

    wp_reset_postdata();
} ?>
