<?php
/**
 * Email Wrapper Block Template
 *
 * @package ChoctawNation
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

$preview_text      = $attributes['previewText'] ?? '';
$background_color  = $attributes['backgroundColor'] ?? '#C8C8C8';
$font_url          = $attributes['fontUrl'] ?? '';
$headings_font     = $attributes['headingsFont'] ?? array();
$body_font         = $attributes['bodyFont'] ?? array();
$responsive_blocks = $attributes['responsiveBlocks'] ?? array();
$email_title       = $attributes['title'] ?? get_the_title();

$has_responsive_blocks = ! empty( $responsive_blocks );
?>
<html lang="en" dir="ltr">
	<head>
		<meta charset="UTF-8" />
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
		<meta name="x-apple-disable-message-reformatting" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title><?php echo esc_html( $email_title ); ?></title>
		<?php if ( $has_responsive_blocks ) : ?>
			<style>
				@import url("<?php echo esc_url( $font_url ); ?>");
				:where(.email-wrapper__body) {
					<?php echo cno_email_font_styles( $headings_font, $body_font ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				}

				@media screen and (max-width:450px) {
					.responsive-col {
						width: 100% !important;
						display:block!important;
						padding:0!important;
					}
					.responsive-col.not-last {
						margin-bottom:10px;
					}
				}
			</style>
		<?php endif; ?>
	</head>
	<body style="margin: 0; padding: 0; background-color: <?php echo esc_attr( $background_color ); ?>" bgcolor="<?php echo esc_attr( $background_color ); ?>">
		<div style="display: none; overflow: hidden; line-height: 1px; opacity: 0; max-height: 0; max-width: 0" data-skip-in-text="true">
			<?php echo esc_html( $preview_text ); ?>
		</div>
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</body>
</html>
