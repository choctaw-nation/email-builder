import { useState, useEffect } from '@wordpress/element';
import { FontsState } from '../../../_lib/types';
import { DEFAULT_FONTS } from '../utils';

export default function useFontSettings( { attributes, setAttributes } ) {
	const {
		headingsFont,
		bodyFont,
		accentFont,
		useDefaultFonts: isUsingDefaultFonts,
	} = attributes;

	const [ hasAccent, setHasAccent ] = useState(
		attributes?.accentFont?.name || false
	);
	const [ fonts, setFonts ] = useState< FontsState >( {
		headingsFont,
		bodyFont,
		accentFont,
	} );

	useEffect( () => {
		setAttributes( { ...fonts } );
	}, [ fonts ] );

	const fontTabs = [
		{
			name: 'headingsFont',
			title: 'Headings',
			disabled: false,
		},
		{
			name: 'bodyFont',
			title: 'Body',
			disabled: false,
		},
		{
			disabled: ! hasAccent,
			name: 'accentFont',
			title: 'Accent',
		},
	];

	function handleFontFaceChange( val: string, activeTab: keyof FontsState ) {
		let fallbackStack:
			| FontsState[ keyof FontsState ][ 'fallbackStack' ]
			| undefined;
		if ( isUsingDefaultFonts ) {
			const font = DEFAULT_FONTS.find( ( font ) => font.name === val );
			if ( font ) {
				fallbackStack = font.fallbackStack;
			}
			const payload = {
				name: val,
				fallbackStack,
				title: font?.title,
			};
			setFonts( ( prev ) => {
				return {
					...prev,
					[ activeTab ]: {
						...prev[ activeTab ],
						...payload,
					},
				};
			} );
		} else {
			setFonts( ( prev ) => {
				return {
					...prev,
					[ activeTab ]: {
						...prev[ activeTab ],
						name: val,
					},
				};
			} );
		}
	}

	return {
		fontTabs,
		hasAccent,
		setHasAccent,
		fonts,
		setFonts,
		handleFontFaceChange,
	};
}
