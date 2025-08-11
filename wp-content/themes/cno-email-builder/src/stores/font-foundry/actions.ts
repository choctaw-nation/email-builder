import { ActionPayload, State } from './types';

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
	setAccentFont( data: ActionPayload ) {
		return {
			type: 'SET_ACCENT_FONT',
			payload: data,
		};
	},
	setCustomFonts( data: State[ 'fonts' ] ) {
		return {
			type: 'SET_CUSTOM_FONTS',
			payload: data,
		};
	},
	setUseDefaultFonts( useDefault: boolean ) {
		return {
			type: 'USE_DEFAULT_FONTS',
			payload: useDefault ? 'default' : 'custom',
		};
	},
};
