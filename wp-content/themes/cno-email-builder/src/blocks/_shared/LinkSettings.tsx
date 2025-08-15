import { ToolbarButton, ToggleControl, Button } from '@wordpress/components';
import { URLPopover, URLInput } from '@wordpress/block-editor';
import { keyboardReturn, link, linkOff } from '@wordpress/icons';
import { useState } from '@wordpress/element';

export default function LinkSettings( { attributes, setAttributes } ) {
	const { linkDestination, rel, linkTarget } = attributes;
	const [ isVisible, setIsVisible ] = useState( false );
	const [ isEditing, setIsEditing ] = useState( false );
	const [ url, setUrl ] = useState( linkDestination );

	const linkIsSet = !! linkDestination;
	return (
		<ToolbarButton
			__next40pxDefaultSize
			icon={ link }
			isPressed={ linkIsSet }
			onClick={ () => setIsVisible( true ) }
		>
			{ isVisible && (
				<URLPopover
					url={ linkDestination }
					onClose={ () => setIsVisible( false ) }
					rel={ rel }
					target={ linkTarget }
					renderSettings={ () => (
						<ToggleControl
							__nextHasNoMarginBottom
							label={ 'Open in new tab' }
							checked={ linkTarget === '_blank' }
							onChange={ ( newValue ) => {
								setAttributes( {
									linkTarget: newValue ? '_blank' : '_self',
									rel: newValue
										? 'noopener noreferrer'
										: undefined,
								} );
							} }
						/>
					) }
				>
					{ ( ! linkIsSet || isEditing ) && (
						<form
							className={
								'block-editor-url-popover__link-editor'
							}
							onSubmit={ ( ev ) => {
								ev.preventDefault();
								setIsEditing( false );
								setAttributes( { linkDestination: url } );
							} }
						>
							<URLInput
								placeholder="https://..."
								value={ url }
								onChange={ ( newValue ) => {
									setUrl( newValue );
								} }
								disableSuggestions={ true }
								onBlur={ () => setIsEditing( false ) }
							/>
							<Button
								icon={ keyboardReturn }
								label={ 'Apply' }
								type="submit"
								size="compact"
							/>
						</form>
					) }
					{ linkIsSet && ! isEditing && (
						<>
							<URLPopover.LinkViewer
								url={ url }
								onEditLinkClick={ () => {
									setUrl( '' );
									setIsEditing( true );
								} }
							/>
							<Button
								__next40pxDefaultSize
								icon={ linkOff }
								onClick={ () => {
									setUrl( '' );
									setAttributes( { linkDestination: '' } );
								} }
							/>
						</>
					) }
				</URLPopover>
			) }
		</ToolbarButton>
	);
}
