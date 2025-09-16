import { Preferences } from './components/Preferences';
import { preferencesData } from './components/tempData';

export function HomePage() {
	const handleComplete = (selections: Record<number, string[]>) => {
		console.log('User preferences:', selections);
	};

	// add list recipe to this.
	// and some posts as well.

	return (
		<div className="min-h-screen">
			<Preferences
				steps={preferencesData}
				onComplete={handleComplete}
			/>
		</div>
	);
}
