import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

import metadata from './block.json';
import FontControl from './_FontControl';
import { DEFAULT_FONT_URL } from './lib/utils';

registerBlockType( metadata.name, {
	edit: ( props ) => {
		const { attributes, setAttributes } = props;
		const { useDefaultFonts, fontUrl } = attributes;

		const blockProps = useBlockProps( {
			style: {
				display: 'grid',
				placeContent: 'center',
				paddingBlock: '1rem',
				textAlign: 'center',
				backgroundColor: '#4b4b4b',
				color: 'white',
			},
		} );
		return (
			<>
				<InspectorControls>
					<Panel header="Font Settings">
						<PanelBody title="Import Font">
							<ToggleGroupControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								isBlock
								onChange={ ( val ) => {
									setAttributes( {
										useDefaultFonts: val === 'true',
									} );
								} }
								value={ useDefaultFonts ? 'true' : 'false' }
								label="Font Import Location"
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
									label="Custom Font URL"
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
				<div { ...blockProps }>
					<div>
						<h2 style={ { margin: 0 } }>Font Block</h2>
						<p style={ { margin: 0 } }>
							Use this block's settings to add some custom fonts.
						</p>
					</div>
					<style
						type="text/css"
						dangerouslySetInnerHTML={ {
							__html: `
							@import url("${ useDefaultFonts ? DEFAULT_FONT_URL : fontUrl }");
							:where(.email-wrapper__body) {
								${ emailStyles( attributes ) }
							}`,
						} }
					/>
				</div>
			</>
		);
	},

	save: ( { attributes } ) => {
		return (
			<style
				type="text/css"
				dangerouslySetInnerHTML={ {
					__html: `
					@import url("${
						attributes.useDefaultFonts
							? DEFAULT_FONT_URL
							: attributes.fontUrl
					}");
					${ emailStyles( attributes ) }`,
				} }
			/>
		);
	},
} );

function emailStyles( attributes ): string {
	const { headingsFont, bodyFont } = attributes;
	return `
		body,p,a,td {
			text-wrap:balance;
			font-family: ${ bodyFont.name }, ${ bodyFont.fallbackStack.value }
		}
		
		h1,h2,h3,h4,h5,h6 {
			text-wrap:balance;
			font-family: ${ headingsFont.name }, ${ headingsFont.fallbackStack.value };
		}
	`;
}
