export const CAL_VIEW_LS_KEY = 'calendar:view';

/**
 * Возвращает сохраненное в localStorage значение view для календаря или view по-умолчанию.
 * */
export const getInitialView = () => {
	return localStorage.getItem(CAL_VIEW_LS_KEY) || 'timeGridDay';
};

/**
 * Всегда возвращает текущую дату.
 * */
export const getInitialDate = () => {
	return new Date();
};

export const saveView = (view: string) => {
	localStorage.setItem(CAL_VIEW_LS_KEY, view);
};
