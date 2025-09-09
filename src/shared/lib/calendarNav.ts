export const CAL_VIEW_LS_KEY = 'calendar:view';

/**
 * Возвращает сохраненное в localstorage значение view для календаря или по-умолчанию
 * */
export const getInitialView = () => {
	const params = new URLSearchParams(location.search);
	return params.get('view') || localStorage.getItem(CAL_VIEW_LS_KEY) || 'timeGridDay';
};

/**
 * Возвращает переданные в адресную строку с url дату для отображения, иначе вернет
 * текущую дату
 * */
export const getInitialDate = () => {
	const params = new URLSearchParams(location.search);
	return params.get('date') ? new Date(params.get('date')!) : new Date();
};

/**
 * Синхронизирует url параметры в адресной строке при изменении их в календаре
 * */
export const syncUrlParams = (view: string, date: Date) => {
	const params = new URLSearchParams(location.search);

	params.set('view', view);
	params.set('date', date.toISOString());

	history.replaceState(null, '', `?${params.toString()}`);
};

export const saveView = (view: string) => {
	localStorage.setItem(CAL_VIEW_LS_KEY, view);
};
