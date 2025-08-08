import { ActionPayload } from './types';

export const actions = {
	setHeadingsFont( data: ActionPayload ) {
		return {
			type: 'SET_HEADINGS_FONT',
			payload: data,
		};
	},
	setBodyFont( data: ActionPayload ) {
		return {
			type: 'SET_BODY_FONT',
			payload: data,
		};
	},
	setFonts( data: ActionPayload ) {
		return {
			type: 'SET_FONTS',
			payload: data,
		};
	},
	useDefaultFonts() {
		return {
			type: 'USE_DEFAULT_FONTS',
		};
	},
};
