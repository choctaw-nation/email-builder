<?php
/**
 * MediaPress Fields
 *
 * @package ChoctawNation
 * @subpackage Plugins
 */

namespace ChoctawNation\Plugins;

use Error;
use WP_Post;

/**
 * MediaPress Fields
 */
class MediaPress_Fields {
	/**
	 * The Post Id to get the fields for.
	 *
	 * @var int $post_id
	 */
	private int $post_id;

	/**
	 * Field Names from the config file
	 *
	 * @var string[] $fields
	 */
	private array $fields;

	/**
	 * Escape methods for different field types.
	 *
	 * @var array $escape_methods
	 */
	private array $escape_methods = array(
		'text'     => 'esc_textarea',
		'textarea' => 'esc_textarea',
		'number'   => 'intval',
		'url'      => 'esc_url',
		'image'    => 'intval',
		'default'  => 'esc_html',
	);

	/**
	 * Constructor
	 *
	 * @param WP_Post|int|array $post_id The post ID or WP_Post object or an array containing 'ID'.
	 */
	public function __construct( WP_Post|int|array|string $post_id ) {
		if ( is_string( $post_id ) ) {
			$this->post_id = (int) $post_id;
		} elseif ( is_array( $post_id ) && isset( $post_id['ID'] ) ) {
			$this->post_id = $post_id['ID'];
		} elseif ( is_int( $post_id ) ) {
			$this->post_id = $post_id instanceof WP_Post ? $post_id->ID : $post_id;
		} elseif ( $post_id instanceof WP_Post ) {
			$this->post_id = $post_id->ID;
		} else {
			$this->post_id = 0; // Default to 0 if no valid post ID is provided.
			_doing_it_wrong( __METHOD__, 'Invalid post ID provided.', '1.0' );
			wp_die( 'Invalid post ID provided.' );
			return;
		}
		$this->fields = $this->get_fields_from_json();
	}

	/**
	 * Get the fields for the post.
	 *
	 * @return array The fields for the post.
	 */
	private function get_fields_from_json(): array {
		$config_path = get_template_directory() . '/inc/plugins/mediapress-configs/fields.json';
		global $wp_filesystem;
		if ( ! $wp_filesystem ) {
			require_once ABSPATH . '/wp-admin/includes/file.php';
			WP_Filesystem();
		}
		if ( ! $wp_filesystem->exists( $config_path ) ) {
			return array();
		}
		$json_content = $wp_filesystem->get_contents( $config_path );
		if ( false === $json_content ) {
			return array();
		}
		// Load the JSON data from the file.
		$json   = json_decode( $json_content, true );
		$fields = array();
		foreach ( $json['fields'] as $field ) {
			$fields[ $field['name'] ] = array(
				'label'  => $field['label'],
				'source' => $field['source']['key'],
				'type'   => $field['type'],
			);
		}
		return $fields;
	}

	/**
	 * Get a specific field value for the post.
	 *
	 * @param string $field_name The name of the field to retrieve.
	 * @param bool   $should_escape     Whether to escape the output. Default true.
	 * @return mixed The value of the field, or null if not found.
	 */
	public function get_field( string $field_name, bool $should_escape = true ): mixed {
		if ( ! $this->field_exists( $field_name ) ) {
			return null; // Field not found.
		}
		try {
			$value = get_post_meta( $this->post_id, $field_name, true );
			if ( empty( $value ) ) {
				return null;
			}
			$escape_method = $this->get_escape_method( $field_name );
			if ( $should_escape ) {
				$value = $escape_method( $value );
			}
			return $value;
		} catch ( Error $e ) {
			// Handle the error gracefully.
			wp_die( 'An error occurred while retrieving the field: ' . $e->getMessage() );
			return null; // Return null if an error occurs.
		}
	}

	/**
	 * Check if a field exists in the fields array.
	 *
	 * @param string $field_name The name of the field to check.
	 * @return bool True if the field exists, false otherwise.
	 */
	private function field_exists( string $field_name ): bool {
		return array_key_exists( $field_name, $this->fields );
	}

	/**
	 * Get the type of a field by its name.
	 *
	 * @param string $field_name The name of the field to retrieve the type for.
	 * @return string|null The type of the field, or null if not found.
	 */
	private function get_field_type( string $field_name ): ?string {
		if ( ! $this->field_exists( $field_name ) ) {
			return null; // Field not found.
		}
		foreach ( $this->fields as $name => $details ) {
			if ( $this->string_contains_url_keywords( $name ) ||
				$this->string_contains_url_keywords( $details['label'] ) ||
				$this->string_contains_url_keywords( $details['source'] )
			) {
				return 'url';
			}
			if ( $name === $field_name ) {
				return $details['type'];
			}
		}
		return null; // Return null if the field type is not found.
	}

	/**
	 * Check if a string contains URL-related keywords.
	 *
	 * @param string $str The string to check.
	 * @return bool True if the string contains URL-related keywords, false otherwise.
	 */
	private function string_contains_url_keywords( string $str ): bool {
		$url_keywords = array( 'link', 'url' );
		foreach ( $url_keywords as $keyword ) {
			if ( stripos( $str, $keyword ) !== false ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Get the appropriate escape method based on the field type.
	 *
	 * @param string $field_name The field name to retrieve the escape method for.
	 * @return string The escape method to use.
	 * @throws Error If no escape method is found for the given type.
	 */
	private function get_escape_method( string $field_name ): string {
		$type = $this->get_field_type( $field_name ); // Default to 'default' if type is not set.
		if ( in_array( $type, array_keys( $this->escape_methods ), true ) ) {
			return $this->escape_methods[ $type ];
		} else {
			throw new Error( "Couldn't find an escape method for: $type" ); // phpcs:ignore WordPress.Security.EscapeOutput.ExceptionNotEscaped
		}
	}

	/**
	 * Echoes the field value for the post.
	 *
	 * @param string $field_name The name of the field to retrieve.
	 * @param bool   $escape     Whether to escape the output. Default true.
	 */
	public function the_field( string $field_name, bool $escape = true ): void {
		echo $this->get_field( $field_name, $escape );
	}
}
