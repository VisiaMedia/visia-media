<!doctype html>
<html <?php language_attributes(); ?>>
<head>

	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-title" content="<?php esc_attr_e(get_bloginfo('name')); ?>">
	<meta name="application-name" content="<?php esc_attr_e(get_bloginfo('name')); ?>">
	<meta name="msapplication-TileColor" content="#ea2c76">
	<meta name="msapplication-TileImage" content="<?php bloginfo('template_directory');?>/assets/favicon/mstile-144x144.png">
	<meta name="msapplication-config" content="<?php bloginfo('template_directory');?>/assets/favicon/browserconfig.xml">
	<meta name="theme-color" content="#1b2843">

	<?php wp_head(); ?>

	<link rel="icon" type="image/svg+xml" href="<?php bloginfo('template_directory');?>/assets/favicon/favicon.svg">
	<link rel="icon" type="image/png" href="<?php bloginfo('template_directory');?>/assets/favicon/favicon.png">
	<link rel="shortcut icon" href="<?php bloginfo('template_directory');?>/assets/favicon/favicon.ico">
	<link rel="apple-touch-icon" sizes="180x180" href="<?php bloginfo('template_directory');?>/assets/favicon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="<?php bloginfo('template_directory');?>/assets/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="194x194" href="<?php bloginfo('template_directory');?>/assets/favicon/favicon-194x194.png">
	<link rel="icon" type="image/png" sizes="192x192" href="<?php bloginfo('template_directory');?>/assets/favicon/android-chrome-192x192.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php bloginfo('template_directory');?>/assets/favicon/favicon-16x16.png">
	<link rel="manifest" href="<?php bloginfo('template_directory');?>/assets/favicon/site.webmanifest">
	<link rel="mask-icon" href="<?php bloginfo('template_directory');?>/assets/favicon/safari-pinned-tab.svg" color="#ea2c76">
</head>

<body <?php body_class(); ?>>

<?php wp_footer(); ?>

<main>
	<?php if(have_posts()) { ?>
		<section class="project-grid js-project-grid">
			<div class="css-max-text-width">
				<ul class="project-grid__list js-project-grid-list">
					<?php while(have_posts()) { the_post(); ?>
						<li class="project-grid__list__item js-project-grid-item">
							<a class="project-grid__list__item__link js-project-grid-item-link" href="<?php the_permalink(); ?>" rel="bookmark" data-no-blobity>
								<div class="project-grid__list__item__visual">
									<?php if(has_post_thumbnail()) {
										echo wp_get_attachment_image(get_post_thumbnail_id(), 'project-grid-use-retina', null, array('class' => 'project-grid__list__item__visual__image js-project-grid-item-visual'));
									} ?>
								</div>

								<h2 class="project-grid__list__item__title css-title">
									<?php the_title();

									if($caseStatement = get_field('case_statement')) {
										echo ' &mdash; <span class="project-grid__list__item__title__statement">'.$caseStatement.'</span>';
									} ?>
								</h2>
							</a>
						</li>
					<?php } ?>

					<li class="js-grid-sizer"></li>
					<li class="js-gutter-sizer"></li>
				</ul>

                <?php $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

                if($paged * 6 + 6 <= $caseCount = wp_count_posts('case')->publish) {
	                next_posts_link(__('Next page', 'visia'));
                } ?>
			</div>
		</section>
	<?php } ?>
</main>

</body>
</html>