<?php function visia_basis_setup() {
	/* Create and set global section counter */
	global $scrollTriggerCount; $scrollTriggerCount = 0;


	/* Text domain */
	load_theme_textdomain( 'visia', get_template_directory() . '/languages' );


	/* Adding theme support */
	add_filter('show_admin_bar', '__return_false');
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );


	/* Thumbnails */
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 820, 550, true );
	add_image_size('review-portrait-use', 72, 72, true);
	add_image_size('review-portrait-use-retina', 144, 144, true);
	add_image_size('project-grid-use', 768, 614, true);
	add_image_size('project-grid-use-retina', 1280, 1023, true);
	add_image_size('project-slider-use', 614, 768, true);
	add_image_size('project-slider-use-retina', 1228, 1536, true);
	add_image_size('falling-images-use', 768, 99999);
	add_image_size('team-use', 512, 682, true);
	add_image_size('team-use-retina', 1024, 1364, true);
	add_image_size('blog-thumb-use', 512, 342, true);
	add_image_size('blog-thumb-use-retina', 1024, 684, true);
	add_image_size('perspective-gallery-use', 1500, 99999);
	add_image_size('logo-presentation-use', 400, 99999);
	add_image_size('column-scroller-use', 768, 99999);


	/* Menus */
	register_nav_menus( array(
		'main' => __('Main menu', 'visia'),
		'footer_1' => __('Footer menu 1', 'visia'),
		'footer_2' => __('Footer menu 2', 'visia'),
		'footer_legal' => __('Legal menu', 'visia'),
	) );


	/* Options pages */
	if(function_exists('acf_add_options_page')) {
		acf_add_options_page(array(
			'page_title' 	=> __('General theme options', 'visia'),
			'menu_title'	=> __('Theme options', 'visia'),
			'menu_slug' 	=> 'general-theme-options',
			'icon_url' 		=> 'dashicons-dashboard',
		));

		acf_add_options_page(array(
			'page_title' 	=> __('Logo\'s', 'visia'),
			'menu_title'	=> __('Logo\'s', 'visia'),
			'menu_slug' 	=> 'logos',
			'icon_url' 		=> 'dashicons-screenoptions',
		));

		acf_add_options_page(array(
			'page_title' 	=> __('Team', 'visia'),
			'menu_title'	=> __('Team', 'visia'),
			'menu_slug' 	=> 'team',
			'icon_url' 		=> 'dashicons-admin-users',
		));

		acf_add_options_page(array(
			'page_title' 	=> __('CTA\'s', 'visia'),
			'menu_title'	=> __('CTA\'s', 'visia'),
			'menu_slug' 	=> 'ctas',
			'icon_url' 		=> 'dashicons-welcome-view-site',
		));
	}


	/* Set content_width */
	if(!isset($content_width)) {
		$content_width = 2560;
	}


	/* Set ACF backend styles */
	add_action('acf/input/admin_head', 'my_acf_admin_head');
	function my_acf_admin_head() { ?>
		<style>
			/* Hide ACF field: .module-bool */
            .acf-field.module-bool {
                position: absolute;
                left: -99999px;
                display: none;
                width: 1px;
                height: 1px;
                overflow: hidden;
                visibility: hidden;
                pointer-events: none;
            }
		</style>
	<?php }


	/* Shortcodes
	 *
	* Button  */
	function visia_button($atts, $content = null) {
		extract(shortcode_atts(array('link' => '#'), $atts ));

		$ghostKey = array_search('ghost', $atts);
		$extraClasses = '';

		if(is_int($ghostKey)) {
			$extraClasses .= ' ghost';
		}

		return '<a class="button'. $extraClasses .'" href="'. $link .'">'. $content .'</a>';
	} add_shortcode('button', 'visia_button');


    /* Jaren ervaring */
	function visia_years() {
		$visiaStart = strtotime("2012-10-17 00:00:00");
		$now = strtotime("now");
		$diff = abs($now - $visiaStart);

		return floor($diff / (365*60*60*24));
	} add_shortcode('visiaren', 'visia_years');


    /* Highlight */
	function visia_shortcode_highlight($atts, $content = null) {
		$string = '';
		$words = explode(' ', $content);

		foreach ($words as $word) {
			$string .= '<span class="css-highlight js-highlight">'.$word.'</span> ';
		}

		return rtrim($string);
	} add_shortcode('h', 'visia_shortcode_highlight');


    /* Blog download */
	function visia_shortcode_blog_download($atts) {
        $atts = shortcode_atts(array(
            'id' => '',
        ), $atts);

		ob_start();

		require 'template-parts/shortcodes/blog-download.php';

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	} add_shortcode('blog_download', 'visia_shortcode_blog_download');


	/* Table of contents */
	function visia_shortcode_inhoudsopgave() {
		return '<nav class="table-of-contents js-table-of-contents"><h3 class="table-of-contents__title css-title">'.__('Table of contents', 'visia').'</h3><ol class="table-of-contents__list js-table-of-contents-list"></ol></nav>';
	} add_shortcode('inhoudsopgave', 'visia_shortcode_inhoudsopgave');


	/* Blockquote */
	function visia_shortcode_blockquote($atts) {
		$atts = shortcode_atts(array(
            'text' => null,
        ), $atts);

        if($text = $atts['text']) {
			return '<blockquote class="blockquote css-title js-blockquote">'.$text.'</blockquote>';
        }
	} add_shortcode('blockquote', 'visia_shortcode_blockquote');


    /* Checklist */
	function visia_shortcode_checklist($atts, $content = null) {
		return '<div class="checklist js-checklist">'.$content.'</div>';
	} add_shortcode('checklist', 'visia_shortcode_checklist');


	/* Presentation first name */
	function visia_shortcode_presentation_first_name() {
		return '<span class="js-presentation-first-name-placeholder"></span>';
	} add_shortcode('presentatie_voornaam', 'visia_shortcode_presentation_first_name');


	/* Presentation business */
	function visia_shortcode_presentation_business() {
		return '<span class="js-presentation-business-name-placeholder"></span>';
	} add_shortcode('presentatie_bedrijfsnaam', 'visia_shortcode_presentation_business');


	/* Filter for the archive title */
	add_filter('get_the_archive_title', function ($title) {
		if (is_category()) {
			$title = single_cat_title('', false);
		} elseif (is_tag()) {
			$title = single_tag_title('', false);
		} elseif (is_author()) {
			$title = get_the_author_meta('first_name').' '.get_the_author_meta('last_name');
		} elseif (is_post_type_archive()) {
			$title = post_type_archive_title('', false);
		}
		return $title;
	});


    /* Rewrite author slug */
	function custom_author_base() {
		global $wp_rewrite;
		$wp_rewrite->author_base = 'auteur';
	} add_action('init', 'custom_author_base');


    /* Filter to remove <p>'s around <img>-tags */
	function filter_ptags_on_images($content) {
		return preg_replace('/<p>(\s*)(<img .* \/>)(\s*)<\/p>/iU', '\2', $content);
	} add_filter('the_content', 'filter_ptags_on_images');


	/* Filter for Simply Static base url */
	add_filter('ss_origin_url', function($url) {
		$url = 'https://www.visia-staging.nl/';
		return $url;
	});


	/* Removing the content editor for all pages */
	function remove_content_editor() {
		remove_post_type_support('page', 'editor');
	} add_action('admin_head', 'remove_content_editor');


	/* Disabling WordPress lazy-load */
	add_filter( 'wp_lazy_loading_enabled', '__return_false' );


    /* Custom menu walker for main menu */
	class visia_main_menu_walker extends Walker_Nav_Menu {
		function start_el(&$output, $item, $depth=0, $args=[], $id=0) {
			$output .= "<li class='main-menu__container__menu__item js-main-menu-item'>";

			$output .= "<div class='js-main-menu-item-wrapper'>";

			$output .= '<a id="menuItem'.$item->object_id.'" class="main-menu__container__menu__item__link js-main-menu-item-link'.(($item->current) ? ' js-main-menu-item-link-active' : '').'" href="'.$item->url.'" data-no-blobity>';

			$output .= $item->title;

			$output .= '</a>';

			$output .= '<span class="main-menu__container__menu__item__masker js-main-menu-item-masker" aria-hidden="true">'.$item->title.'</span>';

			$output .= '</div>';
		}
	}



	/* Add classes to previous- and next-posts link (blog overview) */
	function posts_link_attributes_next() {
		return 'class="js-nav-next"';
	} add_filter('next_posts_link_attributes', 'posts_link_attributes_next');

	function posts_link_attributes_prev() {
		return 'class="js-nav-prev"';
	} add_filter('previous_posts_link_attributes', 'posts_link_attributes_prev');



	/* Add styling for ACF group fields */
	function visia_acf_group_styles() { ?>
        <style type="text/css">
            .acf-field-group.no-style,
            .acf-field-clone.no-style {
                padding: 0 !important;
            }
            .acf-field-group.no-style > .acf-label,
            .acf-field-clone.no-style > .acf-label {
                display: none !important; /* If you want the Group's label to show, remove this style */
            }
            .acf-field-group.no-style > .acf-input > .acf-fields.-border,
            .acf-field-clone.no-style > .acf-input > .acf-fields.-border {
                border: 0 !important;
            }
        </style>
	<?php } add_action( 'acf/input/admin_head', 'visia_acf_group_styles' );



	/* Custom post types - Thank you pages */
	function custom_post_type_visia_thankyou() {
		register_post_type('thankyoupage', array(
			'label'                 => __('Thank you pages', 'visia'),
			'description'           => __('All thank you pages', 'visia'),
			'labels'                => array(
				'name'                  => __('Thank you pages', 'visia'),
				'singular_name'         => __('Thank you page', 'visia'),
				'menu_name'             => __('Thank you pages', 'visia'),
				'name_admin_bar'        => __('Thank you pages', 'visia'),
				'archives'              => __('Thank you pages', 'visia')
			),
			'supports'              => array('title'),
			'hierarchical'          => false,
			'public'                => true,
			'show_ui'               => true,
			'show_in_menu'          => true,
			'menu_position'         => 22,
			'menu_icon'             => 'dashicons-thumbs-up',
			'show_in_admin_bar'     => true,
			'show_in_nav_menus'     => true,
			'can_export'            => true,
			'has_archive'           => false,
			'exclude_from_search'   => false,
			'publicly_queryable'    => true,
			'capability_type'       => 'post',
			'rewrite' 				=> array(
				'slug'                  => 'bedankt',
				'with_front'            => false
			)
		));
	} add_action('init', 'custom_post_type_visia_thankyou', 0 );



	/* Custom post types - Reviews */
	function custom_post_type_visia_blog_downloads() {
		register_post_type('blog_downloads', array(
			'label'                 => __('Blog downloads', 'visia'),
			'description'           => __('All blog downloads', 'visia'),
			'labels'                => array(
				'name'                  => __('Blog downloads', 'visia'),
				'singular_name'         => __('Blog download', 'visia'),
				'menu_name'             => __('Blog downloads', 'visia'),
				'name_admin_bar'        => __('Blog downloads', 'visia'),
				'archives'              => __('Blog downloads', 'visia')
			),
			'supports'              => array('title'),
			'hierarchical'          => false,
			'public'                => true,
			'show_ui'               => true,
			'show_in_menu'          => true,
			'menu_position'         => 6,
			'menu_icon'             => 'dashicons-open-folder',
			'show_in_admin_bar'     => true,
			'show_in_nav_menus'     => false,
			'can_export'            => true,
			'has_archive'           => false,
			'exclude_from_search'   => false,
			'publicly_queryable'    => false,
			'capability_type'       => 'post'
		));
	} add_action('init', 'custom_post_type_visia_blog_downloads', 0 );


    /* Custom post types - Projects */
	function custom_post_type_visia_cases() {
		register_post_type('case', array(
			'label'                 => __('Cases', 'visia'),
			'description'           => __('All cases', 'visia'),
			'labels'                => array(
				'name'                  => __('Cases', 'visia'),
				'singular_name'         => __('Case', 'visia'),
				'menu_name'             => __('Cases', 'visia'),
				'name_admin_bar'        => __('Cases', 'visia'),
				'archives'              => __('Cases', 'visia')
			),
			'supports'              => array('title', 'thumbnail', 'page-attributes'),
			'hierarchical'          => false,
			'public'                => true,
			'show_ui'               => true,
			'show_in_menu'          => true,
			'menu_position'         => 7,
			'menu_icon'             => 'dashicons-align-wide',
			'show_in_admin_bar'     => true,
			'show_in_nav_menus'     => true,
			'can_export'            => true,
			'has_archive'           => 'case-archive',
			'exclude_from_search'   => false,
			'publicly_queryable'    => true,
			'capability_type'       => 'post',
			'rewrite' 				=> array(
				'slug'                  => 'cases',
				'with_front'            => false
			)
		));
	} add_action('init', 'custom_post_type_visia_cases', 0 );

	function visia_cases_archive_custom_query($query) {
		if ($query->is_post_type_archive('case') && !is_admin() && $query->is_main_query()) {
			$query->set('posts_per_page', 6);
			$query->set('order', 'ASC');
			$query->set('orderby', 'menu_order');

			$offset = 6;
            if(!$query->is_paged()) {
	            $query->set('offset', $offset);
            } else {
	            $paged = 0 == $query->get( 'paged' ) ? 1 : $query->get( 'paged' );
	            $query->set('offset', $paged * $offset);
            }
		}

		return $query;
	} add_filter('pre_get_posts', 'visia_cases_archive_custom_query');


	/* Custom post types - Reviews */
	function custom_post_type_visia_reviews() {
		register_post_type('review', array(
			'label'                 => __('Reviews', 'visia'),
			'description'           => __('All reviews', 'visia'),
			'labels'                => array(
				'name'                  => __('Reviews', 'visia'),
				'singular_name'         => __('Review', 'visia'),
				'menu_name'             => __('Reviews', 'visia'),
				'name_admin_bar'        => __('Reviews', 'visia'),
				'archives'              => __('Reviews', 'visia')
			),
			'supports'              => array('title', 'thumbnail'),
			'hierarchical'          => false,
			'public'                => true,
			'show_ui'               => true,
			'show_in_menu'          => true,
			'menu_position'         => 8,
			'menu_icon'             => 'dashicons-format-status',
			'show_in_admin_bar'     => true,
			'show_in_nav_menus'     => false,
			'can_export'            => true,
			'has_archive'           => false,
			'exclude_from_search'   => false,
			'publicly_queryable'    => false,
			'capability_type'       => 'post'
		));
	} add_action('init', 'custom_post_type_visia_reviews', 0 );

} add_action('after_setup_theme', 'visia_basis_setup');



/* Register and enqueue all scripts */
function visia_scripts(){
    $distFiles = glob(get_template_directory(). '/dist/*.js');
    $appDeps = array();
    $gsapCount = $swupCount = $vendorCount = 0;

    foreach($distFiles as $file) {
        $filename = basename($file);
        $handle = null;

        /* Determine script type */
	    if(str_starts_with($filename, 'gsap')) {
		    $gsapCount++;

		    if($gsapCount == 1) {
                $handle = 'gsap';
            } else {
	            $handle = 'gsap-'.$gsapCount;
            }
	    } elseif(str_starts_with($filename, 'swup')) {
		    $swupCount++;

		    if($swupCount == 1) {
			    $handle = 'swup';
		    } else {
			    $handle = 'swup-'.$swupCount;
		    }
	    } elseif(str_starts_with($filename, 'vendor')) {
		    $vendorCount++;

		    if($vendorCount == 1) {
			    $handle = 'vendor';
		    } else {
			    $handle = 'vendor-'.$vendorCount;
		    }
	    } elseif(str_starts_with($filename, 'app')) {
		    continue;
        }

        /* Register script */
	    wp_register_script($handle, get_template_directory_uri() .'/dist/'.$filename, null, null, array(
		        //'strategy'  => 'defer',
                'in_footer' => true
        ));

        /* Push handle as dependency */
        if($handle) {
	        $appDeps[] = $handle;
        }
    }

    /* Enqueue app.js with all dependencies */
	wp_enqueue_script('app', get_template_directory_uri() .'/dist/app.js', $appDeps, null, true);
} add_action('wp_enqueue_scripts', 'visia_scripts');



/* Run a full static export using WP-cron */
add_action('visia_simply_static_cron', 'ssp_run_static_export_cron');
/**
 * Run a full static export daily via WP-CRON.
 *
 * @return void
 */
function ssp_run_static_export_cron() {
	$simply_static = Simply_Static\Plugin::instance();
	$simply_static->run_static_export();
}


add_filter('ssp_github_tree_chunk_size', function( $chunk_size ) {
	$chunk_size = 250; // default is 500.
	return $chunk_size;
});

/* Enqueue styles */
function visia_inject_inline_css() {
	function minify($data) {
		$data = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $data);
		$data = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $data);
		return $data;
	}

    if($resetStyles = minify(file_get_contents('wp-content/themes/visia/dist/reset.min.css'))) {
	    echo '<style id="inline-visia-reset" type="text/css">'.str_replace("../../fonts/", get_template_directory_uri() . '/assets/fonts/', $resetStyles).'</style>';
    }

    if($awesomeStyles = minify(file_get_contents('wp-content/themes/visia/assets/fontawesome-subset/css/all.min.css'))) {
        echo '<style id="inline-font-awesome" type="text/css">'.str_replace("../", get_template_directory_uri() . '/assets/fontawesome-subset/', $awesomeStyles).'</style>';
    }

	echo '<link rel="stylesheet" id="bundle-css" href="'.site_url('/wp-content/themes/visia/dist/bundle.min.css').'" type="text/css" media="all" />';
} add_action('wp_head', 'visia_inject_inline_css');

function visia_styles() {
    /* Remove default WP css */
	wp_dequeue_style('global-styles');
	wp_dequeue_style('classic-theme-styles');
	wp_dequeue_style('wp-block-library');
	wp_dequeue_style('wp-block-library-theme');

    //echo '<link rel="stylesheet" id="bundle-css" href="'.site_url('/wp-content/themes/visia/dist/bundle.min.css').'" type="text/css" media="all" />';
} add_action('wp_enqueue_scripts', 'visia_styles');



/* Add class for generating and modifying colors */
class Sasser {
	private $hexChars = array('a' => 10, 'b' => 11, 'c' => 12, 'd' => 13, 'e' => 14, 'f' => 15);

	public function toRGB($hex) {
		if (is_array($hex)) return $hex;
		if (substr($hex, 0, 1) === '#') $hex = substr($hex, 1);
		if (strlen($hex) === 3) $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
		if (strlen($hex) !== 6) return 'Error: Invalid hex value';

		$rgb = array(0, 0, 0);
		$rgb[0] = str_pad((string) hexdec($hex[0] . $hex[1]), 2, '0', STR_PAD_LEFT);
		$rgb[1] = str_pad((string) hexdec($hex[2] . $hex[3]), 2, '0', STR_PAD_LEFT);
		$rgb[2] = str_pad((string) hexdec($hex[4] . $hex[5]), 2, '0', STR_PAD_LEFT);
		return $rgb;
	}

	public function toHex($rgb) {
		$hex = '#';
		for ($i = 0; $i < count($rgb);	$i++) {
			$hex .= str_pad(dechex(round($rgb[$i])), 2, '0', STR_PAD_LEFT);
		}
		return $hex;
	}

	public function lighten($hex, $percent) {
		$rgb = $this->toRGB($hex);
		$hsl = $this->toHSL($rgb);

		if (is_string($percent) && substr($percent, -1) === '%') $percent = (float) substr($percent, 0, -1);
		$hsl[2] += $percent;
		return $this->toHex($this->HSLtoRGB($hsl));
	}

	public function darken($hex, $percent) {
		$rgb = $this->toRGB($hex);
		$hsl = $this->toHSL($rgb);

		if (is_string($percent) && substr($percent, -1) === '%') $percent = (int) substr($percent, 0, -1);
		$hsl[2] -= $percent;
		return $this->toHex($this->HSLtoRGB($hsl));
	}

	public function hueToRGB($p, $q, $decHue) {
		if ($decHue < 0) $decHue += 1;
		else if ($decHue > 1) $decHue -= 1;

		if ($decHue * 6 < 1) return $p + ($q - $p) * $decHue * 6;
		if ($decHue * 2 < 1) return $q;
		if ($decHue * 3 < 2) return $p + ($q - $p) * (2/3 - $decHue) * 6;

		return $p;
	}
	// hue from 0 to 360, saturation and lightness from 0 to 100
	public function HSLtoRGB($hsl) {
		$hue = $hsl[0]; $saturation = $hsl[1]; $lightness = $hsl[2];
		if ($hue < 0) $hue += 360;

		$decHue = $hue / 360;
		$decSaturation = min(100, max(0, $saturation)) / 100;
		$decLightness = min(100, max(0, $lightness)) / 100;

		$q = $decLightness <= 0.5 ? $decLightness * ($decSaturation + 1) : $decLightness + $decSaturation - $decLightness * $decSaturation;
		$p = $decLightness * 2 - $q;

		$red = $this->hueToRGB($p, $q, $decHue + 1/3) * 255;
		$green = $this->hueToRGB($p, $q, $decHue) * 255;
		$blue = $this->hueToRGB($p, $q, $decHue - 1/3) * 255;

		return array($red, $green, $blue);
	}
	public function toHSL($rgb) {
		$red = $rgb[0]; $green = $rgb[1]; $blue = $rgb[2];
		$max = max($red, $green, $blue);
		$min = min($red, $green, $blue);

		$lightness = $max + $min;

		if ($max === $min) {
			$saturation = $hue = 0;
		} else {
			$diff = $max - $min;

			if ($lightness < 255) $saturation = $diff / $lightness;
			else $saturation = $diff / (510 - $lightness);

			if ($max === $red) $hue = 60 * ($green - $blue) / $diff;
			elseif ($max === $green) $hue = 60 * ($blue - $red) / $diff + 120;
			elseif ($max === $blue) $hue = 60 * ($red - $green) / $diff + 240;
		}

		return array(fmod($hue, 360), $saturation * 100, $lightness / 5.1);
	}
}


/* Function for outputting the color change trigger */
function global_color_change_trigger($colorScheme, $background = null, $text = null) {
	global $currBackground, $currText, $scrollTriggerCount;

	if($colorScheme == 'blue') {
		$background = '#232C48';
		$text = '#ffffff';
		$plainText = '#acb0ba';
		$visualFilter = 'invert(1)';
        $lightBorderColor = '#ffffff0F';
		$darkBorderColor = '#ffffff40';
        $dropShadowColor = '#ffffff0D';
	} elseif($colorScheme == 'white') {
		$background = '#ffffff';
		$text = '#212121';
		$plainText = '#6e6e6e';
		$visualFilter = 'invert(0)';
		$lightBorderColor = '#2121210F';
		$darkBorderColor = '#21212140';
		$dropShadowColor = '#2121210D';
	} else {
		$plainText = $text.'A6';

		/* Access class */
		$sasser = new Sasser();

		/* Find visual filter */
		$backgroundRGB = $sasser->toRGB($background);
		$backgroundHSL = $sasser->toHSL($backgroundRGB);
		$backgroundLightness = $backgroundHSL[2];

		if($backgroundLightness > 50) {
			$visualFilter = 'invert(0)';
		} else {
			$visualFilter = 'invert(1)';
		}

		$lightBorderColor = $text.'0F';
		$darkBorderColor = $text.'40';
		$dropShadowColor = $text.'0D';
	}

	if($currBackground != $background || $currText != $text) {
		$scrollTriggerCount--;

		echo '<div class="js-global-color-change-trigger" data-background="'.$background.'" data-text="'.$text.'" data-plaintext="'.$plainText.'" data-st-count="'.$scrollTriggerCount.'" data-light-border="'.$lightBorderColor.'" data-dark-border="'.$darkBorderColor.'" data-drop-shadow="'.$dropShadowColor.'" data-visual-filter="'.$visualFilter.'"></div>';
	}

	$currBackground = $background;
	$currText = $text;
}


/* Function for outputting the global button */
function global_button($buttonLabel, $buttonTarget, $buttonLocation = 'internal', $buttonWrapperClasses = null, $buttonClasses = null) {
	if($buttonLocation == 'internal') {
		$buttonIcon = '<i class="css-global-button-icon fa-regular fa-arrow-right"></i>';
	} elseif($buttonLocation == 'external') {
		$buttonIcon = '<i class="css-global-button-icon fa-regular fa-arrow-up-right"></i>';
	}

    $goBack = false;
    if($buttonTarget == 'back') {
	    $goBack = true;
	    $buttonIcon = '<i class="css-global-button-icon fa-regular fa-arrow-left"></i>';
    }
	echo '<div'.(($buttonWrapperClasses) ? ' class="'.$buttonWrapperClasses.'"' : '').'><a class="css-global-button js-global-button'.(($buttonClasses) ? ' '.$buttonClasses : '').'" '.(($goBack) ? 'onclick="history.back()"' : 'href="'.esc_url($buttonTarget).'"').' '.(($buttonLocation == 'external') ? ' target="_blank"' : '').'><span class="css-global-button-text">'.$buttonLabel.'</span><span class="css-global-button-icon-wrapper js-global-button-icon">'.$buttonIcon.'<span class="css-global-button-fill js-global-button-fill"></span></span></a></div>';
} ?>