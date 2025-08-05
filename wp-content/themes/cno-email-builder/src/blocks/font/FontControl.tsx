import {
	SelectControl,
	ToggleControl,
	TabPanel,
	PanelBody,
	Flex,
	FlexItem,
	RadioControl,
	TextControl,
} from '@wordpress/components';
import useFontSettings from './useFontSettings';
import { FontsState } from './types';

export default function FontControl( props ) {
	const {
		fonts,
		fontTabs,
		hasAccent,
		setHasAccent,
		handleFontStackChange,
		handleFontFaceChange,
	} = useFontSettings( props );
	return (
		<PanelBody title="Font Definition">
			<Flex gap={ 8 } direction="column">
				<FlexItem isBlock>
					<ToggleControl
						__nextHasNoMarginBottom
						help="Enable if you need a third font option"
						label="Enable Accent Font"
						checked={ hasAccent }
						onChange={ ( val ) => setHasAccent( val ) }
					/>
				</FlexItem>
				<FlexItem isBlock>
					<TabPanel
						tabs={ fontTabs }
						children={ ( tab ) => {
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
											value={ fonts[ tab.name ].fontFace }
											onChange={ ( val ) =>
												handleFontFaceChange(
													val,
													tab.name as keyof FontsState
												)
											}
										/>
										<RadioControl
											label="Font Type"
											help="Used to set fallback fonts if custom fonts don't load in an email client"
											onChange={ ( val ) => {
												handleFontStackChange(
													val as
														| 'serif'
														| 'sans-serif',
													tab.name as keyof FontsState
												);
											} }
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
											selected={
												fonts[ tab.name ]?.fallbackStack
													.label || 'sans-serif'
											}
										/>
									</FlexItem>
								</Flex>
							);
						} }
					/>
				</FlexItem>
			</Flex>
		</PanelBody>
	);
}
