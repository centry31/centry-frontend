import { buildDevCssLoader } from './loaders/buildDevCssLoader';
import { buildProdCssLoader } from './loaders/buildProdCssLoader';
import type { BuildOptions } from './types/config';

export const BuildLoaders = ({ IS_DEV }: BuildOptions) => {
	const tsLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	};

	const cssLoader = IS_DEV ? buildDevCssLoader() : buildProdCssLoader();

	const babelLoader = {
		test: /\.m?js$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
			},
		},
	};

	const svgLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: ['@svgr/webpack'],
	};

	return [svgLoader, babelLoader, tsLoader, cssLoader];
};
