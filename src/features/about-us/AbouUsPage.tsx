import ViewMoreButton from "./component/ViewMoreButton";
import FeatureItem from "./component/FeatureItem";
export default function AboutUsPage() {
    return (
      <section className="px-6 py-8">
        {/* Header */}
        <div
          className="relative flex items-center justify-center min-h-[314px] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/about-us/header-img.png')" }}>
          {/* Overlay để chữ dễ đọc hơn */}
          <div className="absolute inset-0 bg-black/40" />
  
          {/* Nội dung */}
          <div className="relative z-10 max-w-3xl px-6 text-center text-white">
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-base leading-relaxed">
              Whether you're managing a vast collection of recipes, sharing your
              culinary creations with the world, or simply organizing family
              favorites, FlavorNest offers the tools to make your cooking journey
              seamless and inspiring—all in one place.
            </p>
          </div>
        </div>

        {/* Row 1*/}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 mt-3">
            {/* Content */}
            <div className="flex flex-col items-start text-left space-y-4">
                <h3 className="text-2xl font-semibold text-neutral-700">
                Helping you plan meals with ease
                </h3>
                <div className="w-50 h-0.75 bg-neutral-700 rounded-full" />
                <p className="text-neutral-600 text-lg max-w-md">
                We create weekly meal planners designed to save you time and reduce stress in the kitchen. 
                Each plan comes with a clear theme, balanced nutrition, and easy-to-follow recipes. 
                No more wondering what to cook — just simple, tasty, and organized meals every day.
                </p>
                <ViewMoreButton to = '/category/1' />
            </div>

            {/* Img */}
            <div className="flex justify-end ">
                <img
                src="/about-us/img-1.svg"
                alt="Illustration 1"
                className="w-100 h-auto drop-shadow-xl"
                />
            </div>
        </div>

        {/* Row 2*/}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 mt-3">
            {/* Img */}
            <div className="flex justify-center md:justify-start">
                <img
                src="/about-us/img-2.svg"
                alt="Illustration 2"
                className="w-100 h-auto drop-shadow-xl"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col items-end text-right space-y-4">
                <h3 className="text-2xl font-semibold text-neutral-700">
                Time-saving, convenient, fun
                </h3>
                <div className="w-50 h-0.75 bg-neutral-700 rounded-full" />
                <p className="text-neutral-600 text-lg max-w-md">
                Our platform is not just about weekly plans — it’s also a community
                hub where everyone can share and discover recipes. Find inspiration
                from others, share your own creations, and make cooking more social
                and fun.
                </p>
                <ViewMoreButton to = '/category/1' />
            </div>
        </div>

        {/* Row 3*/}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 mt-3">
            {/* Content */}
            <div className="flex flex-col items-start text-left space-y-4">
                <h3 className="text-2xl font-semibold text-neutral-700">
                For busy people who want to eat better
                </h3>
                <div className="w-50 h-0.75 bg-neutral-700 rounded-full" />
                <p className="text-neutral-600 text-lg max-w-md">
                No more wasting time thinking “What should I eat today?”. 
                Just browse the recipes, 
                pick what you like, and start cooking. 
                Each recipe is simple, clear, and ready to follow — so you can focus 
                on enjoying the meal, not the planning.
                </p>
                <ViewMoreButton to = '/category/1' />
            </div>

            {/* Img */}
            <div className="flex justify-end">
                <img
                src="/about-us/img-3.svg"
                alt="Illustration 3"
                className="w-100 h-auto drop-shadow-xl"
                />
            </div>

            
        </div>

        {/* Horizontal Bar */}
        <div className="mt-10 w-full h-1 bg-neutral-700 rounded-full" />

        {/* Section: Why it’s works */}
        <div className="mt-5 flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-semibold text-neutral-800 text-right">
                Why it’s works
            </h2>
            <img
                src="/about-us/vector-1.svg"
                alt="Decoration 1"
                className="w-40 h-auto"
            />

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
                    description="No more “What should I eat today?” — just pick a recipe, follow the steps, and enjoy."
                />
                </div>
        </div>

      </section>
    );
  }
  
  