import type { InstructionStep } from "../mock";

export interface InstructionsProps {
  steps: InstructionStep[];
}

export default function Instructions({ steps }: InstructionsProps) {
  return (
    <section className="mt-8">
      <h2 className="text-4xl font-semibold leading-tight text-neutral-700 text-left">Instructions</h2>

      <div className="mt-6 space-y-5">
        {steps.map((step, idx) => (
          <div key={idx} className="rounded-md">
            <div className="flex items-start gap-6 px-1">
              <div className="text-2xl font-semibold text-neutral-700">{idx + 1}.</div>
              <p className="text-left leading-8 text-neutral-600">{step.text}</p>
            </div>
            {step.image ? (
              <div className="mt-6">
                <img src={step.image} alt={`Step ${idx + 1}`} 
                className="mx-auto rounded-md h-[150px] 
                  w-full md:w-[600px] object-cover md:h-[350px]" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
