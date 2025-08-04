import { createReduxStore, register } from '@wordpress/data';
import { STORES } from '../consts';
import { actions } from './actions';
import { selectors } from './selectors';
import reducer from './reducer';

const store = createReduxStore( STORES.RESPONSIVE_STYLES, {
	reducer,
	actions,
	selectors,
} );

register( store );
