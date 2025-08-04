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
} from '@wordpress/components';

import metadata from './block.json';
import { allowedBlocks } from '../lib/allowedBlocks';
import { MAX_WIDTH } from '../lib/consts';

registerBlockType( metadata.name, {
	icon: homeButton,
	edit: ( { attributes: { maxWidth }, setAttributes } ) => {
		const blockProps = useBlockProps( {
			style: {
				maxWidth,
				marginLeft: maxWidth < MAX_WIDTH ? 'auto' : undefined,
				marginRight: maxWidth < MAX_WIDTH ? 'auto' : undefined,
			},
		} );
		const innerBlocksProps = useInnerBlocksProps( blockProps, {
			allowedBlocks: Object.values( allowedBlocks ).flat(),
			defaultBlocks: [ [ 'cno-email-blocks/section' ] ],
		} );

		return (
			<>
				<InspectorControls>
					<Panel header="Container Settings">
						<PanelBody>
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
					</Panel>
				</InspectorControls>
				<div { ...innerBlocksProps } />
			</>
		);
	},
	save: ( { attributes: { maxWidth } } ) => {
		const blockProps = useBlockProps.save( {
			style: {
				maxWidth,
			},
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
