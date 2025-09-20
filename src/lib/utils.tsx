import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format lại chữ CUISINE => Cuisine, MEAL_TYPE => Meal Type
export const formatCategoryType = (type: string) => {
  return type
    .toLowerCase()              
    .split('_')                 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' ');                 
};