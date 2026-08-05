export type NutritionFact = {
  label: string;
  value: string;
};

export type Flavor = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  colorFrom: string;
  colorTo: string;
  netContent: string;
  servings: string;
};

export const flavors: Flavor[] = [
  {
    id: "kiwi-fresa",
    name: "Kiwi y Fresa",
    tagline: "Fresca y explosiva",
    description:
      "Bebida energizante levemente gasificada sabor a kiwi y fresa. Un toque ácido y dulce que despierta los sentidos de principio a fin.",
    colorFrom: "#7AC142",
    colorTo: "#EC1E6E",
    netContent: "310 mL",
    servings: "1",
  },
  {
    id: "mora-azul",
    name: "Mora Azul Açaí",
    tagline: "Intensa y profunda",
    description:
      "Bebida energizante levemente gasificada sabor a mora azul y açaí. Un golpe de fruta silvestre con la energía que necesitas para no bajar el ritmo.",
    colorFrom: "#2E6BE0",
    colorTo: "#4B2E9E",
    netContent: "310 mL",
    servings: "1",
  },
];

export const nutritionFacts: NutritionFact[] = [
  { label: "Cafeína", value: "93 mg" },
  { label: "L-Citrulina", value: "4000 mg" },
  { label: "Taurina", value: "1209 mg" },
  { label: "Beta-Alanina", value: "2000 mg" },
  { label: "L-Arginina", value: "605 mg" },
  { label: "L-Teanina", value: "31 mg" },
];

export const pillars = [
  { title: "Energía Explosiva", icon: "zap" },
  { title: "Resistencia", icon: "gauge" },
  { title: "Sabor Único", icon: "sparkles" },
] as const;
