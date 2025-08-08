import { SelectControl } from '@wordpress/components';
import { DEFAULT_FONTS } from './lib/utils';

export default function DefaultFontPicker( { handleChange, value } ) {
	return (
		<div style={ { paddingBlockStart: '1rem' } }>
			<SelectControl
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				label="Default Fonts"
				onChange={ handleChange }
				options={ DEFAULT_FONTS.map( ( font ) => ( {
					label: font.title!,
					value: font.name,
				} ) ) }
				value={ value }
			/>
		</div>
	);
}
