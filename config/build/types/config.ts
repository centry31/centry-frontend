export type BuildMode = 'development' | 'production';

export interface BuildPaths {
	build: string;

	sourceAssets: string;
	targetAssets: string;

	src: string;
	entry: string;
	html: string;
}

export interface BuildEnv {
	PORT: number;
	MODE: BuildMode;
}

export interface BuildOptions {
	paths: BuildPaths;
	env: BuildEnv;

	IS_DEV: boolean;
	API_URL: string;
}
