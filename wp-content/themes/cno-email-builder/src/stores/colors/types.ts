export type State = {
	hasCustomPalette: boolean;
	colors: {
		primary?: string;
		secondary?: string;
		tertiary?: string;
	};
};

export type SetColorPayload = { color: keyof State; value: string };
export type RemoveColorPayload = { color: keyof State };

export interface AllowCustomColorsAction {
	type: 'ALLOW_CUSTOM_COLORS';
	payload: boolean;
}
export interface SetColorAction {
	type: 'SET_COLOR';
	payload: SetColorPayload;
}

export interface RemoveColorAction {
	type: 'REMOVE_COLOR';
	payload: RemoveColorPayload;
}
