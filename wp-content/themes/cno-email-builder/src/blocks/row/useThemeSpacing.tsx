import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Lock users into the theme's spacing scale.
 */
export default function useThemeSpacing(): {
	spacingScale: Array< { label: string; value: number } >;
	scaleMax: number;
	} {
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

	const scaleMax = Math.max( ...spacingScale.map( ( { value } ) => value ) );
	return { spacingScale, scaleMax };
}
