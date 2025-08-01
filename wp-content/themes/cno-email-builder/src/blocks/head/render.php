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
	<?php wp_head(); ?>
	<title><?php echo esc_html( $block->context['cno-email-blocks/title'] ); ?></title>
</head>
