import { InspectorControls } from '@wordpress/block-editor';
import {
	ColorPalette,
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

import './editor.scss';

import FontControl from './font-controls/_FontControl';
import { DEFAULT_FONT_URL } from './font-controls/utils';
import useColorPalettes from '../_shared/hooks/useColorPalettes';

export default function BlockControls( props ) {
	const {
		attributes: {
			title,
			previewText,
			useDefaultFonts,
			fontUrl,
			backgroundColor,
		},
		setAttributes,
	} = props;
	const { choctawLanding, baseColorsPalette } = useColorPalettes();

	return (
		<InspectorControls>
			<Panel header="Meta Email Settings">
				<PanelBody title="Preview Settings">
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
				<PanelBody title="Preview Background Color">
					<ColorPalette
						__experimentalIsRenderedInSidebar
						title="Background Color"
						value={ backgroundColor }
						colors={ [ baseColorsPalette, choctawLanding ] }
						onChange={ ( backgroundColor ) =>
							setAttributes( { backgroundColor } )
						}
						headingLevel={ 3 }
					/>
				</PanelBody>
				<PanelBody title="Color Definitions" initialOpen={ false }>
					<div>Color definitions can go here</div>
				</PanelBody>
			</Panel>
			<Panel header="Fonts">
				<PanelBody title="Font Import Location">
					<ToggleGroupControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						isBlock
						onChange={ ( val ) => {
							const useDefaultFonts = 'true' === val;
							setAttributes( {
								useDefaultFonts,
								fontUrl: useDefaultFonts
									? DEFAULT_FONT_URL
									: '',
							} );
						} }
						value={ useDefaultFonts ? 'true' : 'false' }
						label="Font Import URL"
					>
						<ToggleGroupControlOption
							label="Default"
							value="true"
						/>
						<ToggleGroupControlOption
							label="Custom"
							value="false"
						/>
					</ToggleGroupControl>
					{ ! useDefaultFonts && (
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label="Custom URL"
							placeholder={ DEFAULT_FONT_URL }
							value={ fontUrl }
							onChange={ ( fontUrl ) => {
								setAttributes( { fontUrl } );
							} }
						/>
					) }
				</PanelBody>
				<FontControl { ...props } />
			</Panel>
		</InspectorControls>
	);
}
