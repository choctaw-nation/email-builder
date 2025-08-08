import { useState, useEffect } from '@wordpress/element';
import { FontsState } from '../lib/types';
import { DEFAULT_FONTS } from '../lib/utils';
import { useDispatch } from '@wordpress/data';
import { STORES } from '../../../stores/consts';

export default function useFontSettings( { attributes, setAttributes } ) {
	const {
		headingsFont,
		bodyFont,
		accentFont,
		useDefaultFonts: isUsingDefaultFonts,
	} = attributes;
	const {
		useDefaultFonts,
		setFonts: setStoreFonts,
		setHeadingsFont,
	} = useDispatch( STORES.FONT_FOUNDRY );

	const [ hasAccent, setHasAccent ] = useState(
		attributes.accentFont.name || false
	);
	const [ fonts, setFonts ] = useState< FontsState >( {
		headingsFont,
		bodyFont,
		accentFont,
	} );

	useEffect( () => {
		if ( isUsingDefaultFonts ) {
			useDefaultFonts();
		} else {
			setStoreFonts( fonts );
		}
		setAttributes( {
			...fonts,
		} );
	}, [ fonts, isUsingDefaultFonts ] );

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
		let fallbackStack;
		if ( isUsingDefaultFonts ) {
			const font = DEFAULT_FONTS.find( ( font ) => font.name === val );
			if ( font ) {
				fallbackStack = font.fallbackStack;
			}
			const payload = {
				name: val,
				fallbackStack,
			};
			if ( 'headingsFont' === activeTab ) {
				setHeadingsFont( payload );
			}
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
