<?php
/**
 * A blank page.
 *
 * @package ChoctawNation
 */

use ChoctawNation\Email_Handler;

$email = new Email_Handler();
get_header();
echo "<style type='text/css'>body {background-color:{$email->bg_color}}</style>";
?>
<main class="container-xxl">
	<div class="row row-gap-3 my-3 min-vh-100 justify-content-center justify-content-md-between">
		<section class="col-12 col-md-8 order-2 order-md-1">
			<?php
			if ( ! $email->get_the_email_content() ) {
				echo '<p>No content available for preview.</p>';
			} else {
				echo '<iframe srcdoc="' . esc_attr( $email->get_the_email_content() ) . '" style="width:100%;height:100vh;border:none;"></iframe>';
			}
			?>
		</section>
		<aside class="col-auto flex-md-grow-0 col-md-4 bg-white order-1 order-md-2 p-3">
			<h1>Email Preview</h1>
			<div class="my-3">
				<p><strong>Preview Text:</strong> <?php $email->the_preview_text(); ?></p>
			</div>
			<?php
			if ( is_user_logged_in() ) {
				echo '<button class="btn btn-primary" id="download" data-post-id="' . get_the_ID() . '">Download HTML File</button>';
			}
			$mp = new ChoctawNation\Plugins\MediaPress_Fields( get_the_ID() );
			?>
			<a href="<?php echo 'https://choctawnation.my.workfront.com/project/' . $mp->get_field( 'wf_project_number' ) . '/tasks'; ?>" target="_blank" rel="noopener noreferrer"
				class="btn btn-outline-primary w-auto">View
				Workfront Project</a>
			<form id="send-email-form" class="border border-2 border-black p-3 my-3" data-post-id="<?php the_ID(); ?>">
				<div class="mb-3">
					<label for="recipient-email" class="form-label">Recipient Emails</label>
					<input type="text" class="form-control" id="recipient-email" name="recipient_email" placeholder="Enter email address">
					<div class="form-text">Enter one or more email addresses separated by commas. <strong>Up to 5 allowed.</strong></div>
				</div>
				<button type="submit" class="btn btn-outline-primary" id="send">Send Test Email</button>
			</form>
		</aside>
	</div>
</main>
<?php
get_footer();
