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
		$route_namespace = $this->namespace . '/v' . $this->version;
		register_rest_route(
			$route_namespace,
			'/post/(?P<id>\d+)',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'send_email' ),
				'permission_callback' => array( $this, 'permission_check' ),
				'args'                => array(
					'recipient_email' => array(
						'required'          => false,
						'type'              => 'string',
						'sanitize_callback' => fn( $value ) => $this->sanitize_emails( $value ),
						'validate_callback' => fn( $value ) => ! empty( $value ),
					),
					'token'           => array(
						'required' => true,
						'type'     => 'string',
					),
				),
			)
		);
		register_rest_route(
			$route_namespace,
			'/html/(?P<id>\d+)',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => function ( WP_REST_Request $request ) {
					$post_id = (int) $request->get_param( 'id' );
					$email   = new Email_Handler( $post_id );
					$content = $email->get_the_email_content();
					return new WP_REST_Response(
						array(
							'success' => true,
							'message' => 'Retrieved email successfully',
							'html'    => $content,
						)
					);
				},
				'permission_callback' => '__return_true',
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
	 * Permission check for the REST route.
	 *
	 * @param WP_REST_Request $request REST request.
	 * @return bool
	 */
	public function permission_check( WP_REST_Request $request ): bool {
		if ( is_user_logged_in() ) {
			return true;
		}
		$token = $request->get_param( 'token' );
		if ( $token ) {
			$body     = wp_json_encode(
				array(
					'event' => array(
						'token'          => $token,
						'siteKey'        => '6Lft8sYrAAAAAHKlzEUY35Ii37kloEeW4f5MHvoS',
						'expectedAction' => 'SUBMIT',
					),
				)
			);
			$response = wp_remote_post(
				'https://recaptchaenterprise.googleapis.com/v1/projects/ua-migration-386816/assessments?key=' . G_RECAPTCHA_API_KEY,
				array(
					'body'    => $body,
					'headers' => array( 'Content-Type' => 'application/json' ),
				)
			);
			if ( 200 !== wp_remote_retrieve_response_code( $response ) ) {
				return false;
			}
			$body  = json_decode( wp_remote_retrieve_body( $response ) );
			$score = $body->riskAnalysis->score ?? 0; // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			return $score >= 0.5;
		}
		return false;
	}

	/**
	 * REST callback to send email with HTML content.
	 *
	 * @param WP_REST_Request $request REST request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function send_email( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$recipients        = array_map( 'trim', explode( ',', $request->get_json_params()['recipient_email'] ) );
		$unique_recipients = array_unique( $recipients );
		if ( count( $unique_recipients ) > 5 ) {
			return new WP_Error( 'too_many_recipients', 'You can only send emails to up to 5 persons. You sent ' . count( $unique_recipients ) . '.', array( 'status' => 400 ) );
		}
		$post_id = (int) $request->get_param( 'id' );
		$email   = new Email_Handler( $post_id );
		$content = $email->get_the_email_content();
		$subject = 'Email Preview from CNO Email Builder';
		$headers = array( 'Content-Type: text/html; charset=UTF-8' );
		add_filter(
			'wp_mail_content_type',
			function () {
				return 'text/html';
			}
		);
		$sent = wp_mail( $unique_recipients, $subject, $content, $headers );
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
