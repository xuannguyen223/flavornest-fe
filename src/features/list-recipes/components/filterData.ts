export interface FilterOption {
    id: string;
    label: string;
    value: string;
}
  
export interface Filter {
	id: string;
	title: string;          // tên category, ví dụ "Cuisine"
	options: FilterOption[]; // các item trong category
}
