import { responsiveClassNames } from '../../blocks/lib/responsiveHelpers';

export type State = {
	[ Key in keyof typeof responsiveClassNames ]: {
		[ parentId: string ]: string[];
	};
};

interface BlockTypeAction {
	payload: ActionPayload;
}

export interface AddBlockTypeAction extends BlockTypeAction {
	type: 'ADD_BLOCK_TYPE';
}

export interface RemoveBlockTypeAction extends BlockTypeAction {
	type: 'REMOVE_BLOCK_TYPE';
}

export type ResponsiveStyleAction = AddBlockTypeAction | RemoveBlockTypeAction;

export type ActionPayload = {
	blockType: keyof typeof responsiveClassNames;
	parentId: string;
	clientId: string;
};
