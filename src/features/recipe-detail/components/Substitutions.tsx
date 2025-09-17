import type { SubstitutionItem } from "../mock";

export interface SubstitutionsProps {
  items: SubstitutionItem[];
}

export default function Substitutions({ items }: SubstitutionsProps) {
  return (
    <section className="mt-8">
      <h2 className="text-4xl font-semibold leading-tight text-neutral-700 text-left">Substitutions</h2>
      <div className="mt-6 space-y-2">
        <ul className="list-disc list-outside pl-6 space-y-1.5">
        {items.map((it, idx) => (
            <li key={idx} className="text-left text-neutral-600">
            <div className="flex">
                <span className="font-medium shrink-0">{it.label}</span>
                <span className="pl-1 text-left ">{it.value}</span>
            </div>
            </li>
        ))}
        </ul>

      </div>
    </section>
  );
}
