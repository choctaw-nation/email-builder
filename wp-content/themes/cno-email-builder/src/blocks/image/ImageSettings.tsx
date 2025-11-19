/* eslint-disable @wordpress/no-unsafe-wp-apis */
import {
	Panel,
	PanelBody,
	RangeControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

export default function ImageSettings( { attributes, setAttributes } ) {
	return (
		<Panel>
			<PanelBody title="Image Settings">
				<div
					style={ {
						display: 'flex',
						gap: '1rem',
						flexDirection: 'column',
						alignItems: 'stretch',
					} }
				>
					<RangeControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label="Width"
						allowReset={ true }
						max={ 600 }
						min={ 10 }
						value={ attributes.width }
						onChange={ ( value ) => {
							setAttributes( { width: value } );
						} }
					/>
					<RangeControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label="Height"
						min={ 10 }
						max={ 350 }
						allowReset={ true }
						value={ attributes.height }
						onChange={ ( value ) =>
							setAttributes( { height: value } )
						}
					/>
					<ToggleGroupControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						isBlock
						label="Image Scale"
						value={ attributes.scale }
						onChange={ ( value ) =>
							setAttributes( { scale: value } )
						}
					>
						<ToggleGroupControlOption
							value="contain"
							label="Contain"
						/>
						<ToggleGroupControlOption value="cover" label="Cover" />
					</ToggleGroupControl>
				</div>
			</PanelBody>
		</Panel>
	);
}
