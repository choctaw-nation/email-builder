import { ActionPayload } from './types';

export const actions = {
	addBlockType( data: ActionPayload ) {
		return {
			type: 'ADD_BLOCK_TYPE',
			payload: { ...data },
		};
	},
	removeBlockType( data: ActionPayload ) {
		return {
			type: 'REMOVE_BLOCK_TYPE',
			payload: { ...data },
		};
	},
};
