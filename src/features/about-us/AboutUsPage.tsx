import AboutRow from "./component/AboutRow";
import FeatureSection from "./component/FeatureSection";
import { useEffect } from "react";
export default function AboutUsPage() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="min-h-screen">
      {/* Header */}
      <div
        className="relative flex items-center justify-center min-h-[314px] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/about-us/header-img.png')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-3xl px-6 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-base leading-relaxed font-poppins">
            Whether you're managing a vast collection of recipes, sharing your
            culinary creations with the world, or simply organizing family
            favorites, FlavorNest offers the tools to make your cooking journey
            seamless and inspiring—all in one place.
          </p>
        </div>
      </div>

      {/* Rows */}
      <AboutRow
        linkRecipe= "/recipes?categoryType=MEAL_TYPE"
        title="Helping you plan meals with ease"
        content="We create weekly meal planners designed to save you time and reduce stress in the kitchen. Each plan comes with a clear theme, balanced nutrition, and easy-to-follow recipes. No more wondering what to cook — just simple, tasty, and organized meals every day."
        image="/about-us/img-1.svg"
      />

      <AboutRow
        linkRecipe= "/recipes"
        title="Time-saving, convenient, fun"
        content="Our platform is not just about weekly plans — it’s also a community hub where everyone can share and discover recipes. Find inspiration from others, share your own creations, and make cooking more social and fun."
        image="/about-us/img-2.svg"
        reverse
      />

      <AboutRow
        linkRecipe= "/recipes?categoryType=DIETARY"
        title="For busy people who want to eat better"
        content="No more wasting time thinking 'What should I eat today?'. Just browse the recipes, pick what you like, and start cooking. Each recipe is simple, clear, and ready to follow — so you can focus on enjoying the meal, not the planning."
        image="/about-us/img-3.svg"
      />

      {/* Divider */}
      <hr className="mt-15 w-full border-neutral-700 border-[2px]" />

      {/* Feature Section */}
      <FeatureSection />
    </section>
  );
}

  
  