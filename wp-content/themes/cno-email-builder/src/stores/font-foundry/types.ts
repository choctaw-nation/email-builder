import { FontsData } from '../../blocks/font/lib/types';

export type State = {
	fontFoundry: 'default' | 'custom';
	fonts: FontsData[];
	headingsFont: FontsData;
	bodyFont: FontsData;
	accentFont?: FontsData;
};

interface BlockTypeAction {
	payload: ActionPayload;
}

export type ActionPayload = {
	name: string;
	title: string;
	fallbackStack: 'sans-serif' | 'serif';
};

export interface UseDefaultFonts {
	type: 'USE_DEFAULT_FONTS';
	payload: {
		fontFoundry: 'custom' | 'default';
		headingsFont?: FontsData;
		bodyFont?: FontsData;
	};
}

export interface SetHeadingsFont extends BlockTypeAction {
	type: 'SET_HEADINGS_FONT';
}

export interface SetBodyFont extends BlockTypeAction {
	type: 'SET_BODY_FONT';
}

export interface SetAccentFont extends BlockTypeAction {
	type: 'SET_ACCENT_FONT';
}
export interface SetCustomFonts {
	type: 'SET_CUSTOM_FONTS';
	payload: {
		headingsFont: FontsData;
		bodyFont: FontsData;
		accentFont?: FontsData;
	};
}

export type FontAction =
	| SetHeadingsFont
	| SetBodyFont
	| SetAccentFont
	| UseDefaultFonts
	| SetCustomFonts;
