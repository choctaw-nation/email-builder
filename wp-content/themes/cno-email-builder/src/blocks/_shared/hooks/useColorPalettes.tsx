import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

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
	const baseColorsPalette = {
		name: 'Base Colors',
		colors: baseColors.map( ( { name, color } ) => ( {
			name,
			color,
		} ) ),
	};

	return { baseColorsPalette, choctawLanding };
}
