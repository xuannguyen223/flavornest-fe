import FooterLinks from './components/FooterLinks';
import SubscribeNewsletter from './components/SubscribeNewsletter';
import SocialIcons from './components/SocialIcons';
import { footerColumns } from './footer-data';

export default function Footer() {
	return (
		<footer className="w-full bg-neutral-200 text-left p-8">
			<div className="px-6 py-8">
				<div className="flex flex-wrap justify-between items-start">
					{/* 3 cột links */}
					<FooterLinks columns={footerColumns} />

					{/* Subscribe Newsletter + Social Media */}
					<div className="flex flex-col md:flex-col gap-8">
						<div className="flex-shrink-0 w-full md:w-auto">
							<SubscribeNewsletter />
						</div>

						<div className="flex justify-start md:justify-start">
							<SocialIcons />
						</div>
					</div>
				</div>

				{/* Divider + Copyright */}
				<div className="mt-8">
					<div className="w-full h-px bg-neutral-500"></div>

					<div className="mt-4 w-full flex justify-center -mb-12">
						<span className="text-neutral-700 text-lg leading-none">
							© 2025 Brand. All rights reserved.
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
