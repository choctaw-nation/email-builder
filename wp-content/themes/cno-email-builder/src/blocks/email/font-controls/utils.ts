import { FontsData } from '../../_lib/types';

export const DEFAULT_FONT_URL = 'https://use.typekit.net/exd7pgy.css';

export const DEFAULT_FONTS: FontsData[] = [
	{
		name: 'gill-sans-nova',
		title: 'Gill Sans Nova',
		fontWeights: [ 400, 700 ],
		fontStyles: [ 'normal', ' italic' ],
		fallbackStack: {
			label: 'sans-serif',
			value: 'Arial, Helvetica, sans-serif',
		},
	},
	{
		name: 'pill-gothic-300mg',
		title: 'Pill Gothic 300mg',
		fontWeights: [ 400, 700 ],
		fontStyles: [ 'normal', ' italic' ],
		fallbackStack: {
			label: 'sans-serif',
			value: 'Arial, Helvetica, sans-serif',
		},
	},
	{
		name: 'trajan-pro-3',
		title: 'Trajan Pro 3',
		fontWeights: [ 400, 700 ],
		fontStyles: [ 'normal' ],
		fallbackStack: {
			label: 'serif',
			value: 'Georgia, Times New Roman, serif',
		},
	},
	{
		name: 'refrigerator-deluxe',
		title: 'Refrigerator Deluxe',
		fontWeights: [ 400, 700 ],
		fontStyles: [ 'normal' ],
		fallbackStack: {
			label: 'sans-serif',
			value: 'Arial, Helvetica, sans-serif',
		},
	},
];
