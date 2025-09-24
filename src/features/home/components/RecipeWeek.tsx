'use client';

import type { Recipe } from '@/types/TypeRecipe';
import { useNavigate } from 'react-router-dom';

interface RecipeWeekProps {
	recipe?: Recipe;
}

export function RecipeWeek({ recipe }: RecipeWeekProps) {
	const navigate = useNavigate();

	if (!recipe) {
		return null;
	}

	return (
		<div className={`w-full mx-auto px-20 pb-20`}>
			<div className="flex items-center justify-between mb-8">
				<div className="text-5xl font-cormorant font-semibold text-gray-900 tracking-tight text-balance">
					Recipe of the Week
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
				<div
					className="relative h-[250px] md:h-[250px]"
					onClick={() => navigate(`/recipes/${recipe.id}`)}>
					<img
						src={recipe.imageUrl || '/images/placeholder.png'}
						className="w-full h-full object-cover shadow-sm rounded-lg"
					/>
				</div>

				<div className="flex flex-col">
					<div className="flex flex-col space-y-2 h-full">
						<div className="text-2xl font-semibold text-gray-900">{recipe.title}</div>
						<div className="flex items-center gap-2 text-lg">
							By
							<div className="font-semibold text-amber-500 text-lg">
								{recipe.author.profile.name}
							</div>
						</div>

						<div className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg xl:text-xl">
							{recipe.description}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
