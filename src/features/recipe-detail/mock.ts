export interface IngredientSection {
  title: string;
  items: string[];
}

export interface SubstitutionItem {
  label: string;
  value: string;
}

export interface InstructionStep {
  text: string;
  image?: string;
}

export interface NutritionItem {
  label: string; // e.g., "Calories:" or "Protein:"
  amount: string; // e.g., "440" or "29g"
  dailyValue?: string; // e.g., "4%"
}

export interface NutritionInfo {
  items: NutritionItem[];
  footnote?: string;
}

export interface RecipeDetail {
  id: number;
  title: string;
  author: string;
  publishedAt: string; // ISO date
  image: string;
  rating: number; // average rating
  ratingCount: number;
  overview: string;
  cookTips?: string[];
  prepTime: string; // e.g., "30 mins"
  cookTime: string; // e.g., "10 mins"
  totalTime: string; // e.g., "40 mins"
  servings: number; // e.g., "3 people"
  videoUrl?: string;
  tags?: string[];
  currentUserAvatar?: string;
  ingredientsMetric: string[];
  ingredientsUS: string[];
  ingredientsMetricSections: IngredientSection[];
  ingredientsUSSections: IngredientSection[];
  substitutions?: SubstitutionItem[];
  instructions: InstructionStep[];
  nutrition?: NutritionInfo;
}

export const mockRecipeDetail: RecipeDetail = {
  id: 1,
  title: "Kung Pao Chicken",
  author: "Jamie Brooks",
  publishedAt: "2024-01-10T00:00:00.000Z",
  image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1974&auto=format&fit=crop",
  rating: 4.0,
  ratingCount: 27,
  overview: `Kung Pao Chicken is a Chinese takeout favourite that is mouthwateringly good and highly addictive – so it’s a good thing it’s easy to make at home so we don’t need to order takeout every time we crave it!! We love the strong flavoured sweet-sour-savoury sauce with the signature tingle of numbing heat from the Sichuan pepper!

  If you’re wondering whether Kung Pao Chicken is authentic Chinese, the dish as we know it outside of China is a slightly westernised version of an authentic Chinese Sichuan dish. Traditionally in China, Kung Pao Chicken is a dry stir fry. Which means, unlike 99% of other Asian stir fries, it’s not swimming in loads of sauce. But with Kung Pao Chicken, the sauce is very intense flavoured so you don’t need loads of it. When it mixes in with the rice, just a bit of sauce goes a long way.
  
  There are good reasons why everyone loves kung pao chicken. It’s got so many flavors going on: tangy, sweet, and salty with a hint of heat. The art is putting in the right amount of each ingredient to come up with that winning flavor combination.
  It’s actually a relatively easy dish to make at home, and my goal was to make a restaurant-quality kung pao chicken recipe. Try it for yourself to see if I’ve succeeded!`,
  cookTips: [
    "As with all stir-fries, the dish cooks quickly, so be sure to have all your ingredients prepped before you start cooking.",
    "Cook the Kung Pao sauce down until it reduces to a syrupy consistency with quite an intense flavour. That’s the Kung Pao way!!",
    "Chinese Cooking Wine, also known as Shaoxing wine or Shaosing wine, is the secret ingredient that makes homemade Chinese food truly taste as good as take out.",
  ],
  prepTime: "30 mins",
  cookTime: "10 mins",
  totalTime: "40 mins",
  servings: 3,
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  // currentUserAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
  // flat lists (legacy)
  ingredientsMetric: [
    "45 ml vegetable oil",
    "340 g chicken breast (2cm cubes)",
    "3 cloves garlic (sliced)",
    "2 thin slices ginger (minced)",
    "2 dried red chillies (deseeded and chopped)",
    "160 g raw peanuts",
    "6 scallions, white parts only (2cm pieces)",
    "45 ml water",
    "1/2 tsp Sichuan peppercorn powder",
    "1 tbsp light soy sauce",
    "1/2 tsp dark soy sauce",
    "1 tbsp rice wine vinegar",
    "1 tsp sugar",
    "1 tsp cornstarch",
    "1 tsp Shaoxing wine",
    "1/8 tsp salt",
    "1 pinch white pepper",
  ],
  ingredientsUS: [
    "3 tbsp vegetable oil",
    "12 oz chicken breast (3/4-inch cubes)",
    "3 cloves garlic (sliced)",
    "2 thin slices ginger (minced)",
    "2 dried red chilies (deseeded and chopped)",
    "5.5 oz raw peanuts",
    "6 scallions, white parts only (3/4-inch pieces)",
    "3 tbsp water",
    "1/2 tsp Sichuan peppercorn powder",
    "1 tbsp light soy sauce",
    "1/2 tsp dark soy sauce",
    "1 tbsp rice wine vinegar",
    "1 tsp sugar",
    "1 tsp cornstarch",
    "1 tsp Shaoxing wine",
    "1/8 tsp salt",
    "1 pinch white pepper",
  ],
  // grouped lists
  ingredientsMetricSections: [
    {
      title: "To Roast the Peanuts",
      items: [
        "160 g raw peanuts",
        "1 tsp vegetable oil",
        "1/8 tsp salt",
      ],
    },
    {
      title: "To Marinate the Chicken",
      items: [
        "340 g chicken breast (2cm cubes)",
        "1 tsp cornstarch",
        "1 tsp light soy sauce",
        "1 tsp Shaoxing wine",
        "1 pinch white pepper",
      ],
    },
    {
      title: "Sauce",
      items: [
        "45 ml water",
        "1 tbsp light soy sauce",
        "1/2 tsp dark soy sauce",
        "1 tbsp rice wine vinegar",
        "1 tsp sugar",
        "1/2 tsp Sichuan peppercorn powder",
      ],
    },
    {
      title: "Stir Fry",
      items: [
        "45 ml vegetable oil",
        "3 cloves garlic (sliced)",
        "2 thin slices ginger (minced)",
        "2 dried red chillies (deseeded and chopped)",
        "6 scallions, white parts only (2cm pieces)",
        "Roasted peanuts (from above)",
      ],
    },
  ],
  ingredientsUSSections: [
    {
      title: "To Roast the Peanuts",
      items: [
        "5.5 oz raw peanuts",
        "1 tsp vegetable oil",
        "1/8 tsp salt",
      ],
    },
    {
      title: "To Marinate the Chicken",
      items: [
        "12 oz chicken breast (3/4-inch cubes)",
        "1 tsp cornstarch",
        "1 tsp light soy sauce",
        "1 tsp Shaoxing wine",
        "1 pinch white pepper",
      ],
    },
    {
      title: "Sauce",
      items: [
        "3 tbsp water",
        "1 tbsp light soy sauce",
        "1/2 tsp dark soy sauce",
        "1 tbsp rice wine vinegar",
        "1 tsp sugar",
        "1/2 tsp Sichuan peppercorn powder",
      ],
    },
    {
      title: "Stir Fry",
      items: [
        "3 tbsp vegetable oil",
        "3 cloves garlic (sliced)",
        "2 thin slices ginger (minced)",
        "2 dried red chilies (deseeded and chopped)",
        "6 scallions, white parts only (3/4-inch pieces)",
        "Roasted peanuts (from above)",
      ],
    },
  ],
  substitutions: [
    { label: "Light Soy Sauce:", value: "All purpose soy sauce" },
    { label: "Dark Soy Sauce:", value: "Light soy sauce or All purpose soy sauce" },
    { label: "Rice Wine Vinegar:", value: "White vinegar or balsamic vinegar" },
    { label: "Cornstarch:", value: "All-purpose flour or Potato Starch" },
    { label: "Shaoxing Wine:", value: "Dry sherry or mirin (if using mirin, skip the sugar) or Japanese cooking sake (rice wine). If you can't consume alcohol, then skip it but use chicken broth in place of water." },
    { label: "Sichuan Pepper:", value: "White pepper" },
  ],
  instructions: [
    {
      text: "Heat a teaspoon of oil in a wok or pan over medium heat and add a cup of raw shelled peanuts. Stir constantly (or they’ll burn) for 3 minutes. Turn off the heat and stir for another minute using the residual heat in the wok. Set aside to cool. They will turn crunchy once they’re cooled completely.",
      image: "https://images.unsplash.com/photo-1666190091191-0cd0c5c8c5b5?q=80&w=870&auto=format&fit=crop",
    },
    {
      text: "Combine the chicken breast (you could also use boneless skinless chicken thighs) with 1 teaspoon each of oil, cornstarch, and shaoxing wine, 1/8 teaspoon salt, and a pinch of white pepper. Set aside to marinate for 20 minutes.",
      image: "https://images.unsplash.com/photo-1682991136736-a2b44623eeba?q=80&w=1331&auto=format&fit=crop",
    },
    {
      text: "In a small bowl, mix together light soy sauce, dark soy sauce, rice wine vinegar, sugar, water, and cornstarch, and set aside.",
    },
    {
      text: "Heat 2 tablespoons oil in a wok or large skillet over high heat. Sear the chicken, remove from the wok to a bowl, and set aside.",
      image: "https://images.unsplash.com/photo-1583777303692-a1ce32c26251?q=80&w=880&auto=format&fit=crop",
    },
  ],
  nutrition: {
    items: [
      { label: "Calories:", amount: "440" },
      { label: "Carbohydrates:", amount: "11g", dailyValue: "4%" },
      { label: "Protein:", amount: "29g", dailyValue: "58%" },
      { label: "Fat:", amount: "33g", dailyValue: "51%" },
      { label: "Saturated Fat:", amount: "6g", dailyValue: "30%" },
      { label: "Cholesterol:", amount: "54mg", dailyValue: "18%" },
      { label: "Sodium:", amount: "477mg", dailyValue: "20%" },
      { label: "Fiber:", amount: "4g", dailyValue: "16%" },
      { label: "Vitamin A:", amount: "270IU", dailyValue: "5%" },
      { label: "Vitamin C:", amount: "5.1mg", dailyValue: "6%" },
      { label: "Calcium:", amount: "60mg", dailyValue: "6%" },
      { label: "Iron:", amount: "2.1mg", dailyValue: "12%" },
    ],
    footnote: "*Based on a 2,000 calorie diet",
  },
  tags: [
    "Vegetarian",
    "Gluten Free",
    "High Protein",
    "Quick & Easy",
    "Low Carb",
    "Dairy Free",
    "Kids Friendly",
    "30 Minutes or Less",],
};
  