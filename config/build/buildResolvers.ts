import type { WebpackConfiguration } from 'webpack-cli';
import type { BuildPaths } from './types/config';

export const BuildResolvers = (paths: BuildPaths): WebpackConfiguration['resolve'] => {
	const { src } = paths;

	return {
		extensions: ['.tsx', '.ts', '.js'],
		// настройки для работы абсолютных путей
		preferAbsolute: true,
		modules: [src, 'node_modules'],
		mainFiles: ['index'],
	};
};
