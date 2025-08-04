<?php
/**
 * Email `<head>` output
 *
 * @package ChoctawNation
 */

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" dir="ltr" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="UTF-8">
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
	<meta name="x-apple-disable-message-reformatting">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php echo ! empty( $block->context['cno-email-blocks/title'] ) ? esc_html( $block->context['cno-email-blocks/title'] ) : 'Email Preview: ' . get_the_title() . ' | ' . get_bloginfo( 'site_title' ); ?></title>
	<?php
	if ( isset( $attributes['responsiveBlocks'] ) ) {
		echo '<style>';
		if ( in_array( 'col', $attributes['responsiveBlocks'], true ) ) {
			echo '@media screen and (max-width:450px) {
			.responsive-col {
				width: 100% !important;
				display:block!important;
			}
			.responsive-col.not-last {
				margin-bottom:10px;
			}
			}';
		}
		echo '</style>';
	}
	?>
</head>
