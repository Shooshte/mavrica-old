type Temperature = "warm" | "cool" | "neutral";

interface SeedData {
  alternativeNames: string[];
  name: string;
  hex: string;
  tags: string[];
  temperature: Temperature;
}

export const INITIAL_DATA: SeedData[] = [
  {
    name: "Butter",
    alternativeNames: ["Light Yellow", "Cream", "Lemon", "Daffodil", "Vanilla"],
    hex: "#ffff80",
    tags: [
      "cheerful",
      "pleasant",
      "gentle",
      "happy",
      "optimistic",
      "soft",
      "institutional",
    ],
    temperature: "warm",
  },
  {
    name: "Coral",
    alternativeNames: [
      "Salmon",
      "Watermelon",
      "Grapefruit",
      "Shell Pink",
      "Bright Rose",
    ],
    tags: [
      "femininity",
      "gentleness",
      "romance",
      "tropics",
      "positive",
      "friendly",
      "sensual",
      "carefree",
      "gentle",
      "desire",
      "life force",
      "longevity",
    ],
    temperature: "warm",
    hex: "#ffff80",
  },
  {
    name: "Fuchsia",
    alternativeNames: [
      "Magenta",
      "Rhodamine Red",
      "Flame",
      "Hot Pink",
      "Bright Pink",
    ],
    tags: [
      "energy",
      "nonconformity",
      "new ideas",
      "vibrant",
      "pure",
      "attention",
      "intense",
      "spring",
      "renewal",
      "rebellious",
    ],
    temperature: "warm",
    hex: "#eb0091",
  },
  {
    name: "Ocher",
    alternativeNames: [
      "Butterscotch",
      "Harvest Gold",
      "Sienna",
      "Mustard",
      "Old Gold",
    ],
    tags: ["natural", "proprietary", "memorable", "sun", "earth"],
    temperature: "warm",
    hex: "#cd9600",
  },
  {
    name: "Orange",
    alternativeNames: [
      "Carrot",
      "Cheddar",
      "Marigold",
      "Tangerine",
      "Warm Red",
    ],
    tags: [
      "heat",
      "energy",
      "youth",
      "happy",
      "immediacy",
      "spontaneity",
      "creative",
    ],
    temperature: "warm",
    hex: "#ff5100",
  },
  {
    name: "Peach",
    alternativeNames: ["Apricot", "Blossom", "Flesh", "Melon", "Shell"],
    tags: ["soft", "nurturing", "warm", "sweet", "delicious", "aphrodisiac"],
    temperature: "warm",
    hex: "#ff6666",
  },
  {
    name: "Pink",
    alternativeNames: [
      "Baby Pink",
      "Bubblegum",
      "Champagne",
      "Geranium Pink",
      "Rose",
    ],
    tags: [
      "feminine",
      "romance",
      "compassion",
      "innocence",
      "fragility",
      "swettness",
      "calming",
    ],
    temperature: "warm",
    hex: "#ff80e6",
  },
  {
    name: "Purple",
    alternativeNames: ["Amethyst", "Aubergine", "Grape", "Lavender", "Plum"],
    tags: ["spirituality", "aristocracy", "bright", "cool", "calming"],
    temperature: "warm",
    hex: "#6e2d91",
  },
  {
    name: "Red",
    alternativeNames: ["Apple Red", "Crimson", "Fire", "Rose", "Ruby"],
    tags: [
      "radical",
      "extreme",
      "passion",
      "energy",
      "fire",
      "violence",
      "anger",
      "vibrant",
      "life",
    ],
    temperature: "warm",
    hex: "#f01e28",
  },
  {
    name: "Scarlet",
    alternativeNames: [
      "Brick",
      "Burgundy",
      "Caliente",
      "Dark Red",
      "Flaming Red",
    ],
    tags: [
      "danger",
      "passion",
      "seduction",
      "power",
      "attention",
      "respect",
      "power",
    ],
    temperature: "warm",
    hex: "#c8141e",
  },
  {
    name: "Violet",
    alternativeNames: [
      "Hydrangea",
      "Lilac",
      "Mauve",
      "Orchid",
      "Pastel Purple",
    ],
    tags: ["energy", "dynamic", "drama"],
    temperature: "warm",
    hex: "#b41e8c",
  },
  {
    name: "Yellow",
    alternativeNames: ["Amber", "Banana", "Canary", "Corn", "Lemon"],
    tags: ["cheerful", "happy", "optimism", "creativity", "vibrant"],
    temperature: "warm",
    hex: "#ffdd00",
  },
  {
    name: "Avocado",
    alternativeNames: ["Pine", "Seaweed", "Juniper", "Moss Green", "Artichoke"],
    tags: ["restful", "new beginning", "subjective"],
    temperature: "cool",
    hex: "#505f32",
  },
  {
    name: "Blue",
    alternativeNames: ["Cobalt", "Navy", "Indigo", "Oxford Blue", "Royal Blue"],
    tags: ["honest", "loyal", "power", "authority", "stability", "strenght"],
    temperature: "cool",
    hex: "#0073b4",
  },
  {
    name: "Chartreuse",
    alternativeNames: [
      "Absinthe",
      "Citron",
      "Lime",
      "Spring Green",
      "Yellow-Green",
    ],
    tags: ["bold", "youth", "vitality", "creativity"],
    temperature: "cool",
    hex: "#88b500",
  },
  {
    name: "Green",
    alternativeNames: [
      "Apple Green",
      "British Racing Green",
      "Emerald",
      "Grass",
      "Pistachio",
    ],
    tags: [
      "nature",
      "environment",
      "money",
      "organic",
      "ease",
      "casual lifestyle",
    ],
    temperature: "cool",
    hex: "#00b500",
  },
  {
    name: "Light Blue",
    alternativeNames: [
      "Baby Blue",
      "Columbia Blue",
      "Cornflower",
      "Sapphire",
      "Sky Blue",
    ],
    tags: [
      "power",
      "authority",
      "innocence",
      "peace",
      "quiet",
      "spiritual",
      "infinite",
    ],
    temperature: "cool",
    hex: "#00c0fa",
  },
  {
    name: "Mint",
    alternativeNames: [
      "Aquamarine",
      "Caribbean Green",
      "Celadon",
      "Pale Green",
      "Seafoam",
    ],
    tags: [
      "growth",
      "life",
      "nature",
      "spring",
      "youth",
      "beginning",
      " crisp",
      "cool",
      "delicate",
    ],
    temperature: "cool",
    hex: "#99ffb3",
  },
  {
    name: "Olive",
    alternativeNames: [
      "Army green",
      "Camouflage",
      "Drab",
      "Khaki Green",
      "Moss",
    ],
    tags: ["somber", "peaceful", "calming", "environmental", "peace"],
    temperature: "cool",
    hex: "#afaf0a",
  },
  {
    name: "Turquoise",
    alternativeNames: [
      "Aqua",
      "Blue-Green",
      "Robin's Egg Blue",
      "Tiffany Blue",
      "Verdigris",
    ],
    tags: [
      "vibrant",
      "happy",
      "retro",
      "nostalgic",
      "calming",
      "communication",
      "self-awareness",
      "initiative",
      "healing",
      "emotional stability",
      "soothing",
    ],
    temperature: "cool",
    hex: "#00b5cd",
  },
  {
    name: "Beige",
    alternativeNames: ["Tan", "Sand", "Putty", "Bisque", "Straw"],
    tags: [
      "pleasant",
      "calming",
      "recessive",
      "quiet",
      "sustainability",
      "rustic",
      "natural",
    ],
    temperature: "neutral",
    hex: "#f2e6cc",
  },
  {
    name: "Black",
    alternativeNames: ["Ebony", "Midnight", "Ink", "Onyx", "Jet Black"],
    tags: [
      "gravity",
      "legibility",
      "drama",
      "confidence",
      "sophisticated",
      "formal",
      "sleek",
      "mature",
    ],
    temperature: "neutral",
    hex: "#000000",
  },
  {
    name: "Brown",
    alternativeNames: ["Coffee", "Chocolate", "Mocha", "Hickory", "Mahogany"],
    tags: [
      "earthy",
      "solid",
      "sensual",
      "natural",
      "organic",
      "sustainability",
      "sophisticated",
    ],
    temperature: "neutral",
    hex: "#965005",
  },
  {
    name: "Gray",
    alternativeNames: ["Charcoal", "Smoke", "Slate", "Fog", "Graphite"],
    tags: [
      "impartial",
      "neutral",
      "sophisticated",
      "rich",
      "subtle",
      "elegant",
      "mature",
    ],
    temperature: "neutral",
    hex: "#969696",
  },
  {
    name: "White",
    alternativeNames: ["Ivory", "Snow", "Pearl", "Bone", "Linen"],
    tags: ["order", "space"],
    temperature: "neutral",
    hex: "#ffffff",
  },
];
