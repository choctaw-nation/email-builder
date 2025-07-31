import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	return <p { ...useBlockProps() }>Container – hello from the editor!</p>;
}
