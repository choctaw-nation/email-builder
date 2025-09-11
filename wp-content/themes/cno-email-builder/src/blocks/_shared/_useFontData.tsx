import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { FontsData } from '../_lib/types';

export default function useFontData( props ): {
	fontFamilies: Array< {
		slug: string;
		name: string;
		fontFamily: string;
	} > | null;
	fontSizes: Array< { name: string; size: number; slug: string } >;
	headingsFont: FontsData;
	bodyFont: FontsData;
	fontFamilyString: string;
	handleFontFamilyChange: ( val: string ) => void;
} {
	const { context, attributes, setAttributes, textType } = props;
	const isHeadings = 'headings' === textType;
	const fontSizes = useSelect(
		( select ) => select( blockEditorStore ).getSettings().fontSizes,
		[]
	);
	const headingsFont: FontsData = context[ 'cno-email-blocks/headingsFont' ];
	const bodyFont: FontsData = context[ 'cno-email-blocks/bodyFont' ];

	const fonts = useMemo(
		() => [ headingsFont, bodyFont ],
		[ headingsFont, bodyFont ]
	);

	const fontFamilies = useMemo( () => {
		if ( fonts.length === 0 ) {
			return null;
		}
		return fonts
			.map( ( font ) => ( {
				slug: font.name,
				name: font.title,
				fontFamily: `${ font.name }, ${ font.fallbackStack.value }`,
			} ) )
			.filter(
				( family, index, self ) =>
					self.findIndex( ( f ) => f.slug === family.slug ) === index
			);
	}, [ fonts ] );

	const inheritedFontFamilyString = useMemo(
		() => generateFontFamilyString( isHeadings ? headingsFont : bodyFont ),
		[ headingsFont, bodyFont, isHeadings ]
	);
	const [ fontFamilyString, setFontFamilyString ] = useState(
		attributes.fontFamilyOverride || inheritedFontFamilyString
	);

	useEffect( () => {
		setAttributes( { fontFamily: inheritedFontFamilyString } );
	}, [ inheritedFontFamilyString, setAttributes ] );

	function handleFontFamilyChange( val ) {
		if ( ! val ) {
			setFontFamilyString( '' );
			setAttributes( {
				fontFamily: generateFontFamilyString(
					isHeadings ? headingsFont : bodyFont
				),
				fontFamilyOverride: null,
			} );
		} else {
			setFontFamilyString( val );
			setAttributes( { fontFamilyOverride: val } );
		}
	}

	return {
		fontFamilyString,
		handleFontFamilyChange,
		fontFamilies,
		fontSizes,
		headingsFont,
		bodyFont,
	};
}

function generateFontFamilyString( fontFamily: any ): string {
	return `${ fontFamily.name }, ${ fontFamily.fallbackStack.value }`;
}
