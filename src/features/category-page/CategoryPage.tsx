import FilterGroup from "@/components/common/filter-recipe/FilterGroup";
import { mockCategory } from "./mock-data/category-data";
import CategoryHeader from "./components/CategoryHeader";
import SortDropdown from "../../components/common/sort-recipe/SortDropDown";
import { mockFilter } from "./mock-data/filter-data";
import SearchBar from "@/components/common/search-bar/SearchBar";
import Breadcrumbs from "@/components/common/BreadCrumbs";

export default function CategoryPage() {
  const category = mockCategory;
  const filter = mockFilter;

  return (
    <div className="px-6 py-8">
      {/* Breadcrumb */}
      <Breadcrumbs title={category.title} />

      <CategoryHeader title={category.title} description={category.description} />

      {/* Search bar */}
      <div className="mt-3 flex justify-center">
        <SearchBar />
      </div>

      {/* Top container: Filter label + SortDropdown */}
      <div className="flex items-center justify-between mt-15">
        <h3 className="text-lg font-semibold text-neutral-800">FILTER BY</h3>
        <SortDropdown />
      </div>

      {/* Bottom container: 2 columns */}
      <div className="flex mt-8 gap-8">
        {/* Left: Filter group */}
        <div>
          <FilterGroup filterData={filter} />
        </div>

        {/* Right: List Recipe */}
        <div className="flex-1 bg-neutral-100 rounded-md">
          List Recipe
        </div>
      </div>
    </div>
  );
}
