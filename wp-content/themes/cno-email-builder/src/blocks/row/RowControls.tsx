import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, ToggleControl } from '@wordpress/components';

export default function RowControls( { attributes, setAttributes } ) {
	const { columnGap, rowGap, canWrap } = attributes;
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Row Controls">
					<ToggleControl
						__nextHasNoMarginBottom
						label="Can Wrap"
						checked={ canWrap }
						onChange={ ( value ) =>
							setAttributes( { canWrap: value } )
						}
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
