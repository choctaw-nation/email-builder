import { State } from './types';

export const selectors = {
	hasColors( state: State ): boolean {
		return state.hasCustomPalette;
	},
	getColors( state: State ): State[ 'colors' ] | null {
		return state.hasCustomPalette ? state.colors : null;
	},
};
