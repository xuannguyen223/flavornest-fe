import { useAppSelector, useAppDispatch } from './redux';
import { setSortOption, type SortOption } from '@/store/features/sortSlice';

export const useSort = () => {
	const dispatch = useAppDispatch();
	const sortBy = useAppSelector(state => state.sort.currentSort);

	const updateSort = (newSortBy: SortOption) => {
		dispatch(setSortOption(newSortBy));
	};

	return {
		sortBy,
		updateSort,
	};
};
