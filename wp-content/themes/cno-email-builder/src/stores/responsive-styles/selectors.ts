import { State } from './types';

export const selectors = {
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
};
