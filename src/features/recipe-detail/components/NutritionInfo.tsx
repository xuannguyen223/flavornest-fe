import type { NutritionInfo } from "../mock";

export interface NutritionInfoProps {
  data: NutritionInfo;
  servingsPerRecipe: number;
}

export default function NutritionInfoSection({ data, servingsPerRecipe }: NutritionInfoProps) {
  return (
    <section className="mt-8 text-left">
        <h2 className="text-4xl font-semibold leading-tight text-neutral-700">Nutritional Information</h2>

        <div className="mt-6 flex justify-center">
            <div className="
                    w-full max-w-[522px] border border-neutral-400/30 
                    bg-white shadow-lg no-print">
                <div className="px-6 py-4 text-neutral-600">
                    Servings per recipe: {servingsPerRecipe}
                </div>

                <div className="space-y-0  px-6">
                    {/* Header row */}
                    <div className="
                            flex items-center justify-between 
                            font-semibold bg-neutral-200 border-b-1 
                            border-t-1 py-2 border-neutral-300 text-neutral-700 shadow-lg">
                        <span>Per Serving</span>
                        <span>% Daily Value*</span>
                    </div>

                    {/* Rows */}
                    {data.items.map((row, i) => (
                    <div key={i} className="border-t border-neutral-400/30">
                        <div className="flex items-center justify-between 
                        py-2 text-neutral-600">
                            <div className="flex items-center gap-1 ">
                                <span className="font-medium">{row.label}</span>
                                <span>{row.amount}</span>
                            </div>
                            <span className="font-medium">{row.dailyValue ?? ""}</span>
                        </div>
                    </div>
                    ))}

                    {data.footnote ? (
                    <div>
                        <div className="h-1 bg-neutral-200" />
                        <div className="py-2 text-neutral-600 italic">{data.footnote}</div>
                    </div>
                    ) : null}

                </div>
            </div>
        </div>
      
    </section>
  );
}
