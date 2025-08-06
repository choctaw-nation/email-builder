import { FontsData } from '../../blocks/font/types';

export type State = {
	fontUrl: string;
	fonts: FontsData[];
};

interface BlockTypeAction {
	payload: ActionPayload;
}

export interface AddCustomFontAction extends BlockTypeAction {
	type: 'ADD_CUSTOM_FONTS';
}

export interface AddDefaultFontAction {
	type: 'ADD_DEFAULT_FONTS';
}

export type FontAction = AddCustomFontAction | AddDefaultFontAction;

export type ActionPayload = {};
