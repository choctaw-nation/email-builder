import { registerBlockType } from '@wordpress/blocks';
import { homeButton } from '@wordpress/icons';
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Flex,
	Panel,
	PanelBody,
	FlexItem,
	RangeControl,
	ColorPalette,
} from '@wordpress/components';

import metadata from './block.json';
import { allowedBlocks } from '../_lib/allowedBlocks';
import { MAX_WIDTH } from '../_lib/consts';
import SpacingControls, { calcSpacingObject } from '../_shared/SpacingControl';
import useColorPalettes from '../_shared/hooks/useColorPalettes';

registerBlockType( metadata.name, {
	icon: homeButton,
	edit: ( props ) => {
		const {
			attributes: { maxWidth, backgroundColor },
			setAttributes,
		} = props;
		const blockProps = useBlockProps( {
			style: {
				maxWidth,
				marginLeft: maxWidth < MAX_WIDTH ? 'auto' : undefined,
				marginRight: maxWidth < MAX_WIDTH ? 'auto' : undefined,
				...calcSpacingObject( props.attributes ),
				backgroundColor,
			},
		} );
		const innerBlocksProps = useInnerBlocksProps( blockProps, {
			allowedBlocks: Object.values( allowedBlocks ).flat(),
			defaultBlocks: [ [ 'cno-email-blocks/section' ] ],
		} );
		const { choctawLanding, baseColorsPalette } = useColorPalettes();

		return (
			<>
				<InspectorControls>
					<Panel header="Container Settings">
						<PanelBody title="Width">
							<Flex>
								<FlexItem isBlock={ true }>
									<RangeControl
										__next40pxDefaultSize
										__nextHasNoMarginBottom
										value={ maxWidth }
										onChange={ ( maxWidth ) =>
											setAttributes( {
												maxWidth: maxWidth || 0,
											} )
										}
										help="Max 600px"
										allowReset={ true }
										resetFallbackValue={ MAX_WIDTH }
										max={ MAX_WIDTH }
										label="Container Max Width"
									/>
								</FlexItem>
							</Flex>
						</PanelBody>
						<PanelBody title="Color">
							<ColorPalette
								value={ props.attributes.backgroundColor }
								onChange={ ( backgroundColor ) =>
									setAttributes( { backgroundColor } )
								}
								colors={ [ baseColorsPalette, choctawLanding ] }
							/>
						</PanelBody>
						<SpacingControls
							{ ...props }
							splitOnAxis={ true }
							only="padding"
							sides={ [ 'horizontal', 'vertical' ] }
						/>
					</Panel>
				</InspectorControls>
				<div { ...innerBlocksProps } />
			</>
		);
	},
	save: ( { attributes } ) => {
		const { maxWidth } = attributes;
		const blockProps = useBlockProps.save( {
			style: {
				maxWidth,
				...calcSpacingObject( attributes ),
				backgroundColor: attributes.backgroundColor,
			},
			bgColor: attributes.backgroundColor,
			align: 'center',
			width: '100%',
			border: '0',
			cellpadding: '0',
			cellspacing: '0',
			role: 'presentation',
		} );
		return (
			<table { ...blockProps }>
				<tbody>
					<tr style={ { width: '100%' } }>
						<td>
							<InnerBlocks.Content />
						</td>
					</tr>
				</tbody>
			</table>
		);
	},
} );
