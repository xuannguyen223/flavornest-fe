import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<div className="mr-[42px]">
			<Link
				to={'/'}
				aria-label="Go to homepage">
				<img src = "/logo-full.svg" alt = "Logo + Name" 
					className="w-16 sm:w-12 md:w-[120px] lg:w-[120px]"/>
			</Link>
		</div>
	);
};

export default Logo;
