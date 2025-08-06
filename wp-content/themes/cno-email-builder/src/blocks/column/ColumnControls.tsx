import { InspectorControls, HeightControl } from '@wordpress/block-editor';
import { Panel, PanelBody } from '@wordpress/components';
import FlexContainer from '../_lib/FlexContainer';

export default function ColumnControls( { attributes, setAttributes } ) {
	return (
		<InspectorControls>
			<Panel header="Column Settings">
				<PanelBody>
					<FlexContainer>
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
					</FlexContainer>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
