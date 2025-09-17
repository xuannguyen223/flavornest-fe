'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { RecipeItem, type RecipeItemProps } from './RecipeItem';
import { cn } from '@/lib/utils';

export type RecipeListLayout = 'default' | '2-rows-4' | '1-row-4';

export interface RecipeListProps {
	recipeList: RecipeItemProps[];
	layout?: RecipeListLayout;
	sectionName?: string;
	description?: string;
	viewAll?: {
		show: boolean;
		text?: string;
		onClick?: (categoryId: string) => void; // click then navigate to recipe list page with that category selected
	};
	onSaveToggle?: (id: string) => void;
	onRecipeClick?: (id: string) => void;
	className?: string;
}

export function RecipeList({
	recipeList,
	layout = 'default',
	sectionName,
	description,
	viewAll,
	onSaveToggle,
	onRecipeClick,
	className,
}: RecipeListProps) {
	const getItemsToShow = () => {
		switch (layout) {
			case '1-row-4':
				return 4;
			case '2-rows-4':
				return 8;
			case 'default':
			default:
				return recipeList.length;
		}
	};

	const getGridClasses = () => {
		switch (layout) {
			case '1-row-4':
				return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
			case '2-rows-4':
				return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
			case 'default':
			default:
				return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
		}
	};

	const itemsToShow = getItemsToShow();
	const displayedRecipes = recipeList.slice(0, itemsToShow);

	return (
		<div className={cn('max-w-[80%] mx-auto px-4 py-8', className)}>
			{(sectionName || description || viewAll?.show) && (
				<div className="w-full">
					{(sectionName || viewAll?.show) && (
						<div className="w-full flex items-center justify-between mb-4">
							{sectionName && (
								<div className="text-5xl font-cormorant font-semibold text-gray-900 tracking-tight text-balance">
									{sectionName}
								</div>
							)}
							{viewAll?.show && (
								<Button
									variant="ghost"
									onClick={() => viewAll.onClick?.('')}
									className="text-gray-700 hover:text-gray-900 font-light text-lg tracking-wide uppercase">
									{viewAll.text || 'VIEW ALL RECIPES'}
									<ChevronRight className="w-4 h-4" />
								</Button>
							)}
						</div>
					)}

					{description && (
						<div className="w-full text-left text-gray-600 text-lg leading-relaxed text-pretty">
							{description}
						</div>
					)}
				</div>
			)}

			<div className={getGridClasses()}>
				{displayedRecipes.map(recipe => (
					<RecipeItem
						key={recipe.id}
						{...recipe}
						onSaveToggle={onSaveToggle}
						onClick={onRecipeClick}
						className="h-full"
					/>
				))}
			</div>
		</div>
	);
}
