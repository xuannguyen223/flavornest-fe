import CategoryItemDropdown, {
  type CategoryDropdownItem,
} from "./CategoryItemDropdown";

export type Category = {
  id: string;
  label: string;
  items?: CategoryDropdownItem[];
};

type CategoryListProps = {
  items: Category[];
  className?: string;
  activeId?: string;
  onHover?: (id: string | null) => void;
};

export default function CategoryList({
  items,
  className,
  activeId,
  onHover,
}: CategoryListProps) {
  return (
    <ul
      className={`flex items-center gap-6 sm:gap-8 lg:gap-12 text-foreground ${
        className ?? ""
      }`}
    >
      {items.map((item) => (
        <li key={item.id} className="relative">
          {item.items && item.items.length > 0 ? (
            <CategoryItemDropdown
              label={item.label}
              items={item.items}
              isActive={activeId === item.id}
            />
          ) : (
            <div
              onMouseEnter={() => onHover?.(item.id)}
              onMouseLeave={() => onHover?.(null)}
              className={`pb-2 cursor-pointer ${
                activeId === item.id ? "text-foreground" : "text-foreground/80"
              } text-sm sm:text-base lg:text-base xl:text-[20px]`}
            >
              {item.label}
              {activeId === item.id && (
                <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-foreground"></span>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
