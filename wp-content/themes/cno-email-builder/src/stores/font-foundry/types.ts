import { FontsData } from '../../blocks/font/lib/types';

export type State = {
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
}

export interface SetHeadingsFont extends BlockTypeAction {
	type: 'SET_HEADINGS_FONT';
}

export interface SetBodyFont extends BlockTypeAction {
	type: 'SET_BODY_FONT';
}
export interface SetFonts {
	type: 'SET_FONTS';
	payload: {
		headingsFont: FontsData;
		bodyFont: FontsData;
		accentFont?: FontsData;
	};
}

export type FontAction =
	| SetHeadingsFont
	| SetBodyFont
	| UseDefaultFonts
	| SetFonts;
