export const buildDevCssLoader = () => {
	return {
		test: /\.css$/i,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: { importLoaders: 1 },
			},
			'postcss-loader',
		],
	};
};
