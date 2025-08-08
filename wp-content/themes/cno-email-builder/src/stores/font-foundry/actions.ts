import { ActionPayload } from './types';

export const actions = {
	addBlockType( data: ActionPayload ) {
		return {
			type: 'ADD_FONT',
			payload: { ...data },
		};
	},
	removeBlockType( data: ActionPayload ) {
		return {
			type: 'REMOVE_FONT',
			payload: { ...data },
		};
	},
};
