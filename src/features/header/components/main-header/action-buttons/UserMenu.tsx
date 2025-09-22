import { useMemo } from 'react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

type UserMenuProps = {
	displayName?: string;
	onLogout?: () => void;
};

export default function UserMenu({ displayName = 'Name', onLogout }: UserMenuProps) {
	const initials = useMemo(() => {
		const parts = displayName.trim().split(' ').filter(Boolean);
		const first = parts[0]?.[0] ?? 'N';
		const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
		return (first + last).toUpperCase();
	}, [displayName]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center gap-2 sm:gap-3 px-3 py-2 cursor-pointer">
					<span
						aria-hidden
						className="grid place-items-center w-10 h-10 rounded-full bg-(--gray-color) text-(--light-black-color) text-sm font-medium">
						{initials}
					</span>
					<span className="hidden sm:block text-(--light-black-color) text-sm sm:text-base lg:text-base xl:text-[20px]">
						{displayName}
					</span>
					<span
						aria-hidden
						className="ml-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 38 38"
							fill="none">
							<path
								d="M13 16L19 22L25 16"
								stroke="#1D1D1D"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</span>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				sideOffset={10}
				className="min-w-[12rem] py-2 bg-white shadow-md border-none rounded-none">
				<DropdownMenuItem className="px-3 py-2">
					<Link
						to="/my-profile"
						className="block w-full text-left text-base sm:text-lg lg:text-lg xl:text-[20px] text-(--light-black-color)">
						My Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					className="px-3 py-2"
					onClick={onLogout}>
					<span className="block w-full text-left text-base sm:text-lg lg:text-lg xl:text-[20px] text-(--light-black-color)">
						Log Out
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
