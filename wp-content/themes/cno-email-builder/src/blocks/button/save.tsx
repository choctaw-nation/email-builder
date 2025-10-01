import { useBlockProps, RichText } from '@wordpress/block-editor';
import { calcStyleObject } from '../_shared/TypographyControls';
import { calcSpacingObject } from '../_shared/SpacingControl';

export default function save( { attributes } ) {
	const { content, linkDestination, rel, linkTarget, backgroundColor, borderColor, borderWidth, borderRadius } = attributes;
	const blockProps = useBlockProps.save( {
		style: {
			...calcStyleObject( attributes ),
			...calcSpacingObject( attributes ),
			display: 'inline-block',
			textDecoration: 'none',
			textAlign: attributes.textAlign || 'left',
			borderColor,
			backgroundColor,
			borderRadius,
			borderWidth,
			borderStyle: 'solid',
		},
		align: attributes.textAlign || 'left',
	} );
	return <RichText.Content
		{ ...blockProps }
		tagName="a"
		value={ content }
		href={ linkDestination }
		rel={ rel }
		target={ linkTarget }
	/>;
}
