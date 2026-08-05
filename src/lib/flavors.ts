export type Flavor = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  colorFrom: string;
  colorTo: string;
};

export const flavors: Flavor[] = [
  {
    id: "mora",
    name: "Mora Azul",
    tagline: "Intensa y profunda",
    description: "Un golpe de mora silvestre con la energía que necesitas para no bajar el ritmo.",
    colorFrom: "#4B2E9E",
    colorTo: "#7C5CE0",
  },
  {
    id: "fresa",
    name: "Fresa",
    tagline: "Dulce con actitud",
    description: "Fresa fresca y vibrante, equilibrada con el boost clásico de BOOM.",
    colorFrom: "#EC1E6E",
    colorTo: "#FF5D9E",
  },
  {
    id: "kiwi",
    name: "Kiwi",
    tagline: "Fresca y explosiva",
    description: "Un toque ácido y verde que despierta los sentidos de principio a fin.",
    colorFrom: "#7AC142",
    colorTo: "#A3DC73",
  },
];
