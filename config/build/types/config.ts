export type BuildMode = 'development' | 'production';

export interface BuildPaths {
	entry: string;
	build: string;
	html: string;
	src: string;
	assets: string;
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
