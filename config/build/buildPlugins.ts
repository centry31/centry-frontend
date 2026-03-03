import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

import webpack from 'webpack';
import type { WebpackConfiguration } from 'webpack-cli';
import type { BuildOptions } from './types/config';

export const BuildPlugins = (props: BuildOptions): WebpackConfiguration['plugins'] => {
	const { paths, IS_DEV, API_URL } = props;
	const TG_OAUTH_CLIENT_ID = process.env.TG_OAUTH_CLIENT_ID;

	return [
		new HtmlWebpackPlugin({
			template: paths.html,
		}),
		//
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
		//
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(IS_DEV),
			__API_URL__: JSON.stringify(API_URL),
			__TG_OAUTH_CLIENT_ID__: JSON.stringify(TG_OAUTH_CLIENT_ID),
		}),
		//
		new webpack.ProgressPlugin(),
		//
		new webpack.HotModuleReplacementPlugin(),
		//
		// new BundleAnalyzerPlugin({ analyzerPort: 10000 }),
	];
};
