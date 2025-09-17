import { Link, useLocation } from 'react-router-dom';
export interface TitleProps {
	title: string;
}
export default function Breadcrumbs({ title }: TitleProps) {
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter(x => x);

	return (
		<nav className="text-sm text-white flex items-center gap-2">
			<Link
				to="/"
				className="hover:text-white hover:underline">
				Home
			</Link>
			{pathnames.map((value, idx) => {
				const to = '/' + pathnames.slice(0, idx + 1).join('/');
				const isLast = idx === pathnames.length - 1;

				return (
					<span
						key={to}
						className="flex items-center gap-2">
						<span className="h-3 w-[1px] bg-neutral-400/70 rotate-12" />
						{isLast ? (
							// Nếu có title thì hiển thị title, nếu không thì value
							<span className="text-white">{title ?? decodeURIComponent(value)}</span>
						) : (
							<Link
								to={to}
								className="hover:text-white hover:underline">
								{decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1))}
							</Link>
						)}
					</span>
				);
			})}
		</nav>
	);
}
