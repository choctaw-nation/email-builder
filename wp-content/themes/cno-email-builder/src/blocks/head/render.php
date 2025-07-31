<?php
/**
 * Email `<head>` output
 *
 * @package ChoctawNation
 */

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
	<meta charset="UTF-8">
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
	<meta name="x-apple-disable-message-reformatting">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
	<title><?php echo esc_html( $block->context['cno-email-blocks/title'] ); ?></title>
</head>
