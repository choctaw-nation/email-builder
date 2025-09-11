import { Fragment } from '@wordpress/element';
import { useSettings } from '@wordpress/block-editor';
import { PanelBody, Flex, BoxControl, FlexBlock } from '@wordpress/components';

export type AllowedSides =
	| 'top'
	| 'right'
	| 'bottom'
	| 'left'
	| 'horizontal'
	| 'vertical';

export default function SpacingControls( {
	attributes,
	setAttributes,
	only,
	sides,
	splitOnAxis,
}: {
	attributes: any;
	setAttributes: ( {} ) => void;
	only?: 'margin' | 'padding';
	sides?: AllowedSides[];
	splitOnAxis?: boolean;
} ) {
	const { margin, padding } = attributes;
	const spacingSizes = useSettings( 'spacing.spacingSizes' );

	const controls = {
		margin: (
			<FlexBlock>
				<BoxControl
					presetKey="spacing"
					presets={ spacingSizes[ 0 ] }
					values={ margin }
					__next40pxDefaultSize
					label="Margin"
					onChange={ ( values ) =>
						setAttributes( { margin: { ...margin, ...values } } )
					}
					sides={ sides }
					splitOnAxis={ splitOnAxis }
				/>
			</FlexBlock>
		),
		padding: (
			<FlexBlock>
				<BoxControl
					presetKey="spacing"
					presets={ spacingSizes[ 0 ] }
					__next40pxDefaultSize
					label="Padding"
					values={ padding }
					onChange={ ( values ) =>
						setAttributes( { padding: { ...padding, ...values } } )
					}
					sides={ sides }
					splitOnAxis={ splitOnAxis }
				/>
			</FlexBlock>
		),
	};

	return (
		<PanelBody title="Spacing">
			<Flex direction="column" gap={ 4 }>
				{ undefined !== only
					? controls[ only ]
					: Object.entries( controls ).map( ( [ attr, el ] ) => (
						<Fragment key={ attr }>{ el }</Fragment>
					) ) }
			</Flex>
		</PanelBody>
	);
}

type SpacingValues = {
	top?: string;
	right?: string;
	bottom?: string;
	left?: string;
};

type SpacingStyle = {
	marginTop?: string;
	marginRight?: string;
	marginBottom?: string;
	marginLeft?: string;
	paddingTop?: string;
	paddingRight?: string;
	paddingBottom?: string;
	paddingLeft?: string;
};

export function calcSpacingObject( attributes, spacingSizes ): SpacingStyle {
	const spacingObject: SpacingStyle = {};
	if ( attributes.margin ) {
		Object.entries( attributes.margin as SpacingValues ).forEach(
			( [ key, value ] ) => {
				spacingObject[
					`margin${ key.charAt( 0 ).toUpperCase() + key.slice( 1 ) }`
				] = calcSpacingValue( value, spacingSizes );
			}
		);
	}
	if ( attributes.padding ) {
		Object.entries( attributes.padding as SpacingValues ).forEach(
			( [ key, value ] ) => {
				spacingObject[
					`padding${ key.charAt( 0 ).toUpperCase() + key.slice( 1 ) }`
				] = calcSpacingValue( value, spacingSizes );
			}
		);
	}
	return spacingObject;
}

function calcSpacingValue( value:string, spacingSizes:Array<{slug:string, size:string}> ):string {
	const spacingLookup = {};
	spacingSizes.forEach(
		( obj ) => ( spacingLookup[ obj.slug ] = obj.size )
	);
	return spacingLookup[ value.slice( -2 ) ] || value;
}
