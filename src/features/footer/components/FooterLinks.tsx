import type { FooterColumn } from '../footer-data';
import { Link } from 'react-router-dom';

export interface FooterLinksProps {
	columns: FooterColumn[];
}

export default function FooterLinks({ columns }: FooterLinksProps) {
	return (
		<div className="flex flex-wrap gap-20">
			{columns.map((column, idx) => (
				<div
					key={idx}
					className="flex flex-col gap-5">
					{/* Title */}
					<h3 className="text-neutral-100 text-lg font-semibold leading-tight">{column.title}</h3>

					{/* Links */}
					<div className="flex flex-col gap-2 text-base">
						{column.links &&
							column.links.map((link, index) => (
								<Link
									key={index}
									to={link.href} // Không reload, Router handle
									className="text-neutral-300 hover:text-white 
                             transition-colors font-poppins">
									{link.label}
								</Link>
							))}
					</div>
				</div>
			))}
		</div>
	);
}
