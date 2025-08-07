import { registerBlockType } from '@wordpress/blocks';
import { table } from '@wordpress/icons';
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import metadata from './block.json';
import BlockControls from './BlockControls';
import { allowedBlocks } from '../_lib/allowedBlocks';

registerBlockType( metadata.name, {
	icon: table,
	edit: ( props ) => {
		const {
			attributes: { previewText },
		} = props;
		const blockProps = useBlockProps( { className: 'email-wrapper' } );
		const innerBlocksProps = useInnerBlocksProps(
			{ className: 'email-wrapper__body' },
			{
				allowedBlocks: [
					'cno-email-blocks/head',
					'cno-email-blocks/body',
				],
				template: [
					[ 'cno-email-blocks/head' ],
					[ 'cno-email-blocks/body' ],
				],
			}
		);
		return (
			<>
				<BlockControls { ...props } />
				<div { ...blockProps }>
					{ previewText && (
						<div className="email-wrapper__header">
							<div className="email-preview">
								<strong>Preview Text:</strong> { previewText }
							</div>
						</div>
					) }
					<div { ...innerBlocksProps } />
				</div>
			</>
		);
	},
	save: () => (
		<html lang="en" dir="ltr">
			<InnerBlocks.Content />
		</html>
	),
} );
