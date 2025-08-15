import {
	Flex,
	FlexItem,
	RadioControl,
	TextControl,
} from '@wordpress/components';

export default function CustomFontDefinitions( {
	activeTab,
	fonts,
	setFonts,
} ) {
	function handleChange(
		val: string,
		property: 'fontFaceTitle' | 'fontFaceName' | 'fontStack'
	) {
		setFonts( ( prev ) => {
			if ( 'fontFaceTitle' === property ) {
				return {
					...prev,
					[ activeTab ]: {
						...prev[ activeTab ],
						title: val,
					},
				};
			}
			if ( 'fontFaceName' === property ) {
				return {
					...prev,
					[ activeTab ]: {
						...prev[ activeTab ],
						name: val,
					},
				};
			}
			if ( 'fontStack' === property ) {
				return {
					...prev,
					[ activeTab ]: {
						...prev[ activeTab ],
						fallbackStack: {
							label: val,
							value:
								'sans-serif' === val
									? 'Arial, Helvetica, sans-serif'
									: 'Georgia, Times New Roman, serif',
						},
					},
				};
			}
			return prev;
		} );
	}
	return (
		<Flex
			direction="column"
			gap={ 6 }
			style={ { paddingBlockStart: '1rem' } }
		>
			<FlexItem isBlock>
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label="Font Name"
					help="Pretty font name, e.g. “Gill Sans Nova”"
					value={ fonts[ activeTab ].title || '' }
					onChange={ ( val ) => handleChange( val, 'fontFaceTitle' ) }
				/>
			</FlexItem>
			<FlexItem isBlock>
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label="CSS Name"
					help="CSS-safe font name, e.g. “gill-sans-nova”"
					value={ fonts[ activeTab ].name }
					onChange={ ( val ) => handleChange( val, 'fontFaceName' ) }
				/>
			</FlexItem>
			<FlexItem isBlock>
				<RadioControl
					label="Font Type"
					help="Used to set fallback fonts if custom fonts don't load in an email client"
					onChange={ ( val ) => handleChange( val, 'fontStack' ) }
					options={ [
						{
							label: 'Serif',
							value: 'serif',
						},
						{
							label: 'Sans Serif',
							value: 'sans-serif',
						},
					] }
					selected={ fonts[ activeTab ].fallbackStack.label }
				/>
			</FlexItem>
		</Flex>
	);
}
