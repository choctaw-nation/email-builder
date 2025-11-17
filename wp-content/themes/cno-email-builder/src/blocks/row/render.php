<?php
/**
 * Row Block Template
 *
 * @package ChoctawNation
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

$max_width = $attributes['maxWidth'] ?? 600;
$max_width = min( $max_width, 600 );

$styles = array(
	'max-width: ' . intval( $max_width ) . 'px',
);

if ( $max_width < 600 ) {
	$styles[] = 'margin-left: auto';
	$styles[] = 'margin-right: auto';
}

$spacing_styles = cno_calc_spacing_styles( $attributes );
if ( ! empty( $spacing_styles ) ) {
	$styles[] = $spacing_styles;
}

$style_attr = implode( '; ', $styles );
?>
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="<?php echo esc_attr( $style_attr ); ?>">
	<tbody style="width: 100%">
		<tr style="width: 100%">
			<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</tr>
	</tbody>
</table>
