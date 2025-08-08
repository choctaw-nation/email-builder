<?php
/**
 * Basic Footer Template
 *
 * @package ChoctawNation
 */

echo '</div>'; // closes #site-content div
?>
<footer class="footer text-bg-secondary py-4">
	<div class="container">
		<div class="row row-cols-auto flex-column justify-content-center align-items-center">
			<div class="col">
				<a href="<?php echo esc_url( site_url() ); ?>" class="text-white">
					<?php echo bloginfo( 'name' ); ?>
				</a>
			</div>
			<div class="col text-center" id="copyright">
				<?php
				$current_year = new DateTime( 'now', wp_timezone() );
				echo '&copy;&nbsp;' . $current_year->format( 'Y' ) . '&nbsp;Choctaw Nation of Oklahoma';
				?>
			</div>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>

</html>
