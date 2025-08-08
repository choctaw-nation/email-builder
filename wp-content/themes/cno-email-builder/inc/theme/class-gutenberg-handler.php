<?php
/**
 * Gutenberg Handler
 * Handles the Controls and Settings for the Block Editor
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

/**
 * Gutenberg Handler
 */
class Gutenberg_Handler {
	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_assets' ) );
		add_action( 'after_setup_theme', array( $this, 'cno_block_theme_support' ), PHP_INT_MAX );
		add_action( 'init', array( $this, 'register_block_assets' ) );
		add_action( 'block_categories_all', array( $this, 'register_block_pattern_categories' ) );
		add_filter( 'block_editor_settings_all', array( $this, 'restrict_gutenberg_ui' ), 10, 1 );
		add_filter( 'allowed_block_types_all', array( $this, 'restrict_block_types' ), 10, 2 );
	}

	/**
	 * Check if the current user is an administrator.
	 *
	 * @return bool
	 */
	private function is_admin(): bool {
		return current_user_can( 'activate_plugins' );
	}

	/**
	 * Adds a custom category for the CNO Email Blocks.
	 *
	 * @param array $categories The existing block categories.
	 * @return array The modified block categories.
	 */
	public function register_block_pattern_categories( array $categories ): array {
		$new_categories = array(
			array(
				'slug'  => 'cno-email-blocks',
				'title' => 'CNO Email Blocks',
				'icon'  => null, // optional
			),
		);
		return array( ...$new_categories, ...$categories );
	}

	/**
	 * Register the block assets.
	 */
	public function register_block_assets() {
		$blocks_path = get_template_directory() . '/dist';
		$manifest    = $blocks_path . '/blocks-manifest.php';
		if ( ! file_exists( $manifest ) ) {
			return;
		}
		if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
			wp_register_block_types_from_metadata_collection( $blocks_path . '/blocks', $blocks_path . '/blocks-manifest.php' );
			return;
		}

		/**
		 * Registers the block(s) metadata from the `blocks-manifest.php` file.
		 * Added to WordPress 6.7 to improve the performance of block type registration.
		 *
		 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
		 */
		if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
			wp_register_block_metadata_collection( $blocks_path . '/blocks', $blocks_path . '/blocks-manifest.php' );
		}
		/**
		 * Registers the block type(s) in the `blocks-manifest.php` file.
		 *
		 * @see https://developer.wordpress.org/reference/functions/register_block_type/
		 */
		$manifest_data = require $manifest;
		foreach ( array_keys( $manifest_data ) as $block_type ) {
			register_block_type( "{$blocks_path}/blocks/{$block_type}" );
		}
	}


	/**
	 * Enqueue the block editor assets that control the layout of the Block Editor.
	 */
	public function enqueue_block_assets() {
		$files = array( 'editDefaultBlocks' );
		foreach ( $files as $file ) {
			$assets = require_once get_template_directory() . "/dist/admin/{$file}.asset.php";
			wp_enqueue_script(
				$file,
				get_template_directory_uri() . "/dist/admin/{$file}.js",
				$assets['dependencies'],
				$assets['version'],
				array( 'strategy' => 'defer' )
			);
		}
	}

	/**
	 * Init theme supports specific to the block editor.
	 */
	public function cno_block_theme_support() {
		$opt_out_features = array(
			'core-block-patterns',
			'wp-emoji-styles',
			'wp-block-styles',
			'wp-block-library',
			'global-styles',
		);
		foreach ( $opt_out_features as $feature ) {
			remove_theme_support( $feature );
		}
	}

	/**
	 * Restrict access to the locking UI to Administrators.
	 *
	 * @param array $settings Default editor settings.
	 */
	public function restrict_gutenberg_ui( $settings, ) {
		$is_administrator = $this->is_admin();

		if ( ! $is_administrator ) {
			$settings['canLockBlocks']      = false;
			$settings['codeEditingEnabled'] = false;
		}

		return $settings;
	}

	/**
	 * Filters the list of allowed block types in the block editor.
	 *
	 * This function restricts the available block types to Heading, List, Image, and Paragraph only.
	 *
	 * @param array|bool $allowed_block_types Array of block type slugs, or boolean to enable/disable all.
	 *
	 * @return array|bool The array of allowed block types or boolean to enable/disable all.
	 */
	public function restrict_block_types( array|bool $allowed_block_types ): array|bool {
		$is_administrator = $this->is_admin();
		// Get all registered blocks if $allowed_block_types is not already set.
		if ( ! is_array( $allowed_block_types ) || empty( $allowed_block_types ) ) {
			$registered_blocks   = \WP_Block_Type_Registry::get_instance()->get_all_registered();
			$allowed_block_types = array_keys( $registered_blocks );
		}
		if ( $is_administrator ) {
			$disallowed_blocks = array(
				'core/button',
				'core/buttons',
				'core/calendar',
				'core/categories',
				'core/comments',
				'core/comment-author-name',
				'core/comment-content',
				'core/comment-date',
				'core/comment-edit-link',
				'core/comment-reply-link',
				'core/comment-template',
				'core/comment-pagination-previous',
				'core/comments-author-avatar',
				'core/comments-pagination',
				'core/comments-pagination-next',
				'core/comments-pagination-numbers',
				'core/comments-title',
				'core/embed',
				'core/file',
				'core/latest-comments',
				'core/latest-posts',
				'core/loginout',
				'core/missing',
				'core/nextpage',
				'core/page-list-item',
				'core/page-list',
				'core/post-author',
				'core/post-author-biography',
				'core/post-author-name',
				'core/post-comment',
				'core/post-comments',
				'core/post-comments-count',
				'core/post-comments-form',
				'core/post-comments-link',
				'core/post-date',
				'core/post-navigation-link',
				'core/post-terms',
				'core/rss',
				'core/search',
				'core/site-logo',
				'core/site-tagline',
				'core/site-title',
				'core/social-link',
				'core/social-links',
				'core/spacer',
				'core/tag-cloud',
				'core/term-description',
				'core/video',
				'core/verse',
				'core/quote',
				'core/query',
				'core/table',
				'core/pullquote',
				'core/gallery',
				'core/audio',
				'core/cover',
				'core/group',
				'core/media-text',
				'core/columns',
				'core/column',
				'core/more',
				'core/separator',
				'core/shortcode',
				'core/code',
				'core/details',
				'core/preformatted',
				'core/classic',
				'core/avatar',
			);

			// Create a new array for the allowed blocks.
			$filtered_blocks = array();

			// Loop through each block in the allowed blocks list.
			foreach ( $allowed_block_types as $block ) {

				// Check if the block is not in the disallowed blocks list.
				if ( ! in_array( $block, $disallowed_blocks, true ) ) {

					// If it's not disallowed, add it to the filtered list.
					$filtered_blocks[] = $block;
				}
			}

			// Return the filtered list of allowed blocks
			return $filtered_blocks;
		}

		if ( ! $is_administrator ) {
			$allowed_block_types = array(
				'core/list',
				'core/list-item',
				'core/pattern',
				'core/block',
				'cno-email-blocks/email-wrapper',
				'cno-email-blocks/container',
				'cno-email-blocks/section',
				'cno-email-blocks/divider',
				'cno-email-blocks/button',
				'cno-email-blocks/column',
				'cno-email-blocks/image',
				'cno-email-blocks/row',
				'cno-email-blocks/text',
				'cno-email-blocks/font',
				'cno-email-blocks/head',
				'cno-email-blocks/body',
				'cno-email-blocks/heading',
			);
			return $allowed_block_types;
		}
		return $allowed_block_types;
	}

	/**
	 * Transforms CSS variables to computed inline properties
	 *
	 * @param string $block_content the block markup
	 * @param array  $block the block attributes
	 */
	public function compute_css_variables( $block_content, $block ) {
		$spacing_attributes = $block['attrs']['style']['spacing'];
		if ( empty( $spacing_attributes ) ) {
			return $block_content;
		}
		if ( ! empty( $spacing_attributes['padding'] || ! empty( $spacing_attributes['margin'] ) ) ) {
			$padding   = $block['attrs']['style']['spacing']['padding'];
			$margin    = $block['attrs']['style']['spacing']['margin'];
			$style_str = '';

			foreach ( array( 'top', 'right', 'bottom', 'left' ) as $side ) {
				if ( isset( $padding[ $side ] ) ) {
					$style_str .= "padding-$side: {$padding[$side]}; ";
				}
				if ( isset( $margin[ $side ] ) ) {
					$style_str .= "margin-$side: {$margin[$side]}; ";
				}
			}

			// Insert or append to existing style attr
			$block_content = preg_replace_callback(
				'/<([a-z]+)([^>]*?)>/i',
				function ( $matches ) use ( $style_str ) {
					if ( strpos( $matches[2], 'style=' ) !== false ) {
						return "<{$matches[1]}{$matches[2]} style=\"$style_str\">";
					} else {
						return "<{$matches[1]}{$matches[2]} style=\"$style_str\">";
					}
				},
				$block_content,
				1
			);
		}

		return $block_content;
	}
}
