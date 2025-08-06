import { useState, useEffect } from '@wordpress/element';
import { FontsState } from './types';
import { DEFAULT_FONT_URL, DEFAULT_FONTS } from './utils';

export default function useFontSettings( { attributes, setAttributes } ) {
	const { headingsFont, bodyFont, accentFont } = attributes;
	const [ hasAccent, setHasAccent ] = useState(
		attributes.accentFont.name || false
	);
	const [ fonts, setFonts ] = useState< FontsState >( {
		headingsFont,
		bodyFont,
		accentFont,
	} );
	const [ fontImportUrl, setFontImportUrl ] = useState( 'default' );
	const isUsingDefaultFonts = 'default' === fontImportUrl;

	useEffect( () => {
		setFontImportUrl(
			attributes.fontUrl === DEFAULT_FONT_URL ? 'default' : 'custom'
		);
	}, [ attributes.fontUrl ] );

	useEffect( () => {
		if ( isUsingDefaultFonts ) {
			setAttributes( { fontUrl: DEFAULT_FONT_URL } );
		} else {
			setAttributes( { fontUrl: '' } );
		}
	}, [ fontImportUrl ] );

	useEffect( () => {
		setAttributes( {
			...fonts,
		} );
	}, [ fonts ] );

	useEffect( () => {
		if ( ! hasAccent ) {
			setAttributes( { accentFont: {} } );
		}
	}, [ hasAccent ] );

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

	function handleFontStackChange(
		val: 'serif' | 'sans-serif',
		activeTab: keyof FontsState
	) {
		const fallbackStacks = {
			serif: 'Georgia, Times New Roman, serif',
			'sans-serif': 'Arial, Helvetica, sans-serif',
		};

		setFonts( ( prev ) => {
			return {
				...prev,
				[ activeTab ]: {
					...prev[ activeTab ],
					fallbackStack: {
						label: val,
						value: fallbackStacks[ val ],
					},
				},
			};
		} );
	}
	function handleFontFaceChange( val: string, activeTab: keyof FontsState ) {
		let fallbackStack;
		if ( isUsingDefaultFonts ) {
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
		handleFontStackChange,
		fonts,
		handleFontFaceChange,
		fontImportUrl,
		setFontImportUrl,
		isUsingDefaultFonts,
	};
}
