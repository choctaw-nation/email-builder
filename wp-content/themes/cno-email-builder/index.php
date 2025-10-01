<?php
/**
 * The primary archive page.
 *
 * Included for historical reasons. This file is not used in the theme.
 *
 * @package ChoctawNation
 */

use ChoctawNation\Email_Handler;

get_header();
?>
<main <?php post_class( 'container-xxl py-4' ); ?>>
	<?php if ( have_posts() ) : ?>
	<section class="row row-cols-auto row-gap-4 align-items-stretch">
		<?php while ( have_posts() ) : ?>
			<?php the_post(); ?>
		<div class="col">
			<div class="card shadow h-100">
				<?php
				if ( has_post_thumbnail() ) {
					echo "<figure class='ratio ratio-16x9 card-img-top overflow-hidden mb-0'>";
					the_post_thumbnail( 'medium_large', array( 'class' => 'object-fit-cover' ) );
					echo '</figure>';
				}
				?>
				<div class="card-body">
					<?php the_title( '<h2 class="card-title">', '</h2>' ); ?>
					<div class="d-flex gap-2 align-items-center mb-3">
						<?php
						if ( 'pending' === $post->post_status ) {
							echo '<span class="badge bg-warning text-dark fs-6">Work In Progress</span>';
						}
						$post_category = get_the_category();
						if ( ! empty( $post_category ) ) {
							echo '<span class="badge bg-info text-dark fs-6">' . esc_html( $post_category[0]->name ) . '</span>';
						}
						?>
					</div>
					<?php
					printf( '<p class="fst-italic">Last Modified: %s</p>', get_the_modified_date( 'F j, Y' ) );
					$email = new Email_Handler();
					if ( ! empty( $email->get_the_preview_text() ) ) {
						printf( '<p><span class="fw-bold">Preview Text:</span> %s</p>', $email->get_the_preview_text() );
					}
					?>
				</div>
				<div class="card-footer d-flex justify-content-end gap-2">
					<div class="btn-group" role="group" aria-label="Post actions">
						<?php
						if ( is_user_logged_in() && current_user_can( 'edit_post', get_the_ID() ) ) {
							echo '<a href="' . esc_url( get_edit_post_link() ) . '" class="btn btn-outline-primary w-auto">Edit Email</a>';
						}
						$mp = new ChoctawNation\Plugins\MediaPress_Fields( get_the_ID() );
						?>
						<a href="<?php echo 'https://choctawnation.my.workfront.com/project/' . $mp->get_field( 'wf_project_number' ) . '/tasks'; ?>" target="_blank" rel="noopener noreferrer"
							class="btn btn-outline-primary w-auto">View
							Workfront Project</a>
						<a href="<?php the_permalink(); ?>" class="btn btn-primary w-auto">View Email Preview</a>
					</div>
				</div>
			</div>
		</div>
		<?php endwhile; ?>
	</section>
	<?php else : ?>
	<p>No emails found</p>
	<?php endif; ?>
</main>
<?php
get_footer();
