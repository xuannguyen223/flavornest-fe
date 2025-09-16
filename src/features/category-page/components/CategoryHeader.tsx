export interface CategoryHeaderProps {
  title: string;
  description: string;
}

export default function CategoryHeader({title, description} : CategoryHeaderProps) {
  return (
    <section className="w-full">
      {/* Title */}
      <h1 className="mt-6 text-5xl 
        font-semibold leading-tight 
        text-neutral-700">
        {title}
      </h1>

      {/* Description */}
      <div className="flex justify-center">
        <p className="w-full md:w-[600px] text-neutral-500 text-lg py-2">
          {description}
        </p>
      </div>
    </section>
  );
}
