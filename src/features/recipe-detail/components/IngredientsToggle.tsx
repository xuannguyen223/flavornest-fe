import { useState } from "react";
import type { IngredientSection } from "../mock";
import { Plus } from "lucide-react";

export interface IngredientsToggleProps {
  metricItems: string[];
  usItems: string[];
  metricSections?: IngredientSection[];
  usSections?: IngredientSection[];
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

export default function IngredientsToggle({ metricItems, usItems, metricSections, usSections }: IngredientsToggleProps) {
  const [unit, setUnit] = useState<"metric" | "us">("metric");

  const flatItems = unit === "metric" ? metricItems : usItems;
  const sections = unit === "metric" ? metricSections : usSections;

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-semibold leading-tight text-neutral-700 text-left">Ingredients</h2>
        <div className="flex items-center gap-5 text-lg">
          <button
            type="button"
            onClick={() => setUnit("metric")}
            className={(unit === "metric" ? "text-neutral-700" : "text-neutral-500") + " font-medium"}
          >
            METRIC
          </button>
          <span className="h-6 w-px bg-neutral-200" />
          <button
            type="button"
            onClick={() => setUnit("us")}
            className={(unit === "us" ? "text-neutral-700" : "text-neutral-500") + " font-medium"}
          >
            US
          </button>
        </div>
      </div>
      {sections && sections.length > 0 ? (
        <div className="mt-6 space-y-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-medium text-neutral-700 text-left">{section.title}:</h3>
              <div className="mt-3 space-y-1.5">
                {section.items.map((line, i) => (
                  <CheckItem key={i} label={line} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 text-left">
          {flatItems.map((line, idx) => (
            <li key={idx} className="text-neutral-600">• {line}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
