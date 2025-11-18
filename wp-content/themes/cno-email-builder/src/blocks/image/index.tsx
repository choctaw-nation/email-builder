import { registerBlockType } from '@wordpress/blocks';
import { image } from '@wordpress/icons';

import metadata from './block.json';
import Edit from './edit';
import { getImageStyle } from './utils';

registerBlockType( metadata.name, {
	icon: image,
	edit: Edit,
	save: ( { attributes } ) => {
		const {
			url,
			alt,
			title,
			linkDestination,
			rel,
			linkTarget,
			width,
			height,
		} = attributes;
		const isLink = '' !== linkDestination;
		const imageStyle = getImageStyle( attributes );

		return isLink ? (
			<a href={ linkDestination } target={ linkTarget } rel={ rel }>
				<img
					src={ url }
					alt={ alt }
					title={ title }
					style={ imageStyle }
					width={ width }
					height={ height || 'auto' }
				/>
			</a>
		) : (
			<img
				src={ url }
				width={ width }
				height={ height || 'auto' }
				alt={ alt }
				title={ title }
				style={ imageStyle }
			/>
		);
	},
} );
