/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { HeightControl } from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
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
					<HeightControl
						label="Height"
						value={ attributes.height }
						onChange={ ( value: string ) =>
							setAttributes( { height: value } )
						}
					/>
					<HeightControl
						label="Width"
						value={ attributes.width }
						onChange={ ( value: string ) =>
							setAttributes( { width: value } )
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
