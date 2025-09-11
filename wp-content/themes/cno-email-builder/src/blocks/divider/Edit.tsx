import {
	useBlockProps,
	InspectorControls,
	HeightControl,
} from '@wordpress/block-editor';
import { BorderControl, Panel, PanelBody } from '@wordpress/components';
import SpacingControl from '../_shared/SpacingControl';
import getBlockStyle from './getBlockStyle';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		style: getBlockStyle( attributes ),
	} );
	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody title="Divider Settings">
						<div
							style={ {
								display: 'flex',
								flexDirection: 'column',
								gap: '10px',
							} }
						>
							<HeightControl
								label="Width"
								value={ attributes.width || '' }
								onChange={ ( value ) => {
									setAttributes( {
										width: '' === value ? '100%' : value,
									} );
								} }
							/>
							<BorderControl
								__next40pxDefaultSize
								enableStyle
								label="Border"
								value={ attributes.border || {} }
								onChange={ ( val ) => {
									setAttributes( {
										border: val,
									} );
								} }
								shouldSanitizeBorder
							/>
						</div>
					</PanelBody>
					<SpacingControl
						attributes={ attributes }
						setAttributes={ setAttributes }
						only="margin"
						sides={ [ 'vertical' ] }
					/>
				</Panel>
			</InspectorControls>
			<hr { ...blockProps } />
		</>
	);
}
