import {
	Flex,
	FlexBlock,
	Panel,
	PanelBody,
	TabPanel,
	TextControl,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

import { DEFAULT_FONT_URL } from './font-controls/utils';

import useFontSettings from './font-controls/hooks/useFontSettings';

import DefaultFontPicker from './font-controls/DefaultFontPicker';
import CustomFontDefinitions from './font-controls/CustomFontDefinitions';

import type { FontsState } from '../../_lib/types';

export default function EmailFonts( props ) {
	const {
		attributes: { useDefaultFonts, fontUrl },
		setAttributes,
	} = props;
	const {
		fonts,
		setFonts,
		fontTabs,
		hasAccent,
		setHasAccent,
		handleFontFaceChange,
	} = useFontSettings( props );
	return (
		<Panel>
			<PanelBody title="Font Import Location">
				<ToggleGroupControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					isBlock
					onChange={ ( val ) => {
						const useDefaultFonts = 'true' === val;
						setAttributes( {
							useDefaultFonts,
							fontUrl: useDefaultFonts ? DEFAULT_FONT_URL : '',
						} );
					} }
					value={ useDefaultFonts ? 'true' : 'false' }
					label="Font Import URL"
				>
					<ToggleGroupControlOption label="Default" value="true" />
					<ToggleGroupControlOption label="Custom" value="false" />
				</ToggleGroupControl>
				{ ! useDefaultFonts && (
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label="Custom URL"
						placeholder={ DEFAULT_FONT_URL }
						value={ fontUrl }
						onChange={ ( fontUrl ) => {
							setAttributes( { fontUrl } );
						} }
					/>
				) }
			</PanelBody>
			<PanelBody title="Font Definitions">
				<Flex gap={ 8 } direction="column">
					{ ! useDefaultFonts && (
						<FlexBlock>
							<ToggleControl
								__nextHasNoMarginBottom
								help="Enable if you need a third font option"
								label="Enable Accent Font"
								checked={ hasAccent }
								onChange={ ( val ) => setHasAccent( val ) }
							/>
						</FlexBlock>
					) }
					<FlexBlock>
						<TabPanel
							tabs={
								useDefaultFonts
									? fontTabs.filter(
											( tab ) => 'accentFont' !== tab.name
									  )
									: fontTabs.filter( ( tab ) =>
											hasAccent
												? tab
												: 'accentFont' !== tab.name
									  )
							}
							children={ ( tab ) =>
								useDefaultFonts ? (
									<DefaultFontPicker
										handleChange={ ( val ) =>
											handleFontFaceChange(
												val,
												tab.name as keyof FontsState
											)
										}
										value={ fonts[ tab.name ].name }
									/>
								) : (
									<CustomFontDefinitions
										activeTab={ tab.name }
										fonts={ fonts }
										setFonts={ setFonts }
									/>
								)
							}
						/>
					</FlexBlock>
				</Flex>
			</PanelBody>
		</Panel>
	);
}
