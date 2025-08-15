import {
	ColorIndicator,
	ColorPalette,
	ColorPicker,
	Flex,
	FlexBlock,
	FlexItem,
	Panel,
	PanelBody,
	TabPanel,
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

type CustomColorPalette = {
	primary: string;
	secondary: string;
	tertiary: string;
};

export default function EmailColors( {
	attributes: { customColorPalette },
	setAttributes,
}: {
	attributes: { customColorPalette: CustomColorPalette };
	setAttributes: (
		newAttributes: Partial< { customColorPalette: CustomColorPalette } >
	) => void;
} ) {
	const [ hasCustomColors, setHasCustomColors ] = useState(
		!! customColorPalette && Object.values( customColorPalette ).length > 0
	);

	return (
		<Panel>
			<PanelBody>
				<Flex direction="column" gap={ 6 }>
					<FlexBlock style={ { paddingBlock: '1.5rem' } }>
						<ToggleControl
							__nextHasNoMarginBottom
							label="Enable Custom Color Palette"
							checked={ hasCustomColors }
							onChange={ ( val ) => setHasCustomColors( val ) }
						/>
					</FlexBlock>

					{ hasCustomColors && (
						<>
							<TabPanel
								tabs={ [
									{ name: 'primary', title: 'Primary' },
									{ name: 'secondary', title: 'Secondary' },
									{ name: 'tertiary', title: 'Tertiary' },
								] }
								children={ ( tab ) => {
									return (
										<ColorPalette
											__experimentalIsRenderedInSidebar
											value={
												customColorPalette
													? customColorPalette[
															tab.name
													  ]
													: ''
											}
											onChange={ ( val ) => {
												console.log( val );
												setAttributes( {
													customColorPalette: {
														...customColorPalette,
														[ tab.name ]: val,
													},
												} );
											} }
										/>
									);
								} }
							/>
							{ customColorPalette &&
								Object.values( customColorPalette ).length && (
									<Flex gap={ 2 } justify="flex-start">
										{ Object.entries(
											customColorPalette
										).map(
											( [ key, value ] ) =>
												value && (
													<Flex
														direction="column"
														key={ key }
														align="center"
													>
														<ColorIndicator
															colorValue={
																customColorPalette?.[
																	key
																]
															}
														/>
														<p
															style={ {
																margin: 0,
															} }
														>
															{ key
																.charAt( 0 )
																.toUpperCase() +
																key.slice( 1 ) }
														</p>
													</Flex>
												)
										) }
									</Flex>
								) }
						</>
					) }
				</Flex>
			</PanelBody>
		</Panel>
	);
}
