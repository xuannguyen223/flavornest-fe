import { useNavigate } from 'react-router-dom';
import type { Category } from '@/types/TypeRecipe';

interface RecipeCategoriesListProps {
  categories: Category[];
}

export default function RecipeCategories({ categories }: RecipeCategoriesListProps) {
  const navigate = useNavigate();

  const handleClick = (name: string, description: string) => {
    navigate(
      `/recipes?category=${encodeURIComponent(name)}&desc=${encodeURIComponent(description)}`
    );
  };

  return (
    <section className="text-left mt-8">
      {/* Header */}
      <h2 className="text-4xl font-semibold leading-tight text-neutral-700">
        Tags
      </h2>

      {/* Category Item List */}
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleClick(cat.name, cat.description)}
            className="px-6 py-2 rounded-full border 
                       border-neutral-400/30 bg-white text-neutral-600 
                       shadow-sm hover:bg-neutral-700 hover:text-white transition text-lg"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
}
