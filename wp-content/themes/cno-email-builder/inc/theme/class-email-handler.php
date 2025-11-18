<?php
/**
 * Class: Email Handler
 *
 * Handles email content retrieval and processing.
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

/**
 * Class Email_Handler
 *
 * This class is responsible for handling email content and related attributes.
 */
class Email_Handler {
	/**
	 * The wrapper block of the email content.
	 *
	 * @var ?array $wrapper_block
	 */
	public ?array $wrapper_block;

	/**
	 * Background color of the email body.
	 *
	 * @var string $bg_color
	 */
	public string $bg_color;

	/**
	 * The ID of the post to retrieve content from.
	 *
	 * @var int|null $post_id
	 */
	private ?int $post_id = null;

	/**
	 * Constructor
	 *
	 * @param int|null $post_id The ID of the post to retrieve content from. Defaults to the current post if null.
	 */
	public function __construct( ?int $post_id = null ) {
		if ( $post_id ) {
			$this->post_id = $post_id;
		} elseif ( is_singular() ) {
			$this->post_id = get_the_ID();
		}
		$blocks_content      = parse_blocks( get_the_content( null, false, $post_id ) );
		$this->wrapper_block = ! empty( $blocks_content ) ? $blocks_content[0] : null;
		$this->bg_color      = isset( $this->wrapper_block['attrs']['backgroundColor'] ) ? $this->wrapper_block['attrs']['backgroundColor'] : 'gray';
	}

	/**
	 * Gets the content of the current post as JSON.
	 *
	 * @param bool $strip_comments Whether to strip HTML comments from the content. Default `true`.
	 * @return string|null The JSON-encoded content or null if not available.
	 */
	public function get_the_email_content( bool $strip_comments = true ): ?string {
		if ( empty( get_the_content( null, false, $this->post_id ) ) ) {
			return null;
		}
		$content = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' . get_the_content( null, false, $this->post_id );

		if ( $strip_comments ) {
			$content = preg_replace( '/<!--[\s\S]*?-->/', '', $content );
		}

		return $content;
	}

	/**
	 * Gets the preview text from the email wrapper block.
	 *
	 * @return string|null The preview text or null if not set.
	 */
	public function get_the_preview_text(): ?string {
		return isset( $this->wrapper_block['attrs']['previewText'] ) ? $this->wrapper_block['attrs']['previewText'] : null;
	}

	/**
	 * Echoes the preview text.
	 */
	public function the_preview_text(): void {
		echo $this->get_the_preview_text();
	}
}
