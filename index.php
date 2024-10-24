<?php get_header();

if(have_rows('secties')) {
	echo '<main>';

	while(have_rows('secties')) { the_row();
		if(get_sub_field('is_module')) {
			get_template_part('template-parts/modules/'.get_row_layout());
		} else {
			get_template_part('template-parts/sections/block', get_row_layout());
		}
	}

	// Popunder
	get_template_part('template-parts/modules/popunder');

	echo '</main>';
}

get_footer(); ?>