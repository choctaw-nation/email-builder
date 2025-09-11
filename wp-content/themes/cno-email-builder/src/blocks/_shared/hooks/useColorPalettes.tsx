import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { STORES } from '../../../stores/consts';
import { useMemo, useState, useEffect } from '@wordpress/element';

const choctawLanding = {
	name: 'Choctaw Landing',
	colors: [
		{
			name: 'Primary',
			color: '#69813B',
		},
		{
			name: 'Secondary',
			color: '#b96a56',
		},
	],
};

export default function useColorPalettes() {
	const baseColors = useSelect(
		( select ) => select( blockEditorStore ).getSettings().colors,
		[]
	);
	const customColors = useSelect(
		( select ) => select( STORES.COLORS ).getColors(),
		[]
	);
	const [ customColorPalette, setCustomColorPalette ] = useState< {
		name: string;
		colors: Array< { name: string; color: string | undefined } >;
	} | null >( null );

	useEffect( () => {
		if ( ! customColors ) {
			return;
		}
		setCustomColorPalette( {
			name: 'Custom Palette',
			colors: Object.entries( customColors ).map(
				( [ key, value ] ) => ( {
					name:
						key.substring( 0, 1 ).toUpperCase() +
						key.substring( 1 ),
					color: value as string | undefined,
				} )
			),
		} );
	}, [ customColors ] );

	const palette = useMemo( () => {
		const baseColorsPalette = {
			name: 'Base Colors',
			colors: baseColors.map( ( { name, color } ) => ( {
				name,
				color,
			} ) ),
		};
		const palette = {
			baseColorsPalette,
			choctawLanding,
		};
		if ( customColorPalette ) {
			return {
				...palette,
				customColorPalette,
			};
		}
		return palette;
	}, [ customColorPalette, baseColors ] );
	return palette;
}
