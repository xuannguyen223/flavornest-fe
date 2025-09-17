import FeatureItem from "./FeatureItem";

export default function FeatureSection() {
  return (
    <div className="mt-10 flex flex-col items-center text-center space-y-6">
      <h2 className="text-3xl font-semibold text-neutral-800">Why it works</h2>
      <img src="/about-us/vector-1.svg" alt="Decoration" className="w-40 h-auto" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureItem
          icon="/about-us/personalized.svg"
          title="Personalized meal"
          description="Users choose weekly themes or build their own plan to fit lifestyle, taste, and goals."
        />
        <FeatureItem
          icon="/about-us/trusted.svg"
          title="Trusted recipes"
          description="Every recipe is clear, simple, and tested — so anyone can cook with confidence."
        />
        <FeatureItem
          icon="/about-us/stress-free.svg"
          title="Stress-free cooking"
          description="No more 'What should I eat today?' — just pick a recipe, follow the steps, and enjoy."
        />
      </div>
    </div>
  );
}
