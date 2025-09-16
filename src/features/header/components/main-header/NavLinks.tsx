import { Link } from "react-router-dom";

type NavLink = {
    label: string;
    to: string;
};

type NavLinksProps = {
    links?: NavLink[];
};

const DEFAULT_LINKS: NavLink[] = [
    { label: "RECIPES", to: "/recipes" },
    { label: "SEARCH", to: "/search" },
    { label: "ABOUT", to: "/about" },
];

export default function NavLinks({ links = DEFAULT_LINKS }: NavLinksProps) {
    return (
        <nav>
            <ul className="flex items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-[48px]">
                {links.map((item) => (
                    <li key={item.to}>
                        <Link
                            to={item.to}
                            className="font-medium text-sm sm:text-base lg:text-lg xl:text-[22px] text-(--light-black-color)"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}


