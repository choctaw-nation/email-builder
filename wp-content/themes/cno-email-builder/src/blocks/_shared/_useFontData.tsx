import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { STORES } from '../../stores/consts';

export default function useFontData() {
	const fontFoundry = useSelect( ( select ) => {
		return select( STORES.FONT_FOUNDRY ).getFontFoundry();
	}, [] );

	const fontSizes = useSelect(
		( select ) => select( blockEditorStore ).getSettings().fontSizes,
		[]
	);
	const fonts = useSelect(
		( select: any ) => {
			return select( STORES.FONT_FOUNDRY ).getFonts();
		},
		[ fontFoundry ]
	);

	const getHeadingsFont = useSelect(
		( select: any ) => {
			return () => select( STORES.FONT_FOUNDRY ).getHeadingsFont();
		},
		[ fonts ]
	);

	const getBodyFont = useSelect(
		( select: any ) => {
			return () => select( STORES.FONT_FOUNDRY ).getBodyFont();
		},
		[ fonts ]
	);

	const [ fontFamilies, setFontFamilies ] = useState( null );

	useEffect( () => {
		if ( ! fonts ) {
			return;
		}
		const families = fonts.map( ( font ) => ( {
			slug: font.name,
			name: font.title,
			fontFamily: `${ font.name }, ${ font.fallbackStack.value }`,
		} ) );
		setFontFamilies( families );
	}, [ fonts ] );

	return { fontFamilies, fontSizes, getHeadingsFont, getBodyFont };
}
