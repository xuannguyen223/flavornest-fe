import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SortOption = 'newest' | 'oldest' | 'atoz' | 'ztoa' | 'rating';

interface SortState {
	currentSort: SortOption;
}

const loadSortFromStorage = (): SortOption => {
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem('recipe-sort-preference');
		if (saved && ['newest', 'oldest', 'atoz', 'ztoa', 'rating'].includes(saved)) {
			return saved as SortOption;
		}
	}
	return 'newest';
};

const initialState: SortState = {
	currentSort: loadSortFromStorage(),
};

const sortSlice = createSlice({
	name: 'sort',
	initialState,
	reducers: {
		setSortOption: (state, action: PayloadAction<SortOption>) => {
			state.currentSort = action.payload;
			if (typeof window !== 'undefined') {
				localStorage.setItem('recipe-sort-preference', action.payload);
			}
		},
	},
});

export const { setSortOption } = sortSlice.actions;
export default sortSlice.reducer;
