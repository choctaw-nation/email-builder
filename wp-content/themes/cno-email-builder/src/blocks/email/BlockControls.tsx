import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, TextControl } from '@wordpress/components';

import './editor.scss';

export default function BlockControls( { attributes, setAttributes } ) {
	const { title, previewText } = attributes;
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Email Settings">
					<PanelRow>
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label="Email Title"
							value={ title }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label="Email Preview"
							value={ previewText }
							onChange={ ( value ) =>
								setAttributes( { previewText: value } )
							}
						/>
					</PanelRow>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
