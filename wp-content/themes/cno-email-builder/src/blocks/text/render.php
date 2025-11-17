<?php
/**
 * Text Block Template
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
$is_link          = ! empty( $link_destination );

$styles = array(
	'display: ' . ( $is_link ? 'inline-block' : 'block' ),
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

$style_attr = implode( '; ', $styles );

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
		style="<?php echo esc_attr( $style_attr ); ?>"
		align="<?php echo esc_attr( $text_align ); ?>"
	>
		<?php echo wp_kses_post( $content ); ?>
	</a>
<?php else : ?>
	<p style="<?php echo esc_attr( $style_attr ); ?>" align="<?php echo esc_attr( $text_align ); ?>">
		<?php echo wp_kses_post( $content ); ?>
	</p>
<?php endif; ?>
