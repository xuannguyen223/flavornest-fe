import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from '@/lib/utils';

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
  description: string;
};

type CategoryItemDropdownProps = {
  type: string,
  label: string;
  items: CategoryDropdownItem[];
  isActive?: boolean;
};

// export default function CategoryItemDropdown({
//   type,
//   label,
//   items,
//   isActive,
// }: CategoryItemDropdownProps) {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const menuItems = useMemo(() => items, [items]);

//   const handleClick = (e: React.MouseEvent, item: CategoryDropdownItem) => {
//     e.stopPropagation();
//     navigate(
//       `/recipes?category=${encodeURIComponent(item.label)}&desc=${encodeURIComponent(
//         item.description || ""
//       )}`
//     );
//   };

//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <div
//         onMouseEnter={() => setOpen(true)}
//         onMouseLeave={() => setOpen(false)}
//         onClick={() => navigate(
//           `/recipes?categoryType=${type}`)}
//         className="relative"
//       >
//         <DropdownMenuTrigger asChild>
//           <button
//             className={`category-trigger cursor-pointer text-foreground/90 hover:text-foreground outline-none ${
//               isActive ? "text-foreground" : ""
//             } text-sm sm:text-base lg:text-base xl:text-[20px] text-(--light-black-color) pb-1`}
//           >
//             {label}
//             <span
//               className={`category-underline ${
//                 open || isActive ? "is-active" : ""
//               }`}
//             />
//           </button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent
//           align="start"
//           side="bottom"
//           sideOffset={12}
//           className="category-popover p-2 shadow-md border-none rounded-none"
//         >
//           <div>
//             {menuItems.map((item) => (
//               <DropdownMenuItem 
//                 key={item.id} 
//                 className="px-1 py-2 rounded hover:bg-gray-100 transition-colors"
//                 onClick={(e) => handleClick(e, item)}
//                 >
//                 <span className='block w-full font-light text-left 
//                   text-base text-(--light-black-color)'>
//                   {item.label}
//                 </span>
//               </DropdownMenuItem>
//             ))}
//           </div>
//         </DropdownMenuContent>
//       </div>
//     </DropdownMenu>
//   );
// }

// export default function CategoryItemDropdown({
//   type,
//   label,
//   items,
//   isActive,
// }: CategoryItemDropdownProps) {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const menuItems = useMemo(() => items, [items]);

//   const handleClick = (e: React.MouseEvent, item: CategoryDropdownItem) => {
//     e.stopPropagation(); // chặn click lan lên cha
//     navigate(
//       `/recipes?category=${encodeURIComponent(item.label)}&desc=${encodeURIComponent(
//         item.description || ""
//       )}`
//     );
//   };

//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <div
//         onMouseEnter={() => setOpen(true)}
//         onMouseLeave={() => setOpen(false)}
//         className="relative"
//       >
//         <DropdownMenuTrigger asChild>
//           <button
//             onClick={() => navigate(`/recipes?categoryType=${type}`)}
//             className={`category-trigger cursor-pointer text-foreground/90 hover:text-foreground outline-none ${
//               isActive ? "text-foreground" : ""
//             } text-sm sm:text-base lg:text-base xl:text-[20px] text-(--light-black-color) pb-1`}
//           >
//             {label}
//             <span
//               className={`category-underline ${
//                 open || isActive ? "is-active" : ""
//               }`}
//             />
//           </button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent
//           align="start"
//           side="bottom"
//           sideOffset={12}
//           className="category-popover p-2 shadow-md border-none rounded-none"
//         >
//           <div>
//             {menuItems.map((item) => (
//               <DropdownMenuItem
//                 key={item.id}
//                 data-item // flag để biết là click item con
//                 className="px-1 py-2 rounded hover:bg-gray-100 transition-colors"
//                 onClick={(e) => handleClick(e, item)}
//               >
//                 <span className="block w-full font-light text-left text-base text-(--light-black-color)">
//                   {item.label}
//                 </span>
//               </DropdownMenuItem>
//             ))}
//           </div>
//         </DropdownMenuContent>
//       </div>
//     </DropdownMenu>
//   );
// }

// export default function CategoryItemDropdown({
//   type,
//   label,
//   items,
//   isActive,
// }: CategoryItemDropdownProps) {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const menuItems = useMemo(() => items, [items]);

//   const handleClick = (e: React.MouseEvent, item: CategoryDropdownItem) => {
//     e.stopPropagation(); // chặn click lan lên cha
//     navigate(
//       `/recipes?category=${encodeURIComponent(item.label)}&desc=${encodeURIComponent(
//         item.description || ""
//       )}`
//     );
//   };

//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <div
//         onMouseEnter={() => setOpen(true)}
//         onMouseLeave={() => setOpen(false)}
//         className="relative"
//       >
//         <DropdownMenuTrigger asChild>
//           <button
//             onClick={() => navigate(`/recipes?categoryType=${type}`)}
//             className={`category-trigger cursor-pointer text-foreground/90 hover:text-foreground outline-none ${
//               isActive ? "text-foreground" : ""
//             } text-sm sm:text-base lg:text-base xl:text-[20px] text-(--light-black-color) pb-1`}
//           >
//             {label}
//             <span
//               className={`category-underline ${
//                 open || isActive ? "is-active" : ""
//               }`}
//             />
//           </button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent
//           align="start"
//           side="bottom"
//           sideOffset={12}
//           className="category-popover p-2 shadow-md border-none rounded-none"
//         >
//           <div>
//             {menuItems.map((item) => (
//               <DropdownMenuItem
//                 key={item.id}
//                 data-item // flag để biết là click item con
//                 className="px-1 py-2 rounded hover:bg-gray-100 transition-colors"
//                 onClick={(e) => handleClick(e, item)}
//               >
//                 <span className="block w-full font-light text-left text-base text-(--light-black-color)">
//                   {item.label}
//                 </span>
//               </DropdownMenuItem>
//             ))}
//           </div>
//         </DropdownMenuContent>
//       </div>
//     </DropdownMenu>
//   );
// }


export default function CategoryItemDropdown({ type, label, items, isActive }: CategoryItemDropdownProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = useMemo(() => items, [items]);

  const handleParentClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn hành vi mặc định của DropdownMenuTrigger
    e.stopPropagation(); // Ngăn sự kiện lan truyền
    const url = `/recipes?categoryType=${encodeURIComponent(type)}`;
    console.log('Parent click - Navigating to:', url); // Debug
    navigate(url);
    setOpen(false); // Đóng dropdown sau khi điều hướng
  };

  const handleItemClick = (e: React.MouseEvent, item: CategoryDropdownItem) => {
    e.preventDefault(); // Ngăn hành vi mặc định
    e.stopPropagation(); // Ngăn sự kiện lan truyền
    const url = `/recipes?category=${encodeURIComponent(item.label)}&desc=${encodeURIComponent(item.description || '')}`;
    console.log('Item click - Navigating to:', url); // Debug
    navigate(url);
    setOpen(false); // Đóng dropdown sau khi điều hướng
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative"
      >
        <DropdownMenuTrigger asChild>
          <button
            onMouseDown={handleParentClick} // Sử dụng onMouseDown thay vì onClick
            className={cn(
              'category-trigger cursor-pointer text-foreground/90 hover:text-foreground outline-none',
              isActive ? 'text-foreground' : '',
              'text-sm sm:text-base lg:text-base xl:text-[20px] text-[var(--light-black-color)] pb-1',
            )}
          >
            {label}
            <span
              className={cn('category-underline', open || isActive ? 'is-active' : '')}
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
              <DropdownMenuItem
                key={item.id}
                data-item
                className="px-1 py-2 rounded hover:bg-gray-100 transition-colors"
                onMouseDown={(e) => handleItemClick(e, item)} // Sử dụng onMouseDown thay vì onClick
              >
                <span className="block w-full font-light text-left text-base text-[var(--light-black-color)]">
                  {item.label}
                </span>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}