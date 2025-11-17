<?php
/**
 * The global helper functions to use.
 *
 * This file should be used to define functions that are specifically meant to live in the global scope. Remember to prefix your functions with `cno_` to avoid conflicts.
 *
 * @package ChoctawNation
 */

/**
 * Reads an SVG file and returns its content.
 *
 * @param string       $logo_path The path to the logo file (must exist inside the theme directory).
 * @param string|false $alt_text The alt text for the image. False to not set an alt text.
 * @param string       $fallback The fallback text if the file cannot be read.
 *
 * @return string The SVG content.
 */
function cno_read_svg( string $logo_path, string|false $alt_text, string $fallback = 'This file could not be found' ): string {
	// Initialize the WP Filesystem
	global $wp_filesystem;
	if ( empty( $wp_filesystem ) ) {
		require_once ABSPATH . '/wp-admin/includes/file.php';
		WP_Filesystem();
	}

	// Get the path to the logo file
	$theme_directory = get_template_directory();
	$svg_path        = $theme_directory . $logo_path;

	// Check if file exists and read it
	if ( ! $wp_filesystem->exists( $svg_path ) ) {
		return $fallback;
	}

	$svg_content = $wp_filesystem->get_contents( $svg_path );
	if ( $svg_content ) {
		$svg_content = str_replace( '<svg', '<svg alt="' . esc_attr( $alt_text ) . '"', $svg_content );
		return $svg_content;
	}
	return $fallback;
}

/**
 * Echoes SVG Content
 *
 * @param string       $logo_path The path to the logo file (must exist inside the theme directory).
 * @param string|false $alt_text The alt text for the image. False to not set an alt text.
 * @param string       $fallback The fallback text if the file cannot be read.
 *
 * @return void
 */
function cno_echo_svg( string $logo_path, string|false $alt_text, string $fallback = 'This file could not be found' ): void {
	echo cno_read_svg( $logo_path, $alt_text, $fallback );
}

/**
 * Calculate spacing styles from block attributes
 *
 * @param array $attributes Block attributes containing parsedMargin and parsedPadding.
 * @return string CSS style string for spacing
 */
function cno_calc_spacing_styles( array $attributes ): string {
	$styles = array();

	if ( ! empty( $attributes['parsedMargin'] ) ) {
		foreach ( $attributes['parsedMargin'] as $side => $value ) {
			$styles[] = 'margin-' . esc_attr( $side ) . ': ' . esc_attr( $value );
		}
	}

	if ( ! empty( $attributes['parsedPadding'] ) ) {
		foreach ( $attributes['parsedPadding'] as $side => $value ) {
			$styles[] = 'padding-' . esc_attr( $side ) . ': ' . esc_attr( $value );
		}
	}

	return implode( '; ', $styles );
}

/**
 * Calculate typography styles from block attributes
 *
 * @param array $attributes Block attributes containing color, fontSize, lineHeight, textTransform, fontFamily, fontFamilyOverride.
 * @return string CSS style string for typography
 */
function cno_calc_typography_styles( array $attributes ): string {
	$styles = array();

	if ( ! empty( $attributes['color'] ) ) {
		$styles[] = 'color: ' . esc_attr( $attributes['color'] );
	}

	if ( ! empty( $attributes['fontSize'] ) ) {
		$styles[] = 'font-size: ' . esc_attr( $attributes['fontSize'] );
	}

	if ( ! empty( $attributes['lineHeight'] ) ) {
		$styles[] = 'line-height: ' . esc_attr( $attributes['lineHeight'] );
	}

	if ( ! empty( $attributes['textTransform'] ) ) {
		$styles[] = 'text-transform: ' . esc_attr( $attributes['textTransform'] );
	}

	$font_family = $attributes['fontFamilyOverride'] ?? $attributes['fontFamily'] ?? '';
	if ( ! empty( $font_family ) ) {
		$styles[] = 'font-family: ' . esc_attr( $font_family );
	}

	return implode( '; ', $styles );
}

/**
 * Combine multiple style arrays/strings into a single style string
 *
 * @param array $style_parts Array of style strings or arrays.
 * @return string Combined CSS style string
 */
function cno_combine_styles( array $style_parts ): string {
	$styles = array();

	foreach ( $style_parts as $part ) {
		if ( is_array( $part ) ) {
			foreach ( $part as $key => $value ) {
				if ( ! empty( $value ) ) {
					$styles[] = esc_attr( $key ) . ': ' . esc_attr( $value );
				}
			}
		} elseif ( is_string( $part ) && ! empty( $part ) ) {
			$styles[] = $part;
		}
	}

	return implode( '; ', array_filter( $styles ) );
}

/**
 * Generate email font styles for the email wrapper block
 *
 * @param array $headings_font Headings font data.
 * @param array $body_font Body font data.
 * @return string CSS styles for fonts
 */
function cno_email_font_styles( array $headings_font, array $body_font ): string {
	$headings_name     = $headings_font['name'] ?? '';
	$headings_fallback = $headings_font['fallbackStack']['value'] ?? 'Arial, Helvetica, sans-serif';
	$body_name         = $body_font['name'] ?? '';
	$body_fallback     = $body_font['fallbackStack']['value'] ?? 'Arial, Helvetica, sans-serif';

	return "
		body,p,a,td {
			text-wrap:pretty;
			font-family: {$body_name}, {$body_fallback}
		}
		
		h1,h2,h3,h4,h5,h6 {
			text-wrap:pretty;
			font-family: {$headings_name}, {$headings_fallback};
		}
	";
}
