import FooterLinks from './components/FooterLinks';
import SocialIcons from './components/SocialIcons';
import { footerColumns as staticFooterColumns } from './footer-data';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import type { FooterColumn, FooterLink } from './footer-data';
import { useEffect } from 'react';
import { fetchAllCategories } from '@/store/features/categorySlice';
import { formatCategoryType } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const categoriesByType = useAppSelector(state => state.category.categoriesByType);
	const userId = useAppSelector(state => state.userSlice.profile.userId);

	useEffect(() => {
		dispatch(fetchAllCategories());
	}, [dispatch]);

	const mainCategoryLinks: FooterLink[] = Object.keys(categoriesByType).map(cat => ({
		label: formatCategoryType(cat),
		href: `/recipes?categoryType=${cat}`,
	}));

	const footerColumns: FooterColumn[] = staticFooterColumns.map(col => {
		if (col.title === 'MAIN CATEGORIES') {
			return { ...col, links: mainCategoryLinks };
		}
		return col;
	});

	return (
		<footer className="w-full bg-neutral-700 text-left p-8">
			<div className="pb-8">
				<div className="flex flex-wrap justify-around items-start">
					<FooterLinks columns={footerColumns} />

					<div className="flex flex-col items-end justify-between gap-16">
						{!userId && (
							<div className="w-full">
								<p className="text-right text-neutral-100 text-lg leading-relaxed">
									Want to save your favorite recipes? <br />
									<span
										className="font-semibold underline cursor-pointer"
										onClick={() => navigate('/login')}>
										Sign in
									</span>{' '}
									or{' '}
									<span
										className="font-semibold underline cursor-pointer"
										onClick={() => navigate('/signup')}>
										Create an account
									</span>{' '}
									to unlock more recipes!
								</p>
							</div>
						)}

						<SocialIcons />
					</div>
				</div>

				<div className="mt-8">
					<div className="w-full h-px bg-neutral-200"></div>

					<div className="mt-4 w-full flex justify-center -mb-12">
						<span className="text-neutral-200 text-lg leading-none">
							© 2025 Brand. All rights reserved.
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
