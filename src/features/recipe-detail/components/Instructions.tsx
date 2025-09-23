import type { Instruction } from "../../../types/TypeRecipe";
export interface InstructionsProps {
  steps: Instruction[];
}

export default function Instructions({ steps }: InstructionsProps) {
  return (
    <section className="mt-8">
      <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold leading-tight text-neutral-700 text-left">Instructions</h2>

      <div className="mt-2 space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="rounded-md">
            <div className="flex items-start gap-4 px-1">
              <div className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold text-neutral-700">{step.step}.</div>
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-left text-neutral-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
