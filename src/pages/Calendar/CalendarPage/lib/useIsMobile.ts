import { useEffect, useState } from 'react';

// tailwind sm = 640px
const MOBILE_WIDTH_PX = '639px';

/**
 * Признак мобильного экрана
 * */
export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(
		() => window.matchMedia(`(max-width: ${MOBILE_WIDTH_PX})`).matches,
	);

	useEffect(() => {
		const mq = window.matchMedia(`(max-width: ${MOBILE_WIDTH_PX})`);

		const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
		mq.addEventListener('change', onChange);

		return () => mq.removeEventListener('change', onChange);
	}, []);

	return isMobile;
};
