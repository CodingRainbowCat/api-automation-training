interface Temperament {
    name: "Calm" | "Curious" | "Playful" | "Affectionate" | "Independent" | 
    "Shy" | "Dominant" | "Easygoing" | "Aggressive" | "Nervous" | "Social";
  }

export interface Cat {
    id?: number | string | undefined;
    name?: string | undefined;
    age?: number | undefined;
    breed?: string | undefined;
    dateJoined?: Date | undefined;
    vaccinated?: boolean | undefined;
    temperament?: Temperament['name'][] | undefined;
    staffInCharge?: string | undefined;
    isAdopted?: boolean | undefined;
    adopterId?: number | string | undefined;
  }