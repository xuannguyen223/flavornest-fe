interface FeatureItemProps {
  title: string;
  description: string;
  icon: string; // path tới file svg
}

export default function FeatureItem({ title, description, icon }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-xs">
      {/* Icon */}
      <img src={icon} alt={title} className="w-20 h-20 shrink-0" />

      {/* Text */}
      <h3 className="text-xl font-semibold text-neutral-700">{title}</h3>
      <p className="text-base text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
}
