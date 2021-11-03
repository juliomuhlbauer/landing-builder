import { CreatePageProps, PageProps } from "@/types/pages";
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

  const slug = randomName.toLowerCase().replace(/\s/g, "-") + "-" + randomId;

  const name = randomName;
  return { slug, name };
};

export const createPage = ({
  title,
  icon,
  user,
  sections,
}: CreatePageProps): PageProps => {
  const { slug, name } = generateRandom();

  const id = v4();

  return {
    id,
    title: title || name,
    icon: icon || randomEmoji(),
    slug,
    sections: sections || [],
    created_at: new Date(),
    updated_at: new Date(),
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

interface Product {
  name: string;
  link: string;
  description: string;
}

const CreateSectionsByProduct = ({ name, link, description }: Product) => {
  // const
};
