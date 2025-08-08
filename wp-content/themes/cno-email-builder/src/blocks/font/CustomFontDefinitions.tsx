import {
	Flex,
	FlexItem,
	RadioControl,
	TextControl,
} from '@wordpress/components';

export default function CustomFontDefinitions( { fontType, fontName } ) {
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
					label="CSS Font Name"
					help="CSS-safe font name, e.g. “gill-sans-nova”"
					value={ fontName.value }
					onChange={ fontName.handleChange }
				/>
				<RadioControl
					label="Font Type"
					help="Used to set fallback fonts if custom fonts don't load in an email client"
					onChange={ fontType.handleChange }
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
					selected={ fontType.value }
				/>
			</FlexItem>
		</Flex>
	);
}
