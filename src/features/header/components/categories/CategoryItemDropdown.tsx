import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import "../../style.css";

export type CategoryDropdownItem = {
  id: string;
  label: string;
  href?: string;
};

type CategoryItemDropdownProps = {
  label: string;
  items: CategoryDropdownItem[];
  isActive?: boolean;
};

export default function CategoryItemDropdown({
  label,
  items,
  isActive,
}: CategoryItemDropdownProps) {
  const [open, setOpen] = useState(false);

  const menuItems = useMemo(() => items, [items]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative"
      >
        <DropdownMenuTrigger asChild>
          <button
            className={`category-trigger cursor-pointer text-foreground/90 hover:text-foreground outline-none ${
              isActive ? "text-foreground" : ""
            } text-sm sm:text-base lg:text-lg xl:text-[20px] text-(--light-black-color) pb-1`}
          >
            {label}
            <span
              className={`category-underline ${
                open || isActive ? "is-active" : ""
              }`}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          side="bottom"
          sideOffset={12}
          className="category-popover p-2 shadow-md border-none rounded-none"
        >
          <div>
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.id} className="px-1 py-2">
                <a
                  href={item.href || "#"}
                  className="block font-light text-left text-base sm:text-lg lg:text-xl xl:text-[20px] text-(--light-black-color)"
                >
                  {item.label}
                </a>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
