import { FontsData } from '../../blocks/font/lib/types';
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
	setUseDefaultFonts( {
		fontFoundry,
		headingsFont,
		bodyFont,
	}: {
		fontFoundry: 'custom' | 'default';
		headingsFont?: FontsData;
		bodyFont?: FontsData;
	} ) {
		const fontsData = [ headingsFont, bodyFont ].filter( ( font ) => font );
		return {
			type: 'USE_DEFAULT_FONTS',
			payload: {
				fonts: fontsData as State[ 'fonts' ],
				fontFoundry,
				headingsFont,
				bodyFont,
			},
		};
	},
};
