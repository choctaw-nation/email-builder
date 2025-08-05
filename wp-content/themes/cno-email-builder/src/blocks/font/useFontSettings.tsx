import { useState, useEffect } from '@wordpress/element';
import { FontsState } from './types';

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
		setFonts( ( prev ) => {
			return {
				...prev,
				[ activeTab ]: {
					...prev[ activeTab ],
					fontFace: val,
				},
			};
		} );
	}

	return {
		fontTabs,
		hasAccent,
		setHasAccent,
		handleFontStackChange,
		fonts,
		handleFontFaceChange,
	};
}
