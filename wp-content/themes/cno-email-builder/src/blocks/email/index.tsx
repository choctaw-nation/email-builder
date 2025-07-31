import { registerBlockType } from '@wordpress/blocks';
import { homeButton } from '@wordpress/icons';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';
import BlockControls from './BlockControls';
import { allowedBlocks } from '../lib/allowedBlocks';

registerBlockType( metadata.name, {
	icon: homeButton,
	edit: ( props ) => {
		const {
			attributes: { previewText },
		} = props;

		return (
			<>
				<BlockControls { ...props } />
				<div { ...useBlockProps( { className: 'email-wrapper' } ) }>
					{ previewText && (
						<div className="email-wrapper__header">
							<div className="email-preview">
								<strong>Preview Text:</strong> { previewText }
							</div>
						</div>
					) }
					<div className="email-wrapper__body">
						<InnerBlocks allowedBlocks={ allowedBlocks } />
					</div>
				</div>
			</>
		);
	},
	save: () => <InnerBlocks.Content />,
} );
