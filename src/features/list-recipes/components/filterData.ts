export interface Filter {
	id: number;
	title: string;
	options: string[];
}

export const mockFilter: Filter[] = [
	{
		id: 1,
		title: 'Diet Preference',
		options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo'],
	},
	{
		id: 2,
		title: 'Cuisine Type',
		options: ['Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese'],
	},
	{
		id: 3,
		title: 'Meal Type',
		options: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
	},
	{
		id: 4,
		title: 'Ingredients',
		options: ['Chicken', 'Beef', 'Fish', 'Vegetables', 'Rice'],
	},
];
