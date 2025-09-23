import Spinner from './Spinner';

export default function LoadingPage() {
	return (
		<div className="h-screen flex items-center justify-center px-4">
			<Spinner />
		</div>
	);
}
