import { registerBlockType } from '@wordpress/blocks';
import { homeButton } from '@wordpress/icons';
import {
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import metadata from './block.json';
import { calcSpacingObject } from '../_shared/SpacingControl';
import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: homeButton,
	edit: Edit,
	save: ( { attributes } ) => {
		const { maxWidth } = attributes;
		const blockProps = useBlockProps.save( {
			style: {
				maxWidth,
				...calcSpacingObject( attributes ),
				backgroundColor: attributes.backgroundColor || 'gray',
			},
			bgColor: attributes.backgroundColor || 'gray',
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
						{ /* eslint-disable react/no-unknown-property */ }
						<td style={ { backgroundColor: attributes.backgroundColor || 'gray' } } bgcolor={ attributes.backgroundColor || 'gray' }>
							<InnerBlocks.Content />
						</td>
						{ /* eslint-enable react/no-unknown-property */ }
					</tr>
				</tbody>
			</table>
		);
	},
} );
