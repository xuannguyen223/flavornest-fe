export interface CookTipsProps {
  tips: string;
}

export default function CookTips({ tips }: CookTipsProps) {
  const tipsArray = tips
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return (
    <section className="mt-4 font-poppins text-left">
      <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold leading-tight text-neutral-700">Cook’s Tips</h2>
      <ul className="mt-2 list-disc pl-6 text-xs sm:text-sm lg:text-base xl:text-lg leading-8 text-neutral-600">
        {tipsArray.map((tip, idx) => (
          <li key={idx}>{`${tip}.`}</li>
        ))}
      </ul>
    </section>
  );
}
