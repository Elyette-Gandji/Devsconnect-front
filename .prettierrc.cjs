module.exports = {
	endOfLine: 'lf',
	trailingComma: 'es5',
	semi: true,
	useTabs: false,
	singleQuote: true,
	tabWidth: 2,
	indentStyle: 'space',
	overrides: [
    {
      files: ['*.sass', '*.scss'],
      options: {
        tabWidth: 4,
      },
    },
  ],
};
