import FilterSection from "./FilterSection";
import type { Filter } from "@/features/category-page/mock-data/filter-data";

export interface FilterProps{
    filterData: Filter[];
}
  
function FilterGroup({ filterData }: FilterProps) {
    return (
        <div className="w-64 space-y-4">
            {filterData.map((filter) => (
                <FilterSection
                key={filter.id}
                title={filter.title}
                options={filter.options}
                />
            ))}
        </div>
    );
}
  
export default FilterGroup;
  

