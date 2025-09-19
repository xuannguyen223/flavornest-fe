import type { Instruction } from "../../../types/TypeRecipe";
export interface InstructionsProps {
  steps: Instruction[];
}

export default function Instructions({ steps }: InstructionsProps) {
  return (
    <section className="mt-8">
      <h2 className="text-4xl font-semibold leading-tight text-neutral-700 text-left">Instructions</h2>

      <div className="mt-6 space-y-5">
        {steps.map((step) => (
          <div key={step.id} className="rounded-md">
            <div className="flex items-start gap-4 px-1">
              <div className="text-2xl font-semibold text-neutral-700">{step.step}.</div>
              <p className="text-lg text-left leading-8 text-neutral-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
