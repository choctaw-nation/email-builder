<?php
/**
 * The primary archive page.
 *
 * Included for historical reasons. This file is not used in the theme.
 *
 * @package ChoctawNation
 */

get_header();
?>
<main <?php post_class( 'container-xxl py-4' ); ?>>
	<?php if ( have_posts() ) : ?>
		<section class="row row-cols-auto row-gap-4 align-items-stretch">
			<?php while ( have_posts() ) : ?>
				<?php the_post(); ?>
				<div class="col">
					<div class="card shadow h-100">
						<div class="card-body">
							<?php the_title( '<h2 class="card-title">', '</h2>' ); ?>
							<p>
								<?php the_date( 'F j, Y' ); ?>
							</p>
							<?php if ( has_excerpt() ) : ?>
							<p>
								<?php the_excerpt(); ?>
							</p>
						<?php endif; ?>
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
