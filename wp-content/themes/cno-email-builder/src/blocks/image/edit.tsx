import {
	MediaPlaceholder,
	useBlockProps,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { image } from '@wordpress/icons';
import LinkSettings from './LinkSettings';

const ACCEPT = 'image/*';
const ALLOWED_MEDIA_TYPES = [ 'image/png', 'image/jpeg' ];

export default function Edit( props ) {
	const {
		attributes: { id, url, alt, title },
		setAttributes,
	} = props;
	const [ imgPreview, setImgPreview ] = useState( url );

	function handleImageSelect( img ) {
		let newImgURL = null;
		if ( isBlobURL( img.url ) ) {
			newImgURL = img.url;
		} else {
			newImgURL = img.sizes
				? img.sizes.full.url
				: img.media_details.sizes.full.source_url;
			setAttributes( {
				id: img.id,
				url: newImgURL,
				alt: img.alt,
				title: img.title,
			} );
			revokeBlobURL( imgPreview );
		}
		setImgPreview( newImgURL );
	}

	function handleError( error ) {
		console.error( error );
	}

	return (
		<>
			{ imgPreview && (
				<BlockControls>
					<ToolbarGroup>
						<MediaReplaceFlow
							name="Replace"
							mediaId={ id }
							onSelect={ handleImageSelect }
							mediaUrl={ url }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							accept={ ACCEPT }
							onError={ handleError }
						/>
					</ToolbarGroup>
					<LinkSettings { ...props } />
				</BlockControls>
			) }
			<div { ...useBlockProps() }>
				{ imgPreview && (
					<img
						src={ imgPreview }
						alt={ alt }
						title={ title }
						style={ { width: '100%', height: 'auto' } }
					/>
				) }
				<MediaPlaceholder
					label={ 'Image' }
					icon={ image }
					disableMediaButtons={ imgPreview }
					onSelect={ handleImageSelect }
					onError={ handleError }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					accept={ ACCEPT }
				/>
			</div>
		</>
	);
}
