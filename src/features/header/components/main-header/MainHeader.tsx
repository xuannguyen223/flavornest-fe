import Logo from './Logo';
import NavLinks from './NavLinks';
import AddRecipeButton from './action-buttons/AddRecipeButton';
import AuthButton from './action-buttons/AuthButton';
import UserMenu from './action-buttons/UserMenu';
import '../../style.css';
import { Categories } from '../categories';
import { CATEGORY_DATA } from '../categories/constants';
import { useNavigate } from 'react-router-dom';

export default function MainHeader() {
	const navigate = useNavigate();
	const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('auth_token');
	const displayName =
		(typeof window !== 'undefined' && localStorage.getItem('display_name')) || 'Name';

	const handleLogin = () => {
		console.log('Login/Signup clicked');
	};

	const handleAddRecipes = () => {
		navigate('/add-recipe');
	};

	const handleLogout = () => {
		try {
			localStorage.removeItem('auth_token');
			// optionally clear other auth-related items
			// localStorage.removeItem("display_name");
			window.location.reload();
		} catch {
			console.error('Failed to log out');
		}
	};
	return (
		<header className="w-full header-shadow">
			<div className="header-container py-4 border-[var(--divide-color)] border-b-2">
				<div className="header-top px-2 sm:px-4 lg:px-0 ">
					<Logo />
					<NavLinks />
					<div className="ml-auto flex items-center gap-3 sm:gap-4 lg:gap-6">
						<AddRecipeButton onClick={handleAddRecipes} />
						{isLoggedIn ? (
							<UserMenu
								displayName={displayName}
								onLogout={handleLogout}
							/>
						) : (
							<AuthButton onClick={handleLogin} />
						)}
					</div>
				</div>
			</div>
			<Categories items={CATEGORY_DATA} />
		</header>
	);
}
