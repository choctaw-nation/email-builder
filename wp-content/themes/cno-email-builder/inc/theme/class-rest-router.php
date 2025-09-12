<?php
/**
 * Class: Rest Router
 *
 * Registers custom REST routes for the theme.
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

/** Registers custom REST routes for the theme */
class Rest_Router {
	/**
	 * The namespace for the REST routes.
	 *
	 * @var string $namespace
	 */
	private string $namespace;

	/**
	 * The version of the REST API.
	 *
	 * @var int $version
	 */
	private int $version;

	/** Constructor */
	public function __construct() {
		$this->namespace = 'cno';
		$this->version   = 1;
		add_action(
			'rest_api_init',
			array( $this, 'register_routes' )
		);
	}

	/** Register the custom REST routes */
	public function register_routes() {
		register_rest_route(
			$this->namespace . '/v' . $this->version,
			'/post',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'send_email' ),
				'permission_callback' => function () {
					return is_user_logged_in();
				},
				'args'                => array(
					'recipient_email' => array(
						'required'          => false,
						'type'              => 'string',
						'sanitize_callback' => fn( $value ) => $this->sanitize_emails( $value ),
					),
					'content'         => array(
						'required' => true,
						'type'     => 'string',
					),
				),
			)
		);
	}

	/**
	 * Sanitize a comma-separated list of emails.
	 *
	 * @param string $raw_emails Comma-separated list of emails.
	 * @return string Sanitized list of emails.
	 */
	private function sanitize_emails( string $raw_emails ): string {
		$emails = array_map( 'trim', explode( ',', $raw_emails ) );
		$emails = array_filter( array_map( 'sanitize_email', $emails ) );
		return implode( ',', $emails );
	}

	/**
	 * REST callback to send email with HTML content.
	 *
	 * @param WP_REST_Request $request REST request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function send_email( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$recipients = array_map( 'trim', explode( ',', $request->get_json_params()['recipient_email'] ) );
		if ( is_user_logged_in() ) {
			$recipients[] = wp_get_current_user()->user_email;
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
}
