import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  label: string;
  to: string;
};

function SidebarItem({ label, to }: SidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex items-center justify-between rounded-md px-3 py-2 text-sm md:text-base",
          isActive
            ? "bg-background font-medium shadow-xs border"
            : "hover:bg-accent"
        )}
      >
        {label}
      </Link>
    </li>
  );
}

export default SidebarItem;