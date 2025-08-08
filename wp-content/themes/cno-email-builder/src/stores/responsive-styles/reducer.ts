import { ResponsiveStyleAction, State } from './types';

const initialState: State = {
	col: {},
	image: {},
	divider: {},
};

export default function reducer(
	state: State = initialState,
	action: ResponsiveStyleAction
) {
	switch ( action.type ) {
		case 'ADD_BLOCK_TYPE': {
			const { blockType, parentId, clientId } = action.payload;
			const existingIds = state[ blockType ][ parentId ] || [];
			if ( ! existingIds.includes( clientId ) ) {
				return {
					...state,
					[ blockType ]: {
						...state[ blockType ],
						[ parentId ]: [ ...existingIds, clientId ],
					},
				};
			} else {
				return state;
			}
		}
		case 'REMOVE_BLOCK_TYPE': {
			const { blockType, parentId, clientId } = action.payload;
			const existingIds = state[ blockType ][ parentId ] || [];
			if ( existingIds.includes( clientId ) ) {
				return {
					...state,
					[ blockType ]: {
						...state[ blockType ],
						[ parentId ]: existingIds.filter(
							( id ) => id !== clientId
						),
					},
				};
			} else {
				return state;
			}
		}
		default:
			return state;
	}
}
