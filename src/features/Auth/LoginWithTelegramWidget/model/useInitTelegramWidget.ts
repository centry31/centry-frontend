import type { RefObject } from 'react';
import { useCallback } from 'react';

import { useCreateTelegramOidcNonce, useLoginWithTelegramOidc, useUserStore } from 'entities/User';

import { notifySuccess } from 'shared/lib';

import type { ParsedTelegramOidcOnAuthPayload } from './types';

type InitTelegramWidgetOptions = {
	clientId: string;
	containerRef: RefObject<HTMLDivElement>;
	onError: (message: string) => void;
	onLoadingChange: (isLoading: boolean) => void;
};

type TelegramNonceData = {
	nonceId: string;
	nonce: string;
};

type WidgetState = {
	disposed: boolean;
	authenticating: boolean;
	activeNonce: TelegramNonceData | null;
	pendingNonceRequest: Promise<boolean> | null;
	button: HTMLButtonElement | null;
	buttonClickHandler: ((event: MouseEvent) => void) | null;
};

const TELEGRAM_LOGIN_SCRIPT_ID = 'telegram-oidc-login-script';
const TELEGRAM_LOGIN_SCRIPT_SRC = 'https://oauth.telegram.org/js/telegram-login.js?3';

const toNonEmptyStringOrNull = (value: unknown): string | null => {
	if (typeof value !== 'string') return null;
	if (!value.trim()) return null;
	return value;
};

const parseTelegramOidcPayload = (payload: unknown): ParsedTelegramOidcOnAuthPayload => {
	if (typeof payload === 'string') {
		return {
			idToken: toNonEmptyStringOrNull(payload),
			error: null,
			errorDescription: null,
		};
	}

	if (!payload || typeof payload !== 'object') {
		return {
			idToken: null,
			error: null,
			errorDescription: null,
		};
	}

	const record = payload as Record<string, unknown>;
	const snakeCaseIdToken = toNonEmptyStringOrNull(record.id_token);
	const camelCaseIdToken = toNonEmptyStringOrNull(record.idToken);
	const idToken = snakeCaseIdToken || camelCaseIdToken;

	return {
		idToken,
		error: toNonEmptyStringOrNull(record.error),
		errorDescription: toNonEmptyStringOrNull(record.error_description),
	};
};

const waitForScriptLoad = (script: HTMLElement): Promise<boolean> =>
	new Promise<boolean>((resolve) => {
		script.addEventListener('load', () => resolve(true), { once: true });
		script.addEventListener('error', () => resolve(false), { once: true });
	});

const loadTelegramLoginScript = async (): Promise<boolean> => {
	const existingScript = document.getElementById(TELEGRAM_LOGIN_SCRIPT_ID);
	if (existingScript) {
		if (existingScript.dataset.loaded === 'true') return true;
		return waitForScriptLoad(existingScript);
	}

	const script = document.createElement('script');
	script.id = TELEGRAM_LOGIN_SCRIPT_ID;
	script.async = true;
	script.src = TELEGRAM_LOGIN_SCRIPT_SRC;

	const loaded = waitForScriptLoad(script);
	document.body.appendChild(script);

	const isLoaded = await loaded;
	if (isLoaded) {
		script.dataset.loaded = 'true';
	}
	return isLoaded;
};

const getTelegramLoginAuth = (): TelegramLoginApi['auth'] | null => {
	const telegram = window.Telegram;
	if (!telegram) return null;

	const loginApi = telegram.Login;
	if (!loginApi) return null;

	const auth = loginApi.auth;
	if (typeof auth !== 'function') return null;

	return auth;
};

const createTelegramButton = () => {
	const button = document.createElement('button');
	button.type = 'button';
	button.className = 'tg-auth-button';
	button.setAttribute('data-style', 'outlined');
	button.textContent = 'Войти с Telegram';
	return button;
};

const setButtonDisabled = (button: HTMLButtonElement | null, isDisabled: boolean) => {
	if (!button) return;
	button.disabled = isDisabled;
	button.style.opacity = isDisabled ? '0.6' : '1';
	button.style.pointerEvents = isDisabled ? 'none' : 'auto';
};

const toSafeClientId = (clientId: string): number | null => {
	const parsedValue = Number(clientId);
	if (!Number.isFinite(parsedValue)) return null;
	return parsedValue;
};

export const useInitTelegramWidget = () => {
	const { request: requestTelegramOidcNonce } = useCreateTelegramOidcNonce();
	const { request: loginWithTelegramOidc } = useLoginWithTelegramOidc();
	const { initAuthData } = useUserStore();

	const initTelegramWidget = useCallback(
		(options: InitTelegramWidgetOptions) => {
			const { clientId, containerRef, onError, onLoadingChange } = options;

			const container = containerRef.current;
			if (!container) return () => undefined;

			container.replaceChildren();

			const numericClientId = toSafeClientId(clientId);
			if (numericClientId === null) {
				onError('Некорректный Telegram client_id.');
				return () => undefined;
			}

			const state: WidgetState = {
				disposed: false,
				authenticating: false,
				activeNonce: null,
				pendingNonceRequest: null,
				button: null,
				buttonClickHandler: null,
			};

			const setError = (message: string) => {
				if (state.disposed) return;
				onError(message);
			};

			const setLoading = (isLoading: boolean) => {
				if (state.disposed) return;
				onLoadingChange(isLoading);
			};

			const clearButton = () => {
				if (!state.button || !state.buttonClickHandler) return;
				state.button.removeEventListener('click', state.buttonClickHandler);
			};

			const cleanup = () => {
				state.disposed = true;
				clearButton();
				state.button = null;
				state.buttonClickHandler = null;
				container.replaceChildren();
			};

			const refreshNonce = () => {
				if (state.pendingNonceRequest) return state.pendingNonceRequest;

				state.pendingNonceRequest = (async () => {
					const nonceData = await requestTelegramOidcNonce(undefined);
					if (state.disposed) return false;

					if (!nonceData) {
						state.activeNonce = null;
						setButtonDisabled(state.button, true);
						setError('Не удалось подготовить nonce для Telegram авторизации.');
						return false;
					}

					state.activeNonce = nonceData;
					setError('');

					const shouldDisableButton = state.authenticating;
					setButtonDisabled(state.button, shouldDisableButton);
					return true;
				})().finally(() => {
					state.pendingNonceRequest = null;
				});

				return state.pendingNonceRequest;
			};

			const finalizeAttempt = () => {
				if (state.disposed) return;
				state.authenticating = false;
				setLoading(false);
				void refreshNonce();
			};

			const handleTelegramCallback = async (payload: unknown, nonceId: string) => {
				const parsedPayload = parseTelegramOidcPayload(payload);
				if (parsedPayload.error) {
					if (parsedPayload.errorDescription) {
						setError(parsedPayload.errorDescription);
						finalizeAttempt();
						return;
					}

					setError(parsedPayload.error);
					finalizeAttempt();
					return;
				}

				if (!parsedPayload.idToken) {
					setError('Telegram не вернул id_token.');
					finalizeAttempt();
					return;
				}

				const loginResult = await loginWithTelegramOidc({
					id_token: parsedPayload.idToken,
					nonceId,
				});
				if (!loginResult) {
					finalizeAttempt();
					return;
				}

				if (state.disposed) return;

				notifySuccess('Вход через Telegram выполнен');
				await initAuthData();
				finalizeAttempt();
			};

			const startTelegramAuth = () => {
				onError('');

				if (state.authenticating) return;

				const telegramAuth = getTelegramLoginAuth();
				if (!telegramAuth) {
					setError('Telegram Login API не инициализировалось.');
					return;
				}

				const nonceData = state.activeNonce;
				if (!nonceData) {
					setError('Авторизация подготавливается, попробуйте снова через секунду.');
					void refreshNonce();
					return;
				}

				state.activeNonce = null;
				state.authenticating = true;
				setButtonDisabled(state.button, true);
				setLoading(true);

				try {
					telegramAuth(
						{
							client_id: numericClientId,
							request_access: ['write'],
							nonce: nonceData.nonce,
						},
						(payload: unknown) => {
							void handleTelegramCallback(payload, nonceData.nonceId);
						},
					);
				} catch {
					setError('Не удалось открыть окно авторизации Telegram.');
					finalizeAttempt();
				}
			};

			const renderButton = () => {
				clearButton();
				container.replaceChildren();

				state.button = createTelegramButton();
				state.buttonClickHandler = (event: MouseEvent) => {
					event.preventDefault();
					startTelegramAuth();
				};

				state.button.addEventListener('click', state.buttonClickHandler);
				setButtonDisabled(state.button, true);
				container.append(state.button);
			};

			const initializeWidget = async () => {
				setLoading(true);

				const isScriptLoaded = await loadTelegramLoginScript();
				if (!isScriptLoaded) {
					setError('Не удалось загрузить Telegram Login Widget.');
					setLoading(false);
					return;
				}

				const telegramAuth = getTelegramLoginAuth();
				if (!telegramAuth) {
					setError('Telegram Login API не инициализировалось.');
					setLoading(false);
					return;
				}

				renderButton();
				await refreshNonce();
				setLoading(false);
			};

			void initializeWidget();

			return cleanup;
		},
		[initAuthData, loginWithTelegramOidc, requestTelegramOidcNonce],
	);

	return { initTelegramWidget };
};
