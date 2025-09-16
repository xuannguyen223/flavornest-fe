import { type PreferenceStep } from './Preferences';

export const preferencesData: PreferenceStep[] = [
	{
		question: 'What are your favorite cuisines?',
		options: [
			{ id: 'italian', label: 'Italian', image: '/italian-pasta-dish.png' },
			{ id: 'mediterranean', label: 'Mediterranean', image: '/mediterranean-platter.png' },
			{ id: 'asian', label: 'Asian', image: '/asian-stir-fry-dish.jpg' },
			{ id: 'mediterranean2', label: 'Mediterranean', image: '/mediterranean-grilled-fish.jpg' },
			{ id: 'middle-eastern', label: 'Middle Eastern', image: '/middle-eastern-mezze-platter.jpg' },
			{ id: 'mexican', label: 'Mexican', image: '/mexican-tacos-and-guacamole.jpg' },
			{ id: 'african', label: 'African', image: '/african-curry-dish.jpg' },
			{ id: 'french', label: 'French', image: '/french-croissants-and-pastries.jpg' },
			{ id: 'american', label: 'American', image: '/american-burger-and-fries.jpg' },
		],
	},
	{
		question: 'Do you have any dietary restrictions?',
		options: [
			{ id: 'vegetarian', label: 'Vegetarian' },
			{ id: 'vegan', label: 'Vegan' },
			{ id: 'keto', label: 'Keto' },
			{ id: 'paleo', label: 'Paleo' },
			{ id: 'low-carb', label: 'Low-Carb' },
			{ id: 'high-protein', label: 'High-Protein' },
		],
	},
	{
		question: 'Do you have any allergies?',
		options: [
			{ id: 'dairy', label: 'Dairy' },
			{ id: 'nut', label: 'Nut' },
			{ id: 'seafood', label: 'Seafood' },
			{ id: 'gluten', label: 'Gluten' },
			{ id: 'soy', label: 'Soy' },
			{ id: 'egg', label: 'Egg' },
		],
	},
	{
		question: "What's your cooking experience level?",
		options: [
			{ id: 'beginner', label: 'Beginner' },
			{ id: 'intermediate', label: 'Intermediate' },
			{ id: 'advanced', label: 'Advanced' },
			{ id: 'professional', label: 'Professional' },
		],
	},
	{
		question: 'How much time do you usually spend cooking?',
		options: [
			{ id: '15min', label: 'Under 15 minutes' },
			{ id: '30min', label: '15-30 minutes' },
			{ id: '1hour', label: '30-60 minutes' },
			{ id: 'over1hour', label: 'Over 1 hour' },
		],
	},
];
