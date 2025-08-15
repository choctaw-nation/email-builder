import { createReduxStore, register } from '@wordpress/data';
import { STORES } from '../consts';
import { actions } from './actions';
import { selectors } from './selectors';
import reducer from './reducer';

const store = createReduxStore( STORES.COLORS, {
	reducer,
	actions,
	selectors,
} );

register( store );
