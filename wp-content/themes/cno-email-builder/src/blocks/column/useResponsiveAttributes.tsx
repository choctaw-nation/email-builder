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
	const rowGap = context[ 'cno-email-blocks/rowGap' ];
	const columnGap = context[ 'cno-email-blocks/columnGap' ];
	const { parentId, isLastBlock, isFirstBlock } = useSelect(
		( select ) => {
			const parentId =
				select( blockEditorStore ).getBlockRootClientId( clientId );
			const blockOrder =
				select( blockEditorStore ).getBlockOrder( parentId );
			const isLastBlock = blockOrder.at( -1 ) === clientId;
			const isFirstBlock = blockOrder[ 0 ] === clientId;
			return { parentId, isLastBlock, isFirstBlock };
		},
		[ clientId ]
	);
	const { addBlockType, removeBlockType } = useDispatch(
		STORES.RESPONSIVE_STYLES
	);

	useEffect( () => {
		setAttributes( { isResponsive: canWrap, isLastBlock, isFirstBlock } );
		if ( canWrap ) {
			addBlockType( { blockType: 'col', parentId, clientId } );
		}
		return () => {
			if ( canWrap ) {
				removeBlockType( { blockType: 'col', parentId, clientId } );
			}
		};
	}, [ canWrap, parentId, setAttributes, addBlockType, removeBlockType, clientId, isFirstBlock, isLastBlock ] );

	return { canWrap, rowGap, columnGap, isFirstBlock, isLastBlock };
}
