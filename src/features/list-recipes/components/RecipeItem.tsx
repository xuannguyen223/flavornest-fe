'use client';

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RecipeItemProps {
	id: string;
	title: string;
	creator: string;
	totalTime: string;
	rating: number;
	reviewCount: number;
	imageUrl: string;
	isSaved?: boolean;
	onSaveToggle?: (id: string) => void;
	onClick?: (id: string) => void; // click then navigate to recipe detail page
	className?: string;
}

export function RecipeItem({
	id,
	title,
	creator,
	totalTime,
	rating,
	reviewCount,
	imageUrl,
	isSaved = false,
	onSaveToggle,
	onClick,
	className,
}: RecipeItemProps) {
	const [saved, setSaved] = useState(isSaved);
	const [imageLoaded, setImageLoaded] = useState(false);
	const navigate = useNavigate();

	const handleSaveClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setSaved(!saved);
		onSaveToggle?.(id);
	};

	const handleCardClick = () => {
		onClick?.(id);
		// click and navigate to recipe detail page
		navigate(`/recipes/${encodeURIComponent(id)}`);
	};

	const renderStars = () => {
		return Array.from({ length: 5 }, (_, index) => {
			const filled = index < Math.round(rating);
			return ( 
				<Star
				key={index}
				className={cn('w-4 h-4')}
				fill={filled ? '#2E5834' : '#ADBBAE'}
				color={filled ? '#2E5834' : '#ADBBAE'}
				strokeWidth={0}
			/>
			);
			
		});
	};

	return (
		<Card
			className={cn('group cursor-pointer overflow-hidden border-none shadow-none', className)}
			onClick={handleCardClick}>
			<CardContent className="p-0">
				<div className="relative aspect-[3/2] overflow-hidden rounded-t-lg">
					<img
						src={imageUrl || '/placeholder.svg'}
						alt={title}
						className={cn(
							'w-full h-full object-cover rounded-lg',
							imageLoaded ? 'opacity-100' : 'opacity-0',
						)}
						onLoad={() => setImageLoaded(true)}
					/>
					{!imageLoaded && (
						<div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
					)}

					<Bookmark
						strokeWidth={0.5}
						className={cn(
							'absolute top-2 right-2 w-10 h-10 cursor-pointer',
							saved
								? 'fill-yellow-400 drop-shadow-sm'
								: 'fill-white text-gray-800 drop-shadow-sm hover:fill-gray-100',
						)}
						onClick={handleSaveClick}
						fill={saved ? '#facc15' : '#fff'}
					/>
				</div>
				<div className="mt-2 font-poppins flex flex-col gap-2 text-black text-left">
					<div className="font-semibold text-gray-900 text-2xl line-clamp-2">{title}</div>

					<div className="flex items-center gap-2 text-sm">
						By
						<div className="font-medium text-amber-600">{creator.toUpperCase()}</div>
					</div>

					<div className="flex items-center gap-2 text-sm">
						<div>Total time: {totalTime}</div>
					</div>

					<div className="flex items-center gap-2">
						<div className="flex items-center gap-1">{renderStars()}</div>
						<div className="text-sm">({reviewCount})</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
