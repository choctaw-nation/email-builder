import { useEffect } from '@wordpress/element';

export default function useFontContext( props ) {
	const { attributes, setAttributes, context } = props;
	const { fontUrl, headingsFont, bodyFont } = attributes;

	useEffect( () => {
		setAttributes( {
			fontUrl: context[ 'cno-email-blocks/fontUrl' ],
		} );
	}, [ context[ 'cno-email-blocks/fontUrl' ] ] );

	useEffect( () => {
		setAttributes( {
			headingsFont: context[ 'cno-email-blocks/headingsFont' ],
		} );
	}, [ context[ 'cno-email-blocks/headingsFont' ] ] );

	useEffect( () => {
		setAttributes( {
			bodyFont: context[ 'cno-email-blocks/bodyFont' ],
		} );
	}, [ context[ 'cno-email-blocks/bodyFont' ] ] );

	return { fontUrl, headingsFont, bodyFont };
}
