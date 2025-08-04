import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';

export default function useResponsiveChildBlocks( props ) {
	const {
		clientId,
		attributes: { canWrap },
	} = props;
	const innerBlockCount = useSelect(
		( select ) => {
			const { getBlock } = select( blockEditorStore );
			const block = getBlock( clientId );
			console.log( block?.innerBlocks.length );
			return block?.innerBlocks?.length || 0;
		},
		[ clientId ]
	);
	useEffect( () => {
		if ( canWrap ) {
			console.log( innerBlockCount );
		}
		// Update the responsive styles for child blocks
	}, [ canWrap, innerBlockCount ] );
	return { innerBlockCount };
}
