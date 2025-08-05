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
import useThemeSpacing from './useThemeSpacing';

export default function RowControls( { attributes, setAttributes } ) {
	const { columnGap, canWrap, maxWidth } = attributes;
	const { spacingScale, scaleMax } = useThemeSpacing();
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
						<FlexItem isBlock={ true }>
							<RangeControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								value={ columnGap }
								onChange={ ( gap ) => {
									const closest = spacingScale.reduce(
										( prev, curr ) =>
											Math.abs( curr.value - gap ) <
											Math.abs( prev.value - gap )
												? curr
												: prev
									);
									setAttributes( {
										columnGap: closest.value,
										rowGap: closest.value,
									} );
								} }
								max={ scaleMax }
								type="stepper"
								step="any"
								withInputField={ false }
								label="Block Spacing"
								marks={ spacingScale }
							/>
						</FlexItem>
					</Flex>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
