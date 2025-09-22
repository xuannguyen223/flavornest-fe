import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MY_PROFILE_NAV } from './components/sidebar/SidebarList';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

function MyProfilePage() {
	const location = useLocation();
	const isBasePath = location.pathname === '/my-profile';
	const { isAuthenticated } = useSelector((state: RootState) => state.loginSlice);

	if (!isAuthenticated) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	if (isBasePath) {
		return (
			<Navigate
				to="/my-profile/edit-profile"
				replace
			/>
		);
	}

	return (
		<div className="w-full grid grid-cols-1 gap-[60px] md:grid-cols-[300px_1fr] min-h-screen">
			<aside className="h-full">
				<nav className="h-full bg-(--second-color)">
					<h2 className="p-[50px] py-5 font-semibold text-[32px] text-white">My Profile</h2>
					<ul className="space-y-1">
						{MY_PROFILE_NAV.map(item => {
							const isActive = location.pathname === item.path;
							return (
								<li key={item.key}>
									<Link
										to={item.path}
										className={cn(
											'flex items-center justify-between pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-[50px] py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg lg:text-xl xl:text-[20px] text-white',
											isActive
												? 'bg-background font-medium bg-white text-(--light-black-color)'
												: 'hover:bg-accent',
										)}>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</aside>
			<div className="w-full pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-[60px]">
				<Outlet />
			</div>
		</div>
	);
}

export default MyProfilePage;
