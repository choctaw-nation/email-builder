import {
	ToggleControl,
	TabPanel,
	PanelBody,
	Flex,
	FlexItem,
} from '@wordpress/components';
import useFontSettings from './hooks/useFontSettings';
import CustomFontDefinitions from './CustomFontDefinitions';
import DefaultFontPicker from './DefaultFontPicker';
import { FontsState } from './lib/types';

export default function FontControl( props ) {
	const {
		fonts,
		setFonts,
		fontTabs,
		hasAccent,
		setHasAccent,
		handleFontFaceChange,
	} = useFontSettings( props );
	const {
		attributes: { useDefaultFonts },
	} = props;
	return (
		<PanelBody title="Font Definition">
			<Flex gap={ 8 } direction="column">
				{ ! useDefaultFonts && (
					<FlexItem isBlock>
						<ToggleControl
							__nextHasNoMarginBottom
							help="Enable if you need a third font option"
							label="Enable Accent Font"
							checked={ hasAccent }
							onChange={ ( val ) => setHasAccent( val ) }
						/>
					</FlexItem>
				) }
				<FlexItem isBlock>
					<TabPanel
						tabs={
							useDefaultFonts
								? fontTabs.filter(
										( tab ) => 'accentFont' !== tab.name
								  )
								: fontTabs
						}
						children={ ( tab ) =>
							useDefaultFonts
								? DefaultFontPicker( {
										handleChange: ( val ) =>
											handleFontFaceChange(
												val,
												tab.name as keyof FontsState
											),
										value: fonts[ tab.name ].name,
								  } )
								: CustomFontDefinitions(
										tab.name,
										fonts,
										setFonts
								  )
						}
					/>
				</FlexItem>
			</Flex>
		</PanelBody>
	);
}
