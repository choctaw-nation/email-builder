import type { FontsData } from '../_lib/types';

export default function emailStyles( headingsFont: FontsData, bodyFont: FontsData ): string {
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
