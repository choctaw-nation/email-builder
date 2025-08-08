import { useState, useEffect } from '@wordpress/element';
import { FontsState } from '../lib/types';
import { DEFAULT_FONTS } from '../lib/utils';

export default function useFontSettings( { attributes, setAttributes } ) {
	const { headingsFont, bodyFont, accentFont, useDefaultFonts } = attributes;
	const [ hasAccent, setHasAccent ] = useState(
		attributes.accentFont.name || false
	);
	const [ fonts, setFonts ] = useState< FontsState >( {
		headingsFont,
		bodyFont,
		accentFont,
	} );

	useEffect( () => {
		setAttributes( {
			...fonts,
		} );
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

	// function handleFontStackChange(
	// 	val: 'serif' | 'sans-serif',
	// 	activeTab: keyof FontsState
	// ) {
	// 	const fallbackStacks = {
	// 		serif: 'Georgia, Times New Roman, serif',
	// 		'sans-serif': 'Arial, Helvetica, sans-serif',
	// 	};

	// 	setFonts( ( prev ) => {
	// 		return {
	// 			...prev,
	// 			[ activeTab ]: {
	// 				...prev[ activeTab ],
	// 				fallbackStack: {
	// 					label: val,
	// 					value: fallbackStacks[ val ],
	// 				},
	// 			},
	// 		};
	// 	} );
	// }
	function handleFontFaceChange( val: string, activeTab: keyof FontsState ) {
		let fallbackStack;
		if ( useDefaultFonts ) {
			const font = DEFAULT_FONTS.find( ( font ) => font.name === val );
			if ( font ) {
				fallbackStack = font.fallbackStack;
			}
			setFonts( ( prev ) => {
				return {
					...prev,
					[ activeTab ]: {
						...prev[ activeTab ],
						name: val,
						fallbackStack,
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
