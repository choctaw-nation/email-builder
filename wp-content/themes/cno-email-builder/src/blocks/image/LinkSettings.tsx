import { ToolbarButton, ToggleControl, Button } from '@wordpress/components';
import { URLPopover, URLInput } from '@wordpress/block-editor';
import { keyboardReturn, link } from '@wordpress/icons';
import { useState } from '@wordpress/element';

export default function LinkSettings( { attributes, setAttributes } ) {
	const { linkDestination, rel, linkTarget } = attributes;
	const [ isVisible, setIsVisible ] = useState( false );
	const [ isEditing, setIsEditing ] = useState( false );
	const linkIsSet = '' !== linkDestination;
	return (
		<ToolbarButton
			__next40pxDefaultSize
			icon={ link }
			isPressed={ '' !== linkDestination }
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
						>
							<URLInput
								value={ linkDestination }
								onChange={ ( newValue ) => {
									setAttributes( {
										linkDestination: newValue,
									} );
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
						<URLPopover.LinkViewer
							url={ linkDestination }
							onEditLinkClick={ () => {
								setAttributes( {
									linkDestination: '',
								} );
								setIsEditing( true );
							} }
						/>
					) }
				</URLPopover>
			) }
		</ToolbarButton>
	);
}
