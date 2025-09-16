import { useState, useRef, useEffect } from "react";

const options = ["Relevance", "Newest", "Highest Rated"];

export default function SortDropdown () {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpen(false);
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-72 flex 
    items-center justify-end ml-auto">
        {/* Label */}
        <span className="text-neutral-700 font-medium mr-2">Sort by:</span>

        {/* Dropdown Button */}
        <div
        className="flex items-center justify-between 
            bg-white border border-gray-300 rounded-md 
            px-4 py-3 cursor-pointer gap-4 "
        onClick={toggleDropdown}>
        <span className="text-gray-900">{selected}</span>
        <svg
            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" 
            strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        </div>

        {/* Options */}
        {open && (
            <div className="absolute justify-end right-0 top-full z-10 mt-1 w-41 bg-white 
            border border-neutral-300 rounded-md shadow-lg text-left">
            {options.map((option, idx) => (
                <div
                key={idx}
                onClick={() => handleSelect(option)}
                className="px-4 py-3 cursor-pointer hover:bg-neutral-100">
                {option}
                </div>
            ))}
            </div>
        )}
    </div>
  );
};