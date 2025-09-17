import ViewMoreButton from "./ViewMoreButton";

interface AboutRowProps {
  title: string;
  content: string;
  image: string;
  reverse?: boolean; // Reverse Content & Text
}

export default function AboutRow({ title, content, image, reverse }: AboutRowProps) {
    return (
      <div
        className={`
          flex flex-col items-center gap-10 mt-8
          md:flex-row md:justify-center md:gap-25
          ${reverse ? "md:flex-row-reverse" : ""}
        `}
      >
        {/* Content */}
        <div
            className={`
                flex flex-col items-center text-center space-y-4 max-w-md
                ${reverse ? "md:items-end md:text-right" : "md:items-start md:text-left"}
            `}>
            <h2 className="text-xl font-semibold text-neutral-700">{title}</h2>
            <div className="w-1/3 h-1 bg-neutral-700 rounded-full" />
            <p className="text-neutral-600 text-base">{content}</p>
            <ViewMoreButton to="/category/1" />
        </div>

  
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={image}
            alt={title}
            className="w-full max-w-[400px] h-auto drop-shadow-xl"
          />
        </div>
      </div>
    );
}
  
