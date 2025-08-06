import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import {
	reset,
	formatCapitalize,
	formatLowercase,
	formatUppercase,
	alignLeft,
	alignCenter,
	alignRight,
	alignJustify,
} from '@wordpress/icons';
import { useMemo } from '@wordpress/element';

const TEXT_ALIGNMENT_OPTIONS = [
	{
		label: 'Align text left',
		value: 'left',
		icon: alignLeft,
	},
	{
		label: 'Align text center',
		value: 'center',
		icon: alignCenter,
	},
	{
		label: 'Align text right',
		value: 'right',
		icon: alignRight,
	},
	{
		label: 'Justify text',
		value: 'justify',
		icon: alignJustify,
	},
];

const DEFAULT_OPTIONS = [ 'left', 'center', 'right' ];
/**
 * Control to facilitate text alignment selections.
 *
 * @param {Object}   props           Component props.
 * @param {string}   props.value     Currently selected text alignment.
 * @param {Function} props.onChange  Handles change in text alignment selection.
 * @param {string[]} props.options   Array of text alignment options to display.
 *
 * @return {Element} Text alignment control.
 */
export function TextAlignmentControl( {
	value,
	onChange,
	options = DEFAULT_OPTIONS,
} ) {
	const validOptions = useMemo(
		() =>
			TEXT_ALIGNMENT_OPTIONS.filter( ( option ) =>
				options.includes( option.value )
			),
		[ options ]
	);

	if ( ! validOptions.length ) {
		return null;
	}

	return (
		<ToggleGroupControl
			isDeselectable
			__nextHasNoMarginBottom
			__next40pxDefaultSize
			label={ 'Text alignment' }
			className="block-editor-text-alignment-control"
			value={ value }
			onChange={ ( newValue ) => {
				onChange( newValue === value ? undefined : newValue );
			} }
		>
			{ validOptions.map( ( option ) => {
				return (
					<ToggleGroupControlOptionIcon
						key={ option.value }
						value={ option.value }
						icon={ option.icon }
						label={ option.label }
					/>
				);
			} ) }
		</ToggleGroupControl>
	);
}

const TEXT_TRANSFORMS = [
	{
		label: 'None',
		value: 'none',
		icon: reset,
	},
	{
		label: 'Uppercase',
		value: 'uppercase',
		icon: formatUppercase,
	},
	{
		label: 'Lowercase',
		value: 'lowercase',
		icon: formatLowercase,
	},
	{
		label: 'Capitalize',
		value: 'capitalize',
		icon: formatCapitalize,
	},
];

/**
 * Control to facilitate text transform selections.
 *
 * @param {Object}   props           Component props.
 * @param {string}   props.value     Currently selected text transform.
 * @param {Function} props.onChange  Handles change in text transform selection.
 *
 * @return {Element} Text transform control.
 */
export function TextTransformControl( { value, onChange } ) {
	return (
		<ToggleGroupControl
			isDeselectable
			__nextHasNoMarginBottom
			__next40pxDefaultSize
			label={ 'Letter case' }
			className="block-editor-text-transform-control"
			value={ value }
			onChange={ ( newValue ) => {
				onChange( newValue === value ? undefined : newValue );
			} }
		>
			{ TEXT_TRANSFORMS.map( ( option ) => {
				return (
					<ToggleGroupControlOptionIcon
						key={ option.value }
						value={ option.value }
						icon={ option.icon }
						label={ option.label }
					/>
				);
			} ) }
		</ToggleGroupControl>
	);
}
