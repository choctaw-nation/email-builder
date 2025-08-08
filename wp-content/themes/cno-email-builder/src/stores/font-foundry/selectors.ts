import { State } from './types';

export const selectors = {
	getHeadingsFont( state: State ) {
		return state.headingsFont;
	},
	getBodyFont( state: State ) {
		return state.bodyFont;
	},
	getFonts( state: State ) {
		return state;
		// return Object.values( state.fonts ).map( ( font ) => ( {
		// 	label: font.title,
		// 	value: `${ font.name }, ${ font.fallbackStack.value }`,
		// } ) );
	},
};
