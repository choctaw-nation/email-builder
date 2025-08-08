<?php
/**
 * Email Body output
 *
 * @package ChoctawNation
 */

$preview_text = isset( $block->context['cno-email-blocks/previewText'] ) ? $block->context['cno-email-blocks/previewText'] : null;
$style_string = 'margin:0;padding:0;-webkit-text-size-adjust:none;';

if ( ! empty( $attributes['backgroundColor'] ) ) {
	$style_string .= "background-color:{$attributes['backgroundColor']}";
}
echo "<body style='{$style_string}'>";
?>
<?php if ( ! empty( $preview_text ) ) : ?>
	<div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0" data-skip-in-text="true">
		<?php echo $preview_text; ?>
	</div>
<?php endif; ?>
<?php
echo $content;
