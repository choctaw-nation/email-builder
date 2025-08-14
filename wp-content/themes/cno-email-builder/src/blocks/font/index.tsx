import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';
import { FontsData } from './lib/types';
import useFontContext from './hooks/useFontContext';

registerBlockType( metadata.name, {
	edit: ( props ) => {
		const { fontUrl, headingsFont, bodyFont } = useFontContext( props );
		const blockProps = useBlockProps();
		return (
			<style
				{ ...blockProps }
				type="text/css"
				dangerouslySetInnerHTML={ {
					__html: `
					@import url("${ fontUrl }");
					:where(.email-wrapper__body) {
						${ emailStyles( headingsFont, bodyFont ) }
					}`,
				} }
			/>
		);
	},

	save: ( { attributes: { fontUrl, headingsFont, bodyFont } } ) => {
		return (
			<style
				type="text/css"
				dangerouslySetInnerHTML={ {
					__html: `
					@import url("${ fontUrl }");
					${ emailStyles( headingsFont, bodyFont ) }`,
				} }
			/>
		);
	},
} );

function emailStyles( headingsFont: FontsData, bodyFont: FontsData ): string {
	return `
		body,p,a,td {
			text-wrap:balance;
			font-family: ${ bodyFont.name }, ${ bodyFont.fallbackStack.value }
		}
		
		h1,h2,h3,h4,h5,h6 {
			text-wrap:balance;
			font-family: ${ headingsFont.name }, ${ headingsFont.fallbackStack.value };
		}
	`;
}
