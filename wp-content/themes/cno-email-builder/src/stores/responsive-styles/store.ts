import { createReduxStore, register } from '@wordpress/data';
import { STORES } from '../consts';
import { State, ResponsiveStyleAction } from './types';
import { actions } from './actions';
import { selectors } from './selectors';

const initialState: State = {
	col: [],
	image: [],
	divider: [],
};

const store = createReduxStore( STORES.RESPONSIVE_STYLES, {
	reducer( state: State = initialState, action: ResponsiveStyleAction ) {
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
	},
	actions,
	selectors,
} );

register( store );
