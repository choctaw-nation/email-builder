<?php
/**
 * Override the default post settings
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

/**
 * Class Post_Override
 * Overrides the default post settings
 *
 * @package ChoctawNation
 */
class Post_Override {
	/**
	 * Constructor Function
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'alter_post_types' ) );
	}

	/**
	 * Alters the post type
	 */
	public function alter_post_types() {
		$this->update_labels();
		$this->define_custom_template();
	}

	/**
	 * Updates the labels for the post type
	 */
	private function update_labels() {
		$labels                     = get_post_type_labels( get_post_type_object( 'post' ) );
		$labels->name               = 'Emails';
		$labels->singular_name      = 'Email';
		$labels->add_new            = 'Add New Email';
		$labels->add_new_item       = 'Add New Email';
		$labels->edit_item          = 'Edit Email';
		$labels->new_item           = 'New Email';
		$labels->view_item          = 'View Email';
		$labels->view_items         = 'View Emails';
		$labels->search_items       = 'Search Emails';
		$labels->not_found          = 'No Email found';
		$labels->not_found_in_trash = 'No Email found in trash';
		$labels->all_items          = 'All Emails';
		$labels->menu_name          = 'Emails';
		$labels->name_admin_bar     = 'Emails';
		$args                       = get_post_type_object( 'post' );
		$args->labels               = $labels;
	}

	/**
	 * Defines a custom block template for the post type
	 */
	private function define_custom_template() {
		$post_type_object = get_post_type_object( 'post' );
		if ( $post_type_object ) {
			$post_type_object->template = array(
				array(
					'cno-email-blocks/email-wrapper',
					array(
						'lock' => array(
							'move'   => true,
							'remove' => true,
						),
					),
				),
			);
		}
	}
}
