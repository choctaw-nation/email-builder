import { InspectorControls } from '@wordpress/block-editor';
import {
	Flex,
	FlexItem,
	Panel,
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { MAX_WIDTH } from '../lib/consts';

export default function RowControls( { attributes, setAttributes } ) {
	const { columnGap, rowGap, canWrap, maxWidth } = attributes;
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Row Controls">
					<Flex direction={ 'column' } gap={ 8 } align="stretch">
						<FlexItem isBlock>
							<ToggleControl
								__nextHasNoMarginBottom
								label="Can Wrap"
								checked={ canWrap }
								onChange={ ( value ) =>
									setAttributes( { canWrap: value } )
								}
							/>
						</FlexItem>
						<FlexItem isBlock={ true }>
							<RangeControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								value={ maxWidth }
								onChange={ ( maxWidth ) =>
									setAttributes( {
										maxWidth: maxWidth || 0,
									} )
								}
								help="Max 600px"
								allowReset={ true }
								resetFallbackValue={ MAX_WIDTH }
								max={ MAX_WIDTH }
								label="Max Width"
							/>
						</FlexItem>
					</Flex>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
