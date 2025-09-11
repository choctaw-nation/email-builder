import { calcSpacingObject } from '../_shared/SpacingControl';

export default function getBlockStyle( attributes ): React.CSSProperties {
	const { border, width } = attributes;
	const blockStyle: React.CSSProperties = {};
	if ( Object.values( border ).some( ( val ) => val ) ) {
		blockStyle.border = 0;
		if ( border?.color ) {
			blockStyle.borderColor = border.color;
		}

		if ( border?.width ) {
			blockStyle.borderTopWidth = border.width;
		}

		if ( border?.style ) {
			blockStyle.borderStyle = border.style;
		}
	}

	if ( width ) {
		blockStyle.marginLeft = 'auto';
		blockStyle.marginRight = 'auto';
		blockStyle.width = width;
	}

	return { ...blockStyle, ...calcSpacingObject( attributes ) };
}
