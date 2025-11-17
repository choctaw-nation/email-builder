<?php
/**
 * Heading Block Template
 *
 * @package ChoctawNation
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

$level      = $attributes['level'] ?? 2;
$content    = $attributes['content'] ?? '';
$text_align = $attributes['textAlign'] ?? 'left';

$styles = array(
	'text-align: ' . esc_attr( $text_align ),
);

$typography_styles = cno_calc_typography_styles( $attributes );
if ( ! empty( $typography_styles ) ) {
	$styles[] = $typography_styles;
}

$spacing_styles = cno_calc_spacing_styles( $attributes );
if ( ! empty( $spacing_styles ) ) {
	$styles[] = $spacing_styles;
}

$style_attr  = implode( '; ', $styles );
$heading_tag = 'h' . intval( $level );
?>
<<?php echo esc_attr( $heading_tag ); ?> style="<?php echo esc_attr( $style_attr ); ?>" align="<?php echo esc_attr( $text_align ); ?>">
	<?php echo wp_kses_post( $content ); ?>
</<?php echo esc_attr( $heading_tag ); ?>>
