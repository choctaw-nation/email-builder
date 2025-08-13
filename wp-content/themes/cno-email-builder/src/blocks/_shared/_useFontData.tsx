import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { STORES } from '../../stores/consts';

export default function useFontData(): {
	fontFamilies: Array< {
		slug: string;
		name: string;
		fontFamily: string;
	} > | null;
	fontSizes: Array< { name: string; size: number; slug: string } >;
	headingsFont?: string;
	bodyFont?: string;
} {
	const fontSizes = useSelect(
		( select ) => select( blockEditorStore ).getSettings().fontSizes,
		[]
	);
	const fontFoundry = useSelect( ( select ) => {
		return select( STORES.FONT_FOUNDRY ).getFontFoundry();
	}, [] );

	const fonts = useSelect(
		( select: any ) => {
			return select( STORES.FONT_FOUNDRY ).getFonts();
		},
		[ fontFoundry ]
	);
	const [ fontFamilies, setFontFamilies ] = useState( [] );

	useEffect( () => {
		if ( ! fonts || 0 === fonts.length ) {
			console.warn( 'no fonts!' );
			return;
		}
		const families = fonts.map( ( font ) => ( {
			slug: font.name,
			name: font.title,
			fontFamily: `${ font.name }, ${ font.fallbackStack.value }`,
		} ) );
		setFontFamilies( families );
	}, [ fonts ] );

	const { headingsFont, bodyFont } = useSelect(
		( select: any ) => select( STORES.FONT_FOUNDRY ).getAllFonts(),
		[ fonts ]
	);

	return {
		fontFamilies,
		fontSizes,
		headingsFont,
		bodyFont,
	};
}
