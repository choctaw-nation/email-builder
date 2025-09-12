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
							the_post_thumbnail( 'medium_large', array( 'class' => 'card-img-top' ) );
						}
						?>
						<div class="card-body">
							<?php
							the_title( '<h2 class="card-title">', '</h2>' );
							printf( '<p>%s</p>', get_the_date( 'F j, Y' ) );
							$email = new Email_Handler();
							if ( ! empty( $email->get_the_preview_text() ) ) {
								printf( '<p><span class="fw-bold">Preview Text:</span> %s</p>', $email->get_the_preview_text() );
							}
							?>
							<div class="d-flex justify-content-end mt-auto">
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
