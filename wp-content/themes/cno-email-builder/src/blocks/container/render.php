<?php
/**
 * Container Block Template
 *
 * @package ChoctawNation
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

$background_color = $attributes['backgroundColor'] ?? 'gray';
$max_width        = $attributes['maxWidth'] ?? 600;

$styles = array(
	'max-width: ' . intval( $max_width ) . 'px',
	'background-color: ' . esc_attr( $background_color ),
);

$spacing_styles = cno_calc_spacing_styles( $attributes );
if ( ! empty( $spacing_styles ) ) {
	$styles[] = $spacing_styles;
}

$style_attr = implode( '; ', $styles );
?>
<table
	align="center"
	width="100%"
	border="0"
	cellpadding="0"
	cellspacing="0"
	role="presentation"
	style="<?php echo esc_attr( $style_attr ); ?>"
	bgcolor="<?php echo esc_attr( $background_color ); ?>"
>
	<tbody>
		<tr style="width: 100%">
			<td style="background-color: <?php echo esc_attr( $background_color ); ?>" bgcolor="<?php echo esc_attr( $background_color ); ?>">
				<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</td>
		</tr>
	</tbody>
</table>
