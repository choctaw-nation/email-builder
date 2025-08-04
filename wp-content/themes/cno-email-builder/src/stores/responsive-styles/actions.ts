import { responsiveClassNames } from '../../blocks/lib/responsiveHelpers';

export const actions = {
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
};
