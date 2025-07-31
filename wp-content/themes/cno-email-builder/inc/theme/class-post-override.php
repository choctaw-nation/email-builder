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
	}

	/**
	 * Updates the labels for the post type
	 */
	private function update_labels() {
		$labels                     = get_post_type_labels( get_post_type_object( 'post' ) );
		$labels->name               = 'News';
		$labels->singular_name      = 'News';
		$labels->add_new            = 'Add New News';
		$labels->add_new_item       = 'Add New News';
		$labels->edit_item          = 'Edit News';
		$labels->new_item           = 'New News';
		$labels->view_item          = 'View News';
		$labels->view_items         = 'View News';
		$labels->search_items       = 'Search News';
		$labels->not_found          = 'No News found';
		$labels->not_found_in_trash = 'No News found in trash';
		$labels->all_items          = 'All News';
		$labels->menu_name          = 'News';
		$labels->name_admin_bar     = 'News';
		$args                       = get_post_type_object( 'post' );
		$args->labels               = $labels;
	}
}
