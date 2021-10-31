import { PageProps } from "@/types/pages";
import { HeroProps } from "@/types/sections";
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { v4 } from "uuid";
import { randomEmoji } from "./random-emoji";

export const sectionNames = {
  hero: "Hero",
};

export const heroSample = (): HeroProps => {
  return {
    type: "hero",
    id: v4(),
    hero: {
      title: "Another hero",
      subtitle: "Another hero subtitle",
      image: "/samples/plataform.png",
    },
  };
};

const generateRandom = () => {
  const randomAdjective = uniqueNamesGenerator({
    dictionaries: [adjectives],
    length: 1,
    style: "capital",
  });

  const randomAnimal = uniqueNamesGenerator({
    dictionaries: [animals],
    length: 1,
    style: "capital",
  });

  const randomName = randomAdjective + " " + randomAnimal;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const randomId =
    Math.floor(Math.random() * 100000) +
    alphabet[Math.floor(Math.random() * alphabet.length)];

  const id = randomName.toLowerCase().replace(/\s/g, "-") + "-" + randomId;

  const name = randomName;
  return { id, name };
};

export const createPage = ({
  title,
  icon,
  user,
}: {
  title: string;
  icon: string;
  user: string;
}): PageProps => {
  const { id, name } = generateRandom();

  return {
    id: id,
    title: title || name,
    icon: icon || randomEmoji(),
    slug: id,
    sections: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    published: false,
    user: user,
    product: {
      name: "",
      link: "",
      description: "",
      pricing: "",
    },
  };
};

export const pageSample = createPage({ title: "", icon: "", user: "" });
