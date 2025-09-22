'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { RecipeItem, type RecipeItemProps } from './RecipeItem';
import { cn } from '@/lib/utils';

export type RecipeListLayout = 'default' | '2-rows-4' | '1-row-4' | 'list-rows-3';

export interface RecipeListProps {
	recipeList: RecipeItemProps[];
	layout?: RecipeListLayout;
	categoryName?: string;
	description?: string;
	viewAll?: {
		show: boolean;
		text?: string;
		onClick?: (categoryName: string, description: string) => void; // click then navigate to recipe list page with that category selected
	};
	onRecipeClick?: (id: string) => void;
	className?: string;
}

export function RecipeList({
	recipeList,
	layout = 'default',
	categoryName,
	description,
	viewAll,
	onRecipeClick,
	className,
}: RecipeListProps) {
	const getItemsToShow = () => {
		switch (layout) {
			case '1-row-4':
				return 4;
			case '2-rows-4':
				return 8;
			case 'list-rows-3':
				return recipeList.length;
			case 'default':
			default:
				return recipeList.length;
		}
	};

	const getGridClasses = () => {
		switch (layout) {
			case '1-row-4':
				return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8';
			case '2-rows-4':
				return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8';
			case 'list-rows-3':
				return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
			case 'default':
			default:
				return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8';
		}
	};

	const itemsToShow = getItemsToShow();
	const displayedRecipes = recipeList.slice(0, itemsToShow);

	return (
		<div className={cn('w-full mx-auto', viewAll?.show ? 'px-12' : '', className)}>
			{(categoryName || description || viewAll?.show) && (
				<div className="w-full">
					{(categoryName || viewAll?.show) && (
						<div className="w-full flex items-center justify-between px-8">
							{categoryName && (
								<div className="text-5xl font-cormorant font-semibold text-gray-900 tracking-tight text-balance">
									{categoryName}
								</div>
							)}
							{viewAll?.show && (
								<Button
									variant="ghost"
									onClick={() => viewAll.onClick?.(categoryName || '', description || '')}
									className="text-gray-700 hover:text-gray-900 font-light text-lg tracking-wide uppercase cursor-pointer">
									{viewAll.text || 'VIEW ALL RECIPES'}
									<ChevronRight className="w-4 h-4" />
								</Button>
							)}
						</div>
					)}

					{description && (
						<div className="w-full text-left text-gray-600 text-lg leading-relaxed text-pretty px-8">
							{description}
						</div>
					)}
				</div>
			)}

			<div className={`${getGridClasses()}`}>
				{displayedRecipes.map(recipe => (
					<RecipeItem
						key={recipe.id}
						{...recipe}
						onClick={onRecipeClick}
						className="h-full"
					/>
				))}
			</div>
		</div>
	);
}
