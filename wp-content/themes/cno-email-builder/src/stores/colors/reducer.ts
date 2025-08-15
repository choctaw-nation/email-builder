import {
	AllowCustomColorsAction,
	RemoveColorAction,
	SetColorAction,
	State,
} from './types';

const initialState: State = {
	hasCustomPalette: false,
	colors: {},
};

export default function reducer(
	state: State = initialState,
	action: SetColorAction | RemoveColorAction | AllowCustomColorsAction
) {
	switch ( action.type ) {
		case 'ALLOW_CUSTOM_COLORS': {
			return {
				...state,
				hasCustomPalette: action.payload,
			};
		}
		case 'SET_COLOR': {
			const { color, value } = action.payload;
			return {
				...state,
				colors: {
					...state.colors,
					[ color ]: value,
				},
			};
		}
		case 'REMOVE_COLOR': {
			const { color } = action.payload;
			const newState = { ...state };
			delete newState.colors[ color ];
			return newState;
		}
		default:
			return state;
	}
}
