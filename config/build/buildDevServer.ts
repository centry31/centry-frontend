import type { WebpackConfiguration } from 'webpack-cli';
import type { BuildEnv } from './types/config';

export const BuildDevServer = ({ PORT }: BuildEnv): WebpackConfiguration['devServer'] => {
	return {
		port: PORT,
		historyApiFallback: true, // чтобы не падало при перезагрузке на маршруте
		hot: true,
		// чтобы работали сервисы для туннелирования
		proxy: [
			{
				context: ['/api'],
				target: 'http://localhost:8000',
				changeOrigin: true,
				secure: false,
			},
		],
	};
};
