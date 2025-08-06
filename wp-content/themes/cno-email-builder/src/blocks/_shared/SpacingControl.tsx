import { InspectorControls } from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	Flex,
	FlexItem,
	BoxControl,
} from '@wordpress/components';

export default function SpacingControls(
	{ attributes, setAttributes },
	only?: 'margin' | 'padding'
) {
	return (
		<InspectorControls>
			<Panel header="Spacing">
				<PanelBody>
					<Flex></Flex>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
