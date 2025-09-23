'use client';

import { formatCategoryType } from '@/lib/utils';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export interface TitleProps {
	title: string;
	base?: boolean;
}

export default function Breadcrumbs({ title, base = false }: TitleProps) {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const pathnames = location.pathname.split('/').filter(x => x);

	const textMain = base ? 'text-neutral-300' : 'text-neutral-700';
	const textSub = base ? 'text-neutral-300 hover:text-white' : 'text-neutral-400 hover:text-black';
	const divider = base ? 'bg-neutral-300' : 'bg-neutral-700';

	const categoryType = searchParams.get('categoryType');

	return (
		<nav className={`text-base flex items-center gap-2 ${textMain}`}>
			<Link
				to="/"
				className={`${textSub} font-light hover:underline`}>
				Home
			</Link>
			{pathnames.map((value, idx) => {
				const to = '/' + pathnames.slice(0, idx + 1).join('/');
				console.log({ value, to });
				const isLast = idx === pathnames.length - 1 && !categoryType;

				return (
					<span
						key={to}
						className="flex items-center gap-2">
						<span className={`h-3 w-[1px] rotate-12 ${divider}`} />
						{isLast ? (
							<span
								className={`${textMain} font-semibold cursor-pointer hover:text-white`}
								onClick={() => navigate(to)}>
								{title ?? decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1))}
							</span>
						) : (
							<Link
								to={to}
								className={`${textSub} font-light hover:underline`}>
								{decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1))}
							</Link>
						)}
					</span>
				);
			})}
			{categoryType && (
				<span className="flex items-center gap-2">
					<span className={`h-3 w-[1px] rotate-12 ${divider}`} />
					<span className={`${textMain} font-semibold`}>{formatCategoryType(categoryType)}</span>
				</span>
			)}
		</nav>
	);
}
