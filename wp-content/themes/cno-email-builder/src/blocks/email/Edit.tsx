import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import { actions as ColorStoreActions } from '../../stores/colors/actions';
import { State as ColorStoreState } from '../../stores/colors/types';

import BlockControls from './BlockControls';

import { STORES } from '../../stores/consts';
import emailStyles from './emailStyles';

export default function Edit( props ) {
	const {
		attributes: {
			previewText,
			fontUrl,
			headingsFont,
			bodyFont,
			customColorPalette,
		},
		setAttributes,
	} = props;

	const responsiveBlocks = useSelect(
		( select: any ) =>
			select( STORES.RESPONSIVE_STYLES ).getResponsiveBlockTypes(),
		[]
	);
	const {
		setColor,
		removeColor,
		allowCustomColors,
	}: typeof ColorStoreActions = useDispatch( STORES.COLORS );
	const [ hasCustomColors, setHasCustomColors ] = useState(
		!! customColorPalette &&
				Object.values( customColorPalette ).length > 0
	);

	useEffect( () => {
		allowCustomColors( hasCustomColors );
	}, [ hasCustomColors, allowCustomColors ] );

	useEffect( () => {
		if ( ! hasCustomColors ) {
			return;
		}
		Object.entries( customColorPalette ).forEach(
			( [ key, value ] ) => {
				if ( value ) {
					setColor( {
						color: key as keyof ColorStoreState,
						value: value as string,
					} );
				} else {
					removeColor( { color: key as keyof ColorStoreState } );
				}
			}
		);
	}, [ customColorPalette, hasCustomColors, removeColor, setColor ] );

	useEffect( () => {
		setAttributes( { responsiveBlocks } );
	}, [ responsiveBlocks, setAttributes ] );

	const blockProps = useBlockProps( { className: 'email-wrapper' } );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'email-wrapper__body' },
		{
			template: [
				[
					'cno-email-blocks/container',
					{
						attributes: { lock: { move: true, remove: true } },
					},
					[ [ 'cno-email-blocks/text' ] ],
				],
			],
			templateLock: false,
			renderAppender: false,
		}
	);
	return (
		<>
			<BlockControls
				{ ...props }
				hasCustomColors={ hasCustomColors }
				setHasCustomColors={ setHasCustomColors }
			/>
			<div { ...blockProps }>
				<div className="email-wrapper__header">
					<div className="email-preview">
						<strong>Preview Text:</strong>{ ' ' }
						{ previewText && previewText }
						{ ! previewText && (
							<span className="email-preview__missing">
								No preview text!
							</span>
						) }
					</div>
				</div>
				<style
					type="text/css"
					dangerouslySetInnerHTML={ {
						__html: `
					@import url("${ fontUrl }");
					:where(.email-wrapper__body) {
						${ emailStyles( headingsFont, bodyFont ) }
					}`,
					} }
				/>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
