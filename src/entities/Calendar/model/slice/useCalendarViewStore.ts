import { create } from 'zustand';

type CurrentDate = {
	start: Date;
	end: Date;
};

type Data = {
	currentDate: CurrentDate;
};
type Methods = {
	setCurrentDate: (currentDate: CurrentDate) => void;
};
type Store = Data & Methods;

export const useCalendarViewStore = create<Store>((set) => ({
	currentDate: {
		start: new Date(),
		end: new Date(),
	},

	setCurrentDate: (currentDate) => {
		set({ currentDate });
	},
}));
