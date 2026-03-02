import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from 'app/App';

const domNode = document.getElementById('root');

if (!domNode) {
	throw new Error('Could not find root node!');
}

const root = createRoot(domNode);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
);
