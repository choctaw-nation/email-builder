import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { ColorPalette, Panel, PanelBody } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import metadata from './block.json';
import { allowedBlocks } from '../_lib/allowedBlocks';
import useColorPalettes from '../_shared/useColorPalettes';

registerBlockType( metadata.name, {
	edit: ( { attributes: { backgroundColor }, setAttributes, context } ) => {
		useEffect( () => {
			setAttributes( {
				previewText: context[ 'cno-email-blocks/previewText' ],
			} );
		}, [ context ] );
		const blockProps = useBlockProps( { style: { backgroundColor } } );
		const innerBlocksProps = useInnerBlocksProps( blockProps, {
			allowedBlocks: allowedBlocks.email,
			template: [
				[
					'cno-email-blocks/container',
					{ attributes: { lock: { move: true, remove: true } } },
				],
			],
		} );
		const { choctawLanding, baseColorsPalette } = useColorPalettes();
		return (
			<>
				<InspectorControls>
					<Panel>
						<PanelBody title="Background Color">
							<ColorPalette
								title="Background Color"
								value={ backgroundColor }
								colors={ [ baseColorsPalette, choctawLanding ] }
								onChange={ ( backgroundColor ) =>
									setAttributes( { backgroundColor } )
								}
							/>
						</PanelBody>
					</Panel>
				</InspectorControls>
				<div { ...innerBlocksProps } />
			</>
		);
	},
	save: ( { attributes } ) => {
		const blockProps = useBlockProps.save( {
			style: {
				margin: 0,
				padding: 0,
				backgroundColor: attributes.backgroundColor,
				'-webkit-text-size-adjust': 'none',
			},
			className: undefined,
			bgColor: attributes.backgroundColor,
		} );
		return (
			<body { ...blockProps }>
				<div
					style={ {
						display: 'none',
						overflow: 'hidden',
						lineHeight: '1px',
						opacity: 0,
						maxHeight: 0,
						maxWidth: 0,
					} }
					data-skip-in-text="true"
				>
					{ attributes.previewText }
				</div>
				<InnerBlocks.Content />,
			</body>
		);
	},
} );
