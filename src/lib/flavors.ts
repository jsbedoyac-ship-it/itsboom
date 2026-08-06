export type IngredientBenefit = {
  label: string;
  value: string;
  description: string;
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
  photo: string;
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
    photo: "/card-kiwi-fresa-v2.png",
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
    photo: "/card-mora-azul-v2.png",
  },
];

export const ingredientBenefits: IngredientBenefit[] = [
  {
    label: "Cafeína",
    value: "93 mg",
    description: "Energía y enfoque rápido. Menos fatiga percibida.",
  },
  {
    label: "L-Citrulina",
    value: "4000 mg",
    description: "Más óxido nítrico y bombeo. Mejor rendimiento y resistencia.",
  },
  {
    label: "Beta-Alanina",
    value: "2000 mg",
    description: "Aumenta carnosina muscular. Retrasa la fatiga.",
  },
  {
    label: "Taurina",
    value: "1209 mg",
    description: "Mejor contracción e hidratación. Apoya resistencia y enfoque.",
  },
  {
    label: "L-Arginina",
    value: "605 mg",
    description: "Apoya el flujo sanguíneo. Bombeo y recuperación.",
  },
  {
    label: "L-Teanina",
    value: "31 mg",
    description: "Enfoque calmado, sin nervios. Suaviza el estímulo de la cafeína.",
  },
];

export const fullIngredientsList =
  "Agua carbonatada, aminoácidos (L-citrulina, Beta-alanina, L-arginina, L-teanina), acidulantes (ácido cítrico, ácido málico), taurina, extracto de frutas (manzana, algarrobo), cafeína anhidra, extracto de té verde, extracto de guaraná, mezcla de vitaminas (B3, B6, B12, biotina), regulador de acidez (citrato de sodio), edulcorantes artificiales (sucralosa, acesulfame k), sal, conservantes (sorbato de potasio, benzoato de sodio), estabilizante (carboximetilcelulosa), sabores naturales y artificiales, colorantes artificiales. Contiene tartrazina.";

export const pillars = [
  { title: "Energía Explosiva", icon: "zap" },
  { title: "Resistencia", icon: "gauge" },
  { title: "Sabor Único", icon: "sparkles" },
] as const;
