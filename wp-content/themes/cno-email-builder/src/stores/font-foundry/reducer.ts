import { DEFAULT_FONTS } from '../../blocks/font/lib/utils';
import { FontAction, State } from './types';

const initialState: State = {
	headingsFont: DEFAULT_FONTS[ 1 ],
	bodyFont: DEFAULT_FONTS[ 0 ],
};

export default function reducer(
	state: State = initialState,
	action: FontAction
) {
	switch ( action.type ) {
		case 'USE_DEFAULT_FONTS': {
			return initialState;
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
		case 'SET_FONTS':
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}
