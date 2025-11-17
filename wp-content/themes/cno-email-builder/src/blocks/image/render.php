<?php
/**
 * Image Block Template
 *
 * @package ChoctawNation
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

$url              = $attributes['url'] ?? '';
$alt              = $attributes['alt'] ?? '';
$image_title      = $attributes['title'] ?? '';
$link_destination = $attributes['linkDestination'] ?? '';
$link_target      = $attributes['linkTarget'] ?? '';
$rel              = $attributes['rel'] ?? '';
$width            = $attributes['width'] ?? '100%';
$height           = $attributes['height'] ?? 'auto';
$scale            = $attributes['scale'] ?? 'cover';
$is_link          = ! empty( $link_destination );

$image_styles = array(
	'width: ' . esc_attr( $width ),
	'height: ' . esc_attr( $height ),
	'object-fit: ' . esc_attr( $scale ),
	'display: block',
);

$style_attr = implode( '; ', $image_styles );

if ( $is_link ) :
	?>
	<a
		href="<?php echo esc_url( $link_destination ); ?>"
		<?php if ( $link_target ) : ?>
			target="<?php echo esc_attr( $link_target ); ?>"
		<?php endif; ?>
		<?php if ( $rel ) : ?>
			rel="<?php echo esc_attr( $rel ); ?>"
		<?php endif; ?>
	>
		<img
			src="<?php echo esc_url( $url ); ?>"
			alt="<?php echo esc_attr( $alt ); ?>"
			<?php if ( $image_title ) : ?>
				title="<?php echo esc_attr( $image_title ); ?>"
			<?php endif; ?>
			style="<?php echo esc_attr( $style_attr ); ?>"
		/>
	</a>
<?php else : ?>
	<img
		src="<?php echo esc_url( $url ); ?>"
		alt="<?php echo esc_attr( $alt ); ?>"
		<?php if ( $image_title ) : ?>
			title="<?php echo esc_attr( $image_title ); ?>"
		<?php endif; ?>
		style="<?php echo esc_attr( $style_attr ); ?>"
	/>
<?php endif; ?>
