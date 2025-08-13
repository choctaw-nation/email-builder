import { State } from './types';

export const selectors = {
	getFontFoundry( state: State ) {
		return state.fontFoundry;
	},
	getFonts( state: State ) {
		return state.fonts;
	},
	getAllFonts( state: State ) {
		return { headingsFont: state.headingsFont, bodyFont: state.bodyFont };
	},
	getHeadingsFont( state: State ) {
		return state.headingsFont;
	},
	getBodyFont( state: State ) {
		return state.bodyFont;
	},
};
