import { useState, useEffect, Fragment, useMemo } from '@wordpress/element';
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
		const spacingLookup = {};
		spacingSizes.forEach(
			( obj ) => ( spacingLookup[ obj.slug ] = obj.size )
		);
		function parseSpacing( values:SpacingValues ):SpacingValues|undefined {
			if ( ! values ) {
				return undefined;
			}
			const newValues:SpacingValues = {};
			Object.entries( values ).forEach( ( [ key, value ] ) => {
				newValues[ key ] = typeof value === 'string' ? spacingLookup[ value.slice( -2 ) ] : value;
			} );
			return newValues;
		}

		const newMargin = parseSpacing( attributes.margin );
		setAttributes( { parsedMargin: newMargin } );
		const newPadding = parseSpacing( attributes.padding );
		setAttributes( { parsedPadding: newPadding } );
	}, [ attributes.margin, attributes.padding, setAttributes, spacingSizes ] );

	const controls = {
		margin: (
			<FlexBlock>
				<BoxControl
					presetKey="spacing"
					presets={ spacingSizes }
					values={ attributes.margin }
					__next40pxDefaultSize
					label="Margin"
					onChange={ ( margin ) =>
						setAttributes( { margin } )
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
					values={ attributes.padding }
					onChange={ ( padding ) =>
						setAttributes( { padding } )
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
	if ( attributes.parsedMargin ) {
		Object.entries( attributes.parsedMargin as SpacingValues ).forEach(
			( [ key, value ] ) => {
				spacingObject[
					`margin${ key.charAt( 0 ).toUpperCase() + key.slice( 1 ) }`
				] = value;
			}
		);
	}
	if ( attributes.parsedPadding ) {
		Object.entries( attributes.parsedPadding as SpacingValues ).forEach(
			( [ key, value ] ) => {
				spacingObject[
					`padding${ key.charAt( 0 ).toUpperCase() + key.slice( 1 ) }`
				] = value;
			}
		);
	}
	return spacingObject;
}
