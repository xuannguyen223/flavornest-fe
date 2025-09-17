import { Plus } from "lucide-react";

export interface IngredientsToggleProps {
  metricItems: string[];
}

function CheckItem({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 text-neutral-600">
      <span className="grid size-5 place-items-center rounded-full border-2 border-brandBg">
        <Plus className="size-4 text-brandBg" />
      </span>
      <span>{label}</span>
    </label>
  );
}

export default function IngredientsToggle({ metricItems}: IngredientsToggleProps) {
  const flatItems = metricItems;

  return (
    <section className="mt-8">
      <h2 className="text-4xl font-semibold leading-tight text-neutral-700 text-left">Ingredients</h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 text-left">
          {flatItems.map((line, idx) => (
            <CheckItem key={idx} label={line} />
          ))}
        </ul>
    </section>
  );
}
