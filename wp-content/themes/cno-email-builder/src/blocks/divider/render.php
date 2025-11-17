<?php
/**
 * Divider Block Template
 *
 * @package ChoctawNation
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

$border       = $attributes['border'] ?? array();
$width        = $attributes['width'] ?? '100%';
$border_color = $border['color'] ?? '#000000';
$border_width = $border['width'] ?? 1;
$border_style = $border['style'] ?? 'solid';

$styles = array(
	'border: 0',
	'border-color: ' . esc_attr( $border_color ),
	'border-top-width: ' . esc_attr( $border_width ) . 'px',
	'border-style: ' . esc_attr( $border_style ),
);

if ( $width && '100%' !== $width ) {
	$styles[] = 'margin-left: auto';
	$styles[] = 'margin-right: auto';
	$styles[] = 'width: ' . esc_attr( $width );
}

$spacing_styles = cno_calc_spacing_styles( $attributes );
if ( ! empty( $spacing_styles ) ) {
	$styles[] = $spacing_styles;
}

$style_attr = implode( '; ', $styles );
?>
<hr style="<?php echo esc_attr( $style_attr ); ?>" />
