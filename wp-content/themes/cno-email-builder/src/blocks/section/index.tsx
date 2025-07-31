import { registerBlockType } from '@wordpress/blocks';
import { group } from '@wordpress/icons';
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import metadata from './block.json';
import { allowedBlocks } from '../lib/allowedBlocks';
import Table from '../lib/Table';

registerBlockType( metadata.name, {
	icon: group,
	edit: () => {
		const blockProps = useBlockProps();
		const allowed = [
			...allowedBlocks.email.filter(
				( blockName ) =>
					blockName !== metadata.name &&
					blockName !== 'cno-email-blocks/container'
			),
			...allowedBlocks.core,
		];
		return (
			<div
				{ ...useInnerBlocksProps( blockProps, {
					allowedBlocks: allowed,
					template: [
						[ 'core/paragraph', { placeholder: 'hey there!' } ],
					],
				} ) }
			/>
		);
	},
	save: () => (
		<Table { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</Table>
	),
} );
