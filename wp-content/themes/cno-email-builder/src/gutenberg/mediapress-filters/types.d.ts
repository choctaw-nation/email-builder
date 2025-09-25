export interface ChecklistItem {
	message: string;
	status:
		| 'COMPLETED'
		| 'BLOCKING'
		| 'ERROR'
		| 'INFO'
		| 'ERROR'
		| 'NONBLOCKING';
	action?: () => void;
	name: string;
}

export type Source = {
	name: string;
	slug: string;
	type: 'core' | 'custom';
	getResults: ( _query: string, _context: any ) => Promise< any >;
	supports?: {
		dateRange?: boolean;
		taxonomies?: {
			category?: boolean;
			post_tag?: boolean;
		};
	};
	context: string;
};
