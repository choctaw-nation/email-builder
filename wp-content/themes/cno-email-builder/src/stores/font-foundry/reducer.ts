import { DEFAULT_FONT_URL, DEFAULT_FONTS } from '../../blocks/font/utils';
import { FontAction, State } from './types';

const initialState: State = {
	fontUrl: DEFAULT_FONT_URL,
	fonts: DEFAULT_FONTS,
};

export default function reducer(
	state: State = initialState,
	action: FontAction
) {
	switch ( action.type ) {
		case 'ADD_CUSTOM_FONTS': {
			return state;
		}
		case 'ADD_DEFAULT_FONTS': {
			return initialState;
		}
		default:
			throw new Error( 'No action defined!' );
	}
}
