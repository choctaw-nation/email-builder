import { store as blockEditorStore } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

export default function useThemeSpacing(): {
	spacingScale: Array< { label: string; value: number } >;
	scaleMax: number;
} {
	const [ scaleMax, setScaleMax ] = useState( 0 );
	const themeSpacingScale = useSelect( ( select ) => {
		const settings = select( blockEditorStore ).getSettings();
		const themeSpacingScale =
			settings?.__experimentalFeatures?.spacing?.spacingSizes?.theme ||
			false;
		return themeSpacingScale;
	}, [] );
	const spacingScale = [
		{ label: 'None', value: 0 },
		...themeSpacingScale.map( ( { name, size } ) => {
			const value = Number( size.replace( 'px', '' ) );
			let label = '';
			if ( name.includes( 'X-' ) ) {
				label = `X${ name.substring( 2, 3 ).toUpperCase() }`;
			} else {
				label = name.substring( 0, 1 ).toUpperCase();
			}
			return {
				label,
				value,
			};
		} ),
	];
	useEffect( () => {
		spacingScale.forEach( ( { value } ) => {
			if ( value > scaleMax ) {
				setScaleMax( value );
			}
		} );
	}, [ spacingScale ] );
	return { spacingScale, scaleMax };
}
