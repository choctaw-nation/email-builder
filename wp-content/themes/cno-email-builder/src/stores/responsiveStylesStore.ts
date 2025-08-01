import { createReduxStore, register } from '@wordpress/data';
import { STORES } from './consts';
import { responsiveClassNames } from '../blocks/lib/responsiveHelpers';

type State = Record< keyof typeof responsiveClassNames, string[] >;

const initialState: State = {
	col: [],
	image: [],
	divider: [],
};

const store = createReduxStore( STORES.RESPONSIVE_STYLES, {
	reducer( state: State = initialState, action ) {
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
		}
		return state;
	},
	actions: {
		addBlockType( blockType: keyof typeof responsiveClassNames ) {
			return {
				type: 'ADD_BLOCK_TYPE',
				blockType,
			};
		},
		removeBlockType( blockType: keyof typeof responsiveClassNames ) {
			return {
				type: 'REMOVE_BLOCK_TYPE',
				blockType,
			};
		},
	},
	selectors: {
		hasResponsiveBlocks( state: State ) {
			return Object.values( state ).some( ( ids ) => ids.length > 0 );
		},
		getResponsiveBlockTypes( state: State ) {
			const nonEmptyKeys = Object.keys( state ).filter(
				( blockType ) => state[ blockType ].length > 0
			);
			return nonEmptyKeys;
		},
		isLastBlock( state: State, blockId: string ) {
			return Object.values( state ).some(
				( ids ) => ids[ ids.length - 1 ] === blockId
			);
		},
	},
} );

register( store );
