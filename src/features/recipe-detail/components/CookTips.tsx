export interface CookTipsProps {
  tips: string;
}

export default function CookTips({ tips }: CookTipsProps) {
  const tipsArray = tips
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return (
    <section className="mt-8 font-poppins text-left">
      <h2 className="text-4xl font-semibold leading-tight text-neutral-700">Cook’s Tips</h2>
      <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-8 text-neutral-600">
        {tipsArray.map((tip, idx) => (
          <li key={idx}>{`${tip}.`}</li>
        ))}
      </ul>
    </section>
  );
}
