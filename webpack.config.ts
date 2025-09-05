import * as process from 'node:process';
import path from 'path';
import webpack from 'webpack';
import { BuildWebpackConfig } from './config/build/buildWebpackConfig';
import type { BuildMode, BuildPaths } from './config/build/types/config';
import 'dotenv-defaults/config';

export default () => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		build: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
	};

	// env
	const MODE: BuildMode = (process.env.MODE as BuildMode) || 'development';
	const PORT = Number(process.env.PORT) || 3000;
	const IS_DEV = MODE === 'development';
	const API_URL = process.env.API_URL || 'http://localhost:8000/api';

	const env = {
		MODE,
		PORT,
	};

	const config: webpack.Configuration = BuildWebpackConfig({
		env,
		paths,
		API_URL,
		IS_DEV: IS_DEV,
	});

	return config;
};
