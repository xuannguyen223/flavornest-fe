import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './features/home/HomePage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
