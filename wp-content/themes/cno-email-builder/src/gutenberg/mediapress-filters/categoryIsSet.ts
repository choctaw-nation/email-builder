import { select } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import type { ChecklistItem } from './types';

/**
 * Checks if the category is set to “Uncategorized” or not set at all.
 * @param item
 */
export default function categoryIsSet( item: ChecklistItem ): ChecklistItem {
	if ( item.name !== 'category_is_set' ) {
		return item;
	}
	const isCurrentPostPending = select( editorStore ).isCurrentPostPending();
	const status = isCurrentPostPending ? 'NONBLOCKING' : 'BLOCKING';
	const category: number[] = select( editorStore ).getEditedPostAttribute( 'categories' );
	if ( ! category || category.length === 0 ) {
		return {
			...item,
			status,
			message: 'Please provide a valid category for the email.',
		};
	}
	if ( category.length > 1 ) {
		return {
			...item,
			status,
			message: 'Email cannot have more than one category!',
		};
	}
	if ( category.includes( 1 ) ) {
		return {
			...item,
			status,
			message: 'Email cannot be tagged as “Uncategorized”.',
		};
	}

	return {
		...item,
		status: 'COMPLETED',
		message: 'A valid category is provided.',
	};
}
