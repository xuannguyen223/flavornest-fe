import Footer from '@/features/footer/Footer';
import MainHeader from '@/features/header/components/main-header/MainHeader';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
	return (
		<div className="flex flex-col min-h-screen mx-auto w-full">
			<MainHeader />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
