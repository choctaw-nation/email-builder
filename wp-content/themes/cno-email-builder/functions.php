<?php
/**
 * Theme Functions
 *
 * Should be pretty quiet in here besides requiring the appropriate files. Like style.css, this should really only be used for quick fixes with notes to refactor later.
 *
 * @package ChoctawNation
 */

use ChoctawNation\Theme_Init;

/** Get the theme init class */
require_once get_template_directory() . '/inc/theme/class-theme-init.php';
new Theme_Init( 'nation' );
// Register custom REST route for sending email
add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'cno/v1',
			'/post',
			array(
				'methods'             => 'POST',
				'callback'            => 'cno_send_email_rest',
				'permission_callback' => function () {
					return is_user_logged_in();
				},
				'args'                => array(
					'recipient_email' => array(
						'required'          => false,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_email',
					),
					'content'         => array(
						'required' => true,
						'type'     => 'string',
					),
				),
			)
		);
	}
);

/**
 * REST callback to send email with HTML content.
 *
 * @param WP_REST_Request $request REST request.
 * @return WP_REST_Response|WP_Error
 */
function cno_send_email_rest( $request ) {
	$recipients           = array( wp_get_current_user()->user_email );
	$additional_recipient = $request->get_json_params()['recipient_email'];
	if ( ! empty( $additional_recipient ) ) {
		$recipients[] = sanitize_email( $additional_recipient );
	}
	$content = $request['content'];
	$subject = 'Email Preview from CNO Email Builder';
	$headers = array( 'Content-Type: text/html; charset=UTF-8' );
	add_filter(
		'wp_mail_content_type',
		function () {
			return 'text/html';
		}
	);
	$sent = wp_mail( $recipients, $subject, $content, $headers );
	remove_filter(
		'wp_mail_content_type',
		'__return_html'
	);
	if ( $sent ) {
		return rest_ensure_response( array( 'success' => true ) );
	} else {
		return new WP_Error( 'email_failed', 'Email could not be sent.', array( 'status' => 500 ) );
	}
}
