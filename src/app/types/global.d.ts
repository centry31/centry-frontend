declare module '*.css' {
	// декларация для css modules на импорт
	type IClassNames = Record<string, string>;
	const classNames: IClassNames;
	export = classNames;
}

declare const __IS_DEV__: boolean;
declare const __API_URL__: string;

type TelegramInsets = {
	top: number;
	bottom: number;
	left: number;
	right: number;
};

type TelegramBackButton = {
	show(): void;
	hide(): void;
	onClick(handler: () => void): void;
	offClick(handler: () => void): void;
	isVisible?: boolean;
};

type TelegramWebApp = {
	initData: string;
	initDataUnsafe?: Record<string, unknown>;
	ready(): void;
	expand(): void;
	requestFullsize?(): void;
	requestFullscreen?(): void;
	BackButton?: TelegramBackButton;
	safeAreaInset?: TelegramInsets;
	contentSafeAreaInset?: TelegramInsets;
	onEvent?(eventType: string, callback: () => void): void;
	offEvent?(eventType: string, callback: () => void): void;
};

interface Window {
	Telegram?: {
		WebApp?: TelegramWebApp;
	};
}

declare module '*.svg' {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}
