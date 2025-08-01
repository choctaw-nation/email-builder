import { registerBlockType } from '@wordpress/blocks';
import { image } from '@wordpress/icons';

import metadata from './block.json';
import Edit from './edit';

registerBlockType( metadata.name, {
	icon: image,
	edit: Edit,
	save: ( { attributes } ) => {
		const { url, alt, title, linkDestination, rel, linkTarget } =
			attributes;
		const isLink = '' !== linkDestination;

		return isLink ? (
			<a href={ linkDestination } target={ linkTarget } rel={ rel }>
				<img
					src={ url }
					alt={ alt }
					title={ title }
					style={ imageStyle }
				/>
			</a>
		) : (
			<img src={ url } alt={ alt } title={ title } style={ imageStyle } />
		);
	},
} );

const imageStyle = {
	width: '100%',
	height: 'auto',
};
