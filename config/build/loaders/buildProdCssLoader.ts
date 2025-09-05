import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const buildProdCssLoader = () => {
	return {
		test: /\.css$/i,
		use: [
			MiniCssExtractPlugin.loader,
			{ loader: 'css-loader', options: { importLoaders: 1 } },
			'postcss-loader',
		],
	};
};
