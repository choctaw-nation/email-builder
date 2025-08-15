<?php
/**
 * A blank page.
 *
 * @package ChoctawNation
 */

$email_wrapper_block = parse_blocks( get_the_content() )[0];
get_header();

$body_bg_color = isset( $email_wrapper_block['attrs']['backgroundColor'] ) ? $email_wrapper_block['attrs']['backgroundColor'] : 'gray';
echo "<style type='text/css'>body {background-color:{$body_bg_color}}</style>";
?>
<main class="container-xxl">
	<div class="row row-gap-3 my-3 min-vh-100 justify-content-center justify-content-md-between">
	<section class="col-12 col-md-8 order-2 order-md-1">
	<?php
	$content = cno_get_email_content( 'preview' );
	if ( ! $content ) {
		echo '<p>No content available for preview.</p>';
	} else {
		echo '<iframe srcdoc="' . esc_attr( $content ) . '" style="width:100%;height:100vh;border:none;"></iframe>';
	}
	?>
	</section>
	<aside class="col-auto flex-md-grow-0 col-md-4 bg-white order-1 order-md-2 p-3">
		<h1>Email Preview</h1>
		<div class="my-3"><p><strong>Preview Text:</strong> <?php echo $email_wrapper_block['attrs']['previewText']; ?></p></div>
		<?php if ( is_user_logged_in() ) : ?>
			<button class="btn btn-primary" id="download">Download HTML File</button>
			<form id="send-email-form" class="border border-2 border-black p-3 my-3">
				<div class="mb-3">
					<label for="recipient-email" class="form-label">Additional Recipient Email</label>
					<input type="email" class="form-control" id="recipient-email" name="recipient_email" placeholder="Enter email address">
				</div>
				<button type="submit" class="btn btn-outline-primary" id="send">Send WP Email</button>
			</form>
		<?php endif; ?>
	</aside>
	</div>
</main>
<?php
get_footer();
