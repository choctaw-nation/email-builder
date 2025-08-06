import { DEFAULT_FONTS } from '../font/utils';

export default function useFontFamilies() {
	const defaultFontFamilies = DEFAULT_FONTS.map( ( fonts ) => {
		return {
			fontFamily: `${ fonts.name }, ${ fonts.fallbackStack.value }`,
			name: fonts.title,
		};
	} );
	let customFontFamilies = [];
	return { defaultFontFamilies, customFontFamilies };
}

export type FontFamily = {
	fontFace: FontFaceDefinition[];
	fontFamily: string;
	name: string;
	slug: string;
};

export type FontFaceDefinition = {
	fontFamily: string;
	fontStretch: string;
	fontStyle: string;
	fontWeight: string;
	src?: string[];
};
