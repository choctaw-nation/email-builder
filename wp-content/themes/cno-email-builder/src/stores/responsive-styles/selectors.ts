import { ActionPayload, State } from './types';

export const selectors = {
	getResponsiveBlockTypes( state: State ) {
		const nonEmptyKeys = Object.keys( state ).filter( ( blockType ) => {
			return Object.values( state[ blockType ] ).length > 0;
		} );
		return nonEmptyKeys;
	},
	isLastBlock( state: State, payload: ActionPayload ) {
		const { clientId, parentId, blockType } = payload;
		if ( ! state[ blockType ][ parentId ] ) {
			return false;
		}
		return state[ blockType ][ parentId ].some(
			( ids ) => ids[ ids.length - 1 ] === clientId
		);
	},
};
