import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeExample from './features/list-recipes/RecipeExample';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<RecipeExample />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
