import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	HeightControl,
} from '@wordpress/block-editor';
import { BorderControl, Panel, PanelBody } from '@wordpress/components';
import SpacingControl, { calcSpacingObject } from '../_shared/SpacingControl';

import metadata from './block.json';
import { separator } from '@wordpress/icons';

registerBlockType( metadata.name, {
	icon: separator,
	edit: ( { attributes, setAttributes } ) => {
		const blockProps = useBlockProps( {
			style: getBlockStyle( attributes ),
		} );
		return (
			<>
				<InspectorControls>
					<Panel>
						<PanelBody title="Divider Settings">
							<div
								style={ {
									display: 'flex',
									flexDirection: 'column',
									gap: '10px',
								} }
							>
								<HeightControl
									label="Width"
									value={ attributes.width || '' }
									onChange={ ( value ) => {
										setAttributes( {
											width:
												'' === value ? '100%' : value,
										} );
									} }
								/>
								<BorderControl
									__next40pxDefaultSize
									enableStyle
									label="Border"
									value={ attributes.border || {} }
									onChange={ ( val ) => {
										setAttributes( {
											border: val,
										} );
									} }
									shouldSanitizeBorder
								/>
							</div>
						</PanelBody>
						<SpacingControl
							attributes={ attributes }
							setAttributes={ setAttributes }
							only="margin"
							sides={ [ 'vertical' ] }
						/>
					</Panel>
				</InspectorControls>
				<hr { ...blockProps } />
			</>
		);
	},

	save: ( { attributes } ) => {
		const blockProps = useBlockProps.save( {
			style: getBlockStyle( attributes ),
		} );
		return <hr { ...blockProps } />;
	},
} );

function getBlockStyle( attributes ): React.CSSProperties {
	const { border, width } = attributes;
	const blockStyle: React.CSSProperties = {};
	if ( Object.values( border ).some( ( val ) => val ) ) {
		blockStyle.border = 0;
		if ( border?.color ) {
			blockStyle.borderColor = border.color;
		}

		if ( border?.width ) {
			blockStyle.borderTopWidth = border.width;
		}

		if ( border?.style ) {
			blockStyle.borderStyle = border.style;
		}
	}

	if ( width ) {
		blockStyle.marginLeft = 'auto';
		blockStyle.marginRight = 'auto';
		blockStyle.width = width;
	}

	return { ...blockStyle, ...calcSpacingObject( attributes ) };
}
