import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';

import './editor.scss';

import EmailMeta from './panels/EmailMeta';
import EmailColors from './panels/EmailColors';
import EmailFonts from './panels/EmailFonts';

export default function BlockControls( props ) {
	return (
		<InspectorControls>
			<TabPanel
				tabs={ [
					{
						name: 'meta',
						title: 'Meta Settings',
					},
					{
						name: 'colors',
						title: 'Colors',
					},
					{
						name: 'fonts',
						title: 'Fonts',
					},
				] }
				children={ ( tab ) => {
					switch ( tab.name ) {
						case 'meta':
							return <EmailMeta { ...props } />;
						case 'colors':
							return <EmailColors { ...props } />;
						case 'fonts':
							return <EmailFonts { ...props } />;
					}
				} }
			/>
		</InspectorControls>
	);
}
