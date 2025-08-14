import { InspectorControls, HeightControl } from '@wordpress/block-editor';
import { Flex, Panel, PanelBody } from '@wordpress/components';
export default function ColumnControls( { attributes, setAttributes } ) {
	return (
		<InspectorControls>
			<Panel header="Column Settings">
				<PanelBody>
					<Flex gap={ 8 } direction="column">
						<HeightControl
							label="Column Width"
							value={ attributes.width || '' }
							onChange={ ( width ) => {
								setAttributes( { width } );
							} }
						/>
						<HeightControl
							label="Column Height"
							value={ attributes.height || '' }
							onChange={ ( height ) => {
								setAttributes( { height } );
							} }
						/>
					</Flex>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
