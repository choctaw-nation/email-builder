import { store as blockEditorStore } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { STORES } from '../../stores/consts';

export default function useResponsiveAttributes( {
	setAttributes,
	context,
	clientId,
} ) {
	const canWrap = context[ 'cno-email-blocks/canWrap' ];
	const parentId = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlockRootClientId( clientId ),
		[ clientId ]
	);
	const { addBlockType, removeBlockType } = useDispatch(
		STORES.RESPONSIVE_STYLES
	);
	const isLastBlock = useSelect(
		( select ) =>
			select( STORES.RESPONSIVE_STYLES ).isLastBlock( {
				clientId,
				parentId,
				blockType: 'col',
			} ),
		[ canWrap ]
	);
	useEffect( () => {
		setAttributes( { isResponsive: canWrap, isLastBlock } );
		if ( canWrap ) {
			addBlockType( { blockType: 'col', parentId, clientId } );
		}
		return () => {
			if ( canWrap ) {
				removeBlockType( { blockType: 'col', parentId, clientId } );
			}
		};
	}, [ canWrap, parentId ] );

	return { canWrap };
}
