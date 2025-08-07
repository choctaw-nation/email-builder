<?php
/**
 * Basic Header Template
 *
 * @package ChoctawNation
 */

?>

<!DOCTYPE html>
<html lang="<?php bloginfo( 'language' ); ?>">

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	<header class="container-fluid navbar border-bottom border-2 border-black bg-white" style="--bs-navbar-padding-x:var(--bs-gutter-x);">
		<a class="navbar-brand my-2 align-items-md-center" href="<?php echo esc_url( site_url() ); ?>" class="logo" aria-label="to Home Page">
			<?php echo bloginfo( 'title' ); ?>
		</a>
	</header>
