import { registerBlockType } from '@wordpress/blocks';
import { group } from '@wordpress/icons';
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';

import metadata from './block.json';
import { allowedBlocks } from '../_lib/allowedBlocks';
import { SectionTable as Table } from '../_lib/Table';
import { Panel } from '@wordpress/components';
import SpacingControls, { calcSpacingObject } from '../_shared/SpacingControl';

registerBlockType( metadata.name, {
	icon: group,
	edit: ( props ) => {
		const blockProps = useBlockProps( {
			style: calcSpacingObject( props.attributes ),
		} );
		const innerBlocksProps = useInnerBlocksProps( blockProps, {
			allowedBlocks: Object.values( allowedBlocks )
				.flat()
				.filter( ( blockName ) => blockName !== metadata.name ),
			template: [
				[ 'core/paragraph', { placeholder: 'Add some content...' } ],
			],
			templateLock: false,
		} );
		return (
			<>
				<InspectorControls>
					<Panel>
						<SpacingControls { ...props } splitOnAxis={ true } />
					</Panel>
				</InspectorControls>
				<div { ...innerBlocksProps } />
			</>
		);
	},
	save: ( { attributes } ) => {
		const { align } = attributes;
		const blockProps = useBlockProps.save( {
			style: {
				textAlign: align,
				...calcSpacingObject( attributes ),
			},
		} );
		return (
			<Table { ...blockProps }>
				<InnerBlocks.Content />
			</Table>
		);
	},
} );
