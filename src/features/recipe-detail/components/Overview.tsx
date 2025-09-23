export interface OverviewProps {
  text: string;
}

export default function Overview({ text }: OverviewProps) {
  return (
    <section className="mt-8 font-poppins text-left">
      <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold 
        leading-tight text-neutral-700"
        >Overview</h2>
      <p className="mt-2 text-xs sm:text-sm lg:text-base xl:text-lg leading-8 text-neutral-600 whitespace-pre-line">
        {text}
      </p>
    </section>

  );
}

