<?php
/**
 * Button Block Template
 *
 * @package ChoctawNation
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

$content          = $attributes['content'] ?? '';
$link_destination = $attributes['linkDestination'] ?? '';
$link_target      = $attributes['linkTarget'] ?? '';
$rel              = $attributes['rel'] ?? '';
$text_align       = $attributes['textAlign'] ?? 'left';
$background_color = $attributes['backgroundColor'] ?? 'white';
$border_color     = $attributes['borderColor'] ?? '';
$border_width     = $attributes['borderWidth'] ?? 2;
$border_radius    = $attributes['borderRadius'] ?? 0;

$styles = array(
	'display: inline-block',
	'text-decoration: none',
	'text-align: ' . esc_attr( $text_align ),
	'background-color: ' . esc_attr( $background_color ),
	'border-width: ' . esc_attr( $border_width ) . 'px',
	'border-style: solid',
);

if ( ! empty( $border_color ) ) {
	$styles[] = 'border-color: ' . esc_attr( $border_color );
}

if ( $border_radius ) {
	$styles[] = 'border-radius: ' . esc_attr( $border_radius ) . 'px';
}

$typography_styles = cno_calc_typography_styles( $attributes );
if ( ! empty( $typography_styles ) ) {
	$styles[] = $typography_styles;
}

$spacing_styles = cno_calc_spacing_styles( $attributes );
if ( ! empty( $spacing_styles ) ) {
	$styles[] = $spacing_styles;
}

$style_attr = implode( '; ', $styles );
?>
<a
	href="<?php echo esc_url( $link_destination ); ?>"
	<?php if ( $link_target ) : ?>
		target="<?php echo esc_attr( $link_target ); ?>"
	<?php endif; ?>
	<?php if ( $rel ) : ?>
		rel="<?php echo esc_attr( $rel ); ?>"
	<?php endif; ?>
	style="<?php echo esc_attr( $style_attr ); ?>"
	align="<?php echo esc_attr( $text_align ); ?>"
>
	<?php echo wp_kses_post( $content ); ?>
</a>
