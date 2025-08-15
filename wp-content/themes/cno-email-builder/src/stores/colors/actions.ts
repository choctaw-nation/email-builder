import type {
	AllowCustomColorsAction,
	RemoveColorAction,
	RemoveColorPayload,
	SetColorAction,
	SetColorPayload,
} from './types';

export const actions = {
	allowCustomColors( payload: boolean ): AllowCustomColorsAction {
		return {
			type: 'ALLOW_CUSTOM_COLORS',
			payload,
		};
	},
	setColor( data: SetColorPayload ): SetColorAction {
		return {
			type: 'SET_COLOR',
			payload: data,
		};
	},
	removeColor( data: RemoveColorPayload ): RemoveColorAction {
		return {
			type: 'REMOVE_COLOR',
			payload: data,
		};
	},
};
