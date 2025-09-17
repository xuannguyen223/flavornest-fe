export interface RecipeVideoProps {
  title: string;
  thumbnailSrc: string;
  videoUrl?: string;
}

export default function RecipeVideo({ title, thumbnailSrc, videoUrl }: RecipeVideoProps) {
  return (
    <section className="mt-8">
      <h2 className="text-4xl font-semibold leading-tight text-neutral-700 text-left">
        Watch how to make this Recipe
      </h2>
      <div className="mt-6 overflow-hidden rounded-md ">
        <div className="relative aspect-video 
          w-full max-w-3xl mx-auto
          border-[5px] border-neutral-800">
          {/* Thumbnail */}
          <img
            src={thumbnailSrc}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay title */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center">
            <div className="text-white text-2xl md:text-4xl font-semibold drop-shadow-[0_0_0.25rem_rgba(0,0,0,0.6)]">
              {title}
            </div>
          </div>

          {/* Play button */}
          <button
            type="button"
            onClick={() => videoUrl && window.open(videoUrl, "_blank")}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-black/50 p-4 hover:bg-black/70 transition"
            aria-label="Play video">
            <svg width="40" height="40" viewBox="0 0 54 84" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L53.4546 42L0 84V0Z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
