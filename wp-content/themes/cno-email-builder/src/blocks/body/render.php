<?php
/**
 * Email Body output
 *
 * @package ChoctawNation
 */

$preview_text = isset( $block->context['cno-email-blocks/previewText'] ) ? $block->context['cno-email-blocks/previewText'] : null;

echo '<body ' . get_block_wrapper_attributes( array( 'style' => 'margin:0;padding:0;-webkit-text-size-adjust:none' ) ) . '>';
?>
<?php if ( ! empty( $preview_text ) ) : ?>
	<div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0" data-skip-in-text="true">
		<?php echo $preview_text; ?>
	</div>
<?php endif; ?>
<?php
echo $content;
