import {
	MediaPlaceholder,
	useBlockProps,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { link, linkOff } from '@wordpress/icons';

const ACCEPT = 'image/*';
const ALLOWED_MEDIA_TYPES = [ 'image/png', 'image/jpeg' ];

export default function Edit( { attributes, setAttributes } ) {
	const { id, url, alt, title } = attributes;
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
				<BlockControls group="inline">
					<MediaReplaceFlow
						name="Replace Image"
						mediaId={ id }
						onSelect={ handleImageSelect }
						mediaUrl={ url }
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						accept={ ACCEPT }
						onError={ handleError }
					/>
					<ToolbarButton
						onClick={ () =>
							setAttributes( {
								id: 0,
								url: '',
								alt: '',
								title: '',
							} )
						}
					>
						Remove Image
					</ToolbarButton>
					<ToolbarButton
						onClick={ () =>
							setAttributes( {
								id: 0,
								url: '',
								alt: '',
								title: '',
							} )
						}
					>
						{ link }
					</ToolbarButton>
				</BlockControls>
			) }
			<div { ...useBlockProps() }>
				{ imgPreview && (
					<img src={ imgPreview } alt={ alt } title={ title } />
				) }
				<MediaPlaceholder
					label={ 'Upload an Image' }
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
