import {
	ToggleControl,
	TabPanel,
	PanelBody,
	Flex,
	FlexItem,
} from '@wordpress/components';
import useFontSettings from './useFontSettings';
import CustomFontDefinitions from './CustomFontDefinitions';
import DefaultFontPicker from './DefaultFontPicker';
import { FontsState } from './types';

export default function FontControl( props ) {
	const {
		fonts,
		fontTabs,
		isUsingDefaultFonts,
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
							return isUsingDefaultFonts
								? DefaultFontPicker( {
										handleChange: ( val ) =>
											handleFontFaceChange(
												val,
												tab.name as keyof FontsState
											),
										value: fonts[ tab.name ].fontFace,
								  } )
								: CustomFontDefinitions( {
										fontType: {
											value:
												fonts[ tab.name ]?.fallbackStack
													.label || 'sans-serif',
											handleChange: ( val: string ) =>
												handleFontStackChange(
													val as
														| 'serif'
														| 'sans-serif',
													tab.name as keyof FontsState
												),
										},
										fontName: {
											value: fonts[ tab.name ].fontFace,
											handleChange: ( val ) =>
												handleFontFaceChange(
													val,
													tab.name as keyof FontsState
												),
										},
								  } );
						} }
					/>
				</FlexItem>
			</Flex>
		</PanelBody>
	);
}
