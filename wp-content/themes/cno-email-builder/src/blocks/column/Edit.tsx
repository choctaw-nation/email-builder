import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

import { responsiveClassNames } from '../_lib/responsiveHelpers';
import useResponsiveAttributes from './useResponsiveAttributes';
import ColumnControls from './ColumnControls';

export default function Edit( props ) {
	const { canWrap, isFirstBlock, isLastBlock, rowGap, columnGap } =
		useResponsiveAttributes( props );
	const { width, height, align } = props.attributes;
	const { setAttributes } = props;
	const blockEditorAlignments = {
		left: 'flex-start',
		center: 'center',
		right: 'flex-end',
	};
	useEffect( () => {
		const padding = columnGap / 2;
		if ( isFirstBlock ) {
			setAttributes( {
				padding: { paddingRight: padding },
			} );
		} else if ( isLastBlock ) {
			setAttributes( {
				padding: { paddingLeft: padding },
			} );
		} else {
			setAttributes( {
				padding: {
					paddingLeft: padding,
					paddingRight: padding,
				},
			} );
		}
	}, [ rowGap, columnGap, setAttributes, isFirstBlock, isLastBlock ] );

	const innerBlocksProps = useInnerBlocksProps(
		useBlockProps( {
			style: {
				width,
				height,
				justifySelf: align ? blockEditorAlignments[ align ] : undefined,
				display: 'flex',
				flexDirection: 'column',
				rowGap: rowGap ? `${ rowGap }px` : undefined,
				columnGap: columnGap ? `${ columnGap }px` : undefined,
			},
			className: canWrap ? responsiveClassNames.col : undefined,
		} ),
		{
			template: [
				[ 'core/paragraph', { placeholder: 'Column content...' } ],
			],
		}
	);
	return (
		<>
			<ColumnControls { ...props } />
			<div { ...innerBlocksProps } />
		</>
	);
}
