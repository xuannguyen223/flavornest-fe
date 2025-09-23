export interface RecipeInfoProps {
  prepTime: number;
  cookTime: number;
  totalTime: string;
  servings: number;
}

function InfoItem({ title, value, iconSrc }: { title: string; value: string; iconSrc: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <div className="grid size-12 place-items-center rounded-md">
        <img src={iconSrc} alt="" className="h-8 w-8 md:h-10 md:w-10" />
      </div>
      <div className="flex flex-col items-center">
        <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-neutral-700">{title}</div>
        <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-neutral-600">{value}</div>
      </div>
    </div>
  );
}

export default function RecipeInfo({ prepTime, cookTime, totalTime, servings }: RecipeInfoProps) {
  return (
    <section className="mt-8 rounded-2xl bg-neutral-100">
      <div className="grid grid-cols-1 divide-neutral-200 md:grid-cols-4 md:divide-x ">
        <InfoItem title="Prep Time" value={`${prepTime} min`} iconSrc="/recipe-detail/prep-time.svg" />
        <InfoItem title="Cook Time" value={`${cookTime} min`} iconSrc="/recipe-detail/cooking-time.svg" />
        <InfoItem title="Total Time" value={totalTime} iconSrc="/recipe-detail/total-time.svg" />
        <InfoItem title="Servings" value={servings.toString() + " people"} iconSrc="/recipe-detail/serving.svg" />
      </div>
    </section>
  );
}
