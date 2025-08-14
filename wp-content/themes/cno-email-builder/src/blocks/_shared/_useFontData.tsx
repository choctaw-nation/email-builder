import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { FontsData } from '../font/lib/types';

export default function useFontData( props ): {
	fontFamilies: Array< {
		slug: string;
		name: string;
		fontFamily: string;
	} > | null;
	fontSizes: Array< { name: string; size: number; slug: string } >;
	headingsFont?: string;
	bodyFont?: string;
} {
	const { context } = props;
	const fontSizes = useSelect(
		( select ) => select( blockEditorStore ).getSettings().fontSizes,
		[]
	);
	const headingsFont = context[ 'cno-email-blocks/headingsFont' ];
	const bodyFont = context[ 'cno-email-blocks/bodyFont' ];
	const fonts: Array< FontsData > = useMemo(
		() => [ headingsFont, bodyFont ],
		[ headingsFont, bodyFont ]
	);

	const fontFamilies = useMemo( () => {
		if ( fonts.length === 0 ) {
			return null;
		}
		return fonts.map( ( font ) => ( {
			slug: font.name,
			name: font.title,
			fontFamily: `${ font.name }, ${ font.fallbackStack.value }`,
		} ) );
	}, [ fonts ] );

	return {
		fontFamilies,
		fontSizes,
		headingsFont,
		bodyFont,
	};
}
