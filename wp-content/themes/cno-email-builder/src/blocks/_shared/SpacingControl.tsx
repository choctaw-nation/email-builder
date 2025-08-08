import { useState, useEffect, Fragment } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
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
	const [ margin, setMargin ] = useState( attributes.margin || {} );
	const [ padding, setPadding ] = useState( attributes.padding || {} );
	const [ spacingLookup, setSpacingLookup ] = useState( {} );
	const spacingSizes = useSelect(
		( select ) =>
			select( blockEditorStore ).getSettings().__experimentalFeatures
				.spacing.spacingSizes.theme,
		[]
	);

	useEffect( () => {
		if ( ! spacingSizes ) {
			return;
		}
		const spacersMap = {};
		spacingSizes.forEach(
			( obj ) => ( spacersMap[ obj.slug ] = obj.size )
		);
		setSpacingLookup( spacersMap );
	}, [ spacingSizes ] );

	useEffect( () => {
		const newValues: { margin: SpacingValues; padding: SpacingValues } = {
			margin: {},
			padding: {},
		};
		Object.entries( margin ).forEach(
			( [ key, value ] ) =>
				( newValues.margin[ key ] =
					spacingLookup[ value?.slice( -2 ) || undefined ] )
		);
		Object.entries( padding ).forEach(
			( [ key, value ] ) =>
				( newValues.padding[ key ] =
					spacingLookup[ value?.slice( -2 ) || undefined ] )
		);
		setAttributes( {
			margin: newValues.margin,
			padding: newValues.padding,
		} );
	}, [ margin, padding ] );

	const controls = {
		margin: (
			<FlexBlock>
				<BoxControl
					presetKey="spacing"
					presets={ spacingSizes }
					values={ margin }
					__next40pxDefaultSize
					label="Margin"
					onChange={ ( values ) =>
						setMargin( ( prev ) => ( { ...prev, ...values } ) )
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
					presets={ spacingSizes }
					__next40pxDefaultSize
					label="Padding"
					values={ padding }
					onChange={ ( values ) =>
						setPadding( ( prev ) => ( {
							...prev,
							...values,
						} ) )
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

export function calcSpacingObject( attributes ): SpacingStyle {
	const spacingObject: SpacingStyle = {};
	if ( attributes.margin ) {
		Object.entries( attributes.margin as SpacingValues ).forEach(
			( [ key, value ] ) => {
				spacingObject[
					`margin${ key.charAt( 0 ).toUpperCase() + key.slice( 1 ) }`
				] = value;
			}
		);
	}
	if ( attributes.padding ) {
		Object.entries( attributes.padding as SpacingValues ).forEach(
			( [ key, value ] ) => {
				spacingObject[
					`padding${ key.charAt( 0 ).toUpperCase() + key.slice( 1 ) }`
				] = value;
			}
		);
	}
	return spacingObject;
}
