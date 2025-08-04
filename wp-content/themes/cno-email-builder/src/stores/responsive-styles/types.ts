import { responsiveClassNames } from '../../blocks/lib/responsiveHelpers';

export type State = Record< keyof typeof responsiveClassNames, string[] >;

export type AddBlockTypeAction = {
	type: 'ADD_BLOCK_TYPE';
	blockType: keyof typeof responsiveClassNames;
	blockId: string;
};

export type RemoveBlockTypeAction = {
	type: 'REMOVE_BLOCK_TYPE';
	blockType: keyof typeof responsiveClassNames;
	blockId: string;
};

export type ResponsiveStyleAction = AddBlockTypeAction | RemoveBlockTypeAction;
