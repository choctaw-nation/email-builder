export type FontBlockAttributes = {
	headingsFont: FontsData;
	bodyFont: FontsData;
	accentFont: FontsData;
	fontUrl: string;
};
export type FontsData = {
	name: string;
	title: string;
	fontWeights?: number[];
	fontStyles?: string[];
	fallbackStack: {
		label: 'serif' | 'sans-serif';
		value: string;
	};
};

export type FontsState = {
	headingsFont: FontsData;
	bodyFont: FontsData;
	accentFont: FontsData;
};

export type FontTabs = {
	disabled: boolean;
	name: string;
	title: string;
};
