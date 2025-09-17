import { useNavigate } from 'react-router-dom';

export interface RecipeTagsProps {
    tags: string[];
};
  
export default function RecipeTags({ tags }: RecipeTagsProps) {
    const navigate = useNavigate();

    const handleTagClick = (tag: string) => {
        navigate(`/recipes?category=${encodeURIComponent(tag)}`);
    };
    return (
        <section className="text-left mt-8 w-full max-w-[1420px] mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-semibold 
            leading-tight text-neutral-700">
            Tags
        </h2>

        {/* Tags List */}
        <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
            <button
                key={i}
                onClick={() => handleTagClick(tag)}
                className="px-6 py-2 rounded-full border 
                    border-neutral-400/30 bg-white text-neutral-600 
                    shadow-sm hover:bg-neutral-700 hover:text-white transition">
                {tag}
            </button>
            ))}
        </div>
        </section>
    );
}
  