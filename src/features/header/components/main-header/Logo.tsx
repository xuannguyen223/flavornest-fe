import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<div className="mr-[42px]">
			<Link
				to={'/'}
				aria-label="Go to homepage">
				<img src = "/logo-full.svg" alt = "Logo + Name" className="w-16 md:w-40 sm:w-12 lg:w-40"/>
			</Link>
		</div>
	);
};

export default Logo;
