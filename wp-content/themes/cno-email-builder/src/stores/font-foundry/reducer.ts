import { DEFAULT_FONTS } from '../../blocks/font/lib/utils';
import { FontAction, State } from './types';

const initialState: State = {
	fontFoundry: 'default',
	fonts: DEFAULT_FONTS,
	headingsFont: DEFAULT_FONTS[ 0 ],
	bodyFont: DEFAULT_FONTS[ 1 ],
};

export default function reducer(
	state: State = initialState,
	action: FontAction
) {
	switch ( action.type ) {
		case 'USE_DEFAULT_FONTS': {
			if ( 'default' === action.payload.fontFoundry ) {
				return {
					...state,
					...action.payload,
				};
			} else {
				return {
					...state,
					fontFoundry: 'custom',
					fonts: [],
					headingsFont: undefined,
					bodyFont: undefined,
				};
			}
		}
		case 'SET_HEADINGS_FONT':
			return {
				...state,
				headingsFont: action.payload,
			};
		case 'SET_BODY_FONT':
			return {
				...state,
				bodyFont: action.payload,
			};
		case 'SET_ACCENT_FONT':
			return {
				...state,
				accentFont: action.payload,
			};
		case 'SET_CUSTOM_FONTS':
			return {
				...state,
				fontFoundry: 'custom',
				fonts: Object.values( action.payload ).filter(
					( font ) => font
				),
				headingsFont: action.payload.headingsFont,
				bodyFont: action.payload.bodyFont,
				accentFont: action.payload.accentFont,
			};
		default:
			return state;
	}
}
