import { ResponsiveStyleAction, State } from './types';

const initialState: State = {
	col: [],
	image: [],
	divider: [],
};

export default function reducer(
	state: State = initialState,
	action: ResponsiveStyleAction
) {
	switch ( action.type ) {
		case 'ADD_BLOCK_TYPE':
			return {
				...state,
				[ action.blockType ]: [
					...( state[ action.blockType ] || [] ),
					action.blockId,
				],
			};
		case 'REMOVE_BLOCK_TYPE':
			return {
				...state,
				[ action.blockType ]: (
					state[ action.blockType ] || []
				).filter( ( id ) => id !== action.blockId ),
			};
		default:
			return state;
	}
}
