import Cookies from 'js-cookie';

import { CURRENT_SPACE_ID_COOKIE_KEY, CURRENT_SPACE_ID_LOCALSTORAGE_KEY } from '../const';

/**
 * Класс для управления текущим состоянием space в localstorage и cookies.
 *
 * Смысл в том, что с каждым запросом авторизированного пользователя отправляется его выбранный
 * spaceId, к которому привязаны запросы в API.
 * */
class CurrentSpaceIdController {
	static setCurrentSpaceId(spaceId: string) {
		Cookies.set(CURRENT_SPACE_ID_COOKIE_KEY, spaceId);
		localStorage.setItem(CURRENT_SPACE_ID_LOCALSTORAGE_KEY, spaceId);

		window.dispatchEvent(new Event('storage'));
	}

	static getCurrentSpaceId() {
		return Cookies.get(CURRENT_SPACE_ID_COOKIE_KEY);
	}

	static getSavedSpaceId() {
		return localStorage.getItem(CURRENT_SPACE_ID_LOCALSTORAGE_KEY);
	}

	static clearCurrentSpaceId() {
		localStorage.removeItem(CURRENT_SPACE_ID_LOCALSTORAGE_KEY);
		Cookies.remove(CURRENT_SPACE_ID_COOKIE_KEY);
	}
}

export { CurrentSpaceIdController };
