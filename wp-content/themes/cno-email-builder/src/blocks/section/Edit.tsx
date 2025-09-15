import {
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import { allowedBlocks } from '../_lib/allowedBlocks';
import { Panel } from '@wordpress/components';
import SpacingControls, { calcSpacingObject } from '../_shared/SpacingControl';
import metadata from './block.json';

export default function Edit( props ) {
	const spacingObject = calcSpacingObject( props.attributes );
	const blockProps = useBlockProps( {
		style: spacingObject,
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: Object.values( allowedBlocks )
			.flat()
			.filter( ( blockName ) => blockName !== metadata.name ),
		template: [
			[ 'core/paragraph', { placeholder: 'Add some content...' } ],
		],
		templateLock: false,
	} );
	return (
		<>
			<InspectorControls>
				<Panel>
					<SpacingControls { ...props } splitOnAxis={ true } />
				</Panel>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
}
