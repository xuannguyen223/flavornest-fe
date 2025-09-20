import Logo from './Logo';
import NavLinks from './NavLinks';
import AddRecipeButton from './action-buttons/AddRecipeButton';
import AuthButton from './action-buttons/AuthButton';
import UserMenu from './action-buttons/UserMenu';
import '../../style.css';
import { Categories } from '../categories';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "@/hooks/redux";
import { useState } from 'react';

export default function MainHeader() {
	const categoriesByType = useAppSelector((state) => state.category.categoriesByType);
	const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);
	const displayName = useAppSelector((state) => state.auth.displayName) || "Name";

	const navigate = useNavigate();

	const [menuOpen, setMenuOpen] = useState(false);

	const handleLogin = () => console.log('Login/Signup clicked');
	const handleAddRecipes = () => navigate('/add-recipe');
	const handleLogout = () => {
		localStorage.removeItem('auth_token');
		window.location.reload();
	};

	// SVG Hamburger
	const HamburgerIcon = () => (
		<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	);

	// SVG Close
	const CloseIcon = () => (
		<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
		</svg>
	);

	return (
		<header className="w-full header-shadow">
			<div className="header-container py-1 border-b-1 border-[var(--divide-color)]">
				<div className="header-top flex items-center justify-between px-2 sm:px-4 lg:px-0">
					{/* Logo */}
					<div className="flex items-center">
						<Logo />
					</div>

					{/* NavLinks desktop */}
					<div className="hidden md:flex ml-6 gap-6">
						<NavLinks />
					</div>

					{/* Hamburger mobile */}
					<div className="md:hidden flex items-center">
						<button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
							{menuOpen ? <CloseIcon /> : <HamburgerIcon />}
						</button>
					</div>

					{/* User actions */}
					<div className="ml-auto flex items-center gap-2 sm:gap-3 lg:gap-4">
						<AddRecipeButton onClick={handleAddRecipes} />
						{isLoggedIn ? (
							<UserMenu displayName={displayName} onLogout={handleLogout} />
						) : (
							<AuthButton onClick={handleLogin} />
						)}
					</div>
				</div>

				{/* Mobile menu dropdown */}
				{menuOpen && (
					<div className="md:hidden mt-2 px-2 flex flex-col gap-4">
						{/* Nav links */}
						<div className="flex flex-col gap-2">
							<NavLinks />
						</div>

						{/* Categories cũng trong dropdown */}
						<div className="flex flex-col gap-2">
							<Categories itemsByType={categoriesByType} />
						</div>
					</div>
				)}
			</div>

			{/* Categories */}
			<div className="hidden md:flex justify-center md:block border-t border-[var(--divide-color)] shadow-lg">
				<Categories itemsByType={categoriesByType} />
			</div>
		</header>
	);
}

