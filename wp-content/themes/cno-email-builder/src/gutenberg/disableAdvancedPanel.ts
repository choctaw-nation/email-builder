export const disableAdvancedPanel = ( settings, name ) => {
	return {
		...settings,
		supports: {
			...settings.supports,
			anchor: false,
			customClassName: false,
		},
	};
};
