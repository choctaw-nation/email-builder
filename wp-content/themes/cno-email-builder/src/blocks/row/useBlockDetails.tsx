import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function useBlockDetails( clientId ) {
	const innerBlockCount = useSelect(
		( select ) => {
			const { getBlock } = select( blockEditorStore );
			const block = getBlock( clientId );
			return block?.innerBlocks?.length || 0;
		},
		[ clientId ]
	);
	const parentBlock = useSelect(
		( select ) => {
			const { getBlock, getBlockName, getBlockRootClientId } =
				select( blockEditorStore );
			const parentClientId = getBlockRootClientId( clientId );
			let parentBlock = null;
			if ( parentClientId ) {
				parentBlock = getBlock( parentClientId );
			}
			return parentBlock
				? {
					name: getBlockName( parentClientId ),
					attributes: parentBlock.attributes,
				}
				: null;
		},
		[ clientId ]
	);
	return { innerBlockCount, parentBlock };
}
