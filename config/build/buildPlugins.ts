import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

import webpack from 'webpack';
import type { WebpackConfiguration } from 'webpack-cli';
import type { BuildOptions } from './types/config';
import CopyPlugin from 'copy-webpack-plugin';

export const BuildPlugins = (props: BuildOptions): WebpackConfiguration['plugins'] => {
	const { paths, IS_DEV, API_URL } = props;

	const TG_OAUTH_CLIENT_ID = process.env.TG_OAUTH_CLIENT_ID;
	const TG_BOT_NAME = process.env.TG_BOT_NAME || '';

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
			__TG_BOT_NAME__: JSON.stringify(TG_BOT_NAME),
		}),
		//
		new webpack.ProgressPlugin(),
		//
		new webpack.HotModuleReplacementPlugin(),
		//
		new CopyPlugin({
			patterns: [
				{
					from: paths.assets,
					to: paths.build,
				},
			],
		}),
		//
		// new BundleAnalyzerPlugin({ analyzerPort: 10000 }),
	];
};
