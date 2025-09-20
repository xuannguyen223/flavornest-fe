'use client';

import Breadcrumbs from '../BreadCrumbs';
import SearchBar from './SearchBar';

interface SearchSectionProps {
	title?: string;
	backgroundImage?: string;
	backgroundColor?: string;
	backgroundOverlay?: boolean;
	overlayOpacity?: number;
	searchPlaceholder?: string;
	searchValue?: string;
	onSearchChange?: (value: string) => void;
	onSearch?: (value: string) => void;
	showSearchBar?: boolean;
	breadcrumbTitle?: string;
	showBreadcrumbs?: boolean;
	height?: string;
	className?: string;
}

export default function SearchSection({
	title,
	backgroundImage,
	backgroundColor = 'bg-gray-600',
	backgroundOverlay = true,
	overlayOpacity = 0.4,
	searchPlaceholder,
	searchValue,
	onSearchChange,
	onSearch,
	showSearchBar = true,
	breadcrumbTitle = '',
	showBreadcrumbs = true,
	height = 'h-64',
	className = '',
}: SearchSectionProps) {
	const backgroundStyle = backgroundImage
		? {
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
		  }
		: {};

	return (
		<section
			className={` relative w-full flex flex-col ${height}
        ${backgroundImage ? '' : backgroundColor}
        ${className}
        `}
			style={backgroundStyle}>
			{backgroundImage && backgroundOverlay && (
				<div
					className="absolute inset-0 bg-black"
					style={{ opacity: overlayOpacity }}
				/>
			)}

			<div className="relative z-10 flex flex-col h-full px-4 sm:px-6 lg:px-8">
				{showBreadcrumbs && (
					<div className="px-20 pt-4 sm:pt-6 flex justify-start">
						<Breadcrumbs title={breadcrumbTitle} />
					</div>
				)}

				<div
					className={`flex-1 flex flex-col space-y-6 px-4 items-center text-center justify-center`}>
					{title && (
						<h1
							className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-[60%] ${
								backgroundImage ? 'text-white' : 'text-gray-900'
							}`}>
							{title}
						</h1>
					)}

					{showSearchBar && (
						<div className="w-full max-w-8xl">
							<SearchBar
								placeholder={searchPlaceholder}
								value={searchValue}
								onChange={onSearchChange}
								onSearch={onSearch}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
