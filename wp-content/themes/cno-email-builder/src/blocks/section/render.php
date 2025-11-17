<?php
/**
 * Section Block Template
 *
 * @package ChoctawNation
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

$align = $attributes['align'] ?? '';

$styles = array();

if ( $align ) {
	$styles[] = 'text-align: ' . esc_attr( $align );
}

$spacing_styles = cno_calc_spacing_styles( $attributes );
if ( ! empty( $spacing_styles ) ) {
	$styles[] = $spacing_styles;
}

$style_attr = implode( '; ', $styles );
?>
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="<?php echo esc_attr( $style_attr ); ?>">
	<tbody>
		<tr>
			<td>
				<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</td>
		</tr>
	</tbody>
</table>
