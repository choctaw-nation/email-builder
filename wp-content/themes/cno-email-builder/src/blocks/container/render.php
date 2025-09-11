<?php
/**
 * Server-side rendering for the Container block.
 *
 * @package cno-email-builder
 */

$max_width        = isset( $attributes['maxWidth'] ) ? $attributes['maxWidth'] : '';
$background_color = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : 'gray';
$style            = '';
if ( $max_width ) {
	$style .= 'max-width:' . esc_attr( $max_width ) . 'px;';
	$style .= 'margin-left:auto;margin-right:auto;';
}
if ( $background_color ) {
	$style .= 'background-color:' . esc_attr( $background_color ) . ';';
}
	// Handle spacing attributes (margin/padding)
if ( isset( $attributes['margin'] ) && is_array( $attributes['margin'] ) ) {
	foreach ( $attributes['margin'] as $side => $value ) {
		$style .= 'margin-' . esc_attr( $side ) . ':' . esc_attr( $value ) . ';';
	}
}
if ( isset( $attributes['padding'] ) && is_array( $attributes['padding'] ) ) {
	foreach ( $attributes['padding'] as $side => $value ) {
		$style .= 'padding-' . esc_attr( $side ) . ':' . esc_attr( $value ) . ';';
	}
}
$table_attrs = 'style="' . esc_attr( $style ) . '" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"';
?>
<table <?php echo $table_attrs; ?>>
    <tbody>
        <tr style="width:100%">
            <td><?php echo $content; ?></td>
        </tr>
    </tbody>
</table>