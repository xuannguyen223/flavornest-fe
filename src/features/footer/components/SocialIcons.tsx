import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';

export default function SocialIcons() {
	return (
		<div className="flex flex-col gap-2 justify-center items-end">
			<h3 className="text-neutral-100 text-BASE font-semibold mb-2">FOLLOW US FOR MORE</h3>
			<div className="flex space-x-4">
				<a
					href="https://facebook.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-neutral-200 hover:text-blue-600 transition-colors">
					<FaFacebook size={30} />
				</a>
				<a
					href="https://twitter.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-neutral-200 hover:text-sky-500 transition-colors">
					<FaTwitter size={30} />
				</a>
				<a
					href="https://instagram.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-neutral-200 hover:text-pink-500 transition-colors">
					<FaInstagram size={30} />
				</a>
				<a
					href="https://pinterest.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-neutral-200 hover:text-red-600 transition-colors">
					<FaPinterest size={30} />
				</a>
				<a
					href="https://youtube.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-neutral-200 hover:text-red-500 transition-colors">
					<FaYoutube size={30} />
				</a>
			</div>
		</div>
	);
}
