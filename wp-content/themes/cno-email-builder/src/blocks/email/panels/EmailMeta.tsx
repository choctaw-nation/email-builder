import {
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
	Flex,
	FlexBlock,
	Tip,
	ColorPalette,
} from '@wordpress/components';
import useColorPalettes from '../../_shared/hooks/useColorPalettes';

export default function EmailMeta( {
	attributes: { previewText, backgroundColor },
	setAttributes,
} ) {
	const { choctawLanding, baseColorsPalette } = useColorPalettes();
	return (
		<Panel>
			<PanelBody>
				<PanelRow>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label="Email Preview"
						value={ previewText }
						onChange={ ( value ) =>
							setAttributes( { previewText: value } )
						}
						help="This is the text that will show up in the email preview in the inbox."
					/>
				</PanelRow>
			</PanelBody>
			<PanelBody title="Preview Background Color" initialOpen={ false }>
				<Flex direction="column">
					<FlexBlock>
						<Tip>
							This is only used when viewing the email in the
							browser.
						</Tip>
					</FlexBlock>
					<FlexBlock>
						<ColorPalette
							__experimentalIsRenderedInSidebar
							title="Background Color"
							value={ backgroundColor }
							colors={ [ baseColorsPalette, choctawLanding ] }
							onChange={ ( backgroundColor ) =>
								setAttributes( { backgroundColor } )
							}
						/>
					</FlexBlock>
				</Flex>
			</PanelBody>
		</Panel>
	);
}
