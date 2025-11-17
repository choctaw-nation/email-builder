<?php
/**
 * Column Block Template
 *
 * @package ChoctawNation
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

$is_responsive = $attributes['isResponsive'] ?? true;
$is_last_block = $attributes['isLastBlock'] ?? false;
$align         = $attributes['align'] ?? '';
$width         = $attributes['width'] ?? '';
$height        = $attributes['height'] ?? '';
$padding       = $attributes['parsedPadding'] ?? array();

$classes = array();
if ( $is_responsive ) {
	$classes[] = 'responsive-col';
}
if ( ! $is_last_block ) {
	$classes[] = 'not-last';
}

$styles = array();

if ( ! empty( $padding ) ) {
	foreach ( $padding as $side => $value ) {
		$styles[] = 'padding-' . esc_attr( $side ) . ': ' . esc_attr( $value );
	}
}

if ( $width ) {
	$styles[] = 'width: ' . esc_attr( $width );
}

if ( $height ) {
	$styles[] = 'height: ' . esc_attr( $height );
}

if ( $align ) {
	$styles[] = 'text-align: ' . esc_attr( $align );
}

if ( $width || $height ) {
	$styles[] = 'display: inline-block';
}

$class_attr  = implode( ' ', $classes );
$style_attr  = implode( '; ', $styles );
$width_attr  = $width ? str_replace( 'px', '', $width ) : '';
$height_attr = $height ? str_replace( 'px', '', $height ) : '';
?>
<td
	<?php if ( $class_attr ) : ?>
		class="<?php echo esc_attr( $class_attr ); ?>"
	<?php endif; ?>
	<?php if ( $width_attr ) : ?>
		width="<?php echo esc_attr( $width_attr ); ?>"
	<?php endif; ?>
	<?php if ( $height_attr ) : ?>
		height="<?php echo esc_attr( $height_attr ); ?>"
	<?php endif; ?>
	<?php if ( $align ) : ?>
		align="<?php echo esc_attr( $align ); ?>"
	<?php endif; ?>
	<?php if ( $style_attr ) : ?>
		style="<?php echo esc_attr( $style_attr ); ?>"
	<?php endif; ?>
>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</td>
