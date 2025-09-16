export interface OverviewProps {
  text: string;
}

export default function Overview({ text }: OverviewProps) {
  return (
    <section className="mt-8 font-poppins text-left">
      <h2 className="text-4xl font-semibold 
        leading-tight text-neutral-700"
        >Overview</h2>
      <p className="mt-6 text-lg leading-8 text-neutral-600 whitespace-pre-line">
        {text}
      </p>
    </section>

  );
}

